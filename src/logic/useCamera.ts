import {
    CameraPreview,
    CameraPreviewOptions,
    CameraPreviewPictureOptions,
} from "@capacitor-community/camera-preview";
import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { alertController, isPlatform, toastController } from "@ionic/vue";
import { Storage } from "@capacitor/storage";
import { Camera, GalleryImageOptions } from "@capacitor/camera";
import Image from "@/logic/Image";
import { onUpdated, reactive, ref, watch } from "vue";
import { modalController } from "@ionic/vue";
import Preview from "@/views/Preview.vue";
import { myEnterAnimation, myLeaveAnimation } from "./animations";
import moment from "moment";

/**
 * function related about the logic of the camera, and gallery
 * @returns all the consts that are needed in other components
 */
export function useCameraMobile() {
    const PHOTO_STORAGE = "images";
    const images = reactive(new Map<string, Image>());
    const size = ref(0);
    const value = ref(0);
    const abort = ref(false);

    /**
     * Generate unique ID for each picture with date concataned with a random number between 1 and 10000
     * @returns uuid
     */
    const generateID = () => {
        const id = String(new Date().getTime());
        const rand = String(Math.floor(Math.random() * 10000) + 1);
        const uuid = id + rand;
        return uuid;
    };

    /**
     * open device gallery in order to pick images
     */
    const openGallery = () => {
        value.value = 0;
        const options: GalleryImageOptions = {
            quality: 90,
            correctOrientation: true,
        };
        Camera.pickImages(options).then(async (result) => {
            const picts = result.photos;
            size.value = picts.length;
            for (let i = 0; i < picts.length; i++) {
                if (abort.value == false) {
                    const date = moment().format("DD/MM/YYYY, HH:mm");
                    const fileName = new Date().getTime() + ".jpeg";

                    //Have to pass from blob to base 64 in order to read from the Filesystem correctly
                    const response = await fetch(picts[i].webPath);
                    const blob = await response.blob();
                    const base64Data = (await convertBlobToBase64(
                        blob
                    )) as string;

                    const savedPicture = await saveImage(
                        base64Data,
                        fileName,
                        "",
                        date
                    );
                    value.value++;
                    images.set(generateID(), savedPicture);
                } else {
                    //If it is we toast a message
                    const toast = toastController.create({
                        message: "Import cancelled",
                        duration: 2500,
                        cssClass: "settings-toast",
                    });
                    (await toast).present();
                    return;
                }
            }
        });
    };

    /**
     * write the picture data to the file system
     * @param image
     * @param fileName
     * @param description
     * @param date
     * @returns
     */
    const saveImage = async (
        image: string,
        fileName: string,
        description: string,
        date: string
    ): Promise<Image> => {
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: image,
            directory: Directory.Data,
        });

        //check the platform
        if (isPlatform("hybrid")) {
            return {
                path: savedFile.uri,
                webviewPath: Capacitor.convertFileSrc(savedFile.uri),
                description: description,
                date: date,
            };
        } else {
            return {
                path: fileName,
                webviewPath: image,
                description: description,
                date: date,
            };
        }
    };

    /**
     * Start preview camera with specific options
     */
    const startCamera = () => {
        const cameraPreviewOptions: CameraPreviewOptions = {
            position: "rear",
            toBack: true,
            disableExifHeaderStripping: false, //avoid rotation of picture when we flip the camera
        };
        CameraPreview.start(cameraPreviewOptions);
    };

    /**
     * principal function to take the picture and save
     */
    const takePicture = async () => {
        const CameraPreviewPictureOptions: CameraPreviewPictureOptions = {
            quality: 90,
        };
        await CameraPreview.capture(CameraPreviewPictureOptions).then(
            async (result) => {
                const base64DataPicture = `data:image/jpeg;base64,${result.value}`;
                const fileName = new Date().getTime() + ".jpeg";
                const date = moment().format("DD/MM/YYYY, HH:mm");
                const savedImage = await saveImage(
                    base64DataPicture,
                    fileName,
                    "",
                    date
                );
                const uuid = generateID();
                images.set(uuid, savedImage);

                stopCamera();
                openPreview(uuid);
            }
        );
    };

    /**
     * Open preview image modal, displaying the image already taken or selected
     * @param uuid
     */
    const openPreview = async (uuid: string) => {
        const modal = await modalController.create({
            component: Preview,
            enterAnimation: myEnterAnimation,
            leaveAnimation: myLeaveAnimation,
            componentProps: {
                id: uuid,
            },
            cssClass: "settings-modal",
        });

        modal.present();
        const { role } = await modal.onWillDismiss();
        if (role === "confirm") {
            loadSaved();
        }
    };

    /**
     * stop the camera
     */
    const stopCamera = () => {
        CameraPreview.stop();
    };

    /**
     * change front and back camera
     */
    const flip = () => {
        CameraPreview.flip();
    };

    /**
     * Delete the current image from the filesystem
     * @param uuid
     * @param photo
     */
    const deletePicture = async (uuid: string) => {
        images.delete(uuid);

        const path = window.location.pathname;

        if (path == "/home/gallery") {
            const toast = toastController.create({
                message: "File deleted",
                duration: 2500,
                cssClass: "settings-toast",
            });
            (await toast).present();
        }
    };

    /**
     * Delete all the pictures
     * @param picts
     */
    const deleteAll = async (picts: Map<string, Image>) => {
        const alert = await alertController.create({
            cssClass: "settings-alert",

            message: "All the pictures will be deleted. Are you sure?",
            buttons: [
                {
                    text: "Cancel",
                    role: "cancel",
                },
                {
                    text: "Yes",
                    role: "confirm",
                    handler: () => {
                        picts.clear();
                    },
                },
            ],
        });

        await alert.present();
    };

    /**
     * saves photos array as JSON to file storage
     */
    const cachePhotos = () => {
        //has to be an array for the correct writing of the data
        const mapArray = Array.from(images, ([key, value]) => ({ key, value }));

        Storage.set({
            key: PHOTO_STORAGE,
            value: JSON.stringify(mapArray),
        });
    };

    /**
     * every change in images hashmap, cachePhotos is executed
     */
    watch(images, cachePhotos);

    /**
     * read the images from the device storage, and set to the hashmap in order to display it
     */
    const loadSaved = async () => {
        images.clear(); //clean the map to load only storage images
        const photoList = await Storage.get({ key: PHOTO_STORAGE });
        const photosInStorage = photoList.value
            ? JSON.parse(photoList.value)
            : [];

        //check the platform
        if (!isPlatform("hybrid")) {
            for (const photo of photosInStorage) {
                const file = await Filesystem.readFile({
                    path: photo.value.path,
                    directory: Directory.Data,
                });
                // Web platform only load the photo as base64 data
                photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
                const image = new Image(
                    photo.value.path,
                    photo.value.webviewPath,
                    photo.value.description,
                    photo.value.date
                );
                images.set(photo.key, image);
            }
        } else {
            iterate(photosInStorage);
        }
    };

    /**
     * iterate photos in storage
     * @param struct
     */
    const iterate = (struct: any) => {
        for (const photo of struct) {
            const image = new Image(
                photo.value.path,
                photo.value.webviewPath,
                photo.value.description,
                photo.value.date
            );
            images.set(photo.key, image);
        }
    };

    /**
     * convert blob url to base64 in order to read it from the FileSystem
     * @param blob
     * @returns
     */
    const convertBlobToBase64 = (blob: Blob) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });

    /**
     * on the component update we load the images from the storage
     */
    onUpdated(loadSaved);

    return {
        startCamera,
        takePicture,
        flip,
        openGallery,
        deletePicture,
        stopCamera,
        images,
        loadSaved,
        openPreview,
        deleteAll,
        value,
        size,
        abort,
    };
}

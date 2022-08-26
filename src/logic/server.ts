import Image from "@/logic/Image";
import { toastController } from "@ionic/vue";
import { ref } from "vue";
import axios from "axios";

/**
 * Function related to the api server
 * @returns all the const that are needed in others components
 */
export function apiServer() {
    const url = "http://192.168.8.173/upload.php";
    const value = ref(0);
    const size = ref(0);
    const imgValue = ref(0);
    const steps = ref(5);
    const abort = ref(false);
    const uploaded = ref(false);

    /**
     * Upload an image to the nginx server
     * @param file
     */
    const uploadFile = async (file: Image, msg: boolean) => {
        //Convert the image to formData for uploading to the server
        imgValue.value = 0;
        const response = await fetch(file.webviewPath);

        imgValue.value++;
        const blob = await response.blob();

        imgValue.value++;
        const formData = new FormData();
        imgValue.value++;
        formData.append("file", blob, file.path);
        imgValue.value++;

        await axios
            .post(url, formData)
            .then(async (res) => {
                //if we want the toast, only purpose for uploadAll
                if (res.data == "done") {
                    uploaded.value = true;
                    //if the image post is correct
                    const toast = toastController.create({
                        message: "File upload complete",
                        duration: 2500,
                        cssClass: "settings-toast",
                    });
                    if (msg) {
                        (await toast).present();
                    }
                } else {
                    uploaded.value = false;
                    const toast = toastController.create({
                        message: "File upload failed",
                        duration: 2500,
                        cssClass: "settings-toast",
                    });
                    if (msg) {
                        (await toast).present();
                    }
                }
            })
            .catch(async (error) => {
                uploaded.value = false;
                if (error.message == "Network Error") {
                    const toast = toastController.create({
                        message: "File upload failed due to network error",
                        duration: 2500,
                        cssClass: "settings-toast",
                    });
                    (await toast).present();
                }
            });
    };

    /**
     * Upload all the images stored in the device
     * @param map
     */
    const uploadAll = async (map: Map<string, Image>) => {
        value.value = 0;
        size.value = map.size;

        if (size.value == 0) {
            return;
        }

        for (const img of map) {
            if (abort.value == false) {
                //Check if the process is not cancelled
                await uploadFile(img[1], false);

                if (uploaded.value == true) {
                    imgValue.value++;
                    value.value++;
                } else {
                    const toast = toastController.create({
                        message: "Ups! Something gone wrong!",
                        duration: 2500,
                        cssClass: "settings-toast",
                    });
                    (await toast).present();
                    return;
                }
            } else {
                //If it is we toast a message
                const toast = toastController.create({
                    message: "Upload cancelled",
                    duration: 2500,
                    cssClass: "settings-toast",
                });
                (await toast).present();
                return;
            }
        }
        if (value.value == size.value) {
            const toast = toastController.create({
                message: "Upload completed",
                duration: 2500,
                cssClass: "settings-toast",
            });
            (await toast).present();
        }
    };

    return {
        uploadFile,
        uploadAll,
        value,
        size,
        steps,
        imgValue,
        abort,
    };
}

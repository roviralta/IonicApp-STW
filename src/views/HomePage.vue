<template>
    <ion-page>
        <ion-header class="ion-safe-area-top">
            <ion-toolbar color="dark">
                <ion-title style="text-align: center; padding-top: 20px"
                    ><b>Welcome!</b></ion-title
                >
            </ion-toolbar> </ion-header
        ><ion-content>
            <ion-fab vertical="center">
                <ion-row text-center>
                    <ion-col>
                        <ion-fab-button
                            id="camera"
                            class="animate__animated animate__fadeInLeft"
                            color="dark"
                            router-link="/home/camera"
                            router-animation="myEnterAnimation"
                            v-on:click="startCamera"
                        >
                            <ion-icon :icon="camera"></ion-icon>
                        </ion-fab-button>
                    </ion-col>
                    <ion-col>
                        <ion-fab-button
                            id="gallery"
                            class="animate__animated animate__backInDown"
                            color="dark"
                            router-link="/home/gallery"
                        >
                            <ion-icon :icon="images"></ion-icon>
                        </ion-fab-button>
                    </ion-col>
                    <ion-col>
                        <ion-fab-button
                            id="settings"
                            class="animate__animated animate__fadeInRight"
                            color="dark"
                            router-link="/home/settings"
                        >
                            <ion-icon :icon="settings"></ion-icon>
                        </ion-fab-button>
                    </ion-col>
                </ion-row>
            </ion-fab>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
    IonContent,
    IonPage,
    IonFab,
    IonFabButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonRow,
    IonCol,
    useBackButton,
    alertController,
} from "@ionic/vue";
import { camera, images, settings } from "ionicons/icons";
import { useCameraMobile } from "@/logic/useCamera";
import { App } from "@capacitor/app";
import router from "@/router";

export default defineComponent({
    name: "HomePage",

    components: {
        IonContent,
        IonPage,
        IonFab,
        IonFabButton,
        IonIcon,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonRow,
        IonCol,
    },

    setup() {
        const { startCamera, stopCamera } = useCameraMobile();

        /**
         * if the back button of the device is used in the home page, exit the app
         * id not, go back to the previous page
         */
        useBackButton(10, () => {
            const path = window.location.pathname;
            if (path == "/home") {
                presentAlert();
            } else if (path == "/home/camera") {
                stopCamera();
                router.push({
                    path: "/home",
                });
            } else {
                router.push({
                    path: "/home",
                });
            }
        });

        /**
         * if exit the app, one alert is presented
         */
        async function presentAlert() {
            const alert = await alertController.create({
                cssClass: "settings-alert",
                message: "The app will be closed!",
                buttons: [
                    {
                        text: "Cancel",
                        role: "cancel",
                    },
                    {
                        text: "OK",
                        role: "confirm",
                        handler: () => {
                            App.exitApp();
                        },
                    },
                ],
            });

            await alert.present();
        }

        return {
            camera,
            images,
            settings,
            startCamera,
            stopCamera,
        };
    },
});
</script>

<style scoped>
ion-fab {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
}
</style>

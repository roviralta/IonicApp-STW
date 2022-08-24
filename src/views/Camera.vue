<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="dark">
                <ion-buttons slot="start">
                    <ion-button v-on:click="stopCamera" router-link="/home">
                        <ion-icon :icon="arrowBack"></ion-icon
                    ></ion-button>
                </ion-buttons>
                <ion-title
                    style="
                        text-align: center;
                        margin-right: 30px;
                        padding-top: 20px;
                    "
                    ><b>Camera</b></ion-title
                >
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-fab vertical="bottom" horizontal="center" slot="fixed">
                <ion-fab-button color="dark" v-on:click="takePicture">
                    <ion-icon :icon="camera"></ion-icon>
                </ion-fab-button>
            </ion-fab>
            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button color="dark" v-on:click="flip">
                    <ion-icon :icon="cameraReverse"></ion-icon>
                </ion-fab-button>
            </ion-fab>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonPage,
    IonFab,
    IonFabButton,
    IonIcon,
    IonButton,
    IonTitle,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { camera, cameraReverse, arrowBack } from "ionicons/icons";
import { useCameraMobile } from "@/logic/useCamera";

export default defineComponent({
    name: "CameraView",

    components: {
        IonContent,
        IonPage,
        IonFab,
        IonFabButton,
        IonIcon,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonButton,
        IonTitle,
    },

    setup() {
        const { takePicture, flip, stopCamera, startCamera } =
            useCameraMobile();

        return {
            camera,
            takePicture,
            flip,
            cameraReverse,
            stopCamera,
            startCamera,
            arrowBack,
        };
    },
});
</script>

<style scoped>
ion-content {
    --background: transparent !important;
}
</style>

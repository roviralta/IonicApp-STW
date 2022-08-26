<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="dark">
                <ion-buttons slot="start">
                    <ion-button v-on:click="cancel">
                        <ion-icon :icon="arrowBack"></ion-icon
                    ></ion-button>
                </ion-buttons>
                <ion-title style="text-align: center; margin-right: 30px"
                    ><b>Image Preview</b></ion-title
                >
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-img
                alt="Can't load the image"
                :src="picts.get(id)?.webviewPath"
                style="width: 100%; height: 100%; padding: 5px"
            ></ion-img>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonContent,
    IonPage,
    IonImg,
    IonIcon,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonButton,
    IonButtons,
    useBackButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useCameraMobile } from "@/logic/useCamera";
import { checkmarkOutline, trash, home, arrowBack } from "ionicons/icons";
import { modalController } from "@ionic/core";

export default defineComponent({
    name: "PreviewImage",

    props: ["id", "picts"],

    components: {
        IonContent,
        IonImg,
        IonIcon,
        IonPage,
        IonTitle,
        IonHeader,
        IonToolbar,
        IonButton,
        IonButtons,
    },

    setup() {
        const { deletePicture, images } = useCameraMobile();

        /**
         * dismiss the modal
         */
        function cancel() {
            return modalController.dismiss(null, "cancel");
        }

        return {
            checkmarkOutline,
            trash,
            deletePicture,
            images,
            home,
            cancel,
            arrowBack,
        };
    },
});
</script>

<style scoped></style>

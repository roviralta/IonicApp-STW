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
                    ><b>Importing...</b></ion-title
                >
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid style="height: 100%"
                ><ion-row style="height: 60%"
                    ><ion-col>
                        <div v-if="size == 0">
                            <h5 style="margin-top: 10%">
                                Choosing some images to import from the gallery
                            </h5>
                        </div>
                        <div v-if="size > 0">
                            <br />
                            <h5>
                                Total images: {{ value }}/{{ size }}
                                {{ ((value / size) * 100).toFixed(2) }}%
                            </h5>
                            <ion-progress-bar
                                :value="value / size"
                            ></ion-progress-bar>
                        </div>
                    </ion-col>
                </ion-row>
                <br />
                <br />
                <ion-row
                    ><ion-col
                        ><ion-button id="btn" color="dark" v-on:click="cancel"
                            >Cancel</ion-button
                        ></ion-col
                    ></ion-row
                >
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonContent,
    IonButton,
    modalController,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonPage,
    IonProgressBar,
    IonGrid,
    IonCol,
    IonRow,
    useBackButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, close, arrowBack } from "ionicons/icons";

import { useCameraMobile } from "@/logic/useCamera";

export default defineComponent({
    name: "GalleryProgress",

    components: {
        IonContent,
        IonButton,
        IonIcon,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonProgressBar,
        IonPage,
        IonGrid,
        IonCol,
        IonRow,
    },

    created() {
        this.loadSaved();
        this.openGallery();
    },

    setup() {
        const { openGallery, value, size, abort, images, loadSaved } =
            useCameraMobile();

        /**
         * change abort value to stop the uploadAll function and dismiss the modal
         */
        function cancel() {
            abort.value = true;
            return modalController.dismiss(images, "confirm");
        }

        return {
            checkmark,
            cancel,
            close,
            arrowBack,
            value,
            openGallery,
            size,
            loadSaved,
            images,
        };
    },
});
</script>

<style scoped>
ion-progress-bar {
    width: 90%;
    margin: 10px;
    height: 25px;
}
ion-col {
    text-align: center;
}
</style>

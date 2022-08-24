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
                    ><b>Uploading</b></ion-title
                >
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid style="height: 100%"
                ><ion-row style="height: 60%"
                    ><ion-col>
                        <div v-show="size > 0">
                            <h5>
                                Total images: {{ value }}/{{ size }}
                                {{ ((value / size) * 100).toFixed(2) }}%
                            </h5>
                            <ion-progress-bar
                                :value="value / size"
                            ></ion-progress-bar>

                            <h5>
                                Actual image:
                                {{ ((imgValue / steps) * 100).toFixed(2) }}%
                            </h5>
                            <ion-progress-bar
                                :value="imgValue / steps"
                            ></ion-progress-bar>
                        </div>
                        <div v-show="size == 0" style="height: 30%">
                            <h5 style="margin-top: 25%">
                                Can't upload any image, add one in order to
                                complete the process
                            </h5>
                            <br /></div
                    ></ion-col>
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
} from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmark, close, arrowBack } from "ionicons/icons";
import { apiServer } from "@/logic/server";

export default defineComponent({
    name: "ProgressBar",

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

    props: ["picts"],

    created() {
        this.uploadAll(this.picts);
    },

    setup() {
        const { value, uploadAll, size, steps, imgValue, abort } = apiServer();

        /**
         * change abort value to stop the uploadAll function and dismiss the modal
         */
        function cancel() {
            abort.value = true;
            return modalController.dismiss(null, "cancel");
        }

        return {
            checkmark,
            cancel,
            close,
            arrowBack,
            value,
            uploadAll,
            size,
            steps,
            imgValue,
            abort,
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

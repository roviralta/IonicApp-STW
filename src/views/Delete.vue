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
                    ><b>Delete picture</b></ion-title
                >
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid style="height: 100%">
                <ion-row style="height: 60%">
                    <ion-col style="height: 100%">
                        <ion-img
                            :src="images.get(id)?.webviewPath"
                            style="width: 100%; height: 100%"
                        ></ion-img>
                    </ion-col>
                </ion-row>
                <ion-row style="height: 10%">
                    <ion-col>
                        <ion-title style="text-align: center"
                            >Delete the picture?</ion-title
                        >
                    </ion-col></ion-row
                >
                <ion-row style="height: 25%; align-items: center"
                    ><ion-col>
                        <ion-fab-button color="danger" v-on:click="cancel">
                            <ion-icon :icon="close"></ion-icon>
                        </ion-fab-button>
                    </ion-col>
                    <ion-col>
                        <ion-fab-button
                            color="success"
                            v-on:click="confirm(id)"
                        >
                            <ion-icon
                                :icon="checkmark"
                            ></ion-icon> </ion-fab-button></ion-col
                ></ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonContent,
    IonImg,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    modalController,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonFabButton,
    IonPage,
    useBackButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useCameraMobile } from "@/logic/useCamera";
import { checkmark, close, arrowBack } from "ionicons/icons";

export default defineComponent({
    name: "DeleteImage",

    props: ["id"],

    components: {
        IonContent,
        IonImg,
        IonGrid,
        IonRow,
        IonCol,
        IonButton,
        IonIcon,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonFabButton,
        IonPage,
    },

    created() {
        this.loadSaved();
    },

    setup() {
        const { deletePicture, images, loadSaved } = useCameraMobile();

        /**
         * dismiss the modal
         */
        function cancel() {
            return modalController.dismiss(null, "cancel");
        }

        /**
         * delete the picture and dismiss the modal passing the updated hashmap
         * @param uuid
         */
        async function confirm(uuid: string) {
            // eslint-disable-next-line
            deletePicture(uuid);
            return modalController.dismiss(images, "confirm");
        }

        return {
            checkmark,
            deletePicture,
            images,
            cancel,
            loadSaved,
            confirm,
            close,
            arrowBack,
        };
    },
});
</script>

<style scoped>
ion-col {
    display: flex;
    justify-content: center;
}
</style>

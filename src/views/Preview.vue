<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="dark">
                <ion-buttons slot="start">
                    <ion-button v-on:click="cancel(id)">
                        <ion-icon :icon="arrowBack"></ion-icon
                    ></ion-button>
                </ion-buttons>
                <ion-title style="text-align: center; margin-right: 30px"
                    ><b>Add description</b></ion-title
                >
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid style="height: 100%">
                <ion-row style="height: 60%">
                    <ion-col style="height: 100%">
                        <ion-img
                            alt="Can't load the image"
                            :src="images.get(id)?.webviewPath"
                            s
                            style="width: 100%; height: 100%"
                        ></ion-img>
                    </ion-col>
                </ion-row>
                <br />
                <br />
                <ion-row style="height: 10%">
                    <ion-col>
                        <ion-textarea
                            id="description"
                            type="text"
                            placeholder="Update the description"
                        >
                        </ion-textarea>
                    </ion-col>
                </ion-row>
                <br />
                <br />
                <ion-row style="height: 5%"
                    ><ion-col>
                        <ion-button
                            id="cancel"
                            color="dark"
                            v-on:click="cancel(id)"
                        >
                            Cancel
                        </ion-button>
                    </ion-col>
                    <ion-col>
                        <ion-button
                            id="add"
                            color="success"
                            v-on:click="changeDescription(id)"
                        >
                            Add
                        </ion-button></ion-col
                    ></ion-row
                >
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonContent,
    IonPage,
    IonImg,
    IonHeader,
    IonToolbar,
    IonIcon,
    IonButtons,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonTitle,
    IonTextarea,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useCameraMobile } from "@/logic/useCamera";
import { checkmarkOutline, trash, home, arrowBack } from "ionicons/icons";
import { modalController } from "@ionic/core";

export default defineComponent({
    name: "PreviewImage",

    props: ["id"],

    components: {
        IonPage,
        IonContent,
        IonImg,
        IonHeader,
        IonToolbar,
        IonIcon,
        IonButtons,
        IonGrid,
        IonRow,
        IonCol,
        IonButton,
        IonTitle,
        IonTextarea,
    },

    created() {
        this.loadSaved();
    },

    setup() {
        const { deletePicture, images, loadSaved, startCamera } =
            useCameraMobile();

        /**
         * get the input text and change the object's description
         * @param uuid
         */
        function changeDescription(uuid: string) {
            const input = document.getElementById(
                "description"
            ) as HTMLInputElement;
            const descr = input.value;

            // eslint-disable-next-line
            images.get(uuid)!.description = descr;

            const history = window.location.pathname;
            if (history == "/home/camera") {
                startCamera();
            }
            return modalController.dismiss(images, "confirm");
        }

        /**
         * cancel the picture already taken or cancel the process of changing description,
         * depends of the source we return to one view or another
         * @param uuid
         */
        async function cancel(uuid: string) {
            const history = window.location.pathname;
            if (history == "/home/camera") {
                await deletePicture(uuid);
                startCamera();
                modalController.dismiss(images, "confirm");
            } else {
                modalController.dismiss(null, "cancel");
            }
        }

        return {
            checkmarkOutline,
            trash,
            deletePicture,
            images,
            home,
            loadSaved,
            arrowBack,
            changeDescription,
            cancel,
            startCamera,
        };
    },
});
</script>

<style scoped>
ion-textarea {
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 90%;
    height: 100%;
    margin: auto;
}
ion-col {
    text-align: center;
}
#add,
#cancel {
    width: 90px;
}
</style>

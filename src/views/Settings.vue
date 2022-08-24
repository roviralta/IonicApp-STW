<template>
    <ion-page>
        <ion-header class="ion-safe-area-top">
            <ion-toolbar color="dark">
                <ion-buttons slot="start">
                    <ion-button router-link="/home">
                        <ion-icon :icon="arrowBack"></ion-icon
                    ></ion-button>
                </ion-buttons>
                <ion-title
                    style="
                        text-align: center;
                        margin-right: 30px;
                        padding-top: 20px;
                    "
                    ><b>Settings</b></ion-title
                >
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item button
                    ><ion-icon :icon="server"></ion-icon>Server</ion-item
                >
                <ion-item button v-on:click="presentAlert"
                    ><ion-icon :icon="exit"></ion-icon>Exit</ion-item
                >
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonContent,
    IonButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonPage,
    IonList,
    IonItem,
    alertController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useCameraMobile } from "@/logic/useCamera";
import {
    checkmark,
    close,
    arrowBack,
    server,
    cloudUpload,
    exit,
} from "ionicons/icons";
import { apiServer } from "@/logic/server";
import { App } from "@capacitor/app";

export default defineComponent({
    name: "DeleteImage",

    props: ["id"],

    components: {
        IonContent,
        IonButton,
        IonIcon,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonPage,
        IonList,
        IonItem,
    },

    created() {
        this.loadSaved();
    },

    setup() {
        const { images, loadSaved } = useCameraMobile();

        const { uploadAll } = apiServer();

        /**
         * presnet alert for exit the app
         */
        async function presentAlert() {
            const alert = await alertController.create({
                header: "The app will be closed!",
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
            checkmark,
            images,
            loadSaved,
            confirm,
            close,
            arrowBack,
            server,
            cloudUpload,
            exit,
            uploadAll,
            presentAlert,
        };
    },
});
</script>

<style scoped>
ion-icon {
    padding-right: 10px;
}
</style>

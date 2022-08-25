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
                    ><b>Gallery</b></ion-title
                >
            </ion-toolbar>
            <ion-grid style="background-color: white">
                <ion-row class="animate__animated animate__bounceInUp">
                    <ion-col>
                        <ion-img
                            src="data:image/png;base64,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"
                            alt="Can't load the image"
                            style="width: 80px; height: 80px; margin: auto"
                        ></ion-img>
                    </ion-col>
                    <ion-col>
                        <ion-img
                            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEQEBMNDxIPDxAPGRYVEBAWFhsQEBAQFR0ZGBgVFxYYICgsGB8xHhMYITMtJTUrLjAuGSEzODMsNygtLisBCgoKDg0OGxAQGzMjHyAtNzcuNzA3NzUrKy41Ny82KzAtMi0vLisrNSs1KzU3KzctLS0tNSstLS4uLS0tKy0tLf/AABEIAMgAyAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAgQFBgEHA//EADoQAAIBAgUDAQUECAcBAAAAAAABAgMRBAUSITEGE1FBFCJhcZEHMkKBFSMzU6Gx0dIWVZKTorLwUv/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMFBP/EACURAQACAQQCAQQDAAAAAAAAAAABAhEDEyExBFESFEFh8HGBkf/aAAwDAQACEQMRAD8A+3RirLZHuleEI8IoCdK8IaV4RQAnSvCGleEUAJ0rwhpXhFACdK8IaV4RQAnSvCGleEUAJ0rwhpXhFACdK8IaV4RQAnSvCGleEUAJ0rwhpXhFACdK8IaV4RQAnSvCGleEUAIlFWeyB7LhgBHhFEx4RQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMuGBLhgBHhFEx4RQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMuGBLhgBHhFEx4RQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMuGBLhgBHhFEx4RQAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMuGBLhgBHhHrdtzyPCJr09UZQ41Jq/i6sBxFf7UcHGUlCliqqj+OMFplbxdnZ4LEqrShWSaVSMZJPZpSV9/qfOencFnGW05YWjhcPXhqclNzte+1+V4MrMusszwcY1sZgqEaLkoycZvVv43YHT1ep6UcfHK3Cp3ZR1Ke3btZvm9/Q3p82xE1LqOlJcSpRa+ThL+p9JA5jC9a0KkcZNU6yWX/tbpe/vJe7vv9xmpX2pYX9xjH8oJr+ZzeTfsc9/P/tVP26W67p4DCUsNUw9eX3pRmtKhNOTfu35texB0FP7UcHdKdLFU0/xSgrL6M3nUPVuGwUKdSrKUu8r0owWqU47PV8t19Ti+q89r5nh44Whl+LTnKMo1JR9yy8S43vyYnWdCeHxWWU1BV6tCjBKl6VJxf3fqgO36Z60o4+rKhSpV6bjHW3OKjFq6Xo/idOfP/8AF+bf5U/9b/tOg6VzfF4nu+14V4TRp7e7l3E735W1rL6lGVi+ocNSm6VSrFTjyt3b6H4/4rwf75fR/wBDks4wtGpiqmpzjKVZU29UdKWnVqs1xtYwcLlVOdPUqsZTadkvdjdNL1V/XweZfytWLTERD2KeDoTSJmZy+m1MWu068E6qUXKKju5q19jWdK9S0cxpyq0VOPblplCdlJXV09n/AOsZmRQ04ajF+kIr4bKxwOWv9F53UoO0MPjVqjfaCveUX+UtS/M9Gs5iJeTeMWmHU9VdZUMunTp1Y1KkqicmoW9yCaWp3+f8GdFSqKUVOLTjJJxa4cXwz5TlmUvO62Ox07qFnTwl/wD7X3X8kkv9bJy3q6VHJq2Hk3DE0H7PFP70YzvZ2+CUl+Rpl2WB66wtX2iaVWNHB/tKzS7cm21FRs7tuzZgYf7TsLUqRpwo4p65KKloWm8nbff4mjzHJfY+n9LWmpVlTqVF6pyatH8kkZnT2aZvDC0YYfA4edFQiqc3OznG20mr+vJB9JOGr/aZhoTnS7GLm6cpRbjFSV4trztwZeU5rm068IYjB0KVGT/WVIzvKKt6K+5x/SOLx1PE4/2GhSr6qv63XLRotKpptbnllHRP7UMMt3h8al6twWy+p1eR5xSxlGOIoNuErqzVpRa5TXoclmOZZ1KjUjLBYWMZQkpNVNTUWt2lffkyfsm7f6Oj25Sl78td1a0ttlblWsQdnLhgS4YKEeETXi3GUYvTJppS8NrZlR4RQHz6PSecJJPNbv1eh8/U/HEdBY3E6aeNzF1aKabgoO7t4u9ueTuMzwsqkVpq1KLjd3ha8tuHdM5rBY6tSwkMdKrUrTqWiqcrdtOUkr+6rnG+r8ZxMO2no/OuYnnOHvVHRTxNeGLw2Ilha9KKgnbUmo/dtZpxe7RgPpLN+P0p/wAZf1NxRz/EKfv04zhpnKUowqU9OlXV3NW3MvLcXjKsadZrCxp1EpNJyc1F77elxGtWei3j2rzLU5X0N7PgsVhY1u5WxkbTqyjaKaTS91O/4m+fUzsn6TpwwEMvxap4hRcnqScUnJt3jfeL3MPLsyxkMG8T+pqwhrl77l3Got7X49DYUc2xFepOGHjRjGkoOTqOTbc1q20iNaJ/tq3jWjPqGqyzpHGYGq/YcZH2Z7+z1oua+ScXt80Zme9MVcTjcJjlUpwWFtrp2cnJ3v7svQujn1er2qVOnRjVqd3W5SfbXaai7W3d7mPjc3rtujPTCpRrUFKVOT0zhU9N/lYk69SPFvnEuwBy7zrFSpVcTCGH7VJztGUpa2qbafwXB7Sz2tVnONL2anGCg/1knqeuOrZL5l36p9Nfn8MbOejHXrzrxrKCqbuLhqs/nf4GC/s/n+/p/wC2/wC43OXdRSnUpQqKlTU1W1PVtrpSUfdb9Hc2WX5i6tetSWlwoqnpknfVrTvf6Hz7Hj3nOO32fU+XpR8c8RH4/hlZfhlRpQop3VOKin5srHO9edJvMYU+3OFOtRb0ykm4uErXi7fFJ/kftjJ4mOJlJrETpRcXTjT0aJK26lq35Kln1SrOlSw0IqdTua+62tDpNJq0eX7x3jVrHE8PknQtbnOc8y2HTuUxweGp4WL1dte9K1tc3vKXw3Zy2Z/Z4q2YLGqcFQlJVKtJxeqU1yk+LOy/iZmOzau26M9MJ0a1BOVNvTOFR8b/ACNrQziUsLVxLUNVLu2j+F9ttK/0LGtWZwlvHvEZ/eemR1BlEMZh54Wo3FVLWkuYyTunb13Rx1DovM6UVSo5nppw2hHQ1pXjnY2lPMcTOrWleKpqhCo4XacVKMneFuHdfyP3y3NMTVUaVFUvcpUpzlVlKUpOon4545JGvWZat41ojtiZR05mdKvTq1sw71KDvOnpa1rfbnY19DofH0atarhsdToLETc5JU3vu2k7v01M3lLP68+3ShTpKtOdWEm5PtrtWu1bfe5VXOsVDvUpUqc61LtSWjVKLhUbTdudtLLv1Z+mv+/409TpbN5JwlmkXGSs123w/kzoukOno5fh1hlN1XqcpTtpTk/RL0Wx+2VZwqjVGpdV2nJrRKEWk7Xjq+aNsjpW0WjMOVqTWcS8lwwJcMGmSPCKJjwigJavsYayyj2fZtEe0uIem25mgzMRPaxaY6Y2GwNOnDtwj7jvdNuV788mFS6cwsJKcaSi4u8bN2T+VzbAk0rP26ajUvGcT2xIZdSVJ4dRSpSTTh6Wlz/M9wuAp0nKVOKi56VL4qKsv4GUC/GE+dvfbWVsiw04qEqUWouUlzdSm7ys/iz2lkeGhHRGlFLUp+t9ceG2bIE265zhd2+MZlqavTmElJzlRg3J3lzaT+KKzPJqdZWSpwmrJTdONRqK9PeNoBt09Lu3zE56abDZBShQWHajUtqcZShGWmUt7qPC+XwKyPJVhXUkpa3V03tGNOKUb2tGPzNuCRp1jEx9ida8xMTPfbV4vIMNVm6lSnqnLl3e9tvInkGFlCNJ0o6ad3BcNOXO/wATaAu3T0bt/c8NbRyLDQjojSilqU/W7nHh39bH51unMLOTnKjFuTvLm0n8UbYDbp6N2/eZYn6OpXlLQr1IqEvjBXtH+LMat0/hp6dVKPuJRjymorhXNoBNKz3CRqXjqZYNDKaFPQ4U4x7Wrt2/Dr+99bDE5VRqOUpwu6iipu7Tahdx4+bM4D4VxjBuWznPLX4LJqFGXcpwSna2q7k7eN/kbAA1FYiMQza02nNpy8lwwJcMFQjwiiY8IoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmXDAlwwAjwiiY8IoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmXDAlwwAjwiiY8IoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmXDAlwwAjwiiY8IoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmXDAlwwB5GSst0e6l5QADUvKGpeUAA1LyhqXlAANS8oal5QADUvKGpeUAA1LyhqXlAANS8oal5QADUvKGpeUAA1LyhqXlAANS8oal5QADUvKGpeUAA1LyhqXlAAeSkrPdAAD//2Q=="
                            alt="Can't load the image"
                            style="width: 80px; height: 80px; margin: auto"
                        ></ion-img>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-header>
        <ion-content :fullscreen="true">
            <div class="animate__animated animate__fadeInLeftBig">
                <ion-list
                    style="padding: 0px"
                    :key="img[0]"
                    v-for="img in images"
                >
                    <ion-item button v-on:click.self="openPreview(img[0])">
                        <ion-thumbnail slot="start">
                            <ion-img
                                name="file"
                                button
                                :src="img[1].webviewPath"
                                v-on:click="
                                    openModal(
                                        Image,
                                        img[0],
                                        images,
                                        'settings-modal'
                                    )
                                "
                            ></ion-img>
                        </ion-thumbnail>
                        <ion-label
                            style="
                                font-size: 14px;
                                font-family: 'Courier New', Courier, monospace;
                            "
                            button
                            v-on:click="openPreview(img[0])"
                        >
                            <b style="font-size: 18px">
                                {{ img[1].description }} </b
                            ><br /><br />
                            {{ img[1].date }}
                        </ion-label>

                        <ion-button
                            id="btn"
                            style="position: absolute; right: 0px"
                            color="danger"
                            v-on:click="
                                openModal(Delete, img[0], img, 'settings-modal')
                            "
                        >
                            <ion-icon :icon="trash"> </ion-icon>
                        </ion-button>
                        <ion-button
                            id="btn"
                            style="position: absolute; right: 35px"
                            color="dark"
                            v-on:click="uploadFile(img[1], true)"
                        >
                            <ion-icon :icon="cloudUpload"> </ion-icon>
                        </ion-button>
                    </ion-item>
                </ion-list>
            </div>
            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button
                    class="animate__animated animate__bounceInLeft animate__slow"
                    id="gallery"
                    color="dark"
                >
                    <ion-icon :icon="menu"></ion-icon>
                </ion-fab-button>
                <ion-fab-list
                    class="animate__animated animate__bounceInRight"
                    side="top"
                >
                    <ion-fab-button color="dark" v-on:click="openGallery"
                        ><ion-icon :icon="image"></ion-icon
                    ></ion-fab-button>
                    <ion-fab-button
                        color="dark"
                        v-on:click="
                            openModal(
                                ProgressBar,
                                '',
                                images,
                                'settings-progress'
                            )
                        "
                        ><ion-icon :icon="cloudUpload"></ion-icon
                    ></ion-fab-button>
                    <ion-fab-button color="dark" v-on:click="deleteAll(images)"
                        ><ion-icon :icon="trashBin"></ion-icon
                    ></ion-fab-button>
                </ion-fab-list>
            </ion-fab>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonContent,
    IonPage,
    IonImg,
    IonButtons,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonThumbnail,
    IonTitle,
    IonLabel,
    IonItem,
    IonList,
    IonToolbar,
    IonHeader,
    IonButton,
    menuController,
    modalController,
    IonFab,
    IonFabButton,
    IonFabList,
} from "@ionic/vue";
import { defineComponent } from "vue";
import {
    arrowBack,
    trash,
    menu,
    image,
    cloudUpload,
    trashBin,
} from "ionicons/icons";
import { useCameraMobile } from "@/logic/useCamera";
import Delete from "@/views/Delete.vue";
import Image from "@/views/Image.vue";
import ProgressBar from "@/views/ProgressBar.vue";
import { myEnterAnimation, myLeaveAnimation } from "@/logic/animations";
import { apiServer } from "@/logic/server";
import { ComponentRef } from "@ionic/core";

export default defineComponent({
    name: "HomePage",

    components: {
        IonContent,
        IonToolbar,
        IonHeader,
        IonTitle,
        IonPage,
        IonList,
        IonItem,
        IonLabel,
        IonButtons,
        IonGrid,
        IonCol,
        IonRow,
        IonThumbnail,
        IonIcon,
        IonImg,
        IonButton,
        IonFab,
        IonFabButton,
        IonFabList,
    },

    setup() {
        const {
            startCamera,
            openGallery,
            deletePicture,
            images,
            loadSaved,
            openPreview,
            deleteAll,
        } = useCameraMobile();

        const { uploadFile, uploadAll } = apiServer();

        /**
         * open lateral menu
         */
        async function openMenu() {
            await menuController.open();
        }

        /**
         * Open specific modal with data sent in props
         * @param comp
         * @param prop1
         * @param prop2
         * @param cssClass
         */
        async function openModal(
            comp: ComponentRef,
            prop1: any,
            prop2: any,
            cssClass: string
        ) {
            const modal = await modalController.create({
                component: comp,
                enterAnimation: myEnterAnimation,
                leaveAnimation: myLeaveAnimation,
                componentProps: {
                    id: prop1,
                    picts: prop2,
                },
                cssClass: cssClass,
            });
            modal.present();
            if (comp == Delete) {
                const { role } = await modal.onWillDismiss();
                //if the image is deleted load the new storage
                if (role === "confirm") {
                    loadSaved();
                }
            }
        }

        return {
            startCamera,
            openGallery,
            deletePicture,
            close,
            arrowBack,
            openMenu,
            loadSaved,
            openPreview,
            images,
            trash,
            menu,
            image,
            cloudUpload,
            uploadFile,
            uploadAll,
            trashBin,
            deleteAll,
            openModal,
            Delete,
            Image,
            ProgressBar,
        };
    },
});
</script>

<style scoped></style>

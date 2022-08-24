<template>
    <ion-app id="app">
        <ion-router-outlet></ion-router-outlet>
    </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
    name: "App",
    components: {
        IonApp,
        IonRouterOutlet,
    },
});
</script>

<style>
ion-toolbar {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
}
</style>

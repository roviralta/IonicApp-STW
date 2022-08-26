import { createAnimation } from "@ionic/vue";

/**
 * Animations for our modals
 * @param baseEl
 * @returns entrance animation
 */
export function myEnterAnimation(baseEl: any) {
    const root = baseEl.shadowRoot;

    const backdropAnimation = createAnimation()
        // eslint-disable-next-line
        .addElement(root.querySelector("ion-backdrop")!)
        .fromTo("opacity", "0.01", "var(--backdrop-opacity)");

    const wrapperAnimation = createAnimation()
        // eslint-disable-next-line
        .addElement(root.querySelector(".modal-wrapper")!)
        .keyframes([
            { offset: 0, opacity: "0", transform: "scale(0)" },
            { offset: 1, opacity: "0.99", transform: "scale(1)" },
        ]);

    return createAnimation()
        .addElement(baseEl)
        .easing("ease-out")
        .duration(200)
        .addAnimation([backdropAnimation, wrapperAnimation]);
}

/**
 * exit animation for modals
 * @param baseEl
 * @returns reverse animation of the entrance
 */
export function myLeaveAnimation(baseEl: any) {
    return myEnterAnimation(baseEl).direction("reverse");
}

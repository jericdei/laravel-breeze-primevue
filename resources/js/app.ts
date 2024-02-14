import "./bootstrap";
import "../css/app.css";
import "primeicons/primeicons.css";

import { createApp, h, DefineComponent, watch } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy/dist/vue.m";

import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
import { useDark } from "@vueuse/core";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob<DefineComponent>("./Pages/**/*.vue")
        ),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(ToastService)
            .use(ConfirmationService)
            .use(DialogService)
            .component("router-link", {
                props: ["to", "custom"],
                template: `
            <Link :href="to">
            <slot />
            </Link>`,
            })
            .use(PrimeVue, {
                ripple: true,
                zIndex: {
                    modal: 1100, // dialog, sidebar
                    tooltip: 1100, // tooltip
                    overlay: 1000, // dropdown, overlaypanel
                    menu: 1000, // overlay menus
                    toast: 1200, // toast
                },
            })
            .directive("tooltip", Tooltip);

        const isDark = useDark();

        const importCSS = (isDark: boolean) => {
            if (isDark) {
                import("primevue/resources/themes/aura-dark-noir/theme.css");
            } else {
                import("primevue/resources/themes/aura-light-noir/theme.css");
            }
        };

        watch(isDark, (newValue) => {
            importCSS(newValue);
        });

        importCSS(isDark.value);

        app.mount(el);
    },
    progress: {
        color: "#4B5563",
    },
});

<script setup lang="ts">
import { router } from "@inertiajs/vue3";
import Button from "primevue/button";

function logout() {
    router.post(route("logout"));
}
</script>

<template>
    <div>
        <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
            <header>
                <div class="flex justify-end p-8">
                    <Button
                        label="Logout"
                        icon="pi pi-sign-out"
                        @click="logout()"
                    />
                </div>
            </header>

            <main>
                <slot />
            </main>
        </div>
    </div>
</template>

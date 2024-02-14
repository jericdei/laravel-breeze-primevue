<script setup lang="ts">
defineProps<{
    message?: string;
}>();
</script>

<template>
    <small class="text-red-700">{{ message }}</small>
</template>

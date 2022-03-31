<template>
  <h2 class="text-3xl align-center">{{ msg }}</h2>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";

const router = useRouter();

defineProps({
  msg: String
});
</script>

<style>
</style>
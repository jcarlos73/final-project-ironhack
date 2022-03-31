<template>
  <nav>
    <div class="p-8 text-center bg-white-300">
      <div class="flex justify-between">
        <div>
          <AppHeader class="ml-60 mb-6 p-4 text-white" :msg="msg" />
        </div>
        <div>
          <button
            type="submit"
            @click="signOut()"
            class="mr-80 mb-6 p-4 rounded-sm text-white hover:underline text-3xl"
          >Log Out</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import AppHeader from "./AppHeader.vue";

const redirect = useRouter();
const msg = ref("");

async function getUser() {
  const res = await useUserStore().fetchUser();
  msg.value = `Welcome, ${res.email}`;
}

getUser();

// Component Redirections
const router = useRouter();
const buttonText = "Log Out";

async function signOut() {
  await useUserStore().signOut();
  router.push("/auth");
}
</script>

<style>
</style>
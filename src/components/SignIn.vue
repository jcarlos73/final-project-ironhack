ˆ<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded bg-blue-200">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>
    <!-- Form -->
    <form @submit.prevent="signIn" class="p-9 flex flex-col bg-white rounded-md shadow-lg">
      <h1 class="text-3xl text-blue-500 mb-4 text-center">Sign in</h1>
      <div class="flex flex-col mb-2">
        <label class="mb-1 text-sm text-blue-600" for="email">Email</label>
        <input
          type="text"
          required
          class="p-2 text-blue-600 focus:outline-none border border-blue-600 rounded-md"
          v-model="email"
          id="email"
        />
      </div>
      <div class="flex flex-col mb-2">
        <label class="mb-1 text-sm text-blue-600" for="password">Password</label>
        <input
          type="password"
          required
          class="p-2 text-blue-600 focus:outline-none border border-blue-600 rounded-md"
          v-model="password"
          id="password"
        />
      </div>

      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm border-blue-600 border text-blue-600 hover:bg-blue-600 hover:text-white"
      >Sign In</button>

      <p class="text-center pt-16">
        Don’t have an account?
        <PersonalRouter
          class="text-blue-600 text-center pt-16 hover:underline hover:underline-offset-1"
          :route="route"
          :buttonText="buttonText"
        />
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { storeToRefs } from "pinia";

// Auth Variables
const email = ref(null);
const password = ref(null);
const errorMsg = ref(null);

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Sign Up";

// vue-router variable
const redirect = useRouter();

// Add Function to Signin through supaBase
async function signIn() {
  try {
    await useUserStore().signIn(email.value, password.value);
    // if (error) throw error;
    redirect.push({ path: "/" });
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
}
</script>

<style></style>

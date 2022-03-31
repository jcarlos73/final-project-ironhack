<template>
  <div class="w-1/2 h-full mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded bg-blue-200">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>
    <!-- Form -->
    <form @submit.prevent="signUp" class="p-9 flex flex-col bg-white rounded-md shadow-lg">
      <h1 class="text-3xl text-blue-500 mb-4 text-center">Register</h1>
      <div class="flex flex-col mb-2">
        <label class="mb-2 text-md text-blue-600" for="email">Email</label>
        <input
          type="text"
          required
          class="mb-6 p-2 text-blue-600 focus:outline-none border border-blue-600 rounded-md"
          v-model="email"
          id="email"
          placeholder="Email"
        />
      </div>
      <div class="flex flex-col mb-2">
        <label class="mb-2 text-md text-blue-600" for="password">Password</label>
        <input
          type="password"
          required
          class="mb-6 p-2 text-blue-600 focus:outline-none border border-blue-600 rounded-md"
          v-model="password"
          id="password"
          placeholder="Password"
        />
      </div>
      <div class="flex flex-col mb-2">
        <label class="mb-2 text-md text-blue-600" for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          required
          class="mb-6 p-2 text-blue-600 focus:outline-none border border-blue-600 rounded-md"
          v-model="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
        />
      </div>

      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm border-blue-600 border text-blue-600 hover:bg-blue-600 hover:text-white"
      >Register</button>

      <p class="text-center pt-16">
        Have an account?
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
import router from "../router";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { storeToRefs } from "pinia";

// Create Data
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Component Redirections
const route = "/auth";
const buttonText = "Log In";

// Function To Sign Up User to supaBase with timeOut() method for showingErrors good-ux
async function signUp() {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      // if (error) throw error;
      redirect.push({ path: "/auth" });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
}

// Same function as above but without using pinia

// async function signUpWithoutPinia() {
//   console.log("hello");
//   if (password.value === confirmPassword.value) {
//     try {
//       const { error } = await supabase.auth.signUp({
//         email: email.value,
//         password: password.value,
//       });
//       if (error) throw error;
//       redirect.push({ path: "/auth" });
//     } catch (error) {
//       errorMsg.value = error.message;
//       setTimeout(() => {
//         errorMsg.value = null;
//       }, 5000);
//     }
//     return;
//   }
//   errorMsg.value = "Passwords do not match";
//   setTimeout(() => {
//     errorMsg.value = null;
//   }, 5000);
// }
</script>

<style></style>

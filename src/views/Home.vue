<template>
  <div class="bg-blue-600 min-h-min">
    <div class="max-w-screen-md mx-auto px-4 py-10">
      <div class="flex flex-col mb-2">
        <form @submit.prevent="addTask" class="p-9 flex flex-col bg-white rounded-md shadow-lg">
          <button
            type="submit"
            @click="signOut()"
            class="mb-6 p-2 rounded-sm border-blue-600 border text-blue-600 hover:bg-blue-600 hover:text-white"
          >Log Out</button>
          <!-- <label class="mb-1 text-sm text-blue-600" for="email">Add Task</label> -->
          <h1 class="text-3xl text-blue-500 mb-4 text-center">Add Task To Do</h1>
          <input
            type="text"
            class="p-2 text-blue-600 focus:outline-none border border-blue-600 rounded-md"
            v-model="add"
            id="add"
          />
          <button
            type="submit"
            class="mt-6 py-2 px-6 rounded-sm border-blue-600 border text-blue-600 hover:bg-blue-600 hover:text-white"
          >Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { storeToRefs } from "pinia";

const newTask = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

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
<template>
  <form class action>
    <div class="flex items-center justify-center">
      <input
        class="mt-4 mx-2 py-2 px-6 rounded-sm bg-transparent-10 rounded shadow-lg"
        v-model="newTodo"
        type="text"
        name="newTodo"
        id="name"
        placeholder="Add Task"
      />
      <button
        class="mt-9 mb-4 mx-10 py-2 px-6 rounded-sm hover:bg-black-600 text-white hover:text-white rounded-lg shadow-lg"
        @click.prevent="addTodo"
      >Create</button>
      <!-- <button class="btn-template bg-blue-500 hover:bg-blue-600" @click.prevent="addTodo">Add</button> -->
    </div>
    <p v-if="emptyNew" class="text-red-600 font-bold mt-5 ml-10">{{ errorInput }}</p>
  </form>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useTaskStore } from "../store/task";

// New Todo dialog variables
let newTodo = ref("");
let emptyNew = ref(false);
let errorInput = ref("");

// variable that is used to EMIT functions and methods from child comp to parent comp
const emit = defineEmits(["childAddTodo"]);

// Function to add todo to suopabase that passes info to parent which lives in home.vue
function addTodo() {
  if (newTodo.value === "") {
    emptyNew.value = true;
    errorInput.value = "New Task field cannot be empty";
    setTimeout(() => {
      emptyNew.value = false;
    }, 3000);
  } else {
    emptyNew.value = false;
    emit("childAddTodo", newTodo.value);
    newTodo.value = "";
  }
}
</script>

<style></style>

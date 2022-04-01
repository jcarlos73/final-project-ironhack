<template>
  <div class="flex justify-center align-items space-between">
    <input
      class="mt-6 mx-4 py-2 px-6 rounded-sm bg-white-200 text-black border border-gray-200 rounded"
      type="text"
      v-model="item.title"
    />
    <button
      v-if="!item.is_complete"
      class="mt-6 mx-4 py-2 px-6 rounded-sm text-white bg-green-500"
      @click="toggleComplete()"
    >{{item.is_complete ? 'Check' : 'Checked'}}</button>
    <button
      v-else
      class="mt-6 mx-4 py-2 px-6 rounded-sm text-white bg-red-500"
      @click="toggleComplete()"
    >{{item.is_complete ? 'Check' : 'Checked'}}</button>
    <button
      class="mt-6 mx-4 py-2 px-6 rounded-sm border-orange-600 border text-white bg-orange-600"
      @click="pepe()"
    >Edit</button>
    <button
      class="mt-6 mx-4 py-2 px-6 rounded-sm border-red-600 border bg-red-600 text-white"
      @click="deleteTask()"
    >Delete</button>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

// is task done variable boolean ?
let taskDone = true;
const name = ref("");

// variable that is used to EMIT functions and methods from child comp to parent comp
const emit = defineEmits(["childRemove", "childEdit", "toggleCompleteChild"]);

// variable to export the content of the task to its parent component
const props = defineProps(["item"]);

name.value = props.item.title;

//function toggleComplete that emits logic to parent component, will be used to turn boolean values from false & true
function toggleComplete() {
  emit("toggleCompleteChild", props.item);
}

function deleteTask() {
  emit("childRemove", props.item);
}

function pepe() {
  emit("childEdit", { name: props.item.title, id: props.item.id });
}
</script>

<style>
</style>
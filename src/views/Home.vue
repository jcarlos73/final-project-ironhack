<template>
  <div class="image bg-right-bottom">
    <Nav />
    <h1 class="text-5xl text-white font-medium mb-4 text-center">What are today's goals?</h1>
    <div class="text-center">
      <NewTask @childAddTodo="addNewTask" />
      <TaskItem
        v-for="(task, index) in tasks"
        :item="task"
        @toggleCompleteChild="toggleComplete"
        @childRemove="deleteTask"
        @childEdit="joaquin"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";
import Nav from "../components/Nav.vue";
import AppHeader from "../components/AppHeader.vue";

// variable to store array of tasks from supabase in the front as an empty array
let tasks = ref([]);

// function to fetch tasks from supabase using pinia
async function getTasks() {
  const res = await useTaskStore().fetchTasks();
  console.log(res);
  tasks.value = res;
}

getTasks();

// Function to post new Task into supabase using pinia
async function addNewTask(newTask) {
  console.log(newTask);
  await useTaskStore().createTask(newTask);
  getTasks();
}

// async function that will toggle the state between (TRUE or FALSE) on supabase that also uses an emmitted function coming from taskItem.vue
async function toggleComplete(item) {
  const toggleCompleted = !item.is_complete;
  const toggleId = item.id;
  const res = await useTaskStore().toggleDone(toggleCompleted, toggleId);
  getTasks();
  console.log(res);
}

async function deleteTask(item) {
  await useTaskStore().deleteTask(item.id);
  getTasks();
}

async function joaquin(item) {
  console.log(item);
  await useTaskStore().juan(item.name, item.id);
  getTasks();
}
</script>

<style >
</style>
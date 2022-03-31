import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "../store/user";
export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),

  actions: {
    helloWOrld() {
      console.log('Hello world')
    },
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks = tasks;
    },
    async createTask(title) {
      const { data, error } = await supabase.from("tasks").insert({
        user_id: useUserStore().user.id,
        title: title,
        is_complete: false,
      })
    },
    async toggleDone(bool, id) {
      try {
        const { data, error } = await supabase.from("tasks").update({ is_complete: bool }).match({ id: id });
        if (error) throw error;
        return data;
      } catch (error) {
        console.log(error)
      }
    },

    async deleteTask(id) {
      const { data, error } = await supabase
        .from('tasks')
        .delete()
        .match({ id: id });
    },
    async juan(title, id) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ title: title })
        .match({ id: id });
    }
  },
});

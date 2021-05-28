import { createApp } from 'vue';
import Todos from './api/todos';
import './assets/css/main.css';

const apiTodos = new Todos();

const app = createApp({
  data: () => ({
    todos: [],
    form: {
      text: '',
      done: false,
    },
    loading: false,
  }),

  created() {
    this.fetchTodos();
  },

  methods: {
    async fetchTodos() {
      try {
        this.loading = true;
        const { data } = await apiTodos.list();
        this.todos = data;
      } catch (err) {
        alert(err);
      } finally {
        this.loading = false;
      }
    },

    async createdTodo() {
      try {
        const { data } = await apiTodos.create(this.form);
        this.todos.push(data);
        this.form.text = '';
        this.form.done = false;
      } catch (err) {
        alert(err);
      }
    },

    async toggleTodoStatus(todo) {
      try {
        const { data } = await apiTodos.update({
          ...todo,
          done: !todo.done,
        });

        const index = this.todos.findIndex((todo) => todo.id === data.id);

        this.todos[index] = data;
      } catch (err) {
        alert(err);
      }
    },

    async deleteTodo(id) {
      try {
        await apiTodos.delete({ id });
        const index = this.todos.findIndex((todo) => todo.id === id);
        this.todos.splice(index, 1);
      } catch (err) {
        alert(err);
      }
    },
  },
});

app.mount('#app');

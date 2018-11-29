<template>
  <div id="todo">

    <div class="row">
      <div class="small-12 columns">
        <h1>Todo App</h1>
      </div>
    </div>

    <div class="row">
      <div class="small-12 columns">
        <h2>Todo List</h2>

        <div class="todo-list">

          <label for="id_filter_todo"></label>
          <input id="id_filter_todo" type="checkbox" @click="hideCompleted = !hideCompleted" v-model="hideCompleted"/>Hide Completed

          <div class="row">
            <div class="small-6 columns small-offset-3">
              <table border="1" class="table" id="todo-table">
                <thead>
                <tr>
                  <td>Name</td>
                  <td>Completed</td>
                </tr>
                </thead>
                <tbody>
                <tr :class="{'todo-completed': todo.completed}" :key="index" v-for="(todo, index) in filteredTodos">
                  <td>{{ todo.name }}</td>
                  <td><label for="id_todo_status"></label><input id="id_todo_status" type="checkbox" v-model="todo.completed" @click="updateTodoStatus(todo)"/></td>
                </tr>
                </tbody>
              </table>

              <div class="todo-action">
                <form action="#" v-on:submit.prevent="addTodo">
                  <label for="id_add_todo">Add Todo</label>
                  <input type="text" id="id_add_todo" v-model="currentTodo"/>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  data: function () {
    return {
      todos: [],
      currentTodo: '',
      hideCompleted: true
    }
  },
  computed: {
    filteredTodos: function () {
      return this.todos.filter(todo => this.hideCompleted ? !todo.completed : true)
    }
  },
  methods: {
    addTodo: function () {
      if (this.todoEmpty()) { return }
      const todo = {
        name: this.currentTodo,
        completed: false
      }
      this.todos.push(todo)
      this.currentTodo = ''
    },
    updateTodoStatus: function (todo) {
      if (todo.completed) {
        Object.assign(todo, {completed: false})
      } else {
        Object.assign(todo, {completed: true})
      }
    },
    todoEmpty: function () {
      return this.currentTodo.length === 0 || !this.currentTodo.trim()
    }
  }
}
</script>

<style scoped="true">
.todo-completed {
  text-decoration: line-through;
}
table#todo-table {
  width: 100%;
  height: 100%;
}
.todo-action {
  margin-top: 30px;
}
.todo-action form button {
  background-color: gray;
  padding: 7px 5px 5px 5px;
  box-shadow: 0 1px 1px black;
  margin: 10px;
}
</style>

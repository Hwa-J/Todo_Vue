<template>
  <img
    class="background"
    src="./images/background-image.jpg"
    alt="backgroundImage" />
  <h1>Todo List</h1>
  <div class="todo-box">
    <CreateTodo />
    <TodoList />
  </div>
</template>

<script>
import CreateTodo from '~/components/CreateTodo.vue'
import TodoList from '~/components/TodoList.vue'

export default {
  components: {
    CreateTodo,
    TodoList
}
}
</script>

<style lang="scss">
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: $color-darkgray;
}
img.background {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  z-index: -1;
  overflow: hidden;
  filter: blur(30px) invert(100%);
}
h1 {
  text-align: center;
}
.todo-box {
  width: 90%;
  max-width: 800px;
  padding: 20px 0;
  margin: auto;
  @include center;
  flex-direction: column;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, .7);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
}
button {
  background-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
  }
  i {
    font: {
      size: 16px
    };
    color: $color-darkgray;
  }
}
input {
  background-color: transparent;
  border: none;
  border-bottom: 2px solid darkgray;
}

</style>

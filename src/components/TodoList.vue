<template>
  <ul ref="todoList">
    <img
      v-if="loading"
      src="../images/loading.gif" 
      alt="loading" />
    <TodoItem
      v-for="todo in todos"
      v-else
      :key="todo.id" 
      :todo="todo"
      @checked-done="checkedDone(todo, $event)"
      @edit-title="updateTitle(todo, $event)" /> 
    <!-- todo데이터 props로 보냄 -->
  </ul>
  <OptionButton />
</template>

<script>
import TodoItem from '~/components/TodoItem.vue'
import OptionButton from '~/components/OptionButton.vue'
import Sortable from 'sortablejs'

export default {
  components: {
    TodoItem,
    OptionButton
  },
  computed: {
    todos() {
      return this.$store.state.todos
    },
    loading() {
      return this.$store.state.loading
    }
  },
  created() {
    this.readTodos()
  },
  mounted() {
    this.initSortable()
  },
  methods: {
    async readTodos() {
      this.$store.dispatch('readTodos')
    },
    async checkedDone(todo, event) {
      todo.done = event
      this.$store.dispatch('updateTodo', todo, {
        done: event
      })
    },
    async updateTitle(todo, event) {
      todo.title = event
      this.$store.dispatch('updateTodo', todo, {
        title: event
      })
    },
    initSortable() {
      new Sortable(this.$refs.todoList, {
        handle: 'li .handle', // 드래그 핸들이 될 요소의 선택자를 입력합니다.
        delay: 50, // 클릭이 밀리는 것을 방지하기 위해 약간의 지연 시간(ms)을 추가합니다.
        animation: 0, // 정렬할 때 애니메이션 속도(ms)를 지정합니다.
        forceFallback: true, // 다양한 환경의 일관된 Drag&Drop(DnD)을 위해 HTML5 기본 DnD 동작을 무시하고 내장 기능을 사용합니다.
        // 요소의 DnD가 종료되면 실행할 핸들러(함수)를 지정합니다.
        onEnd: event => {
          this.reorderTodos(event)
        }
      })
    },
    reorderTodos(event) {
      this.$store.dispatch('orderChange', event)
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  width: 90%;
  padding-left: 0px;
  @include center;
  flex-direction: column;
}
</style>

<template>
  <li :title="todo.updatedAt.slice(0,10)">
    <!-- done box -->
    <div class="handle">
      <i class="fas fa-grip-lines"></i>
    </div>
    <input
      type="checkbox"
      :checked="todo.done" 
      @click="checkIt($event)" />
    <!-- off edit -->
    <template v-if="!editMode">
      <span
        class="title"
        :class="{done: todo.done}">
        {{ todo.title }}
      </span>
      <span
        v-if="!editMode"
        class="update">{{ todo.updatedAt.slice(0,10) }}</span>
      <button
        :disabled="todo.done"
        @click.stop="onEditMode">
        <i class="far fa-edit"></i>
      </button>
    </template>
    <!-- on edit -->
    <template v-else>
      <form
        class="edit-form"
        @submit.prevent
        @click.stop>
        <input
          class="edit-input"
          :value="title"
          @change="editTitle($event)" />
        <button
          class="edit-btn"
          type="submit"
          @click="offEditMode">
          <i class="fas fa-check"></i>
        </button>
        <button
          class="cancle-btn"
          type="button"
          @click="offEditMode">
          <i class="fas fa-ban"></i>
        </button>
      </form>
    </template>
    <!-- delete btn -->
    <button
      :data-id="todo.id"
      @click="deleteTodo($event)">
      <i class="far fa-minus-square"></i>
    </button>
  </li>
</template>

<script>

export default {
  props: {
    todo: {
      type: Object,
      required: true}
  },
  data() {
    return {
      editMode: false,
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos
    }
  },
  methods: {
    onEditMode() {
      this.editMode = true
      this.title = this.todo.title
      window.addEventListener('click', () => this.offEditMode())
    },
    offEditMode() {
      this.editMode = false
    },
    editTitle(e) {
      this.$emit('edit-title', e.target.value)
    },
    deleteTodo(e) {
      const todoId = e.target.closest('button').getAttribute('data-id')
      // e.target.dataset.id
      this.$store.dispatch('deleteTodo', todoId)
    },
    checkIt(e) {
      this.$emit('checked-done', e.target.checked)
    },
    doneTodo() {
      if(this.done) {
        return 'done'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  width: 100%;
  height: 28px;
  display: flex;
  padding: 10px 0;
  margin: 5px 0;
  align-items: center;
  border-radius: 4px;
  button {
    padding: 0 5px;
  }
}
li:hover {
  background-color: $color-lightgray;
  i {
    opacity: .4;
      &:hover{
        opacity: 1;
      }
  }
  .update {
    // opacity: 1;
    display: block;
  }
}
li.sortable-ghost {
  background-color: $color-gold;
}
li.sortable-drag {
  opacity: 0 !important;
}
.handle {
  color: gray;
  margin: 0 5px;
  &:hover {
    cursor: grab;
  }
  &:active {
    cursor: grabbing;
  }
}
.title {
  margin-left: 10px;
  flex-grow: 1;
  list-style: none;
}
.title.done {
  color: gray;
  text-decoration:line-through;
}
.update {
  font-size: 12px;
  color: gray;
  // opacity: 0;
  display: none;
}
button[disabled] {
  display: none;
}
.edit-form {
  position: relative;
  @include center;
  flex-wrap: wrap;
  flex-grow: 1;
  button {
    i{
      opacity: .4;
    }
    .fa-check {
    color: green;
  }
    .fa-ban {
      color: red;
    }
  }
}
input.edit-input {
  margin-left: 10px;
  flex-grow: 1;
  font-size: 16px;
  color: $color-darkgray;
  @include input-focused;
}
i {
  opacity: 0;
}
.fa-edit {
  font: {
    size: 15.2px
  };
}
</style>

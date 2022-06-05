<template>
  <form
    class="form"
    @submit.prevent>
    <!-- 양방향 데이터 바인딩 -->
    <input
      placeholder="Write a To Do and Press Enter."
      :value="title"
      @input="title = $event.target.value" />
    <button @click="createTodo">
      ADD
      <i class="fas fa-plus-circle"></i>
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    }
  },
  methods: {
    async createTodo() {
      // title이 공란이면 여기서 실행 마침 (방어코드)
      if (!this.title.trim()) return

      this.$store.dispatch('createTodo', this.title)
      this.title = ''
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  width: 90%;
  // max-width: 800px;
  padding: 10px 0;
  margin: 10px 0;
  @include center;
}
input {
  width: 60%;
  padding: 5px;
  font-size: 16px;
  color: $color-darkgray;
  @include input-focused;
}
button {
  width: 80px;
  height: 30px;
  margin-left: 10px;
  border-radius: 10px;
  font: {
    size: 14px;
    weight: 600;
  }
  color: $color-darkgray;
  box-shadow: $color-shadow 0px 2px 6px;
  &:hover{
    background-color: $color-gold;
    &:active {
      box-shadow: $color-shadow 0px 1px 2px;
    }
  }
}
</style>

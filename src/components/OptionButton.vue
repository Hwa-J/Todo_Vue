<template>
  <section class="option-section">
    <select
      id="filter"
      @change="filterTodos($event)">
      <option 
        v-for="(item, index) in filter"
        :key="index"
        :value="item">
        {{ item }}
      </option>
    </select>
    <div class="delete-btn">
      <button @click="allDelete">
        All <i class="fas fa-trash-alt"></i>
      </button>
      <button @click="doneDelete">
        Done <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filter: ['All', 'Done', 'Doing'],
    }
  },
  methods: {
    filterTodos(event) {
      let filter = event.target.value
      this.$store.dispatch('filterTodos', filter)
    },
    allDelete() {
      this.$store.dispatch('allDelete')
    },
    doneDelete() {
      this.$store.dispatch('doneDelete')
    }
  }
}
</script>

<style lang="scss" scoped>
.option-section {
  width: 90%;
  display: flex;
  justify-content: space-between;
}
select {
  background-color: transparent;
  border: none;
  color: $color-darkgray;
}
.delete-btn {
  display: flex;
  justify-content: space-between;
  button {
    width: 80px;
    height: 30px;
    margin: 0 5px;
    border-radius: 10px;
    color: $color-darkgray;
    &:hover {
      background-color: $color-lightgray;
      color: red;
      i {
        color: red;
      }
    }
  }
}
</style>

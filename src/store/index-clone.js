import { createStore } from 'vuex'
import axios from 'axios'

const END_POINT = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos'
const headers = {
  'content-type': 'application/json',
  apikey: 'FcKdtJs202204',
  username: 'KDT2_LeeHwaJeong',
}

export default createStore({
  state() {
    return {
      // 많은 컨포넌트에서 todos를 가져다 쓰기위해 Store에 만듦
      todos: [],
      order: 0
    }
  },
  mutations: {
    // payload는 서버에서 가져온 todos가 들어갈 자리
    setTodos(state, payload) {
      state.todos = payload
    },
    newOrder(state) {
      state.order = state.todos.length
    },
    reorder(state) {
      state.todos.map((todo, index) => {
        todo.order = index
      })
    },
  },
  actions: {
    async readTodos({ commit }) {
      const res = await axios({
        url: END_POINT,
        method: 'GET',
        // headers: headers 속성과 값의 이름이 같으면 생략 가능
        headers
      })
      commit('setTodos', res.data)
      commit('reorder')
      console.log(res)
    },
    // action 함수로 첫번째 인수로 context, 두번째 payload의 자리지만 명확히 title이 들어와야하므로 명칭 바꿈
    async createTodo({ state, commit, dispatch }, title) {
      commit('newOrder')
      await axios({
        url: END_POINT,
        method: 'POST',
        headers,
        data: {
          // title: title 속성과 값의 이름이 같으면 생략 가능
          title,
          order: state.order
        }
      })
      // console.log(newTodo.data)
      // state.todos.push(newTodo.data)

      console.log(state.todos)
      dispatch('readTodos')
    },
    async deleteTodo({ state, dispatch }, todoId) {
      // state.todos = state.todos.filter(todo => todo.id !== todoId)
      // let i = state.todos.indexOf(todo => todo.id === todoId)

      // let i = state.todos.findIndex(todo => todo.id === todoId)
      // state.todos.splice(i,1)

      await axios({
        url: `${END_POINT}/${todoId}`,
        method: 'DELETE',
        headers
      })
      console.log(state.todos)
      await dispatch('readTodos')
    },
    async editTodo(context, todo) {

      await axios({
        url: `${END_POINT}/${todo.id}`,
        method: 'PUT',
        headers,
        data: {
          title: todo.title,
          done: todo.done,
          order: todo.order
        }
      })
    },
    async orderChange({ commit, state }) {
      commit('reorder')
      const todoIds = state.todos.map(todo => todo.id)
      await axios({
        url: `${END_POINT}/reorder`,
        method: 'PUT',
        headers,
        data: {
          // todoIds: todoIds
          todoIds
        }
      })
    }
  }
})

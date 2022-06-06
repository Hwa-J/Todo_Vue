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
      order: 0,
      loading: false
    }
  },

  mutations: {
    // payload는 서버에서 가져온 todos가 들어갈 자리
    setTodos(state, payload) {
      state.todos = payload
    },

    // 새로 추가한 항목을 todos의 맨 앞에 넣기위한 함수
    unshiftTodo(state, newTodo) {
      state.todos.unshift(newTodo.data)
    },

    // 삭제할 항목을 찾아 todos에서 삭제하는 함수
    delete(state, todoId) {
      let i = state.todos.findIndex(todo => todo.id === todoId)
      state.todos.splice(i,1)
    },

    // order의 번호를 거꾸로(음수) 계산하기 위한 함수
    reverseOrder(state) {
      state.order = (state.todos.length) * -1
    },

    // todos 배열 데이터의 아이템인 todo 객체 데이터를 수정하는 함수
    setTodo(state, targetTodo, payload) {
      state.todos.map(todo => {
        if (todo === targetTodo) {
          for (const key in payload) {
            todo[key] = payload[key]
          }
        }
      })
    },

    // todos의 자리를 변경하는 함수
    reorderTodos(state, {oldIndex, newIndex}) {
      console.log(oldIndex, newIndex)
      const clone = { ...state.todos[oldIndex] }
      state.todos.splice(oldIndex, 1)
      state.todos.splice(newIndex, 0, clone)
    },

    // loading 이미지를 조종하는 함수
    loading(state, payload) {
      state.loading = payload
    },

    // todos의 done항목 값을 필터링하는 함수
    filter(state, payload) {
      state.todos = state.todos.filter(todo => 
        todo.done === payload) 
    }
  },
  actions: {
    // 데이터 불러오기
    async readTodos({ state, commit }) {
      if (state.todos.length) {commit('loading', true)}
      const res = await axios({
        url: END_POINT,
        method: 'GET',
        // headers: headers 속성과 값의 이름이 같으면 생략 가능
        headers
      })
      console.log(res.data)
      commit('setTodos', res.data)
      commit('loading', false)
    },

    // 데이터 생성하기
    async createTodo({ state, commit }, title) {
      commit('reverseOrder')
      const newTodo = await axios({
        url: END_POINT,
        method: 'POST',
        headers,
        data: {
          // title: title 속성과 값의 이름이 같으면 생략 가능
          title,
          order: state.order
        }
      })
      commit('unshiftTodo', newTodo)
    },

    // 데이터 삭제하기
    async deleteTodo({ commit, dispatch }, todoId) {
      commit('delete', todoId)
      await axios({
        url: `${END_POINT}/${todoId}`,
        method: 'DELETE',
        headers
      })
      // todo 삭제후 순서 재배정
      dispatch('orderChange')
    },

    // 데이터 수정하기
    async updateTodo({ commit }, todo, newValue) {
      commit('setTodo', todo, newValue)
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

    // 변경된 todo 순서 데이터 전송
    async orderChange({ commit, state }, event) {
      if (event !== undefined) {
        commit('reorderTodos', event)
      }
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
    },

    // 옵션 버튼들
    // 선택한 조건(boolean)에 맞게 todos 필터링
    async filterTodos({ commit, dispatch }, boolean) {
      await dispatch('readTodos')
      commit('filter', boolean)
    },

    // 데이터 전체 삭제
    allDelete({ state, dispatch }) {
      const todoId = state.todos.map(todo => todo.id)
      todoId.forEach(id => dispatch('deleteTodo', id))
    },

    // done값이 true인 데이터만 삭제
    doneDelete({ state, dispatch }) {
      const todoId = state.todos.filter(todo => todo.done).map(todo => todo.id)
      todoId.forEach(id => dispatch('deleteTodo', id))
    }
  }
})

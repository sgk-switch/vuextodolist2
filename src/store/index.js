import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedTodos = localStorage.getItem('todo-list')

const store = new Vuex.Store({
  state: {
    todos:savedTodos ? JSON.parse(savedTodos):[
      {
        id:1,
        title: 'test1',
        deadLine:2021-5-31,
        status: '未対応'
      },
      {
        id:2,
        title: 'test2',
        deadLine:2021-5-31,
        status: '未対応'
      },
      {
        id:3,
        title: 'test3',
        deadLine:2021-5-31,
        status: '対応中'
      },
    ]
  },
  mutations: {
    addTodo(state, payload){
      state.todos.push({id: payload.id, title: payload.title, deadLine: payload.deadLine, status:'未対応'})
    },
    deleteTodo(state, payload){
      state.todos.splice(payload.listIndex, 1)
    },
    // editTodo(state, payload){
    //  修正された値をstateに上書きする処理
    // }
  },
  actions: {
    addTodo(context, payload){
      context.commit('addTodo',payload)
    },
    deleteTodo(context,payload){
      context.commit('deleteTodo', payload)
    },
    editTodo(context, payload){
      context.commit('editTodo', payload)
    }
  },
  getters: {
  }
})

store.subscribe((mutation,state) => {
  localStorage.setItem('todo-list',JSON.stringify(state.todos))
})

export default store;

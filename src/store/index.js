import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedTodos = localStorage.getItem('todo-list')

const store = new Vuex.Store({
  state: {
    todos:savedTodos ? JSON.parse(savedTodos):[
    ],
    
    todoNum:0,

    editItem:{
      id:'',
      title:'',
      deadLine:'',
      todoIndex:'',
      status:'',
    }
  },
  mutations: {
    addTodo(state, payload){
      state.todos.push({id:state.todoNum, title: payload.title, deadLine: payload.deadLine, index:payload.todoIndex,status:'未対応'})
      state.todoNum++
    },
    // 削除ができなくなったとき
    // deleteTodo(state){
    //   state.todos.splice(0, 1)
    // },
    deleteTodo(state,payload){
      // 配列の順番とidは異なる
      state.todos.splice(payload.todoIndex, 1)
    },
    editTodo(state,payload){
      // state.editItemに更新前のデータを保存
      state.editItem.id = payload.id
      state.editItem.title = payload.title
      state.editItem.deadLine = payload.deadLine
      state.editItem.todoIndex = payload.todoIndex
      state.editItem.status = payload.status 

      console.log(`storeの値:${state.editItem}`)
    },

    updateTodo(state){
      // 変更前のtodoを削除し、変更後のtodoを変更前と同じ場所に追加
      // 下記の状態だとidがうまく表示されていない。さらに、続けて編集しようとすると他のTodoが変わってしまう
      state.todos.splice(state.editItem.todoIndex,1,state.editItem)
      // console.log(state.editItem)
    }
  },

  actions: {
    addTodo(context, payload){
      context.commit('addTodo',payload)
    },
    deleteTodo(context, payload){
      context.commit('deleteTodo', payload)
    },
    // 編集するTodoのデータをstate.editItemに保存
    editTodo(context, payload) {
      context.commit('editTodo',payload)
    },
    updateTodo(context, payload){
      context.commit('updateTodo', payload)
    }
  },
  getters: {
  }
})

store.subscribe((mutation,state) => {
  localStorage.setItem('todo-list',JSON.stringify(state.todos))
})

export default store;

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedTodos = localStorage.getItem('todo-list')

const store = new Vuex.Store({
  state: {
    todos:savedTodos ? JSON.parse(savedTodos):[
    ],
    
    editItem:{
      id:'',
      title:'',
      deadLine:'',
      todoIndex:'',
      status:'',
    },
  },
  mutations: {
    addTodo(state, payload){
      state.todos.push({id: payload.id, title: payload.title, deadLine: payload.deadLine,status:'未対応'})
    }, 
    
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
      console.log(state.editItem)
    },

    updateTodo(state){
      // 編集したtodoのidを取得
      let updateId = state.editItem.id
      
      //updateIdを持つtodoをtodosから探す
      const updateItem = state.todos.find((todo)=> 
        todo.id == updateId)
      console.log(updateItem)
      
      //updateIdを持つtodoのtodoIndexを取得
      const updateIndex = state.todos.indexOf(updateItem)
      console.log(updateIndex)

      //編集前のtodoとeditItemを入れ替える
      state.todos.splice(updateIndex,1,state.editItem)
      state.editItem = {}
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

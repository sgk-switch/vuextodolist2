<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
       <v-toolbar-title>My TodoList</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn 
        text
        @click="openModal()"
      >
        新規作成
      </v-btn>

    </v-app-bar>

    <v-main>
      <Board
        :isShowModal='isShowModal' 
        @custom-close="changeIsShow()"
      />
    </v-main>
  </v-app>
</template>

<script>
import Board from './components/Board.vue';

export default {
  name: 'App',

  components: {
    Board,
  },

  data(){
    return{
      isShowModal: false,
    }
  },

  methods:{
    openModal(){
      this.isShowModal = !this.isShowModal
      console.log(this.isShowModal)
    },
    changeIsShow(){
      this.isShowModal = false
    }
  }

};
</script>

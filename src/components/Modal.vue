<template>
  <div class="overlay"
  >
    <v-card 
      class="modal-body"
    >
      <form class="add-todo ml-5 mb-10" @submit.prevent="addTodo">

         <v-text-field
            class="mr-5 mb-5"
            label="Todo名"
            v-model="title"
            placeholder="Add new todo"
          >
          </v-text-field>

          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="deadLine"
                label="期日"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="deadLine"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>

           <v-card-actions
            class="mr-5 mb-5"
           >
            <v-btn
              color="primary"
              small
              rounded
              @click="addTodo()"
            >
              追加する
            </v-btn>
            <v-btn
              color="gray"
              small
              rounded
              @click="hideModal()"
            >
              キャンセル
            </v-btn>
           </v-card-actions>
      </form> 
    </v-card>
  </div>
</template>


<script>
  export default {
    data(){
        return{
          title:'',
          deadLine: new Date().toISOString().substr(0, 10),
          menu: false,
        }
    },

    methods:{
        addTodo(){
          this.$store.dispatch('addTodo',{title: this.title,deadLine: this.deadLine})
          this.title = ''
          this.deadLine = ''
          this.hideModal()
        },

        hideModal(){
          this.$emit('custom-modal')
        }

    }
  }
</script>

<style>
  .overlay{
    /* 要素を重ねた時の順番 */
    z-index:1;

    /* 画面全体を覆う設定 */
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);

    /* 画面の中央に要素を表示させる設定 */
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .modal-body{
    width: 600px;
    height: 240px;
    z-index:2;
    padding: 1em;
    background:#fff;
  }

</style>
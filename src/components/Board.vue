<template>
  <div>
    <main>
      <p class="info-line mt-5 ml-5">All: {{ todos.length }} todos</p>
		
      <!-- 新規作成モーダル -->
      <modal 
        v-show="getModalShow"
        @custom-modal="hideModal"
      />

      <!-- 修正モーダル -->
      <todo-edit
        v-show="isShowEdit"
        @custom-edit="showEdit"
        @custom-close-edit="closeEdit"
      />

        <div class="todo-index d-flex flex-wrap ml-5">
          <todo v-for="(item,index) in todos"
            :key = "item.id"
            :id = "item.id"
            :title = "item.title"
            :deadLine = "item.deadLine"
            :status = "item.status"
            :todoIndex = "index"
            @custom-edit = "showEdit"
          />
        </div>  
    </main>
  </div> 
</template>

<script>
    import Todo from './Todo.vue'
    import Modal from './Modal.vue'
    import TodoEdit from './TodoEdit.vue'
    import { mapState } from 'vuex'

    export default {
			components:{
				Todo,
        Modal,
        TodoEdit
			},

      props:{
        isShowModal:{
          type:Boolean
        }
      },

      data(){
        return{
          isShowEdit:false,
        }
      },

      computed:{
        ...mapState([
          'todos'
        ]),
        
        // Todo新規作成モーダルの表示
        getModalShow:{
          get(){
            const getIsShowModal = this.isShowModal
            return getIsShowModal
          },
        },
      },

      methods:{
        // Todo新規作成またはキャンセルでモーダルを消す
        hideModal(){
          this.$emit('custom-close')
        },
        // Todo編集モーダルの表示
        showEdit(){
          this.isShowEdit = true;
        },
        // Todo編集モーダルを消す
        closeEdit(){
          this.isShowEdit = false;
        }
      },
    }
</script>
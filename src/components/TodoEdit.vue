<template>
  <div class="overlay"
  >
    <v-card 
      class="modal-body"
    > 
			<form class="add-todo ml-5 mb-10" @submit.prevent="editTodo">
				<v-text-field
					class="mr-5 mb-5"
					label="Todo名"
					v-model="editItem.title"
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
							v-model="editItem.deadLine"
							label="期日"
							prepend-icon="mdi-calendar"
							readonly
							v-bind="attrs"
							v-on="on"
						></v-text-field>
					</template>
					<v-date-picker
						v-model="editItem.deadLine"
						@input="menu = false"
					></v-date-picker>
				</v-menu>

				<v-row>
					<v-col cols='6'>
						<v-select
							v-model="editItem.status"
							:items="status"
						>
						</v-select>
					</v-col>
					<v-col cols='6'>
						<v-card-actions
						class="mr-5 mb-5"
						>
							<v-btn
								color="primary"
								small
								rounded
								@click="updateTodo()"
							>
								更新
							</v-btn>
							<v-btn
								color="gray"
								small
								rounded
								@click="hideEdit()"
							>
								キャンセル
							</v-btn>
						</v-card-actions>
					</v-col>
				</v-row>
      </form> 
    </v-card>
  </div>
</template>


<script>
	export default {
		name:'todo-edit',

		data() {
			return {
				menu: false,
				status:['未対応','対応中','完了']
			}
		},
		
		computed:{
			editItem(){
				return this.$store.state.editItem
			}
		},
	
    methods:{
			updateTodo(){
				this.$store.dispatch('updateTodo',{todoIndex: this.todoIndex})		
			},

			hideEdit(){
				this.$emit('custom-close-edit')
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
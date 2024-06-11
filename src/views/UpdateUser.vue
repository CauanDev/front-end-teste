<template>
  
  <LoadingCircle v-if="loading"/>

  <div>
  <TitleView title="Atualizar Usuários"/>
  </div>
  <div class=" flex justify-center mt-10">
     <TableView :headers="['Nome','Email','Criado Em','Ver Detalhes']" :body="users" @showDetails="showDetails" class="w-[50%]"/>  
  </div>

  <div id="default-modal" :class="{'hidden':openModal}" class=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 class="text-xl font-semibold text-gray-900 ">
                    Alterar {{modalContent.name}}
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="default-modal" @click="openModal=!openModal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4">
              <div>
                <label  class="block mb-2 text-sm font-medium text-gray-900 ">Alterar Nome</label>
                <input v-model="user.name" type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o novo nome"  />
              </div>
              <div>
                <label  class="block mb-2 text-sm font-medium text-gray-900 ">Alterar Senha</label>
                <input v-model="user.password" type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Digite a nova senha"  />
              </div>
              <div>
                <label  class="block mb-2 text-sm font-medium text-gray-900 ">Alterar Email</label>
                <input v-model="user.email" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Digite o novo email"  />
              </div>
            </div>

            <div class="flex items-center justify-center p-2 border-t border-gray-200 rounded-b">
              <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" @click="atualizar">Gravar</button>
              <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" @click="apagar">Apagar</button>

            </div>
        </div>
    </div>
</div>



</template>

<script>

import http from '@/services/http.js';
import TitleView from '../components/Title/TitleView.vue';
import TableView from '../components/Table/TableView.vue';
import { format } from 'date-fns'; 
import LoadingCircle from '../components/loading/LoadingCircle.vue';

export default {
  name: 'UpdateUser',
  components: {
   TitleView,TableView, LoadingCircle
  },
  data() {
    return {
      loading: false,
      users: [] ,
      openModal: true,
      newUser:{},
      modalContent:'',
      user: {
        name: '',
        password:'',
        email:''        
      }

    };
  },
  methods: {
  async getResults(){
    try {
      const data = await http.get('/users');
      this.users = data.data.users.map(user => {
          return {
           
            name: user.name,
            email: user.email,      
            created_at: format(new Date(user.created_at), 'dd/MM/yyyy'),
            implementar: {
              name: user.name,
              email: user.email,     
              id: user.id,
              password: user.password
            }

          };
        }

      );

    } catch (error) {
      console.log(error.response)
    }
    },
    showDetails(details) {
      this.modalContent = details;
      this.newUser.name = details.name;
      this.newUser.email = details.email;
      this.newUser.password = details.password;
      this.user.name = details.name
      this.user.email = details.email
      this.openModal = false;
    },
    async atualizar(){
        var count=0;
      
        if(this.modalContent.name!=this.user.name)
        {
          this.newUser.name = this.user.name;
        }  
        else count++
        if(this.modalContent.email!=this.user.email && !/\s/.test(this.user.email) )
        {
          this.newUser.email = this.user.email;
        } else count++ 
        if(this.modalContent.password!=this.user.password && (this.user.password!='') )
        {
          this.newUser.password = this.user.password;
        } else count++

        if(count != 3){
        try {
          this.loading = true
         await http.put('/users/'+this.modalContent.id,this.newUser);
         alert("Usuário Atualizado com sucesso")
         this.loading = false
         window.location.reload();
        } catch (error) {
          console.log(error.response)
        }
        } 
 
        
      
    },
    async apagar(){
      try {
        this.loading = true
          await http.delete('/users/'+this.modalContent.id,this.newUser);
          alert("Usuário Apagado com sucesso")
          this.loading = false
          window.location.reload();
        } catch (error) {
          console.log(error.response)
        }
    }
  },
  mounted() {
    this.getResults();
  }
};
</script>


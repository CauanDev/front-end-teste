<template>
  
  <LoadingCircle v-if="loading"/>

  <div>
  <TitleView title="Usuários"/>
  </div>
  <div>
    <div class="flex justify-center w-full mt-10">
      <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="openUserModal">Adicionar Usuário</button>
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="openFilterModal">Aplicar Filtros</button>
      <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" @click="openChardModal">Visualizar Gráficos</button>
    </div>

  </div>
  <div class="flex justify-center max-h-[420px] overflow-y-auto">
    <TableView :headers="['Nome','Email','Criado Em','Ver Detalhes']" :body="users" @showDetails="showDetails" class="w-[50%]"/>  
  </div>

  <div id="default-modal" :class="{'hidden': openModal}" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
        <div class="relative bg-white rounded-lg shadow">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <div v-if="modalUser">
                <h3 class="text-xl font-semibold text-gray-900">
                  Criar Usuário
                </h3>                
              </div>
              <div v-if="modalUpdate">
                <h3 class="text-xl font-semibold text-gray-900">
                  Alterar {{ modalContent.name }}
                </h3>                
              </div>
              <div v-if="modalFilter">
                <h3 class="text-xl font-semibold text-gray-900">
                  Aplicar Filtros
                </h3>                
              </div>
              <div v-if="modalChart">
                <h3 class="text-xl font-semibold text-gray-900">
                  Visualizar Gráficos
                </h3>                
              </div>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal" @click="close">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only" >Close modal</span>
                </button>
            </div>            
            <div class="p-4 md:p-5 space-y-4">
              <div v-if="modalUser"> 
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">Digite Nome</label>
                    <input v-model="user.name" :class="{'border-red-500': !isUsernameValid,'border-green-500': isFormValid}"  @input="validateName" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o novo nome" />
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">Digite Senha</label>
                    <input v-model="user.password" :class="{'border-red-500': !isPasswordValid,'border-green-500': isFormValid}"  @input="validatePassword"  type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite a nova senha" />
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">Digite Email</label>
                    <input v-model="user.email" :class="{'border-red-500': !isEmailValid,'border-green-500': isFormValid}"  @input="validateEmail" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o novo email" />
                </div>
              </div>
              <div v-if="modalUpdate">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">Alterar Nome</label>
                    <input v-model="user.name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o novo nome" />
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">Alterar Senha</label>
                    <input v-model="user.password" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite a nova senha" />
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">Alterar Email</label>
                    <input v-model="user.email" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o novo email" />
                </div>
              </div>
              <div v-if="modalFilter">
                   <div class="flex flex-col gap-1.5 text-center">
                     <div class="flex gap-2 items-center justify-center">
                         <div class="flex flex-col">
                           <label for="endDate" class="text-sm font-medium text-gray-700">Nome Usuário</label>
                           <input type="text" placeholder="Digite o Nome" v-model="filter.name" class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm">      
                         </div>
                         <div class="flex flex-col ">    
                           <label for="startDate" class="text-sm font-medium text-gray-700">Data Início</label>
                           <input type="date" @input="filter.startDate = $event.target.value" class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm">      
                         </div>
                         <div class="flex flex-col">
                           <label for="endDate" class="text-sm font-medium text-gray-700">Data Final</label>
                           <input type="date" @input="filter.endDate = $event.target.value" class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm">      
                         </div>


                       </div>
                   </div>                   
                </div>
              <div v-if="modalChart">
                <div class="flex flex-col gap-1.5 text-center">
                    <div class="flex gap-2 items-center justify-center">
                      <CountChart :users="users" />
                    </div>
                   </div>         
              </div>
            </div>

            <div class="flex items-center justify-center justify-end p-2 border-t border-gray-200 rounded-b">
              <div v-if="modalUser">
                <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="addUser">Criar Usuário</button>
              </div>
              <div v-if="modalUpdate">
                <button type="button" class="focus:outline-none text-white bg-[#337C24] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="atualizar">Gravar</button>
                <button type="button" class="focus:outline-none text-white bg-[#FF3E30] hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="apagar">Apagar</button>
              </div>
              <div v-if="modalFilter">
                <button type="button" class="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="filterResults">Aplicar Filtro</button>
              </div>
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
import CountChart from "../components/chards/CountChard.vue"

export default {
  name: 'ListUser',
  components: {
   TitleView,TableView, LoadingCircle,CountChart
  },
  data() {
    return {
      loading: false,
      users: [],
      isUsernameValid: true,
      isPasswordValid: true,
      isEmailValid: true,
      isFormValid: false,
      modalUser: false,
      modalUpdate: false,
      modalFilter: false,
      modalChart:false,
      openModal: true,
      newUser:{},
      modalContent:'',
      filter: {

      },
      user: {
        name: '',
        password:'',
        email:''        
      }

    };
  },
  methods: {
  close(){
    this.modalContent= '',
    this.openModal = true;
    this.modalUser = false;
    this.modalFilter = false;
    this.modalUpdate = false;
    this.modalChart = false
  },
  openFilterModal()
  {
    this.modalFilter = true;
    this.openModal = false;
   
  },
  openChardModal(){
    this.modalChart = true;
    this.openModal = false;
  },
  async getResults(){
    this.loading = true;

    try {
      const data = await http.get('/users-all');
      this.mapUser(data.data.users)
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.log(error.response)
    }
    
    },
    async filterResults(){
      let validForm = true
      if(this.filter.endDate && this.filter.startDate){
        if(this.filter.endDate < this.filter.startDate ||  this.filter.maxAge < this.filter.minAge){
          alert("Por favor Digite uma Data Válida")
          validForm = false
        }
        
      }
      if(!this.filter.name && !this.filter.endDate && !this.filter.startDate) {
        validForm = false
      }
      if(validForm)
      {
        try {
        this.loading = true;
        console.log(this.filter)
        const {data} = await http.post('/filter-users',this.filter);
        console.log(data)
        data.users.length ? this.mapUser(data.users) : alert("Sua Consulta Retornou Zero")
       

        this.close()
        this.loading = false;

      } catch (error) {
        this.loading = false;

        console.log(error)        
      }
      }
      else{
        alert("Aplique Corretamente os Filtros")
      }

    },
    mapUser(array){
    this.users = array.map(user => {
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
        })

    
    },
    validateEmail() 
    {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isEmailValid = !emailPattern.test(this.user.email)? false:true;
    },
    validateName() 
    {
      this.isUsernameValid= (this.user.name.length < 3 || /\d/.test(this.user.name))? false: true

    },
    validatePassword() 
    {
      this.isPasswordValid=  this.user.password.length < 6 ? false : true
    },
    openUserModal(){
      this.user = {
        name: '',
        password:'',
        email:''        
      },
      this.modalUser= true;
      this.openModal = false;
    },
    async addUser(){
      this.loading = true;
      this.isFormValid = (this.isUsernameValid && this.isPasswordValid  && this.isEmailValid) 
      if(this.isFormValid)
      {
        try {
            await http.post('/register',this.user);
            alert("Usuário Adicionado com sucesso")
            window.location.reload()
            this.loading = false;
          } catch (error) {
            this.loading = false;

            console.log(error)
          }
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
      this.modalUpdate = true;
    },
    async atualizar(){
        var count=0;
        this.loading = true;
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
         await http.put('/update-user/'+this.modalContent.id,this.newUser);
         alert("Usuário Atualizado com sucesso")
         this.loading = false
         window.location.reload();
        } catch (error) {
          this.loading = false
        }
        } 
 
        
      
    },
    async apagar(){
      try {
        this.loading = true
          await http.delete('/delete-user/'+this.modalContent.id);
          alert("Usuário Apagado com sucesso")
          this.loading = false
          window.location.reload();
        } catch (error) {
          this.loading = false
        }
    }
  },
  mounted() {
    this.getResults();
  }
};
</script>


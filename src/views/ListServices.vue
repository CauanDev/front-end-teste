<template>
    <LoadingCircle v-if="loading"/>
     
     <div>
     <TitleView title="Revisões"/>
     </div>
     <div>
       <div class="flex justify-center w-full mt-10">
         <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="openUserModal">Adicionar Revisão</button> 
         <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="openFilterModal">Aplicar Filtros</button>
       </div>
     </div>
     <div class="flex justify-center">
        <TableView :headers="['Nome','Email','Criado Em','Ver Detalhes']" :body="users" @showDetails="showDetails" class="w-[50%]"/>  
     </div>
   
     <div id="default-modal" :class="{'hidden': openModal}" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
       <div class="relative p-4 w-full max-w-2xl max-h-full">
           <div class="relative bg-white rounded-lg shadow" >
               <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                 <div v-if="modalFilter">
                   <h3 class="text-xl font-semibold text-gray-900">
                     Aplicar Filtros
                   </h3>                
                 </div>
                 <div v-if="modalUser">
                   <h3 class="text-xl font-semibold text-gray-900">
                     Criar Propietário
                   </h3>                
                 </div>
                 <div v-if="modalUpdate">
                   <h3 class="text-xl font-semibold text-gray-900">
                     Alterar {{ modalContent.name }}
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
                       <input v-model="user.name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o novo nome" />
                   </div>
                   <div>
                       <label class="block mb-2 text-sm font-medium text-gray-900">Digite Senha</label>
                       <input v-model="user.password" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite a nova senha" />
                   </div>
                   <div>
                       <label class="block mb-2 text-sm font-medium text-gray-900">Digite Email</label>
                       <input v-model="user.email" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o novo email" />
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
                         <div class="flex flex-col ">    
                           <label for="startDate" class="text-sm font-medium text-gray-700">Data Início</label>
                           <input type="date" @input="startDate = $event.target.value" class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm">      
                         </div>
                         <div class="flex flex-col">
                           <label for="endDate" class="text-sm font-medium text-gray-700">Data Final:</label>
                           <input type="date" @input="endDate = $event.target.value" class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm">      
                         </div>
                         <div class="flex flex-col">
                           <label for="endDate" class="text-sm font-medium text-gray-700">Nome Proprietário</label>
                           <input type="text" placeholder="Digite o Nome" v-model="filterName" class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm">      
                         </div>
                         <div v-if="tooltip" class="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip ">
                                Média de Tempo Entre uma Revisão e Outra
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                         <div class="flex flex-col gap-2">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" 
                                @mouseover="tooltip = true"
                                @mouseleave="tooltip = false"
                                class="w-4"
                            >
                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                            </svg>

                            <input type="checkbox" v-model="average" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 ">
                        </div>

                       </div>
                     <div class="flex gap-2 items-center justify-center">
                       <div>
                         <label  class="block text-sm font-medium text-gray-900 ">Marca com:</label>
                         <select v-model="sex"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                           <option value="all" selected>Nenhuma Opção</option>
                           <option value="maior">Maior Número de Revisão</option>
                           <option value="menor">Menor Número de Revisão</option>
                         </select>
                       </div>
                       <div>
                         <label  class="block text-sm font-medium text-gray-900 ">Mecânico Responsável:</label>
                         <select v-model="sex"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                           <option value="all" selected>Nenhuma Opção</option>
                            <!--                                               
                            
                            Aplicar v-for de todos os trabalhadores
                           
                            -->
                           <option value="maior">Maior Número de Revisão</option>
                           <option value="menor">Menor Número de Revisão</option>
                         </select>
                       </div>
   
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
                   <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="filter">Aplicar Filtro</button>
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
     
     export default {
       name: 'ListServices',
       components: {
        TitleView,TableView, LoadingCircle
       },
       data() {
         return {
           tooltip:false,
           average: false,
           maxAge: '',
           minAge: '',
           filterName: '',
           loading: false,
           users: [],
           sex: 'A',
           startDate: '',
           endDate: '',
           modalUpdate: false,
           modalFilter: false,
           modalUser: false,
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
       close(){
         this.modalContent= '',
         this.openModal = true;
         this.modalUser = false;
         this.modalFilter = false;
         this.modalUpdate = false;
       },
       openFilterModal(){
         this.modalFilter = true;
         this.openModal = false;
   
       },
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
         openUserModal(){
           this.user = {
             name: '',
             password:'',
             email:''        
           },
           this.modalUser= true;
           this.openModal = false;
         },
         addUser(){
           console.log(this.user)
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
               this.loading = false
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
               this.loading = false
             }
         },
         async filter(){
           let users  = { }
   
           if(this.sex !== 'A')users.sex = this.sex;
           if(this.minAge !=='')users.minAge = this.minAge;
           if(this.maxAge !=='')users.maxAge = this.maxAge;
           if(this.endDate !=='')users.endDate = this.endDate;
           if(this.startDate !=='')users.startDate = this.startDate;
           if(this.name !=='')users.name = this.name;
           if (Object.keys(users).length === 1) 
           {
             alert("O objeto users está vazio.");
           } 
           else 
           {
             alert("O objeto users não está vazio.");
           }
         }
       },
       watch:{
         minAge(newVal){
           this.minAge = newVal.replace(/\D+/g, '');
         },
         maxAge(newVal){
           this.maxAge = newVal.replace(/\D+/g, '');
         },
         filterName(newVal){
           this.filterName = newVal.replace(/\d+/g, '');
         }
       }
       ,
       mounted() {
         this.getResults();
       }
     };
     </script>
     
     
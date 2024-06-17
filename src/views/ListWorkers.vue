<template>
    <LoadingCircle v-if="loading"/>
     
     <div>
     <TitleView title="Trabalhadores"/>
     </div>
     <div>
       <div class="flex justify-center w-full mt-10">
         <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="openUserModal">Adicionar Funcionário</button> 
         <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="openFilterModal">Aplicar Filtros</button>
         <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" @click="openChardModal">Visualizar Gráficos</button>
       </div>
     </div>
     <div class="flex justify-center max-h-[420px] overflow-y-auto">
      <TableView :headers="['Nome','Salário','Criado Em','Ver Detalhes']" :body="users" @showDetails="showDetails" class="w-[50%]"/>  
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
                      Criar Funcionário
                   </h3>                
                 </div>
                 <div v-if="modalUpdate">
                   <h3 class="text-xl font-semibold text-gray-900">
                      Alterar {{ modalContent.name }}
                   </h3>                
                 </div>
                 <div v-if="modalChart">
                   <h3 class="text-xl font-semibold text-gray-900">
                    Visualizar Gráficos
                  </h3> 
                  <div class="flex gap-2">
                    Aplicar Gráficos:
                    <div>
                      <input 
                        v-model="allChecked"
                        :disabled="allChecked"
                        @change="toggleCheckbox('allChecked')"
                        type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                        <label  class="ms-2 text-sm font-medium">Todos</label>
                    </div>
                    <div>
                      <input 
                        v-model="filterChecked"
                        @change="toggleCheckbox('filterChecked')"
                        :disabled="filterChecked"
                        type="checkbox"  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                        <label  class="ms-2 text-sm font-medium">Filtro</label>
                    </div>
                    <div>
                      <input 
                        v-model="splitBySex"                        
                        type="checkbox"  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                        <label  class="ms-2 text-sm font-medium">Separar entre Genêros</label>
                    </div>
                  </div>

                                  
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
                       <input v-model="worker.name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o Nome" />
                   </div>
                   <div>
                       <label class="block mb-2 text-sm font-medium text-gray-900">Digite a Idade</label>
                       <input v-model="worker.age" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite a Idade" />
                   </div>
                   <div>
                       <label class="block mb-2 text-sm font-medium text-gray-900">Digite Email</label>
                       <input v-model="worker.email" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o Email" />
                   </div>
                   <div>
                    <label  class="block text-sm font-medium text-gray-900 ">Selecione o Sexo</label>
                    <select v-model="worker.sex"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                    </select>
                  </div>
                  <div>
                       <label class="block mb-2 text-sm font-medium text-gray-900">Digite o Salário</label>
                       <input v-model="worker.salary" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o Salário" />
                   </div>

                   <div>
                       <label class="block mb-2 text-sm font-medium text-gray-900">Digite o Endereço</label>
                       <input v-model="worker.adress" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o Endereço" />
                   </div>
                 </div>
                 <div v-if="modalChart" class="flex flex-col">
                  <div  class="w-[50%] flex">
                    <SexChard :users="filterChar"/>
                    <div v-if="!splitBySex">
                      <CountChart :users="filterChar" />                          
                    </div>
                    <div v-else> 
                      <CountChardSplit :users="filterChar"/>
                    </div>
                
                  </div>
                  <div class="w-[50%] flex">
                    <div v-if="!splitBySex">
                      <SalaryChard :users="filterChar"/>
                    </div>
                    <div v-else>
                      <SalaryChardSplit :users="filterChar"/>
                    </div>
                    <div v-if="!splitBySex">
                      <AgeChard :users="filterChar"/>
                    </div>
                    <div v-else>
                      <AgeChardSplit :users="filterChar"/>
                    </div>

                  </div>

                  
                 </div>
                 <div v-if="modalUpdate">
                  <div>
                       <label class="block mb-2 text-sm font-medium text-gray-900">Digite Nome</label>
                       <input v-model="user.name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o Nome" />
                   </div>
                   <div>
                       <label class="block mb-2 text-sm font-medium text-gray-900">Digite a Idade</label>
                       <input v-model="user.age" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite a Idade" />
                   </div>
                   <div>
                       <label class="block mb-2 text-sm font-medium text-gray-900">Digite Email</label>
                       <input v-model="user.email" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o Email" />
                   </div>
                   <div>
                    <label  class="block text-sm font-medium text-gray-900 ">Selecione o Sexo</label>
                    <select v-model="user.sex"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                    </select>
                  </div>
                  <div>
                       <label class="block mb-2 text-sm font-medium text-gray-900">Digite o Salário</label>
                       <input v-model="user.salary" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o Salário" />
                   </div>

                   <div>
                       <label class="block mb-2 text-sm font-medium text-gray-900">Digite o Endereço</label>
                       <input v-model="user.adress" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o Endereço" />
                   </div>
                 </div>
                 <div v-if="modalFilter">
                   <div class="flex flex-col gap-1.5 text-center">
                     <div class="flex gap-2 items-center justify-center">
                         <div class="flex flex-col">
                           <label for="endDate" class="text-sm font-medium text-gray-700">Nome Funcionário</label>
                           <input type="text" placeholder="Digite o Nome" v-model="filterName" class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm">      
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
                     <div class="flex gap-2 items-center justify-center">
                       <div>
                         <label  class="block text-sm font-medium text-gray-900 ">Selecione o Sexo</label>
                         <select v-model="filter.sex"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                           <option value="A" selected>Todos as opções</option>
                           <option value="M">Masculino</option>
                           <option value="F">Feminino</option>
                         </select>
                       </div>
                       <div>    
                           <label  class="text-sm font-medium text-gray-700">Idade Mínima</label>
                           <input type="text" v-model="minAge" class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm">      
                       </div>
                       <div>    
                           <label  class="text-sm font-medium text-gray-700">Idade Máxima</label>
                           <input type="text" v-model="maxAge" class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm">      
                       </div>
   
                     </div>
                     <div class="flex gap-2 items-center justify-center">
                       <div>    
                           <label  class="text-sm font-medium text-gray-700">Salário Mínimo</label>
                           <input type="text" v-model="minSalary" class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm">      
                       </div>
                       <div>    
                           <label  class="text-sm font-medium text-gray-700">Salário Máximo</label>
                           <input type="text" v-model="maxSalary" class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm">      
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
                   <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="setFilter">Aplicar Filtro</button>
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
     import CountChart from "../components/chards/CountChard.vue";
     import SalaryChard from "../components/chards/SalaryChard.vue";
     import SexChard from '../components/chards/SexChard.vue';
     import AgeChard from '../components/chards/AgeChard.vue';
     import AgeChardSplit from '../components/chards/AgeChardSplit.vue';
     import CountChardSplit from  '../components/chards/CountChardSplit.vue';
     import SalaryChardSplit from'../components/chards/SalaryChardSplit.vue';
     export default {
       name: 'ListWorkers',
       components: {
        TitleView,TableView, LoadingCircle,CountChart,SalaryChard,SexChard, AgeChard,AgeChardSplit,CountChardSplit,SalaryChardSplit
       },
       data() {
         return {
           filter:{},
           filterName: '',
           minAge: '',
           maxAge: '',
           maxSalary: '',
           minSalary: '',
           loading: false,
           allArray: [],
           splitBySex: false,
           filterChecked: false,
           allChecked: true,
           users: [],
           modalUpdate: false,
           modalFilter: false,
           modalUser: false,
           modalChart:false,
           openModal: true,
           newUser:{},
           modalContent:'',
           worker:{},
           user: {}
     
         };
       },
       methods: {
       close(){
         this.openModal = true;
         this.modalUser = false;
         this.modalFilter = false;
         this.modalUpdate = false;
         this.modalChart = false;
       },
        openChardModal(){
          this.modalChart = true;
          this.openModal = false;
        },
       openFilterModal(){
         this.modalFilter = true;
         this.openModal = false;
   
       },
       async getResults(){
         try {
          this.loading = true;

          const data = await http.get('/workers-all');
          this.setUsers(data.data.workers)
          this.allArray = this.users
          this.filterChar = this.users
          this.loading = false;

         } catch (error) {
          this.loading = false;

           console.log(error.response)
         }
         
         },
         openUserModal(){
           this.user = {
     
           },
           this.modalUser= true;
           this.openModal = false;
         },
         async addUser(){
          this.loading = true
          if(this.worker.name && this.worker.age&&this.worker.email&&this.worker.sex&&this.worker.salary&&this.worker.adress)
          {
              try {
                await http.post('/workers-register', this.worker)
                alert("Funcionário Adicionado com sucesso")
                window.location.reload()
                this.loading = false

              } catch (error) {
                this.loading = false

                console.log(error)
              }
          }
          else{
            alert("Preencha Tudo Corretamente")

          }
         },
         showDetails(details) {
            console.log("oie")
           this.modalContent = details;
           this.user = { ...details };
           this.newUser = {...details}
           this.openModal = false;
           this.modalUpdate = true;
         },
         async atualizar(){

            if(JSON.stringify(this.modalContent) == JSON.stringify(this.user))
            {
              alert("Faça uma Alteração Primeiro!")
            }
            else
            {
              if(this.modalContent.name!=this.user.name)
              {
                this.newUser.name = this.user.name;
              }                
              if(this.modalContent.email!=this.user.email)
              {
                this.newUser.email = this.user.email;
              } 
              if(this.modalContent.salary!=this.user.salary)
              {
                this.newUser.salary = this.user.salary;
              } 
              if(this.modalContent.sex!=this.user.sex)
              {
                this.newUser.sex = this.user.sex;
              }              
              if(this.modalContent.age!=this.user.age)
              {
                this.newUser.age = this.user.age;
              } 
              if(this.modalContent.adress!=this.user.adress)
              {
                this.newUser.adress = this.user.adress;
              } 
              try {
              this.loading = true
              console.log(this.newUser)
              await http.put('/update-worker',this.newUser);
        
              alert("Funcionário Atualizado com sucesso")
              window.location.reload();
              this.loading = false
             } catch (error) {
              console.log(error)
               this.loading = false
             }
            }

     
            

             
      
             
           
         },
         setUsers(array){
          this.users =array.map(user => {              
             return {
                 name: user.name,
                 salary:"R$"+user.salary,      
                 created_at: format(new Date(user.created_at), 'dd/MM/yyyy'),
                 implementar: {
                   name: user.name,
                   email: user.email,     
                   id: user.id,
                   salary: user.salary,
                   sex: user.sex,
                   age: user.age,
                   adress: user.adress
                 }
     
               };
             }
     
           );
         },
         toggleCheckbox(option){
          if(option == "allChecked")
          {
            this.filterChecked = false
            this.allChecked = true
          }
          if(option == 'filterChecked')
          {
            this.allChecked = false
            this.filterChecked = true
          }
         },
         async apagar(){

           try {
               this.loading = true
               const data = await http.delete('/delete-worker/'+this.modalContent.id,{"id":this.modalContent.id});
               console.log(data)
               alert("Funcionário Apagado com sucesso")
               this.loading = false
               window.location.reload();

             } catch (error) {
               this.loading = false
               console.log(error)
             }
         },
         async setFilter(){
          this.loading = true
          if(this.filter.endDate < this.filter.startDate || this.filter.maxAge < this.filter.minAge ) alert("Por favor Digite Corretamente")         
          else
          {
            if(this.filter!={})
            {
              
              try {
                const {data} = await http.post('/filter-workers', this.filter);     
                this.setUsers(data.workers)   
                this.close()
                this.loading = false             
              } catch (error) {
                this.loading = false           
                console.log(error)
              }

            }
          }
         },
       },

       watch:{
         minAge(newVal){
           this.minAge = newVal.replace(/\D+/g, '');
           this.filter.minAge = this.minAge
         },
         maxAge(newVal){
            this.maxAge = newVal.replace(/\D+/g, '');
           this.filter.maxAge = this.maxAge
         },
         filterName(newVal){
           this.filterName = newVal.replace(/\d+/g, '');
           this.filter.name = this.filterName
         },
         maxSalary(newVal){
           this.maxSalary = newVal.replace(/\D+/g, '');
           this.filter.maxSalary = this.maxSalary
         },
         minSalary(newVal){
           this.minSalary = newVal.replace(/\D+/g, '');
           this.filter.minSalary =   this.minSalary
         }
      },
      computed: {
        filterChar(){
          if (this.allChecked) {
            return this.allArray;
          }
          if(this.filterChecked){
            return this.users
          }
          return []
            
          

        
        }
      }
       ,
       mounted() {
         this.getResults();
       }
     };
     </script>
     
     
<template>
    <LoadingCircle v-if="loading"/>
     
     <div>
     <TitleView title="Veículos"/>
     </div>
     <div>
       <div class="flex justify-center w-full mt-10">
         <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="openUserModal" :disabled="loading">Adicionar Veículo</button> 
         <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="openFilterModal" :disabled="loading">Aplicar Filtros</button>
       </div>
     </div>
     <div class="flex justify-center w-[20%]">
      <TableView :headers="headers" :body="users" @showDetails="showDetails" class="w-[30px]" />  
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
                     Criar Veículo
                   </h3>                
                 </div>
                 <div v-if="modalUpdate">
                   <h3 class="text-xl font-semibold text-gray-900">
                     Alterar {{ modalContent.brand +" "+ modalContent.model +" "+ modalContent.year }}
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
                    <label  class="block text-sm font-medium text-gray-900 ">Selecione o Proprietário</label>
                    <select v-model="vehicles.owner_id"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                      <option
                        v-for="vehicle in allVehicles"
                        :key="vehicle.id"
                        :value="vehicle.id">
                        {{ vehicle.name }}
                      </option>

                    </select>
                  </div>
                   <div>
                    <label  class="block text-sm font-medium text-gray-900 ">Selecione a Marca</label>
                    <select v-model="vehicles.brand"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                      <option value="Fiat">Fiat</option>
                      <option value="Ford">Ford</option>
                      <option value="Chevrolet">Chevrolet</option>
                      <option value="Volkswagen">Volkswagen</option>
                      <option value="Toyota">Toyota</option>
                      <option value="Honda">Honda</option>
                      <option value="Hyundai">Hyundai</option>
                      <option value="Renault">Renault</option>
                      <option value="Nissan">Nissan</option>
                      <option value="Mercedes-Benz">Mercedes-Benz</option>
                    </select>
                  </div>
                   <div>
                       <label class="block mb-2 text-sm font-medium text-gray-900">Digite o Modelo do Carro</label>
                       <input v-model="vehicles.model" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o modelo" />
                   </div>
                   <div>
                       <label class="block mb-2 text-sm font-medium text-gray-900">Digite o Modelo do Carro</label>
                       <input v-model="vehicles.year" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o ano" />
                   </div>
                 </div>
                 <div v-if="modalUpdate">
                   <div>
                       <label class="block mb-2 text-sm font-medium text-gray-900">Alterar Modelo</label>
                       <input v-model="newVehicles.model" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o novo nome" />
                   </div>

                   <div>
                       <label class="block mb-2 text-sm font-medium text-gray-900">Alterar Ano</label>
                       <input v-model="newVehicles.year" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o novo nome" />
                   </div>

                   <div>
                      <label  class="block text-sm font-medium text-gray-900 ">Selecione a Marca</label>
                      <select v-model="newVehicles.brand"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="Fiat">Fiat</option>
                        <option value="Ford">Ford</option>
                        <option value="Chevrolet">Chevrolet</option>
                        <option value="Volkswagen">Volkswagen</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Honda">Honda</option>
                        <option value="Hyundai">Hyundai</option>
                        <option value="Renault">Renault</option>
                        <option value="Nissan">Nissan</option>
                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                      </select>
                    </div>
                    <div>
                       <label class="block mb-2 text-sm font-medium text-gray-900">Última Revisão</label>
                       <input v-model="newVehicles.last_service" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" disabled />
                   </div> 
                 </div>
                 <div v-if="modalFilter">
                   <div class="flex flex-col gap-1.5 text-center">
                     <div class="flex flex-col gap-2 items-center justify-center">
                      Ordenar por:
                      <div class="flex gap-1">
                        <div class="flex flex-col items-center mb-4">
                            <input 
                            v-model="filter.nameOwners"
                            @change="toggleCheckbox('nameOwners')"
                            type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                            <label  class="ms-2 text-sm font-medium">Nome de Proprietários</label>
                        </div>

                        <div class="flex flex-col items-center mb-4">
                            <input  
                            v-model="filter.moreServices"   
                            @change="toggleCheckbox('moreServices')"                                
                            type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                            <label  class="ms-2 text-sm font-medium">Marcas com Mais Revisão</label>
                        </div>

                        <div class="flex flex-col items-center mb-4">
                            <input  
                            v-model="filter.countModel"
                            @change="toggleCheckbox('countModel')"    
                            type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
                            <label  class="ms-2 text-sm font-medium">Número de Veículos por Marca</label>
                        </div>

                      </div>

                      </div>
                     <div class="flex gap-2 items-center justify-center mobile">
                      <div>
                      <label  class="block text-sm font-medium text-gray-900 ">Selecione a Marca</label>
                      <select v-model="filter.brand"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="Fiat">Fiat</option>
                        <option value="Ford">Ford</option>
                        <option value="Chevrolet">Chevrolet</option>
                        <option value="Volkswagen">Volkswagen</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Honda">Honda</option>
                        <option value="Hyundai">Hyundai</option>
                        <option value="Renault">Renault</option>
                        <option value="Nissan">Nissan</option>
                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                      </select>
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
     
               </div>
   
               <div class="flex items-center justify-center justify-end p-2 border-t border-gray-200 rounded-b">
                 <div v-if="modalUser">
                   <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="addVehicles">Criar Usuário</button>
                 </div>
                 <div v-if="modalUpdate">
                   <button type="button" class="focus:outline-none text-white bg-[#337C24] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="atualizar">Gravar</button>
                   <button type="button" class="focus:outline-none text-white bg-[#FF3E30] hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="apagar">Apagar</button>
                 </div>
                 <div v-if="modalFilter">
                   <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="Setfilter">Aplicar Filtro</button>
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
     import LoadingCircle from '../components/loading/LoadingCircle.vue';
     
     export default {
       name: 'ListVehicles',
       components: {
        TitleView,TableView, LoadingCircle
       },
       data() {
         return {
           nameOwners: null,
           countModel: null,
           count:null,
           filter:{},
           headers:['Nome','Quantidade Revisão','Última Revisão','Ver Detalhes'],
           loading: false,
           users: [],
           vehicles:{},
           newVehicles:{},
           sex: 'A',
           startDate: '',
           endDate: '',
           modalUpdate: false,
           modalFilter: false,
           modalUser: false,
           openModal: true,
           newUser:{},
           modalContent:'',

     
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
       async setUsers(array)
       {
        this.users = array.map(user => {
               return {
                 name: user.brand+" "+user.model,
                 email: user.number_services? user.number_services:0 ,      
                 created_at: user.last_service? user.last_service:"Nenhum Agendamento",
                 implementar: {
                    id:user.id,
                    owner_id: user.owner_id,
                    number_services: user.number_services,
                    brand:user.brand,
                    model: user.model,
                    year: user.year,
                    last_service: user.last_service? user.last_service:"Nenhum Agendamento",

                 }
     
               };
             }
     
           );
       },
       async getResults(){
        this.loading = true;
         try {
          const data = await http.get('/cars-all');
          this.setUsers(data.data.cars)
          const cars = await http.get('/owners-all');
          this.allVehicles = cars.data.owners

         } catch (error) {
           console.log(error.response)
         }
         this.loading = false;
         },
         toggleCheckbox(option){

          if(option == 'moreServices' && !this.filter.moreServices)this.filter.moreServices = false
          if(option == 'countModel' && !this.filter.countModel)this.filter.countModel = false
          if(option == 'nameOwners' && !this.filter.nameOwners)this.filter.nameOwners = false

          if(option == 'moreServices' &&this.filter.moreServices)
          {
            this.filter.countModel = false;
            this.filter.moreServices = true
          }


          if(option == 'countModel' && this.filter.countModel){
              this.filter.nameOwners = false;
              this.filter.moreServices = false  
              this.filter.countModel = true        
          }
          console.log(this.filter.nameOwners)
          if(option == 'nameOwners' && this.filter.nameOwners){
            this.filter.nameOwners = true
            this.filter.countModel = false;
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
         async addVehicles(){
          if (Object.keys(this.vehicles).length != 4){
            alert("Por Favor Preencha Corretamente!")
          }
          else{
            this.loading = true;
            try {
              await http.post('/cars-register', this.vehicles)  
              alert("Veículo Adicionado com Sucesso!")
              window.location.reload()
            } catch (error) {
              console.log(error)
            }
            this.loading = false;

          }
         },
         showDetails(details) {
           this.modalContent = details;
           this.newVehicles = {... details};
           this.modalUpdate = true;
           this.openModal = false;

         },
         async atualizar(){
          this.loading = true
            if(JSON.stringify(this.modalContent) === JSON.stringify(this.newVehicles))
            {
              alert("Por favor Verifique Novamente")
            }
            else
            {
             try {
              await http.put('/cars-update',this.newVehicles);
              alert("Usuário Atualizado com sucesso")
              window.location.reload();
             } catch (error) {
               console.log(error)
             }              
            }
            this.loading = false
             
      
             
           
         },
         async apagar(){
           try {
             this.loading = true
               await http.delete('/cars-delete/'+this.modalContent.id);
               alert("Carro Apagado com sucesso")
               this.loading = false
               window.location.reload();
             } catch (error) {
              console.log(error)
               this.loading = false
             }
         },
         async Setfilter(){
         this.loading = true;
          if (Object.keys(this.filter).length === 0 || this.filter.startDate > this.filter.endDate)
          {
            alert("Por favor Verifique Novamente")
          }
          else
          {
            try {
              const data = await http.post('/cars-filter',this.filter)
              if(data.data.length==0){
                alert("Sua Consulta Retornou Zero");
              }
              if(this.filter.countModel)
              {
                console.log(data.data)
                this.users = data.data.map(user => {
               return {
                 name:user.model,
                 email: user.car_count ,      
                 implementar: {
                    id:user.id,
                    owner_id: user.owner_id,
                    number_services: user.number_services,
                    brand:user.brand,
                    model: user.model,
                    year: user.year,
                    last_service: user.last_service? user.last_service:"Não foi Agendado Nenhuma",

                 }
     
               };
             });
             this.headers = ["Modelo Carro","Quantidade","Mais Detalhes"]
              }
              else
              {
                this.setUsers(data.data)
                this.close();
              }
            } catch (error) {
              console.log(error)
            }
          }
          this.loading = false;


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
     <style>
     @media (max-width: 640px) {
    .mobile{
      flex-direction: column;
    }
  }
    </style>
     
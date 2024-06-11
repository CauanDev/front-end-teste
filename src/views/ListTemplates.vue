<template>
    <LoadingCircle v-if="loading"/>

    <div>
    <TitleView title="Templates"/>
    </div>

    <div class=" flex justify-center mt-10">
       <TableView :headers="['Nome Template','Data Criação','Usuário','Ver Detalhes']"  @showDetails="showDetails" :body="templates" class="w-[50%]"/>
    </div>
    <div></div>
    <div id="default-modal" :class="{'hidden':openModal}" class=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="relative p-4 w-full max-w-2xl max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow">
              <!-- Modal header -->
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                  <h3 class="text-xl font-semibold text-gray-900 ">
                      Alterar {{modalContent.nameTemplate}}
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
                  <input v-model="template.nameTemplate" type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o novo nome"  />
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
  import TableView from "@/components/Table/TableView.vue";
  import http from '@/services/http.js';
  import TitleView from "../components/Title/TitleView.vue";
  import { format } from 'date-fns'; 
import LoadingCircle from "../components/loading/LoadingCircle.vue";

  export default {
    name: "ListTemplates",
    components: {
      TableView, TitleView,LoadingCircle
    },
    data() {
      return {
        loading:false,
        templates: [],
        openModal: true,
        modalContent:{},
        template:{
          nameTemplate: '',
        },
        newTemplate:{   
        }
      };
    },
    methods: {
    async getNameUser(id) {
      try {
 
        const response = await http.get('/users/'+id,);
        return response.data.user.name
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  
    async getResults() {
      try {
        const response = await http.get('/template');
        const results = response.data.users;
   
        this.templates = await Promise.all(results.map(async item => {
          const nomeUser = await this.getNameUser(item.user_id);
          // Aqui você pode retornar o objeto desejado com todas as informações que você precisa
          return {
            name: item.name,
            created_at: format(new Date(item.created_at), 'dd/MM/yyyy'),
            tipoDiagnostico: nomeUser,
            implementar: {
              nameTemplate: item.name,
              name: nomeUser,
              id: item.id
            }
          };
        }));
      } catch (error) {
        console.error(error);
      }
    },
      showDetails(details) {
        this.modalContent = details;
        this.newTemplate.name = details.name
        this.newTemplate.nameTemplate = details.nameTemplate
        this.template.nameTemplate = details.nameTemplate;
        this.openModal=false;
    
      },
      async atualizar(){
        var count=0;
        if(this.modalContent.nameTemplate!=this.template.nameTemplate )
        {
          this.newTemplate.nameTemplate = this.template.nameTemplate;
        }  
        else count++
        if(count !=1){
        try {
        this.loading = true
          
         await http.put('/template',{"name":this.newTemplate.nameTemplate, "id": this.modalContent.id});
         alert("Diagnóstico Atualizado com sucesso")         
         this.loading = false;

         window.location.reload();
        } catch (error) {
          console.log(error)
        }
        } 
      },
     async apagar(){
      try {
        this.loading = true
          const id = this.modalContent.id
            await http.delete('/template/'+id  );
            alert("Template Apagado com sucesso")
        this.loading = false;

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
  
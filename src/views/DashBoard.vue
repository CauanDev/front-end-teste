<template>
  <LoadingCircle v-if="loading"/>
  <div>
  <TitleView title="Resultados Diagnosticos"/>
  </div>

  <div class=" flex flex-col justify-center mt-10 gap-2 items-center w-full">
  <div class="flex gap-2 items-center">
    <div class="flex flex-col text-center ">
    
      <label for="startDate" class="text-sm font-medium text-gray-700">Data Início</label>
      <input
        type="date"

        :max="today"

        @input="startDate = $event.target.value"
        class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
      >      
    </div>
    <div class="flex flex-col text-center">
    <label for="endDate" class="text-sm font-medium text-gray-700">Data Final:</label>
    <input
      type="date"
      :value="today"
      :min="dataMin"
      :max="today"
      @input="endDate = $event.target.value"
      class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
    >      
    </div>
    <div class="flex flex-col text-center">
    <label for="endDate" class="text-sm font-medium text-gray-700">Nome Lotérica</label>
    <input
      type="text"
      placeholder="Digite o Nome"
      @input="findName = $event.target.value"
      class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
    >      
    </div>
    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 mt-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center" @click="filtroData">
    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
    </svg>
    <span class="sr-only">Icon description</span>
    </button>
  </div>
     <TableDiagnostico :headers="['Nome Lotérica','Valores','Tipo de Diagnóstico','Ver Detalhes']"  @showDetails="showDetails" :body="results" class="w-[50%]"/>
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
                <input v-model="diagnostico.name" type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite o novo nome"  />
              </div>

              <div>
                <label  class="block mb-2 text-sm font-medium text-gray-900 ">Alterar Valores</label>
                <p class="text-xs text-gray-500">**Sequencia de Valores**</p>
                <p class="text-xs text-gray-500">QuantidadeTFL-TempoFecharCaixa-TempoFecharPlanilha-TempoConferirCaixa-SalarioOperador-SalarioGerente-SalarioLoterico</p>
                <input v-model="diagnostico.values" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Digite os novos Valores"  />
              </div>
            </div>

            <div class="flex items-center justify-center p-2 border-t border-gray-200 rounded-b">
              <button type="button" class="focus:outline-none text-black bg-[#337C24] hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 " @click="atualizar">Gravar</button>
              <button type="button" class="focus:outline-none text-black bg-[#FF3E30] hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  " @click="apagar">Apagar</button>
              <button type="button" class="focus:outline-none text-black bg-[#F9B500] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 " @click="copiar">Copiar Link</button>
              <button type="button" class="focus:outline-none text-black bg-[#176BEF] hover:bg-blue-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 " @click="acessar">Acessar</button>

            </div>
        </div>
    </div>
</div>



</template>

<script>
import router from "../router/routes";
import TableDiagnostico from "../components/Table/TableDiagnostico.vue";
import http from '@/services/http.js';
import TitleView from "../components/Title/TitleView.vue";
import LoadingCircle from "../components/loading/LoadingCircle.vue";


export default {
  name: "DashBoard",
  components: {
     TitleView, LoadingCircle,TableDiagnostico
  },
  data() {
    return {
      today: new Date().toISOString().split('T')[0], 
      loading:false,
      startDate:null,
      findName: "",
      endDate:new Date().toISOString().split('T')[0],
      results: [],
      dataMin: "2024-06-10",
      openModal: true,
      modalContent:{},
      diagnostico:{
      name: '',
      values: ''
      },
      newResults:{   
      }
    };
  },
  methods: {
  async getNameTemplate(id) {
   
    try {
 
      const response = await http.get('/template/'+id);
      return response.data.templates.name
    } catch (error) {
     console.log(error)
    }
  },
  acessar(){
    router.push({ name: 'DiagnosticoController', params: { id: this.modalContent.slug } })
  },
  copiar(){
    const text= "https://diagnostico.dourasoft.com.br/user/"+this.modalContent.slug
    navigator.clipboard.writeText(text).then(() => {
        alert("Texto copiado para a área de transferência!");
      }).catch(err => {
       throw(err);
      });
  },
  cleanValues(json){
    const valores = Object.values(json);
    return valores
  },
  async getResults() {
    try {
      this.loading  = true;
      const response = await http.get('/results');
      const results = response.data.templates;
      
      this.ajusteResults(results)
      this.loading  = false;
    } catch (error) {
      this.loading  =false;
      console.log(error);
    }
    
  },
    showDetails(details) {
      this.modalContent = details;
      this.newResults.name = details.name
      this.newResults.values = details.values
      this.diagnostico.name = details.name;
      this.diagnostico.values = details.values;
      this.openModal=false;
  
    },
    async atualizar(){
      var count=0;
      if(this.modalContent.name!=this.diagnostico.name )
      {
        this.newResults.name = this.diagnostico.name;
      }  
      else count++
      if(this.modalContent.values!=this.diagnostico.values)
      {
        this.newResults.values = this.diagnostico.values;
      } else count++
      if(count !=2){
      try {
      this.loading = true;
      await http.put('/results/'+this.modalContent.id,this.newResults);
       
       alert("Diagnóstico Atualizado com sucesso")
       this.loading = false;
      } catch (error) {
        this.loading = false;
      }
      } 
    },
   async apagar(){
    try {
      this.loading = true;
          await http.delete('/results/'+this.modalContent.id);                    
          alert("Diagnóstico Apagado com sucesso")
      this.loading = false;

          window.location.reload();
        } catch (error) {
          alert("Diagnóstico Não foi Apagado")
          this.loading = false;

        }
    },
    async filtroData(){
      if(this.startDate == null){
        if(this.findName == "")alert("Por favor preencha corretamente")
        else{
      try {
            this.loading = true;   
            const data = await http.post("/resultado",{"name":this.findName})
            const results = data.data.results;
            this.ajusteResults(results) 
            this.loading = false; 
      } catch (error) {
        this.loading = false; 
        console.log(error)
      }

        }
      }
      else{
        this.loading = true;      
        let obj  = {
        "data_inicial": this.startDate,
        "data_final": this.endDate
      }
      if(this.findName != ""){
        obj.name=this.findName
      }

      try {
        const data = await http.post("/resultado",obj)
        const results = data.data.results;
        this.ajusteResults(results)
      this.loading = false;

      } catch (error) {
        this.loading = false;
        console.log(error)
      }
    }},
    async ajusteResults(array){
      this.results = await Promise.all(array.map(async item => {
        const nomeDiagnostico = await this.getNameTemplate(item.template_id);
        const infDiagnostico = JSON.parse(item.values)
        return {
          nomeLoterica: item.name,
          values: this.cleanValues(infDiagnostico),
          tipoDiagnostico: nomeDiagnostico,
          implementar: {
            name: item.name,
            values: item.values,
            id: item.id,
            slug: item.slug
          }
        };
      }));
    }
  },
  
  mounted() {
    this.getResults();
  }
};
</script>

<template>
   <div v-if="dataLoaded">
      <FechamentoCaixa 
      :nomeLoterica=infResults.nomeLoterica
      tflQuantity1="12"
      tflTime1="12"
      spreadsheetTime1="13"
      checkTime1="14"
      operatorSalary1="R$ 1500,00"
      managerSalary1="R$ 3000,00"
      lotericoSalary1="R$ 10000,00"
      />
    </div>

    

    <div v-if="keyNotFound">
    <TitleView 
    title="Key Not Found"/>
  </div>

  </template>
  
  <script>
  import http from "@/services/http.js";
  import FechamentoCaixa from "../components/diagnostico/FechamentoCaixa.vue";
import TitleView from "../components/Title/TitleView.vue";
  
  export default {
    name: "DiagnosticoController",
    components: {
      FechamentoCaixa, TitleView
    },
    data() {
      return {
        dataLoaded: false,
        keyNotFound: false,
        infResults: {          
          template_id: ''          
        }
      };
    },
    methods: {
      async findTemplate(slug) {
        try {
          const template = await http.post('/result', { "slug": `${slug}` });
          const results = JSON.parse(template.data.user[0].values);          
 
            this.infResults.tflQuantity1 = results.quantidadeTFL
            this.infResults.nomeLoterica = results.nomeLoterica;
            this.infResults.tflTime1 = results.tempoFecharTFL;
            this.infResults.spreadsheetTime1 = results.tempoLancarPlanilha;
            this.infResults.checkTime1 = results.tempoConferir;
            this.infResults.operatorSalary1 = results.salarioOperador;
            this.infResults.managerSalary1 = results.salarioGerente;
            this.infResults.lotericoSalary1 = results.salarioLoterico;
            this.dataLoaded = true;
  
        } catch (error) {
          this.keyNotFound = true
        }
      }
    },
    created() {
      this.slug = this.$route.params.id;
      this.findTemplate(this.slug);
     
    }
  };
  </script>
  
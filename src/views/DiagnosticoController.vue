<template>
  <div v-if="dataLoaded">
     <FechamentoCaixa 
     :nomeLoterica=infResults.nomeLoterica
     :tflQuantity1= infResults.tflQuantity1
     :tflTime1=infResults.tflTime1
     :spreadsheetTime1=infResults.spreadsheetTime1
     :checkTime1=infResults.checkTime1
     :operatorSalary1=infResults.operatorSalary1
     :managerSalary1=infResults.managerSalary1
     :lotericoSalary1=infResults.lotericoSalary1
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
           this.infResults.tflTime1 = results.tempoFecharTFL+ " Min";
           this.infResults.spreadsheetTime1 = results.tempoLancarCaixa+ " Min";
           this.infResults.checkTime1 = results.tempoConferir+ " Min";
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
 
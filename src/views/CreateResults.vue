<template>
  <LoadingCircle v-if="loading"/>
  <div class="flex h-screen">
    <div class="flex-1">
      <div class="flex items-center justify-center h-full bg-gray-100">
        <div class="max-w-md w-full">
          <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-4 mt-24 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                Nome da Lotérica
              </label>
              <input v-model="body.nomeLoterica"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="text" 
              placeholder="Digite o nome da Lotérica">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Quantidade de TFL
              </label>
              <input v-model="body.quantidadeTFL"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="text" 
              placeholder="Digite o Tempo em Minutos">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Tempo para Fechar um TFL
              </label>
              <input v-model="body.tempoFecharTFL"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="text" 
              placeholder="Digite o Tempo em Minutos">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Tempo para Lançar todos os Caixas
              </label>
              <input v-model="body.tempoLancarCaixa"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="text" 
              placeholder="Digite o Tempo em Minutos">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Tempo para Conferir todos os Caixas
              </label>
              <input v-model="body.tempoConferir"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="text" 
              placeholder="Digite o Tempo em Minutos">
            </div>
            <div class="mb-4 flex gap-2">
              <div class="text-center">
                <label class="block text-gray-700 text-sm font-bold mb-1" for="email">
                  Salário Operador
                  
                </label>
                <select v-model="body.salarioOperador"
                class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                <option v-for="salary in salarioOperador" :key="salary" :value="salary">
                  {{ salary }}   
                </option>
                </select>
              </div>

              <div class="text-center">
                <label class="block text-gray-700 text-sm font-bold mb-1" for="email">
                  Salário<br>Gerente
                  
                </label>
                <select v-model="body.salarioGerente"
                class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                <option v-for="salary in salarioGerente" :key="salary" :value="salary">
                  {{ salary }}   
                </option>
                </select>
              </div>

              <div class="text-center">
                <label class="block text-gray-700 text-sm font-bold mb-1" for="email">
                  Salário<br>Lotérico
                </label>
                <select v-model="body.salarioLoterico"
                class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                <option v-for="salary in salarioLoterico" :key="salary" :value="salary">
                  {{ salary }}   
                </option>
                </select>
              </div>
            </div>
            <div class="text-center mb-2">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Tipo de Diagnóstico
              </label>
              <select v-model="tipoDiagnostico"
              class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
              <option v-for="type in types" :key="type" :value="type">
                {{ type }}   
              </option>
              </select>
            </div>
            <div class="flex items-center justify-center w-full">
              <button class="bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Criar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import http from '@/services/http.js';
import LoadingCircle from '../components/loading/LoadingCircle.vue';

  export default {
    name:"CreateResults",
    components:{
      LoadingCircle
    },
    data() {
      return {
        salarioOperador:["R$ 1400,00","R$ 1500,00","R$ 1600,00","R$ 1700,00","R$ 1800,00"],
        salarioGerente:["R$ 1600,00","R$ 1800,00","R$ 2000,00","R$ 2500,00","R$ 3000,00"],
        salarioLoterico:["R$ 2500,00","R$ 5000,00","R$ 7500,00","R$ 10000,00","R$ 15000,00","R$ 16000,00+"],
        types:[],
        loading:false,
        tipoDiagnostico:'',
        body:{
        quantidadeTFL:'',
        nomeLoterica:'',
        tempoFecharTFL: '',
        tempoLancarCaixa: '',
        tempoConferir: '',
        salarioOperador: 'R$ 1400,00',
        salarioGerente: 'R$ 1600,00',
        salarioLoterico: 'R$ 2500,00',
        
      },
        
      };
    },
    methods: {
      async submitForm() {
        this.isFormValid =this.body.nomeLoterica !== '' &&
                         this.body.tempoFecharTFL !== '' &&
                         this.body.tempoLancarCaixa !== '' &&
                         this.body.quantidadeTFL !== ''&&
                         this.body.tempoConferir !== '';
        if(this.isFormValid){

          try {
          this.loading = true

           await http.post('/results',{
                "nameTemplate":this.tipoDiagnostico,
                "name":this.body.nomeLoterica,
                "values":  JSON.stringify(this.body)
              });
              
              alert("Resultado Criado com sucesso")
              this.loading = false
              window.location.reload();
          } catch (error) {
            this.loading = false

          }
                   
        }
      },
      validateEmail() 
      {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.isEmailValid = !emailPattern.test(this.user.email)? false:true;
      },
      validatePassword() 
      {
        this.isPasswordValid=  this.user.password.length < 6 ? false : true
      },
      async getResults(){
        try {
                  const results = await http.get("/template");
                  results.data.users.map((item)=>{
                    this.types.push(item.name)
                  })

        } catch (error) {
         console.log(error)
        }

      }

    },
    mounted() {
    this.getResults();
  }
  };
  </script>

  
<template>
  <LoadingCircle v-if="loading"/>
    <div class="flex h-screen">
     
      <div class="flex-1 ">
        <div class="flex items-center justify-center h-full bg-gray-100 backgroundimage">
          <div class="max-w-md w-full">
            <form @submit.prevent="submitForm" class="bg-white shadow-2xl border rounded px-8 pt-6 pb-8 mb-4 ">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                  Email
                </label>
                <input v-model="user.email"
                :class="{'border-red-500': !isEmailValid,'border-green-500': isFormValid}" 
                @input="validateEmail"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="text" 
                placeholder="Digite seu Email">
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                  Senha
                </label>
                <input v-model="user.password" 
                :class="{'border-red-500': !isPasswordValid,'border-green-500': isFormValid}" 
                @input="validatePassword"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="password" 
                placeholder="Digite sua senha">
                <p v-if="!isPasswordValid" class="text-red-500 text-xs italic">Por favor, verifique novamente!</p>
                <p v-if="wrongPassword" class="text-red-500 text-xs italic">Senha Inválida</p>

              </div>
              <div class="flex items-center justify-center w-full">
                <button class="bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>


import { useAuth } from "@/stores/auth.js"

import http from '@/services/http.js';
import LoadingCircle from "../components/loading/LoadingCircle.vue";

  export default {
    components: {
       LoadingCircle
     },
    data() {
      return {
        user:{
        email:'',
        password: ''},
        isPasswordValid: true,
        isEmailValid: true,
        isFormValid: false,
        wrongPassword: false,
        loading: false
      };
    }, created() {
    const auth = useAuth();
    if (auth.isAuthenticated) {
      this.$router.push({ name: 'Dashboard' });
    }
  },
    methods: {
      async submitForm() {
        this.isFormValid = (this.isPasswordValid  && this.isEmailValid) 
        if(this.isFormValid){
        
        
          try {
              
              this.loading = true;  
                         
              const {data} = await http.post('/login',this.user);
              const auth = await useAuth(); 
              auth.setToken(data.token);
              auth.setUser(data.user);
              
              this.loading = false;

              this.$router.push({ name: "Users" });
          } catch (error) {
            console.log(error)
            this.wrongPassword = true;
            this.loading = false;
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
      }

    }
  };
  </script>
<style scoped>
.backgroundimage{
  background-image: url('https://onmotor.com.br/wp-content/uploads/2023/04/2023-05-31-servicos-de-mecanica-automotiva-1280x720.jpg');
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
  height: 100vh
}

</style>
  
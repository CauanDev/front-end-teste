<template>
  <LoadingCircle v-if="loading"/>

  <div class="flex h-screen">

    <div class="flex-1">
      <div class="flex items-center justify-center h-full bg-gray-100">
        <div class="max-w-md w-full">
          <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                Nome
              </label>
              <input v-model="user.name" :class="{'border-red-500': !isUsernameValid,'border-green-500': isFormValid}" 
              @input="validateName"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="text" 
              placeholder="Digite seu Nome">
            </div>
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
              <p v-if="!isPasswordValid" class="text-red-500 text-xs italic">Por favor, escolha uma senha mais segura!</p>
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="passwordb">
                Digite novamente sua senha
              </label>
              <input v-model="passwordb" 
              :class="{'border-red-500': !isPasswordbValid,'border-green-500': isFormValid}" 
              @input="validatePassowordB"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              type="password" 
              placeholder="Digite sua senha">
              <p v-if="!isPasswordValid" class="text-red-500 text-xs italic">Por favor, verifique a sua senha</p>
            </div>
            <div class="flex items-center justify-center w-full">
              <button class="bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import http from '@/services/http.js'
import LoadingCircle from '../components/loading/LoadingCircle.vue';
export default {
  components:{
    LoadingCircle
  },

  data() {
    return {
      loading: false,
      user:{
        name: '',
        email:'',
        password: '',        
      },

      passwordb: '',
      isUsernameValid: true,
      isPasswordValid: true,
      isPasswordbValid: true,
      isEmailValid: true,
      isFormValid: false
    };
  },
  methods: {
    async submitForm() {
      this.isFormValid = (this.isUsernameValid && this.isPasswordValid  && this.isPasswordbValid && this.isEmailValid) 
      if(this.isFormValid)
      {
       
        try {
          this.loading = true
            await http.post('/users/add',this.user);
            alert("Usuário Adicionado com sucesso")
            this.loading = false

            window.location.reload()
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
    validateName() 
    {
      this.isUsernameValid= (this.user.name.length < 3 || /\d/.test(this.user.name))? false: true

    },
    validatePassword() 
    {
      this.isPasswordValid=  this.user.password.length < 6 ? false : true
    },
    validatePassowordB()
    {
      this.isPasswordbValid =  this.passwordb.length < 6 ||!(this.passwordb === this.user.password) ? false : true

    }
  }
};
</script>


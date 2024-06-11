<template>
<div class="flex absolute" v-if="logado()">
    <input type="checkbox" id="drawer-toggle" class="relative sr-only peer" >
    <label for="drawer-toggle" class="absolute top-0 left-0 inline-block p-4 transition-all duration-500 bg-indigo-500 rounded-lg peer-checked:rotate-180 peer-checked:left-64">
        <div class="w-6 h-1 mb-3 -rotate-45 bg-white rounded-lg"></div>
        <div class="w-6 h-1 rotate-45 bg-white rounded-lg"></div>
  
    
    </label>
    <div class="fixed top-0 left-0 z-20 w-64 h-full transition-all duration-500 transform -translate-x-full bg-white shadow-lg peer-checked:translate-x-0">
      <div class="px-6 py-4">
        <h2 class="text-xl font-semibold">Manager Diagnóstico</h2>
        <div class="py-2 flex-colum">
        <div class="flex space-x-20">
            <p class="text-lg">{{ getName() }}</p>  
             <button type="submit" @click="deslogar" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-xs rounded-lg text-sm px-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Deslogar</button>

        </div>       
            <div class="flex-colums mt-5">
                <input 
    type="text" 
    @keyup.enter="handleSubmit" 
    id="first_name" 
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
    placeholder="Pesquisar Diagnóstico"
    v-model="searchQuery"
  />                
                <router-link class="flex items-center gap-x-3.5 py-2 px-2.5 text-lg"  :to="{ name: 'Update' }">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>
                    Listar Usuários
                </router-link>

                <router-link class="flex items-center gap-x-3.5 py-2 px-2.5 text-lg"  :to="{ name: 'Register' }">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>                   
                    Criar Usuário
                </router-link>

                <router-link class="flex items-center gap-x-3.5 py-2 px-2.5 text-md"  :to="{ name: 'Dashboard' }">
                    <svg class="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    Listar Diagnósticos
                </router-link>

                <router-link class="flex items-center gap-x-3.5 py-2 px-2.5 text-md"  :to="{ name: 'CreateResults' }">
                  <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24zM352 224a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-96 96c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H256z"/></svg>                    
                  Criar Diagnósticos
                </router-link>

                <router-link class="flex items-center gap-x-3.5 py-2 px-2.5 text-lg" :to="{ name: 'Templates' }">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z"/></svg>                
                    Listar Templates
                </router-link>

                <div class="flex items-center gap-x-3.5 py-2 px-2.5 text-lg cursor-pointer" @click="adicionarTemplate">
                      <svg xmlns="http://www.w3.org/2000/svg" class="size-5"  viewBox="0 0 448 512"><!--! Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                  Criar Templates
                </div>
            </div>          
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import {useAuth} from "@/stores/auth.js"
import http from "@/services/http.js";
export default {
  name: 'SideBar',
  data(){
    return {
        searchQuery: ''

    }
  },
  methods:{
    logado(){
        const auth = useAuth()
        return auth.isAuthenticated
    },
    getName(){
        const auth = useAuth()
        if(auth.isAuthenticated)return auth.user.name
    },
    deslogar(){
        const auth = useAuth()
        auth.clear()
        this.$router.push({ name: 'Home' });

    },
    async handleSubmit() {
      try {
        http.
      } catch (error) {
        
      }
    },
    async adicionarTemplate(){
      const auth = useAuth()
      const name = prompt("Digite o Nome do Novo Template")
      if(name!=null)
      {
        try {
          http.post('/template',{"nameTemplate":name,"name":auth.user.name});
        } catch (error) {
          console.log(error)
        }        
      }

    }
  }
}
</script>
<style scoped>
svg{
    width: 24px;
    height: 24px;
}
</style>
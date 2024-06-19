<template>
<div class="flex flex-col gap-1.5 text-center">
    <div class="flex gap-2 items-center justify-center flex-col">

        <div class="flex flex-col">
            <label for="name" class="text-sm font-medium text-gray-700">Nome Usuário</label>
            <input type="text" placeholder="Digite o Nome"
            @input="$emit('update:name', $event.target.value)"
            value="name" class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm">      
        </div>
        <div class="flex gap-2">
            <div class="flex flex-col ">    
            <label for="startDate" class="text-sm font-medium text-gray-700">Data Início</label>
            <input type="date" value="startDate"
            @input="$emit('update:startDate', $event.target.value)"
            class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm">      
        </div>

        <div class="flex flex-col">
            <label for="endDate" class="text-sm font-medium text-gray-700">Data Final</label>
            <input type="date" value="endDate" 
            @input="$emit('update:endDate', $event.target.value)"
            class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm">      
        </div>
        </div>

    </div>
</div>   
</template>
<script>
export default {
  name: 'FilterUser',
  props: {
    name: String,
    startDate: String,
    endDate: String
  },
};
</script>
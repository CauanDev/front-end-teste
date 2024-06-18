<template>
    <div class="flex flex-col gap-1.5 text-center">
      <div class="flex gap-2 items-center justify-center mobile">
            <div class="flex flex-col">
            <label for="startDate" class="text-sm font-medium text-gray-700">Data Início</label>
            <input
                type="date"
                :value="startDate"
                @input="$emit('update:startDate', $event.target.value)"
                class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"/>
            </div>
            <div class="flex flex-col">
            <label for="endDate" class="text-sm font-medium text-gray-700">Data Final:</label>
            <input
                type="date"
                :value="endDate"
                @input="$emit('update:endDate', $event.target.value)"
                class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"/>
            </div>
            <div class="flex flex-col">
            <label for="name" class="text-sm font-medium text-gray-700">Nome Proprietário</label>
            <input
                type="text"
                placeholder="Digite o Nome"
                :value="name"
                @input="$emit('update:name', $event.target.value)"
                class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"/>
            </div>
      </div>
      <div class="flex gap-2 items-center justify-center mobile">
        <div>
          <label class="block text-sm font-medium text-gray-900">Selecione o Sexo</label>
          <select
            :value="sex"
            @change="$emit('update:sex', $event.target.value)"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="A" selected>Todos as opções</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>
        <div>
          <label for="minAge" class="text-sm font-medium text-gray-700">Idade Mínima</label>
          <input
            type="text"
            :value="minAge"
            @input="$emit('update:minAge', $event.target.value)"
            class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
          />
        </div>
        <div>
          <label for="maxAge" class="text-sm font-medium text-gray-700">Idade Máxima</label>
          <input
            type="text"
            :value="maxAge"
            @input="$emit('update:maxAge', $event.target.value)"
            class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FilterOwner',
    props: {
      startDate: String,
      endDate: String,
      name: String,
      sex: String,
      minAge: String,
      maxAge: String,
      dasboard: Boolean
    }
  };
  </script>
  


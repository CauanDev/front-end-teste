<template>
    <div class="flex flex-col gap-1.5 text-center w-full">
      <div class="flex gap-2 items-center justify-center mobile w-full">
          <div class="flex flex-col">
          <label for="startDate" class="text-sm font-medium text-gray-700">Data Início</label>
          <input
            type="date"
            :value="startDate"
            @input="$emit('update:startDate', $event.target.value)"
            class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500   sm:text-sm"
          />
          </div>
          <div class="flex flex-col">
          <label for="endDate" class="text-sm font-medium text-gray-700">Data Final</label>
          <input
            type="date"
            :value="endDate"
            @input="$emit('update:endDate', $event.target.value)"
            class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500   sm:text-sm"
          />
          </div>
      </div>
      <div class="flex gap-2 items-center justify-center mobile">

          <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700">Idade Mínima</label>
          <input
            type="number"
            :value="minAge"
            @input="$emit('update:minAge', $event.target.value)"
            class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  w-[100%] sm:text-sm"
          />
          </div>

          <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700">Idade Máxima</label>
          <input
            type="number"
            :value="maxAge"
            @input="$emit('update:maxAge', $event.target.value)"
            class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-[100%]  sm:text-sm"
          />
          </div>
      </div>

      <div class="flex gap-2 items-center justify-center mobile">
          <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700">Salário Mínimo</label>
          <input
            type="text"
            :value="minSalary"
            @input="$emit('update:minSalary', $event.target.value)"
            class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-[100%] sm:text-sm"
          />
          </div>
          <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700">Salário Máximo</label>
          <input
            type="text"
            :value="maxSalary"
            @input="$emit('update:maxSalary', $event.target.value)"
            class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-[100%] sm:text-sm"
          />
          </div>
      </div>
      <div class="flex gap-2 items-center justify-center mobile">

          <div class="flex flex-col">
          <label for="employeeName" class="text-sm font-medium text-gray-700">Nome Funcionário</label>
          <input
            type="text"
            :value="filterName"
            @input="$emit('update:filterName', $event.target.value)"
            placeholder="Digite o Nome"
            class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500   sm:text-sm"
          />
          </div>
          <div class="flex flex-col w-[120%]">
          <label class="  text-sm font-medium text-gray-900">Selecione o Sexo</label>
          <select
            :value="sex"
            @change="$emit('update:sex', $event.target.value)"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            >
            <option value="A">Todas as opções</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            </select>
          </div>          
    </div>
  </div>

  </template>
  
  <script>
  export default {
    name: 'FilterWorker',
    props: {
      filterName: String,
      startDate: String,
      endDate: String,
      sex: String,
      minAge: String,
      maxAge: String,
      minSalary: String,
      maxSalary: String,
    },
  };
  </script>
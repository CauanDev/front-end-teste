<template>
  <div class="flex flex-col gap-1.5 text-center">
    <div class="flex gap-2 items-center justify-center mobile">
      <div class="flex flex-col">
        <label for="startDate" class="text-sm font-medium text-gray-700"
          >Data Início</label
        >
        <input
          type="date"
          value="startDate"
          @input="$emit('update:startDate', $event.target.value)"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
        />
      </div>
      <div class="flex flex-col">
        <label for="endDate" class="text-sm font-medium text-gray-700"
          >Data Final:</label
        >
        <input
          type="date"
          value="endDate"
          @input="$emit('update:endDate', $event.target.value)"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
        />
      </div>
      <div
        v-if="tooltip"
        class="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip"
      >
        Média de Tempo Entre uma Revisão e Outra
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <div class="flex flex-col gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          @mouseover="tooltip = true"
          @mouseleave="tooltip = false"
          class="w-4"
        >
          <path
            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
          />
        </svg>

        <input
          type="radio"
          @input="$emit('update:average', $event.target.value)"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
      </div>
    </div>

    <div class="flex w-full justify-center items-center">
      <div class="flex flex-col">
        <label for="endDate" class="text-sm font-medium text-gray-700">Nome Proprietário</label>
        <input
          type="text"
          placeholder="Digite o Nome"
          @input="$emit('update:name', $event.target.value)"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"/>
      </div>


    </div>
    <div class="flex gap-2 items-center justify-center">
      <div>
        <label class="block text-sm font-medium text-gray-900"
          >Marca com:</label
        >
        <select
          value="brand"
          @input="$emit('update:brand', $event.target.value)"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="all" selected>Nenhuma Opção</option>
          <option value="maior">Maior Número de Revisão</option>
          <option value="menor">Menor Número de Revisão</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-900"
          >Mecânico Responsável:</label
        >
        <select
          value="worker"
          @input="$emit('update:worker', $event.target.value)"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="all" selected>Nenhuma Opção</option>
          <option
            v-for="worker in allWorkers"
            :key="worker.id"
            :value="worker.name"
          >
            {{ worker.name }}
          </option>
        </select>
      </div>

      <div
        v-if="tooltipOwner"
        class="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip"
      >
        Proprietários com Maior Número De Revisão
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <div class="flex flex-col gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          @mouseover="tooltipOwner = true"
          @mouseleave="tooltipOwner = false"
          class="w-4"
        >
          <path
            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
          />
        </svg>

        <input
          type="radio"
          @input="$emit('update:moreServices', $event.target.value)"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/services/http.js";

export default {
  name: "FilterService",
  props: {
    name: String,
    moreServices: String,
    brand: String,
    worker: String,
    average: String,
  },
  data() {
    return {
      tooltip: false,
      tooltipOwner: false,
      allWorkers:[]
    };
  },
  methods:{
    async getAllWorkers()
    {
        try{
            const workers = await http.get("/workers-all");
            this.allWorkers = workers.data.workers;
        }
        catch(error)
        {
            console.log(error)
        }
    }
  },
  mounted(){
    this.getAllWorkers();
  }
};
</script>

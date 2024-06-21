<template>
  <div class="flex flex-col gap-1.5 text-center justify-center items-center w-full">
    <div class="flex gap-2 items-center justify-center flex-col justify-center w-full">
      <div class="flex w-full gap-2">

        <div class="flex flex-col w-full">
        <label for="name" class="text-sm font-medium text-gray-700"
          >Nome Usuário</label>
        <input
          type="text"
          placeholder="Digite o Nome"
          @input="$emit('update:name', $event.target.value)"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"/>
        </div>

        <div class="flex flex-col w-full">
        <label for="name" class="text-sm font-medium text-gray-700">Ordenar por</label>
          <div class="flex w-full">
            <div class="flex flex-col items-center">
              <input
                name="ordenate"
                value="orderName"
                @input="$emit('update:order', $event.target.value)"
                type="radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
              <label class="ms-2 text-sm font-medium">Nome Usuários</label>
            </div>

            <div class="flex flex-col items-center">
              <input
                name="ordenate"
                value="orderDate"
                @input="$emit('update:order', $event.target.value)"
                type="radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
              <label class="ms-2 text-sm font-medium">Data</label>
            </div>

            <div class="flex flex-col items-center">
              <input
                value="desc"
                @input="$emit('update:ordenateOrder', $event.target.value)"
                type="radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
              <label class="ms-2 text-sm font-medium">Ordem Decrescente</label>
            </div>            
            
          </div>
        
        </div>

      </div>
      <div class="flex gap-2  w-full mobile">
        <div class="flex flex-col  w-full">
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

        <div class="flex flex-col justify-center w-full">
          <label for="endDate" class="text-sm font-medium text-gray-700"
            >Data Final</label
          >
          <input
            type="date"
            value="endDate"
            @input="$emit('update:endDate', $event.target.value)"
            class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FilterUser",
  props: {
    name: String,
    startDate: String,
    endDate: String,
    ordenateOrder: String,
    order: String
  },
};
</script>

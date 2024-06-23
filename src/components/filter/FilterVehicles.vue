<template>
  <div class="flex flex-col gap-1.5 text-center w-full">
    <div class="flex flex-col  items-center justify-center w-full">


      <div class="flex ">
        Ordenar:
        <div class="flex w-full">
          
          <div class="flex flex-col items-center mb-4 w-full">
            <input
              name="ordenate"
              value="nameOwners"
              :value="order"
              @input="$emit('update:order', $event.target.value)"
              type="radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label class="ms-2 text-sm font-medium"
              >Nome Proprietários</label
            >
          </div>

          <div class="flex flex-col items-center mb-4 w-full">
            <input
              name="ordenate"
              value="vehiclesName"
              :value="order"
              @input="$emit('update:order', $event.target.value)"
              type="radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label class="ms-2 text-sm font-medium"
              >Nome Veículos</label
            >
          </div>

          <div class="flex flex-col items-center mb-4 w-full">
            <input
              name="ordenate"
              value="moreServices"
              :value="order"
              @input="$emit('update:order', $event.target.value)"
              type="radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label class="ms-2 text-sm font-medium"
              >Mais Revisões</label
            >
          </div>

          
          <div class="flex flex-col items-center mb-4 w-full">
            <input
              value="desc"
              :value="ordenateOrder"
              @input="$emit('update:ordenateOrder', $event.target.value)"
              type="radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label class="ms-2 text-sm font-medium"
              >Ordem Decrescente</label
            >
          </div>
        </div>
      </div>

      <div class="flex">
        Incluir:
        <div class="flex w-full">
          
          <div class="flex flex-col items-center mb-4 w-full">
            <input
              name="ordenateOrder"
              value="moreVehicleSex"
              :value="subOrder"
              @input="$emit('update:subOrder', $event.target.value)"
              type="radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label class="ms-2 text-sm font-medium"
              >Sexo que Possui mais Veículos</label
            >
          </div>

          <div class="flex flex-col items-center mb-4 w-full">
            <input
              name="ordenateOrder"
              value="countModel"
              :value="subOrder"
              @input="$emit('update:subOrder', $event.target.value)"
              type="radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label class="ms-2 text-sm font-medium"
              >Marcas ordenadas por número de veículos</label
            >
          </div>

          <div class="flex flex-col items-center mb-4 w-full">
          <input
            name="ordenateOrder"
            value="countModelSex"
            :value="subOrder"
            @input="$emit('update:subOrder', $event.target.value)"
            type="radio"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
          <label class="ms-2 text-sm font-medium">Totais de marcas por gênero<br>do maior para o menor</label>
          </div>

        </div>
      </div>

      
    </div>
    <div class="flex gap-2 items-center justify-center mobile w-full">
      <div class="flex flex-col w-full">
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
      <div class="flex flex-col w-full">
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
      <div class="w-full">
        <label class="block text-xs text-gray-900">Selecione a Marca</label>
        <select
          value="filter.brand"
          @input="$emit('update:brand', $event.target.value)"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="all">Todos</option>
          <option value="Fiat">Fiat</option>
          <option value="Ford">Ford</option>
          <option value="Chevrolet">Chevrolet</option>
          <option value="Volkswagen">Volkswagen</option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          <option value="Hyundai">Hyundai</option>
          <option value="Renault">Renault</option>
          <option value="Nissan">Nissan</option>
          <option value="Mercedes-Benz">Mercedes-Benz</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FilterVehicles",
  props: {
    startDate: String,
    endDate: String,
    minYear:String,
    maxYear:String,
    brand: String,
    order: String,
    subOrder: String,
    ordenateOrder: String,
  },
};
</script>

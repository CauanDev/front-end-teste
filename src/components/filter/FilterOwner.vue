<template>
  <div class="flex flex-col text-center bg-blue  w-full">

    <div class="flex gap-2 items-center justify-center w-full">
      <div class="flex flex-col w-full">
        <label for="startDate" class="text-sm font-medium text-gray-700"
          >Data Início</label
        >
        <input
          type="date"
          :value="startDate"
          @input="$emit('update:startDate', $event.target.value)"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
        />
      </div>
      <div class="flex flex-col w-full ">
        <label for="endDate" class="text-sm font-medium text-gray-700"
          >Data Final</label
        >
        <input
          type="date"
          :value="endDate"
          @input="$emit('update:endDate', $event.target.value)"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
        />
      </div>
    </div>


    <div class="flex gap-2 items-center justify-center mobile w-full ">
      <div class="flex flex-col w-full">
        <label for="minAge" class="text-sm font-medium text-gray-700"
          >Idade Mínima</label
        >
        <input
          type="number"
          :value="minAge"
          @input="validateAge($event.target.value, 'minAge')"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-[100%]"
        />
      </div>
      <div class="flex flex-col w-full">
        <label for="maxAge" class="text-sm font-medium text-gray-700"
          >Idade Máxima</label
        >
        <input
          type="number"
          :value="maxAge"
          @input="validateAge($event.target.value, 'maxAge')"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-[100%]"
        />
      </div>
    </div>

    <div class="flex gap-2 items-center justify-center mobile w-full mb-2">
      <div class="flex flex-col w-full">
        <label for="name" class="text-sm font-medium text-gray-700"
          >Nome Proprietário</label
        >
        <input
          type="text"
          placeholder="Digite o Nome"
          :value="this.name"
          @input="$emit('update:name', $event.target.value)"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-900"
          >Selecione o Sexo</label
        >
        <select
          :value="sex"
          @change="$emit('update:sex', $event.target.value)"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
        >
          <option value="A" selected>Todos as opções</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
      </div>
    </div>



    <div class="w-full flex">
      <div>
        <label class="block text-sm font-medium text-gray-900">Selecione a Marca</label>
        <select
          :value="brand"
          @change="$emit('update:brand', $event.target.value)"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <option value="All" selected>Todos as opções</option>
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

      <div class="flex items-center mb-4 gap-2">
        <h1 class="ms-2 text-sm font-medium">Ordenar por:</h1>
          <div class="flex flex-col">
            <div class="flex">
              <input
                name="ordenate"
                value="nameOwners"
                @input="$emit('update:order', $event.target.value)"
                type="radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
              <label class="ms-2 text-sm font-medium">Nome de Proprietários</label>
            </div>    
            <div class="flex">
              <input
                name="ordenate"
                :value="moreVehicles"
                @input="$emit('update:order', $event.target.value)"
                type="radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
              <label class="ms-2 text-sm font-medium">Mais Veiculos</label>
            </div>   
            <div class="flex">
              <input
                name="ordenate"
                value="moreServices"
                @input="$emit('update:order', $event.target.value)"
                type="radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
              <label class="ms-2 text-sm font-medium">Mais Revisões</label>
            </div>  
            <div class="flex">
              <input
                name="ordenate"
                value="ageOrder"
                @input="$emit('update:order', $event.target.value)"
                type="radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
              <label class="ms-2 text-sm font-medium">Idade dos Proprietários</label>
            </div>                   
            <div class="flex">
              <input
                name="ordenateOrder"
                value="desc"
                @input="$emit('update:ordenateOrder', $event.target.value)"
                type="radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
              <label class="ms-2 text-sm font-medium">Ordem Decrescente</label>
            </div>      
              
          </div>


      </div>


    </div>

  </div>
</template>

<script>
export default {
  name: "FilterOwner",
  props: {
    startDate: String,
    endDate: String,
    name: String,
    sex: String,
    minAge: String,
    maxAge: String,
    brand: String,
    order: String,
    ordenateOrder:String
  },
  methods: {
    validateAge(value, ageType) {
      if (value > 200) {
        alert("Digite uma idade válida");
        if (ageType === 'minAge') {
          this.$emit('update:minAge', 0);
        } else {
          this.$emit('update:maxAge'," " );
        }
      } else {
        this.$emit(`update:${ageType}`, value);
      }
    }}
};
</script>

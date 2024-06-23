<template>
  <div class="flex flex-col gap-1.5 text-center w-full">
    <div class="flex gap-2 items-center justify-center mobile w-full">
      <div class="flex flex-col  w-full">
        <label for="startDate" class="text-sm font-medium text-gray-700">Data Início</label>
        <input
          type="date"
          @input="$emit('update:startDate', $event.target.value)"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div class="flex flex-col  w-full">
        <label for="endDate" class="text-sm font-medium text-gray-700">Data Final</label>
        <input
          type="date"
          :value="endDate"
          @input="$emit('update:endDate', $event.target.value)"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
    <div class="flex gap-2 items-center justify-center mobile w-full">
      <div class="flex flex-col  w-full">
        <label class="text-sm font-medium text-gray-700">Idade Mínima</label>
        <input
          type="number"
          :value="minAge"
          @input="validateAge($event.target.value, 'minAge')"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-[100%] sm:text-sm"
        />
      </div>
      <div class="flex flex-col w-full">
        <label class="text-sm font-medium text-gray-700">Idade Máxima</label>
        <input
          type="number"
          :value="maxAge"
          @input="validateAge($event.target.value, 'maxAge')"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-[100%] sm:text-sm"
        />
      </div>
    </div>
    <div class="flex gap-2 items-center justify-center mobile w-full">
      <div class="flex flex-col w-full">
        <label class="text-sm font-medium text-gray-700">Salário Mínimo</label>
        <input
          type="number"
          max="1234"
          :value="minSalary"
          @input="validateSalary($event.target.value,'minSalary')"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-[100%] sm:text-sm"
        />
      </div>
      <div class="flex flex-col w-full">
        <label class="text-sm font-medium text-gray-700">Salário Máximo</label>
        <input
          type="number"
          :value="maxSalary"
          @input="validateSalary($event.target.value,'maxSalary')"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-[100%] sm:text-sm"
        />
      </div>
    </div>
    <div class="flex gap-2 items-center justify-center mobile w-full">
      <div class="flex flex-col w-full">
        <label class="text-sm font-medium text-gray-700">Nome Funcionário</label>
        <input
          type="text"
          :value="name"
          @input="$emit('update:name', $event.target.value)"
          placeholder="Digite o Nome"
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div class="flex flex-col w-full">
        <label class="text-sm font-medium text-gray-900">Selecione o Sexo</label>
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
    <div class="flex items-center mb-4 gap-2 ">
      <h1 class="ms-2 text-sm font-medium">Ordenar por:</h1>
      <div class="flex">
        <div class="flex flex-col items-center justify-center w-full">
          <input
            name="ordenate"
            value="nameWorkers"
            @input="$emit('update:order', $event.target.value)"
            type="radio"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label class="ms-2 text-sm font-medium">Nome de Funcionários</label>
        </div>
        <div class="flex flex-col items-center justify-center w-full">
          <input
            name="ordenate"
            value="salaryWorkers"
            @input="$emit('update:order', $event.target.value)"
            type="radio"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label class="ms-2 text-sm font-medium">Salário dos Funcionários</label>
        </div>
        <div class="flex flex-col items-center justify-center w-full">
          <input
            name="ordenate"
            value="moreServices"
            @input="$emit('update:order', $event.target.value)"
            type="radio"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label class="ms-2 text-sm font-medium">Mais<br>Revisões</label>
        </div>
        <div class="flex flex-col items-center justify-center w-full">
          <input
            name="ordenateOrder"
            value="desc"
            @input="$emit('update:ordenateOrder', $event.target.value)"
            type="radio"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label class="ms-2 text-sm font-medium">Ordem Decrescente</label>
        </div>
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
    ordenateOrder: String,
    order: String
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
    },
    validateSalary(value, ageType)
    {
      if (value > 100000) {
        alert("Digite uma idade válida");
        if (ageType === 'minSalary') {
          this.$emit('update:minSalary', 0);
        } else {
          this.$emit('update:maxSalary'," " );
        }
      } else {
        this.$emit(`update:${ageType}`, value);
      }
    }
  }
};
</script>

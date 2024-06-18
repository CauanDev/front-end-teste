<template>
  <div class="flex justify-center max-h-[420px]">
    <div class="w-full md:w-full">
      <table class="w-full md:w-full text-sm text-left text-black ">
        <thead class="text-xs uppercase bg-gray-300 text-center text-black sticky top-0">
          <tr>
            <th v-for="(header, index) in headers" :key="index" class="px-6 py-3 border-b border-gray-400">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(row, rowIndex) in body" :key="rowIndex" class="border-b border-gray-400">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="px-6 py-4 whitespace-nowrap">
              <template v-if="cellIndex === 'implementar'">             
                <div class="flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 cursor-pointer" @click="handleClick(cell)" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/>
                  </svg>
                </div>
              </template>
              <template v-else>
                {{ cell }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableView',
  props: {
    headers: {
      type: Array,
      required: true
    },
    body: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleClick(details) {
      this.$emit('showDetails', details);
    }
  }
};
</script>

<style scoped>
@media (max-width: 640px) {
  table {
    width: 80%; /* Ajusta a largura da tabela para ocupar toda a largura disponível */
    border-collapse: collapse; /* Mescla as bordas das células */
    margin: 0 auto; /* Centraliza a tabela horizontalmente */
  }
  th, td {
    padding: 8px; /* Adiciona um espaçamento interno */
    text-align: left; /* Alinha o texto à esquerda dentro das células */
  }
}
</style>

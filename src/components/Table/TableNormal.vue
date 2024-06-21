<template>
    <div class="flex justify-center max-h-[420px] overflow-y-autol">
      <div class="w-full">
        <table class="w-full text-sm text-left rtl:text-right text-black">
          <thead class="text-xs uppercase bg-gray-300 text-center text-black sticky top-0">
            <tr>
              <th v-for="(header, index) in headers" :key="index" class="px-6 py-3 border-b border-gray-400">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="(row, rowIndex) in body" :key="rowIndex" class="border-b border-gray-400 text-center">
              <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="px-6 py-4 whitespace-nowrap text-center">
            {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
    
    <script>
    export default {
      name: 'TableNormal',
      props: {
        headers: {
          type: Array,
        },
        body: {
          type: Array,
        }
      },
    };
    </script>
  
    
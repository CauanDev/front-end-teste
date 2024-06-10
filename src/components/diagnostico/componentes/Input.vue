<template>
  <div class="relative z-0 mx-auto w-80">
    <input
      id="floating_standard"
      class="peer block w-full appearance-none text-ellipsis border-0 border-b-2 border-gray-300 bg-transparent px-0 pt-3 text-2xl font-bold text-gray-200 focus:outline-none focus:ring-0"
      :value="modelValue"
      @input="onInput"
      style="text-align: right;"
    />
    <label
      for="floating_standard"
      class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-lg text-gray-200 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
    >
      {{ title }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'InputView',
  props: {
    title: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    },
    op: Boolean,
    op1: Boolean
  },
  methods: {
    formatInput(value) {
      let cleanedValue = value;

      if (this.title.includes('Tempo')) {
        cleanedValue = value.replace(/[^0-9.]/g, '');
        if (!cleanedValue.includes(' Min')) {
          cleanedValue += ' Min';
        }
      }

      if (this.title.includes('Salário') || this.title.includes('Labore')) {
        cleanedValue = cleanedValue.replace(/[^0-9,.]/g, ''); // Mantém apenas números, vírgulas e pontos
        if (!cleanedValue.startsWith('R$')) {
          cleanedValue = 'R$ ' + cleanedValue;
        }
      }
      
      return cleanedValue;
    },
    onInput(event) {
      const formattedValue = this.formatInput(event.target.value);
      this.$emit('update:modelValue', formattedValue);
    }
  }
};
</script>

<style scoped>
/* Adicione seu estilo customizado aqui, se necessário */
</style>

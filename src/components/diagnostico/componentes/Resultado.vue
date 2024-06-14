<template>
    <div :class="[!semMarca_Centro ? 'justify-end' : 'justify-start', 'flex h-8 w-28 items-center text-center rounded-lg bg-white pr-2.5 ps-12 overflow-hidden font-medium']">
      <span :class="[!fontSize(value) ? 'text-sm' : 'text-xs']" class="max-w-20">
        {{ number() }}&nbsp;{{ extractIntFromString(value) }}{{ minORhour() }}
      </span>
    </div>
</template>  
  <script>
  export default {
    name: 'ResultadoView',
    props: {
      value: {
        type: [String, Number],
        required: true
      },
      Min: {
        type: Boolean,
        default: false
      },
      Hrs: {
        type: Boolean,
        default: false
      },
      semMarca_Centro: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      extractIntFromString(value) {
        if (typeof value !== 'number') {
          return value.replace(/R\$|Min|\s/g, '').replace('.', ',');
        }
        if (value == '0') {
          return ' ';
        } else {
          return value;
        }
      },
      fontSize(value) {
        if (typeof value === 'string' && value.length) {
          return value.length >= 12;
        }
        if ((typeof value === 'number' || !isNaN(value)) && (this.Min || this.Hrs)) {
          if (!isNaN(value) && value != 189) {
            return (value.toString().length + 4) > 6;
          }
          return value.toString().length > 6;
        }
        return false;
      },
      minORhour() {
        if (this.Min) {
          return ' Min';
        }
        if (this.Hrs) {
          return ' H';
        }
        return '';
      },
      number() {
        if (!this.Min && !this.Hrs && this.value != 0 && !this.semMarca_Centro) {
          if (typeof this.value === 'string' && !this.value.includes('R$')) {
            return 'R$';
          }
        }
        return '';
      }
    }
  };
  </script>
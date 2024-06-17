<template>
  <div class="w-full justify-center items-center">
    <canvas ref="brandChart" class="w-[15vw]"></canvas>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default defineComponent({
  name: 'BrandChart',
  props: {
    brands: {
      type: Array,
      required: true,
    },
  },
  watch: {
    brands() {
      this.createChart();
    }
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = this.$refs.brandChart.getContext('2d');
      
      const labels = this.brands.map(item => item.brand);
      const data = this.brands.map(item => item.total);

      if (this.chart) {
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = data;
        this.chart.update();
      } else {
        this.chart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'Quantidade de Marcas de Carros',
              data: data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(199, 199, 199, 0.2)',
                'rgba(83, 102, 255, 0.2)',
                'rgba(255, 205, 86, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(199, 199, 199, 1)',
                'rgba(83, 102, 255, 1)',
                'rgba(255, 205, 86, 1)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
          }
        });
      }
    }
  },
  data() {
    return {
      chart: null,
    };
  }
});
</script>

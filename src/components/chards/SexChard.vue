<template>
  <div>
    <canvas ref="sexChart"></canvas>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Chart from 'chart.js/auto';

export default defineComponent({
  name: 'SexChard',
  props: {
    users: {
      type: Array,
    },
  },
  data() {
    return {
      chart: null,
    };
  },

  watch: {
    users() {
      if (this.chart) {
        this.chart.destroy();
      }
      this.renderChart();
    },
  },
  methods: {
    renderChart() {
      const maleCount = this.users.filter(user => user.implementar.sex === 'M').length;
      const femaleCount = this.users.filter(user => user.implementar.sex === 'F').length;
      const ctx = this.$refs.sexChart.getContext('2d');
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Masculino', 'Feminino'],
          datasets: [{
            label: 'Número de Usuários por Sexo',
            data: [maleCount, femaleCount],
            backgroundColor: ['#007bff', '#dc3545'],
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
  mounted() {
    this.renderChart();
  },
});
</script>

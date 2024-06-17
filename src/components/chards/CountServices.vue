<template>
    <div>
      <canvas ref="userChart"></canvas>
    </div>
</template>
<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'CountServices',
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  watch: {
    users() {
      this.createChart();
    }
  },
  mounted() {
    this.createChart();
    
  },
  methods: {
    createChart() {
      const dates = this.users.map(item => item.date);
      const revisionCountsByDate = dates.reduce((acc, date) => {
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      // Preparar os rótulos e os dados para o gráfico
      const labels = Object.keys(revisionCountsByDate);
      const data = Object.values(revisionCountsByDate);

      const ctx = this.$refs.userChart.getContext('2d');

      if (this.chart) {

        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = data;
        this.chart.update(); 
      } else {
        // Criar um novo gráfico
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Número de Revisões',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.8)',
              borderColor: 'rgba(75, 192, 192)',
              borderWidth: 2
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  }
};
</script>
  
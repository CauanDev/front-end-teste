<template>
    <div>
      <canvas ref="userChart"></canvas>
    </div>
  </template>
  
<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'CountServicesSplit',
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
      const sexes = this.users.map(item => item.implementar.sexOwner);
      console.log(sexes)
      console.log(this.users)
      const revisionCountsByDateAndSex = dates.reduce((acc, date, index) => {
        const sex = sexes[index];
        if (!acc[date]) {
          acc[date] = { M: 0, F: 0 };
        }
        acc[date][sex] = (acc[date][sex] || 0) + 1;
        return acc;
      }, {});

      // Preparar os rótulos e os dados para o gráfico
      const labels = Object.keys(revisionCountsByDateAndSex);
      const maleData = labels.map(date => revisionCountsByDateAndSex[date].M || 0);
      const femaleData = labels.map(date => revisionCountsByDateAndSex[date].F || 0);

      // Obter o contexto do canvas para o gráfico
      const ctx = this.$refs.userChart.getContext('2d');

      if (this.chart) {
        // Atualizar os dados do gráfico existente
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = maleData;
        this.chart.data.datasets[1].data = femaleData;
        this.chart.update();
      } else {
        // Criar um novo gráfico
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Revisões Masculinas',
                data: maleData,
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgba(54, 162, 235)',
                borderWidth: 2
              },
              {
                label: 'Revisões Femininas',
                data: femaleData,
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                borderColor: 'rgba(255, 99, 132)',
                borderWidth: 2
              }
            ]
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

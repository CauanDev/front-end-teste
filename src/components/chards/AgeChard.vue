<template>
    <div>
      <canvas ref="ageChart"></canvas>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default defineComponent({
    name: 'AgeChard',
    props: {
      users: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        chart: null,
      };
    },
    mounted() {
      this.renderChart();
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
        const totalAge = this.users.reduce((sum, user) => sum + parseInt(user.implementar.age), 0);
        const averageAge = totalAge / this.users.length;
  
        const ctx = this.$refs.ageChart.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Idade Média'],
            datasets: [{
              label: 'Idade Média dos Usuários',
              data: [averageAge],
              backgroundColor: ['#007bff'],
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
  });
  </script>
  
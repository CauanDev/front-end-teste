<template>
    <div>
      <canvas ref="sexAgeChart"></canvas>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default defineComponent({
    name: 'AgeChardSplit',
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
        const maleUsers = this.users.filter(user => user.implementar.sex === 'M');
        const femaleUsers = this.users.filter(user => user.implementar.sex === 'F');
  
        const totalMaleAge = maleUsers.reduce((sum, user) => sum + parseInt(user.implementar.age), 0);
        const totalFemaleAge = femaleUsers.reduce((sum, user) => sum + parseInt(user.implementar.age), 0);
  
        const averageMaleAge = maleUsers.length ? totalMaleAge / maleUsers.length : 0;
        const averageFemaleAge = femaleUsers.length ? totalFemaleAge / femaleUsers.length : 0;
  
        const ctx = this.$refs.sexAgeChart.getContext('2d');
  
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Masculino', 'Feminino'],
            datasets: [{
              label: 'Idade Média dos Usuários por Sexo',
              data: [averageMaleAge, averageFemaleAge],
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
  });
  </script>
  
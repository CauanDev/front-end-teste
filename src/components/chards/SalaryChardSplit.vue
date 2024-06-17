<template>
    <div>
      <canvas ref="userChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default {
    name: 'SalaryChartSplit',
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
    watch: {
      users() {
        if (this.chart) {
          this.chart.destroy();
        }
        this.createChart();
      },
    },
    mounted() {
      this.createChart();
    },
    methods: {
      createChart() {
        const maleUsers = this.users.filter(user => user.implementar.sex === 'M');
        const femaleUsers = this.users.filter(user => user.implementar.sex === 'F');
  
        const totalMaleSalary = maleUsers.reduce((sum, user) => sum + parseFloat(user.implementar.salary), 0);
        const totalFemaleSalary = femaleUsers.reduce((sum, user) => sum + parseFloat(user.implementar.salary), 0);
  
        const averageMaleSalary = maleUsers.length ? totalMaleSalary / maleUsers.length : 0;
        const averageFemaleSalary = femaleUsers.length ? totalFemaleSalary / femaleUsers.length : 0;
  
        const ctx = this.$refs.userChart.getContext('2d');
  
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Masculino', 'Feminino'],
            datasets: [{
              label: 'Média Salarial por Sexo',
              data: [averageMaleSalary, averageFemaleSalary],
              backgroundColor: ['#007bff', '#dc3545'],
              borderColor: ['#007bff', '#dc3545'],
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
  };
  </script>
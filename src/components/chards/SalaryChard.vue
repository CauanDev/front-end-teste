<template>
    <div>
      <canvas ref="userChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default {
    name: 'SalaryChard',
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
        const salary = this.users.map(item => item.salary);
  
        const userCountsBySalary = salary.reduce((acc, date) => {
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
  
        const labels = Object.keys(userCountsBySalary);
        const data = Object.values(userCountsBySalary);
  
        const ctx = this.$refs.userChart.getContext('2d');
        if (this.chart) {
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = data;
        this.chart.update(); 
      }
      else{
       this.chart =  new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Número de Salários de Usuários',
              data: data,
              backgroundColor: 'rgba(0, 128, 0, 0.8)',
              borderColor: 'rgba(0, 128, 0)',
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
  
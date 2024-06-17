<template>
    <div>
      <canvas ref="userChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default {
    name: 'CountChardSplit',
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
      }
    },
    mounted() {
      this.createChart();
    },
    methods: {
      createChart() {
        const maleUsers = this.users.filter(user => user.implementar.sex === 'M');
        const femaleUsers = this.users.filter(user => user.implementar.sex === 'F');
  
        const maleDates = maleUsers.map(user => user.created_at);
        const femaleDates = femaleUsers.map(user => user.created_at);
  
        const maleCountsByDate = maleDates.reduce((acc, date) => {
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
  
        const femaleCountsByDate = femaleDates.reduce((acc, date) => {
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
  
        const labels = Array.from(new Set([...Object.keys(maleCountsByDate), ...Object.keys(femaleCountsByDate)])).sort();
        const maleData = labels.map(label => maleCountsByDate[label] || 0);
        const femaleData = labels.map(label => femaleCountsByDate[label] || 0);
  
        const ctx = this.$refs.userChart.getContext('2d');
  
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Masculino',
                data: maleData,
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgba(54, 162, 235)',
                borderWidth: 1
              },
              {
                label: 'Feminino',
                data: femaleData,
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                borderColor: 'rgba(255, 99, 132)',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  };
  </script>
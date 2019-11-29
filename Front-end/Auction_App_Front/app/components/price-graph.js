import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  chartData: computed('prices', function() {
    return {
      labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      datasets: [{
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        data: this.get('prices')
      }]
    }
  }),
  chartOptions: {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{

        display: false,
        gridLines: {
          drawOnChartArea: false
        }
      }],
      yAxes: [{
        display: false,
        gridLines: {
          drawOnChartArea: false
        }
      }]
    }
  }
});
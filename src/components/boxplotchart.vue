<template>
  <div>
    <div :id="'container' + index"></div>
  </div>
</template>

<script>
export default {
  props: ["chartData", "index"],
  data() {
    return {
      data: [
        [1.3, 1.71],
        [1.4, 2.4],
      ],
    };
  },
  methods: {
    genChart() {
      let _this = this;
      Highcharts.chart("container" + _this.index, {
        chart: {
          type: "columnrange",
          inverted: false,
        },

        title: {
          text: _this.chartData.title,
        },

        xAxis: {
          categories: _this.chartData.sensor,
        },
        credits: {
          enabled: false,
        },

        yAxis: {
          title: {
            useHTML: true,
            text: _this.chartData.unit,
          },
        },

        tooltip: {
          useHTML: true,
          valueSuffix: _this.chartData.unit,
        },

        plotOptions: {
          columnrange: {
            dataLabels: {
              useHTML: true,
              enabled: true,
              format: "{y} " + _this.chartData.unit,
            },
          },
        },

        legend: {
          enabled: false,
        },

        series: [
          {
            name: _this.chartData.title,
            data: _this.chartData.data,
          },
        ],
      });
    },
  },
  mounted() {
    this.genChart();
  },
  watch: {
    chartData: function (newData, oldData) {
      this.genChart();
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  height: 420px;
}
</style>

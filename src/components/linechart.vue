<template>
  <div>
    <div :id="'containerLine' + index"></div>
  </div>
</template>

<script>
export default {
  props: ["chartData", "index"],
  data() {
    return {};
  },
  methods: {
    genChart() {
      let _this = this;

      let chart = Highcharts.chart("containerLine" + _this.index, {
        chart: {
          zoomType: "x",
        },
        time: {
          useUTC: false,
          timezone: "Asia/Bangkok",
        },
        title: {
          text: _this.chartData.title,
          align: "left",
        },
        subtitle: {
          text:
            document.ontouchstart === undefined
              ? "Click and drag in the plot area to zoom in"
              : "Pinch the chart to zoom in",
          align: "left",
        },
        xAxis: {
          type: "datetime",
        },
        yAxis: {
          title: {
            useHTML: true,
            text: _this.chartData.unit,
          },
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [
                  1,
                  Highcharts.color(Highcharts.getOptions().colors[0])
                    .setOpacity(0)
                    .get("rgba"),
                ],
              ],
            },
            marker: {
              radius: 2,
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1,
              },
            },
            threshold: null,
          },
        },

        series: [
          {
            type: "areaspline",
            name: _this.chartData.title,
            data: _this.chartData.data,
          },
        ],
      });

      let plotLines = [];
      if (this.chartData.maxLimit != "-") {
        plotLines.push(
          chart.yAxis[0].addPlotLine({
            value: Number(this.chartData.maxLimit),
            color: "red",
            width: 2,
            id: "maxline",
            label: {
              text: "max limit",
              align: "right",
              x: -20,
            },
          })
        );
      }
      if (this.chartData.minLimit != "-") {
        plotLines.push(
          chart.yAxis[0].addPlotLine({
            value: Number(this.chartData.minLimit),
            color: "red",
            width: 2,
            id: "maxline",
            label: {
              text: "min limit",
              align: "right",
              x: -20,
            },
          })
        );
      }
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

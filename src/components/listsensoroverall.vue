<template>
  <div>
    <div class="row gt-xs">
      <div
        class="box shadow-2 q-mt-md"
        v-for="(item, index) in sensorData"
        :key="index"
      >
        <div class="row">
          <div class="col-4 iconShow">
            <img :src="imgIcone(item.icon)" alt="" />
          </div>
          <div class="col">
            <div class="sensorText">{{ item.sensortype }}</div>
            <div class="sensorOnlineText">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="lt-sm">
      <div><q-select v-model="selectedMode" :options="sensorDataMobile" /></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["data"],
  data() {
    return {
      sensorData: [],
      sensorDataMobile: [],
      selectedMode: "overall",
    };
  },
  methods: {
    imgIcone(index) {
      let numIcon = index + 1;
      let fileImg = "s" + numIcon + ".svg";
      return fileImg;
    },

    async loadSensor() {
      let temp = {
        projectID: this.data.id,
      };
      let sensorTemp = [];
      let url = this.apiPath + "loadsensoroverall.php";
      let res = await axios.post(url, JSON.stringify(temp));
      res.data.forEach((x) => {
        if (x.count != 0) {
          let temp = {
            id: x.id,
            name: x.name,
            sensortype: x.sensortype,
          };
          sensorTemp.push(temp);
        }
      });
      sensorTemp.sort((a, b) => {
        if (a.sensortype > b.sensortype) {
          return 1;
        } else if (a.sensortype < b.sensortype) {
          return -1;
        } else {
          if (a.name > b.name) {
            return 1;
          } else {
            return -1;
          }
        }
      });
      let sensorTypeData = [...new Set(sensorTemp.map((x) => x.sensortype))];
      sensorTypeData.forEach((sType, index) => {
        sensorTemp.forEach((sensor) => {
          if (sensor.sensortype == sType) {
            sensor.icon = index + 1;
          }
        });
      });
      //add overall icon
      let tempOverall = {
        id: 0,
        name: sensorTemp.length + " sensors",
        sensortype: "Overall",
        icon: 0,
      };
      sensorTemp.unshift(tempOverall);
      this.sensorData = sensorTemp;
      this.sensorDataMobile = [];
      this.sensorData.forEach((x, index) => {
        let temp;
        if (index == 0) {
          temp = {
            value: x.id,
            label: x.sensortype,
          };
        } else {
          temp = {
            value: x.id,
            label: x.name,
          };
        }
        this.sensorDataMobile.push(temp);
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.loadSensor();
    }, 300);
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 170px;
  height: 60px;
  margin-right: 20px;
  background-color: white;
}
.iconShow {
  padding-left: 7px;
  padding-top: 10px;
}
.sensorText {
  font-size: 12px;
  padding-top: 10px;
  text-align: right;
  padding-right: 10px;
}
.sensorOnlineText {
  text-align: right;
  padding-right: 10px;
}
</style>

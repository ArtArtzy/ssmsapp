<template>
  <div>
    <div class="row">
      <div
        class="box shadow-2 q-mt-md"
        v-for="(item, index) in sensorData"
        :key="index"
      >
        <div class="row">
          <div class="col-4 iconShow">
            <img :src="imgIcone(index)" alt="" />
          </div>
          <div class="col">
            <div class="sensorText">{{ item.sensorName }}</div>
            <div class="sensorOnlineText">
              {{ item.count }}/{{ item.count }} Online
            </div>
          </div>
        </div>
      </div>
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
    };
  },
  methods: {
    imgIcone(index) {
      let numIcon = index + 2;
      let fileImg = "s" + numIcon + ".svg";
      return fileImg;
    },

    async loadSensor() {
      let temp = {
        projectID: this.data.id,
      };

      let url = this.apiPath + "loadsensorinfo.php";
      let res = await axios.post(url, JSON.stringify(temp));
      res.data.forEach((x) => {
        if (x.count != 0) {
          let temp = {
            id: x.id,
            sensorName: x.sensorName,
            count: x.count,
          };
          this.sensorData.push(temp);
        }
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

<template>
  <div>
    <!-- PC -->
    <div class="gt-md mainPage shadow-3">
      <div class="row">
        <div><left-menu menuItem="2" /></div>
        <div class="col rightPanelPC">
          <div class="row justify-between">
            <div>
              <div class="title q-px-md q-pt-md">
                <b>{{ projectInfo.name }}</b>
              </div>

              <div class="q-px-md">{{ projectInfo.address }}</div>
            </div>
            <div class="row">
              <div
                class="onlineBtn shadow-2"
                @click="runOffline()"
                v-if="onlineBtnRun"
              >
                <div>Online</div>
              </div>
              <div class="offlineBtn shadow-2" @click="runOnline()" v-else>
                <div>Offline</div>
              </div>

              <div>
                <set-time
                  :projectInfo="projectInfo"
                  @setTime="setTime"
                  :disable="onlineBtnRun"
                />
              </div>
            </div>
          </div>

          <div class="q-px-md">
            <list-sensor :data="projectInfo" @selectedSensor="selectedSensor" />
          </div>
          <div class="row" v-if="sensor.id == 0">
            <div
              class="col-6 q-pa-md"
              v-for="(item, index) in chartDataOverall"
              :key="index"
            >
              <box-plot :chartData="item" :index="index" />
            </div>
          </div>
          <div class="row" v-if="sensor.id != 0">
            <div class="col-12 q-pa-md" style="text-align: center">
              <img :src="imgPic" alt="" class="imgShow" />
            </div>
            <div
              class="col-12 q-pa-md"
              style="text-align: center; max-width: 90%; margin: auto"
            >
              <box-plot :chartData="chartDataOverall" />
            </div>
            <div class="col-12 q-pa-md">
              <div class="whiteDiv">
                <div class="row justify-end">
                  <div class="row q-px-md">
                    <div class="q-pa-md">Display</div>
                    <div>
                      <q-select
                        v-model="displayShow"
                        :options="displayList"
                        dense
                        style="width: 120px"
                        @input="changeviewMode()"
                      />
                    </div>
                  </div>
                </div>
                <div v-for="(item2, index2) in chartDetail" :key="index2">
                  <line-chart :chartData="item2" :index="index2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Tablet -->
    <div class="mainPage lt-lg gt-xs">
      <div class="contentTablet">
        <div class="row justify-between">
          <div>
            <div class="title q-px-md q-pt-md">
              <b>{{ projectInfo.name }}</b>
            </div>
            <div class="q-px-md">{{ projectInfo.address }}</div>
          </div>
          <div class="row">
            <div
              class="onlineBtn shadow-2"
              @click="runOffline()"
              v-if="onlineBtnRun"
            >
              <div>Online</div>
            </div>
            <div class="offlineBtn shadow-2" @click="runOnline()" v-else>
              <div>Offline</div>
            </div>

            <div>
              <set-time
                :projectInfo="projectInfo"
                @setTime="setTime"
                :disable="onlineBtnRun"
              />
            </div>
          </div>
        </div>
        <div class="q-px-md">
          <list-sensor :data="projectInfo" @selectedSensor="selectedSensor" />
        </div>
        <div class="row" v-if="sensor.id == 0">
          <div
            class="col-6 q-pa-md"
            v-for="(item, index) in chartDataOverall"
            :key="index"
          >
            <box-plot :chartData="item" :index="'T' + index" />
          </div>
        </div>

        <div class="row" v-if="sensor.id != 0">
          <div class="col-12 q-pa-md" style="text-align: center">
            <img :src="imgPic" alt="" class="imgShow" />
          </div>
          <div
            class="col-12 q-pa-md"
            style="text-align: center; max-width: 90%; margin: auto"
          >
            <box-plot :chartData="chartDataOverall" :index="'TX' + index" />
          </div>
          <div class="col-12 q-pa-md">
            <div class="whiteDiv">
              <div class="row justify-end">
                <div class="row q-px-md">
                  <div class="q-pa-md">Display</div>
                  <div>
                    <q-select
                      v-model="displayShow"
                      :options="displayList"
                      dense
                      style="width: 120px"
                      @input="changeviewMode()"
                    />
                  </div>
                </div>
              </div>
              <div v-for="(item2, index2) in chartDetail" :key="index2">
                <line-chart :chartData="item2" :index="'TQ' + index2" />
              </div>
            </div>
          </div>
        </div>

        <div style="height: 100px"></div>
      </div>
      <div class="fixBt"><bt-menu menuItem="2" /></div>
    </div>
    <!-- Moblile -->
    <div class="lt-sm mainPage">
      <div class="contentTablet">
        <div class="title q-px-md q-pt-md">
          <b>{{ projectInfo.name }}</b>
        </div>
        <div class="q-px-md">{{ projectInfo.address }}</div>
        <div class="row justify-center">
          <div
            class="onlineBtn shadow-2"
            @click="runOffline()"
            v-if="onlineBtnRun"
          >
            <div>Online</div>
          </div>
          <div class="offlineBtn shadow-2" @click="runOnline()" v-else>
            <div>Offline</div>
          </div>

          <div>
            <set-time
              :projectInfo="projectInfo"
              @setTime="setTime"
              :disable="onlineBtnRun"
            />
          </div>
        </div>
        <div class="q-px-md">
          <list-sensor :data="projectInfo" @selectedSensor="selectedSensor" />
        </div>

        <div class="row" v-if="sensor.id == 0">
          <div
            class="col-12 q-pa-md"
            v-for="(item, index) in chartDataOverall"
            :key="index"
          >
            <box-plot :chartData="item" :index="'TM' + index" />
          </div>
        </div>
        <div class="row" v-if="sensor.id != 0">
          <div class="col-12 q-pa-md" style="text-align: center">
            <img :src="imgPic" alt="" class="imgShow" />
          </div>
          <div
            class="col-12 q-pa-md"
            style="text-align: center; max-width: 90%; margin: auto"
          >
            <box-plot :chartData="chartDataOverall" :index="'TXM' + index" />
          </div>
          <div class="col-12 q-pa-md">
            <div class="whiteDiv">
              <div class="row justify-end">
                <div class="row q-px-md">
                  <div class="q-pa-md">Display</div>
                  <div>
                    <q-select
                      v-model="displayShow"
                      :options="displayList"
                      dense
                      style="width: 120px"
                      @input="changeviewMode()"
                    />
                  </div>
                </div>
              </div>
              <div v-for="(item2, index2) in chartDetail" :key="index2">
                <line-chart :chartData="item2" :index="'TQM' + index2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fixBt"><bt-menu menuItem="2" /></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import setTime from "../components/settime.vue";
import leftMenu from "../components/leftmenu.vue";
import listSensor from "../components/listsensoroverall";
import btMenu from "../components/btmenu.vue";
import boxPlot from "../components/boxplotchart";
import lineChart from "../components/linechart";

export default {
  components: { leftMenu, listSensor, btMenu, setTime, boxPlot, lineChart },
  data() {
    return {
      displayShow: "Mean",
      displayList: ["Max", "Mean", "Min"],
      projectInfo: [],
      timeFrame: {
        showTime1: "",
        showTime2: "",
      },
      sensor: {},
      chartDataOverall: [],
      onlineBtnRun: true,
      imgPic: "",
      chartDetail: [],
      onlineClock: null,
    };
  },
  methods: {
    runOnline() {
      this.onlineBtnRun = true;
      console.log("start run");
      this.selectedSensor(this.sensor);
      this.onlineClock = setInterval(() => {
        console.log("still run");
        this.selectedSensor(this.sensor);
      }, (Number(this.projectInfo.duration) * 1000) / 3);
    },
    runOffline() {
      this.onlineBtnRun = false;
      this.selectedSensor(this.sensor);
      console.log("stop");
      clearInterval(this.onlineClock);
      this.onlineClock = null;
    },
    addZeroNumber(num) {
      if (Number(num) < 10) {
        return "0" + num;
      } else {
        return num;
      }
    },
    async selectedSensor(item) {
      this.sensor = item;
      if (!this.onlineBtnRun) {
        if (item.id == 0) {
          let temp = {
            projectID: this.projectInfo.id,
            showTime1: this.timeFrame.showTime2,
            showTime2: this.timeFrame.showTime1,
          };

          if (this.timeFrame.showTime1 != "Current time") {
            let url = this.apiPath + "getdataoverall.php";
            let res = await axios.post(url, JSON.stringify(temp));

            this.chartDataOverall = res.data;
          }
        } else {
          //สำหรับการหาชื่อรูปด้านแรก
          let temp = {
            projectID: this.projectInfo.id,
            sensorName: this.sensor.name,
          };
          console.log(temp);
          let url = this.apiPath + "getimagesensor.php";
          let res = await axios.post(url, JSON.stringify(temp));
          this.imgPic = this.apiPath + "sensor/" + res.data + ".jpg";

          let temp2 = {
            projectID: this.projectInfo.id,
            sensorName: this.sensor.name,
            showTime1: this.timeFrame.showTime1,
            showTime2: this.timeFrame.showTime2,
          };
          //สำหรับกราฟแสดงภาพรวม
          let url2 = this.apiPath + "getoverallsensor.php";
          let res2 = await axios.post(url2, JSON.stringify(temp2));
          this.chartDataOverall = res2.data;

          //สำหรับกราฟหลักแสดงค่า
          let temp3 = {
            projectID: this.projectInfo.id,
            sensorName: this.sensor.name,
            showTime1: this.timeFrame.showTime1,
            showTime2: this.timeFrame.showTime2,
            displayShow: this.displayShow,
          };
          let url3 = this.apiPath + "getmainchart.php";
          let res3 = await axios.post(url3, JSON.stringify(temp3));
          this.chartDetail = res3.data;
        }
      } else {
        if (item.id != undefined) {
          let currrentTime = new Date();
          let yesterday = new Date(Date.now() - 86400000);
          let showTime2Online =
            currrentTime.getDate() +
            "/" +
            (currrentTime.getMonth() + 1) +
            "/" +
            currrentTime.getFullYear() +
            " " +
            this.addZeroNumber(currrentTime.getHours()) +
            ":" +
            this.addZeroNumber(currrentTime.getMinutes());
          let showTime1Online =
            yesterday.getDate() +
            "/" +
            (yesterday.getMonth() + 1) +
            "/" +
            yesterday.getFullYear() +
            " " +
            this.addZeroNumber(yesterday.getHours()) +
            ":" +
            this.addZeroNumber(yesterday.getMinutes());

          if (item.id == 0) {
            let temp = {
              projectID: this.projectInfo.id,
              showTime1: showTime2Online,
              showTime2: showTime1Online,
            };

            let url = this.apiPath + "getdataoverall.php";
            let res = await axios.post(url, JSON.stringify(temp));

            this.chartDataOverall = res.data;
          } else {
            //สำหรับการหาชื่อรูปด้านแรก
            let temp = {
              projectID: this.projectInfo.id,
              sensorName: this.sensor.name,
            };
            let url = this.apiPath + "getimagesensor.php";
            let res = await axios.post(url, JSON.stringify(temp));
            this.imgPic = this.apiPath + "sensor/" + res.data + ".jpg";

            let temp2 = {
              projectID: this.projectInfo.id,
              sensorName: this.sensor.name,
              showTime1: showTime1Online,
              showTime2: showTime2Online,
            };

            //สำหรับกราฟแสดงภาพรวม
            let url2 = this.apiPath + "getoverallsensor.php";
            let res2 = await axios.post(url2, JSON.stringify(temp2));
            this.chartDataOverall = res2.data;

            let temp3 = {
              projectID: this.projectInfo.id,
              sensorName: this.sensor.name,
              showTime1: showTime1Online,
              showTime2: showTime2Online,
              displayShow: this.displayShow,
            };
            let url3 = this.apiPath + "getmainchart.php";
            let res3 = await axios.post(url3, JSON.stringify(temp3));
            this.chartDetail = res3.data;
          }
        }
      }
    },

    setTime(data) {
      this.timeFrame = data;

      let item = this.sensor;
      this.selectedSensor(item);
    },
    changeviewMode() {
      let item = this.sensor;
      this.selectedSensor(item);
    },
    checkLocalStorage() {
      this.projectInfo = this.$q.localStorage.getItem("projectInfo");
      if (this.projectInfo == null) {
        this.$router.push("/app");
        return;
      }
    },
  },
  mounted() {
    this.checkLocalStorage();
    this.runOnline();
  },
  beforeDestroy() {
    clearInterval(this.onlineClock);
    this.onlineClock = null;
  },
};
</script>

<style lang="scss" scoped>
.whiteDiv {
  background-color: white;
  max-width: 90%;
  margin: auto;
}
//PC
.mainPage {
  width: 100%;
  max-width: 1400px;
  height: 100vh;
  margin: auto;
  background-color: #e9edef;
}
.rightPanelPC {
  height: 100vh;
  overflow-y: auto;
}
//Tablet
.fixBt {
  position: absolute;
  bottom: 0px;
  width: 100%;
}
.contentTablet {
  height: calc(100vh - 80px);
  overflow-y: auto;
}
.onlineBtn {
  margin-top: 20px;
  margin-right: 10px;
  padding-top: 10px;
  text-align: center;
  width: 120px;
  background-color: #287377;
  height: 45px;
  color: white;
  cursor: pointer;
}
.offlineBtn {
  margin-top: 20px;
  margin-right: 10px;
  padding-top: 10px;
  text-align: center;
  width: 120px;
  background-color: #ee4873;
  height: 45px;
  color: white;
  cursor: pointer;
}

.imgShow {
  width: 90%;
  margin: auto;
}
</style>

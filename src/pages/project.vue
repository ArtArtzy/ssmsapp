<template>
  <div>
    <!-- PC -->
    <div class="gt-md mainPage shadow-3">
      <div class="row">
        <div><left-menu menuItem="1" /></div>
        <div class="col rightPanelPC">
          <div class="row justify-between">
            <div>
              <div class="title q-px-md q-pt-md">
                <b>{{ projectInfo.name }}</b>
              </div>

              <div class="q-px-md">{{ projectInfo.address }}</div>
            </div>
          </div>

          <div class="q-px-md"><list-sensor :data="projectInfo" /></div>
          <!-- picture gallary -->
          <div class="row q-pa-md">
            <div class="col-6" v-for="(item, index) in pictureList">
              <div class="pictureBox">
                <div class="row justify-between">
                  <div class="q-px-md">{{ item.label }}</div>
                  <div class="q-px-md">
                    <a :href="getImage(item.id)" download target="_blank"
                      ><q-icon name="fa-solid fa-download" class="iconPC"
                    /></a>
                  </div>
                </div>
                <div>
                  <img :src="getImage(item.id)" alt="" style="width: 100%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Tablet -->
    <div class="lt-lg gt-xs mainPage">
      <div class="contentTablet">
        <div class="title q-px-md q-pt-md">
          <b>{{ projectInfo.name }}</b>
        </div>
        <div class="q-px-md">{{ projectInfo.address }}</div>
        <div class="q-px-md"><list-sensor :data="projectInfo" /></div>
        <!-- picture gallary -->
        <div class="row q-pa-md">
          <div class="col-12" v-for="(item, index) in pictureList">
            <div class="pictureBox" style="margin: auto">
              <div class="row justify-between">
                <div class="q-px-md">{{ item.label }}</div>
                <div class="q-px-md">
                  <a :href="getImage(item.id)" download target="_blank"
                    ><q-icon name="fa-solid fa-download" class="iconPC"
                  /></a>
                </div>
              </div>
              <div>
                <img :src="getImage(item.id)" alt="" style="width: 100%" />
              </div>
            </div>
          </div>
        </div>
        <div style="height: 100px"></div>
      </div>

      <div class="fixBt"><bt-menu menuItem="1" /></div>
    </div>
    <!-- Moblile -->
    <div class="lt-sm mainPage">
      <div class="contentTablet">
        <div class="title q-px-md q-pt-md">
          <b>{{ projectInfo.name }}</b>
        </div>
        <div class="q-px-md">{{ projectInfo.address }}</div>
        <div class="q-px-md"><list-sensor :data="projectInfo" /></div>
        <!-- picture gallary -->
        <div class="row q-pa-md">
          <div class="col-12" v-for="(item, index) in pictureList">
            <div class="pictureBox" style="margin: auto">
              <div class="row justify-between">
                <div class="q-px-md">{{ item.label }}</div>
                <div class="q-px-md">
                  <a :href="getImage(item.id)" download target="_blank"
                    ><q-icon name="fa-solid fa-download" class="iconPC"
                  /></a>
                </div>
              </div>
              <div>
                <img :src="getImage(item.id)" alt="" style="width: 100%" />
              </div>
            </div>
          </div>
        </div>
        <div style="height: 100px"></div>
        <div class="fixBt"><bt-menu menuItem="1" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import leftMenu from "../components/leftmenu.vue";
import listSensor from "../components/listsensor.vue";
import btMenu from "../components/btmenu.vue";
export default {
  components: { leftMenu, listSensor, btMenu },
  data() {
    return {
      projectInfo: [],
      pictureList: [],
    };
  },
  methods: {
    getImage(id) {
      return this.apiPath + "image/" + id + ".jpg";
    },
    async loadPicture() {
      let temp = {
        projectID: this.projectInfo.id,
      };
      let url = this.apiPath + "loadPicture.php";
      let res = await axios.post(url, JSON.stringify(temp));
      this.pictureList = res.data;
    },
    checkLocalStorage() {
      this.projectInfo = this.$q.localStorage.getItem("projectInfo");
      if (this.projectInfo == null) {
        this.$router.push("/app");
        return;
      }
      this.loadPicture();
    },
  },
  mounted() {
    this.checkLocalStorage();
  },
};
</script>

<style lang="scss" scoped>
// PC
.mainPage {
  width: 100%;
  max-width: 1400px;
  height: 100vh;
  margin: auto;
  background-color: #e9edef;
}
.pictureBox {
  background-color: white;
  width: 90%;
  margin-bottom: 15px;
}
.rightPanelPC {
  height: 100vh;
  overflow-y: auto;
}
.iconPC {
  color: #2865f0;
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
</style>

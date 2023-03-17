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
            <div>
              <set-time :projectInfo="projectInfo" @setTime="setTime" />
            </div>
          </div>

          <div class="q-px-md"><list-sensor :data="projectInfo" /></div>
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
        <div class="q-px-md"><list-sensor :data="projectInfo" /></div>
      </div>
      <div class="fixBt"><bt-menu menuItem="2" /></div>
    </div>
  </div>
</template>

<script>
import setTime from "../components/settime.vue";
import leftMenu from "../components/leftmenu.vue";
import listSensor from "../components/listsensoroverall";
import btMenu from "../components/btmenu.vue";
export default {
  components: { leftMenu, listSensor, btMenu, setTime },
  data() {
    return {
      projectInfo: [],
    };
  },
  methods: {
    setTime(data) {
      console.log(data);
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
  },
};
</script>

<style lang="scss" scoped>
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
</style>

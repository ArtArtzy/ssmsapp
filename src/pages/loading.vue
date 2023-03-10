<template>
  <div class="mainDiv">
    <!-- mobile -->
    <div class="lt-sm mobileBg">
      <div class="logoMobile">
        <img src="../../public/logo.svg" alt="" style="width: 100%" />
        <div class="projectNamePC">Project: {{ projectNameShow }}</div>
      </div>
      <div class="artisMobile"><b>ARTIS</b><br />software house</div>
    </div>
    <!-- Tablet -->
    <div class="lt-lg gt-xs tabletBg">
      <div class="logoTablet">
        <img src="../../public/logo.svg" alt="" />
        <div class="projectTablet">Project: {{ projectNameShow }}</div>
      </div>
      <div class="artisTablet"><b>ARTIS</b> software house</div>
    </div>
    <!-- PC -->
    <div class="gt-md mainPage shadow-3">
      <div class="row">
        <div class="col-8 backdrop">
          <div class="logo">
            <img src="../../public/logo.svg" alt="" style="height: 300px" />
            <div class="projectNamePC">Project: {{ projectNameShow }}</div>
          </div>

          <div class="artispc"><b>ARTIS</b> software house</div>
        </div>
        <div class="col">
          <div class="q-pa-xl textWhiteDiv">
            <div class="desWhite">
              "Keep your structures safe and sound with our "smart sensor
              monitoring system". Our state-of-the-art sensors provide real-time
              data on your structure's health, allowing you to detect issues
              early and prevent potential problems."
            </div>
            <!-- <div class="q-pt-md textCenter">
              <q-btn label="Get started" class="lunchAppBtn" no-caps="" />
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="fullscreen backdropMain gt-md" v-show="showErrorDia"></div>
    <q-dialog v-model="showErrorDia" persistent>
      <q-card class="dialogErrorPC">
        <div class="errorTextPC">
          <div class="oopPC">Ooooooooooooooops!</div>
          <div>Something went wrong</div>
          <div>Please contact SSMS staff</div>
          <div class="q-pt-xl">
            <img src="../../public/disconnect.png" alt="" style="width: 100%" />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      showErrorDia: false,
      projectNameShow: "",
    };
  },
  methods: {
    async checkProject() {
      let projectName = this.$route.params.project;
      if (projectName == undefined) {
        this.showErrorDia = true;
        return;
      }
      let temp = {
        projectURL: projectName,
      };
      let url = this.apiPath + "loadprojectinfo.php";
      let res = await axios.post(url, JSON.stringify(temp));
      if (res.data.length == 0) {
        this.showErrorDia = true;
        return;
      }
      console.log(res.data);
      this.projectNameShow = res.data[0].name;
      this.$q.localStorage.set("projectInfo", res.data[0]);

      setTimeout(() => {
        this.$router.push("/project");
      }, 3500);
    },
  },
  mounted() {
    this.checkProject();
  },
};
</script>

<style lang="scss" scoped>
.brx {
  border: red 1px solid;
}
.backdropMain {
  background-color: rgba($color: #000000, $alpha: 0.8);
}
.mainDiv {
  background-color: #121212;
  width: 100%;
  height: 100vh;
}
.textCenter {
  text-align: center;
}
//For PC
.artispc {
  color: white;
  position: absolute;
  bottom: 10px;
  text-align: center;
  max-width: 933.333px;
  width: 66.6667%;
  font-size: 24px;
}
.mainPage {
  background-image: url("../../public/bgloginpc.jpg");
  width: 100%;
  max-width: 1400px;
  height: 100vh;
  margin: auto;
  background-size: cover;
}
.logo {
  text-align: center;
  position: relative;
  top: calc(50vh - 150px);
  z-index: 20;
}
.backdrop {
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
  width: 66.6666667%;
  height: 100vh;
}
.desWhite {
  font-size: 26px;
  color: white;
}
.lunchAppBtn {
  background-color: #4c88ef;
  color: white;
  height: 50px;
  width: 260px;
  font-size: 20px;
}
.textWhiteDiv {
  position: relative;
  top: calc((100vh - 450px) / 2);
}
.dialogErrorPC {
  max-width: 1400px;
  width: 100%;
  height: 80vh;
}

@media only screen and (max-width: 600px) {
  .oopPC {
    color: #de611a;
    font-size: 24px;
    text-align: center;
  }
  .errorTextPC {
    position: relative;
    top: 30vh;
    font-size: 18px;
    text-align: center;
  }
}
@media only screen and (min-width: 601px) {
  .oopPC {
    color: #de611a;
    font-size: 48px;
    text-align: center;
  }
  .errorTextPC {
    position: relative;
    top: 30vh;
    font-size: 24px;
    text-align: center;
  }
}
.projectNamePC {
  color: white;
  font-size: 20px;
  padding-top: 10px;
}

//For tablet
.tabletBg {
  background-image: url("../../public/bglogintablet.jpg");
  width: 100%;
  height: 100vh;
  background-size: cover;
}
.logoTablet {
  text-align: center;
  padding-top: 50px;
}
.artisTablet {
  width: 100%;
  color: white;
  text-align: center;
  position: absolute;
  bottom: 10px;
  font-size: 24px;
  font-weight: 300px;
}
.projectTablet {
  color: white;
  font-size: 20px;
  padding-top: 10px;
}
//Mobile
.mobileBg {
  background-image: url("../../public/bgloginmobile.jpg");
  width: 100%;
  height: 100vh;
  background-size: cover;
}
.logoMobile {
  width: 60%;
  margin: auto;
  padding-top: 50px;
}
.artisMobile {
  position: absolute;
  bottom: 15px;
  color: white;
  width: 100%;
  text-align: center;
  font-size: 18px;
}
</style>

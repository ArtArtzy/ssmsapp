<template>
  <div>
    <!-- PC -->
    <div class="gt-md mainPage shadow-3">
      <div class="row">
        <div><left-menu menuItem="1" /></div>
        <div class="col">
          <div class="title q-px-md q-pt-md">
            <b>{{ projectInfo.name }}</b>
          </div>
          <div class="q-px-md">{{ projectInfo.address }}</div>
        </div>
      </div>
    </div>
    <!-- Tablet -->
    <div class="lt-lg gt-xs">Project for Talbet</div>
    <!-- Moblile -->
    <div class="lt-sm"></div>
  </div>
</template>

<script>
import leftMenu from "../components/leftmenu.vue";
export default {
  components: { leftMenu },
  data() {
    return {
      projectInfo: [],
    };
  },
  methods: {
    checkLocalStorage() {
      this.projectInfo = this.$q.localStorage.getItem("projectInfo");
      console.log(this.projectInfo);
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
</style>

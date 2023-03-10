<template>
  <div>
    <!-- PC -->
    <div class="gt-md mainPage shadow-3">
      <div class="row">
        <div><left-menu menuItem="3" /></div>
        <div>Report</div>
      </div>
    </div>
    <!-- Tablet -->
    <div class="lt-lg gt-xs">Project for Talbet</div>
    <!-- Moblile -->
    <div class="lt-sm">Report for mobile</div>
  </div>
</template>

<script>
import leftMenu from "../components/leftmenu.vue";
export default {
  components: { leftMenu },
};
</script>

<style lang="scss" scoped>
//PC
.mainPage {
  width: 100%;
  max-width: 1400px;
  height: 100vh;
  margin: auto;
  background-size: cover;
}
</style>

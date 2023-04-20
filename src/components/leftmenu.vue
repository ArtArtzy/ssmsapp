<template>
  <div>
    <div class="menuMain">
      <!-- Project -->
      <div
        class="subMenu cursor-pointer"
        :class="{ selectedMenu: menuItem == 1 }"
        @click="goToProject()"
      >
        <div><q-icon name="fa-solid fa-diagram-project" class="icon" /></div>
        <div class="label">Project</div>
      </div>
      <!-- Monitor -->
      <div
        class="subMenu cursor-pointer"
        :class="{ selectedMenu: menuItem == 2 }"
        @click="goToMonitor()"
      >
        <div><q-icon name="fa-solid fa-chart-column" class="icon" /></div>
        <div class="label">Monitor</div>
      </div>
      <!-- Report -->
      <!-- <div
        class="subMenu cursor-pointer"
        :class="{ selectedMenu: menuItem == 3 }"
        @click="goToReport()"
      >
        <div><q-icon name="fa-regular fa-file-lines" class="icon" /></div>
        <div class="label">Report</div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["menuItem"],
  methods: {
    goToProject() {
      if (this.menuItem != 1) {
        this.$router.push("/project");
      }
    },
    goToMonitor() {
      if (this.menuItem != 2) {
        this.$router.push("/monitor");
      }
    },
    goToReport() {
      if (this.menuItem != 3) {
        this.$router.push("/report");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menuMain {
  width: 125px;
  background-color: #457bef;
  height: 100vh;
}
.subMenu {
  width: 100%;
  height: 125px;
  border-bottom: 1px solid #7da5f9;
}
.icon {
  font-size: 36px;
  color: white;
  padding-top: 30px;
  padding-left: 45px;
}
.label {
  color: white;
  font-size: 20px;
  text-align: center;
  padding-top: 5px;
}
.selectedMenu {
  background-color: #234289;
}
</style>

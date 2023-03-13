<template>
  <div>
    <div class="btMain row">
      <!-- project -->
      <div
        class="subMenu cursor-pointer col-4"
        :class="{ selectedMenu: menuItem == 1 }"
        @click="goToProject()"
      >
        <div><q-icon name="fa-solid fa-diagram-project" class="icon" /></div>
        <div class="label">Project</div>
      </div>
      <!-- Monitor -->
      <div
        class="subMenu cursor-pointer col-4"
        :class="{ selectedMenu: menuItem == 2 }"
        @click="goToMonitor()"
      >
        <div><q-icon name="fa-solid fa-chart-column" class="icon" /></div>
        <div class="label">Monitor</div>
      </div>
      <!-- Report -->
      <div
        class="subMenu cursor-pointer col-4"
        :class="{ selectedMenu: menuItem == 3 }"
        @click="goToReport()"
      >
        <div><q-icon name="fa-regular fa-file-lines" class="icon" /></div>
        <div class="label">Report</div>
      </div>
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
.btMain {
  width: 100%;
  height: 60px;
  background-color: #457bef;
}
.subMenu {
  border-right: 1px solid #7da5f9;
  text-align: center;
}
.selectedMenu {
  background-color: #234289;
}
.icon {
  font-size: 24px;
  color: white;
  padding-top: 10px;
}
.label {
  color: white;
  font-size: 14px;
}
@media screen and (min-width: 600px) {
  .btMain {
    width: 100%;
    height: 80px;
    background-color: #457bef;
  }
  .icon {
    font-size: 30px;
    color: white;
    padding-top: 15px;
  }
  .label {
    color: white;
    font-size: 18px;
  }
}
</style>

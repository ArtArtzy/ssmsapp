<template>
  <div>
    <div v-for="(item, index) in projectData">
      {{ item.id }}| {{ item.name }} - {{ item.address }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      projectData: [],
    };
  },
  methods: {
    async loadProject() {
      let urlAPI = this.apiPath + "loadproject.php";
      let res = await axios.get(urlAPI);
      this.projectData = res.data;
    },
    async loadSensorOverall() {
      let tempSend = {
        projectID: 14,
      };
      let urlAPI = this.apiPath + "loadsensoroverall.php";
      let res = await axios.post(urlAPI, JSON.stringify(tempSend));
      console.log(res.data);
    },
  },
  mounted() {
    // this.loadProject();
    this.loadSensorOverall();
  },
};
</script>

<style lang="scss" scoped></style>

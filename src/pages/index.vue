<template>
  <div></div>
</template>

<script>
export default {
  methods: {
    loadLoadingPage() {
      this.$router.push("/app");
    },
  },
  mounted() {
    this.loadLoadingPage();
  },
};
</script>

<style lang="scss" scoped></style>

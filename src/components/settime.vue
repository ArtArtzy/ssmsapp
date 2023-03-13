<template>
  <div>
    <q-dialog v-model="showDia" persistent>
      <q-card class="cardSize">xxx </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["showDia"],
  data() {
    return {
      showDialog: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.cardSize {
  height: 390px;
  width: 100%;
  max-width: 320px;
}
</style>

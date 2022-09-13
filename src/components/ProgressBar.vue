<script setup>

const props = defineProps(['tuts'])
</script>

<template>
  <div class="progress-bars">
    <div
      v-for="(bars, index) in props.tuts.videos"
      :key="index"
      class="progress-bar"
    >
      <div
        class="progress-bar-inner"
        :style="{ width: bars.marker + '%' }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.progress-bars {
  display: flex;
  flex-flow: row nowrap;
  gap: 15px;
  width: 100%;
  justify-content: space-around;
  padding: 0 10px;
  position: absolute;
  z-index: 99999;
  background-color: var(--color-green-darkest);
}

.progress-bar {
  width: 100%;
  height: 4px;
  background-color: #809e8f;
  border-radius: 10px;
}

.progress-bar-inner {
  height: 100%;
  background-color: var(--vt-c-white);
  width: 0;
  transition: width 0.5s;
  border-radius: 10px;
}
</style>

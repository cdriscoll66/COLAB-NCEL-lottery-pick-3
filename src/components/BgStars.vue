<script setup>
import YellowStars from '../assets/background-stars.svg'
import GreenStars from '../assets/background-stars--green.svg'
const props = defineProps(['green', 'gray'], {
  default: {
    green: false,
    gray: false,
  },
})
</script>

<template>
  <div
    class="bg-stars__cover"
    :class="{ green: props.green, gray: props.gray }"
  >
    <div class="bg-stars__inner">
      <div class="bg-stars__stars"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slide-down-stars {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(161.67px);
  }
}
.bg-stars__cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffd206;
  z-index: -1;
}
.bg-stars__inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bg-stars__inner:after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  background: linear-gradient(180deg, rgba(255, 210, 6, 0.6) 0%, rgba(201, 165, 5, 0.6) 36.27%, rgba(165, 136, 5, 0.6) 60.01%);
  opacity: 0.6;
  mix-blend-mode: color-burn;
}

.green > .bg-stars__inner::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  background: linear-gradient(180deg, rgba(0, 61, 31, 1) 15%, rgba(0, 61, 31, 0.5) 25%, rgba(0, 61, 31, 0) 35%);
}

.gray > .bg-stars__inner::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  background: linear-gradient(0, rgba(50, 50, 50, 0) 50%, rgba(50, 50, 50, 0.25) 65%, rbg(50, 50, 50) 90%);
}

.bg-stars__stars {
  position: absolute;
  top: -160.67px;
  width: 100%;
  height: calc(100% + 161.67px);
  background: repeat 50% 0;
  opacity: 0.35;
  mix-blend-mode: soft-light;
  animation: slide-down-stars 7s linear infinite;
  background-image: url(../assets/background-stars.svg);
}

.green .bg-stars__stars {
  background-image: url(../assets/background-stars--green.svg);
}

.green.bg-stars__cover {
  background-color: rgba(0, 122, 61);
  background: linear-gradient(
    180deg,
    rgba(0, 122, 61) 0%,
    rgba(0, 61, 31) 57.87%
  );
}

.gray .bg-stars__stars {
  background-image: url(../assets/background-stars--gray.svg);
}

.gray.bg-stars__cover {
  background-color: #a7a7a7;
  background: linear-gradient(180deg, #a7a7a7 0%, #c7c7c7 57.87%);
}
</style>

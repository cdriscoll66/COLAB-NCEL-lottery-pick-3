<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import Logo from '../assets/pick3plusfireball-logo-green.png'

onMounted(() => {
  let spheretl = gsap.timeline({})
  spheretl.to('#sphere', { duration: 1 })
  spheretl.to('#sphere', { duration: 0.5, scale: 1, ease: 'power1.inOut' })

  let sphereRotateY = gsap.timeline({
    repeat: -1,
    delay: 2,
  })
  sphereRotateY.to('#spheretext', { delay: 0, duration: 0, opacity: 0, y: '-100%' })
  sphereRotateY.to('#spherelogo', {
    delay: -0.5,
    duration: 1.2,
    opacity: 1,
    scale: 1,
    y: 0,
    ease: 'power2.out',
  })
  sphereRotateY.to('#spherelogo', {
    delay: 1.2,
    duration: 1.2,
    opacity: 0,
    scale: 0.85,
    y: '100%',
    ease: 'power2.in',
  })
  sphereRotateY.to('#spherelogo', { delay: 0, duration: 0, y: '-100%' })
  sphereRotateY.to('#spheretext', {
    delay: -0.5,
    duration: 1.2,
    opacity: 1,
    scale: 1,
    y: 0,
    ease: 'power2.out',
  })
  sphereRotateY.to('#spheretext', {
    delay: 1.2,
    duration: 1.0,
    opacity: 0,
    scale: 0.75,
    y: '100%',
    ease: 'power2.in',
  })
  sphereRotateY.to('#spheretext', { delay: 0, duration: 0, opacity: 0, y: '-100%' })
})
</script>

<template>
  <div class="sphere">
    <div id="sphere" class="sphere__inner">
      <div id="spherelogo" class="sphere__logo">
        <img
          width="135"
          height="53"
          id="logo"
          alt="Pick 3 Plus Fireball logo"
          :src="Logo"
        />
      </div>
      <div id="spheretext" class="sphere__text">
        The Fun
        <br />
        Starts Here.
      </div>
    </div>
  </div>
</template>

<style scoped>
.sphere {
  margin: 40px auto;
}
.sphere__inner {
  position: relative;
  width: 182px;
  height: 182px;
  margin: 0 auto;
  border-radius: 50%;
  background: radial-gradient(
    56% 56% at 53.18% 22.76%,
    #ffffff 0%,
    #ececec 59%,
    #d9d9d9 72%,
    #bebebe 87%,
    #cdcdcd 100%
  );
  background-repeat: no-repeat;
  overflow: hidden;
  transform: scale(20);
}

.sphere__logo,
.sphere__text {
  transform: scale(0.85) translateY(-100%) translateZ(1px);
}

.sphere__logo,
.sphere__text {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 24px;
  line-height: 0.923;
  color: var(--color-green);
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

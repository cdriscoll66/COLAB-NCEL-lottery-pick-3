<script setup>
import { onMounted, reactive } from 'vue'
import { gamesStore } from '@/store/GamesStore'
import gsap from 'gsap'
import Fireball from '../assets/fireball.png'
import WinnerFlourish from './WinnerFlourish.vue'
import RewardScreen from './RewardScreen.vue'
import FinalScreen from './FinalScreen.vue'
import {calcWinners} from '../composables/calcWinners'
import {circleAnimation} from '../composables/circleAnimations'

const store = gamesStore()

const state = reactive({
  finalScreens: 0,
})

onMounted(() => {
  calcWinners()

  let tl = gsap.timeline({
    repeat: 0,
  })

  // fade in system
  tl.to('#picks', {duration: .0, opacity: 0, y: 50});
    tl.to('#fireball__row', {duration: .0, opacity: 0,  y: 50});
    tl.to('#winning', {duration: .0, opacity: 0, y: 50});
    tl.to('#fireball', {
    duration: 0.5,
    scale: 1.1,
    yoyo: true,
    repeat: -1,
    ease: 'power1.inOut',
  })
    tl.to ('#picks', {duration: .5, opacity: 1, y: 0, ease: 'power1.inOut'});
    tl.to ('#fireball__row', {duration: .5, opacity: 1, y: 0, delay: 1, ease: 'power1.inOut'});
    tl.to ('#winning', {duration: .5, opacity: 1, y: 0, delay: 1, ease: 'power1.inOut'});

      // circle numbers animation
    tl.call(circleAnimation);

})

</script>

<template>
  <div class="wrapper">
    <div id="picks" class="picks__row">
      <div class="title">
        <h3><span>Your Numbers</span></h3>
      </div>
      <div class="picks">
        <div
          v-for="(num, i) in store.picks"
          v-bind:id="'pick-' + i"
          class="number yours"
        >
          <div>{{ num }}</div>
        </div>
      </div>
    </div>

    <div id="fireball__row" class="fireball__row">
      <div class="title">
        <img width="183" height="21" alt="Fireball" :src="Fireball" />
      </div>
      <div v-if="store.fireballselected" id="fireball" class="number fireball">
        <div><span>{{ store.finalfireball }}</span></div>
      </div>
      <div v-else id="fireball_message" class="number fireball">
        <h3>You did not select <br /> to add Fireball</h3>
      </div>
    </div>

    <div id="winning" class="winning-numbers__row">
      <div class="title">
        <h3>
          Pick 3:
          <span>Winning Numbers</span>
        </h3>
      </div>
      <div class="winning-numbers">
        <div
          v-for="(num, i) in store.finalwinners"
          v-bind:id="'number-' + i"
          class="number"
        >
          <div>
            {{ num }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <WinnerFlourish v-if="state.finalScreens === 1" />
  <RewardScreen v-else-if="state.finalScreens === 2" />
  <FinalScreen v-else-if="state.finalScreens === 3" />
</template>

<style scoped>
#winning,
#fireball__row,
#picks {
  opacity: 0;
}
.wrapper {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
}

h3 span {
  color: var(--color-gold);
}

.winning-numbers,
.picks {
  display: flex;
  justify-content: center;
  gap: 40px;
  align-items: center;
  margin-top: 20px;
}

.fireball__row {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-top: 20px;
  z-index: 1;
}

.fireball__row .title {
  margin-bottom: 20px;
}
.number {
  border-radius: 50%;
  border: 5px solid transparent;
}

.number div {
  background: radial-gradient(
    56% 56% at 53.18% 22.76%,
    #ffffff 0%,
    #ececec 59%,
    #d9d9d9 72%,
    #bebebe 87%,
    #cdcdcd 100%
  );
  color: var(--vt-c-black);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 34px;
  font-weight: 700;
  font-size: 34px;
  font-weight: 700;
}

.fireball div {
  background: radial-gradient(
    56% 56% at 53.18% 22.76%,
    #cd2b2b 0%,
    #d25a5a 59%,
    #b73535 72%,
    #cd2b2b 87%,
    #bf2626 100%
  );
  color: var(--vt-c-white);
}

.fireball div span {
  font-weight: 700;
}

.yours div {
  background: none;
  border: 2px solid #ffd206;
  filter: drop-shadow(0px 0px 9px #cbac20);
  color: var(--vt-c-white);
}
</style>

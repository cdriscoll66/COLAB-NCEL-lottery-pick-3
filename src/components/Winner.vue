<script setup>
import { onMounted, reactive } from 'vue'
import { gamesStore } from '@/store/GamesStore'
import gsap from 'gsap'
import Fireball from '../assets/fireball.png'
import WinnerFlourish from './WinnerFlourish.vue'
import BetterLuck from './BetterLuck.vue'
import RewardScreen from './RewardScreen.vue'
import FinalScreen from './FinalScreen.vue'
import {calcWinners} from '../composables/calcWinners'
import {bloopFirstTwoExact, bloopThreeAny, bloopFirstTwoAny, bloopThreeExact} from '../composables/circleAnimations'

const store = gamesStore()

const state = reactive({
  finalScreens: 0,
})

const failsound = new Audio('../audio/sprite/gamefail.mp3');

onMounted(() => {
  calcWinners()

  let tl = gsap.timeline({
    repeat: 0,
  })

  // fade in system
  tl.to('#picks', {duration: .0, opacity: 0, y: 50});
    // tl.to('#fireball__row', {duration: .0, opacity: 0,  y: 50});
    tl.to('#winning', {duration: .0, opacity: 0, y: 50});
    tl.to ('#picks', {duration: .5, opacity: 1, y: 0, ease: 'power1.inOut'});
    tl.to ('#winning', {duration: .5, opacity: 1, y: 0, delay: 1, ease: 'power1.inOut'});

      // circle numbers Bloops
      if (store.fireballselected == false) {
        if (store.presentgame === 'exact' && store.winpercentage < 75) {
          tl.call(bloopThreeExact);
        } else if (store.presentgame === 'exact' && store.winpercentage >= 75) {
          tl.call(bloopFirstTwoExact);
        } else if (store.presentgame === 'any' && store.winpercentage < 75) {
          tl.call(bloopThreeAny);
        } else if (store.presentgame === 'any' && store.winpercentage >= 75) {
          tl.call(bloopFirstTwoAny);
        }
      } else {
        if (store.presentgame === 'exact' && (store.winpercentage < 25 || (store.winpercentage > 50 && store.winpercentage <= 75))) {
          tl.call(bloopThreeExact);
        } else if (store.presentgame === 'exact' ){
          tl.call(bloopFirstTwoExact);
        } else if (store.presentgame === 'any' && (store.winpercentage < 25 || (store.winpercentage > 50 && store.winpercentage <= 75))) {
          tl.call(bloopThreeAny);
        } else if (store.presentgame === 'any') {
          tl.call(bloopFirstTwoAny);
        }
      }
      
      // first Winner/Loser Flourish
      if ( (store.fireballselected === false && store.winpercentage > 75) || (store.fireballselected === true && (store.winpercentage > 75 || store.winpercentage > 25 && store.winpercentage <= 50)) ) {
        tl.to('#winning', {duration: 3, onComplete: () => {failsound.play() }});
        tl.to('#winning', {duration: 3, onComplete: () => {continueAnimation1()}});
      } else {
        tl.to('#winning', {duration: 3, onComplete: () => {state.finalScreens = 1 }});
        tl.to('#winning', {duration: 3, onComplete: () => {continueAnimation1()}});
      };
});

const continueAnimation1 = () => {
  state.finalScreens = 0;
  if (store.fireballselected) {
      fireballAnimation();
  } else {
      if(store.winpercentage < 75) {
        state.finalScreens = 2;
      } else {
        state.finalScreens = -1;
      }
      setTimeout(() => {
        state.finalScreens = 3;
    }, 4000);
  }
};

const fireballAnimation = () => {
  let tlfire = gsap.timeline({
    repeat: 0,
  })
  // fireball loser
  if (store.winpercentage < 50) {
    fireballLoser();
  } else if (store.gamerules === 'exact') {
    fireballWinnerLast();
  } else {
    fireballWinnerSecond();
  }
}







</script>

<template>




  <div class="wrapper">

    <div v-if="store.fireballselected" id="fireball__row" class="fireball__row">
      <div class="title">
        <img width="183" height="21" alt="Fireball" :src="Fireball" />
      </div>
      <div id="fireball" class="number fireball">
        <div><span>{{ store.finalfireball }}</span></div>
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

  

 

    
  </div>
  <Transition>
  <WinnerFlourish v-if="state.finalScreens === 1" />
  <RewardScreen v-else-if="state.finalScreens === 2" />
  <BetterLuck v-else-if="state.finalScreens === -1" />
  <FinalScreen v-else-if="state.finalScreens === 3" />
  </Transition>

</template>

<style scoped>
#winning,
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

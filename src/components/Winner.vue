<script setup>
import { onMounted, reactive } from 'vue'
import { gamesStore } from '@/store/GamesStore'
import gsap from 'gsap'
import Fireball from '../assets/fireball.png'
import WinnerFlourish from './WinnerFlourish.vue'
import BetterLuck from './BetterLuck.vue'
import RewardScreen from './RewardScreen.vue'
import FireballReward from './FireballReward.vue'
import TotalReward from './TotalReward.vue'
import LoseFireball from './LoseFireball.vue'
import FinalScreen from './FinalScreen.vue'
import {calcWinners} from '../composables/calcWinners'
import {bloopFirstTwoExact, bloopThreeAny, bloopFirstTwoAny, bloopThreeExact} from '../composables/circleAnimations'

const store = gamesStore()

const state = reactive({
  finalScreens: 0,
  showFireball: false,
})

const failsound = new Audio('../audio/sprite/gamefail.mp3');

onMounted(() => {
  calcWinners()

  let tl = gsap.timeline({
    repeat: 0,
  })

  // fade in system
  tl.to('#picks', {duration: .0, opacity: 0, y: 50});
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
        tl.to('#winning', {duration: 3, onComplete: () => {failsound.play(); state.finalScreens = -1}});
        tl.to('#winning',{ duration: 3, onComplete: () => { continueAnimation1() }});
      } else {
        tl.to('#winning', {duration: 3, onComplete: () => {state.finalScreens = 1}});
        tl.to('#winning', {duration: 3, onComplete: () => {state.finalScreens = 2}});
        if  (!store.fireballselected) {
          tl.to('#winning', {duration: 4, onComplete: () => {state.finalScreens = 5}});
        }
      };
});

const continueAnimation1 = () => {
  state.showFireball = true
  state.finalScreens = 0;
  if (store.fireballselected) {
    let tlcontinue = gsap.timeline({
        repeat: 0,
      })
      fireballAnimation();

     if (store.winpercentage > 75) {
      tlcontinue.to("#winning", {duration: 6, onComplete: () => {state.finalScreens = -2}});
      tlcontinue.to("#winning", {duration: 5, onComplete: () => {state.finalScreens = 5}});
     } else if (store.winpercentage > 50) {
      tlcontinue.to("#winning", {duration: 6, onComplete: () => {state.finalScreens = -2}});
      tlcontinue.to("#winning", {duration: 5, onComplete: () => {state.finalScreens = 4}});
      tlcontinue.to("#winning", {duration: 9, onComplete: () => {state.finalScreens = 5}});
     } else {
      tlcontinue.to("#winning", {duration: 6, onComplete: () => {state.finalScreens = 3}});
      tlcontinue.to("#winning", {duration: 5, onComplete: () => {state.finalScreens = 4}});
      tlcontinue.to("#winning", {duration: 9, onComplete: () => {state.finalScreens = 5}});
    }

  } else {
      if(store.winpercentage < 75) {
        state.finalScreens = 2;
      } else {
        state.finalScreens = -1;
      }
      setTimeout(() => {
        state.finalScreens = 5;
    }, 2000);
  }
};

const fireballAnimation = () => {
      let tlfire = gsap.timeline({
        repeat: 0,
      })
      tlfire.to('#fireball__row', {duration: .0, opacity: 1, x: -400});
      tlfire.to('#fireball__row', {duration: 1.5, x: 0, delay: 1, ease: 'elastic.out'});
      tlfire.to('#fireball div span', {duration: .3, opacity: 1, ease: 'power1.out'});
    
      if (store.winpercentage > 50) {
        tlfire.to('#winning', {duration: .1, onComplete: () => { failsound.play() }});
      } else {
        tlfire.to('#fireball div span', {duration: .2, x: 117, y: 125, rotate: 450, ease: 'linear.out'});
        tlfire.to('#fireball div span', {duration: .3, x: 420, y: -25, rotate: -180, ease: 'power1.out'});
        tlfire.to('#number-2 div', {duration: .2, color: "white", background: "radial-gradient(56% 56% at 53.18% 22.76%, #CD2B2B 0%, #D25A5A 59%, #B73535 72%, #CD2B2B 87%, #BF2626 100%)", delay: -.1, ease: 'power1.out', onStart: () => { store.changeWinnerToFireball(2) }});
        tlfire.to('#number-2', {  duration: 1, delay: -.2, borderColor: 'gold', ease: 'power1.inOut', }) 
        if (store.presentgame === "exact") {
            //in the exact games the pick that changes is 3rd in any it's 2nd
            tlfire.to('#pick-2 div', { duration: 1, backgroundColor: 'gold', color: 'black', delay: -1, ease: 'power1.inOut', onStart: () => { bubble() } })
            }
            else {
            tlfire.to('#pick-1 div', { duration: 1, backgroundColor: 'gold', color: 'black', delay: -1, ease: 'power1.inOut', onStart: () => { bubble() } })
          }
      } 
  }



const nextScreen = (num) => {
    state.finalScreens = num;
    continueAnimation1();
  }

  const bubble = () => {
    let bubble = new Audio('../audio/sprite/bubble-pop.mp3')
    bubble.play()
  };


</script>

<template>
  <div class="wrapper">

    <div v-show="store.fireballselected && state.showFireball" id="fireball__row" class="fireball__row">
      <div class="title">
        <img width="183" height="21" alt="Fireball" :src="Fireball" />
      </div>
      <div id="fireball" class="number fireball">
        <div><p>{{ store.finalfireball }}</p><span>{{ store.finalfireball }}</span></div>
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
  <RewardScreen v-else-if="state.finalScreens === 2" @next-screen="nextScreen"/>
  <BetterLuck v-else-if="state.finalScreens === -1" @next-screen="nextScreen" />
  <LoseFireball v-else-if="state.finalScreens === -2" />
  <FireballReward v-else-if="state.finalScreens === 3" />
  <TotalReward v-else-if="state.finalScreens === 4" />
  <FinalScreen v-else-if="state.finalScreens === 5" />
  </Transition>

</template>

<style scoped>
#winning,
#fireball__row,
#fireball span,
#picks {
  opacity: 0;
}
.wrapper {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  overflow: hidden;
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
  background-image: url("../assets/fireball-new.png");
  color: var(--vt-c-white);
  height: 69px;
  width: 125px;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 0;

}

.fireball div span, .fireball div > p {
  position: absolute;
  font-weight: 700;
  font-size: 24px;
  transform: translate(25px, -5px);
  background-color: #e02826;
  border-radius: 50%;
  width: 46px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .fireball div > p {
  position: absolute;
  height: 5px;
  width: 5px;
  color: var(--vt-c-white);

} */



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

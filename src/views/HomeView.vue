<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import BgStars from '../components/BgStars.vue';
import Sphere from '../components/Sphere.vue';
import { useRouter, useRoute } from 'vue-router';
import Greenstar from '../assets/star-green.svg';
import Higreenstar from '../assets/star-higreen.svg';
import Goldstar from '../assets/star-gold.svg';
import { ClickSound } from '../composables/sfx';

const router = useRouter();
const route = useRoute();
const sphere = ref(null);
const emit = defineEmits(['music', 'musicplaypause']);

onMounted(() => {
  let loadInTL = gsap.timeline({delay: 2,})
  loadInTL.to('#tutbtn', {delay: -0.2,duration: 0.4,opacity: 1,scale: 1,'pointer-events': 'all',})
  loadInTL.to('#demobtn', {delay: -0.2,duration: 0.4,opacity: 1,scale: 1,'pointer-events': 'all',})
  loadInTL.to('#tutbtntxt', { delay: -0.1, duration: 0.6, opacity: 1, scale: 1, 'pointer-events': 'all' });
  loadInTL.to('#demobtntxt', { delay: -0.1, duration: 0.6, opacity: 1, scale: 1, 'pointer-events': 'all' });
  loadInTL.to('#sound-warning', {delay: -0.2,duration: 0.6,opacity: 1, y: 0})
  loadInTL.to('#age-warning', { delay: 0, duration: 0.6, opacity: 1, y: 0 })
});


const onLeave = (path) => {
  ClickSound()
  setTimeout (() => {
  if(path == 'tutorial') {
      emit('music', '/audio/3FunkShortVersion.mp3')
  }
  else {
      emit('music', 'audio/FunkyInFunky.mp3')
  }
    }, 500)

  let loadOutTL = gsap.timeline({delay: 0.5})
      loadOutTL.to('#tutbtntxt', { delay: 0, duration: 0.4, opacity: 0, 'pointer-events': 'none' });
      loadOutTL.to('#demobtntxt', { delay: -0.4, duration: 0.4, opacity: 0, 'pointer-events': 'none' });
      loadOutTL.to('#sound-warning', { delay: -0.3, duration: 0.4, opacity: 0 });
      loadOutTL.to('#age-warning', { delay: -0.3, duration: 0.4, opacity: 0 });
      loadOutTL.to('#tutbtn', { delay: -0.3, duration: 0.2, opacity: 0 });
      loadOutTL.to('#demobtn', { delay: -0.2, duration: 0.2, opacity: 0 });
      loadOutTL.to('.sphere', { delay: -0.1, duration: 0.5, scale: 0 });
      loadOutTL.to('.transition-stars', { delay: 0, duration: 0, opacity: 1 });
      loadOutTL.to('.star__green', { delay: 0, duration: 0, opacity: 1 });
      loadOutTL.to('.star__gold', { delay: 0, duration: 0, opacity: 1 });
      loadOutTL.to('.star__higreen', { delay: 0, duration: 0, opacity: 1 });
      loadOutTL.to('.star__green', { delay: 0, duration: 1.1, scale: 45, ease: 'expo.in' });
      loadOutTL.to('.star__gold', { delay: -0.8, duration: 0.75, scale: 45, ease: 'expo.in' });
      loadOutTL.to('.star__higreen', { delay: -0.5, duration: 0.6, scale: 45, ease: 'expo.in' });
      loadOutTL.call(changePage);

  function changePage() {
  router.replace({ name: path })
  }
};

 

</script>

<template>
  <main>
    <Sphere :class="sphere" />
    <a id="tutbtn" href @click.prevent="onLeave('tutorial')" class="accent-button">
      <div id="tutbtntxt">
        <span class="button__title">Learn the Game</span>
        <span class="button__subtitle">Take the Tour</span>
      </div>
    </a>

    <a id="demobtn" href @click.prevent="onLeave('game')" class="accent-button">
      <div id="demobtntxt">
        <span class="button__title">Try Your Luck</span>
        <span class="button__subtitle">Play Demo Game</span>
      </div>
    </a>
    <div class="home-warnings">
      <p id="sound-warning">This experience has sound</p>
      <p id="age-warning">
        MUST BE 18 TO PLAY. Odds to win a Pick 3 prize range from 1 in 100 to 1 in 1,000. Odds to win a Pick 3 Fireball prize range from 1 in 37 to 1 in 10,000.<br /> Problem Gambling Helpline: 877-718-5543
      </p>
    </div>
    <div class="transition-stars">
    <img class="transition-stars__star star__green" width="124.4" height="124.4" :src=Greenstar alt="star">
    <img class="transition-stars__star star__gold" width="124.4" height="124.4" :src=Goldstar alt="star">
    <img class="transition-stars__star star__higreen" width="124.4" height="124.4" :src=Higreenstar alt="star">
    </div>
  </main>
  <BgStars />
</template>

<style scoped>

.home-warnings {
  margin: 20px 30px 0;
  text-align: center;
}

#sound-warning {
  font-size: 11px;
  font-weight: 900;
  margin-bottom: 10px;
  opacity: 0;
  transform: translateY(20px);
}

#age-warning {
  font-size: 11px;
  line-height: 1.5;
  opacity: 0;
  transform: translateY(20px);
  font-family: 'Avenir Next', sans-serif;
}

#tutbtn,
#demobtn,
#tutbtntxt,
#demobtntxt {
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
}

.transition-stars {
  position: absolute;
  pointer-events: none;
  top: 126px;
  left: calc(50% - 62px);
}

.transition-stars__star {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: scale(0);
}

.star__green, .star__gray, .star__gold, .star__higreen {
  opacity: 0;
}
</style>

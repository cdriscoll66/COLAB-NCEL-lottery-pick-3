<script setup>
import gsap from 'gsap';
import { onMounted } from 'vue';
import Logo from '../assets/pick3plusfireball-logo.png'
import { gamesStore } from '@/store/GamesStore'
import { Jackpot } from '../composables/sfx';


const store = gamesStore();

const emit = defineEmits(['next-screen']);


onMounted(() => {

    let tl = gsap.timeline({
        repeat: 0,
        delay: 0
    });

    // fade in system
    tl.to('#hfl1', {duration: .0, opacity: 0, y: 50});
    tl.to('#hfl2', {duration: .0, opacity: 0, y: 50});
    tl.to('#hfl3', {duration: .0, opacity: 0, y: 50});
    tl.to('#logo', {duration: .0, opacity: 0, y: 50});
    tl.to('#next-btn', {duration: .0, opacity: 0, y: 50});
    tl.to('#hfl2', {duration: .3, scale: 1.1, yoyo: true, repeat: -1, ease: 'power1.inOut', onComplete: () => {
        if (!store.ismuted) { Jackpot();}
    }});
    tl.to ('#hfl1', {duration: .3, opacity: 1, y: 0, ease: 'power1.inOut'});
    tl.to ('#hfl2', {duration: .3, opacity: 1, y: 0, ease: 'power1.inOut'});
    tl.to ('#hfl3', {duration: .3, opacity: 1, y: 0, ease: 'power1.inOut'});
    tl.to ('#logo', {duration: .3, opacity: 1, y: 0, ease: 'power1.inOut'});
    tl.to ('#next-btn', {duration: .3, opacity: 1, y: 0, ease: 'power1.inOut'});

 });

 const nextScreen = (num) => {
    emit('next-screen', num);
 }

</script>

<template>
<div class="reward-wrapper">
<div><h2 id="hfl1">You won</h2></div>
<div class="reward__amt"><h2 id="hfl2">${{ store.prizemoney }}</h2></div>
<div><h2 id="hfl3">playing</h2></div>
<div><img
          width="256"
          height="102"
          id="logo"
          alt="Pick 3 Plus Fireball logo"
          :src="Logo"
        /></div>

    <a id="next-btn" v-if="(store.fireballselected)" href @click.prevent="nextScreen(-1)" class="accent-button one-line">
      <div>
        <span class="button__title">View Fireball Drawing</span>
      </div>
    </a>
</div>
</template>

<style scoped>

#hfl1, #hfl2, #hfl3, #logo, #next-btn {
    opacity: 0;
    /* transform: translateY(50px); */
}
.reward-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    background-color: rgba(0, 61, 31, .9);
    color: var(--vt-c-white);
    align-items: center;
    z-index: 100;
}


.reward__amt h2 {
    font-weight: 700;
    font-size: 124.8px;
    letter-spacing: -1.7127px;
    text-transform: uppercase;
    text-shadow: -1px 1px 4px rgba(0, 61, 31, 0.75);
    color: var(--color-gold);

}
</style>



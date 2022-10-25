<script setup>
import gsap from 'gsap';
import { gamesStore } from '@/store/GamesStore';
import { onMounted } from 'vue';
import Logo from '../assets/pick3plusfireball-logo.png';

const store = gamesStore()

const emit = defineEmits(['next-screen']);

onMounted(() => {
    let tl = gsap.timeline({
        repeat: 0,
        delay: 0
    });

    // fade in system
    tl.to('#blhl1', {duration: .0, opacity: 0, y: 50});
    tl.to('#logo', {duration: .0, opacity: 0, y: 50});
    tl.to('#blhl2', {duration: .0, opacity: 0, y: 50});

    tl.to ('#blhl1', {duration: .3, opacity: 1, y: 0, ease: 'power1.inOut'});
    tl.to ('#logo', {duration: .3, opacity: 1, y: 0, ease: 'power1.inOut'});
    tl.to ('#blhl2', {duration: .3, opacity: 1, y: 0, ease: 'power1.inOut'});
 });

 const nextScreen = (num) => {
    emit('next-screen', num);
 }

</script>

<template>
<div class="reward-wrapper">
<div><h2 id="blhl1">You didn't win</h2></div>
<div><img
          width="256"
          height="102"
          id="logo"
          alt="Pick 3 Plus Fireball logo"
          :src="Logo"
        /></div>
<div>
    <a v-if="(store.fireballselected)" href @click.prevent="nextScreen(-1)" id="blhl2" class="accent-button one-line">
      <div>
        <span class="button__title">Play Fireball Drawing</span>
      </div>
    </a>
    <h2 v-else class="betterluck" id="blhl2">Better Luck Next Time!</h2></div>


</div>
</template>

<style scoped>

#blhl1, #blhl2, #logo {
    opacity: 0;
    /* transform: translateY(50px); */
}

.betterluck {
    font-size: 40px;
    text-transform: uppercase;
    letter-spacing: -.82px;
    font-weight: 700;
    margin: 10px;  
    text-align: center;
    color: var(--color-gold);
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



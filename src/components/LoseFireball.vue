<script setup>
import gsap from 'gsap';
import { gamesStore } from '@/store/GamesStore';
import { onMounted } from 'vue';
import Fireball from '../assets/fireball.png'

const store = gamesStore();

onMounted(() => {
    let tl = gsap.timeline({
        repeat: 0,
        delay: 0
    });

    // fade in system
    tl.to('#headline1', {duration: .0, opacity: 0, y: 50});
    tl.to('#logo', {duration: .0, opacity: 0, y: 50});
    tl.to('#headline2', {duration: .0, opacity: 0, y: 50});

    tl.to ('#headline1', {duration: .3, opacity: 1, y: 0, ease: 'power1.inOut'});
    tl.to ('#logo', {duration: .3, opacity: 1, y: 0, ease: 'power1.inOut'});
    tl.to ('#headline2', {duration: .3, opacity: 1, y: 0, ease: 'power1.inOut'});
 });

 const nextScreen = (num) => {
    emit('next-screen', num);
 }

</script>

<template>
<div class="reward-wrapper">
<div><h2 id="headline1">You didn't win</h2></div>
<div><img id="logo" width="183" height="21" alt="Fireball" :src="Fireball" /></div>
<div>
    <h2 class="betterluck" id="headline2">Better Luck Next Time!</h2></div>


</div>
</template>

<style scoped>

#headline1, #headline2, #logo {
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



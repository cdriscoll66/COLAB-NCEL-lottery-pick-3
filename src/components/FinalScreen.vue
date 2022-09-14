<script setup>

import { gamesStore } from '@/store/GamesStore'
import { RouterLink } from 'vue-router'
import { ClickSound } from '../composables/sfx';

const store = gamesStore()

const resetGame = () => {
  ClickSound()
  store.resetPicksAndFireball()
  store.setPresentGame(null)
}

</script>

<template>
<div class="wrapper">
    <div class="btns">
      <h2>What's your <br />next move?</h2>
    <a href @click.prevent="resetGame" class="accent-button one-line">
      <div>
        <span class="button__title">Play Again</span>
      </div>
    </a>
                <RouterLink to="/tutorial" class="accent-button one-line">
      <div>
        <span class="button__title">Learn the Game</span>
      </div>
                </RouterLink>
        <a href="https://www.yahoo.com" target="_blank" class="accent-button one-line">
      <div>
        <span class="button__title">Buy Online</span>
      </div>
    </a>
    </div>
<p>Game Demos are for educational purposes only and do not represent actual odds of winning. Wininng in this experience does not convey any prizes or cash value. There may be some variations between the demo game and the actual game. The North Carolina Lottery Pick 3 game play is subject to NCEL game rules</p>


</div>
</template>

<style scoped>
.wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    background-color: var(--color-gold);
    color: var(--vt-c-black);
    align-items: center;
    z-index: 100;
}
h1 {
    font-weight: bold;
}

p {
  font-family: 'Avenir Next', sans-serif;
  font-size: 12px;
  line-height: 1.5;
  margin: 5px 10px;
}
</style>
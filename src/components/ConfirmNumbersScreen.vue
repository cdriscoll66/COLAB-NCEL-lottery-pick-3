<script setup>
import { gamesStore } from '@/store/GamesStore'
import Fireball from '../assets/fireball.png'

const store = gamesStore()
const emit = defineEmits(['play-reward-screen']);


</script>

<template>
  <h2 class="review">
      Review
      <span>your selections:</span>
    </h2>
  <h2 v-if="(store.presentgame === 'exact')" class="game-type">Exact</h2>
  <h2 v-else-if="(store.presentgame === 'any')" class="game-type">Any</h2>
  <h2 v-else-if="(store.presentgame === 'fifty')" class="game-type">50/50</h2>
  <h2 v-else class="game-type">Pick 3</h2>
  <div class="picks">
    <div class="pick" v-for="(pick, i) in store.picks">
      <div v-for="(n, index) in 10" :key="index">
        <div v-if="pick === index" class="picked num">{{ index }}</div>
        <div v-else class="disabled num">{{ index }}</div>
      </div>
    </div>
  </div>
  <div v-if="(store.fireballselected)" class="fireball-mark">
    <img width="183" height="21" alt="Fireball" :src="Fireball" />
  </div>
  <div class="bottom">
  
    <a href @click.prevent="emit('play-reward-screen')" class="accent-button one-line">
      <div>
        <span class="button__title">Let's Play</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.bottom {
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  margin-bottom: 30px;
}

.review {
  margin: 50px 10px 10px;
}
.fireball-mark {
  display: flex;
  align-items: center;
  margin: 0 10px;
}

h2.game-type {
  margin: 10px 10px 0;
  text-align: left;
  display: flex;
  align-items: center;
}

h2.game-type::before, .fireball-mark::before {
  content: '';
  width: 30px;
  height: 40px;
  background-color: #CF271C;
  border-radius: 3.94px;
  margin-right: 10px;
}

.picks {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
}
.picks .pick {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 6px;
}

.num {
  width: 30px;
  height: 40px;
  border-radius: 3.94px;
  border: 1px solid #CF271C;
  background: linear-gradient(#C7D5CE, #ffffff);
  color: #CF271C;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 700;
  display:flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: unset;
  opacity: .5;
}

.picked {
  opacity: 1;
  color: var(--vt-c-white);
  background: #CF271C;
}
</style>
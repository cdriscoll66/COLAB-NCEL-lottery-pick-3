<script setup>
import { gamesStore } from '@/store/GamesStore'
import Fireball from '../assets/fireball.png'
import X from '../assets/x-protip.svg'


const store = gamesStore()

const emit = defineEmits(['close']);


</script>

<template>
  <div class="modal">
    <div class="modal__content">
      <div class="close">
        <a href class="small-btn" @click.prevent="emit('close')">
          <img :src="X" alt="close" />Close Pro Tip
        </a>
      </div>
      <div v-if="(store.showfireball)" class="modal__text">
          <img width="183" height="21" alt="Fireball" :src="Fireball" />
          <h2 class="highlighted">What is <span>Fireball?</span>
          </h2>
          <p>When you add Fireball to Pick 3, you get an extra drawn-number for more combinations to match and win. A Fireball number is drawn following each Carolina Pick 3 drawing. When you add Fireball to your ticket, the Fireball number can replace any other Pick 3 drawn-number for more chances to win.</p>
      </div>


      <div v-else-if="(store.presentgame === null)" class="modal__text">
        <p>
          Exact, Any, and 50/50 are the most popular ways to play Pick 3, but they aren’t the only ways. Try Combo, Front Pair, or Back Pair for more ways to play and win.
        </p>
        <h2>Combo</h2>
        <p>
          Provides an Exact play for all possible combinations of the numbers you selected on a single ticket.        </p>
        <h2>Pairs (Front or Back)</h2>
        <p>
          Pick two numbers and specify Front Pair or Back Pair by checking the appropriate Play Type. For a Front Pair play, select numbers in the first two rows only; for a Back Pair play, select numbers in the last two rows only. Selected pair of numbers must match the winning pair in the exact order drawn.
        </p>
      </div>


      <div v-else class="modal__text">
      <div class="quick-pick">
      <span>Quick Pick</span>
        </div>
      <h2 class="highlighted">Use <span>“Quick Pick”</span> to have your numbers randomly selected.
</h2>      </div>

      
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow-y: scroll;
  background-color: var(--color-green-darkest);
  overflow: hidden;
}

.modal__content {
  padding-top: 80px;
  min-height: 100%;
}
.modal__text {
  margin: 32px 40px;
}

.close {
    margin-left: 8px;
}

p {
  font-family: 'Avenir Next', sans-serif;
  color: var(--vt-c-white);
  font-size: 14px;
  line-height: 1.5;
}

h2 {
  color: var(--color-gold);
  margin: 24px 0 8px;
}

h2.highlighted {
  color: var(--vt-c-white);
}

h2.highlighted span {
  color: var(--color-gold);
}

.quick-pick {
  display: flex;
}

.quick-pick span {
  margin-right: 24px;
  font-weight: bold;
  font-size: 20px;
  text-shadow: -1px 1px 4px rgba(0, 61, 31, 0.75);
  color: var(--vt-c-white);
  display: flex;
  align-items: center;
}

.quick-pick span::before {
  content: '';
  display: block;
  width: 30px;
  height: 40px;
  background-color: var(--vt-c-white);
  border-radius: 3.94px;
  border: 1px solid var(--color-fireball-red);
  margin-right: 12px;
}
</style>

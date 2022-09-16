<script setup>
import BgStars from '../components/BgStars.vue';
import { ClickSound } from '../composables/sfx';
import { gamesStore } from '@/store/GamesStore'

const store = gamesStore();
const emit = defineEmits(['confirm-yes']);


const confirmation = () => {
  if (!store.ismuted) {
    ClickSound()
  }
  emit('confirm-yes');
}

</script>

<template>
  <div class="eighteen">
    <div class="eighteen__form">
    <h2>Are you over 18?</h2>
    <div class="eighteen-buttons">
      <a href @click.prevent="confirmation" class="accent-button">
        <span class="button__title">Yes</span>
    </a>
      <a href="https://nclottery.com/" target="_blank" class="accent-button btn-gray">
        <span class="button__title">No</span>
    </a>
    </div>
    </div>
    <p class="notice">Game demos are for educational purposes only and do not represent actual odds of winning. Winning in this experience does not convey any prizes or cash value. There may be some variations between the demo game and the actual game. The North Carolina Education Lottery Pick 3 game play is subject to NCEL game rules</p>
    <BgStars />
  </div>
</template>

<style scoped>

h2 {
  font-size: 2rem;
  font-weight: bold;
  color: var(--vt-c-white);
  text-align: center;
  margin-top: 40px;
  text-shadow: -1px 1px 4px rgba(0, 61, 31, 0.75);
}

.eighteen {
  position: absolute;
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-green-darkest);
  z-index: 3;
  padding: 50px 30px 0 30px;
}

.notice a {
  color: var(--color-text);
  text-decoration: underline;
}
.eighteen__form {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.eighteen-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.eighteen-buttons a {
  min-width: unset;
}

.eighteen p {
  font-family: 'Avenir Next', sans-serif;
  font-size: .625rem;
  line-height: 1.2;
  text-align: center;
  margin-bottom: 30px;
}

</style>
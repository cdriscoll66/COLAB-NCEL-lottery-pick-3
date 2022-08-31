<script setup>
import BgStars from '../components/BgStars.vue';
import { ClickSound } from '../composables/sfx';


const emit = defineEmits(['confirm-yes']);


const confirmation = () => {
  ClickSound();
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
      <a href="https://www.yahoo.com" target="_blank" class="accent-button btn-gray">
        <span class="button__title">No</span>
    </a>
    </div>
    </div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
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
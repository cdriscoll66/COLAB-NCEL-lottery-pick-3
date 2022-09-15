<script setup>
import { onMounted, reactive } from 'vue'
import { gamesStore } from '@/store/GamesStore'
import BgStars from '../components/BgStars.vue'
import EighteenModal from '../components/EighteenModal.vue'
import GameFrame from '../components/GameFrame.vue'
import { ClickSound } from '../composables/sfx';
import PrizeModal from '../components/PrizeModal.vue'

import ProTip from '../components/ProTipModal.vue'

const emit = defineEmits(['music', 'musicplaypause'])

const store = gamesStore()




const state = reactive({
  showProTip: false,
  showPrize: false
})

const closeModal = () => {
  if (!store.ismuted) {ClickSound()}
  store.confirmEighteen()
}

const closeProTip = () => {
  if (!store.ismuted) {ClickSound()}
  state.showProTip = false
}

const openProTip = () => {
  if (!store.ismuted) {ClickSound()}
  state.showProTip = true
}

const closePrize = () => {
  if (!store.ismuted) {ClickSound()}
  state.showPrize = false
}

const openPrize = () => {
  if (!store.ismuted) {ClickSound()}
  state.showPrize = true
}

const chooseGame = (game) => {
  if (!store.ismuted) {ClickSound()}
  store.setPresentGame(game)
}

onMounted(() => {
  emit('music', 'audio/FunkyInFunky.mp3')
  store.setPresentGame(null)
  store.resetPicksAndFireball()
})
</script>

<template>
  <main>
    <EighteenModal
      v-if="(!store.iseighteen)"
      @confirm-yes="closeModal"
    ></EighteenModal>

    <div v-if="(store.presentgame)" class="game-exact">
      <GameFrame @protip="state.showProTip = true" @prize="state.showPrize = true"></GameFrame>
    </div>

    <div v-else class="game-select">
      <div class="btn-row">
        <a class="small-btn" href @click.prevent="openProTip">
          Pro Tip
        </a>
        <a class="small-btn" href @click.prevent="openPrize">
          Prizes & Odds
        </a>
      </div>
      <div class="game-select__container">
        <h2>
          Select
          <span>play type:</span>
        </h2>
        <div class="game-select__list">
          <a href @click.prevent="chooseGame('exact')">Exact</a>
          <a href @click.prevent="chooseGame('any')">Any</a>
        </div>
        <div class="info-point">
          <p>
            There are MANY way to play Pick 3. Try a popular option above,
            then explore the rest at NCLottery.com.
          </p>
        </div>
      </div>
    </div>
    <ProTip v-show="(state.showProTip)" @close="closeProTip" />
    <PrizeModal v-show="(state.showPrize)" @close-prize="closePrize" />

    <BgStars green="true" />
  </main>
</template>

<style>
.game-select,
.game-exact {
  height: 100%;
}

.btn-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 8px;
  z-index: 1;
}

.game-select__container,
.rules-select__container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-around;
  height: 100%;
}

.rules-select__container {
  justify-content: center;
}

.game-select__list,
.rules-select__list {
  display: flex;
  flex-flow: column nowrap;
  margin-left: 7.5%;
  margin-right: 7.5%;
}

.rules-select__note {
  margin-top: -30px;
  margin-bottom: 30px;
  color: var(--vt-c-white);
  font-size: 14px;
}

.game-select__list a,
.rules-select__list a {
  display: flex;
  flex-flow: row nowrap;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.2;
  color: var(--vt-c-white);
  margin-bottom: 30px;
}

.game-select__list a::before,
.rules-select__list a::before {
  content: '';
  display: block;
  min-width: 39px;
  width: 39px;
  height: 39px;
  background-color: var(--vt-c-white);
  border-radius: 3.94px;
  border: 1px solid var(--color-fireball-red);
  margin-right: 12px;
}

h2 {
  text-shadow: -1px 1px 4px rgba(0, 61, 31, 0.75);
  color: var(--vt-c-white);
  font-size: 32px;
  line-height: 1.2;
  font-weight: 700;
}

h2 span {
  text-shadow: -1px 1px 4px rgba(0, 61, 31, 0.75);
  color: var(--color-gold);
  font-weight: 700;
}

.info-point {
  display: flex;
  margin: 20px auto;
  width: 240px;
}

.info-point p {
  font-family: 'Avenir Next', sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: var(--vt-c-white);
  margin-bottom: 30px;
}

.info-point::before {
  content: '';
  display: block;
  width: 30px;
  margin-right: 10px;
  background-image: url(../assets/infoicon.svg);
  background-size: contain;
  background-repeat: no-repeat;
}
</style>

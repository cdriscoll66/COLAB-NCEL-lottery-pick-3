<script setup>
import { gamesStore } from '@/store/GamesStore'
import PlayResults from '../components/PlayResults.vue'
import GameBoard from '../components/GameBoard.vue'
import Fireball from '../assets/fireball.png'
import Logo from '../assets/pick3plusfireball-logo.png'
import { ClickSound } from '../composables/sfx';

const emit = defineEmits(['music', 'musicplaypause', 'protip', 'prize'])

const store = gamesStore()



const numberSelection = (num, slot) => {
  store.isNotQuickPick();
  if (store.presentrules == 1) {
    store.setSame(num)
  } else if (store.presentrules == 2) {
    if (slot == 0 || slot == 1) {
      store.selectNum(num, 0)
      store.selectNum(num, 1)
    } else {
      store.selectNum(num, 2)
    }
  } else {
    store.selectNum(num, slot)
  }
}

const quickPick = () => {
  store.isQuickPick();
  // generate an array of 3 integers between 0 and 9 but they must be unique.
  if (!store.ismuted) {
    ClickSound()
  }
  if (store.presentrules == 0) {
    store.randomNums()
  } else if (store.presentrules == 1) {
    let num = Math.floor(Math.random() * 10)
    store.setSame(num)
  } else if (store.presentrules == 2) {
    store.randomTwoNums()
  }
}

const queryFireball = () => {
  if (!store.ismuted) {
    ClickSound()
  }
  store.showFireball()
}

const playFireball = () => {
  if (!store.ismuted) {
    ClickSound()
  }
  store.hideFireball()
  store.useFireball()
  store.genFireball()
  store.showResults()
}

const optOut = () => {
  if (!store.ismuted) {
    ClickSound()
  }
  store.hideFireball()
  store.noFireball()
  store.genFireball()
  store.showResults()
}

const nextGame = () => {
  store.hideResults()
  store.resetPicksandFireball()
}

const chooseRules = (num) => {
  if (!store.ismuted) {
    ClickSound()
  }
   store.setPresentRules(num)
}
</script>

<template>
  <div class="btn-row" v-if="(store.presentrules === null && store.gamerules)"></div>
  <div class="btn-row" v-else>
    <a class="small-btn" href @click.prevent="emit('protip')">Pro Tip</a>
    <a v-if="(store.presentgame === null)" class="small-btn" href @click.prevent="emit('prize')">
      Prizes & Odds
    </a>
  </div>
  <div v-if="(store.presentrules === null)" class="rules-select__container">
    
    <div><img
          width="256"
          height="102"
          id="logo"
          alt="Pick 3 Plus Fireball logo"
          :src="Logo"
        /></div>
    <div class="rules-select__list">
      
      <div class="playtype-select__note">
    <p>There are MANY ways to play Pick 3. Choose one of these most popular ways to learn how the game is played.</p>
    </div>
      <a href @click.prevent="chooseRules(0)">Pick Different Numbers</a>
      <a
        v-if="(store.presentgame == 'exact')"
        href
        @click.prevent="chooseRules(1)"
      >
        Pick All the Same Number
      </a>
      <a v-else href @click.prevent="chooseRules(2)">
        Pick Two of the Same Numbers and One Different
      </a>
    </div>
  </div>
  <div v-else-if="(store.showfireball)" class="fireball-pick">
    <div class="fireball-pick__container">
        <h2>
        Add
        <span>Fireball?</span>
      </h2>
      <div class="fireball__select">
        <a href :class="{ checked: store.fbchecked }" @click.prevent="store.fbCheckedToggle()">
          <img width="183" height="21" alt="Fireball" :src="Fireball" />
        </a>
      </div>
      <div class="play-note info-point">
        <p>
          Fireball is an extra lottery-drawn number for more combinations to match and win. Adding Fireball doubles the cost of your ticket.
        </p>
      </div>

      <div v-if="(store.fbchecked)" class="fireball-pick__button fireball-pick__optout">
        <a class="accent-button" href @click.prevent="playFireball">
          <div><span class="button-title">Next</span></div>
        </a>
      </div>

      <div v-else class="fireball-pick__button fireball-pick__optout">
        <a class="accent-button btn-gray" href @click.prevent="optOut">
          <div><span class="button-title">Not This Time</span></div>
        </a>
      </div>
    </div>
  </div>
  <div class="game" v-else>
    <h2>
      {{ store.gamerules[store.presentrules].instructions1 }}
      <br /><span>{{ store.gamerules[store.presentrules].instructions2 }}</span>
    </h2>

    <GameBoard @select-num="numberSelection"></GameBoard>

    <div class="quick-pick">
      <a href :class="{ checked: store.isquickpick }" @click.prevent="quickPick">Quick Pick</a>
    </div>

    <div class="bottom play">
      <a
        v-show="!store.picks.includes(null)"
        href
        class="accent-button one-line"
        @click.prevent="queryFireball()"
      >
        <span class="button__title">Next</span>
      </a>
    </div>

    <PlayResults v-if="(store.showresults)" @next-game="nextGame"></PlayResults>
  </div>
</template>

<style scoped>
.game {
  height: calc(100% - 90px);
  display: flex;
  flex-flow: column nowrap;
  margin: 20px 10px;
}

.quick-pick {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
}

.quick-pick a,
.fireball__select a {
  margin-right: 24px;
  font-weight: bold;
  font-size: 20px;
  text-shadow: -1px 1px 4px rgba(0, 61, 31, 0.75);
  color: var(--vt-c-white);
  display: flex;
  align-items: center;
}

.fireball__select a::before, .quick-pick a::before {
  content: '';
  display: block;
  width: 30px;
  height: 30px;
  background-image: url(../assets/square-check.svg);
  background-image: url(../assets/blank-square.svg);
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 4px;
}

.quick-pick a.checked::before, .fireball__select a.checked::before {
  background-image: url(../assets/square-check.svg);
}

h2 {
  
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vt-c-white);
  text-align: center;
  margin-top: 10px;
}

.playtype-select__note {
  margin-top: 30px;
  margin-bottom: 30px;
  color: var(--vt-c-white);
  font-size: 16px;
}

.game h2 {
  font-size: 28px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 20px;
}

.bottom {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
}

.play-note,
.play-note p
{
  margin-top: 5;
  margin-bottom: 5px;
}

.play a.one-line {
  margin-top: 0;
  text-align: center;
}

.fireball-pick {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.fireball-pick__container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: var(--vt-c-white);
  position: absolute;
}

.fireball-pick__container h2{
  margin-bottom: 30px;
}
.fireball-pick__button a {
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.35px;
  text-shadow: -1px 1px 1px #535353;
  font-style: italic;
  min-width: unset;
  padding: 12px 32px;
}

</style>

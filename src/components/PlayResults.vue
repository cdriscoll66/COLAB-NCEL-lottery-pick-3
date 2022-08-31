<script setup>
import { reactive } from 'vue'
import { gamesStore } from '@/store/GamesStore'
import BgStars from './BgStars.vue'
import ConfirmScreen from './ConfirmNumbersScreen.vue'
import Winner from './Winner.vue'
import ShouldaFireballed from './ShouldaFireballed.vue'
import { ClickSound } from '../composables/sfx';

const store = gamesStore()

const emit = defineEmits(['next-game'])

const state = reactive({
  showConfirmScreen: true,
})


const playRewardScreen = () => {
  ClickSound()
  state.showConfirmScreen = false
}


</script>

<template>
  <div class="play-results">

    <div class="results-modal">
          <div v-if="state.showConfirmScreen" class="confirm-screen">
           <ConfirmScreen 
          @play-reward-screen="playRewardScreen"
          />
          </div>
          <div v-else class="winner-screen">
            <Winner v-if="store.fireballselected" />
            <ShouldaFireballed v-else/>
          </div> 
      <BgStars green="true"/>
    </div>
  </div>
</template>

<style scoped>


.results-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  color: var(--vt-c-white);
  z-index: 1;
  padding: 60px 0 0 0;
  display:flex;
  flex-flow: column nowrap;
}

.confirm-screen, .winner-screen {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;

}
.bottom {
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  margin-bottom: 30px;
}
.fireball-mark {
  display: flex;
  align-items: center;
}

h2.game-type {
  margin-bottom: 5px;
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

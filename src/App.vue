<script setup>
import { onBeforeMount, reactive, computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { gamesStore } from '@/store/GamesStore'
import HomeIcon from './assets/home.png'
import LearnIcon from './assets/menu.png'
import PlayIcon from './assets/play.png'
import MuteIcon from './assets/sound.png'
import CloseIcon from './assets/close.png'
import { ClickSound } from './composables/sfx.js'

const store = gamesStore()


// this resizes the screen to whatever screen it's on.
onBeforeMount(() => {
  /** https://dev.to/maciejtrzcinski/100vh-problem-with-ios-safari-3ge9 */
  const viewportDimensions = () => {
    const doc = document.documentElement
    // doc.style.setProperty('--viewport-width', window.innerWidth);
    doc.style.setProperty('--viewport-height', window.innerHeight)
    doc.style.setProperty(
      '--viewport-scale',
      Math.min(
        window.innerWidth / 375, // [320, 375] 
        window.innerHeight / 635, // [559, 635] 
      ),
    )
  }
  window.addEventListener('resize', viewportDimensions)
  viewportDimensions()

  // preloadImages();
})

//  const preloadImages = () => {
//    const pics = state.preloadImages;
//       pics.forEach(pic => {
//         const img = new Image();
//         img.src = pic;
//       })
//     }


const routeName = computed(() => {
  return useRoute().name
})

const showTOC = () => {
  store.toggleTOC()
  onClickNoise()
}


const state = reactive({
  music: '',
  preloadImages: [
    '/assets/bg-stars.svg',
    '/assets/bg-stars--green.svg',
    '/assets/home.png',
    '/assets/menu.png',
    '/assets/play.png',
    '/assets/sound.png',
    '/assets/close.png'
  ]
})

const muteToggle = () => {
  bgMusic.muted = !bgMusic.muted;
  store.ismuted = !store.ismuted;
}

const playToggle = (status) => {
  return status ? bgMusic.play() : bgMusic.pause()
}

let bgMusic = new Audio()
bgMusic.src = state.music
bgMusic.loop = true

const Music = (song) => {
  if (state.music == song){
    return
  } else {
  state.music = song
  bgMusic.src = state.music
  bgMusic.play()
  }
}

const onClickNoise = () => {
  if (!store.ismuted) {
    ClickSound()
  }
}


</script>

<template>
  <header>
    <div class="nav-wrapper">
      <nav>
        <RouterLink to="/" @click="onClickNoise">
          <span class="nav-icon">
            <img width="30" height="30" alt="Home Icon" :src="HomeIcon" />
          </span>
          <span>Home</span>
        </RouterLink>

        <span v-if="routeName == 'tutorial'" >
        <a href @click.prevent="showTOC">
          <span class="nav-icon">
            <img width="30" height="30" alt="Learn Icon" :src="LearnIcon" />
          </span>
          <span>Learn</span>
        </a>
        </span>

        <span v-else>
        <RouterLink to="/tutorial" @click="onClickNoise" >
          <span class="nav-icon">
            <img width="30" height="30" alt="Learn Icon" :src="LearnIcon" />
          </span>
          <span>Learn</span>
        </RouterLink>
        </span>
     
        <RouterLink class="play-icon" to="/game" @click="onClickNoise">
          <span class="nav-icon">
            <img width="40" height="40" alt="Play Icon" :src="PlayIcon" />
            <span class="top-left"></span>
            <span class="top-right"></span>
          </span>
          <span>Play Demo</span>
        </RouterLink>
        <a href @click.prevent="muteToggle()">
          <span class="nav-icon">
            <img width="30" height="30" alt="Mute Icon" :src="MuteIcon" />
          </span>
          <span v-if="store.ismuted">Unmute</span>
          <span v-else>Mute</span>
        </a>
        <a href="https://nclottery.com/pick3" target="_blank" @click="onClickNoise">
          <span class="nav-icon">
            <img width="30" height="30" alt="Exit Icon" :src="CloseIcon" />
          </span>
          <span>Exit</span>
        </a>
      </nav>
    </div>
  </header>

  <RouterView @music="Music" @musicplaypause="playToggle" />
</template>

<style scoped>
header {
  position: absolute;
  z-index: 10000000;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  line-height: 1.5;
  max-height: 100vh;
  background: radial-gradient(442.3% 86.73% at 50% 0%, rgba(0, 156, 74, 0.3) 0%, rgba(0, 122, 61, 0.3) 100%), #009C4A;
  background-blend-mode: multiply, normal;
  padding: 0;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  width: 100%;
  font-size: 8px;
  font-weight: 700;
  text-align: center;
}


nav a.router-link-exact-active {
  color: var(--color-gold);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: flex;
  flex-flow: column nowrap;
  padding: 0 .75rem;
  color: var(--vt-c-white);
}
nav a span.nav-icon {
  margin-top: 5px;
}


nav a:first-of-type {
  border: 0;
}

.play-icon {
  padding: 0;
}
.play-icon span.nav-icon {
  width: 92px;
  height: 74px !important;
  margin: 0 6px -25px;
  padding: 2px 10px 8px !important;
  border-radius: 0 0 20px 20px;
  background-color: var(--color-green-light);
  position: relative;
  box-shadow: 0px 0px 4px rgba(0, 122, 61, 0.82), inset 0px 1px 3px #007A3D, inset 0px 1px 3px #0BCE65;
}

.play-icon span {
  font-size: 12px;
  font-weight: 700;
  font-style: italic;
}

.top-right,
.top-left {
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  background-color: var(--color-green-light);
  display: none !important; /* hiding for now. */
}

.top-left::before,
.top-right::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
}

.top-right {
  left: 100%;
}
.top-right::before {
  border-radius: 10px 0 0 0;
}

.top-left {
  right: 100%;
}
.top-left::before {
  border-radius: 0 10px 0 0;
}
</style>

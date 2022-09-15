<script setup>
import gsap from 'gsap';
import { loadFull } from "tsparticles";
import { Triumph } from '../composables/sfx';
import { onMounted } from 'vue';
import { gamesStore } from '@/store/GamesStore'

const store = gamesStore();

const particlesInit = async (engine) => {
  await loadFull(engine);
}

onMounted(() => {
    

    let tl = gsap.timeline({ repeat: 0 });
      tl.to('#win1', { delay: 0, duration: 0, opacity: 0, y: 120 });
      tl.to('#win5', { delay: 0, duration: 0, opacity: 0, y: -120 });
      tl.to('#win2', { delay: 0, duration: 0, opacity: 0, y: 60 });
      tl.to('#win4', { delay: 0, duration: 0, opacity: 0, y: -60 });
      tl.to('#win3', { delay: 0, duration: 0, opacity: 0 });

      tl.to('#win3', { delay: 0, duration: 0.6, opacity: 1, scale: 1.1, ease: 'elastic', onComplete: () => {
        if (!store.ismuted) {Triumph();}
      } });
      tl.to('#win3', { delay: -0.2, duration: 0.2, scale: 1, ease: 'expo.out' });
      tl.to('#win1', { delay: -0.2, duration: 0.2, opacity: 1, y: 0, ease: 'expo.out' });
      tl.to('#win5', { delay: -0.2, duration: 0.2, opacity: 1, y: 0, ease: 'expo.out' });
      tl.to('#win2', { delay: -0.2, duration: 0.2, opacity: 1, y: 0, ease: 'expo.out' });
      tl.to('#win4', { delay: -0.2, duration: 0.2, opacity: 1, y: 0, ease: 'expo.out', });
});


</script>

<template>
<div class="winner__wrapper">
            
<h1 id="win1">Winner</h1>
<h1 id="win2">Winner</h1>
<h1 id="win3">Winner</h1>
<h1 id="win4">Winner</h1>
<h1 id="win5">Winner</h1> 

   <Particles
    id="tsparticles"
    :options="{
    fullScreen: {
    zIndex: 1
  },
  particles: {
    number: {
      value: 0
    },
    color: {
      value: [
        '#FFD206',
      ]
    },
    shape: {
      type: [
        'circle',
        'square',
        'star',
      ],
    },
    opacity: {
      value: 1,
      animation: {
        enable: true,
        minimumValue: 0,
        speed: 2,
        startValue: 'max',
        destroy: 'min'
      }
    },
    size: {
      value: 4,
      random: {
        enable: true,
        minimumValue: 2
      }
    },
    links: {
      enable: false
    },
    life: {
      duration: {
        sync: true,
        value: 5
      },
      count: 1
    },
    move: {
      enable: true,
      gravity: {
        enable: true,
        acceleration: 10
      },
      speed: {
        min: 10,
        max: 20
      },
      decay: 0.1,
      direction: 'none',
      straight: false,
      outModes: {
        default: 'destroy',
        top: 'none'
      }
    },
    rotate: {
      value: {
        min: 0,
        max: 360
      },
      direction: 'random',
      move: true,
      animation: {
        enable: true,
        speed: 60
      }
    },
    tilt: {
      direction: 'random',
      enable: true,
      move: true,
      value: {
        min: 0,
        max: 360
      },
      animation: {
        enable: true,
        speed: 60
      }
    },
    roll: {
      darken: {
        enable: true,
        value: 25
      },
      enable: true,
      speed: {
        min: 15,
        max: 25
      }
    },
    wobble: {
      distance: 30,
      enable: true,
      move: true,
      speed: {
        min: -15,
        max: 15
      }
    }
  },
  emitters: {
    life: {
      count: 0,
      duration: 0.1,
      delay: 0.4
    },
    rate: {
      delay: 0.1,
      quantity: 150
    },
    size: {
      width: 0,
      height: 0
    }
  }
}"
    :particlesInit="particlesInit"
    />
</div>
</template>

<style scoped>
.winner__wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    background-color: rgba(0, 61, 31, .9);
    color: var(--vt-c-white);
    align-items: center;
    z-index: 100;
}
h1 {
    font-weight: bold;
    font-size: 56px;
    text-transform: uppercase
}

h1:nth-child(odd) {
    color: var(--color-gold);
}
</style>
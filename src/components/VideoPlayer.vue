<script setup>
import { ref, onUpdated } from 'vue';


const emit = defineEmits(['update-time'])
const props = defineProps(['onscreen', 'playing']);

const vid = ref(null);

onUpdated(() => {
    if (props.playing) {
        vid.value.play();
    }
    else {
        vid.value.pause();
    }  
});



const spitOut = () => {
    if (vid._value) {
        let timeNow = vid._value.currentTime;
        emit('update-time', timeNow);
    };
}

</script>

<template>
    <video id="vid" ref="vid" width="375" height="522" autoplay playsinline muted preload="none" @timeupdate='spitOut()'>
      <source :src='props.onscreen' type="video/mp4">
    Your browser does not support the video tag.
    </video>
</template>

<style scoped>
#vid {position: absolute;
z-index: 0;
bottom: 0;
left: 0;
width: 100%;
background-color: transparent;
}

video::-webkit-media-controls {
        display:none !important;
    }
video::-webkit-media-controls-start-playback-button {
        display: none!important;
        -webkit-appearance: none;
        appearance: none;
    }


</style>
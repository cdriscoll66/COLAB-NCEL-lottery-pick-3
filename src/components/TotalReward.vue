<script setup>
    import gsap from 'gsap';
    import { onMounted, reactive, computed } from 'vue';
    import Logo from '../assets/pick3plusfireball-logo.png'	
    import { gamesStore } from '@/store/GamesStore'
    
    const store = gamesStore();

    
    const fireprizeamount = computed(() => {
        let val = null;
        if (store.winpercentage < 50) {
            val = store.fireprizemoney;
        } else {
         val = 0;
            }
         return val;
    })

    const prizeamount = computed(() => {
        let val = null;
        if (store.winpercentage > 75 || (store.winpercentage < 50 && store.winpercentage > 25)) {
            val = 0
        } else {
            val = store.prizemoney 
            }
         return val;
    })

    const totalwinnings = computed(() => {
        let val = state.prizeamount + state.fireprizeamount;
         return val;
    })
    
    const state = reactive({
        screen: 1,
        prizeamount: prizeamount,
        result: totalwinnings,
        fireprizeamount: fireprizeamount
    })
    
    
    const addCommaTotal = () => {
        let val = state.result;
        let commas = val.toLocaleString("en-US");
        commas = "$" + commas;
        document.getElementById('hl2').innerHTML = commas;
    }
    
    const addComma = (num) => {
        let commas = num.toLocaleString("en-US");
        commas = "$" + commas;
        return commas;
    }
    
    
    
    onMounted(() => {
    
        let tl = gsap.timeline({
            repeat: 0,
            delay: 0
        });
    
        tl.to('#hl1', {duration: .0, opacity: 0, y: 50});
        tl.to('.reward__amt', {duration: .0, opacity: 0, y: 50});
        tl.to('#hl3', {duration: .0, opacity: 0, y: 50});
        tl.to('#logo', {duration: .0, opacity: 0, y: 50});
        tl.to('#wonbase', {duration: .0, opacity: 0, y: 50}); 
        tl.to('#wonfire', {duration: .0, opacity: 0, y: 50});
        tl.to ('#wonbase', {duration: .3, opacity: 1, y: 0, ease: 'power1.inOut'});
        tl.to ('#wonfire', {duration: .3, opacity: 1, y: 0, ease: 'power1.inOut'});
        tl.to ('#wonbase', {duration: 2, });
        tl.to ('#wonbase', {duration: .3, y: -1000, ease: 'power1.inOut'});
        tl.to ('#wonfire', {duration: .3, y: 1000, delay: -.3, ease: 'power1.inOut',});
        tl.to ('#wonbase', {duration: .5, onComplete: () => {
            state.screen = 2;
        }});
        tl.to ('.reward__amt', {duration: .3, scale: 1.1, yoyo: true, repeat: -1, ease: 'power1.inOut'}); 
        tl.to ('#hl1', {duration: .3, opacity: 1, y: 0, ease: 'power1.inOut'});
        tl.to ('.reward__amt', {duration: .3, opacity: 1, y: 0, ease: 'power1.inOut'});
        tl.to ('#hl3', {duration: .3, opacity: 1, y: 0, ease: 'power1.inOut'});
        tl.to ('#logo', {duration: .3, opacity: 1, y: 0, ease: 'power1.inOut'});
        tl.to ('#hl2', {duration: 2, innerText: state.result, snap: "innerText", ease: 'power1.inOut', onComplete: () => {
            addCommaTotal();
        }});
     });

    
    </script>
    
    <template>
    <div class="reward-wrapper">
        <div v-show="state.screen === 1" class="reward-screen-intro">
            <h2 id="wonbase">You won<br /> <span>{{ addComma(state.prizeamount) }}</span> <br />playing <br />base game</h2>
            <h2 id="wonfire">and <span>{{ addComma(state.fireprizeamount) }}</span><br /> playing Fireball</h2>
        </div>
        <div v-show="state.screen === 2" class="reward-screen-intro">
            <div><h2 id="hl1">For a total <br />winnings of</h2></div>
            <div class="reward__amt"><h2 id="hl2">{{addComma(state.prizeamount)}}</h2></div>
            <div><h2 id="hl3">playing</h2></div>
            <div><img width="256" height="102" id="logo" alt="4 Plus Fireball logo" :src="Logo"/></div>
        </div>
    </div>
    </template>
    
    <style scoped>
    .reward-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-evenly;
        background-color: rgba(0, 61, 31, .9);
        color: var(--vt-c-white);
        align-items: center;
        z-index: 100;
    }
    
    .reward-screen-intro {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-evenly;
        align-items: center;
        text-align: center;
        height: 100%;
    }
    
    .reward-screen-intro h2 {
        font-size:34px;
        text-shadow: -1px 1px 4px rgba(0, 61, 31, 0.75);
    }
    
    .reward-screen-intro h2 span {
        font-size: 42px;
    }
    
    .reward__amt {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }
    .reward__amt h2 {
        font-weight: 700;
        font-size: 124.8px;
        letter-spacing: -1.7127px;
        text-transform: uppercase;
        text-shadow: -1px 1px 4px rgba(0, 61, 31, 0.75);
        color: var(--color-gold);
    }
    </style>
    
    
    
<script setup>
    import X from '../assets/x-protip.svg'
    
    
    
    const emit = defineEmits(['close-prize']);
    
    
    </script>
    
    <template>
      <div class="modal">
        <div class="modal__content">
          <div class="close">
            <a href class="small-btn" @click.prevent="emit('close')">
              <img :src="X" alt="close" />Close Prizes & Odds
            </a>
        </div>
    
    
          <div class="modal__text">
          <h2 class="highlighted">Use <span>“Prizes”</span> Check out the Prizes.
    </h2>      
</div>
    
          
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
      background-color: var(--color-green-darkest)
    }
    
    .modal__content {
      padding-top: 80px;
      min-height: 100%;
    }
    .modal__text {
      margin: 32px 40px;
    }
    
    .close {
        display: flex;
        justify-content: flex-end;
        margin-right: 8px;
    }
    
    p {
      font-family: 'Avenir Next', sans-serif;
      color: var(--vt-c-white);
      font-size: 12px;
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
    
   
    </style>
    
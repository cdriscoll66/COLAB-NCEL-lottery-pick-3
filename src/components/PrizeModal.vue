<script setup>
import X from '../assets/x-protip.svg'
import BgStars from './BgStars.vue';
    
    
    
    const emit = defineEmits(['close-prize']);
    
    
    </script>
    
    <template>
      <div class="modal">
        <div class="modal__content">
          <div class="close">
            <a href class="small-btn" @click.prevent="emit('close-prize')">
              <img :src="X" alt="close" />Close Prizes & Odds
            </a>
        </div>
    
    
          <div class="modal__text">
          <h2 class="highlighted">Prizes & Odds</h2>      
              <table>
                <tr>
                  <th>Play Type: <br /> Exact Order</th>
                  <th>Odds</th>
                  <th>Prize Amounts<br /><span>$1 play</span></th>
                </tr>
                <tr>
                  <td>3 Different Numbers</td>
                  <td>1:1,000</td>
                  <td>$500</td>
                </tr>
                <tr>
                  <td>2 like Numbers <br />& 1 Different</td>
                  <td>1:1,000</td>
                  <td>$500</td>
                </tr>
                <tr>
                  <td>3 like numbers</td>
                  <td>1:1,000</td>
                  <td>$500</td>
                </tr>
              </table>

              <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>

              <ul>
                <li>Odds of winning are aproximately 1,000: 1</li>
                <li>Odds of winning are aproximately 1,000: 1</li>
                <li>Odds of winning are aproximately 1,000: 1</li>
              </ul>

              <h2 class="highlighted">Any Order Play</h2>

              <table>
                <tr>
                  <th>Play Type: <br /> Any Order</th>
                  <th>Odds</th>
                  <th>Prize Amounts<br /><span>$1 play</span></th>
                </tr>
                <tr>
                  <td>3 Way (2 like 1 different)</td>
                  <td>1:333</td>
                  <td>$160</td>
                </tr>
                <tr>
                  <td>6 Way (3 different)</td>
                  <td>1:167</td>
                  <td>$80</td>
                </tr>
              </table>
              <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>

          </div>
    
          <BgStars />

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
      background-color: var(--color-green-darkest);
      background-color: var(--color-green-darkest);
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
    /* Hide scrollbar for Chrome, Safari and Opera */
    .modal::-webkit-scrollbar {
      display: none;
    }
        
    .modal__content {
      padding-top: 80px;
      min-height: 100%;
    }
    .modal__text {
      margin: 10px 32px 0 32px;
      padding-bottom: 50px;
    }
    
    .close {
        display: flex;
        justify-content: flex-end;
        margin-right: 8px;
    }
    
    p {
      font-family: 'Avenir Next', sans-serif;
      color: var(--vt-c-black);
      font-weight: bold;
      font-size: 14px;
      line-height: 1.2;
      margin: 20px 10px;
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

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th {
      text-align: left;
      padding: 8px;
      background-color: var(--color-green);
      color: var(--color-gold);
      font-weight: bold;
      vertical-align: center;
      text-align: center;

    }

    td {
      padding: 8px;
      text-align: center;
      border-bottom: 1px solid #ddd;
      background-color: var(--color-green-dark);
      color: var(--vt-c-white);
    }

    table span {
      font-size: 12px;
    }

    ul {
      margin: 20px 10px;
      padding: 0;
      list-style: none;
    }
    
   
    </style>
    

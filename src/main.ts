import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Game from './components/Game.vue'
import Aura from '@primevue/themes/aura';

import './resources/game.css'
import 'primeicons/primeicons.css'


function onResize() {
  document.body.style.setProperty('--vh', window.innerHeight + 'px')
}

window.addEventListener('resize', onResize)
onResize()

createApp(Game)
.use(PrimeVue, {
  theme: {
      preset: Aura
  }
})
.mount('#app')

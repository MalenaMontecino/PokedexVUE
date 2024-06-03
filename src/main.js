import { createApp } from 'vue'
import App from './App.vue'
// import './bootstrap';
// import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

createApp(App).mount('#app')


import PokedexContainer from '../src/components/PokedexContainer.vue';
createApp(PokedexContainer).mount('#PokedexContainer')

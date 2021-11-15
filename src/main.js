import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import './styles.scss'

import VEmojiPicker from 'v-emoji-picker';

import LemonIMUI from 'lemon-imui';
import 'lemon-imui/dist/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI)
Vue.use(VEmojiPicker);
Vue.use(LemonIMUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

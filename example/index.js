import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

const element = document.getElementById('app');
if (element) new Vue({ render: h => h(App) }).$mount(element);

if (module.hot) module.hot.accept();

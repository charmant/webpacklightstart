// JS
import './js'

// SCSS
import './assets/scss/main.scss'

// CSS (example)
// import './assets/css/main.css'

//SvgStore
var __svg__  = { path: './assets/img/**/icon-*.svg', name: 'assets/img/[hash].logos.svg' };
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);

// Vue.js
window.Vue = require('vue')

// Vue components (for use in html)
Vue.component('example-component', require('./components/Example.vue').default)

// Vue init
const app = new Vue({
  el: '#app'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//     el: '#app',
//     router,
//     components: { App },
//     template: '<App/>'
// })

import Calendar from './components/Calendar/Calendar.vue';
import Input from './components/Input/Input.vue';

// install 是 用来全部安装的关键
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(install)
}

function install (Vue) {
    Vue.component(Calendar.name, Calendar)
    Vue.component(Input.name, Input)
}

export default {
    install,
    Calendar,
    Input
}
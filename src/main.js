import Calendar from './components/Calendar/Calendar.vue';

// install 是 用来全部安装的关键

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

function install (Vue) {
  Vue.component(Calendar.name, Calendar)
}

export default {
  install,
  Calendar
}
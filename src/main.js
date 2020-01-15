import Calendar from './components/Calendar.vue';

// install 是 用来全部安装的关键
const install = function(Vue) {
  if (install.installed) return;
  Vue.component(Calendar.name, Calendar)
};

export default {
  install,
  Calendar
};
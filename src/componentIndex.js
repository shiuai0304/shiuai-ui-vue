import Calendar from './components/Calendar';
import Input from './components/Input';

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
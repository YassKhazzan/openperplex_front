import './assets/bootstrap/bootstrap.min.css'
import './assets/bootstrap/bootstrap.bundle.min.js'
import './assets/css/main.css'
import './assets/css/zen.css'
import './assets/css/custom.css'
import './assets/css/spinnerStyle.css'

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'


import {
    faArrowRight,
    faAngleDown,
    faStream,
    faPlus,
    faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";


library.add(
    faArrowRight,
    faAngleDown,
    faStream,
    faPlus,
    faQuestionCircle
);

let app;


app = createApp(App).component('fa', FontAwesomeIcon);
app.use(router);
app.mount('#app');


export default app;
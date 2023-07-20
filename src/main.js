import './assets/main.css'
/* tailwind */
import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* vue loading */
import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

/* v-input-otp */
import VOtpInput from 'vue3-otp-input'

/* snackbar */
import { SnackbarService, Vue3Snackbar } from 'vue3-snackbar'
import 'vue3-snackbar/styles'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, far, fab)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(SnackbarService)
app.use(LoadingPlugin)

/* snackbar component */
app.component('vue3-snackbar', Vue3Snackbar)
app.component('v-otp-input', VOtpInput)
app.component('font-awesome-icon', FontAwesomeIcon)

/* Global */
app.mount('#app')

import { createApp } from "vue"
import App from "./App.vue"
// import "./registerServiceWorker";
import router from "./router"

import "@coreui/coreui/dist/css/coreui.min.css"
import "./assets/globals.css"
import '@toast-ui/editor/dist/toastui-editor.css'

// Get data layer!

createApp(App).use(router).mount("#app")

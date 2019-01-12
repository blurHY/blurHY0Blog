import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import router from "./router";

// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";

import "bootswatch/dist/litera/bootstrap.min.css";

import NavBarComponent from "./components/NavBarComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import HorizonWidget from "./components/core/HorizonWidget.vue";
import AboutmeWidget from "./components/core/AboutMeWidget";

import App from "./App.vue";

import MonkeyPatch from "./zero/monkeypatch_router";
import zero from "./zero/zero.js";
import {
	ZeroFakeXMLHttpRequest
} from './zero/zeroframe';

import {
	VueSpinners
} from "@saeris/vue-spinners";

Vue.use(BootstrapVue);
Vue.use(VueSpinners);

Vue.component("nav-bar-component", NavBarComponent);
Vue.component("footer-component", FooterComponent);
Vue.component("horizon-widget-component", HorizonWidget);
Vue.component("about-widget-component", AboutmeWidget);

import {
	library
} from "@fortawesome/fontawesome-svg-core";
import {
	faCreativeCommonsBy,
	faCreativeCommonsSa,
	faCreativeCommons,
} from "@fortawesome/free-brands-svg-icons";
import {
	FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";

library.add(faCreativeCommons, faCreativeCommonsBy, faCreativeCommonsSa);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.config.devtools = true;

window.zframe = new zero();

if (document.location.href.search("wrapper_nonce") > 0) {
	MonkeyPatch(router, zframe);
	window.XMLHttpRequest = ZeroFakeXMLHttpRequest
}

Vue.prototype.zframe = zframe;

new Vue({
	render: h => h(App),
	router,
}).$mount("#app");
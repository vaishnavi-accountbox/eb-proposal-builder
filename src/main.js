import './setup-jquery'
import Vue from 'vue'                    // ✅ Import Vue here
import App from './app.vue'
import draggable from "vuedraggable";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap and BootstrapVue CSS files
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";
import builderHtmlContent from './components/builderHtmlContent.vue';
import styleEditFormFields from './components/styleEditFormFields.vue';
import $ from "jquery";
import './directive.js';
import './component.js';
import './style-component.js'
import fontStyleSettings from './components/fontStyleSettings.vue';
import rowColumn from './components/rowColumn.vue';
import heading3Template from './components/heading3Template.vue';
import searchTemplate from './components/searchTemplate.vue';
import textTemplate from './components/textTemplate.vue';
import navlistTemplate from './components/navlistTemplate.vue';
import iconTemplate from './components/iconTemplate.vue';
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

$("body").addClass("lp-builder-body");

window.LANDING_PAGE_JSON = window.LANDING_PAGE_JSON || {};
var KEY_DOWN_EVENT_TRIGGER_STATE = {};
var PARENT_UNLOAD_CONFIRM = true;

// Prevent jQuery UI dialog from blocking focusin

// Register draggable globally
Vue.component("draggable", draggable);
// Vue.component('builder-html-content', builderHtmlContent);
// Vue.component('style-edit-form-fields', styleEditFormFields);
// Vue.component('font-style-settings', fontStyleSettings);
// Vue.component('row-column', rowColumn);
// Vue.component('navbarTemplate', NavbarTemplate);
// Vue.component('heading3Template', heading3Template);
// Vue.component('searchTemplate', searchTemplate);
// Vue.component('textTemplate', textTemplate);
// Vue.component('navlistTemplate', navlistTemplate);
// Vue.component('iconTemplate', iconTemplate);

// Create and mount the Vue 3 app
window.landingpageBuilderVueRef = new Vue({
  render: h => h(App)
}).$mount('#app')


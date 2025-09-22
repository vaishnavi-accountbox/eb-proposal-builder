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
import fontStyleSettings from './components/fontStyleSettings.vue';
import rowColumn from './components/rowColumn.vue';
import bnavbarTemplate from './components/bnavbarTemplate.vue';
import heading3Template from './components/heading3Template.vue';
import searchTemplate from './components/searchTemplate.vue';
import stylePadding from './components/stylePadding.vue';
import styleMargin from './components/styleMargin.vue';
import columnSettings from './components/columnSettings.vue';
import styleBackground from './components/styleBackground.vue';
import styleBorder from './components/styleBorder.vue';
import styleBoxShadow from './components/styleBoxShadow.vue';
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

$("body").addClass("lp-builder-body");

window.PARENT_UNLOAD_CONFIRM = true;
window.LANDING_PAGE_JSON = window.LANDING_PAGE_JSON || {};
window.KEY_DOWN_EVENT_TRIGGER_STATE = {};

// Prevent jQuery UI dialog from blocking focusin

// Register draggable globally
Vue.component("draggable", draggable);
Vue.component('builder-html-content', builderHtmlContent);
Vue.component('style-edit-form-fields', styleEditFormFields);
Vue.component('font-style-settings', fontStyleSettings);
Vue.component('row-column', rowColumn);
Vue.component('bnavbarTemplate', bnavbarTemplate);
Vue.component('heading3Template', heading3Template);
Vue.component('searchTemplate', searchTemplate);
Vue.component('style-padding', stylePadding);
Vue.component('style-margin', styleMargin);
Vue.component("column-settings", columnSettings);
Vue.component('style-background', styleBackground);
Vue.component('style-border', styleBorder);
Vue.component('style-box-shadow', styleBoxShadow);

// Create and mount the Vue 3 app
window.landingpageBuilderVueRef = new Vue({
  render: h => h(App)
}).$mount('#app')


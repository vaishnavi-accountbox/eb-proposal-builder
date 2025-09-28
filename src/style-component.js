/* eslint-disable no-mixed-spaces-and-tabs */
import Vue from 'vue'   
import StylePadding from './style-components/stylePadding.vue';
import StyleIconSettings from './style-components/styleIconSettings.vue';
import ColumnSettings from './style-components/columnSettings.vue';
import StyleMargin from './style-components/styleMargin.vue';
import StyleBackground from './style-components/styleBackground.vue';
import StyleBorder from './style-components/styleBorder.vue';
import StyleVideoSettings from './style-components/styleVideoSettings.vue';
import StyleBoxShadow from './style-components/styleBoxShadow.vue';
Vue.component("style-icon-settings", StyleIconSettings);

Vue.component("column-settings", ColumnSettings);

Vue.component("style-padding", StylePadding);

Vue.component("style-margin", StyleMargin);

Vue.component("style-background", StyleBackground);

Vue.component("style-border", StyleBorder);
Vue.component("style-box-shadow", StyleBoxShadow);

Vue.component("style-video-settings", StyleVideoSettings);

/* eslint-disable */
import Vue from 'vue'   
import $ from "jquery";
import iconTemplate from './components/iconTemplate.vue';
import NavlistTemplate from './components/navlistTemplate.vue';
import TextTemplate from './components/textTemplate.vue';
import RowColumn from './components/rowColumn.vue';
import SearchTemplate from './components/searchTemplate.vue';
import Heading3Template from './components/heading3Template.vue';
import BuilderHtmlContent from './components/builderHtmlContent.vue';
import StyleEditFormFields from './components/styleEditFormFields.vue';
import FontStyleSettings from './components/fontStyleSettings.vue';
import HtmlTemplate from './components/htmlTemplate.vue';
import ButtonTemplate from './components/buttonTemplate.vue';
import DropdownTemplate from './components/dropdownTemplate.vue';
import SpaceTemplate from './components/spaceTemplate.vue';
import VideoTemplate from './components/videoTemplate.vue';
import PopupTemplate from './components/popupTemplate.vue';
import NavbarTemplate from './components/navbarTemplate.vue';
import FormTemplate from './components/formTemplate.vue';
import SectionVideoBackground from './components/sectionVideoBackground.vue';
import PageRenderRowColumn from './components/pageRenderRowColumn.vue';
import Box from './components/box.vue';
import CollectionList from './components/collectionList.vue';
import List from './components/list.vue';
import Cards from './components/cards.vue';
import Minimal from './components/minimal.vue';
import Tiles from './components/tiles.vue';
import CollectionComponent from './components/collectionComponent.vue';
import ArticleComponent from './components/articleComponent.vue';
import VideoRenderOptions from './components/videoRenderOptions.vue';
import CarousalTemplate from './components/carousalTemplate.vue';
import VerticaldividerTemplate from './components/verticaldividerTemplate.vue';
import DividerTemplate from './components/dividerTemplate.vue';
import SocialTemplate from './components/socialTemplate.vue';
import ImageTemplate from './components/imageTemplate.vue';
import BlockTemplate from './components/blockTemplate.vue';
import RepositoryImageFiles from './components/repositoryImageFiles.vue';
import ProductComponent from './components/productComponent.vue';
var ENGAGEBAY_VIDEO_TEMPLATE_JSON;
Vue.component('engagebay-video-templates', {
    props: ['videooptions', 'sele'],
    data: function () {
        return {
            video_templates: [],
            loading: true
        }
    },
    methods: {

        onSelectVideoTemplate: function (event, videoLinkTo) {

            for (var i = 0; i < ENGAGEBAY_VIDEO_TEMPLATE_JSON.length; i++) {
                var videoJSON = ENGAGEBAY_VIDEO_TEMPLATE_JSON[i];
                if (videoLinkTo.engagebay_video_id == videoJSON.id) {

                    if (videoLinkTo.hasOwnProperty('thumbnail')) ;
                    videoLinkTo.thumbnail = videoJSON.video_thumbnail_url;

                    videoLinkTo.url = videoJSON.video_url;
                }
            }
        },

    },

    mounted: function () {

        var self = this;
        if (ENGAGEBAY_VIDEO_TEMPLATE_JSON) {
            self.loading = false;
            self.video_templates = ENGAGEBAY_VIDEO_TEMPLATE_JSON;
        } else {
            $.ajax({
                type: "GET",
                url: "/rest/api/panel/video-marketing?page_size=500",
                dataType: 'json',
                contentType: "application/json",
                success: function (data) {

                    ENGAGEBAY_VIDEO_TEMPLATE_JSON = data;

                    self.loading = false;
                    self.video_templates = data;
                }
            })
        }
    },

    template: `<div v-if="loading">Loading...</div><select v-else class="form-control eb-form-control" @change="onSelectVideoTemplate($event, videooptions)"
									v-model="videooptions['engagebay_video_id']" v-input-field="'blur'">
									<option value="">--Select--</option>
									<option
										v-for="option in video_templates"
										:value="option.id">{{option.name}}</option>
								</select>`,

})

var ENGAGEBAY_FORM_JSON_ARRAY;
Vue.component('engagebay-form-list', {
    props: ['formoptions'],
    data: function () {
        return {
            forms: [],
            loading: true
        }
    },
    methods: {},

    mounted: function () {
        var self = this;
        if (ENGAGEBAY_FORM_JSON_ARRAY) {
            self.loading = false;
            self.forms = ENGAGEBAY_FORM_JSON_ARRAY;
        } else {
            $.ajax({
                type: "GET",
                url: "/rest/api/panel/leadgrabbers/bytype/STATIC?page_size=1000&sort_key=updated_time",
                dataType: 'json',
                contentType: "application/json",
                success: function (data) {

                    ENGAGEBAY_FORM_JSON_ARRAY = data;
                    self.loading = false;
                    self.forms = data;
                }
            })
        }
    },

    template: `<div v-if="loading">Loading...</div><select v-else class="form-control eb-form-control"
									v-model="formoptions['engagebay_form_id']">
									<option value="">--Select--</option>
									<option v-for="option in forms" :value="option.id">{{option.name}}</option>
								</select>`,

})

var ENGAGEBAY_POPUP_JSON_ARRAY;
Vue.component('engagebay-popup-list', {
    props: ['popupoptions', 'popupidkey'],
    data: function () {
        return {
            popups: [],
            loading: true
        }
    },
    methods: {},

    mounted: function () {
        var self = this;
        if (ENGAGEBAY_POPUP_JSON_ARRAY) {
            self.loading = false;
            self.popups = ENGAGEBAY_POPUP_JSON_ARRAY;
        } else {
            $.ajax({
                type: "GET",
                url: "/rest/api/panel/leadgrabbers?page_size=1000&sort_key=updated_time",
                dataType: 'json',
                contentType: "application/json",
                success: function (data) {

                    ENGAGEBAY_POPUP_JSON_ARRAY = data;
                    self.loading = false;
                    self.popups = data;
                }
            })
        }
    },

    template: `<div v-if="loading">Loading...</div><select v-else class="form-control eb-form-control"
									v-model="popupoptions[popupidkey]">
									<option value="">--Select--</option>
									<option v-for="option in popups" :value="option.id">{{option.name}}</option>
								</select>`,

})

Vue.component('repository-image-files', RepositoryImageFiles)


/*
 * Vue.component('font-family-select', { props : ['fontfamily', 'globals'],
 * template : "#fontFamilySelect", data : function() { return { fontFamilyClone :
 * this.fontfamily }; }, watch : { fontfamily : { handler : function(newVal,
 * oldVal) { this.fontFamilyClone = this.fontfamily;
 * utils.loadFontFamily(this.fontfamily);
 *  }, deep : true },
 *  }, methods: {
 * 
 * changefontFamily : function() { this.$emit("update-family",
 * this.fontFamilyClone); utils.loadFontFamily(this.fontFamilyClone); } }
 *  })
 */

Vue.component('font-style-settings', FontStyleSettings);

Vue.component('collection-list', CollectionList);

Vue.component('list', List)

Vue.component('cards', Cards)

Vue.component('minimal', Minimal)

Vue.component('tiles', Tiles)

Vue.component('box', Box)
Vue.component('product-component', ProductComponent)

Vue.component('collection-component', CollectionComponent)

Vue.component('article-component', ArticleComponent)
Vue.component('style-edit-form-fields', StyleEditFormFields);

Vue.component('fa-icon-library', {
    props: ['option'],
    template: "#fontAwesomeIconCollectionTemplate",
    data: function () {
        var iconList = FONT_AWESOME_ICON_LIST
        return {
            iconList: iconList,
            searchResultIconList: iconList,
            searchText: '',
        }
    },
    watch: {

        searchText: function (val, oldVal) {

            if (!val) {
                this.searchResultIconList = this.iconList
                return;
            }


            this.searchResultIconList = this.iconList
                .filter(function (icon) {
                    return icon.indexOf(val) != -1;
                });

        }

    },
    methods: {
        selectedIcon(event, iconClass) {
            this.option['icon_class'] = iconClass;

            landingpageBuilderVueRef.addState(landingpageBuilderVueRef.landingpagePrefs);

        },

        getSelectedClassName(refClass) {
            if (this.option['icon_class'] == refClass)
                return "active";
            return "";
        }

    }
});

Vue.component('content-common-settings', {
    props: ['content'],
    template: "#contentCommonSettingsTemplate",
});

Vue.component('builder-html-content', BuilderHtmlContent);

Vue.component("blockTemplate", BlockTemplate);

Vue.component("imageTemplate", ImageTemplate);

Vue.component("iconTemplate", iconTemplate);

Vue.component("socialTemplate", SocialTemplate);

Vue.component("dividerTemplate", DividerTemplate);

Vue.component("verticaldividerTemplate", VerticaldividerTemplate);

Vue.component("textTemplate", TextTemplate);

Vue.component("heading3Template", Heading3Template);


Vue.component("htmlTemplate", HtmlTemplate);

Vue.component("buttonTemplate", ButtonTemplate);
Vue.component("dropdownTemplate", DropdownTemplate);

Vue.component("spaceTemplate", SpaceTemplate);

Vue.component("videoTemplate", VideoTemplate);
Vue.component("formTemplate", FormTemplate);
Vue.component("popupTemplate", PopupTemplate);

Vue.component("navbarTemplate", NavbarTemplate);

Vue.component("section-video-background", SectionVideoBackground);


Vue.component("page-render-row-column", PageRenderRowColumn);

Vue.component("row-column", RowColumn);

Vue.component("bnavbarTemplate", NavbarTemplate);

Vue.component("navlistTemplate", NavlistTemplate);

Vue.component("searchTemplate", SearchTemplate);

Vue.component("carousalTemplate", CarousalTemplate);


Vue.component("video-render-options", VideoRenderOptions);

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
import { utils } from './app';
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

Vue.component('repository-image-files', {
    props: ['option', 'fileurlkeyname', 'modalid', 'contentid', 'allowscaling'],
    data: function () {
        return {
            repolist: [],
            loading: true,
            newfile: undefined,
            fileuploadinginprogress: false,
            imageselected: false,
            selectedURL: "",
            desktop: {width: ''},
            mobile: {width: ''},
            dummyid: utils.uid()
        }
    },
    template: "#repositoryImageFiles",
    methods: {

        imageSelectedFromList(url) {

            this.selectedURL = url;
            this.imageselected = true;
            if (!this.allowscaling) {
                this.option[this.fileurlkeyname] = this.selectedURL;

                this.$emit('closepopup');

                $('#' + this.modalid).find('.modal-close').trigger('click');

                landingpageBuilderVueRef.addState(landingpageBuilderVueRef.landingpagePrefs);

            }

        },

        useImageFullsize() {

            var self = this;

            this.option[this.fileurlkeyname] = this.selectedURL;

            $('#' + this.modalid).find('.modal-close').trigger('click');

            var img = new Image();
            img.onload = function () {

                self.option['desktop'].width = this.width;
                self.option['mobile'].width = this.width;
                self.option['desktop'].height = this.height;
                self.option['mobile'].height = this.height;

                try {
                    if (self.contentid) {
                        var sectionId = $('#' + self.contentid).attr('data-sectionid');
                        var section = landingpageBuilderVueRef.landingpagePrefs.sections.find(function (
                            sect) {
                            return sect.id == sectionId;
                        });

                        if (!section)
                            return;

                        var contentNewDesktopHeight = parseNumber(self.option['desktop'].height) + parseNumber(self.option['desktop'].top);
                        if (parseNumber(section.options['desktop'].height) < contentNewDesktopHeight) {
                            section.options['desktop'].height = contentNewDesktopHeight
                        }

                        var contentNewMobileHeight = parseNumber(self.option['mobile'].height) + parseNumber(self.option['mobile'].top);
                        if (parseNumber(section.options['mobile'].height) < contentNewMobileHeight) {
                            section.options['mobile'].height = contentNewMobileHeight
                        }

                        landingpageBuilderVueRef.addState(landingpageBuilderVueRef.landingpagePrefs);
                    }
                } catch (e) {
                }

            }
            img.src = this.selectedURL;

        },

        fitImagesize(event) {

            this.option[this.fileurlkeyname] = this.selectedURL;
            $('#' + this.modalid).find('.modal-close').trigger('click');

            var self = this;

            if (self['desktop'].width)
                self.option['desktop'].width = self['desktop'].width;

            if (self['mobile'].width)
                self.option['mobile'].width = self["mobile"].width;

            landingpageBuilderVueRef.addState(landingpageBuilderVueRef.landingpagePrefs);


            /*
             * var img = new Image(); img.src = this.selectedURL; img.onload =
             * function() {
             *
             * var height = this.height, width = this.width;
             *
             * var desktopWidth = width, mobileWidth = width;
             *
             * if(self['desktop'].width && self['desktop'].width < width)
             * desktopWidth = self['desktop'].width;
             *
             * if(self['mobile'].width && self['mobile'].width < width)
             * mobileWidth = self['mobile'].width;
             *
             * self.option['desktop'].width = desktopWidth;
             * self.option['mobile'].width = mobileWidth;
             *  }
             */

        },

        updatecontentSize($event, viewport) {
            var $ev = $(event.target);
            var self = this;
            setTimeout(function () {
                self[viewport].width = $ev.width();
            }, 200);
        },

        newFileUploaded() {

            var fileJSON = JSON.parse(this.newfile);

            fileuploadinginprogress = true;

            var data = {};
            data.title = fileJSON.file_name + '-' + new Date().toJSON();
            data.files = JSON.stringify({
                'file1': {
                    'name': fileJSON.file_name,
                    'url': fileJSON.file_url,
                    'size': fileJSON.file_size,
                    'extension': fileJSON.file_extension,
                }
            });

            var self = this;

            $.ajax({
                type: "POST",
                url: "/rest/api/panel/contentbox/repo",
                data: JSON.stringify(data),
                // dataType : 'json',
                contentType: "application/json",
                success: function (data) {
                    self.fileuploadinginprogress = false;

                    self.imageSelectedFromList(fileJSON.file_url);

                },
                error: function (error) {
                    utils.notify((error && error.responseText) ? error.responseText : error).error();
                    return;
                }
            })

        }

    },

    mounted: function () {

        var self = this;
        $.ajax({
            type: "GET",
            url: "/rest/api/panel/contentbox/repo?page_size=2000&sort_key=-created_time&file_type=png,jpg,jpeg,bmp,svg,gif",
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                self.loading = false;
                self.repolist = data;
            }
        })


    }

})


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

Vue.component("blockTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentBlockTemplate',
    methods: {}
});

Vue.component("imageTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentImageTemplate',
    methods: {}
});

Vue.component("iconTemplate", iconTemplate);

Vue.component("socialTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentSocialTemplate',
    methods: {}
});

Vue.component("dividerTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentDividerTemplate'
});

Vue.component("verticaldividerTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentVerticalDividerTemplate'
});

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

Vue.component("carousalTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentCarousalTemplate',
    methods: {

        getInterval(sec) {
            try {
                return Number(sec) * 1000;
            } catch (e) {
                return 5000;
            }
        },

        isActive(items, index) {

            var foundActive = false, isActive = false;
            for (var i = 0; i < items.length; i++) {

                if (items[i] && items[i].is_active)
                    foundActive = true;

                if (items[i] && items[i].is_active && i == index)
                    isActive = true;
            }

            if (!foundActive && !isActive && index == 0) {
                items[0].is_active = true;
                isActive = true;
            }

            return isActive;
        }
    }
});

Vue.component("style-click-action", {
    props: ['clickaction'],
    template: '#styleClickActionTemplate',
    methods: {
        getPageSection: function () {
            return landingpageBuilderVueRef.landingpagePrefs.sections;
        },
    }
});

Vue.component('navlink-style-settings', {
    props: ['navlist'],
    template: "#navlinkStyleSettingsTemplate",
    methods: {

        removeButton(event, index, navlist) {
            event.preventDefault();
            console.log('index', index);
            navlist.splice(index, 1);

        },

        cloneButton(event, button) {

            event.preventDefault();

            this.navlist.splice(this.navlist
                .indexOf(button) + 1, 0, $.extend(true, {}, button));

        },

        removeDropdownItem(event, dropdownList, index) {
            event.preventDefault();
            dropdownList.splice(index, 1);
        },

        addNewNavbarLink(event) {
            event.preventDefault();
            this.navlist.push({
                dropdown: false,
                text: 'Home',
                clickAction: {},
                dropdownList: []
            });
        },

        addNewDropdownItem(event, list) {
            event.preventDefault();
            list.push({
                text: 'Home',
                clickAction: {}
            });
        }

    }

});

Vue.component('carousal-style-settings', {
    props: ['list'],
    template: "#carousalStyleSettingsTemplate",
    data: function () {
        return {
            showCarousalImagePopup: false,
            carousalSelectedIndex: undefined
        }
    },
    methods: {

        updateAciveStatus(event, item) {

            event.preventDefault();

            this.list.forEach(function (item) {
                item.is_active = false;
            });

            item.is_active = true;

        },

        removeItem(event, index) {
            event.preventDefault();
            this.list.splice(index, 1);
        },

        cloneItem(event, item) {

            event.preventDefault();

            this.list.splice(this.list
                .indexOf(item) + 1, 0, $.extend(true, {}, item));

        },

        addNewItem(event) {
            event.preventDefault();

            this.list.forEach(function (item) {
                item.is_active = false;
            });

            this.list.push(getCarousalDefaultItem());

        }

    }

});

Vue.component("video-render-options", {
    props: ['video_options', 'renderby'],
    template: '#videoRenderOptionsTemplate',
    data: function () {
        return {
            dummyid: utils.uid()
        }
    },
    methods: {

        getVideoType() {
            var videoSubtype = this.video_options.url.split('.').slice(-1)[0];

            if (!videoSubtype || videoSubtype.indexOf("x-matroska") > -1)
                return "video/webm";

            return "video/" + videoSubtype;
        },

        getIframeVideoSrcURL(inzoomview) {

            if (this.renderby == 'builder' || (this.video_options.zoom_video && !inzoomview)) {

                if (this.video_options.type == 'youtube')
                    // return '//www.youtube.com/embed/'+
                    // this.video_options.url +
                    // '?mute=1&autoplay=0&showinfo=0&controls=0';
                    return '//www.youtube.com/embed/' + this.video_options.url + '?mute=1&rel=0&loop=0&modestbranding=1&showinfo=0&controls=0&iv_load_policy=3&autohide=1&autoplay=0&disablekb=1&fs=0&html5=1&enablejsapi=1';

                else if (this.video_options.type == 'vimeo')
                    return 'https://player.vimeo.com/video/' + this.video_options.url + '?transparent=false';

            } else {

                var loop = (this.video_options.loop) ? 1 : 0;
                var autoplay = (this.video_options.auto_play) ? 1 : 0;
                var muted = (this.video_options.muted) ? 1 : 0;

                if (this.video_options.type == 'youtube' && this.video_options.loop)
                    // return '//www.youtube.com/embed/'+
                    // this.video_options.url +
                    // '?mute=1&autoplay=0&showinfo=0&controls=0';
                    return '//www.youtube.com/embed/' + this.video_options.url + '?playlist=' + this.video_options.url + '&mute=' + muted + '&rel=0&loop=' + loop + '&modestbranding=1&showinfo=0&controls=1&iv_load_policy=3&autohide=1&autoplay=' + autoplay + '&disablekb=1&fs=1&html5=1&enablejsapi=1';

                else if (this.video_options.type == 'youtube')
                    return '//www.youtube.com/embed/' + this.video_options.url + '?mute=' + muted + '&rel=0&loop=' + loop + '&modestbranding=1&showinfo=0&controls=1&iv_load_policy=3&autohide=1&autoplay=' + autoplay + '&disablekb=1&fs=1&html5=1&enablejsapi=1';

                else if (this.video_options.type == 'vimeo')
                    return 'https://player.vimeo.com/video/' + this.video_options.url + '?transparent=0&background=0&muted=' + muted + '&autoplay=' + autoplay + '&loop=' + loop + '&badge=0&byline=0&title=0&portrait=0&controls=1';

            }


        }

    }
});

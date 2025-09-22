/* eslint-disable */
import Vue from 'vue'   
import $ from "jquery";
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

Vue.component('font-style-settings', {
    props: ['font', 'editelementtype'],
    template: "#fontStyleSettingsTemplate",
    data: function () {
        return {
            globals: builderGlobals,
        };
    },
    watch: {

        'font.linkColor': function (newVal, oldVal) {
            if (this.editelementtype == 'body') {
                utils.bodyLinkColorChanged(this.font.linkColor);
            }
        },

        'font.family': function (newVal, oldVal) {
            if (this.editelementtype == 'body') {
                utils.loadFontFamily(this.font.family);
            }
        }

    },

    methods: {

        fontStyleChanged() {
            utils.loadFontFamily(this.font.family);
        }

    }


});

Vue.component('collection-list', {
    template: "#collectionList",
    props: ['font', 'landingpageprefs'],
    created: function () {

    },
})

Vue.component('list', {
    template: "#list",
    props: ['font'],
    created: function () {

    },
})

Vue.component('cards', {
    template: "#cards",
    props: ['font'],
    created: function () {

    },
})

Vue.component('minimal', {
    template: "#minimal",
    props: ['font'],
    created: function () {

    },
})

Vue.component('tiles', {
    template: "#tiles",
    props: ['font'],
    created: function () {

    },
})

Vue.component('box', {
    template: "#box",
    props: ['font'],
    created: function () {

    },
})

Vue.component('collection-comp', {
    template: "#collection",
    props: ['collectionpagestyle', 'font', 'bodycontent'],
    created: function () {

    },
})

Vue.component('article-comp', {
    template: "#article",
    props: ['articlepagestyle', 'font', 'bodycontent'],
    created: function () {

    },
})
Vue.component('style-edit-form-fields', {
    props: ['options', 'font', 'themesettings', 'editelementtype', 'accordion', 'contenttype', 'elementid', 'element', 'viewport'],
    data: function () {
        return {
            globals: builderGlobals,
            navBrandImagePopup: false
        };
    },
    template: "#styleEditFormFields",
    created: function () {

    },
    mounted: function () {

        utils.initTooltips();

    },
    watch: {

        /*
         * options : { handler : function(newVal, oldVal) {
         *
         * var self= this;
         *
         * if(this.editelementtype == 'body') { if(self.options &&
         * self.options.desktopContentWidth) self.desktopContentWidthRef =
         * self.options.desktopContentWidth;
         *
         * self.bodyLinkColorChanged(self.options.font.linkColor);
         *  }
         *  }, deep : true },
         */

    },

    methods: {

        initValue(json, key, initVal) {
            try {
                if (!json[key])
                    json[key] = initVal;
            } catch (e) {
            }
        },

        showModal(ref) {
            this.$root.$emit('bv::show::modal', ref);
        },

        hideModal(ref) {
            this.$root.$emit('bv::hide::modal', ref);
        },

        /*
            * updateFontFamily(newFamily){ this.options['font']['family'] =
            * newFamily; },
            */

        isContentHasHeightProperity() {

            if (!this.contenttype || ['text', 'heading3', 'divider', 'icon'].indexOf(this.contenttype) > -1)
                return false;

            return true;

        },

        isContentHasWidthProperity() {

            if (!this.contenttype || ['verticaldivider', 'icon'].indexOf(this.contenttype) > -1)
                return false;

            return true;

        },

        borderWidthChanged(newVal) {

            if (this.contenttype && this.contenttype == "verticaldivider") {
                this.options['desktop'].width = Number(newVal) + 10;
                this.options['mobile'].width = Number(newVal) + 10;
            }

            landingpageBuilderVueRef.addState(landingpageBuilderVueRef.landingpagePrefs);

        },

        viewportVisibilityChanged(viewport) {

            // landingpageBuilderVueRef.activeSettingsElement
            // Check element positions

        },

        getPageSection: function () {

            return landingpageBuilderVueRef.landingpagePrefs.sections;

            /*var arr = [];
            landingpageBuilderVueRef.landingpagePrefs.sections.forEach(function(
                    section) {
                arr.push(section.id);
            });
            return arr;*/
        },

        editBodyContentWidth: function (options, actionType) {

            var newVal;

            try {
                if (actionType == "substract") {
                    var newVal = Number(this.options.desktopContentWidth) - 50;
                } else
                    var newVal = Number(this.options.desktopContentWidth) + 50;

                if (newVal > 0) {
                    this.options.desktopContentWidth = parseNumber(newVal);
                }

                landingpageBuilderVueRef.addState(landingpageBuilderVueRef.landingpagePrefs);

            } catch (e) {
            }

        },

        addNewAction(index) {

            this.options.action_list.splice(index, 0, {
                text: 'action',
                link: ''
            });

        },
        removeAction(remaction) {
            this.options.action_list = this.options.action_list.filter(function (action) {
                return action != remaction;
            });

        },

        alignContent(position) {

            var self = this;
            landingpageBuilderVueRef.landingpagePrefs.sections.forEach(function (
                section) {

                section.columns[0].contents.forEach(function (content) {

                    if (content.id != self.elementid)
                        return;

                    var viewport = landingpageBuilderVueRef.activeViewport;
                    var sectionHeight = $('#' + section.columns[0].id + '.' + viewport).height(),
                        sectionWidth = $('#' + section.columns[0].id + '.' + viewport).width();
                    var contentHeight = $('#' + content.id).height(), contentWidth = $('#' + content.id).width();

                    if (position == "h-left") {
                        self.options[viewport].left = 0;
                    } else if (position == "h-center") {
                        self.options[viewport].left = (sectionWidth / 2) - (contentWidth / 2);
                    } else if (position == "h-right") {
                        self.options[viewport].left = sectionWidth - contentWidth;
                    } else if (position == "v-top") {
                        self.options[viewport].top = 0;
                    } else if (position == "v-center") {
                        self.options[viewport].top = (sectionHeight / 2) - (contentHeight / 2);
                    } else if (position == "v-bottom") {
                        self.options[viewport].top = sectionHeight - contentHeight;
                    }

                });

            });

        }

    }

});

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

Vue.component('builder-html-content', {
    props: ['prefs'],
    template: "#builderHTMLContent",
});

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

Vue.component("iconTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentIconTemplate',
    methods: {}
});

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

Vue.component("textTemplate", {
    props: ['content', 'viewport', 'renderby'],
    data: function () {
        return {
            clonedText: "",
        };
    },
    created: function () {
        this.clonedText = this.content.options.text;
    },
    template: '#contentTextTemplate',
});

Vue.component("heading3Template", {
    props: ['content', 'viewport', 'renderby'],
    data: function () {
        return {
            clonedText: "",
        };
    },
    created: function () {
        this.clonedText = this.content.options.text;
    },
    template: '#contentHeading3Template',
});


Vue.component("htmlTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentHTMLTemplate'
});

Vue.component("buttonTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentButtonTemplate'
});
Vue.component("dropdownTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentDropdownTemplate',
    methods: {}
});

Vue.component("spaceTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentSpaceTemplate'
});

Vue.component("videoTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentVideoTemplate',
});
Vue.component("formTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentFormTemplate'
});
Vue.component("popupTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentPopupTemplate'
});

Vue.component("navbarTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentNavbarTemplate'
});

Vue.component("section-video-background", {
    props: ['video', 'renderby'],
    template: '#secctionVideoBackgroundTemplate',
    methods: {

        getVideoType() {
            return "video/" + this.video.url.split('.').slice(-1)[0]
        },

        getIframeVideoSrcURL() {

            if (this.renderby == 'builder') {

                if (this.video.type == 'youtube')
                    // return '//www.youtube.com/embed/'+ this.video.url +
                    // '?mute=1&autoplay=0&showinfo=0&controls=0';
                    return '//www.youtube.com/embed/' + this.video.url + '?mute=1&rel=0&loop=1&modestbranding=1&showinfo=0&controls=0&iv_load_policy=3&autohide=1&autoplay=0&disablekb=1&fs=0&html5=1&enablejsapi=1';

                else if (this.video.type == 'vimeo')
                    return 'https://player.vimeo.com/video/' + this.video.url + '?background=1&muted=1&autoplay=0&loop=1&badge=0&byline=0&title=0&portrait=0&transparent=false';

            } else {

                if (this.video.type == 'youtube')
                    // return '//www.youtube.com/embed/'+ this.video.url +
                    // '?mute=1&autoplay=0&showinfo=0&controls=0';
                    return '//www.youtube.com/embed/' + this.video.url + '?mute=1&rel=0&loop=1&modestbranding=1&showinfo=0&controls=0&iv_load_policy=3&autohide=1&autoplay=1&disablekb=1&fs=0&html5=1&enablejsapi=1';

                else if (this.video.type == 'vimeo')
                    return 'https://player.vimeo.com/video/' + this.video.url + '?background=1&muted=1&autoplay=1&loop=1&badge=0&byline=0&title=0&portrait=0&transparent=false';


            }


        }

    }
});


Vue.component("page-render-row-column", {
    props: ['columns'],
    template: '#builderPageRenderRowColumn',
    methods: {
        getColumnClassNameWithoutViewport(column) {

            console.log('column.size', column.size);
            return (!column.auto_width && column.size > 0) ? 'col-md-' + column.size : 'col-md';

        }
    }
});

Vue.component("row-column", {
    props: ['columns', 'viewport'],
    template: '#rowColumnTemplate',
    methods: {

        activateSelectedElement: function ($event, editElement, elementType) {
            landingpageBuilderVueRef.activateSelectedElement($event, editElement, elementType);
        },
        activateSettingsElement: function ($event, editElement, elementType) {
            landingpageBuilderVueRef.activateSettingsElement($event, editElement, elementType);
        },

        getContentName(contentType) {

            var contentName = contentType;
            getBuilderDefaultSettings().contents.forEach(function (content) {
                if (content.type == contentType)
                    contentName = content.primary_head;
            });
            return contentName;

        },

        checkAnyColumnHasContent(columns) {
            var hasContent = false;
            columns.forEach(function (column) {
                if (column.contents && column.contents.length > 0)
                    hasContent = true;
            });
            return hasContent;
        },

        onAddContent(event, column) {

            var self = this;

            var refContent = column.contents[event.newIndex];
            if (!refContent || refContent.type != 'block' || !refContent.ask_column_confirmation)
                return;

            refContent.ask_column_confirmation = false;
            delete refContent["ask_column_confirmation"];

            // Show a modal popup
            landingpageBuilderVueRef.modalPopup.modalType = 'columnConfirmation';
            landingpageBuilderVueRef.modalPopup.showModal = true;
            landingpageBuilderVueRef.modalPopup.heading = "Select Columns";
            landingpageBuilderVueRef.modalPopup.modalData = {
                columns: 1
            };
            landingpageBuilderVueRef.modalPopup.callback = function (data) {

                if (landingpageBuilderVueRef.modalPopup.modalData.columns == 1)
                    return;

                for (var i = 0; i < landingpageBuilderVueRef.modalPopup.modalData.columns; i++) {
                    if (refContent.columns.length < (i + 1))
                        refContent.columns.push(getDefaultColumnOptions());
                }

            };

        },

        cloneContent(event, column, content) {
            landingpageBuilderVueRef.cloneContent(event, column, content);
        },

        removeContent(event, column, remContent) {
            landingpageBuilderVueRef.removeContent(event, column, remContent)
        },

        getColumnClassName(column, viewport) {

            if (viewport && viewport == 'mobile')
                return "";

            return (!column.auto_width && column.size > 0) ? 'col-md-' + column.size : 'col';

        },

        activeElementId() {
            try {
                return landingpageBuilderVueRef.activeElementId;
            } catch (e) {
                return "";
            }

        },

        activateSelectedElement(event, content, type) {
            landingpageBuilderVueRef.activateSelectedElement(event, content, type);
        },

        onMove: function () {

            try {
                tinymce.editors.forEach(function (editor) {
                    return editor.hide();
                });
            } catch (e) {
            }

        },
        onMoveEnd: function () {

            landingpageBuilderVueRef.addState(this.landingpagePrefs);

            try {
                tinymce.editors.forEach(function (editor) {
                    return editor.show();
                });
            } catch (e) {
            }

        },

    }
});

Vue.component("bnavbarTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentNavbarTemplate'
});

Vue.component("navlistTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentNavbarListTemplate'
});

Vue.component("searchTemplate", {
    props: ['content', 'viewport', 'renderby'],
    template: '#contentSearchTemplate'
});

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

<template id="repositoryImageFiles">

    <!-- <div v-if="loading">Loading...</div> -->
    
    <div >
    
        <div class="repo-file-container" v-if="!imageselected">
        
            <div  v-input-file-upload class="upload-image-container">
                                                    
                <div class="upload">
                    
                    <div class="upload-image">
                        <input id="imageSRCUPload" class="inputfile" type="file">
                        <label for="imageSRCUPload" >
                        
                            <i class="fa fa-plus"></i> Upload Image 
                         
                         <img class="uploading" style="display:none;" :style="{display: fileuploadinginprogress ? 'inline' : 'none'}" src="https://d2p078bqz5urf7.cloudfront.net/cloud/dev/assets/img/loader/facebook.gif"></label>
                            
                        </div>
                    </div>
                    
                    <input type="text" class="file-obj d-none" v-model="newfile" @input="newFileUploaded()"/>
            </div>
        
            <div v-for="option in repolist" class="repo-file">
                <img :src="option.url" height="100" width="100" @click="imageSelectedFromList(option.url)">
            </div>
        
        </div>
        
        <div v-if="imageselected">
            <h3 class="text-center pb-3 text-muted">Would you like to scale it to fit within the content or keep it full size?</h3>
            <div class="text-center pb-3">
                <span class="btn btn-outline-warning mr-2 btn-sm" @click="useImageFullsize()">Use full size</span>
                <span class="btn btn-warning mr-2 btn-sm" @click="fitImagesize($event)">Scale image to fit</span>
                
                
            </div>
        </div>
        
        <div  v-if="allowscaling">
            <img style="display:none;" :src="selectedURL" :height="option.desktop.height" width="auto" @load="updatecontentSize($event, 'desktop')">
            <img style="display:none;" :src="selectedURL" :height="option.mobile.height" width="auto" @load="updatecontentSize($event, 'mobile')">
        </div>
    
    </div>
                                    
    </template>
<script>
import { utils } from '../app';
import $ from 'jquery';
import { parseNumber } from '../directive';

export default {
  name: "repositoryImageFiles",
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
  methods: {

    imageSelectedFromList(url) {

      this.selectedURL = url;
      this.imageselected = true;
      if (!this.allowscaling) {
        this.option[this.fileurlkeyname] = this.selectedURL;

        this.$emit('closepopup');

        $('#' + this.modalid).find('.modal-close').trigger('click');

        window.landingpageBuilderVueRef.addState(window.landingpageBuilderVueRef.landingpagePrefs);

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
            var section = window.landingpageBuilderVueRef.landingpagePrefs.sections.find(function (
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

            window.landingpageBuilderVueRef.addState(window.landingpageBuilderVueRef.landingpagePrefs);
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

      window.landingpageBuilderVueRef.addState(window.landingpageBuilderVueRef.landingpagePrefs);


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
}
</script>

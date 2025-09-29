<template id="carousalStyleSettingsTemplate">

    <div>
    
    <div>
                                              <b-modal v-model="showCarousalImagePopup" size="xl" ref="carousalModalPopup">
                                              
                                              <template v-slot:modal-title>
                                                  <span style="font-size:20px;">Choose Image</span>
                                                </template>
                                                
                                                  <b-container fluid>

                                                      <repository-image-files :allowscaling="false" :option="list[carousalSelectedIndex]" :fileurlkeyname="'img_url'" @closepopup="showCarousalImagePopup=false"></repository-image-files>

                                                  </b-container>
                                                  
                                                   <template v-slot:modal-footer>
                                                    <div>
                                                        <span class="btn btn-outline-warning mr-2 btn-sm modal-close" @click="showCarousalImagePopup=false">Close</span>
                                                        <!-- <span class="btn btn-warning mr-2 btn-sm" @click="hideModal('bgImageModalPopup')">Okay</span>  -->
                                                    </div>
                                                  </template>
                                                
                                              </b-modal>
                                            </div>
                                            
    
                <div class="text-right mb-2">
                            <a href="#"  @click="addNewItem($event)">Add a new item</a>
                    </div>
                    
                            <draggable 
                                    :list="list"
                                    :options="{group: {name: 'carousalList', put: true}, sort: true, handle: '.move-section'}"
                                    @sort="updateInlineEditorContent()"
                                    >
                                
                                <div class="section-list-item settings-accordion" v-settings-accordion v-for="(item, index) in list" 
                                    style="padding: 10px; background: #f6f6f6; margin-bottom: 10px;">
                                
                                    <div class="row section-item-actions m-0 p-0" style="margin-bottom: 2px;">
                                            <div class="col no-gutter p-0" style="max-width: 20px;">
                                                <span class="icon cursor-move"><i class="move-section fa fa-arrows"></i></span>
                                            </div>
                                            <div class="col no-gutter p-0">
                                                <div v-html="item['content']" class="inline-text-container text-truncate" style="max-width: 120px;"> </div>
                                            </div>
                                            <div class="col text-right no-gutter p-0" style="max-width: 60px;">
                                                <span class="cursor-pointer pl-1" @click="updateAciveStatus($event, item)"><i class="fa fa-eye" title="View Item" style="display: inline;"></i> </span>
                                                <span class="cursor-pointer pl-1" @click="removeItem($event, index)"><i class="fa fa-remove" title="Remove Item" style="display: inline;"></i> </span>
                                                <span class="cursor-pointer pl-1" @click="cloneItem($event, item)"><i class="fa fa-clone" title="Clone Item" style="display: inline;"></i> </span>
                                                <span class="accordion-toggle-body font-size-13 cursor-pointer pl-1"><i class="fa fa-angle-down accordion-open"></i><i class="fa fa-angle-right accordion-close"></i></span>
                                            </div>
                                            
                                        </div>
                                        
                                        <div class="settings-accordion-body">
                                        
                                            <div class="form-group">
                                                <label>Text</label>
                                                <div class="">
                                                    <div class="inline-text-editor tinymce-content" v-tinymce-editor-inline-elements :data-initialize-content="item['content']"></div>
                                                    <textarea style="display:none;visibility:hidden" v-model="item['content']" @change="updateAciveStatus($event, item)"></textarea>    
                                                </div>
                                            </div>
                                            
                                            <!-- <div class="form-group">
                                                 <div class="form-check form-check-inline1 mb-3">
                                                      <input v-input-field="'change'" class="form-check-input" value="image" type="radio" v-model="item.thumbnail" id="carousalThumbnailImage">
                                                      <label class="form-check-label" for="carousalThumbnailImage">
                                                         Image
                                                      </label>
                                                    </div>
                                                    
                                                    <div class="form-check form-check-inline1 mb-3">
                                                      <input v-input-field="'change'" class="form-check-input" value="video" type="radio" v-model="item.thumbnail" id="carousalThumbnailVideo">
                                                      <label class="form-check-label" for="carousalThumbnailVideo">
                                                        Video
                                                      </label>
                                                    </div>
                                             </div>
                                              -->
                                            
                                            <style-video-settings v-if="item.thumbnail == 'video'" :video_options="item['video_options']"></style-video-settings>
                                            
                                            <div  class="form-group" v-if="item.thumbnail == 'image'">
                                            
                                        <label >Image</label>
                                        <div class="d-flex">
                                            <div v-if="item['img_url']" style="width: 80px;padding: 10px">
                                                <img :src="item['img_url']" width="100%" height="auto" class="display-image" alt="" />
                                            </div>
                                            
                                            <div class="flex-grow-1">
                                                    <span class="btn btn-info btn-sm d-block mb-2" @click="carousalSelectedIndex=index,showCarousalImagePopup=true">Change Image </span>
                                                    <input type="text" class="form-control eb-form-control image-path" v-input-field="'blur'"
                                                            v-model="item['img_url']" @change="updateAciveStatus($event, item)" placeholder="Image URL"/>			
                                            </div>
                                            
                                        </div>
                                    </div>
                                         
                                        </div>
                                    
                                    
                                </div>
                                
                                </draggable>
    
    </div>
    
    </template>
<script>
import { getCarousalDefaultItem } from '../global';
import $ from 'jquery';

export default {
  name: "carousalStyleSettings",
  props: ['list'],
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
}
</script>

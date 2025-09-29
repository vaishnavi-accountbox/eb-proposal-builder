<template id="contentCarousalTemplate">

    <div >
    
    <div v-if="renderby=='builder'" 
        :class="[content.options.carousal_style, {'ml-auto': content.options.align == 'right', 'm-auto': content.options.align == 'center', 'mr-auto': content.options.align == 'left'} ]"
                :style="{width: (content.options.full_width) ? '100%' :	getDimensions(content.options.width)}"
        :id="'carousel'+viewport+content.id" class="carousel slide" data-ride="carousel">
      <ol v-if="content.options.stage_indicators" class="carousel-indicators">
        <li v-for="(item, index) in content.options.carousal_items" :class="{'active': isActive(content.options.carousal_items, index)}" :data-target="'carousel'+viewport+content.id" :data-slide-to="index" :style="{'background-color': content.options.controls_color}"></li>
      </ol>
      <div class="carousel-inner" 
      :class="[content.options.carousal_style, {'ml-auto': content.options.align == 'right', 'm-auto': content.options.align == 'center', 'mr-auto': content.options.align == 'left'} ]"
      >
        <div v-for="(item, index) in content.options.carousal_items" 
        :class="{'active': isActive(content.options.carousal_items, index)}" class="carousel-item" >
          
          <img  class="carousal-thumbnail" v-if="item.thumbnail == 'image' && item.img_url" :src="item.img_url" :style="{height: content.options.thumbnail_size.height+'px', width: content.options.thumbnail_size.width+'px'}" />
             
          <div class="carousal-thumbnail" v-if="item.thumbnail == 'video'" :style="{height: getDimensions(content.options.thumbnail_size.height), width: content.options.thumbnail_size.width+'%'}" >
                    <video-render-options :renderby="renderby" :video_options="item.video_options"></video-render-options>
          </div>
        
            <div v-if="item.content" class="carousel-description" v-html="item.content">
              </div>
          
        </div>
    
      </div>
      
      <a v-if="content.options.controls" class="carousel-control-prev" href="#" role="button" data-slide="prev">
       <span aria-hidden="true" class="fa fa-chevron-left chevron" :style="{color: content.options.controls_color}"></span>
      </a>
      <a v-if="content.options.controls" class="carousel-control-next" href="#" role="button" data-slide="next">
        <span aria-hidden="true" class="fa fa-chevron-right chevron" :style="{color: content.options.controls_color}"></span>
      </a>
    </div>
    
    <div v-if="renderby=='page'" 
          :class="[content.options.carousal_style, {'ml-auto': content.options.align == 'right', 'm-auto': content.options.align == 'center', 'mr-auto': content.options.align == 'left'} ]"
            :style="{height: getDimensions(content.options.height), width: (content.options.full_width) ? '100%' :	getDimensions(content.options.width)}"
        :data-ride="(content.options.auto_play) ? 'carousal' : ''" :data-interval="getInterval(content.options.interval_in_sec)" :id="'carousel'+viewport+content.id" class="carousel slide" >
      <ol v-if="content.options.stage_indicators" class="carousel-indicators">
        <li v-for="(item, index) in content.options.carousal_items" :class="{'active': index == 0}" :data-target="'#carousel'+viewport+content.id" :data-slide-to="index" :style="{'background-color': content.options.controls_color}"></li>
      </ol>
      <div class="carousel-inner" :class="[content.options.carousal_style]" >
        <div v-for="(item, index) in content.options.carousal_items" :style="{height: getDimensions(content.options.height), width: (content.options.full_width) ? '100%' : getDimensions(content.options.width)}" 
        :class="{'active': index == 0}" class="carousel-item" >
          
          <img  class="carousal-thumbnail" v-if="item.thumbnail == 'image' && item.img_url" :src="item.img_url" :style="{height: getDimensions(content.options.thumbnail_size.height), width: content.options.thumbnail_size.width+'px'}" />
             
          <div class="carousal-thumbnail" v-if="item.thumbnail == 'video'" :style="{height: content.options.thumbnail_size.height+'px', width: content.options.thumbnail_size.width+'px'}" >
                    <video-render-options :renderby="renderby" :video_options="item.video_options"></video-render-options>
          </div>
        
            <div v-if="item.content" class="carousel-description" v-html="item.content">
              </div>
          
        </div>
    
      </div>
      
      <a v-if="content.options.controls" class="carousel-control-prev" :href="'#carousel'+viewport+content.id" role="button" data-slide="prev">
       <span aria-hidden="true" class="fa fa-chevron-left chevron" :style="{color: content.options.controls_color}"></span>
      </a>
      <a v-if="content.options.controls" class="carousel-control-next" :href="'#carousel'+viewport+content.id" role="button" data-slide="next">
        <span aria-hidden="true" class="fa fa-chevron-right chevron" :style="{color: content.options.controls_color}"></span>
      </a>
      
    </div>
    </div>
    </template>
<script>
export default {
  name: "carousalTemplate",
  props: ['content', 'viewport', 'renderby'],
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
}
</script>
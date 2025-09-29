<template id="videoRenderOptionsTemplate">

    <div style="position: relative;height: 100%;" v-if="video_options.url && video_options.type">

        <div :data-target="'#videoModal_'+dummyid" class="content-overlay" data-toggle="modal"
             v-if="renderby=='builder'"></div>

        <div :data-target="'videoModal_'+dummyid" class="video-overlay bmodal-toggle"
             v-if="renderby=='page' && video_options.zoom_video"></div>

        <video :class="{'muted-video' : video_options.muted,
					 		'video-autoplay': renderby=='page' && video_options.auto_play && !video_options.zoom_video}"
               :loop="video_options.loop"
               :poster="video_options.thumbnail" class="inline-video-play"
               controls
               height="100%"
               onclick="return false;"
               style="max-width:100%;box-sizing: border-box;"
               v-if="video_options.type == 'engagebay'"
               width="100%">

            <source :src="video_options.url" :type="getVideoType()">

            Your browser does not support the video tag.
        </video>

        <iframe :src="getIframeVideoSrcURL()" allowfullscreen class="no-border" frameborder="0"
                height="100%" mozallowfullscreen
                v-if="video_options.type == 'youtube' || video_options.type == 'vimeo' " webkitallowfullscreen
                width="100%">

        </iframe>

        <!-- Modal -->
        <div :aria-labelledby="'#videoModalLabel_'+dummyid" :class="['videoModal_'+dummyid]"
             aria-hidden="true" class="modal fade video-modal" tabindex="-1"
             v-if="renderby=='page' && video_options.zoom_video">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">

                    <div class="modal-body p-0">

                        <button aria-label="Close" class="close btn btn-default" data-dismiss="modal" type="button">
                            <span aria-hidden="true" class="fa fa-times-circle"></span>
                        </button>

                        <video :class="{'muted-video': video_options.muted, 'zoom-video-autoplay': video_options.auto_play}"
                               :loop="video_options.loop" :muted="video_options.muted"
                               :poster="video_options.thumbnail"
                               class=""
                               controls
                               height="100%" onclick="return false;"
                               style="max-width:100%;box-sizing: border-box;" v-if="video_options.type == 'engagebay'"
                               width="100%">

                            <source :src="video_options.url" :type="getVideoType(true)">

                            Your browser does not support the video tag.
                        </video>

                        <iframe :src="getIframeVideoSrcURL(true)" allowfullscreen class="no-border" frameborder="0"
                                height="100%"
                                mozallowfullscreen
                                v-if="video_options.type == 'youtube' || video_options.type == 'vimeo' "
                                webkitallowfullscreen width="100%">

                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { utils } from '../app';

export default {
  name: "videoRenderOptions",
  props: ['video_options', 'renderby'],
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
}
</script>

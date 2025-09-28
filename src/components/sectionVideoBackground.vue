<template id="sectionVideoBackgroundTemplate">

	<div>

		<div style="
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    object-fit: cover;
    z-index: 0;
    background: #000;
"></div>


		<video v-if="renderby=='builder' && video.type == 'engagebay' " class="section-background-video" muted loop>
			<source :src="video.url" :type="getVideoType(video.url)">
			Your browser does not support HTML5 video.
		</video>
		<video v-else-if="video.type == 'engagebay'" class="section-background-video" muted loop autoplay>
			<source :src="video.url" :type="getVideoType(video.url)">
			Your browser does not support HTML5 video.
		</video>


		<iframe class="section-background-video" :src="getIframeVideoSrcURL()"
				v-if=" video.type == 'youtube' || video.type == 'vimeo' " frameborder="0" allow="autoplay; encrypted-media">

		</iframe>

	</div>

</template>
<script>
export default {
  name: "sectionVideoBackground",
  props: ['video', 'renderby'],
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
}
</script>
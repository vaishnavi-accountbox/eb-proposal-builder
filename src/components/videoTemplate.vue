<template id="contentVideoTemplate">

    <div class="row m-0">
        <div class="col-lg-12 p-0"
             v-if="content.options.video_options.url && content.options.video_options.type">
            <div :class="{'ml-auto': content.options.align == 'right', 'm-auto': content.options.align == 'center', 'mr-auto': content.options.align == 'left'}"
                 :style="{'width':(content.options.full_width) ? '100%' : getDimensions(content.options.width), 'height': getDimensions(content.options.height)}">
                <video-render-options :renderby="renderby"
                                      :video_options="content.options.video_options"></video-render-options>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  name: "videoTemplate",
  props: ['content', 'viewport', 'renderby'],
}
</script>

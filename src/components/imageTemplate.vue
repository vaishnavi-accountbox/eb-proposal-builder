<template id="contentImageTemplate">

    <div class="row m-0">
        <div class="col-lg-12 p-0">

            <div :style="{'text-align': content.options.align}" class="" style="line-height: normal;"
                 v-if="renderby=='builder'">

                <img :src="content.options.image" :style="getSelectedStyles( content.options, {}, ['image_border'])"
                     :width="(content.options.full_width) ? '100%' :	getDimensions(content.options.width)"
                     border="0"
                     height="getDimensions(content.options.height)"
                     style="max-width:100%;box-sizing: border-box;outline:none;" tabindex="0">

            </div>

            <div :style="{'text-align': content.options.align}" class="" v-if="renderby=='page'">

                <img :alt="content.options.altText"
                     :class="{'engagebay-lp-button' : content.options.clickAction.type!='none' && content.options.clickAction.value}"
                     :data-actionType="content.options.clickAction.type"
                     :data-actionValue="content.options.clickAction.value"
                     :src="content.options.image"
                     :style="getSelectedStyles( content.options, {}, ['image_border'])" :title="content.options.title"
                     :width="(content.options.full_width) ? '100%' : getDimensions(content.options.width)"
                     height="getDimensions(content.options.height)"
                     style="max-width:100%;box-sizing: border-box;outline:none;" tabindex="0">

            </div>

        </div>
    </div>

</template>
<script>
export default {
  name: "imageTemplate",
  props: ['content', 'viewport', 'renderby'],
  methods: {}
}
</script>
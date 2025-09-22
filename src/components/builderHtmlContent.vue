<template id="builderHTMLContent">

    <div class="builder-html-content" style="display:none;">

        <div :class="['section-page-content', 'section-'+section.id]" v-for="section in prefs.sections">
            <div :class="[getFontFamilyClassName(prefs.bodySettings.font)]"
                 :style="getSelectedStyles(section.options, {}, ['background', 'border', 'box-shadow', 'margin'])"
                 style="position: relative;">

                <section-video-background
                        :renderby="'page'"
                        :video="section.options.background.video"
                        v-if="section.options.background.type == 'video' && section.options.background.video.url"></section-video-background>

                <div :class="[getContainerClass(prefs.bodySettings.contentWidth)]"
                     :style="getSelectedStyles(section.options, {}, ['padding'])">

                    <page-render-row-column :columns="section.columns">

                    </page-render-row-column>

                </div>

            </div>


        </div>


    </div>
</template>

<script>
export default {
  name: 'builderHtmlContent',
  props: ['prefs'],
}
</script>
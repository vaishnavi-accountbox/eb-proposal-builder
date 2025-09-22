<template id="contentHeading3Template">

    <div class="row m-0">
        <div class="col-lg-12 p-0">

            <div :class="[getFontFamilyClassName(content.options.font)]"
                 :style="{'text-align': content.options.font.alignment}"
                 v-if="renderby=='builder'">

                <div :data-initialize-content="content.options.text"
                     :data-old-toolbar="(content.options.font)?'':'true'"
                     class="tinymce-content"
                     v-tinymce-editor="content.options.text"></div>
                <textarea style="display:none;visibility:hidden" v-model="content.options.text"></textarea>

            </div>

            <div :class="[getFontFamilyClassName(content.options.font)]"
                 :style="{'text-align': content.options.font.alignment}"
                 v-html="content.options.text" v-if="renderby=='page'">
            </div>

        </div>
    </div>
</template>
<script>
export default {
  name: "heading3Template",
  props: ['content', 'viewport', 'renderby'],
  data: function () {
    return {
      clonedText: "",
    };
  },
  created: function () {
    this.clonedText = this.content.options.text;
  },
}
</script>
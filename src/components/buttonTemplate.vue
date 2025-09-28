<template id="contentButtonTemplate">

    <div class="row m-0">
        <div class="col-lg-12 p-0">

            <div :style="{'text-align': content.options.align}" style="position: relative;line-height: normal;"
                 v-if="renderby=='builder'">

                <button :class="[getFontFamilyClassName(content.options.font)]"
                        :style="getSelectedStyles(content.options, {}, ['buttonPadding', 'buttonBackground', 'buttonBorder'])"
                        class="btn btn-default"
                        style="font-size: inherit; color: inherit; font-weight: inherit; font-family: inherit; line-height: inherit;word-break: break-word;outline:none;line-height: normal;padding:0;"
                >{{ content.options.buttonText }}
                </button>

            </div>

            <div :style="{'text-align': content.options.align}" style="line-height: normal;" v-if="renderby=='page'">
                <button :class="[getFontFamilyClassName(content.options.font)]"
                        :data-actionType="content.options.clickAction.type"
                        :data-actionValue="content.options.clickAction.value"
                        :style="getSelectedStyles(content.options, {}, ['buttonPadding','buttonBackground', 'buttonBorder'])"
                        class="btn btn-default engagebay-lp-button"
                        style="font-size: inherit; color: inherit; font-weight: inherit; font-family: inherit; line-height: inherit;word-break: break-word;outline:none;line-height: normal;padding:0;"
                >{{ content.options.buttonText }}
                </button>
            </div>

        </div>
    </div>

</template>
<script>
export default {
  name: "buttonTemplate",
  props: ['content', 'viewport', 'renderby'],
}
</script>

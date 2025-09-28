<template id="contentDropdownTemplate">

    <div class="row m-0">
        <div class="col-lg-12 p-0">

            <div :style="{'text-align': content.options.align}" style="position: relative;line-height: normal;"
                 v-if="renderby=='builder'">

                <div class="dropdown">
                    <button :class="[getFontFamilyClassName(content.options.font)]"
                            :style="getSelectedStyles(content.options, {}, ['buttonPadding', 'buttonBackground', 'buttonBorder'])"
                            aria-expanded="false"
                            aria-haspopup="true" class="btn btn-default dropdown-toggle" data-toggle="dropdown"
                            style="font-size: inherit; color: inherit; font-weight: inherit; font-family: inherit; line-height: inherit;word-break: break-word;outline:none;line-height: normal;padding:0;"
                            type="button">
                        {{ content.options.buttonText }}
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                    </div>
                </div>

            </div>

            <div :style="{'text-align': content.options.align}" style="line-height: normal;" v-if="renderby=='page'">

                <div :class="[getFontFamilyClassName(content.options.font)]" class="dropdown">
                    <button
                            :style="getSelectedStyles(content.options, {}, ['buttonPadding', 'buttonBackground', 'buttonBorder'])"
                            aria-expanded="false"
                            aria-haspopup="true" class="btn btn-default dropdown-toggle" data-toggle="dropdown"
                            style="font-size: inherit; color: inherit; font-weight: inherit; font-family: inherit; line-height: inherit;word-break: break-word;outline:none;line-height: normal;padding:0;"
                            type="button">
                        {{ content.options.buttonText }}
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                        <a :href="action.link" class="dropdown-item" target="_blank"
                           v-for="action in content.options['action_list']"
                           v-if="action.link">{{action.text}}</a>
                    </div>
                </div>

            </div>

        </div>
    </div>

</template>
<script>
export default {
  name: "dropdownTemplate",
  props: ['content', 'viewport', 'renderby'],
}
</script>   
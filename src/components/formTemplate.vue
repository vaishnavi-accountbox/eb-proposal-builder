<template id="contentFormTemplate">

    <div class="row m-0">
        <div class="col-lg-12 p-0">

            <div :style="{'text-align': content.options.align}" style="overflow: hidden;" v-if="renderby=='builder'">
                <div class="content-overlay"></div>
                <iframe :src="'/landingpage-builder/inline-form.jsp?id=' + content.options.form_options.engagebay_form_id"
                        :style="{height: content.options.height+'px', width: content.options.width+'px'}"
                        allowtransparency="true"
                        style="overflow:hidden;border: none;"
                        v-if="content.options.form_options.engagebay_form_id"></iframe>
                <div :style="{height: content.options.height+'px'}" class="row align-items-center"
                     style="overflow: hidden;background: #f6f6f6;"
                     v-else>
                    <div class="col">
                        <div class="p-2 text-center">
                            <div><i class="fa fa-server"></i></div>
                            <div>Please select a form</div>
                        </div>
                    </div>
                </div>
            </div>

            <div :style="{'text-align': content.options.align}"
                 style="line-height: normal;overflow-y:auto;overflow-x:auto;"
                 v-if="renderby=='page'">
                <div :data-id="content.options.form_options.engagebay_form_id"
                     :id="'eh_form_'+content.options.form_options.engagebay_form_id"
                     :style="{'text-align': content.options.align}"
                     class="engage-hub-form-embed"></div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
  name: "formTemplate",
  props: ['content', 'viewport', 'renderby'],
}
</script>

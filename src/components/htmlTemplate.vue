<template id="contentHTMLTemplate">

    <div class="row m-0">
        <div class="col-lg-12 p-0">

            <div :style="{height: content.options.height+'px'}" style="background: #f6f6f6;" v-if="renderby=='builder'">
                <div :style="{height: content.options.height+'px'}" class="row align-items-center"
                     style="overflow: hidden;">
                    <div class="col">
                        <div class="p-2 text-center">
                            <div><i class="fa fa-code"></i></div>
                            <div>View HTML in preview mode</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style="overflow-y:auto;overflow-x:auto;" v-if="renderby=='page'">

                <iframe :data-srcdoc="content.options.html"
                        :style="{height: content.options.height+'px',width: content.options.width+'px'}"
                        class="lp-html-content-frame" frameborder="0"
                        onload="loadHTMLTypeContentInFrame(this)"></iframe>

            </div>

        </div>
    </div>

</template>
<script>
export default {
  name: "htmlTemplate",
  props: ['content', 'viewport', 'renderby'],
}
</script>
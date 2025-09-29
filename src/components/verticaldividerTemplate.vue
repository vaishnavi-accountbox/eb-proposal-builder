<template id="contentVerticalDividerTemplate">

    <div class="row m-0">
        <div class="col-lg-12 p-0">

            <div :style="{'text-align': content.options.align}">
                <span :style="{width:content.options.divider.size+'px', height: content.options.height+'px', borderRight: content.options.divider.size+'px ' + content.options.divider.style + ' ' + content.options.divider.color}"
                      style="display: inline-block;"></span>
            </div>

        </div>
    </div>

</template>
<script>
export default {
  name: "verticalDividerTemplate",
  props: ['content', 'viewport', 'renderby'],
        
}
</script>
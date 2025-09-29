<template id="contentDividerTemplate">

    <div class="row m-0">
        <div class="col-lg-12 p-0">

            <div :style="{width: content.options.width+'px', borderTop: content.options.divider.size+'px ' + content.options.divider.style + ' ' + content.options.divider.color}"></div>

        </div>
    </div>

</template>
<script>
export default {
  name: "dividerTemplate",
  props: ['content', 'viewport', 'renderby'],

}
</script>

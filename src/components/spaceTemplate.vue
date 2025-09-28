<template id="contentSpaceTemplate">

    <div :style="{height: content.options.height+'px'}">

    </div>

</template>
<script>
export default {
  name: "spaceTemplate",
  props: ['content', 'viewport', 'renderby'],
}
</script>
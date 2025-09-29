<template id="contentSocialTemplate">

    <icon-template :content="content" :renderby="renderby" :viewport="viewport"></icon-template>

</template>
<script>
export default {
  name: "socialTemplate",
  props: ['content', 'viewport', 'renderby'],
  methods: {}
}
</script>

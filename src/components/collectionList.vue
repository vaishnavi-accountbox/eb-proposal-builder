<template id="collectionList">
	<div :class="landingpageprefs.bodySettings.themeSettings.collectionListStyle + '-style'" :style="{ '--title-color': font.titleColor, '--title-size': font.titleSize + 'px', '--desc-color': font.descriptionColor, '--desc-size': font.descriptionSize + 'px' }" v-html="landingpageprefs.bodyContent" v-prevent-nav>
	</div>
</template>

<script>
export default {
  name: "collectionList",
  props: ['font', 'landingpageprefs'],
  created: function () {

  },
};
</script>
<template id="builderPageRenderRowColumn">

    <div class="m-0 p-0 row">

        <div :class="[ 'align-self-'+ column.alignItems, getColumnClassNameWithoutViewport(column)]"
             :style="getSelectedStyles(column.options, {}, ['padding', 'margin', 'border', 'box-shadow', 'background'])"
             class=""
             v-for="column in columns"
        >

            <div
                    :class="[content.type+'-content', 'desktop-visibilty-'+content.options.desktop.visible, 'mobile-visibilty-'+content.options.mobile.visible]"
                    :style="getSelectedStyles(content.options, {}, ['padding', 'margin', 'background', 'box-shadow', 'border', 'font'])"
                    v-for="(content, index) in column.contents"
            >

                <component :content="content" :is="content.component" :renderby="'page'" :viewport="'desktop'">
                </component>

            </div>


        </div>

    </div>

</template>
<script>
export default {
  name: 'pageRenderRowColumn',
  props: ['columns'],
  methods: {
    getColumnClassNameWithoutViewport(column) {

      console.log('column.size', column.size);
      return (!column.auto_width && column.size > 0) ? 'col-md-' + column.size : 'col-md';

    }
  }
}
</script>
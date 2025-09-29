<template id="contentBlockTemplate">

    <div class="row m-0">
        <div class="col-lg-12 p-0">

            <row-column :columns="content.columns" :options="content.options" :viewport="viewport"
                        v-if="renderby=='builder'"></row-column>

            <page-render-row-column :columns="content.columns" v-if="renderby=='page'">

            </page-render-row-column>

        </div>
    </div>

</template>
<script>
export default {
  name: "blockTemplate",
  props: ['content', 'viewport', 'renderby'],
  methods: {}
}
</script>
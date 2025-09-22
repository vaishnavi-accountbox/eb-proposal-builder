<template id="contentSearchTemplate">

    <div class="row m-0">
        <div class="col-lg-12 p-0">

            <div class="content-overlay" v-if="renderby=='builder'"></div>

            <div class="form-group search-group m-0">
                <i :style="getSelectedStyles( content.options, {}, ['fieldFont'])" class="fa fa-search"></i>
                <input
                        :placeholder="content.options.placeholder"
                        :style="getSelectedStyles( content.options, {height: 'auto'}, ['fieldFont', 'fieldPadding', 'fieldBorder', 'fieldBackground'])"
                        class="search article-search form-control"/>
            </div>

        </div>
    </div>


</template>
<script>
export default {
  name: "searchTemplate",
  props: ['content', 'viewport', 'renderby'],
}
</script>
<template id="contentIconTemplate">

    <div class="row m-0">

        <div class="col-lg-12 p-0" style="position:relative;" v-if="renderby=='builder'">

            <div :style="{'text-align': content.options.align}" style="line-height: normal;">

                <i :class="'fa-'+icon.icon_class"
                   :style="{display:(content.options.orientation=='vertical')?'block':'inline-block', color: icon.color, fontSize:icon.size+'px', padding: icon.padding.top+'px '+icon.padding.right+'px '+icon.padding.bottom+'px '+icon.padding.left+'px'}"
                   aria-hidden="true"
                   class="fa"
                   v-for="icon in content.options.icon_list"
                ></i>

            </div>

        </div>

        <div class="col-lg-12 p-0" v-if="renderby=='page'">

            <div :style="{'text-align': content.options.align}" style="line-height: normal;"
            >

                <i :class="['fa-'+icon.icon_class, (icon.clickAction.type!='none' && icon.clickAction.value) ? 'engagebay-lp-button' : '']"
                   :data-actionType="icon.clickAction.type" :data-actionValue="icon.clickAction.value"
                   :style="{display:(content.options.orientation=='vertical')?'block':'inline-block' ,color: icon.color, fontSize:icon.size+'px', padding: icon.padding.top+'px '+icon.padding.right+'px '+icon.padding.bottom+'px '+icon.padding.left+'px'}"
                   aria-hidden="true" class="fa"
                   v-for="icon in content.options.icon_list"
                ></i>

            </div>

        </div>

    </div>
</template>

<script>
export default {
  name: "iconTemplate",
  props: ['content', 'viewport', 'renderby'],
  methods: {}
}
</script>


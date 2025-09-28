<template id="contentNavbarListTemplate">
    <div>

        <nav class="navbar navbar-light navbar-expand-sm p-0"
             v-if="renderby=='builder'">

            <ul :class="{'ml-auto': content.options.nav_list_alignment=='right',
    								'm-auto': content.options.nav_list_alignment=='center',
    								'mr-auto': content.options.nav_list_alignment=='left',
    								'flex-direction-column' : content.options.orientation == 'vertical'
    								}" class="navbar-nav">


                <template v-for="(navLink, index1) in content.options.nav_link_list">

                    <li class="nav-item" v-if="!navLink.dropdown">
                        <a :style="getSelectedStyles( content.options, {}, ['font', 'navPadding']) "
                           class="nav-link inline-text-container"
                           href="#" v-html="navLink.text"></a>
                    </li>

                    <li class="nav-item dropdown" v-if="navLink.dropdown">
                        <a :data-target="'#navBuilderDropDown'+content.id+index1"
                           :style="getSelectedStyles( content.options, {}, ['font', 'navPadding']) "
                           aria-expanded="false"
                           aria-haspopup="true" class="nav-link dropdown-toggle inline-text-container"
                           data-toggle="dropdown"
                           href="#" id="navbarDropdown" role="button" v-html="navLink.text"
                           v-navbar-toggler>
                        </a>
                        <div :id="'navBuilderDropDown'+content.id+index1" aria-labelledby="navbarDropdown"
                             class="dropdown-menu">
                            <a class="dropdown-item" href="#"
                               v-for="dropdown in navLink.dropdownList">{{dropdown.text}}</a>
                        </div>
                    </li>

                </template>

            </ul>
        </nav>

        <nav class="navbar navbar-light navbar-expand-sm p-0"

             v-if="renderby=='page'">

            <ul :class="{'ml-auto': content.options.nav_list_alignment=='right',
    								'm-auto': content.options.nav_list_alignment=='center',
    								'mr-auto': content.options.nav_list_alignment=='left',
    								'flex-direction-column' : content.options.orientation == 'vertical'
    								}" class="navbar-nav">

                <template v-for="navLink in content.options.nav_link_list">

                    <li class="nav-item" v-if="!navLink.dropdown">
                        <a :class="{'engagebay-lp-button' : navLink.clickAction.type!='none' && navLink.clickAction.value}"
                           :data-actionType="navLink.clickAction.type"
                           :data-actionValue="navLink.clickAction.value"
                           :href="(navLink.clickAction && navLink.clickAction.value) ? navLink.clickAction.value : '#'"
                           :style="getSelectedStyles( content.options, {}, ['font', 'navPadding']) "
                           class="nav-link inline-text-container"
                           v-html="navLink.text"></a>
                    </li>

                    <li class="nav-item dropdown" v-if="navLink.dropdown">
                        <a :style="getSelectedStyles( content.options, {}, ['font', 'navPadding']) "
                           aria-expanded="false"
                           aria-haspopup="true" class="nav-link dropdown-toggle inline-text-container"
                           data-toggle="dropdown" href="#" id="navbarDropdown"
                           role="button" v-html="navLink.text">
                        </a>
                        <div aria-labelledby="navbarDropdown" class="dropdown-menu">
                            <a :class="{'engagebay-lp-button' : dropdown.clickAction.type!='none' && dropdown.clickAction.value}"
                               :data-actionType="dropdown.clickAction.type"
                               :data-actionValue="dropdown.clickAction.value"
                               :href="(dropdown.clickAction && dropdown.clickAction.value) ? dropdown.clickAction.value : '#'"
                               class="dropdown-item"
                               v-for="dropdown in navLink.dropdownList"
                            >{{dropdown.text}}</a>
                        </div>
                    </li>

                </template>

            </ul>
        </nav>

    </div>

</template>
<script>
export default {
  name: 'navlistTemplate',
  props: ['content', 'viewport', 'renderby'],
}
</script>
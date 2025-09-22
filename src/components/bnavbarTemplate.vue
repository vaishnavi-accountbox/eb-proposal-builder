<template id="contentNavbarTemplate">

    <div>

        <nav :class="{'navbar-expand-md': (viewport == 'desktop')}"
             class="navbar navbar-light p-0" v-if="renderby=='builder'">


            <a class="navbar-brand" href="#">
                <img :src="content.options.brand_img" alt="" class="d-inline-block align-middle" height="30"
                     v-if="content.options.brand_img" width="auto">
                <span class="inline-text-container align-middle" v-html="content.options.brand_text"></span>
            </a>

            <button :data-target="'#navbarNavDropdownBuilder_'+content.id" aria-controls="navbarNavDropdown"
                    aria-expanded="false" aria-label="Toggle navigation"
                    class="navbar-toggler" data-toggle="collapse"
                    type="button" v-navbar-toggler>
                <span class="navbar-toggler-icon"></span>
            </button>

            <div :id="'navbarNavDropdownBuilder_'+content.id" class="collapse navbar-collapse">
                <ul :class="{'ml-auto': content.options.nav_list_alignment=='right', 'm-auto': content.options.nav_list_alignment=='center', 'mr-auto': content.options.nav_list_alignment=='left'}"
                    class="navbar-nav">

                    <template v-for="(navLink, index1) in content.options.nav_link_list">

                        <li class="nav-item" v-if="!navLink.dropdown">
                            <a :style="getSelectedStyles( content.options, {}, ['font', 'navPadding'])"
                               class="nav-link inline-text-container"
                               href="#" v-html="navLink.text"></a>
                        </li>

                        <li class="nav-item dropdown" v-if="navLink.dropdown">
                            <a :data-target="'#navBuilderDropDown'+content.id+index1"
                               :style="getSelectedStyles( content.options, {}, ['font', 'navPadding'])"
                               aria-expanded="false"
                               aria-haspopup="true" class="nav-link dropdown-toggle inline-text-container"
                               data-toggle="dropdown"
                               href="#" id="navbarDropdown" role="button" v-html="navLink.text"
                               v-navbar-toggler>
                            </a>
                            <div :id="'navBuilderDropDown'+content.id+index1" aria-labelledby="navbarDropdown"
                                 class="dropdown-menu">
                                <a class="dropdown-item" href="#" v-for="dropdown in navLink.dropdownList">{{dropdown.text}}</a>
                            </div>
                        </li>

                    </template>

                </ul>
            </div>
        </nav>

        <nav :class="{'navbar-expand-md': (viewport == 'desktop')}"
             class="navbar navbar-light p-0" v-if="renderby=='page'">

            <a :href="content.options.brand_link" class="navbar-brand">
                <img :src="content.options.brand_img" alt="" class="d-inline-block align-middle" height="30"
                     v-if="content.options.brand_img" width="auto">
                <span class="inline-text-container align-middle" v-html="content.options.brand_text"></span>
            </a>

            <button :data-target="'#navbarNavDropdown_'+content.id" aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation" class="navbar-toggler"
                    data-toggle="collapse" type="button">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div :id="'navbarNavDropdown_'+content.id" class="collapse navbar-collapse">
                <ul :class="{'ml-auto': content.options.nav_list_alignment=='right', 'm-auto': content.options.nav_list_alignment=='center', 'mr-auto': content.options.nav_list_alignment=='left'}"
                    class="navbar-nav">

                    <template v-for="navLink in content.options.nav_link_list">

                        <li class="nav-item" v-if="!navLink.dropdown">
                            <a :class="{'engagebay-lp-button' : navLink.clickAction.type!='none' && navLink.clickAction.value}"
                               :data-actionType="navLink.clickAction.type"
                               :data-actionValue="navLink.clickAction.value"
                               :href="(navLink.clickAction && navLink.clickAction.value) ? navLink.clickAction.value : '#'"
                               :style="getSelectedStyles( content.options, {}, ['font', 'navPadding'])"
                               class="nav-link inline-text-container"
                               v-html="navLink.text"></a>
                        </li>

                        <li class="nav-item dropdown" v-if="navLink.dropdown">
                            <a :style="getSelectedStyles( content.options, {}, ['font', 'navPadding'])"
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
            </div>
        </nav>

    </div>

</template>
<script>
import '../../public/commons.css';
export default {
  name: 'bnavbarTemplate',
  props: ['content', 'viewport', 'renderby'],
}
</script>
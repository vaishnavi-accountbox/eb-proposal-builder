<template id="landingpageBuilderComponent">

	<div id="landingpage-builder-wrapper">

		<nav class="builder-nav navbar navbar-expand-lg navbar-light bg-light"
			 style="border-bottom: 1px solid #c7ced5;">

			<span @click="backFromBuilder($event)" class="" title="Back" style="
    display: inline-block;
    padding: 0px 16px 0px 6px;
    border-right: 1px solid #ddd;
    margin-right: 10px;cursor: pointer;
"><i class="fa fa-long-arrow-left" style="
    font-size: 33px;
"></i></span>

			<a class="navbar-brand" href="#">
				<img src="error.png" onerror="parent.getBrandTextLogo()" width="auto" height="28"
					 class="d-inline-block align-top" alt="">
			</a>

			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
					aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarNav">
				<div v-tinymce-editor1 style="height:1px;width:1px;overflow: hidden;">LP</div>

				<ul class="builder-device-view navbar-nav m-auto">
					<li class="device desktop" :class="{active : activeViewport == 'desktop'}"
						@click="changeViewportDesign($event, 'desktop')">
						<div>
							<i class="fa fa-desktop"></i>
						</div>
					</li>
					<li class="device mobile" :class="{active : activeViewport == 'mobile'}"
						@click="changeViewportDesign($event, 'mobile')">
						<div>
							<i class="fa fa-mobile"></i>
						</div>
					</li>
				</ul>

				<ul class="navbar-nav ml-auto">

					<!-- <li class="nav-item">
      	<a class="btn btn-outline-warning mr-2 btn-sm" href="#" @click="previewLandingpage($event)" title="Preview"><i class="fa fa-eye"></i></a>
      </li> -->
					<li class="nav-item">
						<a class="btn btn-warning mr-2 btn-sm" :class="{'disabled' : saveInProgress}" href="#"
						   @click="saveLandingPage($event)">Save</a>
					</li>

				</ul>
			</div>
		</nav>


		<builder-html-content :prefs="landingpagePrefs"></builder-html-content>

		<div class="row builder no-gutters">

			<div class="builder-card-nav p-0">

				<div>

					<ul class="nav-list">

						<li>
							<a
							   :class="{active: builderPreferencesActiveTab == 'contents' && navOptionDetailedView}"
							   @click="activatePreferencesTab($event, 'contents')">
								<span class="icon"><i aria-hidden="true" class="fa fa-building-o"></i></span>
								<span class="title">Content</span></a>
						</li>

						<!-- <li>
			    <a href="#" :class="{active: builderPreferencesActiveTab == 'designed_components' && navOptionDetailedView}" @click="activatePreferencesTab($event, 'designed_components')">
			    <span class="icon"><i aria-hidden="true" class="fa fa-magic"></i></span>
			    <span class="title">Blocks</span></a>
			  </li>
			  
			   <li>
			    <a :class="{active: builderPreferencesActiveTab == 'sections' && navOptionDetailedView}" @click="activatePreferencesTab($event, 'sections')" href="#">
			    <span class="icon"><i aria-hidden="true" class="material-icons">view_module</i></span>
			    <span class="title">Sections</span>
			    </a>
			  </li>
			   -->

						<li>
							<a
							   :class="{active: builderPreferencesActiveTab == 'body' && navOptionDetailedView}"
							   @click="activatePreferencesTab($event, 'body')">
								<span class="icon"><i aria-hidden="true" class="fa fa-cog"></i></span>
								<span class="title">Settings</span></a>
						</li>

						<li>
							<a
							   :class="{active: builderPreferencesActiveTab == 'themes' && navOptionDetailedView}"
							   @click="activatePreferencesTab($event, 'themes')">
								<span class="icon"><i aria-hidden="true" class="fa fa-puzzle-piece"></i></span>
								<span class="title">Themes</span></a>
						</li>

					</ul>

				</div>

			</div>

			<div :class="{'hidden-view': !navOptionDetailedView || builderPreferencesActiveTab == '', 'body-settings' : builderPreferencesActiveTab == 'body', 'designed-components' : builderPreferencesActiveTab == 'designed_components'}"
				 class="builder-card">

				<div class="builder-card-content">

					<div :class="{hide: builderPreferencesActiveTab != 'contents'}">

						<div class="close-builder-card pb-sm-3">
							<span class="font-weight-bold align-middle text-muted" style="  font-size: 14px; ">&nbsp;
							</span>
							<span class="float-right" @click="closesettingsBlock($event)"><i
									class="fa fa-close"></i></span>
						</div>

						<draggable :list="sectionComponents"
								   :options="{group: { name: 'section', pull: 'clone', put: false }, sort: false,ghostClass:'section-sortable-ghost', dragClass: 'drag-element'}"
								   @start="onOptionsDragStart" @end="onOptionsDragEnd" :clone="draggedCloneSection"
								   element="ul" class="builder-block-list-options block" ref="elements">

							<div class="block-panel" v-for="section in sectionComponents">

								<div class="builder-block-row sortable-ghost-section" data-name="Drop it here">
									<div class="row m-0">
										<div class="blockbuilder-column p-0 text-center pt-2 col">
											{{section.text}}
										</div>

									</div>
								</div>

							</div>

						</draggable>

						<draggable :list="contents"
								   :options="{group: { name: 'content', pull: 'clone', put: false }, sort: false,ghostClass:'content-sortable-ghost', dragClass: 'drag-element'}"
								   @start="onOptionsDragStart" :clone="draggedCloneContent" element="ul"
								   class="builder-card-content-list" ref="contents">

							<li v-for="content in contents" data-name="Drop it here" :data-type="content.type"
								drag-handle=".list-content" data-helper="clone" class="sortable-ghost-li"
								drag-start="closesettingsBlock">
								<div class="list-content sortable-ghost-content" data-name="Drop it here">
									<div><i class="fa" :class="'fa-'+content.icon" :style="content.iconStyle"></i></div>
									<div>{{content.primary_head}}</div>
								</div>
							</li>


						</draggable>

						<!-- <ul :list="contents"
						:clone="draggedClone" element="ul" class="builder-card-content-list"
						@start="onOptionsDragStart"
						ref="contents">
					<li v-draggable v-for="content in contents" :data-type="content.type" drag-handle=".list-content" data-helper="clone" class="ebcontent" drag-start="closesettingsBlock">
						<div class="list-content sortable-ghost-content" data-name="Drop it here">
							<div><i class="fa" :class="'fa-'+content.icon" :style="content.iconStyle"
								></i></div>
							<div>{{content.primary_head}}</div>
						</div>
					</li>
					</ul> -->

					</div>

					<div :class="{hide: builderPreferencesActiveTab != 'sections'}">


						<div class="close-builder-card pb-sm-3">
							<span class="font-weight-bold align-middle text-muted" style="  font-size: 14px; ">&nbsp;
							</span>
							<span class="float-right" @click="closesettingsBlock($event)"><i
									class="fa fa-close"></i></span>
						</div>

						<draggable :list="sectionComponents"
								   :options="{group: { name: 'section', pull: 'clone', put: false }, sort: false,ghostClass:'section-sortable-ghost', dragClass: 'drag-element'}"
								   @start="onOptionsDragStart" :clone="draggedCloneSection" element="div"
								   class="builder-block-list-options block" ref="elements">

							<div class="block-panel" v-for="element in sectionComponents">

								<div class="builder-block-row sortable-ghost-section" data-name="Drop it here">
									<div class="row m-0">
										<div v-for="columnOption in defaultOptions[element.type]"
											 class="blockbuilder-column p-0 col-md-12">
											<div class="blockbuilder-column-content"></div>
										</div>

									</div>
								</div>

							</div>

						</draggable>

					</div>

					<div :class="{hide: builderPreferencesActiveTab != 'body'}">

						<div class="close-builder-card pb-sm-3">
							<span class="font-weight-bold align-middle text-muted" style="  font-size: 14px; ">Page
								Settings&nbsp; </span>
							<span class="float-right" @click="closesettingsBlock($event)"><i
									class="fa fa-close"></i></span>
						</div>

						<form action="#" onsubmit="return false">

							<style-edit-form-fields
									:themesettings="landingpagePrefs.bodySettings.themeSettings"
									:options="landingpagePrefs.bodySettings" 
									:globals="globals"
									:editelementtype="'body'"
													>
												</style-edit-form-fields>

						</form>

					</div>

					<div :class="{hide: builderPreferencesActiveTab != 'designed_components'}">


						<div class="close-builder-card pb-sm-3">
							<span class="font-weight-bold align-middle text-muted" style="  font-size: 14px; ">&nbsp;
							</span>
							<span class="float-right" @click="closesettingsBlock($event)"><i
									class="fa fa-close"></i></span>
						</div>

						<div class="form-group">
							<select v-model="selectedDesignedComponentType" class="form-control eb-form-control">
								<option value="all">All</option>
								<option v-for="(componentList, key, index) in globals.designed_components" :value="key">
									{{key}}</option>
							</select>
						</div>

						<div
								v-for="componentList in getSelectedDesignedComponents(globals.designed_components, selectedDesignedComponentType)">

							<draggable :list="componentList"
									   :options="{group: { name: 'section', pull: 'clone', put: false }, sort: false,ghostClass:'section-sortable-ghost', dragClass: 'drag-element'}"
									   @start="onOptionsDragStart" @end="onOptionsDragEnd" :clone="draggedDesignedComponent"
									   element="div" class="builder-block-list-options block" ref="componentList">

								<div class="block-panel" v-for="component in componentList">

									<div class="sortable-ghost-section" data-name="Drop it here">

										<div class="row m-0">
											<div class="blockbuilder-column col-md-12 p-0">
												<div class="blockbuilder-column-content">

													<img :src="component.image_url" width="100%" height="auto">

												</div>

											</div>

										</div>

									</div>

								</div>

							</draggable>

						</div>

					</div>

					<div :class="{hide: builderPreferencesActiveTab != 'themes'}">
						<div class="close-builder-card pb-sm-3">
							<span class="font-weight-bold align-middle text-muted" style="  font-size: 14px; ">Select
								Theme&nbsp; </span>
							<span class="float-right" @click="closesettingsBlock($event)"><i
									class="fa fa-close"></i></span>
						</div>

						<form action="#" onsubmit="return false">



							<div class="text-center mb-3">
								<img class="cursor-pointer" width="100%" height="auto" 
									 @click="selectedTheme.active='theme1'" :style="{'border' : (selectedTheme.active=='theme1') ? '2px solid blue' : '1px solid #ddd'}"/>
							</div>

							<div class="text-center mb-3">
								<img class="cursor-pointer" width="100%" height="auto" 
									 @click="selectedTheme.active='theme2'" :style="{'border' : (selectedTheme.active=='theme2') ? '2px solid blue' : '1px solid #ddd'}"/>
							</div>

							<div class="text-center mb-3">
								<img class="cursor-pointer" width="100%" height="auto" 
									 @click="selectedTheme.active='theme3'" :style="{'border' : (selectedTheme.active=='theme3') ? '2px solid blue' : '1px solid #ddd'}"/>
							</div>






						</form>

					</div>



				</div>


			</div>

			<div class="col overflow-auto p-0">

				<div class="container-fluid p-0">

					<div class="row no-gutters">

						<div class="col-lg-12">

							<div class="landingpage-builder-content">


								<div id="tinymceToolbarContainer">

								</div>

								<div class="build-area" :class="[activeViewport+'-view']">

									<div class="scroll-container"
										 :style="getSelectedStyles( landingpagePrefs.bodySettings, {width : (activeViewport == 'mobile') ? '500px' : '100%'}, ['background-color', 'font'])">

										<div style=""
											 :style="{marginTop: landingpagePrefs.bodySettings.margin.top+'px'}">


											<draggable class="section-container"
													   :class="[{empty: !landingpagePrefs.sections.length}, getFontFamilyClassName(landingpagePrefs.bodySettings.font)]"
													   data-empty-template="No section here. Drag section from right."
													   :list="landingpagePrefs.sections"
													   :options="{group: {name: 'section', put: true}, sort: true, handle: 'i.actions.section-move'}"
													   @add="onAddSection" @start="onMove" @end="onMoveEnd"
													   ref="emailElements">

												<div class="section-element" :data-hover="section.hovered"
													 :class="{hovered: section.hovered, selected: activeElementId == section.id}"
													 v-for="(section, sectionIndex) in landingpagePrefs.sections"
													 :id="section.id"
													 :style="getSelectedStyles(section.options, {}, ['background', 'border', 'box-shadow', 'margin'])"
													 @mouseleave="mouseOutSection($event, section)"
													 @mouseenter="mouseEnterSection($event, section)">

													<section-video-background
															v-if="section.options.background.type == 'video' && section.options.background.video.url"
															:renderby="'builder'" :video="section.options.background.video">
													</section-video-background>

													<div class="add-new-section-container">
														<span class=""
															  @click="addNewSection($event, sectionIndex)">&#x2B;</span>
													</div>

													<div class="section-element-actions"
														 :class="{active : activeElementId == section.id}">

														<!-- 						 <span v-if="section.options.name">{{section.options.name}}</span> -->
														<span class="pl-1"> Section {{sectionIndex+1}}</span>

														<i class="other-actions fa fa-pencil" title="Edit"
														   @click="activateSelectedElement($event, section, 'section')"></i>


														<i v-if="section.type!='collection_section'"
														   class="other-actions delete fa fa-trash"
														   title="Delete Block"
														   @click="removeSection($event, section)"></i>

														<i v-if="section.type!='collection_section'"
														   class="other-actions clone fa fa-clone" title="Clone Block"
														   @click="cloneSection($event, section)"></i>

														<i v-if="sectionIndex != 0"
														   class="other-actions clone fa fa-long-arrow-up"
														   title="Move Up"
														   @click="moveSection($event, section, sectionIndex, sectionIndex - 1)"></i>

														<i v-if="(landingpagePrefs.sections.length - 1) != sectionIndex"
														   class="other-actions clone fa fa-long-arrow-down"
														   title="Move Down"
														   @click="moveSection($event, section, sectionIndex, sectionIndex + 1)"></i>

													</div>

													<template v-if="section.type=='collection_section'">

														<div :class="[getContainerClass(landingpagePrefs.bodySettings.contentWidth)]"
															 @click="activateSelectedElement($event, section, 'section')"
															 :style="getSelectedStyles(section.options, {}, ['padding'])">
															<collection-list
																	v-if="accordion.active == 'list' && landingpagePrefs.bodyContent !== ''"
																	:font="landingpagePrefs.bodySettings.font"
																	:landingpageprefs="landingpagePrefs"
															>
															</collection-list>
															<landingpagePrefs.bodySettings.themeSettings.collectionListStyle
																	v-else-if="accordion.active == 'list'"
																	:is="landingpagePrefs.bodySettings.themeSettings.collectionListStyle"
																	:font="landingpagePrefs.bodySettings.font"
															>
															</landingpagePrefs.bodySettings.themeSettings.collectionListStyle>
															<collection-comp
																	:font="landingpagePrefs.bodySettings.font"
																	:bodycontent="landingpagePrefs.bodyContent"
																	:collectionpagestyle="landingpagePrefs.bodySettings.themeSettings.collectionPageStyle"
																	v-if="accordion.active == 'collection'"
															>

															</collection-comp>
															<article-comp
																	:font="landingpagePrefs.bodySettings.font"
																	:bodycontent="landingpagePrefs.bodyContent"
																	v-if="accordion.active == 'article'"
																	:articlepagestyle="landingpagePrefs.bodySettings.themeSettings.articlePageStyle"
															>

															</article-comp>


														</div>

<!--														<div class="article-section-overlay" style="">-->
<!--															<div class="row" style="height: 100%;">-->
<!--																<div class="col align-self-center text-center">Article-->
<!--																	Section</div>-->
<!--															</div>-->
<!--														</div>-->

													</template>


													<div v-else
														 :class="[getContainerClass(landingpagePrefs.bodySettings.contentWidth)]"
														 :style="getSelectedStyles(section.options, {}, ['padding'])">

														<row-column :viewport="activeViewport"
																	:columns="section.columns">

														</row-column>

													</div>

												</div>
												<!-- End of section element -->

											</draggable>
											<!-- End of section container -->

										</div>
									</div>
								</div>

							</div>

						</div>

					</div>
				</div>
			</div>


			<div class="builder-element-setting col-2"
				 :class="{'setting-tab-minimized' : minimizedElementSettingsContainer}">

				<div v-if="activeSettingsElement && activeSettingsElement.id" style="width: 253px;">

					<ul class="lp-tabs">

						<li class="lp-tab">

							<a href="javascript:void(0);" data-tab="editElementSettings">
								Element Settings
							</a>

							<!-- <a @click="minimizedElementSettingsContainer=false" v-if="minimizedElementSettingsContainer"  href="javascript:void(0);" data-tab="editElementSettings">
					<span class="fa fa-indent cursor-pointer" style="padding-right:5px;"></span> Element Settings 
				</a>
				<a v-else @click="minimizedElementSettingsContainer=true,deactivateSettingElement()"  href="javascript:void(0);" data-tab="editElementSettings">
					<span class="fa fa-outdent cursor-pointer" style="padding-right:5px;"></span> Element Settings
				</a> -->

						</li>


						<!-- <li class="lp-tab" :class="{active: builderPreferencesActiveTab == 'element'}" @click="activatePreferencesTab($event, 'element')">
				<a href="javascript:void(0);" data-tab="editElementSettings">
				
				<span class="fa fa-cog" style="display:block;"></span>
				
				
				</a></li>  -->

					</ul>

					<div class="lp-tab-content-container">

						<div class="lp-tab-content active">

							<div>

								<style-edit-form-fields :viewport="activeViewport"
														:accordion="accordion"
														:font="landingpagePrefs.bodySettings.font"
														:themesettings="landingpagePrefs.bodySettings.themeSettings"
														:options="activeSettingsElement.options"
														:editelementtype="activeSettingsElement.elementType"
														:element="activeSettingsElement"
														:contenttype="activeSettingsElement.type" :elementid="activeSettingsElement.id">
								</style-edit-form-fields>

								<div v-if="activeSettingsElement.elementType =='section' && activeSettingsElement.type != 'collection_section' && checkHasContents(activeSettingsElement) "
									 class="block-properities active" v-toggle-style-actions>

									<div class="properity-header">
										<i class="fa fa-angle-down expand"></i>
										<i class="fa fa-angle-right contract"></i>
										Contents
									</div>

									<div class="properity-body">

										<div class="section-content-brief-settings">
											<div v-for="(content, index) in activeSettingsElement.columns[0].contents"
												 class="content-brief" :class="{selected:activeElementId == content.id}"
												 @click="activeElementId=content.id">
												<i class="fa content-icon"
												   :class="'fa-'+getcontentInfoFromContentObject(content, 'icon')"
												   :style="getcontentInfoFromContentObject(content, 'iconStyle')"></i>
												{{getcontentInfoFromContentObject(content, 'primary_head')}}
												<i class="fa fa-edit content-options"
												   @click="activateSelectedElement($event, content.id, 'content'),activateSettingsElement($event, content, 'content')">
												</i>
												<i class="fa fa-trash content-options"
												   @click="removeContent($event, activeSettingsElement.columns[0], content)"></i>
											</div>
										</div>

									</div>
								</div>
							</div>


						</div>

					</div>


					<!-- <div class="mb-3">
	<span class="font-weight-bold align-middle text-muted" style="  font-size: 14px; ">Settings</span>
	<span class="close-settings" @click="deactivateSettingElement($event)"><i class="fa fa-close"></i></span></div>
	 -->

				</div>

				<div v-else>
					<div class="row align-items-center" style="
    height: calc(100vh - 60px);
    background: #f6f6f6;
				">
						<div class="col">
							<div style="font-size: 16px;text-align: center;padding-right: 12px;padding-left: 12px;">
								Select one element to edit its appearance</div>
						</div>
					</div>

				</div>

			</div>


			<b-modal v-model="modalPopup.showModal" size="xl">

				<template v-slot:modal-title>
					<span style="font-size:20px;">{{modalPopup.heading}}</span>
				</template>

				<template fluid>

					<div v-if="modalPopup.modalType == 'fontAwesomeSelectIcon'">

						<fa-icon-library :option="modalPopup.modalData"></fa-icon-library>

					</div>

					<div v-if="modalPopup.modalType == 'columnConfirmation'">

						<div class="row">
							<div class="col m-3">
								<div @click="modalPopup.modalData['columns'] = 1,OnSelectModalPopUp()"
									 class="row row-col-container">
									<div v-for="ind in 1" class="col row-col-structure"></div>
								</div>
							</div>
							<div class="col m-3">
								<div @click="modalPopup.modalData.columns = 2,OnSelectModalPopUp()"
									 class="row row-col-container">
									<div v-for="ind in 2" class="col row-col-structure"></div>
								</div>
							</div>
							<div class="col m-3">
								<div @click="modalPopup.modalData['columns'] = 3,OnSelectModalPopUp()"
									 class="row row-col-container">
									<div v-for="ind in 3" class="col row-col-structure"></div>
								</div>
							</div>
							<div class="col m-3">
								<div @click="modalPopup.modalData['columns'] = 4,OnSelectModalPopUp()"
									 class="row row-col-container">
									<div v-for="ind in 4" class="col row-col-structure"></div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col m-3">
								<div @click="modalPopup.modalData['columns'] = 5,OnSelectModalPopUp()"
									 class="row row-col-container">
									<div v-for="ind in 5" class="col row-col-structure"></div>
								</div>
							</div>
							<div class="col m-3">
								<div @click="modalPopup.modalData['columns'] = 6,OnSelectModalPopUp()"
									 class="row row-col-container">
									<div v-for="ind in 6" class="col row-col-structure"></div>
								</div>
							</div>
							<div class="col m-3">
								<div @click="modalPopup.modalData['columns'] = 8,OnSelectModalPopUp()"
									 class="row row-col-container">
									<div v-for="ind in 8" class="col row-col-structure"></div>
								</div>
							</div>
							<div class="col m-3">
								<div @click="modalPopup.modalData['columns'] = 10,OnSelectModalPopUp()"
									 class="row row-col-container">
									<div v-for="ind in 10" class="col row-col-structure"></div>
								</div>
							</div>

						</div>

					</div>
					</template>
			</b-modal>

		</div>
		</div>

</template>


<script>
import { PARENT_UNLOAD_CONFIRM } from '../app';
import { getBuilderDefaultSettings, getDefaultColumnOptions, LANDING_PAGE_JSON, landingpageBuilderVueRef, removeBuilder } from '../global';
import {utils} from '../app';
import $ from "jquery";
import '../../public/app2.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import styleEditFormFields from './styleEditFormFields.vue';
import builderHtmlContent from './builderHtmlContent.vue';
import rowColumn from './rowColumn.vue';
var KEY_DOWN_EVENT_TRIGGER_STATE = {};


export default {
  name: 'builder',
  components: {
    builderHtmlContent,
    styleEditFormFields,
    rowColumn
  },
  data : function() {

    var defaultData = getBuilderDefaultSettings();
    defaultData.landingpagePrefs = utils
      .getBuilderDataPreferences();
				
    var fontObj = defaultData.landingpagePrefs.bodySettings.font;
    if(fontObj.size && !fontObj.mobile_size){
      defaultData.landingpagePrefs.bodySettings.font.mobile_size = fontObj.size;
    }

    return defaultData;

  },

  mounted : function() {
				
    // utils.initTooltips();
    console.log("Landing page builder mounted ✅");
				
    if(!this.landingpagePrefs.fontFamilies)
      this.landingpagePrefs.fontFamilies = [];
				
    if(this.landingpagePrefs.fontFamilies.length == 0 && !utils.checkIsBowserFontFamily(this.landingpagePrefs.bodySettings.font.family)){
      this.landingpagePrefs.fontFamilies = [this.landingpagePrefs.bodySettings.font.family];
    }
				
    utils.loadMultipleFontFamily(this.landingpagePrefs.fontFamilies);
    utils.bodyLinkColorChanged(this.landingpagePrefs.bodySettings.font.linkColor);
				
  },
  watch : {
    landingpagePrefs : {
      handler : function(newVal, oldVal) {
						
        // utils.initTooltips();
						
      },
      deep : true
    },
				
  },
  created: function () {
        
				
    this.addState(this.landingpagePrefs);
				
    var self = this;
				
    window.addEventListener('keyup', function(event) {
					 
					 if(KEY_DOWN_EVENT_TRIGGER_STATE[event.keyCode]){
						 landingpageBuilderVueRef.addState(landingpageBuilderVueRef.landingpagePrefs);
					 }
				 });
				
			    window.addEventListener('keydown', function(event) {
			    	
			    	// Check keycode that we are supporting
			    	if(!$(event.target).hasClass('lp-builder-body') || [37, 38, 39, 40, 46, 89, 90].indexOf(event.keyCode) == -1)
			    		return;
			    	
			    	if($('.alertify').length > 0)
			    		return;
			    	
			    	console.log('event.keyCode', event.keyCode);

			    	// undo event triggered
			    	 if (event.keyCode == 90 && event.ctrlKey)
			            {
			                console.log('ctrl Z');
			                landingpageBuilderVueRef.undo();
			            }
			    	 
			    	// redo event triggered
			    	 if (event.keyCode == 89 && event.ctrlKey)
			            {
			    		 console.log('ctrl Y');
			    		 landingpageBuilderVueRef.redo();
			            }
			    	
			    	
			    	if(!self.activeElementId || event.target.id.indexOf("mce") > -1)
			    		return;
			    	
			    	var $refEle = $('#' + self.activeElementId);
		    		if($refEle.length == 0)
		    			return;
		    		
		    		var isContent = $refEle.attr('data-contentid');
		    		var section, column, content;
		    		if(isContent){
		    			
		    			var sectionId = $refEle.attr('data-sectionid'); 
		    			var columnId = $refEle.attr('data-columnid'); 
		    			
		    			var section = self.getSection(sectionId);
		    			var column = section.columns.find(function(
          remcolumn) {
          return remcolumn.id == columnId;
        });
		    			var content = column.contents.find(function(
          remcontent) {
          return remcontent.id == self.activeElementId;
        })
		    			
		    			
		    		}else{
		    			section = self.getSection(self.activeElementId)
		    		}
			    	
			    	// When delete key pressed
		    		  if(event.keyCode == 46) {
		    			  
		    			  if(!self.activeElementId)
				    			return;
				    		
				    		var $refEle = $('#' + self.activeElementId);
				    		if($refEle.length == 0)
				    			return;
				    		
				    		if(isContent){
				    			// Treat like content
				    			self.removeContent(event, column, content);
				    		}else{
				    			// Treat like section
				    			self.removeSection(event, section)
				    		}
				    		
		    		  }
			    	
    });
			
  },
  computed : {

  },
  methods : {
				
    checkAndAddKeyDownState(keyCode){
					
      clearTimeout(KEY_DOWN_EVENT_TRIGGER_STATE[keyCode+'_timer']);
					
	    			KEY_DOWN_EVENT_TRIGGER_STATE[keyCode] = true;
	    			KEY_DOWN_EVENT_TRIGGER_STATE[keyCode+'_timer'] = setTimeout(function() {
	    				KEY_DOWN_EVENT_TRIGGER_STATE[keyCode] = false;
      }, 700);
	    			
    },
				
    addState(state) {
					 
					 try {

						 console.log('adding state');
						 
						    // may be we have to remove redo steps
						    if (this.currentIndex + 1 < this.history.length) {
						      this.history.splice(this.currentIndex + 1);
						    }
						    this.history.push(JSON.parse(JSON.stringify(state)));
						    this.currentIndex++;
						    
						    // Check undo redo allowed steps size
						    var allowedHistorySize = 17;
						    if(this.history.length > allowedHistorySize){
						    	this.history = this.history.splice(this.history.length - allowedHistorySize);
						    	this.currentIndex = this.history.length - 1;
						    }
						    
      } catch (e) {
      }
    },
				
    undo() {
						  
						  if(this.currentIndex <= 0){
							  return;
						  }
						  
				   try {

					   const prevState = this.history[this.currentIndex - 1];
					   if(!prevState)
				    		return;
					    // take a copy of the history state
					    // because it would be changed during store mutations
					    // what would corrupt the undo-redo-history
					    // (same on redo)
					    
					    var delta = recursiveDiff.getDiff(JSON.parse(JSON.stringify(this.landingpagePrefs)), JSON.parse(JSON.stringify(prevState)));
					
					    console.log(delta);
						
					   this.landingpagePrefs = recursiveDiff.applyDiff(JSON.parse(JSON.stringify(this.landingpagePrefs)), delta);
					    
					   // Apply current element Data
					   this.resetCurrentElement();
					   
					    this.currentIndex--;
					    
      } catch (e) {
      }
				    
				  },

				  redo() {
					  
					  if(this.history.length <= this.currentIndex + 1){
						  return;
					  }
					  
				    	const nextState = this.history[this.currentIndex + 1];
				    	if(!nextState)
				    		return;
					    
					    delta = recursiveDiff.getDiff(JSON.parse(JSON.stringify(this.landingpagePrefs)), JSON.parse(JSON.stringify(nextState)));
						
					    console.log(delta);
						
      this.landingpagePrefs = recursiveDiff.applyDiff(JSON.parse(JSON.stringify(this.landingpagePrefs)), delta);
						
      console.log(this.landingpagePrefs);
						
						 // Apply current element Data
						 this.resetCurrentElement();
						   
					    this.currentIndex++;
					    
				  },
				  
				  resetCurrentElement : function() {
					  
					  var self = this;
					
					  if(!self.activeSettingsElement || !self.activeSettingsElement.elementType || !self.activeSettingsElement.id)
						  return;
					  
					  if(self.activeSettingsElement.elementType == 'section'){
						  
						  console.log('updating section');
						  
						  var section = self.landingpagePrefs.sections.find(function(
          sect) {
          return sect.id == self.activeSettingsElement.id;
        });
						  
						  
						  
						  if(section)
							  self.activateSettingsElement(undefined, section, 'section');
						  else
							  self.deactivateSettingElement();
					  }
					  
					  if(self.activeSettingsElement.elementType == 'content'){
						  
						  var content;
						  
						  self.landingpagePrefs.sections.forEach(function( section) {
							  
							  var ref = section.columns[0].contents.find(function(
            sect) {
            return sect.id == self.activeSettingsElement.id;
          });
							  
							  if(ref)
								  content = ref;
							  
        });
						  
						  if(content)
							  self.activateSettingsElement(undefined, content, 'content');
						  else
							  self.deactivateSettingElement();
						  
					  }
					  
    },
				
    getSection(sectionId){
					
      return this.landingpagePrefs.sections.find(function(
        sect) {
        return sect.id == sectionId;
      })
    },
				
    getcontentInfoFromContentObject: function(content, key) {
						
      var match = this.contents.find(function(contentInfo) {
        return content.type == contentInfo.type;
      });
						
      return match[key]
    },
					
    checkHasContents : function(section) {
					
      try {
						
        if(!section.columns || section.columns.length ==0)
          return false;
						
        var hasContent = false;
						
        section.columns.forEach(function( column) {
          if(column.contents.length > 0)
            hasContent = true;
        });
						
        return hasContent;
						
						
      } catch (e) {
      }

      return false;
				
    },
				
    getSelectedDesignedComponents(list, componentType){
					
      if(!componentType || componentType == 'all')
        return list;
					
      return {componentType : list[componentType]};
					
    },
				
    getContainerStyles(activeViewport){
					
      var styles = {};
					
      styles.width = this.landingpagePrefs.bodySettings[activeViewport+'ContentWidth']+'px';
      styles.maxWidth = this.landingpagePrefs.bodySettings[activeViewport+'ContentWidth']+'px';
      return styles;
					
    },
			   
			   getHandlesBasedOnContentType: function(contentType) {
				   
				   if(!contentType)
					   return;
				  
				   
				   switch (contentType) {
				   
					   case "verticaldivider":
        return "s, n";
      case "divider":
        return "e, w";
      case "text":
        return "e, w";
      case "heading3":
        return "e, w";
      case "html":
        return "all";
      case "image":
        return "all";
      case "button":
        return "all";
      case "space":
        return "all";
      case "icon":
        return "se, sw, ne, nw";
      case "video":
        return "all";
      case "form":
        return "all";
      case "popup":
        return "all";
      default:
        return;
      }
				
    },
				
    backFromBuilder: function(e) {
				
      e.preventDefault();
      e.stopPropagation();

      var editableLPId = "";
      try {
        editableLPId = LANDING_PAGE_JSON.id;
      } catch (e) {
      }
				
      if(confirm('Changes you made may not be saved.')){
        PARENT_UNLOAD_CONFIRM = false;
        removeBuilder();
      }
				
    },
				
    saveLandingPage : function(event) {
					
      if(this.saveInProgress)
        return;
					
      var formattedSections = [];
      var builderSections = landingpageBuilderVueRef.landingpagePrefs.sections;
      for (var i = 0; i < builderSections.length; i++) {
        var section = builderSections[i];
        formattedSections.push({
          content: $(".section-page-content.section-" + section.id).html(),
          builder_json_str: JSON.stringify(section),
          article_section: (section.type == 'collection_section') ? true: false,
        });
      }
					
      var bodySettings = landingpageBuilderVueRef.landingpagePrefs.bodySettings;
      bodySettings.fontFamilies = utils.getUsedFontFamilies(landingpageBuilderVueRef.landingpagePrefs);
					
      LANDING_PAGE_JSON.sections = formattedSections;
      LANDING_PAGE_JSON.template_body_settings = JSON.stringify(bodySettings);
					
      this.saveInProgress = true;
      var self = this;
					
      $.ajax({
        type : "POST",
        data : JSON.stringify(LANDING_PAGE_JSON),
        contentType: "application/json",
        dataType : 'json',
        url : "/rest/api/panel/knowledgebase/settings",
        success : function(data) {
          self.saveInProgress = false;
          PARENT_UNLOAD_CONFIRM = false;
          removeBuilder();
        },
        error : function(err) {
          self.saveInProgress = false;
          // Show success message
          var errorJSON = {};
          errorJSON.message = err;
          errorJSON.alert_type = "danger";
          window.parent.notifySuccessErrorInfo(errorJSON, 6000);
        }
      });
					
    },
				
    previewLandingpage : function(event) {
					
      event.preventDefault();
					
      var prefs = this.getDesignedPagePrefs();
					
      if(!prefs)
        return;
					
      PARENT_UNLOAD_CONFIRM = false;
					
      window.parent.Account_Box_LandingPage_Router_Utils.addLandingPageFromBuilder(prefs, function(data) {
        window.open("/landingpage-builder/preview/preview.jsp?id=" + data.id, "_blank");
        window.parent.location.href = window.parent.location.origin + "/#edit-landingpage/responsive-drag-and-drop-builder/" + data.id;
      });
    },
				
    getDesignedPagePrefs : function() {
					
      // Check has components
      var self = this;
				       
				    // check it has atleast one content
				   	let hasContent = this.landingpagePrefs.sections.length;
				   	if(!hasContent){
				   		 utils.notify("Nothing to save. Please add atleast one content.").error();
				   		return;
				   	}
				   	
      /*let hasContent = utils.checkHasContent(this.landingpagePrefs.sections);
				   	if(!hasContent){
				   		 utils.notify("Nothing to save. Please add atleast one content.").error();
				   		return;
				   	}*/
				   	
				   	var content = $('.builder-html-content').html();
				   	if(!content || !content.trim()){
				   		utils.notify("Something went wrong, Please try again.").error()
				   		return;
				   	}
				   	
				   	var landingPageJSON = LANDING_PAGE_JSON;
				   	
				   	landingPageJSON.html_content = content;
				   	landingPageJSON.type = "DRAG_AND_DROP_RESPONSIVE_BUILDER";
				   	landingPageJSON.builder_prefs = JSON.stringify(this.landingpagePrefs);

				    return landingPageJSON;
    },
				
    changeViewportDesign: function(event, viewport) {
					
      var self = this;
      setTimeout(function() {
						
        self.activeViewport = viewport;
						
        self.deactivateSettingElement();
						
      }, 10);
					
    },
				
    hasChanges : function() {
      // return !utils.equals(this.Email,
      // this.clonedEmail);
    },

    draggedClone : function(obj) {

      var newElement = $.extend(true, {},
        this.defaultOptions[obj.type]);
      newElement.id = utils.uid();
      newElement.component = newElement.type + 'Template';
      newElement.hovered = false;

      return newElement;
    },

    activatePreferencesTab : function(event, type) {

      if (event)
        event.stopPropagation();

      this.navOptionDetailedView = true;
      this.builderPreferencesActiveTab = type;

    },

    closesettingsBlock : function(event) {

      if (event)
        event.stopPropagation();

      this.navOptionDetailedView = false;

    },

    activateSelectedElement : function($event, editElement, elementType) {
					
      if (event)
        event.stopPropagation();
					
      this.minimizedElementSettingsContainer = false;
      this.builderPreferencesActiveTab = '';
					
      var id = editElement.id;
      if(!id || this.activeElementId == id)
        return;
					
      this.closesettingsBlock();
					
      var self = this;
					
      self.activeElementId = [];
      self.removeSettingElement();
      setTimeout(function () {
                    	
                    	self.activeElementId = id;
                    	self.activateSettingsElement($event, editElement, elementType);
    					
      }, 10);
      return;
				
    },
				
    removeSettingElement : function($event) {
					
      if (event)
        event.stopPropagation();
					
      this.activeSettingsElement = {};
    },
				
    activateSettingsElement : function($event, editElement, elementType) {
      if (event)
        event.stopPropagation();

      var self = this;
      self.activeElement = {};
      setTimeout(function () {
                    	self.activeSettingsElement = editElement;
                    	self.activeSettingsElement.elementType = elementType;
      }, 10);
                    
      self.minimizedElementSettingsContainer = false;   
    },
				
    deactivateSettingElement : function($event) {
					
      if (event)
        event.stopPropagation();
					
      this.activeSettingsElement = {};
      this.activeElementId = undefined;

    },
				
    draggedDesignedComponent : function(obj) {
					
      var section = JSON.parse(obj.design_json);
      if(!section)
        return;
					
      utils.rearrangeSectionDeprecatedStyles(section);
					
      return this.addAndresetSectionNessaryProps(section);

    },
				
    addAndresetSectionNessaryProps : function(section) {
					
      var newElement = $.extend(true, {}, section);
      newElement.id = utils.uid();
      newElement.hovered = false;
					
      newElement.columns.forEach(function(column) {
						
        column.id = utils.uid();

        column.contents
          .forEach(function(
            content) {

            content.id = utils.uid();
            content.hovered = false;
									
          });

      });
					
      return newElement;
					
    },
				
    moveSection : function(event, movesection, currentIndex, newIndex) {
					
      if (event)
        event.stopPropagation();
					
      this.landingpagePrefs.sections = this.landingpagePrefs.sections.filter(function(section) {
        return section != movesection;
      });
					
      this.landingpagePrefs.sections.splice(newIndex, 0, movesection);
			
      this.addState(this.landingpagePrefs);
					
    },
				
    cloneSection : function(event, section) {

      if (event)
        event.stopPropagation();

      this.landingpagePrefs.sections
        .splice(this.landingpagePrefs.sections
          .indexOf(section) + 1, 0, this.addAndresetSectionNessaryProps(section));
					
      this.addState(this.landingpagePrefs);
    },
				
				

    cloneContent : function(event, column, content) {

      if (event)
        event.stopPropagation();

      var newEl = JSON.parse(JSON.stringify(content));
      newEl.id = utils.uid();

      column.contents
        .splice(column.contents.indexOf(content) + 1, 0, newEl);
			
      this.addState(this.landingpagePrefs);

    },

    draggedCloneSection : function(obj) {

      var sectionOptions = $.extend(true, {},
        this.defaultOptions[obj.type]);

      sectionOptions.columns.forEach(function(column) {
        column.id = utils.uid();
      });

      var newElement = $.extend(true, {}, sectionOptions);
      newElement.id = utils.uid();
      newElement.hovered = false;
					
      if(sectionOptions.type == 'column_section')
        newElement.ask_column_confirmation = true;
					
      return newElement;
    },
				
    draggedCloneContent : function(obj) {
					
					 var newElement = $.extend(true, {},
							 this.defaultOptions[obj.type]);
      newElement.id = utils.uid();
      newElement.component = newElement.type + 'Template';
      newElement.hovered = false;
						
      if(newElement.type == 'block'){
        newElement.ask_column_confirmation = true;
      }

      return newElement;
    },

    onMove : function() {
					
      try {
        tinymce.editors.forEach(function(editor) {
          return editor.hide();
        });
      } catch (e) {
      }
					
    },
    onMoveEnd : function() {
					
      this.addState(this.landingpagePrefs);
					
      try {
        tinymce.editors.forEach(function(editor) {
          return editor.show();
        });
      } catch (e) {
      }
					
    },

    onOptionsDragStart : function() {
      this.closesettingsBlock();
    },
				
    addNewSection : function(event, index) {

      if (event)
        event.stopPropagation();
					
      var sectionOptions = $.extend(true, {},
        this.defaultOptions['column_section']);

      sectionOptions.columns.forEach(function(column) {
        column.id = utils.uid();
      });

      var newElement = $.extend(true, {}, sectionOptions);
      newElement.id = utils.uid();
      newElement.hovered = false;
					
      this.landingpagePrefs.sections
        .splice(index + 1, 0, this.addAndresetSectionNessaryProps(newElement));
			
      this.showColumnSizeConfiramtion(this.landingpagePrefs.sections[index + 1], function() {
						
        // this.addState(this.landingpagePrefs);
				
      });
					
    },
				
    onAddSection : function(event) {
					
      var self = this;
					
      var refSection = self.landingpagePrefs.sections[event.newIndex];
      if(!refSection)
        return;
					
      if(refSection.ask_column_confirmation){
						
        refSection.ask_column_confirmation = false;
        delete refSection["ask_column_confirmation"];
						
        this.showColumnSizeConfiramtion(refSection);
						
      }
					
    },
				
    showColumnSizeConfiramtion : function(refSection, callback) {
					
      var self = this;
      // Show a modal popup
      this.modalPopup.modalType = 'columnConfirmation';
      this.modalPopup.showModal = true;
      this.modalPopup.heading = "Select Columns";
      this.modalPopup.modalData = {
        columns : 1
      };
      this.modalPopup.callback = function(data) {
						
        /*if(self.modalPopup.modalData.columns == 1)
							return;*/
						
        for (var i = 0; i < self.modalPopup.modalData.columns; i++) {
          if(refSection.columns.length < (i + 1))
            refSection.columns.push(getDefaultColumnOptions());
        }
						
        if(callback)
          callback();
						
      };
					
    },
				
    OnSelectModalPopUp : function() {
					
      if(this.modalPopup.callback)
        this.modalPopup.callback(this.modalPopup.modalData);
					
      this.modalPopup.showModal = false;
					
    },
				
    onOptionsDragEnd : function() {
					
      this.addState(this.landingpagePrefs);
    },

    addNewColumnToSection : function(event, columns) {

      if (event)
        event.stopPropagation();

      columns.push(getDefaultColumnOptions());

    },

    // To fix tinymce instance issue
    updateAllEditorContents : function() {

      this.landingpagePrefs.sections
        .forEach(function(section) {

          section.columns
            .forEach(function(column) {

              column.contents
                .forEach(function(
                  content) {

                  if (content.type == 'text' || content.type == 'heading3') {
                    setTimeout(
                      function() {
																		
                        $(
                          '#'
																						+ content.id
																						+ ' .tinymce-content')
                          .html(
                            content.options.text);
                      },
                      50);

                  }

                });

            });

							

        });

    },

    removeSection : function(event, remSection) {

      if (event)
        event.stopPropagation();

      var self = this;
					
      if(remSection.id == self.activeSettingsElement.id)
        self.deactivateSettingElement()

      return utils
        .confirm(
          'Are you sure?',
          function() {

            self.landingpagePrefs.sections = self.landingpagePrefs.sections
              .filter(function(section) {
                return section != remSection;
              });

            // Update all the tinymce editor content
            self.updateAllEditorContents();
										
            self.addState(self.landingpagePrefs);

          }, null, 'Delete', 'Cancel');

    },

    removeContent : function(event, column, remContent) {

      if (event)
        event.stopPropagation();
					
      var self = this;
					
      if(remContent.id == self.activeSettingsElement.id)
        self.deactivateSettingElement()
						
      return utils.confirm('Are you sure?', function() {

        column.contents = column.contents.filter(function(
          content) {
          return content != remContent;
        });

        self.updateAllEditorContents();
						
        self.addState(self.landingpagePrefs);

      }, null, 'Delete', 'Cancel');
					
					

    },

    mouseOutSection : function(event, section) {
      section.hovered = false;
    },

    mouseEnterSection : function(event, section) {
      section.hovered = true;
    },

    mouseOutContent : function(event, section, content) {
      section.hovered = true;
      content.hovered = false;
    },

    mouseEnterContent : function(event, section, content) {
      section.hovered = false;
      content.hovered = true;
    },

    previewEmail : function(event) {},

    saveEmailTemplate : function(event) {},
				
    /*updateSectionHeightFromContent(sectionId, content, viewport){
					
					// Check if column height less than content height
					  var section = landingpageBuilderVueRef.landingpagePrefs.sections.find(function(
								sect) {
							return sect.id == sectionId;
						});
					  var contentbottom = Number(content.options[viewport]['height']) + Number(content.options[viewport]['top']);
	    			  if(section.options[viewport].height < contentbottom){
	            			section.options[viewport].height = contentbottom;
	    			  }
				},*/
				
  },
  directives : {},
  filters : {

  },
  components : {}
}
</script>

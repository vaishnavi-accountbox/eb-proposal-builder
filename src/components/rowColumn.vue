<template id="rowColumnTemplate">

	<div class="row column-container m-0 no-gutters" style="position:relative;">

		<draggable v-for="column in columns" element="div" class="column-element content-container "
				   v-bind:key="column.id"
				   :class="['align-self-'+ column.alignItems, viewport == 'mobile' ? 'col-sm-12' : getColumnClassName(column), (checkAnyColumnHasContent(columns)) ? '' :'empty' ]"
				   :list="column.contents"
				   :options="{group: {name: 'content', put: true}, sort: true, handle: 'i.content-move'}" @start="onMove"
				   @end="onMoveEnd" ref="column" @add="onAddContent($event, column)"
				   :style="getSelectedStyles(column.options, {}, ['padding', 'margin', 'border', 'box-shadow', 'background'])">

			<div class="content-element ebcontent ui-selected"
				 :class="[{'selected': activeElementId() == content.id}, content.type+'-content']"
				 v-for="(content, index) in column.contents" :id="content.id"
				 @click="activateSelectedElement($event, content, 'content')"
				 :style="getSelectedStyles(content.options, {}, ['padding', 'margin', 'background', 'box-shadow', 'border', 'font'])">

				<div class="content-element-actions">

					<span class="pl-1" v-html="getContentName(content.type)"></span>

					<i class="other-actions fa fa-pencil" title="Edit"
					   @click="activateSelectedElement($event, content, 'content')"></i>

					<i class="other-actions content-drag-handle content-move fa fa-arrows" title="Move"></i>

					<i class="other-actions delete fa fa-trash" title="Delete Content"
					   @click="removeContent($event, column, content)"></i>

					<i class="other-actions clone fa fa-clone" title="Clone Content"
					   @click="cloneContent($event, column, content)"></i>

				</div>

				<!-- 												<div v-if="content.type != 'block'" class="content-move-actions"><i class="actions content-move fa fa-arrows"></i></div> -->

				<component v-if="(viewport == 'desktop' && content.options.desktop.visible) || (viewport == 'mobile' && content.options.mobile.visible)" :content="content" :viewport="viewport" :is="content.component" :renderby="'builder'">
				</component>
				<div v-else
					v-html="(viewport == 'mobile' && !content.options.mobile.visible)
              ? `This element won't be displayed on mobile`
              : (viewport == 'desktop' && !content.options.desktop.visible)
                ? `This element won't be displayed on desktop`
                : ''">
				</div>

			</div>


		</draggable>

	</div>

</template>

<script>
import { getBuilderDefaultSettings, getDefaultColumnOptions, landingpageBuilderVueRef } from '../global';

export default {
  props: ['columns', 'viewport'],
  name: 'rowColumn',
  methods: {

    activateSelectedElement: function ($event, editElement, elementType) {
      landingpageBuilderVueRef.activateSelectedElement($event, editElement, elementType);
    },
    activateSettingsElement: function ($event, editElement, elementType) {
      landingpageBuilderVueRef.activateSettingsElement($event, editElement, elementType);
    },

    getContentName(contentType) {

      var contentName = contentType;
      getBuilderDefaultSettings().contents.forEach(function (content) {
        if (content.type == contentType)
          contentName = content.primary_head;
      });
      return contentName;

    },

    checkAnyColumnHasContent(columns) {
      var hasContent = false;
      columns.forEach(function (column) {
        if (column.contents && column.contents.length > 0)
          hasContent = true;
      });
      return hasContent;
    },

    onAddContent(event, column) {

      var self = this;

      var refContent = column.contents[event.newIndex];
      if (!refContent || refContent.type != 'block' || !refContent.ask_column_confirmation)
        return;

      refContent.ask_column_confirmation = false;
      delete refContent["ask_column_confirmation"];

      // Show a modal popup
      landingpageBuilderVueRef.modalPopup.modalType = 'columnConfirmation';
      landingpageBuilderVueRef.modalPopup.showModal = true;
      landingpageBuilderVueRef.modalPopup.heading = "Select Columns";
      landingpageBuilderVueRef.modalPopup.modalData = {
        columns: 1
      };
      landingpageBuilderVueRef.modalPopup.callback = function (data) {

        if (landingpageBuilderVueRef.modalPopup.modalData.columns == 1)
          return;

        for (var i = 0; i < landingpageBuilderVueRef.modalPopup.modalData.columns; i++) {
          if (refContent.columns.length < (i + 1))
            refContent.columns.push(getDefaultColumnOptions());
        }

      };

    },

    cloneContent(event, column, content) {
      landingpageBuilderVueRef.cloneContent(event, column, content);
    },

    removeContent(event, column, remContent) {
      landingpageBuilderVueRef.removeContent(event, column, remContent)
    },

    getColumnClassName(column, viewport) {

      if (viewport && viewport == 'mobile')
        return "";

      return (!column.auto_width && column.size > 0) ? 'col-md-' + column.size : 'col';

    },

    activeElementId() {
      try {
        return landingpageBuilderVueRef.activeElementId;
      } catch (e) {
        return "";
      }

    },

    activateSelectedElement(event, content, type) {
      landingpageBuilderVueRef.activateSelectedElement(event, content, type);
    },

    onMove: function () {

      try {
        tinymce.editors.forEach(function (editor) {
          return editor.hide();
        });
      } catch (e) {
      }

    },
    onMoveEnd: function () {

      landingpageBuilderVueRef.addState(this.landingpagePrefs);

      try {
        tinymce.editors.forEach(function (editor) {
          return editor.show();
        });
      } catch (e) {
      }

    },

  }
}
</script>
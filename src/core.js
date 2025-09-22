import Vue from 'vue'   
import {utils} from "@/app";  
import {getBuilderDefaultSettings} from "@/global";
import './initializer.js';
import './component.js'
import $ from "jquery";
var KEY_DOWN_EVENT_TRIGGER_STATE = {};

var landingpageBuilderVueRef;
export function mountBuilder() {

  Vue.component("landingpage-builder",     {
      template : '#landingpageBuilderComponent',
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

  )
// new Vue({
//     el: "#app",
//     render: h => h("landingpage-builder")
//   });
  new Vue({
  // el: "#app",
  template: `
    <template>
  <div class="container mt-5">
    <h1>xhgjk</h1>
  </div>
</template>
  `
}).$mount('#app');
//   landingpageBuilderVueRef = new Vue(
// ).$mount('#app');


}

Vue.filter('makeTitle', function(value) {
  if (!value)
    return '';
  value = utils.camelToSnake(value);
  value = value.charAt(0).toUpperCase() + value.slice(1);
  return value.replace(/_/g, ' ');
});
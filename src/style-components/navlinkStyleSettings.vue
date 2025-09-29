<template id="navlinkStyleSettingsTemplate">

	<div>

			<div class="text-right mb-2">
						<a href="#"  @click="addNewNavbarLink($event)">Add a new option</a>
				</div>
				
						<draggable 
								:list="navlist"
								:options="{group: {name: 'navbarLinkList', put: true}, sort: true, handle: '.move-section'}"
								@sort="updateInlineEditorContent()"
								>
							
							<div class="section-list-item settings-accordion" v-settings-accordion v-for="(button, index) in navlist" 
								style="padding: 10px; background: #f6f6f6; margin-bottom: 10px;">
							
								<div class="row section-item-actions m-0 p-0" style="margin-bottom: 2px;">
										<div class="col no-gutter p-0" style="max-width: 20px;">
											<span class="icon cursor-move"><i class="move-section fa fa-arrows"></i></span>
										</div>
										<div class="col no-gutter p-0">
											<span class="inline-text-container" v-html="button.text"></span>
										</div>
										<div class="col text-right no-gutter p-0" style="max-width: 50px;">
											<span class="cursor-pointer pl-1" @click="removeButton($event, index, navlist)"><i class="fa fa-remove" title="Remove Option" style="display: inline;"></i> </span>
											<span class="cursor-pointer pl-1" @click="cloneButton($event, button)"><i class="fa fa-clone" title="Clone Option" style="display: inline;"></i> </span>
											<span class="accordion-toggle-body font-size-13 cursor-pointer pl-1"><i class="fa fa-angle-down accordion-open"></i><i class="fa fa-angle-right accordion-close"></i></span>
										</div>
										
									</div>
									
									<div class="settings-accordion-body">
									
									   <div class="form-group">
									   
									   <div class="form-check form-check-inline1">
											  <input v-input-field="'change'" class="form-check-input" type="checkbox" v-model="button['dropdown']" :id="index+'buttonDropdown'">
											  <label class="form-check-label" :for="index+'buttonDropdown'">
											    Dropdown
											  </label>
											</div>
											
								     </div>
								     
										<div class="form-group">
											<label>Option name</label>
											<div class="">
												<div class="tinymce-content inline-text-container inline-text-editor" v-tinymce-editor-inline-elements :data-initialize-content="button['text']"></div>
												<textarea style="display:none;visibility:hidden" v-model="button['text']"></textarea>    
											</div>
										</div>
								     
								     <template v-if="!button['dropdown']">
								     	 <style-click-action  :clickaction="button.clickAction"></style-click-action>
								     </template>
								    
								     <div v-if="button['dropdown']">
								     	
								     	<hr>
								     	
								     	<div class="text-right mb-2">
												<a href="#"  @click="addNewDropdownItem($event, button.dropdownList)">Add list items</a>
										</div>
				
		     							<div v-for="(dropdown, index1) in button.dropdownList">
		     								
		     								<span class="cursor-pointer pull-right" @click="removeDropdownItem($event, button.dropdownList, index1)"><i class="fa fa-remove" title="Remove Column" style="display: inline;"></i> </span>

		     								 <div class="form-group">
													<label>List item name</label>
													<input min="0"  type="text" autofocus class="form-control eb-form-control" v-input-field="'blur'"
														v-model.lazy="dropdown['text']"/>
												
											</div>
											
											<style-click-action :clickaction="dropdown.clickAction"></style-click-action>
																					
		     								<hr>
		     							</div>
									 </div> 
									
									</div>
								
								
							</div>
							
							</draggable>

</div>
</template>
<script>
export default {
  name: "navlinkStyleSettings",
  props: ['navlist'],
  methods: {

    removeButton(event, index, navlist) {
      event.preventDefault();
      console.log('index', index);
      navlist.splice(index, 1);

    },

    cloneButton(event, button) {

      event.preventDefault();

      this.navlist.splice(this.navlist
        .indexOf(button) + 1, 0, $.extend(true, {}, button));

    },

    removeDropdownItem(event, dropdownList, index) {
      event.preventDefault();
      dropdownList.splice(index, 1);
    },

    addNewNavbarLink(event) {
      event.preventDefault();
      this.navlist.push({
        dropdown: false,
        text: 'Home',
        clickAction: {},
        dropdownList: []
      });
    },

    addNewDropdownItem(event, list) {
      event.preventDefault();
      list.push({
        text: 'Home',
        clickAction: {}
      });
    }

  }
};
</script>

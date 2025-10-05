<template id="iconStyleSettingsTemplate">

<div>

			<div class="text-right mb-2">
						<a href="#"  @click="addNewIcon($event)">Add a new icon</a>
				</div>
				
						<draggable 
								:list="icons"
								:options="{group: {name: 'iconList', put: true}, sort: true, handle: '.move-section'}"
								>
							
							<div class="section-list-item settings-accordion" v-settings-accordion v-for="(icon, index) in icons" 
								style="padding: 10px; background: #f6f6f6; margin-bottom: 10px;">
							
								<div class="row section-item-actions m-0 p-0" style="margin-bottom: 2px;">
										<div class="col no-gutter p-0" style="max-width: 20px;">
											<span class="icon cursor-move"><i class="move-section fa fa-arrows"></i></span>
										</div>
										<div class="col no-gutter p-0">
											<span><i class="fa" :class="['fa-'+icon.icon_class]"></i></span>
										</div>
										<div class="col text-right no-gutter p-0" style="max-width: 50px;">
											<span class="cursor-pointer pl-1" @click="removeIcon($event, index)"><i class="fa fa-remove" title="Remove Icon" style="display: inline;"></i> </span>
											<span class="cursor-pointer pl-1" @click="cloneIcon($event, icon)"><i class="fa fa-clone" title="Clone Icon" style="display: inline;"></i> </span>
											<span class="accordion-toggle-body cursor-pointer pl-1"><i class="fa fa-angle-down accordion-open"></i><i class="fa fa-angle-right accordion-close"></i></span>
										</div>
										
									</div>
									
									<div class="settings-accordion-body">
										
										<fa-icon-library :option="icon"></fa-icon-library>
										
										<label class="sub-label mt-3">Size</label>
										<div class="form-group">
												<input type="number" v-input-field="'blur'"
													v-model="icon.size" class="form-control eb-form-control" />
										</div>
										
										<label class="sub-label">Color</label>
										<div class="form-group">
												<input type="text" v-color-code="icon.color" v-input-field="'blur'"
																v-model="icon.color" readonly class="color-picker form-control eb-form-control" data-alpha-enabled="false"/>
										</div>
										
										<label class="sub-label">Click Action</label>
										<style-click-action  :clickaction="icon.clickAction"></style-click-action>
											
										<label class="sub-label">Space</label>
										<style-padding :padding="icon.padding" :hideheading="true"></style-padding>
												
									</div>
								
								
							</div>
							
							</draggable>

</div>

</template>

<script>
import $ from "jquery";
export default {
  name: 'styleIconSettings',
  props : [ 'icons' ],
  methods : {
		
    addNewIcon(event){
			
      if (event)
        event.stopPropagation();
			
      var newIcon = $.extend(true, {}, {
        color : '#333',
        size: 50,
        icon_class : 'smile-o',
        padding: {
          top: 0,
          bottom: 0,
          left: 5,
          right: 5
        },
        clickAction : {
          type : 'none',
          value : '',
        },
      });
			
      this.icons.push(newIcon);
			
      window.landingpageBuilderVueRef.addState(window.landingpageBuilderVueRef.landingpagePrefs);
			
    },
		
    cloneIcon(event, icon){
			
      if (event)
        event.stopPropagation();
			
      var newIcon = $.extend(true, {}, icon);
			
      this.icons
        .splice(this.icons
          .indexOf(icon) + 1, 0, newIcon);
			
      window.landingpageBuilderVueRef.addState(window.landingpageBuilderVueRef.landingpagePrefs);
			
    },
		
    removeIcon(event, index){
			
      if (event)
        event.stopPropagation();

      var self = this;
			
      self.icons.splice(index, 1);

      window.landingpageBuilderVueRef.addState(window.landingpageBuilderVueRef.landingpagePrefs);
			
    }
  }
}
</script>
<template id="columnSettingsTemplate">

<div>

			<div v-if="columns.length <= 12" class="text-right mb-2">
						<a href="#"  @click="addNewColumn($event)">Add a new column</a>
				</div>
				
						<draggable 
								:list="columns"
								:options="{group: {name: 'sectionList', put: true}, sort: true, handle: '.move-section'}"
								>
							
							<div class="section-list-item settings-accordion" v-settings-accordion v-for="(column, index) in columns" 
								style="padding: 10px; background: #f6f6f6; margin-bottom: 10px;">
							
								<div class="row section-item-actions m-0 p-0" style="margin-bottom: 2px;">
										<div class="col no-gutter p-0" style="max-width: 20px;">
											<span class="icon cursor-move"><i class="move-section fa fa-arrows"></i></span>
										</div>
										<div class="col no-gutter p-0">
											<span>Column {{index+1}}</span>
										</div>
										<div class="col text-right no-gutter p-0" style="max-width: 50px;">
											<span class="cursor-pointer pl-1" @click="removeColumn($event, index)"><i class="fa fa-remove" title="Remove Column" style="display: inline;"></i> </span>
											<span class="cursor-pointer pl-1" @click="cloneColumn($event, column)"><i class="fa fa-clone" title="Clone Column" style="display: inline;"></i> </span>
											<span class="accordion-toggle-body cursor-pointer pl-1"><i class="fa fa-angle-down accordion-open"></i><i class="fa fa-angle-right accordion-close"></i></span>
										</div>
										
									</div>
									
									<div class="settings-accordion-body">
									
									   <div class="form-group">
									     	<div class="form-check form-check-inline1 mb-3">
														  <input v-input-field="'change'" class="form-check-input" value="top" type="checkbox" v-model="column['auto_width']" :id="'columnAutoWidth'+column.id">
														  <label class="form-check-label" :for="'columnAutoWidth'+column.id">
														    Adjust column width automatically
														  </label>
														</div>
									     </div>
									
										<div v-if="!column.auto_width" class="form-group row">
									
												<label class="col-sm-12 col-form-label">Width</label> 
												 <div class="col-sm-12"><input type="range" min="0" v-input-field="'blur'"
														max="12"
														v-model="column['size']"> 
												</div>
											</div>
											
											<div class="form-group">
												<label>Align Items</label>
												   		<select class="form-control eb-form-control text-capitalize" v-input-field="'blur'"
															v-model="column['alignItems']">
															<option value="default">Auto</option>
															<option value="start">Start</option>
															<option value="center">Center</option>
															<option value="end">End</option>
						
														</select>
												</div>
											
										<style-padding :padding="column.options.padding"></style-padding>
											<hr>
										<style-margin :margin="column.options.margin"></style-margin>
										
										<hr>
										<label class="sub-label">Background</label>
									
										<style-background :background="column.options.background" ></style-background>
										
										<hr>
										<label class="sub-label">Border</label>
										
										<style-border :border="column.options.border" ></style-border>
										
										<hr>
										<label class="sub-label">Box Shadow</label>
										<style-box-shadow :boxshadow="column.options.boxShadow"></style-box-shadow>
									
									</div>
								
								
							</div>
							
							</draggable>

</div>
							
</template>

<script>
import $ from "jquery";
import { utils } from "../app";
import { getDefaultColumnOptions } from "../global";
export default {
  name: 'columnSettings',
  props : [ 'columns' ],
  methods : {
		
    addNewColumn(event){
			
      if (event)
        event.stopPropagation();
			
      var newColumn = $.extend(true, {}, getDefaultColumnOptions());
      newColumn.id = utils.uid();
			
      this.columns.push(newColumn);
			
      window.landingpageBuilderVueRef.addState(window.landingpageBuilderVueRef.landingpagePrefs);
			
    },
		
    cloneColumn(event, column){
			
      if (event)
        event.stopPropagation();
			
      var newColumn = $.extend(true, {}, column);
      newColumn.id = utils.uid();
			
      this.columns
        .splice(this.columns
          .indexOf(column) + 1, 0, newColumn);
			
      window.landingpageBuilderVueRef.addState(window.landingpageBuilderVueRef.landingpagePrefs);
			
    },
		
    removeColumn(event, index){
			
      if (event)
        event.stopPropagation();

      var self = this;
			
      return utils
        .confirm(
          'Are you sure?',
          function() {
								
            self.columns.splice(index, 1);

            window.landingpageBuilderVueRef.addState(window.landingpageBuilderVueRef.landingpagePrefs);

          }, null, 'Delete', 'Cancel');
			
			
    }
  }
}
</script>
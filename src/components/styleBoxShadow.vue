<template id="styleBoxShadowTemplate">

<div v-if="boxshadow">

	<div class="custom-control custom-switch">
							  <input v-model="boxshadow['enabled']" type="checkbox" class="custom-control-input" :id="'boxshadowSettings'+dummyid" v-input-field="'change'">
							  <label class="custom-control-label" :for="'boxshadowSettings'+dummyid">Box Shadow</label>
							</div>
							
							<div v-if="boxshadow['enabled']">
							
								<div class="form-group row">
									<label class="col-sm-12 col-form-label">Horizontal Length</label> 
									<div class="col-sm-12">
										<input v-model="boxshadow['horizontalLength']" type="range" min="-10" max="10" v-input-field="'blur'"> 
										<small class="">{{boxshadow['horizontalLength']}}px</small>
									</div>
								</div>
								
								<div class="form-group row">
									<label class="col-sm-12 col-form-label">Vertical Length</label> 
									<div class="col-sm-12">
										<input v-model="boxshadow['verticalLength']" type="range" min="-10" max="10" v-input-field="'blur'"> 
										<small class="">{{boxshadow['verticalLength']}}px</small>
									</div>
								</div>
								
								<div class="form-group row">
									<label class="col-sm-12 col-form-label">Blur Radius</label> 
									<div class="col-sm-12">
										<input v-model="boxshadow['blurRadius']" type="range" min="0" max="50" v-input-field="'blur'"> 
										<small class="">{{boxshadow['blurRadius']}}px</small>
									</div>
								</div>
								
								<div class="form-group row">
									<label class="col-sm-12 col-form-label">Spread Radius</label> 
									<div class="col-sm-12">
										<input v-model="boxshadow['spreadRadius']" type="range" min="-50" max="50" v-input-field="'blur'"> 
										<small class="">{{boxshadow['spreadRadius']}}px</small>
									</div>
								</div>
								
								<div class="form-group row">
									<label class="col-sm-12 col-form-label">Shadow Color</label> 
									<div class="col-sm-12">
										<input type="text" data-alpha-enabled="true"  v-color-code="boxshadow['color']" v-input-field="'blur'"
												v-model="boxshadow['color']" readonly class="color-picker form-control eb-form-control" />
							
									</div>
								</div>
							
							</div>
			</div>								
</template>
<script>
import { utils } from '../app';

export default {
  name: 'styleBoxShadow',
  props : [ 'boxshadow' ],
  data: function() {
    return {
      dummyid: utils.uid()
    }
  },
}
</script>
<template id="styleBorderTemplate">
<div v-if="border">
<div class="form-group row">
								<label class="col-sm-12 col-form-label">Width</label> 
								<div class="col-sm-12">
									<input v-model="border['size']" type="range" min="0" max="20" v-input-field="'blur'"> 
									<small class="">{{border['size']}}px</small>
								</div>
							</div>
							
							<div class="form-group row">
								<label class="col-sm-12 col-form-label">Style</label> 
								<div class="col-sm-12">
									<select class="form-control eb-form-control" v-model="border['style']" v-input-field="'blur'">
									<option
										v-for="option in globals['borderStyleOptions']"
										:value="option">{{option}}</option>
								</select>
								</div>
							</div>
							
							<div class="form-group row">
								<label class="col-sm-12 col-form-label">Color</label> 
								<div class="col-sm-12">
									<input type="text" v-color-code="border['color']" :style="{borderLeftColor:border['color']}" v-input-field="'blur'"
												v-model="border['color']" readonly class="color-picker form-control eb-form-control" />
								</div>
							</div>
							
							<div v-if="border.hasOwnProperty('applyTo')" class="form-group row">
							
								<label class="col-sm-12 col-form-label">Apply To</label> 
								<div class="col-sm-12">
											<div class="form-check form-check-inline1">
											  <input v-input-field="'change'" class="form-check-input" value="top" type="checkbox" v-model="border['applyTo']" id="applyToBorderTop">
											  <label class="form-check-label" for="applyToBorderTop">
											    Top
											  </label>
											</div>
											
											<div class="form-check form-check-inline1">
											  <input v-input-field="'change'" class="form-check-input" value="bottom" type="checkbox" v-model="border['applyTo']" id="applyToBorderBottom">
											  <label class="form-check-label" for="applyToBorderBottom">
											    Bottom
											  </label>
											</div>
											
											<div class="form-check form-check-inline1">
											  <input v-input-field="'change'" class="form-check-input" value="right" type="checkbox" v-model="border['applyTo']" id="applyToBorderRight">
											  <label class="form-check-label" for="applyToBorderRight">
											    Right
											  </label>
											</div>
											
											<div class="form-check form-check-inline1">
											  <input v-input-field="'change'" class="form-check-input" value="left" type="checkbox" v-model="border['applyTo']" id="applyToBorderLeft">
											  <label class="form-check-label" for="applyToBorderLeft">
											    Left
											  </label>
											</div>
								
								</div>
								
							</div>
							
							<div v-if="border.hasOwnProperty('radius')" class="form-group row">
								<label class="col-sm-12 col-form-label">Radius</label> 
								<div class="col-sm-12">
									<input v-model="border['radius']" type="range" min="0" max="100" v-input-field="'blur'"> 
									<small class="">{{border['radius']}}px</small>
								</div>
							</div>
							
							<div v-if="border.hasOwnProperty('radiusApplyTo')" class="form-group row">
							
								<label class="col-sm-12 col-form-label">Radius Apply To</label> 
								<div class="col-sm-12">
											<div class="form-check form-check-inline1">
											  <input v-input-field="'change'" class="form-check-input" value="top_left" type="checkbox" v-model="border['radiusApplyTo']" id="applyToRadiusTopLeft">
											  <label class="form-check-label" for="applyToRadiusTopLeft">
											    Top Left
											  </label>
											</div>
											
											<div class="form-check form-check-inline1">
											  <input v-input-field="'change'" class="form-check-input" value="top_right" type="checkbox" v-model="border['radiusApplyTo']" id="applyToRadiusTopRight">
											  <label class="form-check-label" for="applyToRadiusTopRight">
											    Top Right
											  </label>
											</div>
											
											<div class="form-check form-check-inline1">
											  <input v-input-field="'change'" class="form-check-input" value="bottom_left" type="checkbox" v-model="border['radiusApplyTo']" id="applyToRadiusBttomLeft">
											  <label class="form-check-label" for="applyToRadiusBttomLeft">
											    Bottom Left
											  </label>
											</div>
											
											<div class="form-check form-check-inline1">
											  <input v-input-field="'change'" class="form-check-input" value="bottom_right" type="checkbox" v-model="border['radiusApplyTo']" id="applyToRadiusBottomRight">
											  <label class="form-check-label" for="applyToRadiusBottomRight">
											    Bottom Right
											  </label>
											</div>
								
								</div></div>
								
								
							</div>				
</template>
<script>
import { utils } from '../app';
import { builderGlobals } from '../global';

export default {
  name: 'styleBorder',
  props : [ 'border' ],
  data : function() {
    return {
      globals : builderGlobals,
      dummyid: utils.uid()
    };
  },
}
</script>
<template id="fontStyleSettingsTemplate">

					<div>

 							<div class="form-group row" v-if="font['color']">
								  <label class="col-sm-12 col-form-label">Color</label>
								  <div class="col-sm-12">
									  <input v-input-field="'blur'" type="text" v-color-code="font['color']" :style="{borderLeftColor:font['color']}"
														v-model="font['color']" readonly class="color-picker form-control eb-form-control" />	
								  </div>
							</div>
							
							<div class="form-group row" v-if="font['linkColor']">
								  <label class="col-sm-12 col-form-label">Link Color</label>
								  <div class="col-sm-12">
								  		<input v-input-field="'blur'" type="text" v-color-code="font['linkColor']" :style="{borderLeftColor:font['linkColor']}"
													v-model="font['linkColor']" readonly class="color-picker form-control eb-form-control"/>	
								  </div>
							</div>
							
							<div class="form-group row" v-if="font['size']">
								
								<label class="col-sm-12 col-form-label">Size</label> 
								 <div class="col-sm-12"><input type="range" min="5" v-input-field="'blur'"
										max="120" id="font-size"
										v-model="font['size']"> <small class="">{{font['size']}}px</small>
								</div>
							</div>
							
							<div class="form-group row" v-if="font['weight']">
								
								<label class="col-sm-12 col-form-label">Weight</label> 
								<div class="col-sm-12">
								<select class="form-control eb-form-control" v-input-field="'blur'"
									v-model="font['weight']">
									<option
										v-for="option in globals['fontWeightOptions']"
										:value="option">{{option}}</option>
								</select>
								</div>
							</div>
							
							<div class="form-group row"
								v-if="font['family']" >
								
								<label class="col-sm-12 col-form-label">Family</label> 
								<div class="col-sm-12">
									<select class="form-control eb-form-control text-capitalize" v-input-field="'blur'" v-model="font['family']" @change="fontStyleChanged(font['family'])">
										
										<option style="" value="inherit">Inherit</option>
										<option style="text-transform: capitalize;" :style="{fontFamily: option}" v-for="option in globals['webFontFamily']" :value="option">{{option}}</option>
											
											<optgroup label="Google Fonts">
												<option style="text-transform: capitalize;"
												v-for="option in globals['googleFontFamily']"
												:value="option" v-html="option.split('_').join(' ')"></option>
											</optgroup>
											
									</select>
								</div>
							</div>
							
							<div v-if="font['lineHeight']" class="form-group row">
								<label class="col-sm-12 col-form-label">Line Height</label>	
								<div class="col-sm-12">
									<select class="form-control eb-form-control" v-input-field="'blur'"
										v-model="font['lineHeight']">
										<option
											v-for="option in globals['lineHeightOptions']"
											:value="option">{{option}}</option>
									</select>
								</div>
							</div>
							
							<div v-if="font['alignment']" class="form-group row">
								<label class="col-sm-12 col-form-label">Alignment</label>	
								<div class="col-sm-12">
									<div class="btn-group" role="group">
									  <span :class="[(font['alignment'] == 'left') ? 'btn-info' : 'btn-light']" title="Left" class="btn btn-sm " @click="font['alignment']='left'"><i class="fa fa-align-left"></i></span>
									  <span :class="[(font['alignment'] == 'center') ? 'btn-info' : 'btn-light']" title="Center" class="btn btn-sm " @click="font['alignment']='center'"><i class="fa fa-align-center"></i></span>
									  <span :class="[(font['alignment'] == 'right') ? 'btn-info' : 'btn-light']" title="Right" class="btn btn-sm " @click="font['alignment']='right'"><i class="fa fa-align-right"></i></span>
									  <span :class="[(font['justify'] == 'left') ? 'btn-info' : 'btn-light']" title="Justify" class="btn btn-sm " @click="font['alignment']='justify'"><i class="fa fa-align-justify"></i></span>
									</div>
								</div>
							</div>
							
						</div>
						
</template>


<script>
import { utils } from "../app"
import { builderGlobals } from "../global";
// import '../../public/lib/wcolpick/wcolpick.css';
export default {
  name: 'fontStyleSettings',
  props: ['font', 'editelementtype'],
  data: function () {
    return {
      globals: builderGlobals,
    };
  },
  watch: {

    'font.linkColor': function (newVal, oldVal) {
      if (this.editelementtype == 'body') {
        utils.bodyLinkColorChanged(this.font.linkColor);
      }
    },

    'font.family': function (newVal, oldVal) {
      if (this.editelementtype == 'body') {
        utils.loadFontFamily(this.font.family);
      }
    }

  },

  methods: {

    fontStyleChanged() {
      utils.loadFontFamily(this.font.family);
    }

  }
}
</script>
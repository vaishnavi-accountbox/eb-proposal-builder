
<template id="styleBackgroundTemplate">


		<div>
										<div class="form-group">
								<label>Style</label>
								<select class="form-control eb-form-control" v-model="background['type']" v-input-field="'blur'">
									<option value="none">None</option>
									<option value="solid">Solid Color</option>
									<option value="solid_and_gradient">Solid color with gradient</option>
									<option value="gradient">Gradient</option>
									<option value="image">Image</option>
									<option value="image_and_solid_color">Image with solid color</option>
									<option value="image_and_gradient">Image with gradient</option>
<!-- 								<option value="video">Video</option> -->
								</select>
						     </div>
						     
						     <div v-if="background['type'] == 'solid' || background['type'] == 'solid_and_gradient' || background['type'] == 'image_and_solid_color'" class="form-group">
								<label>color</label>
								<input type="text" data-alpha-enabled="true" data-transparent="true" v-color-code="background['color']" :style="{borderLeftColor:background['color']}" v-input-field="'blur'"
												v-model="background['color']" readonly class="color-picker form-control eb-form-control" />
						     </div>
						     
						     <div v-if="background['type'] == 'video'">
						     
						     		<div class="form-group">
										<label>Video Link To</label>
								   		<select class="form-control eb-form-control" id="link-to" v-input-field="'blur'"
											v-model="background['video']['type']">
											<option value="youtube">Youtube Video</option>
											<option value="vimeo">Vimeo Video</option>
											<option value="engagebay">EngageBay Video</option>
		
										</select>
									</div>	
							
									<div v-if="background['video']['type'] === 'youtube' || background['video']['type'] === 'vimeo'" >
									
										<div class="form-group">
											<label v-if="background['video']['type'] === 'youtube'" class="">Youtube video ID</label>
											<label v-if="background['video']['type'] === 'vimeo'" class="">Vimeo video ID</label>
											<input id="link" type="url" autofocus class="form-control eb-form-control" v-input-field="'blur'"
													v-model="background['video']['url']" />
										</div>
									</div>
									
									<div v-if="background['video']['type'] == 'engagebay'" class="form-group">
									
										<engagebay-video-templates :videooptions="background['video']">
											
										</engagebay-video-templates>
											
									</div>
						     
						     </div>
						     
						     <div v-if="background['type'] == 'image' || background['type'] == 'image_and_solid_color' || background['type'] == 'image_and_gradient'">
								
								<div  class="form-group">
									<label v-if="background['type'] == 'image'">Image</label>
									<div class="d-flex">
										<div v-if="background['image']['url']" style="width: 80px;padding: 10px">
											<img :src="background['image']['url']" width="100%" height="auto" class="display-image" alt="" />
										</div>
										
										<div class="flex-grow-1">
										
												<span class="btn btn-info btn-sm d-block mb-2" @click="showBgImageModal=true">Change Image </span>
												<input type="text" class="form-control eb-form-control image-path" v-input-field="'blur'"
														v-model="background['image']['url']" placeholder="Image URL"/>			
												
										</div>
										
										<div>
										    <b-modal v-model="showBgImageModal" size="xl" ref="bgImageModalPopup">
										  
										  <template v-slot:modal-title>
										      <span style="font-size:20px;">Choose Image</span>
										    </template>
										    
										  	<b-container fluid>
										  		
										  		<repository-image-files :allowscaling="false" :option="background['image']" :fileurlkeyname="'url'" @closepopup="showBgImageModal=false"></repository-image-files>
										  		
										  	</b-container>
										  	
										  	 <template v-slot:modal-footer>
										        <div>
										        	<span class="btn btn-outline-warning mr-2 btn-sm modal-close" @click="showBgImageModal=false">Close</span>
										        	<!-- <span class="btn btn-warning mr-2 btn-sm" @click="hideModal('bgImageModalPopup')">Okay</span>  -->
										        </div>
										      </template>
										    
										  </b-modal>
										</div>
										
										<!-- Button trigger modal -->
										
										<!-- <div class="flex-grow-1">
												<div v-input-file-upload class="upload-image-container">
												
													<div class="upload">
														
														<div class="upload-image">
															<input id="backgroundImageUploading1" class="inputfile" type="file">
															<label for="backgroundImageUploading1" class="btn btn-info btn-sm d-block">
															
															 Change Image <img class="uploading" style="display:none;" src="https://d2p078bqz5urf7.cloudfront.net/cloud/dev/assets/img/loader/facebook.gif"></label>
															
														</div>
													</div>
													<input type="text" class="form-control eb-form-control image-path"
														v-model="background['image']['url']" placeholder="Image URL"/>
											</div>
										</div> -->
									
									</div>
								</div>
								
								<div v-if="background['image']['url']">
									
										<div class="form-group">
											<label>Repeat</label>
											<select class="form-control eb-form-control text-capitalize" v-model="background['image']['repeat']" v-input-field="'blur'" >
												<option value="no-repeat">No-Repeat</option>
												<option value="repeat-x">Horizontal</option>
												<option value="repeat-y">Vertical</option>
												<option value="repeat">Both</option>
											</select>
									     </div>
									     
									     <div class="form-group">
											<label>Parallax Effect</label> <select
												 type="text" class="form-control eb-form-control text-capitalize" v-input-field="'blur'"
												v-model="background['image']['attachment']" ><option value="scroll">Scroll</option><option value="fixed">Fixed</option></select>
										</div>
										
										<div class="form-group">
											<label>Adjustment</label>
											<select type="text" class="form-control eb-form-control text-capitalize" v-model="background['image']['size']" v-input-field="'blur'">
												<option value="auto">None</option>
												<option value="cover">Fill</option>
												<option value="contain">Fit</option>
											</select>
										</div>
										
										<div class="form-group">
											<label>Position</label> 
											<div class="background-image-position-orientation">
												<div>
													<span @click="updateImagePosition(background, 'left top')" :class="{active : background['image']['position'] == 'left top'}"  class="left-top"><i class="fa fa-arrow-up" style="transform: rotate(315deg);"></i></span>
													<span @click="updateImagePosition(background, 'center top')" :class="{active : background['image']['position'] == 'center top'}" class="center-top"><i class="fa fa-arrow-up"></i></span>
													<span @click="updateImagePosition(background, 'right top')" :class="{active : background['image']['position'] == 'right top'}" class="right-top"><i class="fa fa-arrow-up" style="transform: rotate(45deg);"></i></span>
												</div>
												<div>
													    <span @click="updateImagePosition(background, 'left center')" :class="{active : background['image']['position'] == 'left center'}" class="left-center"><i style="transform: rotate(270deg);" class="fa fa-arrow-up"></i></span>
														<span @click="updateImagePosition(background, 'center center')" :class="{active : background['image']['position'] == 'center center'}" class="center-center"><i class="fa fa-circle"></i></span>
														<span @click="updateImagePosition(background, 'right center')" :class="{active : background['image']['position'] == 'right center'}" class="right-center"><i class="fa fa-arrow-up" style="transform: rotate(90deg);"></i></span>
												</div>  
												<div>
													<span @click="updateImagePosition(background, 'left bottom')" :class="{active : background['image']['position'] == 'left bottom'}" class="left-bottom"><i class="fa fa-arrow-up" style="transform: rotate(225deg);"></i></span>
													<span @click="updateImagePosition(background, 'center bottom')" :class="{active : background['image']['position'] == 'center bottom'}" class="center-bottom"><i class="fa fa-arrow-up" style="transform: rotate(180deg);"></i></span>
													<span @click="updateImagePosition(background, 'right bottom')" :class="{active : background['image']['position'] == 'right bottom'}" class="right-bottom"><i class="fa fa-arrow-up" style="transform: rotate(135deg);"></i></span>
												</div>
											</div>
											
										</div>
										
								</div>
								
							</div>
							
							<div v-if="background['type'] == 'gradient'  || background['type'] == 'image_and_gradient' || background['type'] == 'solid_and_gradient'">
												
									<div class="form-group">
										<label>Choose Orientation</label>
										<div class="gradient-icon-orientation">
											<span :class="{active : background['gradient']['orientation'] == 0}" @click="updateGradientOrientation(background, 0)"><i class="fa fa-arrow-up" style="transform: rotate(0deg);" ></i></span>
											<span :class="{active : background['gradient']['orientation'] == 45}" @click="updateGradientOrientation(background, 45)"><i class="fa fa-arrow-up" style="transform: rotate(45deg);" ></i></span>
											<span :class="{active : background['gradient']['orientation'] == 90}" @click="updateGradientOrientation(background, 90)"><i class="fa fa-arrow-up" style="transform: rotate(90deg);" ></i></span>
											<span :class="{active : background['gradient']['orientation'] == 135}" @click="updateGradientOrientation(background, 135)"><i class="fa fa-arrow-up" style="transform: rotate(135deg);" ></i></span>
											<span :class="{active : background['gradient']['orientation'] == 180}" @click="updateGradientOrientation(background, 180)"><i class="fa fa-arrow-up" style="transform: rotate(180deg);" ></i></span>
											<span :class="{active : background['gradient']['orientation'] == 225}" @click="updateGradientOrientation(background, 225)"><i class="fa fa-arrow-up" style="transform: rotate(225deg);" ></i></span>
											<span :class="{active : background['gradient']['orientation'] == 270}" @click="updateGradientOrientation(background, 270)"><i class="fa fa-arrow-up" style="transform: rotate(270deg);" ></i></span>
											<span :class="{active : background['gradient']['orientation'] == 315}" @click="updateGradientOrientation(background, 315)"><i class="fa fa-arrow-up" style="transform: rotate(315deg);" ></i></span>
										</div>
								     </div>
								     <div class="row align-items-center">
								     
								     	<div class="col-12">
								     		<input type="text" data-alpha-enabled="true" data-transparent="true" v-color-code="background['gradient']['to_color']" :style="{borderLeftColor:background['gradient']['to_color']}"
												v-model="background['gradient']['to_color']" readonly class="color-picker form-control eb-form-control" v-input-field="'blur'"/>
								     	</div>
								     	
								     	<div class="col-12">
								     		<input type="text" data-alpha-enabled="true" data-transparent="true"  v-color-code="background['gradient']['from_color']" :style="{borderLeftColor:background['gradient']['from_color']}"
												v-model="background['gradient']['from_color']" readonly class="color-picker form-control eb-form-control" v-input-field="'blur'"/>
								     	</div>
								     	
								     </div>
						     
						     </div>
						     
						</div>
											
</template>
<script>
export default {
  name: 'styleBackground',
  props : [ 'background' ],
  data: function() {
    return {
      showBgImageModal: false
    }
  },
  created: function() {
    console.log("this.background", this.background);
  },
  methods: {
		
    updateImagePosition(option, posotion){
			
      if(option['image']['position'] == posotion)
        return;
			
			 option['image']['position'] = posotion;
			 
    },
		
    updateGradientOrientation(option, orientation){
      if(option['gradient']['orientation'] == orientation)
        return;
			
			 option['gradient']['orientation'] = orientation;
			 
    },
		
  }
}
</script>
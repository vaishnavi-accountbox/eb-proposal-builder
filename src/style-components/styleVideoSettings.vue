
<template id="styleVideoSettingsTemplate">

<div>
						<div class="form-group">
							<label>Video Link To</label>
							   		<select class="form-control eb-form-control text-capitalize" id="link-to" v-input-field="'blur'"
										v-model="video_options['type']">
										<option value="youtube">Youtube Video</option>
										<option value="vimeo">Vimeo Video</option>
										<option value="engagebay">EngageBay Video</option>
	
									</select>
							</div>
							
							<div v-if="video_options['type'] === 'youtube' || video_options['type'] === 'vimeo'" >
							
								<div class="form-group">
										<label v-if="video_options['type'] === 'youtube'" class="">Youtube video ID</label>
										<label v-if="video_options['type'] === 'vimeo'" class="">Vimeo video ID</label>
										<input id="link" type="url" autofocus class="form-control eb-form-control" v-input-field="'blur'"
											v-model="video_options['url']" />
								</div>
								
							</div>
							
							<div v-if="video_options['type'] == 'engagebay'" class="form-group">
							
								<engagebay-video-templates :videooptions="video_options">
									
								</engagebay-video-templates>
									
							</div>
							
							<!-- 
							<div class="form-group">
								<div class="form-check form-check-inline1 mb-3">
								  <input v-input-field="'change'" class="form-check-input" value="top" type="checkbox" v-model="video_options['auto_play']" :id="'videoAutoPlay'+dummyid">
								  <label class="form-check-label" :for="'videoAutoPlay'+dummyid">
								    Auto Play
								  </label>
								</div>
							</div>
							 -->
							
							<div class="form-group">
								<div class="form-check form-check-inline1 mb-3">
								  <input v-input-field="'change'" class="form-check-input" value="top" type="checkbox" v-model="video_options['loop']" :id="'videoLoop'+dummyid">
								  <label class="form-check-label" :for="'videoLoop'+dummyid">
								    Loop
								  </label>
								</div>
							</div>
							
							<div class="form-group">
								<div class="form-check form-check-inline1 mb-3">
								  <input v-input-field="'change'" class="form-check-input" value="top" type="checkbox" v-model="video_options['muted']" :id="'videoMuted'+dummyid">
								  <label class="form-check-label" :for="'videoMuted'+dummyid">
								    Muted
								  </label>
								</div>
							</div>
							
							<div class="form-group">
								<div class="form-check form-check-inline1 mb-3">
								  <input v-input-field="'change'" class="form-check-input" value="top" type="checkbox" v-model="video_options['zoom_video']" :id="'videoZoom'+dummyid">
								  <label class="form-check-label" :for="'videoZoom'+dummyid">
								    Popout
								  </label>
								</div>
							</div>
							
</div>

</template>
<script>
import { utils } from '../app';

export default {
  name: 'styleVideoSettings',
  props : [ 'video_options' ],
  data: function() {
    return {
      dummyid: utils.uid()
    }
  },
}
</script>
<template id="stylePaddingTemplate">

								<div v-if="padding" class="form-group">
												<label v-if="!hideheading" class="sub-label">Inner Space</label>
												
												<div class="row" style="margin-bottom: 10px;">
													<div class="col">
														<label><small>Left</small></label>
														<input min="0"  type="number" autofocus class="form-control eb-form-control"
														v-model="padding['left']" v-input-field="'blur'"/>
													</div>
													<div class="col">
														<label><small>Right</small></label>
														<input min="0"  type="number" autofocus class="form-control eb-form-control"
														v-model="padding['right']" v-input-field="'blur'"/>
													</div>
												</div>
												<div class="row">
													<div class="col">
														<label><small>Top</small></label>
														<input min="0"  type="number" autofocus class="form-control eb-form-control"
														v-model="padding['top']" v-input-field="'blur'"/>
													</div>
													<div class="col">
														<label><small>Bottom</small></label>
														<input min="0"  type="number" autofocus class="form-control eb-form-control"
														v-model="padding['bottom']" v-input-field="'blur'"/>
													</div>
												</div>
												
														
											</div>
											
</template>
<script>
export default {
  name: 'stylePadding',
  props : [ 'padding', 'hideheading' ],
}
</script>
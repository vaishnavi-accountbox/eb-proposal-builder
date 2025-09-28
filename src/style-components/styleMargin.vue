<template id="styleMarginTemplate">

								<div v-if="margin" class="form-group">
												<label class="sub-label">Outer Space</label>
												
												<div class="row" style="margin-bottom: 10px;">
													<div class="col">
														<label><small>Left</small></label>
														<input min="0"  type="number" autofocus class="form-control eb-form-control"
														v-model="margin.left" v-input-field="'blur'"/>
													</div>
													<div class="col">
														<label><small>Right</small></label>
														<input min="0"  type="number" autofocus class="form-control eb-form-control"
														v-model="margin['right']" v-input-field="'blur'"/>
													</div>
												</div>
												<div class="row">
													<div class="col">
														<label><small>Top</small></label>
														<input min="0"  type="number" autofocus class="form-control eb-form-control"
														v-model="margin['top']" v-input-field="'blur'"/>
													</div>
													<div class="col">
														<label><small>Bottom</small></label>
														<input min="0"  type="number" autofocus class="form-control eb-form-control"
														v-model="margin['bottom']" v-input-field="'blur'"/>
													</div>
												</div>
												
														
											</div>
											
</template>
<script>
import { utils } from '../app';

export default {
  name: 'styleMargin',
  props : [ 'margin' ],
  data: function() {
    return {
      dummyid: utils.uid()
    }
  },
}
</script>
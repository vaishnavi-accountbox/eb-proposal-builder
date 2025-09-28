<template id="tiles">
	<div class="tiles-style">
	<div class="body-container">
		<div class="container width-xs">

			<div class="collection-list row">
				<div class="col-md-4 mb-3">

					<a class="each-collection">
						<div class=" image-container align-self-top">
							<img src="https://d2p078bqz5urf7.cloudfront.net/cloud/assets/img/kb/icons-v2/business_and_finance/business and finance-01.svg" width="100%" height="auto">
						</div>
						<div class="">
							<div class="collection-title hc-global-title" :style="{ '--title-color': font.titleColor, '--title-size': font.titleSize + 'px' }">Account Settings</div>
							<div class="collection-description hc-global-description" :style="{ '--desc-color': font.descriptionColor, '--desc-size': font.descriptionSize + 'px' }">Set up add data to your Engagebay account to quickly get started.</div>


						</div>
					</a>

				</div>
				<div class="col-md-4 mb-3">

					<a class="each-collection">
						<div class=" image-container align-self-top">
							<img src="https://d2p078bqz5urf7.cloudfront.net/cloud/assets/img/kb/icons-v2/business_and_finance/business and finance-05.svg" width="100%" height="auto">
						</div>
						<div class="">
							<div class="collection-title hc-global-title" :style="{ '--title-color': font.titleColor, '--title-size': font.titleSize + 'px' }">Features</div>
							<div class="collection-description hc-global-description" :style="{ '--desc-color': font.descriptionColor, '--desc-size': font.descriptionSize + 'px' }">Browse through the features that could make your team more productive.</div>


						</div>
					</a>

				</div>
			</div>

		</div>
	</div>
	</div>
</template>

<script>
export default {   
  name: "tiles",
  props: ['font'],
  created: function () {        
  },
};
</script>
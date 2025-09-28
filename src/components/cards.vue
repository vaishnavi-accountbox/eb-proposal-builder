<template id="cards">
	<div class="cards-style">
	<div class="body-container">
		<div class="container-md">

			<div class="collection-list row">

				<div class="col-md-4 mb-3">
					<a class="each-collection">
						<div class="row">
							<div class="col image-container align-self-top">
								<img src="https://d2p078bqz5urf7.cloudfront.net/cloud/assets/img/kb/icons-v2/business_and_finance/business and finance-01.svg" width="100%" height="auto">
							</div>
							<div class="col">
								<div class="collection-title hc-global-title" :style="{ '--title-color': font.titleColor, '--title-size': font.titleSize + 'px' }">Account Settings</div>
								<div class="collection-description hc-global-description" :style="{ '--desc-color': font.descriptionColor, '--desc-size': font.descriptionSize + 'px' }">Set up add data to your Engagebay account to quickly get started.</div>

								<div class="mt-2 display-table">
									<div class="display-table-cell author-profile-image-continer">


										<img class="author-profile-image" src="https://dashboardassets.eb-pages.com/uploads/4586680517394432/toppng_7___1_(1).png" height="32" width="32">



									</div>
									<div class="display-table-cell align-middle" style="padding-left: 10px;">
										<div class="font-size-13 text-muted">1 articles in this collection</div>
										<div class="font-size-13 text-muted">
											Written by Mike Charles
										</div>
									</div>

								</div>
							</div>
						</div>

					</a>



				</div>
				<div class="col-md-4 mb-3">
					<a class="each-collection">
						<div class="row">
							<div class="col image-container align-self-top">
								<img src="https://d2p078bqz5urf7.cloudfront.net/cloud/assets/img/kb/icons-v2/business_and_finance/business and finance-05.svg" width="100%" height="auto">
							</div>
							<div class="col">
								<div class="collection-title hc-global-title" :style="{ '--title-color': font.titleColor, '--title-size': font.titleSize + 'px' }">Features</div>
								<div class="collection-description hc-global-description" :style="{ '--desc-color': font.descriptionColor, '--desc-size': font.descriptionSize + 'px' }">Browse through the features that could make your team more productive.</div>

								<div class="mt-3 display-table">
									<div class="display-table-cell author-profile-image-continer">


										<img class="author-profile-image" src="https://dashboardassets.eb-pages.com/uploads/4586680517394432/toppng_7___1_(1).png" height="32" width="32">



									</div>
									<div class="display-table-cell align-middle" style="padding-left: 10px;">
										<div class="font-size-13 text-muted">2 articles in this collection</div>
										<div class="font-size-13 text-muted">
											Written by Roy
										</div>
									</div>

								</div>
							</div>
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
  name: "cards",
  props: ['font'],
  created: function () {

  },
};
</script>
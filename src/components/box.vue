<template id="box">
	<div class="box-style">
	<div class="body-container">

		<div class="container-md width-xs">

			<div class="collection-list row">

				<div class="col-md-4 mb-3">
					<a class="new each-collection">
						<div class="new-each-collection-body">
							<div class="new-each-collection-svg">
								<img src="https://d2p078bqz5urf7.cloudfront.net/cloud/assets/img/kb/icons-v2/business_and_finance/business and finance-01.svg"
									 width="100%" style="height: 28px;width: 28px;">
							</div>
							<div>
								<div class="collection-title hc-global-title mb-1"
									 :style="{ '--title-color': font.titleColor, '--title-size': font.titleSize + 'px' }">Account Settings</div>
								<div class="display-table">
									<div class="display-table-cell align-middle author-profile-image-continer">


										<img class="author-profile-image" height="32" src="https://dashboardassets.eb-pages.com/uploads/4586680517394432/toppng_7___1_(1).png" width="32">




									</div>

									<div class="display-table-cell align-middle" style="padding-left: 10px;">
										<div class="font-size-13 text-muted">1 articles in
											this collection
										</div>
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
					<a class="new each-collection">
						<div class="new-each-collection-body">
							<div class="new-each-collection-svg">
								<img src="https://d2p078bqz5urf7.cloudfront.net/cloud/assets/img/kb/icons-v2/business_and_finance/business and finance-05.svg"
									 width="100%" style="height: 28px;width: 28px;">
							</div>
							<div>
								<div class="collection-title hc-global-title mb-1"
									 :style="{ '--title-color': font.titleColor, '--title-size': font.titleSize + 'px' }">Features</div>
								<div class="display-table">
									<div class="display-table-cell align-middle author-profile-image-continer">


										<img class="author-profile-image" height="32" src="https://dashboardassets.eb-pages.com/uploads/4586680517394432/toppng_7___1_(1).png" width="32">




									</div>

									<div class="display-table-cell align-middle" style="padding-left: 10px;">
										<div class="font-size-13 text-muted">2 articles in
											this collection
										</div>
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
  name: "box",
  props: ['font'],
  created: function () {

  },
};
</script>
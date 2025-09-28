<template id="collection">
	<div class="builder-collection" v-if="bodycontent != ''" :style="{ '--title-color': font.titleColor, '--title-size': font.titleSize + 'px', '--desc-color': font.descriptionColor, '--desc-size': font.descriptionSize + 'px', '--heading-color': font.headingColor, '--heading-size': font.headingSize + 'px' }" v-html="bodycontent" v-prevent-nav></div>
	<div v-else class="body-container builder-collection">

		<div class="container width-xs">
			<div class="row">
				<div class="col-md">

				</div>

				<div class="col-md-10">
					<div class="hc-breadcrum-navigation ml-2">
						<a>All</a>

						<i class="fa fa-chevron-right"></i>
						<span>Getting started</span>
					</div>
					<div class="collection-view">
						<div class="collection-header py-3">
							<div class="row collection-details">
								<div class="col image-container align-self-center">
									<img src="https://d2p078bqz5urf7.cloudfront.net/cloud/assets/img/kb/icons-v2/business_and_finance/business and finance-01.svg" width="100%" height="auto">
								</div>
								<div class="col gx-0">
									<div class="collection-title hc-global-heading" :style="{ '--heading-color': font.headingColor, '--heading-size': font.headingSize + 'px' }">Getting started</div>
									<div class="collection-description hc-global-description py-2 " v-if="collectionpagestyle['contentDescVisibility']" :style="{ '--desc-color': font.descriptionColor, '--desc-size': font.descriptionSize + 'px' }">Engagebay is a simple yet powerful CRM solution designed to help businesses track leads, manage contacts, automate sales tasks, and grow customer relationships.
									</div>
									<div class="display-table">
										<div class="display-table-cell align-middle author-profile-image-continer d-flex">

											<img class="author-profile-image" height="32" src="https://d2p078bqz5urf7.cloudfront.net/cloud/assets/img/avatar/avatar-new.png" width="32">

										</div>

										<div class="display-table-cell align-middle" style="padding-left: 10px;">
											<div class="font-size-13 text-muted">5 articles in
												this collection
											</div>
											<div class="font-size-13 text-muted">
												Written by Roy
											</div>

										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="section-list new-ui mb-4">

							<div class="each-section" style="border: 1px solid #ddd; margin-bottom:8px; padding: 10px; border-radius: 8px">
								<div class="article-list">
									<a class="each-article" >
										<div class="d-flex justify-content-between align-items-center">
											<div>
												<div class="article-title-view truncate">**Comprendre la Politique de Remboursement</div>
												<div class="article-description-view truncate" v-if="collectionpagestyle['contentDescVisibility']">Comprendre la Politique de Remboursement</div>


											</div>
											<div style="font-size: 8px; color: #1a1a1a">
												<i class="fa fa-chevron-right"></i>
											</div>
										</div>

									</a>
								</div>
								<div class="article-list">
									<a class="each-article" >
										<div class="d-flex justify-content-between align-items-center">
											<div>
												<div class="article-title-view truncate">See what KnowledgeBase can do for you</div>
												<div class="article-description-view truncate" v-if="collectionpagestyle['contentDescVisibility']">See what KnowledgeBase can do for you</div>


											</div>
											<div style="font-size: 8px; color: #1a1a1a">
												<i class="fa fa-chevron-right"></i>
											</div>
										</div>

									</a>
								</div>
								<div class="article-list">
									<a class="each-article" >
										<div class="d-flex justify-content-between align-items-center">
											<div>
												<div class="article-title-view truncate">Step 1: Create &amp; publish articles</div>
												<div class="article-description-view truncate" v-if="collectionpagestyle['contentDescVisibility']">Step 1: Create &amp; publish articles</div>


											</div>
											<div style="font-size: 8px; color: #1a1a1a">
												<i class="fa fa-chevron-right"></i>
											</div>
										</div>

									</a>
								</div>
								<div class="article-list">
									<a class="each-article" >
										<div class="d-flex justify-content-between align-items-center">
											<div>
												<div class="article-title-view truncate">Step 2: Launch your Help Center</div>
												<div class="article-description-view truncate" v-if="collectionpagestyle['contentDescVisibility']">Step 2: Launch your Help Center</div>


											</div>
											<div style="font-size: 8px; color: #1a1a1a">
												<i class="fa fa-chevron-right"></i>
											</div>
										</div>

									</a>
								</div>
								<div class="article-list">
									<a class="each-article" >
										<div class="d-flex justify-content-between align-items-center">
											<div>
												<div class="article-title-view truncate">Step 3: Use articles in the chat</div>
												<div class="article-description-view truncate" v-if="collectionpagestyle['contentDescVisibility']">Step 3: Use articles in the chat</div>


											</div>
											<div style="font-size: 8px; color: #1a1a1a">
												<i class="fa fa-chevron-right"></i>
											</div>
										</div>

									</a>
								</div>
							</div>

						</div>
					</div>
				</div>
				<div class="col-md">

				</div>
			</div>
		</div>

	</div>
</template>

<script>
export default {
  name: "collectionComponent",
  props: ['collectionpagestyle', 'font', 'bodycontent'],
  created: function () {

  },
}
</script>
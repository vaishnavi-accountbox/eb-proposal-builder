<template id="article">
	<div class="builder-article" v-if="bodycontent != ''" :style="{ '--title-color': font.titleColor, '--title-size': font.titleSize + 'px', '--desc-color': font.descriptionColor, '--desc-size': font.descriptionSize + 'px', '--heading-color': font.headingColor, '--heading-size': font.headingSize + 'px' }" v-html="bodycontent" v-prevent-nav></div>
	<div v-else class="body-container builder-article">

		<div class="container width-xs">

			<div class="row page-total-content">
				<div class="col-md">
				</div>
				<div :class="[articlepagestyle['tableContentsVisibility'] ? 'col-md-8' : 'col-md-10']">
					<div class="hc-breadcrum-navigation ml-2">
						<a >All</a>
						<i class="fa fa-chevron-right"></i>
						<a >Getting started</a>
						<i class="fa fa-chevron-right"></i> <span>Step 1: Create &amp; publish articles</span>

					</div>

					<div class="article-view p-4" style="border:none">

						<div class="article-header">
							<div class="article-title hc-global-heading new" :style="{ '--heading-color': font.headingColor, '--heading-size': font.headingSize + 'px' }">All</div>
							<div class="article-description hc-global-description new-des" :style="{ '--desc-color': font.descriptionColor, '--desc-size': font.descriptionSize + 'px' }">Get started</div>
							<div class="mt-2 display-table">
								<div class="display-table-cell align-middle">
									<img class="article-owner-image" height="30"
										 src="https://dashboardassets.eb-pages.com/uploads/4586680517394432/toppng_7___1_(1).png" width="30"
									/>
								</div>
								<div class="display-table-cell align-middle" style="padding-left: 10px;">
									<div class="font-size-13 text-muted">Written by Roy</div>

									<div class="font-size-13 text-muted">
										Updated over
										<span>2 days ago</span>

									</div>

									<div class="font-size-13 text-muted">
										Created over
										<span>4 day ago</span>

									</div>

								</div>

							</div>
						</div>

						<div class="article-body ">
							Sample content for Step 1: Create &amp; publish articles
						</div>

						<div class="article-footer">
							<div class="mb-2">Did this answer your question?</div>
							<div class="article-react-container">
								<img
										class="m-1 cursor-pointer"
										data-index="1"
										src="https://d2p078bqz5urf7.cloudfront.net/cloud/assets/img/kb/emojis/excellent.svg"
										data-toggle="tooltip" data-placement="top"
										title="Excellent"
								>
								<img
										class="m-1 cursor-pointer"
										data-index="2"
										src="https://d2p078bqz5urf7.cloudfront.net/cloud/assets/img/kb/emojis/satisfied.svg"
										data-toggle="tooltip" data-placement="top"
										title="Satisfied"
								>
								<img
										class="m-1 cursor-pointer"
										data-index="3"
										src="https://d2p078bqz5urf7.cloudfront.net/cloud/assets/img/kb/emojis/unsatisfied.svg"
										data-toggle="tooltip" data-placement="top"
										title="Unsatisfied"
								>
							</div>
						</div>

					</div>

				</div>



				<div class="col-md" v-if="articlepagestyle['tableContentsVisibility']">
				<div v-if="articlepagestyle['tableContentsVisibility']" class="col-md-3 pt-5 list-content sticky">
					<ul class="toc-list">

						<li class="toc-item">
							<a

									class="list-title"
							>
								content 1
							</a>
						</li>
						<li class="toc-item">
							<a

									class="list-title"
							>
								content 2
							</a>
						</li>
						<li class="toc-item">
							<a

									class="list-title"
							>
								content 3
							</a>
						</li>

					</ul>
				</div>
				</div>
			</div>

		</div>

	</div>
</template>
<script>
export default {
  name: "articleComponent",
  props: ['articlepagestyle', 'font', 'bodycontent'],
  created: function () {

  },
}
</script>
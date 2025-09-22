<template id="styleEditFormFields">
	
	<div>
	
	<div v-if="editelementtype == 'body'" class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Body Properties</div>
		    
			<div class="properity-body">

				<div class="form-group">
							<label>Content Width</label>
							<select class="form-control eb-form-control"  v-input-field="'blur'"
								v-model="options['contentWidth']">
								<option value="">Extra small</option>
								<option value="sm">Small</option>
								<option value="md">Medium</option>
								<option value="lg">Large</option>
								<option value="xl">Extra Large</option>
								<option value="fluid">Full Width</option>
							</select>
				</div>
			
			<!--   <div class="form-group">
		     	<div class="form-check form-check-inline1 mb-3">
					  <input v-input-field="'change'" class="form-check-input" value="auto" type="radio" v-model="options['width_type']" id="bodyWidthTypeAuto">
					  <label class="form-check-label" for="bodyWidthTypeAuto">
					     Automatically adjust the width based on screen width
					  </label>
					</div>
					
					<div class="form-check form-check-inline1 mb-3">
					  <input v-input-field="'change'" class="form-check-input" value="custom" type="radio" v-model="options['width_type']" id="bodyWidthTypeCustom">
					  <label class="form-check-label" for="bodyWidthTypeCustom">
					    Customize the width
					  </label>
					</div>
		     </div>
			
				<div v-if="options['width_type'] == 'custom'" class="form-group">
					<label>Width</label>
					 <div class="input-group">
				        <div class="input-group-prepend">
				          <span class="input-group-text" @click="editBodyContentWidth(options, 'substract')">-</span>
				        </div>
				        <input min="10" type="number" class="form-control eb-form-control" v-model="options.desktopContentWidth" placeholder="Content Width" required min="0">
				        <div class="input-group-append">
				          <span class="input-group-text" @click="editBodyContentWidth(options, 'add')">+</span>
				        </div>
				      </div>
				</div>
				-->
				
				<div class="form-group">
						<label>Margin Top</label>
						<input min="0"  id="link" type="number" autofocus class="form-control eb-form-control" v-input-field="'blur'"
							v-model="options['margin']['top']" />
				</div>
							
			</div>
	</div>
	
	<div v-if="editelementtype == 'section' && contenttype != 'collection_section'" class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Geometry</div>
		    
			<div class="properity-body">
			
				<div class="form-group">
						<label>Name</label>
						<input type="text" class="form-control eb-form-control"
							v-model.lazy="options['name']" :data-init="initValue(options, 'name', elementid)" />
				</div>
				
				<style-padding :padding="options.padding"></style-padding>
				
				<style-margin :margin="options.margin"></style-margin>
											
			</div>
	</div>
	
	<div v-if="editelementtype == 'section' && contenttype == 'collection_section'" class="block-properities col-section" v-toggle-col-section-style-actions>
		
		    <div class="properity-header" @click="accordion['active'] = 'list'">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Collection List Style</div>

		    
			<div class="properity-body">
				<div class="form-group">
					<label>List View Style</label>
					<select class="form-control eb-form-control" v-model="themesettings['collectionListStyle']" v-input-field="'blur'">
						<option value="list">List</option>
						<option value="cards">Cards</option>
						<option value="minimal">Minimal</option>
						<option value="tiles">Tiles</option>
						<option value="box">Box</option>
					</select>
				</div>

                <hr v-if="font['titleColor']" style="border-top: 1px dotted rgba(0,0,0,.1);">

                <label class="sub-label" v-if="font['titleColor']">Title</label>

                <div class="form-group row" v-if="font['titleColor']">
                    <label class="col-sm-12 col-form-label">Color</label>
                    <div class="col-sm-12">
                        <input v-input-field="'blur'" type="text" v-color-code="font['titleColor']" :style="{borderLeftColor:font['titleColor']}"
                               v-model="font['titleColor']" readonly class="color-picker form-control eb-form-control"/>
                    </div>
                </div>

                <div class="form-group row" v-if="font['titleSize']">

                    <label class="col-sm-12 col-form-label">Size</label>
                    <div class="col-sm-12"><input type="range" min="5" v-input-field="'blur'"
                                                  max="120" id="font-size"
                                                  v-model="font['titleSize']"> <small class="">{{font['titleSize']}}px</small>
                    </div>
                </div>

                <hr v-if="font['descriptionColor']" style="border-top: 1px dotted rgba(0,0,0,.1);">

                <label class="sub-label" v-if="font['descriptionColor']">Description</label>

                <div class="form-group row" v-if="font['descriptionColor']">
                    <label class="col-sm-12 col-form-label">Color</label>
                    <div class="col-sm-12">
                        <input v-input-field="'blur'" type="text" v-color-code="font['descriptionColor']" :style="{borderLeftColor:font['descriptionColor']}"
                               v-model="font['descriptionColor']" readonly class="color-picker form-control eb-form-control"/>
                    </div>
                </div>

                <div class="form-group row" v-if="font['descriptionSize']">

                    <label class="col-sm-12 col-form-label">Size</label>
                    <div class="col-sm-12"><input type="range" min="5" v-input-field="'blur'"
                                                  max="120" id="font-size"
                                                  v-model="font['descriptionSize']"> <small class="">{{font['descriptionSize']}}px</small>
                    </div>
                </div>


            </div>
	</div>
	<div v-if="editelementtype == 'section' && contenttype == 'collection_section'" class="block-properities col-section" v-toggle-col-section-style-actions>
		<div class="properity-header" @click="accordion['active'] = 'collection'">
			<i class="fa fa-angle-down expand"></i>
			<i class="fa fa-angle-right contract"></i>
			Collection Page Style
		</div>


		<div class="properity-body">
			<label class="sub-label">Content Descriptions</label>


				<label>Show or hide descriptions on the Collections page. Hiding descriptions makes it easier to scan through your articles.</label>
				<div class="custom-control custom-switch">
					<input v-input-field="'change'" v-model="themesettings['collectionPageStyle']['contentDescVisibility']" type="checkbox" class="custom-control-input" id="contentDescVisibility">
					<label class="custom-control-label" for="contentDescVisibility" style="padding-top: 3px;  cursor: pointer;">Show Descriptions </label>
				</div>
            <hr v-if="font['headingColor']" style="border-top: 1px dotted rgba(0,0,0,.1);">
            <label class="sub-label" v-if="font['headingColor']">Heading</label>

            <div class="form-group row" v-if="font['headingColor']">
                <label class="col-sm-12 col-form-label">Color</label>
                <div class="col-sm-12">
                    <input v-input-field="'blur'" type="text" v-color-code="font['headingColor']" :style="{borderLeftColor:font['headingColor']}"
                           v-model="font['headingColor']" readonly class="color-picker form-control eb-form-control"/>
                </div>
            </div>

            <div class="form-group row" v-if="font['headingSize']">

                <label class="col-sm-12 col-form-label">Size</label>
                <div class="col-sm-12"><input type="range" min="5" v-input-field="'blur'"
                                              max="120" id="font-size"
                                              v-model="font['headingSize']"> <small class="">{{font['headingSize']}}px</small>
                </div>
            </div>

            <hr v-if="font['descriptionColor']" style="border-top: 1px dotted rgba(0,0,0,.1);">

            <label class="sub-label" v-if="font['descriptionColor']">Description</label>

            <div class="form-group row" v-if="font['descriptionColor']">
                <label class="col-sm-12 col-form-label">Color</label>
                <div class="col-sm-12">
                    <input v-input-field="'blur'" type="text" v-color-code="font['descriptionColor']" :style="{borderLeftColor:font['descriptionColor']}"
                           v-model="font['descriptionColor']" readonly class="color-picker form-control eb-form-control"/>
                </div>
            </div>

            <div class="form-group row" v-if="font['descriptionSize']">

                <label class="col-sm-12 col-form-label">Size</label>
                <div class="col-sm-12"><input type="range" min="5" v-input-field="'blur'"
                                              max="120" id="font-size"
                                              v-model="font['descriptionSize']"> <small class="">{{font['descriptionSize']}}px</small>
                </div>
            </div>


		</div>

	</div>
	<div v-if="editelementtype == 'section' && contenttype == 'collection_section'" class="block-properities col-section" v-toggle-col-section-style-actions>
			<div class="properity-header" @click="accordion['active'] = 'article'">
				<i class="fa fa-angle-down expand"></i>
				<i class="fa fa-angle-right contract"></i>
				Article Page Style
			</div>


			<div class="properity-body">
				<label class="sub-label">Table of Contents</label>


				<label>Table of contents is automatically generated from H1 and H2 headings in your articles. It is available in your Help Center on the web and in the Messenger.</label>
				<div class="custom-control custom-switch">
					<input v-input-field="'change'" v-model="themesettings['articlePageStyle']['tableContentsVisibility']" type="checkbox" class="custom-control-input" id="tableContentVisibility">
					<label class="custom-control-label" for="tableContentVisibility" style="padding-top: 3px;cursor: pointer; ">Show table of contents</label>
				</div>
                <hr v-if="font['headingColor']" style="border-top: 1px dotted rgba(0,0,0,.1);">
                <label class="sub-label" v-if="font['headingColor']">Heading</label>

                <div class="form-group row" v-if="font['headingColor']">
                    <label class="col-sm-12 col-form-label">Color</label>
                    <div class="col-sm-12">
                        <input v-input-field="'blur'" type="text" v-color-code="font['headingColor']" :style="{borderLeftColor:font['headingColor']}"
                               v-model="font['headingColor']" readonly class="color-picker form-control eb-form-control"/>
                    </div>
                </div>

                <div class="form-group row" v-if="font['headingSize']">

                    <label class="col-sm-12 col-form-label">Size</label>
                    <div class="col-sm-12"><input type="range" min="5" v-input-field="'blur'"
                                                  max="120" id="font-size"
                                                  v-model="font['headingSize']"> <small class="">{{font['headingSize']}}px</small>
                    </div>
                </div>

                <hr v-if="font['descriptionColor']" style="border-top: 1px dotted rgba(0,0,0,.1);">

                <label class="sub-label" v-if="font['descriptionColor']">Description</label>

                <div class="form-group row" v-if="font['descriptionColor']">
                    <label class="col-sm-12 col-form-label">Color</label>
                    <div class="col-sm-12">
                        <input v-input-field="'blur'" type="text" v-color-code="font['descriptionColor']" :style="{borderLeftColor:font['descriptionColor']}"
                               v-model="font['descriptionColor']" readonly class="color-picker form-control eb-form-control"/>
                    </div>
                </div>

                <div class="form-group row" v-if="font['descriptionSize']">

                    <label class="col-sm-12 col-form-label">Size</label>
                    <div class="col-sm-12"><input type="range" min="5" v-input-field="'blur'"
                                                  max="120" id="font-size"
                                                  v-model="font['descriptionSize']"> <small class="">{{font['descriptionSize']}}px</small>
                    </div>
                </div>


			</div>

	</div>

	<div v-if="editelementtype == 'content'" class="block-properities" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Geometry</div>
		    
			<div class="properity-body">
				
				<style-padding v-if="options.padding" :padding="options.padding"></style-padding>
						
						<hr v-if="options.padding" >
											
				<style-margin v-if="options.margin"  :margin="options.margin"></style-margin>
				
				<hr v-if="options.margin" >
				
										<label>Background</label>
									
										<style-background :background="options.background" ></style-background>
										
										<hr>
										<label>Border</label>
										
										<style-border :border="options.border" ></style-border>
										
										<hr>
										<label>Box Shadow</label>
										<style-box-shadow :boxshadow="options.boxShadow"></style-box-shadow>
									
				
							
			</div>
	</div>
	
	<div v-if="(editelementtype == 'section' && contenttype == 'column_section') || (editelementtype == 'content' && contenttype && contenttype == 'block' )" class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Columns</div>
		    
			<div class="properity-body">
			
				<column-settings :columns="element.columns"></column-settings>
							
			</div>
	</div>
	
	<div v-if="editelementtype == 'content' && (hasKey(options, 'size') || hasKey(options, 'width') || hasKey(options, 'height'))" 
	class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Size</div>
		    
			<div class="properity-body">
			
				<div v-if="hasKey(options, 'full_width')" class="form-group">
					<div class="form-check form-check-inline1 mb-1">
					<input v-input-field="'change'" class="form-check-input" value="top" type="checkbox" v-model="options['full_width']" id="contentFulwidth">
					  <label class="form-check-label" for="contentFulwidth">
					    Full Width
					  </label>
					 </div>
				</div>
			
				<div v-if="!options['full_width'] && hasKey(options, 'width')" class="form-group">
					<label >Width</label>
					<input min="0"   type="number" autofocus class="form-control eb-form-control" v-input-field="'blur'"
							v-model="options['width']" />
				</div>
				
				<div v-if="!options['do_not_show_height'] && hasKey(options, 'height')" class="form-group">
					<label >Height</label>
					<input type="text" autofocus class="form-control eb-form-control" v-input-field="'blur'"
							v-model="options['height']"/>
							
				</div>
				
				<div v-if="hasKey(options, 'size')" class="form-group">
					<label >Size</label>
					<input min="0"   type="number" autofocus class="form-control eb-form-control" v-input-field="'blur'"
							v-model="options['size']"/>
							
				</div>
				
			</div>
				
		</div>
		
		
	<div v-if="contenttype == 'bnavbar' || contenttype == 'navlist'" class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Nav Settings</div>
		    
			<div class="properity-body">
			
				<div v-if="hasKey(options, 'within_container')" class="form-group">
					<div class="form-check form-check-inline1 mb-3">
					  <input v-input-field="'change'" class="form-check-input" value="top" type="checkbox" v-model="options['within_container']" id="navWithincontainer">
					  <label class="form-check-label" for="navWithincontainer">
					    Fluid
					  </label>
					</div>
				</div>
				
				<div v-if="hasKey(options, 'brand_text')" class="form-group">
					<label>Company Name</label>
					<div class="">
						<div class="tinymce-content inline-text-editor" v-tinymce-editor-inline-elements :data-initialize-content="options['brand_text']"></div>
						<textarea style="display:none;visibility:hidden" v-model="options['brand_text']"></textarea>    
					</div>
							
				</div>
				
				<div v-if="hasKey(options, 'brand_link')" class="form-group">
					<label >URL</label>
					<input type="url" class="form-control eb-form-control" v-input-field="'blur'"
							v-model="options['brand_link']"/>
				</div>
				
				<div v-if="hasKey(options, 'brand_img')" class="form-group">
									<label >Company Logo</label>
									<div class="d-flex">
										<div v-if="options['brand_img']" style="width: 80px;padding: 10px">
											<img :src="options['brand_img']" width="100%" height="auto" class="display-image" alt="" />
										</div>
										
										<div class="flex-grow-1">
												<span class="btn btn-info btn-sm d-block mb-2" @click="navBrandImagePopup=true">Change Image </span>
												<input type="text" class="form-control eb-form-control image-path" v-input-field="'blur'"
														v-model="options['brand_img']" placeholder="Image URL"/>			
										</div>
										
										<div>
										<b-modal v-model="navBrandImagePopup" id="bgImageModalPopup1" size="xl" ref="bgImageModalPopup1">
										  
										  <template v-slot:modal-title>
										      <span style="font-size:20px;">Choose Image</span>
										    </template>
										    
										  	<b-container fluid>
										  	
										  		<repository-image-files :allowscaling="false" :option="options" :fileurlkeyname="'brand_img'" @closepopup="navBrandImagePopup=false"></repository-image-files>
										  		
										  	</b-container>
										  	
										  	 <template v-slot:modal-footer>
										        <div>
										        	<span class="btn btn-outline-warning mr-2 btn-sm modal-close" @click="navBrandImagePopup=false">Close</span>
										        	<!-- <span class="btn btn-warning mr-2 btn-sm" @click="hideModal('bgImageModalPopup')">Okay</span>  -->
										        </div>
										      </template>
										    
										  </b-modal>
										</div>
										
									</div>
								</div>
								
								
			<div v-if="options['nav_list_alignment']" class="form-group row">
				<label class="col-sm-12 col-form-label">Alignment</label>	
				<div class="col-sm-12">
					<div class="btn-group" role="group" aria-label="Basic example">
					  <span :class="[(options['nav_list_alignment'] == 'left') ? 'btn-primary' : 'btn-secondary']" title="Left" class="btn btn-sm " @click="options['nav_list_alignment']='left'"><i class="fa fa-align-left"></i> Left</span>
					  <span :class="[(options['nav_list_alignment'] == 'center') ? 'btn-primary' : 'btn-secondary']" title="Center" class="btn btn-sm " @click="options['nav_list_alignment']='center'"><i class="fa fa-align-center"></i> Center</span>
					  <span :class="[(options['nav_list_alignment'] == 'right') ? 'btn-primary' : 'btn-secondary']" title="Right" class="btn btn-sm " @click="options['nav_list_alignment']='right'"><i class="fa fa-align-right"></i> Right</span>
					</div>
				</div>
			</div>
							
			<div v-if="options['orientation']" class="form-group row">
				<label class="col-sm-12 col-form-label">Orientation</label>	
				<div class="col-sm-12">
					<div class="btn-group" role="group">
					  <span :class="[(options['orientation'] == 'horizontal') ? 'btn-primary' : 'btn-secondary']" class="btn btn-sm " @click="options['orientation']='horizontal'">Horizontal</span>
					  <span :class="[(options['orientation'] == 'vertical') ? 'btn-primary' : 'btn-secondary']" class="btn btn-sm " @click="options['orientation']='vertical'">Vertical</span>
					</div>
				</div>
			</div>
			
			<hr>
			<font-style-settings :font="options['font']"></font-style-settings>	
			
			<div v-if="options['navPadding']">
					<hr>
					<label class="sub-label">Padding</label>
					<style-padding :padding="options.navPadding" :hideheading="true"></style-padding>
			
			</div>
			
			</div>
	</div>
	
	<div v-if="contenttype == 'bnavbar' || contenttype == 'navlist'" class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Options</div>
		    
			<div class="properity-body">
			
				<navlink-style-settings :navlist="options.nav_link_list"></navlink-style-settings>
			
			</div>
	</div>
		
		<div v-if="contenttype && contenttype == 'carousal'" class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Carousal Settings</div>
		    
			<div class="properity-body">
			
				<div class="form-group">
					<div class="form-check form-check-inline1">
					  <input v-input-field="'change'" class="form-check-input" value="top" type="checkbox" v-model="options['auto_play']" id="carousalAutoPlay1">
					  <label class="form-check-label" for="carousalAutoPlay1">
					    Auto Play
					  </label>
					</div>
				</div>
				
				<div v-if="options['auto_play']" class="form-group">
					<label>Play interval in sec</label>
					<input type="number" class="form-control eb-form-control" v-input-field="'blur'"
							v-model="options['interval_in_sec']"/>
				</div>
				
				<div class="form-group">
					<div class="form-check form-check-inline1 ">
					  <input v-input-field="'change'" class="form-check-input" value="top" type="checkbox" v-model="options['stage_indicators']" id="carousalstage_indicators">
					  <label class="form-check-label" for="carousalstage_indicators">
					    Stage Indicators
					  </label>
					</div>
				</div>
				
				<div class="form-group">
					<div class="form-check form-check-inline1 ">
					  <input v-input-field="'change'" class="form-check-input" value="top" type="checkbox" v-model="options['controls']" id="carousalControls">
					  <label class="form-check-label" for="carousalControls">
					    Controls
					  </label>
					</div>
				</div>
				
				<div v-if="options['controls'] || options['stage_indicators']" class="form-group">
						<label>Controls Color</label>
						<input type="text" v-color-code="options['controls_color']" v-input-field="'blur'"  :style="{borderLeftColor:options['controls_color']}"
										v-model="options['controls_color']" readonly class="color-picker form-control eb-form-control" />
				</div>
				
				<div class="form-group">
						<label>Style</label>
						<select class="form-control eb-form-control text-capitalize" id="link-to" v-input-field="'blur'"
							v-model="options['carousal_style']">
							<option value="default">Style 1</option>
							<option value="thumbnail_top">Style 2</option>
							<option value="thumbnail_left">Style 3</option>
						</select>
				</div>
				
				<div v-if="options['carousal_style'] != 'default'" class="form-group">
						<label>Thumbnail Width</label>
						<input type="number" class="form-control eb-form-control" v-model="options.thumbnail_size.width" v-input-field="'blur'"/>
				</div>
				
				<div v-if="options['carousal_style'] != 'default'" class="form-group">
						<label>Thumbnail Height</label>
						<input type="number" class="form-control eb-form-control" v-model="options.thumbnail_size.height" v-input-field="'blur'"/>
				</div>
							
			</div>
	</div>
	
	<div v-if="contenttype && contenttype == 'carousal'" class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Carousal List</div>
		    
			<div class="properity-body">
			
				<carousal-style-settings :list="options.carousal_items"></carousal-style-settings>
			
			</div>
	</div>
	
	<div v-if="contenttype && (contenttype == 'divider' || contenttype == 'verticaldivider')" class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Divider</div>
		    
			<div class="properity-body">
			
				<style-border :border="options.divider" ></style-border>
			
			</div>
	</div>
							  
	<div v-if="contenttype && contenttype == 'video'" class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Video Properities</div>
		    
			<div class="properity-body">
			
				<style-video-settings :video_options="options['video_options']"></style-video-settings>
			
			</div>
	</div>
	
	<!-- Font style settings -->
	<div v-if="hasKey(options, 'font') && contenttype != 'bnavbar' && contenttype != 'navlist'" class="block-properities active" v-toggle-style-actions>

	    <div class="properity-header">
	    <i class="fa fa-angle-down expand"></i>
	    <i class="fa fa-angle-right contract"></i>
	    Font Styles
	    </div>
	    <div class="properity-body">
	    
	    	 <div id="tinymcetoolbar"></div>
	    
	   		 <font-style-settings :font="options.font" :editelementtype="editelementtype"></font-style-settings>	
		
		</div>
		
		</div>
		<!-- End of font style settings -->
	
	
	<div v-if="editelementtype == 'content' && options.align" class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Alignment</div>
		    
			<div class="properity-body">
			
				<div class="btn-group" role="group">
				  <button type="button" @click="options['align'] = 'left'" class="btn" :class="{'btn-info': options['align'] == 'left', 'btn-light': options['align'] != 'left'}">Left</button>
				  <button type="button" @click="options['align'] = 'center'" class="btn" :class="{'btn-info': options['align'] == 'center', 'btn-light': options['align'] != 'center'}">Center</button>
				  <button type="button" @click="options['align'] = 'right'" class="btn" :class="{'btn-info': options['align'] == 'right', 'btn-light': options['align'] != 'right'}">Right</button>
				</div>
				
			</div>
	</div>
	
	<div v-if="contenttype == 'search'" class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	field Settings</div>
		    
		    
			<div class="properity-body">
			
				<div class="form-group">
						<label>Placeholder</label>
						<input type="text" class="form-control eb-form-control" v-model="options.placeholder" v-input-field="'blur'"/>
				</div>
				
				<hr>
				
				<label class="sub-label">Font</label>
				<font-style-settings :font="options['fieldFont']"></font-style-settings>	
				
				<hr>
				<label class="sub-label">Border</label>
					
				<style-border :border="options.fieldBorder" ></style-border>
				
				<hr>
				
				<label class="sub-label">Background</label>
				<style-background :background="options.fieldBackground" ></style-background>
				
				<hr>
				
				<label class="sub-label">Padding</label>
				<style-padding :padding="options.fieldPadding" :hideheading="true"></style-padding>
				
			</div>
	</div>
	
	<div v-if="contenttype != 'navlist' && editelementtype == 'content' && options.orientation" class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Orientation</div>
		    
			<div class="properity-body">
			
				<div class="btn-group" role="group">
				  <button type="button" @click="options['orientation'] = 'horizontal'" class="btn" :class="{'btn-info': options['orientation'] == 'horizontal', 'btn-light': options['orientation'] != 'horizontal'}">Horizontal</button>
				  <button type="button" @click="options['orientation'] = 'vertical'" class="btn" :class="{'btn-info': options['orientation'] == 'vertical', 'btn-light': options['orientation'] != 'vertical'}">Vertical</button>
				</div>
				
			</div>
	</div>
	
	<div v-if="contenttype && contenttype == 'form'" class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Form Properities</div>
		    
			<div class="properity-body">
				<div class="form-group d-none">
								<label>Form Link To</label>
							   		<select class="form-control eb-form-control text-capitalize" id="link-to"
										v-model="options['form_options']['type']">
										<option value="custom">Custom</option>
										<option value="engagebay">EngageBay Form</option>
									</select>
							</div>
							
							<div v-if="options['form_options']['type'] == 'custom'" class="form-group">
							
									<span class="btn btn-warning">Configure form fields</span>
										
							</div>
							
							<div v-if="options['form_options']['type'] == 'engagebay'" class="form-group">
							
									<engagebay-form-list :formoptions="options['form_options']">
										
									</engagebay-form-list>
										
							</div>
			</div>
	</div>
	
	<div v-if="contenttype && contenttype == 'popup'" class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Popup Properities</div>
		    
			<div class="properity-body">
			
				<div class="form-group d-none">
								<label>Form Link To</label>
							   		<select class="form-control eb-form-control" id="link-to" 
										v-model="options['popup_options']['type']">
										<option value="custom">Custom</option>
										<option value="engagebay">EngageBay Popup</option>
									</select>
							</div>
							
							<div v-if="options['popup_options']['type'] == 'engagebay'" class="form-group">
							
									<engagebay-popup-list :popupoptions="options['popup_options']" :popupidkey="'engagebay_popup_id'">
										
									</engagebay-popup-list>
										
							</div>
							
			</div>
	</div>
							  
	<div v-if="contenttype && (contenttype == 'icon' || contenttype == 'social')" class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Icons</div>
		    
			<div class="properity-body">
			
				<style-icon-settings :icons="options.icon_list"></style-icon-settings>
				
			</div>
	</div>
	
	<div v-if="contenttype && contenttype == 'image'" class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Image Properities</div>
		    
			<div class="properity-body">
			
				<div class="form-group">
							<label>Image</label>
							<div class="d-flex">
								<div v-if="options['image']" style="width: 80px;padding: 10px">
									<img :src="options['image']" width="100%" height="auto" class="display-image" alt="" />
								</div>
								<div class="flex-grow-1">
										
									<span class="btn btn-info btn-sm d-block mb-2" @click="showModal('imageSrcModalPopup')">Change Image </span>
												<input type="text" class="form-control eb-form-control image-path"
														v-model="options['image']" placeholder="Image URL"/>	
														
								</div>
								
								<div>
										  <b-modal id="imageSrcModalPopup" size="xl" ref="imageSrcModalPopup">
										  
										  <template v-slot:modal-title>
										      <span style="font-size:20px;">Choose Image</span>
										    </template>
										    
										  	<b-container fluid>

										  		<repository-image-files :allowscaling="true" :contentid="elementid" :option="options" :fileurlkeyname="'image'" :modalid="'imageSrcModalPopup'"></repository-image-files>
										  		
										  	</b-container>
										  	
										  	 <template v-slot:modal-footer>
										        <div>
										        	<span class="btn btn-outline-warning mr-2 btn-sm modal-close" @click="hideModal('imageSrcModalPopup')">Close</span>
										        	<!-- <span class="btn btn-warning mr-2 btn-sm" @click="hideModal('imageSrcModalPopup')">Okay</span>  -->
										        </div>
										      </template>
										    
										  </b-modal>
										</div>
							
							</div>
						</div>
			
				<div class="form-group">
							<label>Title</label>
							<input type="text" class="form-control eb-form-control" v-model="options['title']" v-input-field="'blur'"/>
						</div>
			
				<div class="form-group">
							<label>Alt Text</label>
							<input type="text" class="form-control eb-form-control" v-model="options['altText']" v-input-field="'blur'"/>
						</div>
						
				<hr>
					<label>Border</label>
					
					<style-border :border="options.image_border" ></style-border>
					
										
			</div>
			
		</div>
		
		<div v-if="contenttype && (contenttype == 'button' || contenttype == 'popup' || contenttype == 'dropdown')" class="block-properities active" v-toggle-style-actions>
		
		    <div class="properity-header">
		     <i class="fa fa-angle-down expand"></i>
			    <i class="fa fa-angle-right contract"></i>
		    	Button Properities</div>
		    
			<div class="properity-body">
				<div class="form-group">
							<label class="sub-label">Label</label>
							<input type="text" class="form-control eb-form-control" v-model="options['buttonText']" v-input-field="'blur'" />
						</div>
					<hr>	
					
					<label class="sub-label">Background</label>
				<style-background :background="options['buttonBackground']" ></style-background>
					
					<hr>
					
					<label class="sub-label">Border</label>
				<style-border :border="options['buttonBorder']" ></style-border>
					
					</hr>
					
				<style-padding :padding="options.buttonPadding"></style-padding>
			</div>
			
		</div>
		
		<div v-if="contenttype && contenttype == 'dropdown'" class="block-properities active" v-toggle-style-actions>
		
			    <div class="properity-header">
			     <i class="fa fa-angle-down expand"></i>
				    <i class="fa fa-angle-right contract"></i>
			    	Dropdown Action List</div>
			    
				<div class="properity-body">
				
					<div v-for="(action,index) in options['action_list']" class="dropdown-button-list">
					
						<div class="form-group row">
									<label class="col-sm-12 col-form-label">Text</label> 
									<div class="col-sm-12">
										<input v-model="action['text']" type="text" class="form-control eb-form-control"> 
									</div>
								</div>
								
							<div class="form-group row">
									<label class="col-sm-12 col-form-label">Link</label> 
									<div class="col-sm-12">
										<input v-model="action['link']" type="url" class="form-control eb-form-control"> 
									</div>
								</div>
								
							<div class="text-right">
								<a v-if="options['action_list'].length > 1" href="#" class="pl-2" @click.prevent="removeAction(action)">Remove</a>
								<a href="#" class="pl-2" @click.prevent="addNewAction(index+1)">Add New</a>
							</div>
					</div>
					
				</div>
		</div>
	
	
	
	<div v-for="(option, key, index) in options">
	
					<div v-if="key == 'backgroundColor'" class="block-properities active" v-toggle-style-actions>
		
						    <div class="properity-header">
						     <i class="fa fa-angle-down expand"></i>
							    <i class="fa fa-angle-right contract"></i>
						    	Background</div>
						    
							<div class="properity-body">
							
								<div class="form-group">
										<input type="text" data-transparent="true" v-color-code="options[key]" v-input-field="'blur'"  :style="{borderLeftColor:options[key]}"
														v-model="options[key]" readonly class="color-picker form-control eb-form-control" data-alpha-enabled="true"/>
								</div>
							</div>
							
					</div>
					
					<div v-if="editelementtype == 'section' && key == 'boxShadow' && typeof option==='object'" class="block-properities active" v-toggle-style-actions>
					
					    <div class="properity-header">
					     <i class="fa fa-angle-down expand"></i>
						    <i class="fa fa-angle-right contract"></i>
					    Box Shadow</div>
					    
						<div class="properity-body">
					
						<style-box-shadow :boxshadow="option"></style-box-shadow>
							
						</div>	
					</div>
					
					<div v-if="editelementtype == 'section' && contenttype != 'collection_section' && key == 'background' && typeof option==='object'" class="block-properities active" v-toggle-style-actions>
								
						<div class="properity-header">
						<i class="fa fa-angle-down expand"></i>
						    <i class="fa fa-angle-right contract"></i>
						Background</div>
						<div class="properity-body">
						
							<style-background :background="option" ></style-background>
						
						</div>		
					</div>
					
					<div v-if=" key == 'html'" class="block-properities active" v-toggle-style-actions>
					
						    <div class="properity-header">
						     <i class="fa fa-angle-down expand"></i>
							   <i class="fa fa-angle-right contract"></i>
						   		 HTML Code
								here</div>
					    
							<div class="properity-body">
							
							<div class="form-group" >
									<textarea id="builder_el_html" 
									class="form-control eb-form-control"
								v-model="options[key]" rows="8" title="HTML Code"></textarea>
								
														
								</div>
							
							</div>
					</div>
	
						<div v-if=" key == 'clickAction'" class="block-properities active" v-toggle-style-actions>
					
						    <div class="properity-header">
						     <i class="fa fa-angle-down expand"></i>
							   <i class="fa fa-angle-right contract"></i>
						   		 Click Action</div>
					    
							<div class="properity-body">
								<div class="form-group" >
									<label>Action</label>
									<select type="text" class="form-control eb-form-control" v-model="option['type']" @change="option['value']=''">
												<option value="none">None</option>
												<option value="open_url_in_new_tab">Open URL in new tab</option>
												<option value="open_url_in_same_tab">Open URL</option>
												<option value="scroll_to_section">Choose a section</option>
												<option value="send_an_email">Send an Email</option>
												<option value="show_popup">Show Popup</option>
									</select>
														
								</div>
								
								<div v-if="option['type'] == 'show_popup'" class="form-group">
							
										<engagebay-popup-list :popupoptions="option" :popupidkey="'value'">
											
										</engagebay-popup-list>
											
								</div>
								
								<div v-if="option['type']=='open_url_in_same_tab' || option['type']=='open_url_in_new_tab' || option['type']=='send_an_email'" 
									class="form-group">
									    <label v-if="option['type']=='send_an_email'">Email</label>
										<label v-else>URL</label> 
										<input class="form-control eb-form-control" v-model="option['value']" />
									</div>
									
								<div v-if="option['type']=='scroll_to_section'" class="form-group">
										<label>Select a Section</label> 
										<select type="text" class="form-control eb-form-control" v-model="option['value']">
												<option>--Select--</option>
												<option v-for="section in getPageSection()" :value="section.id" v-html="(section.options.name) ? section.options.name : section.id"></option>
										</select>								
								</div>

							</div>
						
						</div>
						
					<div v-if="editelementtype == 'section' && (key == 'border' || key == 'buttonBorder')" class="block-properities active" v-toggle-style-actions>
					
					    <div class="properity-header">
					    
					      <i class="fa fa-angle-down expand"></i>
						    <i class="fa fa-angle-right contract"></i>
						    
					    Border</div>
					    <div class="properity-body">
							
								<style-border :border="option" ></style-border>
							
						   </div>
						</div>

					</div>
					
					
					
					<div v-if="editelementtype=='content'" class="block-properities active" v-toggle-style-actions>
					
					    <div class="properity-header">
					     	<i class="fa fa-angle-down expand"></i>
						    <i class="fa fa-angle-right contract"></i>
					    	Visibility</div>
					    
						<div class="properity-body">
						
							<div class="custom-control custom-switch">
							  <input v-input-field="'change'" v-model="options['desktop']['visible']" type="checkbox" class="custom-control-input" id="desktopContentvisibility" @change="viewportVisibilityChanged('desktop')">
							  <label class="custom-control-label" for="desktopContentvisibility" style="padding-top: 3px; ">Desktop</label>
							</div>
							
							<div class="custom-control custom-switch">
							  <input v-input-field="'change'" v-model="options['mobile']['visible']" type="checkbox" class="custom-control-input" id="mobileContentvisibility" @change="viewportVisibilityChanged('mobile')">
							  <label class="custom-control-label" for="mobileContentvisibility" style="padding-top: 3px; ">Mobile</label>
							</div>
							
						</div>
					</div>
				</div>
					
					
					
	
	</template>
<script>
import { utils } from '../app';
import fontStyleSettings from './fontStyleSettings.vue';
import { builderGlobals, landingpageBuilderVueRef } from '../global';
import '../../public/app.css';
import $ from "jquery";

export default {
  name: 'styleEditFormFields',
  components: {
    fontStyleSettings
  },
  props: ['options', 'font', 'themesettings', 'editelementtype', 'accordion', 'contenttype', 'elementid', 'element', 'viewport'],
  data: function () {
    return {
      globals: builderGlobals,
      navBrandImagePopup: false
    };
  },
  created: function () {

  },
  mounted: function () {

    utils.initTooltips();

  },
  watch: {

    /*
         * options : { handler : function(newVal, oldVal) {
         *
         * var self= this;
         *
         * if(this.editelementtype == 'body') { if(self.options &&
         * self.options.desktopContentWidth) self.desktopContentWidthRef =
         * self.options.desktopContentWidth;
         *
         * self.bodyLinkColorChanged(self.options.font.linkColor);
         *  }
         *  }, deep : true },
         */

  },

  methods: {

    initValue(json, key, initVal) {
      try {
        if (!json[key])
          json[key] = initVal;
      } catch (e) {
      }
    },

    showModal(ref) {
      this.$root.$emit('bv::show::modal', ref);
    },

    hideModal(ref) {
      this.$root.$emit('bv::hide::modal', ref);
    },

    /*
            * updateFontFamily(newFamily){ this.options['font']['family'] =
            * newFamily; },
            */

    isContentHasHeightProperity() {

      if (!this.contenttype || ['text', 'heading3', 'divider', 'icon'].indexOf(this.contenttype) > -1)
        return false;

      return true;

    },

    isContentHasWidthProperity() {

      if (!this.contenttype || ['verticaldivider', 'icon'].indexOf(this.contenttype) > -1)
        return false;

      return true;

    },

    borderWidthChanged(newVal) {

      if (this.contenttype && this.contenttype == "verticaldivider") {
        this.options['desktop'].width = Number(newVal) + 10;
        this.options['mobile'].width = Number(newVal) + 10;
      }

      landingpageBuilderVueRef.addState(landingpageBuilderVueRef.landingpagePrefs);

    },

    viewportVisibilityChanged(viewport) {

      // landingpageBuilderVueRef.activeSettingsElement
      // Check element positions

    },

    getPageSection: function () {

      return landingpageBuilderVueRef.landingpagePrefs.sections;

      /*var arr = [];
            landingpageBuilderVueRef.landingpagePrefs.sections.forEach(function(
                    section) {
                arr.push(section.id);
            });
            return arr;*/
    },

    editBodyContentWidth: function (options, actionType) {

      var newVal;

      try {
        if (actionType == "substract") {
          var newVal = Number(this.options.desktopContentWidth) - 50;
        } else
          var newVal = Number(this.options.desktopContentWidth) + 50;

        if (newVal > 0) {
          this.options.desktopContentWidth = parseNumber(newVal);
        }

        landingpageBuilderVueRef.addState(landingpageBuilderVueRef.landingpagePrefs);

      } catch (e) {
      }

    },

    addNewAction(index) {

      this.options.action_list.splice(index, 0, {
        text: 'action',
        link: ''
      });

    },
    removeAction(remaction) {
      this.options.action_list = this.options.action_list.filter(function (action) {
        return action != remaction;
      });

    },

    alignContent(position) {

      var self = this;
      landingpageBuilderVueRef.landingpagePrefs.sections.forEach(function (
        section) {

        section.columns[0].contents.forEach(function (content) {

          if (content.id != self.elementid)
            return;

          var viewport = landingpageBuilderVueRef.activeViewport;
          var sectionHeight = $('#' + section.columns[0].id + '.' + viewport).height(),
            sectionWidth = $('#' + section.columns[0].id + '.' + viewport).width();
          var contentHeight = $('#' + content.id).height(), contentWidth = $('#' + content.id).width();

          if (position == "h-left") {
            self.options[viewport].left = 0;
          } else if (position == "h-center") {
            self.options[viewport].left = (sectionWidth / 2) - (contentWidth / 2);
          } else if (position == "h-right") {
            self.options[viewport].left = sectionWidth - contentWidth;
          } else if (position == "v-top") {
            self.options[viewport].top = 0;
          } else if (position == "v-center") {
            self.options[viewport].top = (sectionHeight / 2) - (contentHeight / 2);
          } else if (position == "v-bottom") {
            self.options[viewport].top = sectionHeight - contentHeight;
          }

        });

      });

    }

  }
}
</script>
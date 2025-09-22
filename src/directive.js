/* eslint-disable */
import Vue from 'vue'   
import {utils} from "@/app";  
import '../public/lib/wcolpick/wcolpick.js'
Vue.filter('makeTitle', function (value) {
    if (!value) return '';
    value = utils.camelToSnake(value);
    value = value.charAt(0).toUpperCase() + value.slice(1);
    return value.replace(/_/g, ' ');
});

Vue.mixin({
	methods : {
		
		keymonitor(event) {
			
	    	// who caused it? "event.target.id"
	    	console.log('keyup from id: '+event.target.id)
	      
// // what was pressed?
// let keyMessage = 'keyup: ';
// if (event.shiftKey) {
// keyMessage += 'Shift+';
// }
// keyMessage += event.key || String.fromCharCode(event.keyCode);
//
// console.log(keyMessage)
	    	
	    },
		
		getPaddingOrMargin : function(prefs) {
			var newPrefs = '';
			for ( var i in prefs) {
				newPrefs = newPrefs + (prefs[i] + 'px ');
			}

			return newPrefs;

		},
		
		removeObjectFromArray : function(event, list, index){
			
			if (event){
				event.stopPropagation();
				event.preventDefault();
			}
			
			list.splice(index, 1);
		},

		getColumnClassName : function(size) {
			if(!size || size <= 0)
				return "";
			
			return 'col-md-' + size;
		},
		
		getViewportType(){
			try {
				return landingpageBuilderVueRef.activeViewport;
			} catch (e) {
				return undefined;
			}
		},
		
		isNotEmpty: function(val) {
			   
			   if(!val || !val.trim())
				   return false;
				   
				   return true;
			
		   },
		   
		   hasKey: function(obj, key) {
			   try {
				   return (key in obj);				
				} catch (e) {
					return false;
				}
		   },
		   
		   getDimensions : function(dimension) {
			   
			   if(!dimension || dimension == 'auto')
				   return 'auto';
			   
			   return dimension + 'px';
		   },
		   
		   getFontFamilyClassName: function(fontobj) {
			   
			   if(!fontobj || !fontobj.family)
				   return "";
			   
			   return 'font-family-' + fontobj.family.split(" ").join('_');
		   },
		   
		   getContainerClass : function(widthType) {
			   if(!widthType)
				   return "container";
			
				return "container-" + widthType;
		   },
		   
		   getSelectedStyles(options, styles, stylesArr){
			   
			   if(!styles)
				   styles = {};
			   
			   if(!stylesArr || stylesArr.length == 0)
				   return styles;
			   
			   if((stylesArr.indexOf('font') > -1 && options.font) || (stylesArr.indexOf('fieldFont') > -1 && options.fieldFont)){

				   
				   var fontJSON;
				   if(stylesArr.indexOf('font') > -1 && options.font){
					   fontJSON = options.font;
				   }else if(stylesArr.indexOf('fieldFont') > -1 && options.fieldFont){
					   fontJSON = options.fieldFont;
				   }
				   
					  if(fontJSON.color)
						  styles.color = fontJSON.color;
					 
					 if(fontJSON.weight){
						 styles.fontWeight = fontJSON.weight;
					 }
					 
					 if(fontJSON.size){
						 styles.fontSize = fontJSON.size + 'px';
					 }
					 
					 if(fontJSON.family){
						 styles.fontFamily = utils.snakeToCamel(fontJSON.family);
					 }
					 
					 if(fontJSON.lineHeight)
						 styles.lineHeight = fontJSON.lineHeight;
				
			   }
			   
			   if(  stylesArr.indexOf('background-color') > -1 && options.backgroundColor)
			   { 
				   styles.backgroundColor= options.backgroundColor;
				}
			  
			   if(stylesArr.indexOf('padding') > -1 && options.padding){
				   styles.paddingTop = options.padding.top + "px";
				   styles.paddingBottom = options.padding.bottom + "px";
				   styles.paddingLeft = options.padding.left + "px";
				   styles.paddingRight = options.padding.right+ "px";
			   }
			   
			   if(stylesArr.indexOf('buttonPadding') > -1 && options.buttonPadding){
				   styles.paddingTop = options.buttonPadding.top + "px";
				   styles.paddingBottom = options.buttonPadding.bottom + "px";
				   styles.paddingLeft = options.buttonPadding.left + "px";
				   styles.paddingRight = options.buttonPadding.right+ "px";
			   }
			   
			   if(stylesArr.indexOf('fieldPadding') > -1 && options.fieldPadding){
				   styles.paddingTop = options.fieldPadding.top + "px";
				   styles.paddingBottom = options.fieldPadding.bottom + "px";
				   styles.paddingLeft = options.fieldPadding.left + "px";
				   styles.paddingRight = options.fieldPadding.right+ "px";
			   }
			   
			   if(stylesArr.indexOf('navPadding') > -1 && options.navPadding){
				   styles.paddingTop = options.navPadding.top + "px";
				   styles.paddingBottom = options.navPadding.bottom + "px";
				   styles.paddingLeft = options.navPadding.left + "px";
				   styles.paddingRight = options.navPadding.right+ "px";
			   }
			   
			   if(stylesArr.indexOf('margin') > -1 && options.margin){
				   styles.marginTop = options.margin.top + "px";
				   styles.marginBottom = options.margin.bottom + "px";
				   styles.marginLeft = options.margin.left + "px";
				   styles.marginRight = options.margin.right+ "px";
			   }
			   
			   if(stylesArr.indexOf('bodyWidth') > -1){
				   
				  try {
					  var widthType = landingpageBuilderVueRef.landingpagePrefs.bodySettings.width_type;
					   if(widthType == 'custom'){
						   styles.width = landingpageBuilderVueRef.landingpagePrefs.bodySettings.desktopContentWidth + 'px'
					   }
					   if(widthType == 'full_width'){
						   styles.width = '100%';
					   }					
				} catch (e) {
				}
			   }
			   
			   if(stylesArr.indexOf('box-shadow') > -1 && options.boxShadow && options.boxShadow.enabled){
				   styles.boxShadow = options.boxShadow.horizontalLength+'px '+ options.boxShadow.verticalLength+'px ' + options.boxShadow.blurRadius+'px '+ options.boxShadow.spreadRadius + 'px '+ options.boxShadow.color;
			   }
			   
			   if(stylesArr.indexOf('border') > -1 || stylesArr.indexOf('fieldBorder') > -1 || stylesArr.indexOf('buttonBorder') > -1 || stylesArr.indexOf('image_border') > -1){

				   var borderJSON;
				   if(stylesArr.indexOf('border') > -1){
					   borderJSON = options.border;
				   }else if(stylesArr.indexOf('buttonBorder') > -1){
					   borderJSON = options.buttonBorder;
				   }else if(stylesArr.indexOf('image_border') > -1){
					   borderJSON = options.image_border;
				   }else if(stylesArr.indexOf('fieldBorder') > -1){
					   borderJSON = options.fieldBorder;
				   }
				   
				   if(borderJSON && borderJSON.applyTo && borderJSON.applyTo.length > 0){
					   
					   var borderStyle = borderJSON.size+'px ' + borderJSON.style +' ' +borderJSON.color;
					   
					   if(borderJSON.radius){
						   
						   if(borderJSON.radiusApplyTo){
							   if(borderJSON.radiusApplyTo.indexOf("top_left") > -1){
								   styles.borderTopLeftRadius = borderJSON.radius + 'px';
							   }else{
								   styles.borderTopLeftRadius = '0px';
							   }
								if(borderJSON.radiusApplyTo.indexOf("top_right") > -1){
									styles.borderTopRightRadius = borderJSON.radius + 'px';		   
								}else{
									   styles.borderTopRightRadius = '0px';
								   }
								
								if(borderJSON.radiusApplyTo.indexOf("bottom_left") > -1){
									styles.borderBottomLeftRadius = borderJSON.radius + 'px';
								}else{
									   styles.borderBottomLeftRadius = '0px';
								   }
								
								if(borderJSON.radiusApplyTo.indexOf("bottom_right") > -1){
									styles.borderBottomRightRadius = borderJSON.radius + 'px';
								}else{
									   styles.borderBottomRightRadius = '0px';
								   }
								
						   }else{
							   styles.borderRadius = borderJSON.radius + 'px';
						   }
					   }
					   
					   if(borderJSON.applyTo.indexOf("top") > -1){
						   styles.borderTop = borderStyle;
					   }else{
						   styles.borderTop = '0px '+borderJSON.style +' ' +borderJSON.color;
					   }
						if(borderJSON.applyTo.indexOf("bottom") > -1){
							styles.borderBottom = 	borderStyle;		   
						}else{
							   styles.borderBottom = '0px '+borderJSON.style +' ' +borderJSON.color;
						 }
						if(borderJSON.applyTo.indexOf("right") > -1){
							styles.borderRight = borderStyle;
						}else{
							   styles.borderRight = '0px '+borderJSON.style +' ' +borderJSON.color;
						   }
						
						if(borderJSON.applyTo.indexOf("left") > -1){
							styles.borderLeft = borderStyle;
						}else{
							   styles.borderLeft = '0px '+borderJSON.style +' ' +borderJSON.color;
						   }
						
				   }
				  
			   
			   }
			   
			   if((stylesArr.indexOf('background') > -1 || stylesArr.indexOf('fieldBackground') || stylesArr.indexOf('buttonBackground') > -1) ){
					
				   var bgJSON;
				   if(stylesArr.indexOf('background') > -1){
					   bgJSON = options.background;
				   }else if(stylesArr.indexOf('buttonBackground') > -1){
					   bgJSON = options.buttonBackground;
				   }else if(stylesArr.indexOf('fieldBackground') > -1){
					   bgJSON = options.fieldBackground;
				   }
				   
				   if(bgJSON && bgJSON != 'none')
					 {
					   
					   if(bgJSON.type == 'solid'){
							styles.backgroundColor= bgJSON.color;
						}
						else if(bgJSON.type == 'gradient'){
							styles.backgroundImage= 'linear-gradient('+bgJSON.gradient.orientation+'deg, '+bgJSON.gradient.from_color+', '+bgJSON.gradient.to_color+')';
						}
						
						else if(bgJSON.type == 'solid_and_gradient'){
							styles.backgroundColor= bgJSON.color;
							styles.backgroundImage= 'linear-gradient('+bgJSON.gradient.orientation+'deg, '+bgJSON.gradient.from_color+', '+bgJSON.gradient.to_color+')';
						}
						
						else if(bgJSON.type == 'image' && this.isNotEmpty(bgJSON.image.url)){
							
							styles.backgroundPosition = bgJSON.image.position;
							styles.backgroundRepeat = bgJSON.image.repeat;
							styles.backgroundSize = bgJSON.image.size;
							styles.backgroundAttachment = bgJSON.image.attachment;
							styles.backgroundImage = 'url(' + bgJSON.image.url +')';

						}
						
						else if(bgJSON.type == 'image_and_solid_color'){
							
							styles.backgroundPosition = bgJSON.image.position;
							styles.backgroundRepeat = bgJSON.image.repeat;
							styles.backgroundSize = bgJSON.image.size;
							styles.backgroundAttachment = bgJSON.image.attachment;
							styles.backgroundImage = 'url(' + bgJSON.image.url +')';
							styles.backgroundColor= bgJSON.color;
						}
						
						else if(bgJSON.type == 'image_and_gradient'){
							
							styles.backgroundPosition = bgJSON.image.position;
							styles.backgroundRepeat = bgJSON.image.repeat;
							styles.backgroundSize = bgJSON.image.size;
							styles.backgroundAttachment = bgJSON.image.attachment;
							styles.backgroundImage = 'linear-gradient('+bgJSON.gradient.orientation+'deg, '+bgJSON.gradient.from_color+', '+bgJSON.gradient.to_color+'), url(' + bgJSON.image.url +')';
						}
						else if(bgJSON.type == 'video'){
							
						}
					   
					   }
				   
			   }
			   
			   return styles;
			   
		   },
		   
	}

});

Vue.directive('input-file-upload', {

	twoWay : true,
	bind : function(elem, binding, vnode) {

		$(elem).find('input[type="file"]')
				.bind(
						'change',
						function(event) {

							var uploadLink = $(elem).find('.file-btn');
							var uploadingIcon = $(elem).find('.uploading');
							var $that = $(this);

							var callback = {

								success : function(file) {

									event.target.value = "";
									
									var $fileObj = $(elem).find('input.file-obj')
									if($fileObj.length > 0){
										$fileObj.val(JSON.stringify(file));
										$fileObj.get(0).dispatchEvent(new Event('input', {bubbles : true}));
									}
									
									var $imagePath = $(elem).find('input.image-path')
									if($imagePath.length > 0){
										$imagePath.val(file.file_url);
										$imagePath.get(0).dispatchEvent(new Event('input', {bubbles : true}));
									}
									
								},
								error : function(error, file) {
									event.target.value = "";
									utils.notify(error).error();
								},
								progress : function(percentComplete) {
								},
								toggleLoader : function(status, fileCount) {

									if (status == "show") {
										$that.prop('disabled', true);
										uploadLink.text('Uploading...');
										uploadingIcon.show();
									} else {
										$that.prop('disabled', false);
										uploadLink.text('Browse');
										uploadingIcon.hide();
									}
								}
							};

							Account_Box_File_Upload.uploadByFile(
									event.target.files[0], callback, [ 'png',
											'jpg', 'jpeg', 'gif', 'bmp', 'svg' ]);

						});

	},
	unbind : function(elem) {
		$(elem).unbind('change');
	}

});

Vue.directive('color-code', {
	bind : function(el, binding, vnode) {
		
		var $elem = $(el);
		var defaultColor = binding.value;
		
		var isalphaEnabled = ($(el).attr('data-alpha-enabled')) ? true : false;
		
		setTimeout(function() {
			
			$elem.wrap('<div style="position:relative;margin-bottom: 20px;"></div>');
			var $colorVisibilty = $("<div class='color-code-indication' style='top:0;width: 30px;height: 100%;background: "+defaultColor+";position: absolute;border-top-left-radius: 3px;border-bottom-left-radius: 3px;border: 1px solid #ced4da;'></div>");
			$elem.css({'padding-left' : '35px'});
			$elem.after($colorVisibilty);

			if($(el).attr('data-transparent')){
				var $transparent = $('<span class="make-it-transparent text-primary" style=" cursor: pointer;position: absolute; right: 0px; bottom: -15px;font-size:9px; ">Make it transparent</span>');
				$elem.parent().append($transparent);
				$transparent.on('click', function(e) {
					e.preventDefault();e.stopPropagation();
					$elem.val('transparent');
	    			el.dispatchEvent(new Event('input', { bubbles: true }));
	    			initializePicker();
	    		});
			}
		
			initializePicker();
			
			function initializePicker() {
				var $initEle = $elem.parent();
				$initEle.loads({
					variant : 'small',
					layout :  'hex',
					flat : false,
					enableAlpha : isalphaEnabled,
					appendToBody: true,
					color : defaultColor,
					onChange : function(ev) {
						
						var color = "";
						
						if(isalphaEnabled)
							color = "#" + ev.hexa;
						else
							color = "#" + ev.hex;
						
						$(ev.el).find('input').val(color);
						$colorVisibilty.css({'background' : color});

						el.dispatchEvent(new Event('input', {
							bubbles : true
						}));
						
					},
					onSubmit : function(ev) {
						
					},
					onShow : function(ev) {
						$(ev.el).setColor($elem.val());
					},
					onHide : function(ev) {
						console.log(ev);
					}
				});
				
			}
			
		}, 100);

	},
	  update (el, binding, vnode) {
	  	$(el).siblings('.color-code-indication').css({'background' : binding.value});;
	  }
});


Vue.directive('toggle-style-actions', {

	bind : function(el, binding, vnode) {

		$('.properity-header', el).bind('click', function(e) {
			$(el).toggleClass('active');
		});

	}
});

Vue.directive('toggle-col-section-style-actions', {

	bind : function(el, binding, vnode) {

		$('.properity-header', el).bind('click', function(e) {
			if(!$(el).hasClass("active"))
				$('.col-section.active').toggleClass('active');
			$(el).toggleClass('active');
		});

	}
});

Vue.directive('prevent-nav', {

	bind : function(el, binding, vnode) {

		el.addEventListener('click', (e) => {
			const anchor = e.target.closest('a');
			if (anchor && el.contains(anchor)) {
				e.preventDefault();
			}
		});

	}

})

Vue.directive('navbar-toggler', {

	twoWay : true,
	bind : function(elem, binding, vnode) {
		
		var target = $(elem).attr('data-target');
		$(elem).bind('click', function(e) {
			$(target).toggleClass('show');
		});
		
	}
});

Vue.directive('settings-accordion', {

	bind : function(el, binding, vnode) {

		$('.accordion-toggle-body', el).bind('click', function(e) {
			$(el).toggleClass('active');
		});

	}
});

Vue.directive('lp-tab-action', {

	bind : function(el, binding, vnode) {

		$('ul.lp-tabs li a', el).bind('click', function(e) {
			$('ul.lp-tabs li.active', el).removeClass('active');
			$(this).closest('li').addClass('active');
			
			var activeTab = $(this).attr('data-tab');
			$('.lp-tab-content.active', el).removeClass('active');
			$('#'+activeTab).addClass('active');
			
		});

	}
});

Vue.directive('input-field', {

	bind : function(el, binding, vnode) {
		
		var eventType = binding.value;
		
		var initialValue = $(el).val();
		
		$(el).bind('focus', function(e) {
			
			initialValue = $(el).val();
		});

		$(el).bind(eventType, function(e) {
			
			if(initialValue == $(el).val() && $(this).attr('type') != 'checkbox')
				return;
			
			console.log('adding state in direc');
			landingpageBuilderVueRef.addState(landingpageBuilderVueRef.landingpagePrefs);
			
		});

	}
});

Vue
.directive(
		'tinymceEditor1',
		{
			twoWay : true,
			bind : function(elem, binding, obj) {
				var self = elem, textarea = [];
				
				setTimeout(
						function() {

							tinymce
									.init({
										target : self,
										// selector :
										// '#'+$(elem).attr('id'),
										inline : true,
										menubar : false,
										// skin : 'lightgray',
										// theme : 'modern',
										plugins : [
												"advlist autolink lists link image charmap",
												"searchreplace visualblocks code fullscreen",
												"insertdatetime media table paste",
												"lineheight", 'paste' ],
										toolbar1 : "bold italic underline | forecolor backcolor | bullist numlist | link image",
										fontsize_formats : '8px 9px 10px 11px 12px 13px 14px 15px 16px 18px 20px 22px 24px 26px 28px 30px 36px 40px 44px 72px',
										lineheight_formats : '8px 9px 10px 11px 12px 13px 14px 16px 18px 20px 22px 24px 26px 28px 36px 38px 40px 45px 50px 55px 60px',
										file_picker_types : 'image',
										paste_filter_drop : false,
										setup : function(editor) {

										}
									});
						}, 0)
			},
			update : function(el, obj) {},
			unbind : function(el) {}
		});

Vue
.directive(
		'tinymceEditor',
		{
			twoWay : true,
			bind : function(elem, binding, obj) {
				
				
				var self = elem;
				var textarea;
				setTimeout(function(){
					textarea = $(
							elem)
							.next(
									'textarea');
					console.log(textarea.get(0));
					
				}, 10);
				
				$(elem).html($(elem)
						.attr(
								'data-initialize-content'));
				
				$(elem).on('dblclick', function(evt) {
					
					if($(this).attr('contenteditable') == 'true')
						return;

					/*$(this).html($(this)
							.attr(
									'data-initialize-content'));*/
					
					
					for (var i = 0; i < tinyMCE.editors.length; i++) {
						try {
							tinyMCE.editors[i].remove();
						} catch (e) {
						}
					}
						
					// $(this).attr('contenteditable', 'true');
					// $(this).focus();
					
					this.contentEditable = true;
				    // this.focus();
				    
				    var caretRange = getMouseEventCaretRange(evt);
				    
				    // Set a timer to allow the selection to happen and
					// the dust settle first
				    $('.cursor-localtion', elem).removeClass('cursor-localtion');
				    window.setTimeout(function() {
				    	selectCursorRange(caretRange);
				    }, 1);
					
					// tinymce.baseURL = 'lib/tinymce';
					
					setTimeout(
							function() {

					            tinymce.PluginManager.load('fontawesome', resource_path + 'fontawesome/plugin.js');
								tinymce
										.init({
											target : self,
											// fixed_toolbar_container: "#tinymcetoolbar",
											// fixed_toolbar_container: "#tinymceToolbarContainer",
											/*
												 * init_instance_callback :
												 * function() {
												 * console.log('init_instance_callback');
												 * setTimeout(function () { //
												 * you may not need the
												 * timeout
												 * tinyMCE.get($(elem).attr('id')).focus(); },
												 * 500); },
												 */
											 // selector :
											// '#'+$(elem).attr('id'),
											inline : true,
											menubar : false,
											// skin : 'lightgray',
											// theme : 'modern',
											plugins : [
													"advlist autolink lists link image charmap",
													"searchreplace visualblocks code fullscreen",
													"insertdatetime media table paste",
													'-fontawesome noneditable',
													"lineheight", 'paste', 'image'],
											toolbar1 : "bold italic underline | alignleft aligncenter alignright alignjustify",
											toolbar2 : "styleselect fontsizeselect lineheightselect",
											toolbar3 : "forecolor backcolor | bullist numlist | link image fontawesome",
											fontsize_formats : '8px 9px 10px 11px 12px 13px 14px 15px 16px 18px 20px 22px 24px 26px 28px 30px 36px 40px 44px 72px',
											lineheight_formats : '8px 9px 10px 11px 12px 13px 14px 16px 18px 20px 22px 24px 26px 28px 36px 38px 40px 45px 50px 55px 60px',
											paste_filter_drop : false,
											forced_root_block: false,
											init_instance_callback: function (editor) {
												const content = editor.getContent();

												// Remove empty paragraphs like <p>&nbsp;</p> or <p><br></p>
												const cleaned = content.replace(/<p>(&nbsp;|<br>|\\s)*<\/p>/gi, '').trim();
												editor.setContent(cleaned);
											},
											 // content_css: 'https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
								             // noneditable_noneditable_class: 'fa',
								             extended_valid_elements: 'span[*]',
								             file_picker_types : 'image',
								             file_picker_callback : tinymceFileUploadCallback,
											setup : function(editor) {
												
												// init tinymce
												editor
														.on(
																'init',
																function(e) {
																	
																	 setTimeout(function () {  
																		 editor.selection.setCursorLocation($(editor.getBody()).find('.cursor-localtion')[0], 1);
																		 editor.focus();
																		 editor.insertContent('');
																		 $(editor.getBody()).find('.cursor-localtion').text('');
																		 editor.selection.getNode().remove();
																	 }, 100);
																	
																});
												
												editor
												.on(
														'keyup change',
														function(e) {
															
															// get
															// new
															// value
															textarea
																	.val(editor
																			.getContent({
																				format : 'raw'
																			}));
															
															var customEvent = new Event(
																	'input',
																	{
																		bubbles : true
																	}); // won't
															// work
															// in
															// IE
															// <11
															textarea
																	.get(
																			0)
																	.dispatchEvent(
																			customEvent);
															

														});
												
												editor
												.on(
														'blur',
														function(e) {
															
															$(elem).removeAttr('contenteditable');

															// get
															// new
															// value
															textarea
																	.val(editor
																			.getContent({
																				format : 'raw'
																			}));
															
															var customEvent = new Event(
																	'input',
																	{
																		bubbles : true
																	}); // won't
															// work
															// in
															// IE
															// <11
															textarea
																	.get(
																			0)
																	.dispatchEvent(
																			customEvent);
															

															try {
																editor.remove();
																// tinymce.get($(elem).attr('id')).remove();
															} catch (e) {
															}
															
															landingpageBuilderVueRef.addState(landingpageBuilderVueRef.landingpagePrefs);
														});

											}
										});
							}, 0)
					
				});
				
			},
			update : function(el, obj) {
				console.log('updatoer');
				/*
				 * var currentEditor = tinymce.get($(el).attr('id')); if
				 * (obj.modifiers.update) {
				 * currentEditor.setContent(obj.value) }
				 */
			},
			unbind : function(el) {
				// console.log('unbinder');
				// tinymce.get($(el).attr('id')).destroy()
			}
		});


Vue
.directive(
		'tinymceEditorInlineElements',
		{
			twoWay : true,
			bind : function(elem, binding, obj) {
				var self = elem, textarea = [];
				
				// tinymce.baseURL = 'lib/tinymce';
				
				var self = elem;
				var textarea;
				setTimeout(function(){
					textarea = $(
							elem)
							.next(
									'textarea');
					$(elem).html($(elem)
							.attr(
									'data-initialize-content'));
					
				}, 10);
				
				setTimeout(
						function() {
							
							/*var containerId = 'toolbarContainer_'+new Date().getTime();
							if($(elem).siblings('.inline-tinymce-toolbar-container').length == 0)
								$(elem).before("<div class='inline-tinymce-toolbar-container' id='"+containerId+"'></div>");
							else{
								containerId = $(elem).siblings('.inline-tinymce-toolbar-container').attr('id');
							}*/
							// tinymce.baseURL = 'lib/tinymce';

				            tinymce.PluginManager.load('fontawesome', resource_path + 'fontawesome/plugin.js');
							tinymce
									.init({
										target : self,
										// fixed_toolbar_container: "#" + containerId,
										invalid_elements : "p,div,h2,h3,h4,h5,h1",
										// selector :
										// '#'+$(elem).attr('id'),
										inline : true,
										menubar : false,
										// skin : 'lightgray',
										// theme : 'modern',
										plugins : [
												"advlist autolink lists link image charmap",
												"searchreplace visualblocks code fullscreen",
												"insertdatetime media table paste",
												"lineheight", 'paste', '-fontawesome noneditable'],
												toolbar1 : "bold italic underline | forecolor backcolor",
												toolbar2 : "fontsizeselect lineheightselect",
												toolbar3 : "bullist numlist | link image fontawesome",
										fontsize_formats : '8px 9px 10px 11px 12px 13px 14px 15px 16px 18px 20px 22px 24px 26px 28px 30px 36px 40px 44px 72px',
										lineheight_formats : '8px 9px 10px 11px 12px 13px 14px 16px 18px 20px 22px 24px 26px 28px 36px 38px 40px 45px 50px 55px 60px',
										file_picker_types : 'image',
										extended_valid_elements: 'span[*]',
							             file_picker_callback : tinymceFileUploadCallback,
										paste_filter_drop : false,
										setup : function(editor) {

											// when typing keyup event
											editor
													.on(
															'keyup change',
															function() {
																// get
																// new
																// value
																textarea
																		.val(editor
																				.getContent({
																					format : 'raw'
																				}));
																var customEvent = new Event(
																		'input',
																		{
																			bubbles : true
																		}); // won't
																// work
																// in
																// IE
																// <11
																textarea
																		.get(
																				0)
																		.dispatchEvent(
																				customEvent);
															});
										}
									});
						}, 0)
			},
			update : function(el, obj) {
				var currentEditor = tinymce.get($(el).attr('id'));
				if (obj.modifiers.update) {
					currentEditor.setContent(obj.value)
				}
			},
			unbind : function(el) {
				tinymce.get($(el).attr('id')).destroy()
			}
		});


function parseNumber(str){
	try {
		return Number(str);
	} catch (e) {
	}
}

function tinymceFileUploadCallback(cb,
		value, meta) {
	
		var input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept',
				'image/*');
		input.onchange = function() {
			var $loader = $("<img style='padding-left:10px;' src='https://d2p078bqz5urf7.cloudfront.net/cloud/dev/assets/img/loader/facebook.gif'>");
			var callback = {
				success : function(file) {
					cb(file.file_url, {
						title : file.name
					});
					$loader.hide();
					$loader.remove();
				},
				error : function(error,
						file) {
					alert("upload failed!")
				},
				progress : function(
						percentComplete) {
				},
				toggleLoader : function(
						status, fileCount) {
					if (status == "show") {
						$(".mce-primary")
								.before(
										$loader);
					}
				}
			};

			if (this.files) {
				console
						.log("files are selected uploading them to ec2")
				Account_Box_File_Upload.uploadByFile(
								this.files[0],
								callback,
								[
										"png",
										"jpg",
										"jpeg",
										"bmp",
										"svg",
										"gif" ]);
			}
		};

		input.click();
	}
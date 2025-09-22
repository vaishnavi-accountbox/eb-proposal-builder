/* eslint-disable no-empty */
/* eslint-disable no-constant-condition */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
/* global $, ga, loadHTMLTypeContentInFrame, getMouseEventCaretRange, selectCursorRange */
import {getBuilderDefaultSettings, webFontFamily} from "@/global";
import { getDefaultBodySetting, googleFontFamily } from "./global";

export var utils = {
		
  getBuilderDataPreferences : function() {
			
    // Ensure LANDING_PAGE_JSON is initialized
    if (!window.LANDING_PAGE_JSON) {
      window.LANDING_PAGE_JSON = {};
    }
			
    var prefs = {
      sections : window.LANDING_PAGE_JSON.sections || [],
      bodySettings : window.LANDING_PAGE_JSON.bodySettings || getDefaultBodySetting(),
      fontFamilies : window.LANDING_PAGE_JSON.fontFamilies || googleFontFamily,
				    bodyContent : window.LANDING_PAGE_JSON.bodyContent || '',
    }
			
    return utils.rearrangeDeprecatedStyles(prefs);
  },
		
  getUsedFontFamilies: function(prefs) {
    var familes = [];
			
    // Check if bodySettings and font exist before accessing family
    if(prefs.bodySettings && prefs.bodySettings.font && prefs.bodySettings.font.family && !utils.checkIsBowserFontFamily(prefs.bodySettings.font.family))
      familes.push(prefs.bodySettings.font.family);
			
    prefs.sections.forEach(function(section) {

      section.columns[0].contents
        .forEach(function(
          content) {
          try {
            if(content.options.font.family && !utils.checkIsBowserFontFamily(content.options.font.family)
										&& familes.indexOf(content.options.font.family) == -1)
              familes.push(content.options.font.family);
          } catch (e) {
          }

        });

    });
			
    // if(familes.indexOf('roboto') == -1)
    //	familes.push("roboto")
			
    return familes;
			
  },
		
  rearrangeDeprecatedStyles : function(prefs) {
			
    if(!prefs.sections)
      prefs.sections = [];
			
    // Ensure bodySettings and font objects exist
    if(!prefs.bodySettings)
      prefs.bodySettings = {};
    if(!prefs.bodySettings.font)
      prefs.bodySettings.font = {};
				
    if(!prefs.bodySettings.font.hasOwnProperty('headingColor')) {
      prefs.bodySettings.font.headingColor = '#131317';
      prefs.bodySettings.font.headingSize = '15';
      prefs.bodySettings.backgroundColor = '#ffffffff';
      prefs.bodySettings.font.titleSize = '15';
      prefs.bodySettings.font.descriptionSize = '14';
    }

			
    var hasCollectionSection = false;
    try {
      prefs.sections.forEach(function(section) {
					
        if(section.type == 'collection_section') {
          hasCollectionSection = true;
          if(!prefs.bodySettings.hasOwnProperty("themeSettings")) {
            prefs.bodySettings.themeSettings = {
              collectionListStyle:section.options.style,
              collectionPageStyle: {
                contentDescVisibility: false
              },
              articlePageStyle: {
                tableContentsVisibility: false
              }
            }
            delete section.options.style;
          }
        }
					
        utils.rearrangeSectionDeprecatedStyles(section);
      });
    } catch (e) {
    }
    if(hasCollectionSection && !prefs.bodySettings.hasOwnProperty("themeSettings")) {

    }
    if(!hasCollectionSection){
      var newElement = $.extend(true, {}, getBuilderDefaultSettings().defaultOptions.collection_section);
      newElement.id = utils.uid();
      newElement.hovered = false;
      prefs.sections.push(newElement);
    }
			
    console.log();
			
    return prefs;
  },
		
  rearrangeSectionDeprecatedStyles : function(section) {
			
    if(!section.options.name)
      section.options.name = "";

  },
		
  checkIsBowserFontFamily : function(fontFamily) {
			
    if(webFontFamily.indexOf(fontFamily) > -1 || fontFamily == 'inherit')
      return true;
			
    return false;
  },
		
  loadMultipleFontFamily: function(fontFamilyList) {
    for (var i = 0; i < fontFamilyList.length; i++) {
      utils.loadFontFamily(fontFamilyList[i]);
    }
  },
		
  loadFontFamily : function(fontFamily) {
			
    if(!utils.checkIsBowserFontFamily(fontFamily) && $('link#'+fontFamily).length == 0){
				
				 var cssEl = $('<link>', { rel: 'stylesheet', type: 'text/css', 'href': 'https://d2p078bqz5urf7.cloudfront.net/cloud/prod/assets/lib/font-family/'+fontFamily+'.css', id:fontFamily});
				 cssEl.appendTo('head');
				 
    }
			
  },
		
  bodyLinkColorChanged : function(color) {
			
    var $styleSheet = $("#linkColorStylesheet")
    if($styleSheet.length == 0)
      $("head").append('<style id="linkColorStylesheet" type="text/css">.section-container a{color:'+color+'}</style>');
    else
      $styleSheet.text('.section-container a{color:'+color+'}');
  },

		
  /*
		 * removeStatusPopups: function() {
		 * $('.save-processing-loader').remove();
		 * $('.engagebay-modal').remove();
		 * $('body').removeClass('engagebay-modal-open'); },
		 */		
  /**
	 * Convert string from snake to camel
	 * 
	 * @param str
	 * @returns {*}
	 */
  snakeToCamel: function (str) {
    if (typeof str !== 'string') return str;
    return str.replace(/_([a-z])/gi, function (m, w) {
      return "" + w.toUpperCase();
    });
  },
  /**
	 * Convert camel to snake
	 * 
	 * @param str
	 * @returns {*}
	 */
  camelToSnake: function (str) {
    if (typeof str !== 'string') return str;
    return str.replace(/([A-Z])/g, function (m, w) {
      return "_" + w.toLowerCase();
    });
  },
  /**
	 * Generate random id
	 * 
	 * @param prefix
	 * @returns {string}
	 */
  uid: function (prefix) {
    return (prefix || 'id') + (new Date().getTime()) + "RAND" + (Math.ceil(Math.random() * 100000));
  },
    
  checkHasContent: function(blocks) {
    var hasContent = false;
		
    if(!blocks || blocks.length == 0)
      return hasContent;
		
    for (var i = 0; i < blocks.length; i++) {
			
      var block = blocks[i];
      for (var j = 0; j < block.columns.length; j++) {
        if(block.columns[j].contents.length > 0)
          return true;
					
      }
    }
		
    return hasContent;
		
  },
	
  createEmail: function (email) {
    	
    	 email = email || {}; // I know, is ugly, but is supported in es5
    	 
    	 console.log("emaisettings", JSON.stringify(email));
         
    let compileMjmlObject =  getMJMLObject(email);
         
    console.log("compileMjmlObject ", compileMjmlObject);
        
    return new Promise(function (succesFn, rejectFn) {
        	
      if (!confs.options.mjmlPublicKey || !confs.options.mjmlApplicationId) {
        return rejectFn('You did not include MJML API keys!');
      }
      return $.ajax({
        url: 'https://api.mjml.io/v1/render',
        method: 'POST',
        data: JSON.stringify({ mjml: JSON.stringify(compileMjmlObject) }),
        datatype: 'json',
        processData: false,
        beforeSend(req) {
          req.setRequestHeader('Authorization', `Basic ${btoa(`${confs.options.mjmlApplicationId}:${confs.options.mjmlPublicKey}`)}`)
        },
        success(data) {
          return succesFn(data)
        }
      })
    });
  },
    
  /**
	 * Notify
	 * 
	 * @param msg
	 * @param callback
	 * @returns {{log: log, success: success, error: error}}
	 */
  notify: function (msg, callback) {
    return {
      log: function () {
        return alertify.log(msg, callback)
      },
      success: function () {
        alertify.success(msg, callback)
      },
      error: function () {
        alertify.error(msg, callback)
      }
    }
  },

  /**
	 * Confirm dialog
	 * 
	 * @param msg
	 * @param succesFn
	 * @param cancelFn
	 * @param okBtn
	 * @param cancelBtn
	 * @returns {IAlertify}
	 */
  confirm: function (msg, succesFn, cancelFn, okBtn, cancelBtn) {
    return alertify
      .okBtn(okBtn)
      .cancelBtn(cancelBtn)
      .confirm(msg, succesFn, cancelFn)
  },

  /**
	 * Alert dialog
	 * 
	 * @param msg
	 * @returns {IAlertify}
	 */
  alert: function (msg) {
    return alertify
      .okBtn("Ok")
      .alert(msg)
  },

  /**
	 * Prompt dialog
	 * 
	 * @param defaultvalue
	 * @param promptMessage
	 * @param successFn
	 * @param cancelFn
	 * @returns {IAlertify}
	 */
  prompt: function (defaultvalue, promptMessage, successFn, cancelFn) {
    return alertify
      .defaultValue(defaultvalue)
      .prompt(promptMessage, successFn, cancelFn)
  },

  /**
	 * Validate email before save and import
	 * 
	 * @param emailToValidate
	 * @returns {boolean}
	 */
  validateEmail: function (emailToValidate) {
    return Vue.util.isObject(emailToValidate) &&
            $.isArray(emailToValidate.elements) &&
            typeof emailToValidate.html == 'string' &&
            Vue.util.isObject(emailToValidate.emailSettings) 
  },

  /**
	 * Track events with Google Analytics
	 * 
	 * @param category
	 * @param event
	 * @param name
	 * @returns {*}
	 */
  trackEvent: function (category, event, name) {
        
    if(true)
      return;
        
    if (confs.trackEvents) {
      if (!ga)
        throw new Error('To track events, include Google analytics code in index.html');
      return ga('send', 'event', category, event, name);
    }
  },
  equals: function (obj1, obj2) {
    function _equals(obj1, obj2) {
      var clone = $.extend(true, {}, obj1),
        cloneStr = JSON.stringify(clone);
      return cloneStr === JSON.stringify($.extend(true, clone, obj2));
    }
    return _equals(obj1, obj2) && _equals(obj2, obj1);
  },
  removeLineBreaks: function (html) {
    return html.replace(/\n\s*\n/gi, '\n');
  },
  // initTooltips: function () {
  //   setTimeout(function () {
  //     $('*[title]').powerTip({
  //       placement: 's',
  //       smartPlacement: true// north-east tooltip position
  //     });
  //   }, 100)
  // }
};




// Prevent jQuery UI dialog from blocking focusin
$(document).on('focusin', function (e) {
  if ($(e.target).closest(".mce-window, .moxman-window").length) {
    e.stopImmediatePropagation();
  }
});



export var PARENT_UNLOAD_CONFIRM = true;
$(function() {
	
  var confirmBrowseAway = function(){
	  
    if (PARENT_UNLOAD_CONFIRM)
      return true;
    else
      return void (0);

  }
	
  // $(window).bind('beforeunload', confirmBrowseAway);
  $(window.parent).bind('beforeunload', confirmBrowseAway);
	
  $('body').trigger('focus');
	
});

// eslint-disable-next-line no-unused-vars
function loadHTMLTypeContentInFrame() {
	
}
// eslint-disable-next-line no-unused-vars
function getMouseEventCaretRange(evt) {
  var range, x = evt.clientX, y = evt.clientY;
    
  // Try the simple IE way first
  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToPoint(x, y);
  }
    
  else if (typeof document.createRange != "undefined") {
    // Try Mozilla's rangeOffset and rangeParent properties, which are exactly what we want
        
    if (typeof evt.rangeParent != "undefined") {
      range = document.createRange();
      range.setStart(evt.rangeParent, evt.rangeOffset);
      range.collapse(true);
    }
    
    // Try the standards-based way next
    else if (document.caretPositionFromPoint) {
      var pos = document.caretPositionFromPoint(x, y);
      range = document.createRange();
      range.setStart(pos.offsetNode, pos.offset);
      range.collapse(true);
    }
    
    // Next, the WebKit way
    else if (document.caretRangeFromPoint) {
      range = document.caretRangeFromPoint(x, y);
    }
  }
    
  return range;
}
// eslint-disable-next-line no-unused-vars
function selectCursorRange(range) {
  if (range) {
    	
    	
    	var el = document.createElement("span");
    el.innerHTML = "";
    el.className = 'cursor-localtion';
    /*var frag = document.createDocumentFragment(), node, lastNode;
        while ( (node = el.firstChild) ) {
            lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);*/
        
    range.insertNode(el);
    	
    /* if (typeof range.select != "undefined") {
            range.select();
        } else if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }*/
  }
}


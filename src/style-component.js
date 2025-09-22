/* eslint-disable no-mixed-spaces-and-tabs */
import Vue from 'vue'   
import $ from "jquery";
Vue.component("style-icon-settings", {
  props : [ 'icons' ],
  template : '#iconStyleSettingsTemplate',
  methods : {
		
    addNewIcon(event){
			
      if (event)
        event.stopPropagation();
			
      var newIcon = $.extend(true, {}, {
        color : '#333',
        size: 50,
        icon_class : 'smile-o',
        padding: {
          top: 0,
          bottom: 0,
          left: 5,
          right: 5
        },
        clickAction : {
          type : 'none',
          value : '',
        },
      });
			
      this.icons.push(newIcon);
			
      landingpageBuilderVueRef.addState(landingpageBuilderVueRef.landingpagePrefs);
			
    },
		
    cloneIcon(event, icon){
			
      if (event)
        event.stopPropagation();
			
      var newIcon = $.extend(true, {}, icon);
			
      this.icons
        .splice(this.icons
          .indexOf(icon) + 1, 0, newIcon);
			
      landingpageBuilderVueRef.addState(landingpageBuilderVueRef.landingpagePrefs);
			
    },
		
    removeIcon(event, index){
			
      if (event)
        event.stopPropagation();

      var self = this;
			
      self.icons.splice(index, 1);

      landingpageBuilderVueRef.addState(landingpageBuilderVueRef.landingpagePrefs);
			
    }
  }
});

Vue.component("column-settings", {
  props : [ 'columns' ],
  template : '#columnSettingsTemplate',
  methods : {
		
    addNewColumn(event){
			
      if (event)
        event.stopPropagation();
			
      var newColumn = $.extend(true, {}, getDefaultColumnOptions());
      newColumn.id = utils.uid();
			
      this.columns.push(newColumn);
			
      landingpageBuilderVueRef.addState(landingpageBuilderVueRef.landingpagePrefs);
			
    },
		
    cloneColumn(event, column){
			
      if (event)
        event.stopPropagation();
			
      var newColumn = $.extend(true, {}, column);
      newColumn.id = utils.uid();
			
      this.columns
        .splice(this.columns
          .indexOf(column) + 1, 0, newColumn);
			
      landingpageBuilderVueRef.addState(landingpageBuilderVueRef.landingpagePrefs);
			
    },
		
    removeColumn(event, index){
			
      if (event)
        event.stopPropagation();

      var self = this;
			
      return utils
        .confirm(
          'Are you sure?',
          function() {
								
            self.columns.splice(index, 1);

            landingpageBuilderVueRef.addState(landingpageBuilderVueRef.landingpagePrefs);

          }, null, 'Delete', 'Cancel');
			
			
    }
  }
});

Vue.component("style-padding", {
  props : [ 'padding', 'hideheading' ],
  template : '#stylePaddingTemplate'
});

Vue.component("style-margin", {
  props : [ 'margin' ],
  template : '#styleMarginTemplate',
  data: function() {
    return {
      dummyid: utils.uid()
    }
  },
});

Vue.component("style-background", {
  props : [ 'background' ],
  template : '#styleBackgroundTemplate',
  data: function() {
    return {
      showBgImageModal: false
    }
  },
  created: function() {
    console.log("this.background", this.background);
  },
  methods: {
		
    updateImagePosition(option, posotion){
			
      if(option['image']['position'] == posotion)
        return;
			
			 option['image']['position'] = posotion;
			 
    },
		
    updateGradientOrientation(option, orientation){
      if(option['gradient']['orientation'] == orientation)
        return;
			
			 option['gradient']['orientation'] = orientation;
			 
    },
		
  }
});

Vue.component("style-border", {
  props : [ 'border' ],
  data : function() {
    return {
      globals : builderGlobals,
      dummyid: utils.uid()
    };
  },
  template : '#styleBorderTemplate'
});
Vue.component("style-box-shadow", {
  props : [ 'boxshadow' ],
  template : '#styleBoxShadowTemplate',
  data: function() {
    return {
      dummyid: utils.uid()
    }
  },
});

Vue.component("style-video-settings", {
  props : [ 'video_options' ],
  data: function() {
    return {
      dummyid: utils.uid()
    }
  },
  template : '#styleVideoSettingsTemplate'
});

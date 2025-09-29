<template id="styleClickActionTemplate">

    <div>
    
                                <div class="form-group" >
                                        <label>Action</label>
                                        <select type="text" class="form-control eb-form-control" v-model="clickaction['type']">
                                                    <option value="none">None</option>
                                                    <option value="open_url_in_new_tab">Open URL in new tab</option>
                                                    <option value="open_url_in_same_tab">Open URL</option>
                                                    <option value="scroll_to_section">Choose a section</option>
                                                    <option value="send_an_email">Send an Email</option>
                                                    <option value="show_popup">Show Popup</option>
                                        </select>
                                                            
                                    </div>
                                    
                                    <div v-if="clickaction['type'] == 'show_popup'" class="form-group">
                                
                                            <engagebay-popup-list :popupoptions="clickaction" :popupidkey="'value'">
                                                
                                            </engagebay-popup-list>
                                                
                                    </div>
                                    
                                    <div v-if="clickaction['type']=='open_url_in_same_tab' || clickaction['type']=='open_url_in_new_tab' || clickaction['type']=='send_an_email'" 
                                        class="form-group">
                                            <label v-if="clickaction['type']=='send_an_email'">Email</label>
                                            <label v-else>URL</label> 
                                            <input class="form-control eb-form-control" v-model="clickaction['value']" />
                                        </div>
                                        
                                    <div v-if="clickaction['type']=='scroll_to_section'" class="form-group">
                                            <label>Select a Section</label> 
                                            <select type="text" class="form-control eb-form-control" v-model="clickaction['value']">
                                                    <option>--Select--</option>
                                                    <option v-for="section in getPageSection()" :value="section.id" v-html="(section.options.name) ? section.options.name : section.id"></option>
                                            </select>								
                                    </div>
    
    
    </div>
    
    </template>
<script>
export default {
  name: "styleClickAction",
  props: ['clickaction'],
  methods: {
    getPageSection: function () {
      return window.landingpageBuilderVueRef.landingpagePrefs.sections;
    },
  }
}
</script>

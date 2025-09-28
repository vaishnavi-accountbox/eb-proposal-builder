<!-- eslint-disable indent -->
<head>
    <script src="https://d2p078bqz5urf7.cloudfront.net/cloud/prod/assets/lib/tinymce/tinymce_5.2.0/tinymce.min.js"></script>
    <script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js"></script>
</head>

<template>
  <div v-if="loading">
    <div class="builder-loader">
      <div>
        <img
          src="https://d2p078bqz5urf7.cloudfront.net/cloud/dev/assets/img/loader/250-transparent-speed.gif"
          alt="Loading..."
        />
      </div>
      <div>Loading...</div>
    </div>
  </div>
  <div v-else>
    <builder ref="builder"></builder>
  </div>
</template>

<script>
// import './core.js';
import $ from "jquery";
import builder from "./components/builder.vue";
import './directive.js'
import { LANDING_PAGE_JSON, token } from "./global.js";
export default {
  name: "App",
  components: {
    builder,
  },
  data() {
    return {
      loading: true
    };
  },
  watch: {
    loading(newVal) {
      if (newVal === false) {
        this.$nextTick(() => {
          // builder is mounted now
          window.landingpageBuilderVueRef = this.$refs.builder
          console.log("✅ Builder ready:", window.landingpageBuilderVueRef)
        })
      }
    }
  },
  mounted() {
    var self = this;
    $.ajax({
      url: "http://localhost:8080" + "/api/panel/knowledgebase/settings",
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      headers: {
        Authorization: `${token}`
      },
      success: function (response) {
        if (!response) response = {};
        LANDING_PAGE_JSON = response;
        LANDING_PAGE_JSON.bodySettings = response.template_body_settings ? JSON.parse(response.template_body_settings) : getDefaultBodySetting();
        LANDING_PAGE_JSON.fontFamilies = LANDING_PAGE_JSON.bodySettings.fontFamilies || [];
        if (response.sections && response.sections.length > 0) {
          LANDING_PAGE_JSON.sections = response.sections.map(section => {
            try {
              return JSON.parse(section.builder_json_str.value);
            } catch (e) {
              return JSON.parse(section.builder_json_str);
            }
          });
        } else {
          LANDING_PAGE_JSON.sections = [];
        }
        self.loading = false;
      },
      error: function (error) {
        console.error("Error fetching settings:", error);
      }
    });
    console.log("🚀 App.vue mounted")
  }
}
</script>

<style scoped>
/* .container {
  font-family: sans-serif;
  color: #222;
} */
</style>
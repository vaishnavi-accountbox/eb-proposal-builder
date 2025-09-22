/* eslint-disable no-unused-vars */
import $ from "jquery";
import { LANDING_PAGE_JSON, resource_host } from "./global";
import { mountBuilder } from "./core";

function removeBuilder() {
  if (window.goBack)
    window.parent[window.goBack]();
}

function removeLoader() {
  if (window.remLoader)
    window.parent[window.remLoader]();
}

const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/headjs/1.0.3/head.js";
script.async = false;
script.onload = () => {
  // Put the code that should run after the script is loaded here
  console.log("head.js loaded");
  // your next lines

  window.resource_path = resource_host + "/static/js/designer/";
  window.baseUrl = resource_host || "/";

  // var resourcePath = "http://localhost:8080/static/js/designer/";
  // if (version != "localhost")
  //     var resourcePath = "ad/" + version + "/static/js/designer/";

  //   head.load(
  //     resource_path + "app.css", baseUrl + "/static/js/bundle/hcbundle.css", resource_path + "app2.css", resource_path + "commons.css",
  //     "https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css",
  //     "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
  //     "https://d2p078bqz5urf7.cloudfront.net/cloud/assets/lib/wcolpick/wcolpick.css",
  //   );
  //   head.js(
  //     "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/css/bootstrap.min.css");

  //   head.js("https://d2p078bqz5urf7.cloudfront.net/cloud/eb-builder-lib/lib/alertifyjs/alertify.js",
  //     "https://d2p078bqz5urf7.cloudfront.net/cloud/eb-builder-lib/lib/jquery-powertip/jquery.powertip.js",
  //     "https://d2p078bqz5urf7.cloudfront.net/cloud/prod/assets/lib/tinymce/tinymce_5.2.0/tinymce.min.js",
  //     "https://d2p078bqz5urf7.cloudfront.net/cloud/assets/lib/wcolpick/wcolpick.js");

  // head.js("component.js",
  //   "globals.js",
  //   "directive.js",
  //   "component.js",
  //   "style-component.js",
  //   "app.js", "util.js", "core.js", function () {

  //   });

  // head.ready(function () {
  //   // Initialize
  //   initialize();
  // });
  initialize();
};
document.body.appendChild(script);

function renderView(settings) {
  if (!settings) settings = {};
  LANDING_PAGE_JSON = settings;
  LANDING_PAGE_JSON.bodySettings = settings.template_body_settings ? JSON.parse(settings.template_body_settings) : getDefaultBodySetting();
  LANDING_PAGE_JSON.fontFamilies = LANDING_PAGE_JSON.bodySettings.fontFamilies || [];
  if (settings.sections && settings.sections.length > 0) {
    LANDING_PAGE_JSON.sections = settings.sections.map(section => {
      try {
        return JSON.parse(section.builder_json_str.value);
      } catch (e) {
        return JSON.parse(section.builder_json_str);
      }
    });
  } else {
    LANDING_PAGE_JSON.sections = [];
  }

  //   LANDING_PAGE_JSON.bodyContent = `
  // <div class="body-container"><div style="display: flex;
  //     justify-content: center;
  //     text-align: center;
  //     align-items: center;
  //     font-size: 20px;
  //     height: 400px;
  //     left: 50%;
  //     top: 40%;
  //     z-index: 999;
  //     width: 100%;">
  //         <div>
  //             <img width="100" height="100" alt="Loading..."
  //                  src="https://d2p078bqz5urf7.cloudfront.net/cloud/dev/assets/img/loader/250-transparent-speed.gif">
  //         <div>Loading...</div>
  //         </div>
        
  //     </div></div>`

  // setTimeout(function () {
  //   mountBuilder();
  // }, 200)

}

// Function to fetch KB Settings
function fetchSettings(token) {
  console.log("token", token);

  if (!token) {
    console.warn("No session token found. Skipping settings fetch.");
    return;
  }

  $.ajax({
    url: "http://localhost:8080" + "/api/panel/knowledgebase/settings",
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    headers: {
      Authorization: `${token}`
    },
    success: function (response) {
      renderView(response);
    },
    error: function (error) {
      console.error("Error fetching settings:", error);
    }
  });
}

export function initialize() {

  $("body").html(`
	
<div id="app">
    <div class="builder-loader ">
        <div>
            <img alt="Loading..."
                 src="https://d2p078bqz5urf7.cloudfront.net/cloud/dev/assets/img/loader/250-transparent-speed.gif">
        </div>
        <div>Loading...</div>
    </div>
</div>

<div class="mobile-view-notification-popup" style="display: none;">
    <div class="mobile-content">
        <div class="mobile-header">WE ARE SORRY!</div>
        <div class="mobile-body">Sorry, the builder is not supported on this device.</div>
    </div>
</div>




	
	`);

  // const hostname = window.location.hostname;
  // const pattern1 = /^.*-dot-.*-dot-accountbox-154605\.appspot\.com$/;
  // const pattern2 = /^localhost$/;

  // Determine baseUrl based on hostname pattern
  // if (pattern1.test(hostname)) {
  // 	baseUrl = "https://qa.engagebay.com";
  // } else if (pattern2.test(hostname)) {
  // 	baseUrl = "http://localhost:8080";
  // } else {
  // 	console.warn("Unrecognized hostname, setting default baseUrl to localhost");
  // 	baseUrl = "http://localhost:8080";
  // }

  // console.log("Design Hostname:", hostname);
  // console.log("Using baseUrl:", baseUrl);

  $("body").addClass("lp-builder-body");
  // if (preview) {
  //   $("body").addClass("builder-preview");
  // }

  // // Load external HTML templates
  // $("#builder-container").load("builder.html");
  // $("#content-container").load("content.html");
  // $("#content-carousel-container").load("content-carousal.html");
  // $("#style-container").load("style.html");
  // $("#style-components-container").load("style-components.html");

  fetchSettings(token);

}



// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
   var _baseChoice = "";
   var _ageChoice = "";
   var _ageName = "";
   var _agePic = "";
   var _baseName = "";
   var _basePic = "";

   var appData = Windows.Storage.ApplicationData.current;
   var roamingSettings = appData.roamingSettings;
   var Age = thinkitdrinkitDataClient.getTable("FlavorBase");

   WinJS.UI.Pages.define("/pages/login_sessions/flavor/flavor.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            WinJS.Binding.processAll(element, age_data.model);
            _ageName = roamingSettings.values["Age_name"];
            _baseName = roamingSettings.values["Base_name"];
            _agePic = roamingSettings.values["Age_pic"];
            _basePic = roamingSettings.values["Base_pic"];
            design.getFlav();
            design.changeTextColor();
            document.getElementById("age_p").textContent = "Age: " + roamingSettings.values["Age_name"];
            document.getElementById("base_p").textContent = "Base: " + roamingSettings.values["Base_name"];
            //console.log(roamingSettings.values["Base_Vend"]);
            console.log('Caloric actually flavor.js Loggedin');

            if (_ageName === "Toddler" || _ageName === "Youth") {
                document.getElementById("choosen_base").textContent = "Based on the Age You've Choosen You Must Select Non-Caloric."
            } else {
                document.getElementById("choosen_base").textContent = "Would You Like A Caloric or Non-Caloric Flavor?";
            }

            document.getElementById("age_pic").src = _agePic;
            document.getElementById("base_pic_footer").src = _basePic;
            server.flav(roamingSettings.values["Age_name"]);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.       
            remove.pop_list(age_data.model.flavor);
            remove.pop_list(age_data.model.info_page3);
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    WinJS.Namespace.define("flavor_clicked", {
        clicked: function (flavor) {
            remove.pop_list(age_data.model.info_page3);
            var updated_flavor = flavor.replace(/^\s+/, '').replace(/\s+$/, '');
            server.flav_sub(updated_flavor);
        },

        next_page_boost: function () {
            WinJS.Navigation.navigate('pages/login_sessions/flav_sel/flav_sel.html');

            roamingSettings.values["Flav_name"] = document.getElementById("the_choosen_name3").textContent;
            roamingSettings.values["Flav_pic"] = document.getElementById("choosen_flav_pic").src;
            roamingSettings.values["Flav_info"] = null;
            roamingSettings.values["Flav_price"] = null;
        }
    });
})();

// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    WinJS.UI.Pages.define("/pages/login_sessions/info_home/info_home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            server.info_home_setup();
            design.getInfoHome();
            design.changeTextColor();
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(age_data.model.info_home_flav);
            remove.pop_list(age_data.model.info_home_boost);
            remove.pop_list(age_data.model.info_home_bases);
            remove.pop_list(age_data.model.info_home_ages);
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
    WinJS.Namespace.define("want_more", {

        allProducts: function (clicked) {
            if (clicked === "The Bases:") {
                roamingSettings.values["Clicked_cat"] = "Base";
            } else if (clicked === "The Boost:") {
                roamingSettings.values["Clicked_cat"] = "Boost";
            } else if (clicked === "The Flavors:") {
                roamingSettings.values["Clicked_cat"] = "Flavor";
            }else if(clicked === "The Ages:"){
                roamingSettings.values["Clicked_cat"] = "Age";
            }
            WinJS.Navigation.navigate('pages/all_products/all_products.html');
        },
        items_info: function (clicked, sel) {
            roamingSettings.values["Item_choosen"] = clicked;
            console.log(sel);
            if (sel === "The Bases:") {
                roamingSettings.values["Clicked_cat"] = "Base";
            } else if (sel === "The Boost:") {
                roamingSettings.values["Clicked_cat"] = "Boost";
            } else if (sel === "The Flavors:") {
                roamingSettings.values["Clicked_cat"] = "Flavor";
            } else if (sel === "The Ages:") {
                roamingSettings.values["Clicked_cat"] = "Age";
            }
            WinJS.Navigation.navigate('pages/login_sessions/item_info/item_info.html');
        }

    })
})();

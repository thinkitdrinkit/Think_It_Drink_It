// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    WinJS.UI.Pages.define("/pages/supl_sport/supl_sport.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            server.sport_setup();
            design.getSport();
            design.changeTextColor();

            document.getElementById("home").removeAttribute("hidden");

            document.getElementById("company_name").textContent = roamingSettings.values["Clicked_cat"];

            remove.pop_list(age_data.model.the_boost_sel);

             roamingSettings.values["Base_name"] = "",
             roamingSettings.values["Base_pic"] = "",
             roamingSettings.values["Base_vend"] = "",
             roamingSettings.values["Base_price"] = "",
             roamingSettings.values["Age_name"] = "",
             roamingSettings.values["Age_pic"] = "",
             roamingSettings.values["Boost1_name"] = "",
             roamingSettings.values["Boost1_pic"] = "",
             roamingSettings.values["Boost1_vend"] = "",
             roamingSettings.values["Boost1_price"] = "",
             roamingSettings.values["Boost2_name"] = "",
             roamingSettings.values["Boost2_pic"] = "",
             roamingSettings.values["Boost2_vend"] = "",
             roamingSettings.values["Boost2_price"] = "",
             roamingSettings.values["Boost3_name"] = "",
             roamingSettings.values["Boost3_pic"] = "",
             roamingSettings.values["Boost3_vend"] = "",
             roamingSettings.values["Boost3_price"] = "",
             roamingSettings.values["FlavSel_name"] = "",
             roamingSettings.values["FlavSel_pic"] = "",
             roamingSettings.values["FlavSel_vend"] = "",
             roamingSettings.values["Flav_name"] = ""
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(age_data.model.info_home_sport);
        },

        updateLayout: function (element) {
            // TODO: Respond to changes in layout.
        }
    });

    WinJS.Namespace.define("show_detail", {

        items_info1: function(item) {
            roamingSettings.values["Item_choosen"] = item;
            console.log(roamingSettings.values["Item_choosen"]);
            WinJS.Navigation.navigate('pages/supl_sport_item_info/supl_sport_item_info.html');
        }
    })
})();

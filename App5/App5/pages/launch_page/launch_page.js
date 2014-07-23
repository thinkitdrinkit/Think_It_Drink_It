// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    WinJS.UI.Pages.define("/pages/launch_page/launch_page.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            design.launch();
            design.changeTextColor();
            document.getElementById("company_name").textContent = "Start Customizing";

            document.getElementById("appBar").winControl.show();
            document.getElementById("more_info_home").setAttribute("hidden", true);
            document.getElementById("shop").setAttribute("hidden", true);
            document.getElementById("home").setAttribute("hidden", true);


            //document.getElementById("more_info_home").removeAttribute("hidden");
            //document.getElementById("shop").removeAttribute("hidden");
        roamingSettings.values["Clicked_cat"] = "",
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

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />
            supl_sport
            roamingSettings.values["Base_info"] = document.getElementById("sel_base_info").textContent;
            // TODO: Respond to changes in layout.
        }

    });

    WinJS.Namespace.define("cat_clicked", {
        clicked: function () {
            //remove.pop_list(age_data.model.item_info_sport); 
            //var appData = Windows.Storage.ApplicationData.current;
            //var roamingSettings = appData.roamingSettings;
            roamingSettings.values["Clicked_cat"] = document.getElementById("supl_sport_name").textContent;
        },
        clicked2: function () {
            roamingSettings.values["Clicked_cat"] = document.getElementById("learn_more_title").textContent;
            console.log(roamingSettings.values["Clicked_cat"]);
    }
    })

})();

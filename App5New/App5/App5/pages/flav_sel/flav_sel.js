// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("Flavor");

    WinJS.UI.Pages.define("/pages/flav_sel/flav_sel.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.getFlavSel();
            design.changeTextColor();
            //the following are getting the information for the appropriate data and then changing it to numbers
            //and then storing that information inside var

            document.getElementById("flav_sel_header").textContent = "Choose Your Flavor:";

            document.getElementById("age_pic").src = roamingSettings.values["Age_pic"];
            document.getElementById("base_pic").src = roamingSettings.values["Base_pic"];
            document.getElementById("flav1_pic").src = roamingSettings.values["Flav_pic"];

            server.flav_sel(roamingSettings.values["Flav_name"]);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(age_data.model.flavor1);
            remove.pop_list(age_data.model.info_page4);
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
    var the_choosenFlav = "";
    WinJS.Namespace.define("flav_sel_clicked", {
      
        clicked: function (flav1) {

            the_choosenFlav = flav1;

            remove.pop_list(age_data.model.info_page4);

            console.log(flav1);
            server.flav_sel_sub(flav1);
        },

        next_page_boost: function () {
            WinJS.Navigation.navigate('pages/boost/boost.html')

            roamingSettings.values["FlavSel_name"] = the_choosenFlav;
            roamingSettings.values["FlavSel_pic"] = document.getElementById("hidden_flav_pic").src;
            roamingSettings.values["FlavSel_info"] = null;
            roamingSettings.values["FlavSel_price"] = null;
        }

    })

})();

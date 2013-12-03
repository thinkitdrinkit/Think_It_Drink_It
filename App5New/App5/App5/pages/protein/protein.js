// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("Base");

    WinJS.UI.Pages.define("/pages/protein/protein.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.getBase();
            design.changeTextColor();
            document.getElementById("age_pic").src = roamingSettings.values["Age_pic"];
            document.getElementById("choosen_age").textContent = "Choose Your Protein:";
            server.protein();
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(age_data.model.the_protein)
            remove.pop_list(age_data.model.protein_info)
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
    var base3 = "";
    WinJS.Namespace.define("protein_clicked", {
        clicked: function (base) {
            remove.pop_list(age_data.model.protein_info);
            base3 = base;
            server.protein_sub(base);

        },
        next_page_flavor: function () {         
                WinJS.Navigation.navigate('pages/boost/boost.html')
                roamingSettings.values["Base_name"] = base3;
                roamingSettings.values["Base_pic"] = document.getElementById("choosen_base_carry").src;
                roamingSettings.values["Base_info"] = document.getElementById("sel_base_info").textContent;
                roamingSettings.values["Base_price"] = document.getElementById("base_price").textContent;
                roamingSettings.values["Base_Vend"] = document.getElementById("p_vend").textContent;
        }
    })
})();

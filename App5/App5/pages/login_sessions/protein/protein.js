// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("Base");
    var keepInfo = true;

    WinJS.UI.Pages.define("/pages/login_sessions/protein/protein.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.getBase();
            design.changeTextColor();
            document.getElementById("age_pic").src = roamingSettings.values["Age_pic"];
            document.getElementById("choosen_age").textContent = "Choose Your Protein Flavor:";
            document.getElementById("age_p").textContent = "Age: " + roamingSettings.values["Age_name"];
            server.protein();
            console.log('Protein Loggedin');
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(age_data.model.the_protein)
            if (!keepInfo) {
                remove.pop_list(age_data.model.protein_info)
                keepInfo = true;
            }
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
            var updated_base = base.replace(/^\s+/, '').replace(/\s+$/, '');
            base3 = updated_base
            server.protein_sub(base3);

        },
        next_page_flavor: function () {
            keepInfo = false;
            WinJS.Navigation.navigate('pages/login_sessions/boost/boost.html')
                roamingSettings.values["Base_name"] = base3;
                roamingSettings.values["Base_pic"] = document.getElementById("choosen_base_carry").src;
                roamingSettings.values["Base_info"] = document.getElementById("sel_base_info").textContent;
                roamingSettings.values["Base_price"] = document.getElementById("base_price").textContent;
                roamingSettings.values["Base_Vend"] = document.getElementById("p_vend").textContent;
        },
        more_info: function (clicked) {
            keepInfo = true;
            roamingSettings.values["Item_choosen"] = clicked;
            roamingSettings.values["Clicked_cat"] = "Base"
            WinJS.Navigation.navigate('pages/login_sessions/item_info/item_info.html');
        }
    })
})();

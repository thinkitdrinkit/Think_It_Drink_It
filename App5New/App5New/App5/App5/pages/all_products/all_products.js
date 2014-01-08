// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    WinJS.UI.Pages.define("/pages/all_products/all_products.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);

            design.all_products();
            design.changeTextColor();
            server.more_info(roamingSettings.values["Clicked_cat"]);
            if (roamingSettings.values["Clicked_cat"] === "Boost") {
                document.getElementById("info_title").textContent = "This is a list of all of our " + roamingSettings.values["Clicked_cat"] + "s.";
            } else {
                document.getElementById("info_title").textContent = "This is a list of all of our " + roamingSettings.values["Clicked_cat"] + "s.";
            }
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(age_data.model.whole_cat);
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
    WinJS.Namespace.define("want_more", {

        items_info1: function (clicked) {
            roamingSettings.values["Item_choosen"] = clicked;

            WinJS.Navigation.navigate('pages/item_info/item_info.html');
        }

    })
})();

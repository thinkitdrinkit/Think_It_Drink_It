// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    WinJS.UI.Pages.define("/pages/item_info/item_info.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.item_info();
            design.changeTextColor();
            var updated_name = roamingSettings.values["Item_choosen"].replace(/^\s+/, '').replace(/\s+$/, '');
            document.getElementById("item_name").textContent = "Information on the " + updated_name + " " + roamingSettings.values["Clicked_cat"] + ".";
            server.item_info(updated_name, roamingSettings.values["Clicked_cat"]);
            //document.body.innerHTML.replace("eros", "<span id='key_word' onclick=''>Eros<span>")
            console.log(document.getElementById("item_info_info").innerHTML);
            //console.log(console.log(document.getElementById("item_info_info").textContent))   
            if (roamingSettings.values["Clicked_cat"] === "Age") {
                 document.getElementById("item_info_label").setAttribute("hidden", true);
            }
            document.onload = function () {
                console.log(document.getElementById("item_info_info").innerText.replace(/eros/g, "<span>cras</span>"));

            };
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(age_data.model.item_info);
           // console.log(document.getElementById("item_info_info").innerHTML, "Hope?");
                      
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
})();

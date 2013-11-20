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
            var query = Age.where({
                Access: 3
            }).read().done(function (results) {
                for (var i = 0; i < results.length; i++) {
                    age_data.model.the_protein.push({ b_name: results[i].Name, b_pic: results[i].Image })
                }
            }, function (err) {
                console.log(err);
            });
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
            remove.pop_list(age_data.model.protein_info)

            base3 = base;

            var query = Age.where({
                Name: base
            }).read().done(function (results) {
                age_data.model.protein_info.push({ the_name: results[0].Name, the_info: results[0].Info, the_img: results[0].Label, base_price: results[0].Price, the_pic: results[0].Image })
            }, function (err) {
                console.log(err);
            })

        },
        next_page_flavor: function () {         
                WinJS.Navigation.navigate('pages/flavor/flavor.html')
                roamingSettings.values["Base_name"] = base3;
                roamingSettings.values["Base_pic"] = document.getElementById("choosen_base_carry").src;
                roamingSettings.values["Base_info"] = document.getElementById("sel_base_info").textContent;
                roamingSettings.values["Base_price"] = document.getElementById("base_price").textContent;
        }
    })
})();

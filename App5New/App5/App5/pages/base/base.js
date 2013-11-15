// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var num = 0;
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("Base");

    WinJS.UI.Pages.define("/pages/base/base.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            WinJS.Binding.processAll(element, age_data.model);
            
            document.getElementById("choosen_age").textContent = "Choose Your Base:";

            var the_sel_age = roamingSettings.values["Age_name"];

            document.getElementById("age_pic").src = roamingSettings.values["Age_pic"];

            //sending the users choosen age to the age_data namespace and then receiving a number that will 
            //be used to access the right object on the array
            num = age_data.get_age_num(roamingSettings.values["Age_name"]);

            if (roamingSettings.values["Age_name"] === "Youth" || roamingSettings.values["Age_name"] === "Toddler") {
                var query = Age.where({
                    Access: 1
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.base.push({ b_name: results[i].Name, b_pic: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });

            } else {
                var query = Age.where({
                    Access: 2
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.base.push({ b_name: results[i].Name, b_pic: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });
            }
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.

            //using the removeInfo.js file to delete the last object of the array as long as an item exists
            remove.pop_list(age_data.model.base)
            remove.pop_list(age_data.model.info_page2)
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    var age3 = "";
    var base3 = "";
    WinJS.Namespace.define("base_clicked", {
        clicked: function (base) {
            remove.pop_list(age_data.model.info_page2)
            var age_num = 0;
            var base_num = 0;
            age3 = roamingSettings.values["Age_name"];
            base3 = base;

            if (base === "Protein") {

            } else {
                age_num = age_data.get_age_num(roamingSettings.values["Age_name"]);
                base_num = age_data.get_base_num(base);

                var query = Age.where({
                }).read().done(function (results) {
                    age_data.model.info_page2.push({the_name: results[base_num].Name, the_info: results[base_num].Info, the_img: results[base_num].Label, base_price: results[base_num].Price, the_pic: results[base_num].Image})
                }, function (err) {
                    console.log(err);
                })

            };
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

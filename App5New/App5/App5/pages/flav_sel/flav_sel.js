// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var _ageNum4 = "";
    var _baseNum4 = "";
    var _flavNum4 = "";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("Flavor");

    WinJS.UI.Pages.define("/pages/flav_sel/flav_sel.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
           
            //the following are getting the information for the appropriate data and then changing it to numbers
            //and then storing that information inside var
            _ageNum4 = age_data.get_age_num(roamingSettings.values["Age_name"]);
            _baseNum4 = age_data.get_base_num(roamingSettings.values["Base_name"]);
            _flavNum4 = age_data.get_flav_num(roamingSettings.values["Flav_name"]);

            document.getElementById("flav_sel_header").textContent = "Choose Your Flavor:";

            document.getElementById("age_pic").src = roamingSettings.values["Age_pic"];
            document.getElementById("base_pic").src = roamingSettings.values["Base_pic"];
            document.getElementById("flav1_pic").src = roamingSettings.values["Flav_pic"];

            if (roamingSettings.values["Flav_name"] === "Caloric") {
                var query = Age.where({
                    Caloric: true
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.flavor1.push({ sel_flav_name: results[i].Name + "(c)", sel_flav_pic: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });

            }else{
                var query = Age.where({
                    NonCaloric: true
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.flavor1.push({ sel_flav_name: results[i].Name, sel_flav_pic: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });
            }

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

            var the_flav_num = age_data.get_flav_sel_num(flav1);

            var query = Age.where({
            }).read().done(function (results) {
                age_data.model.info_page4.push({ sel_name: results[the_flav_num].Name, sel_info: results[the_flav_num].Info, sel_pic: results[the_flav_num].Image, sel_label: results[the_flav_num].Label })
            }, function (err) {
                console.log(err);
            })
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

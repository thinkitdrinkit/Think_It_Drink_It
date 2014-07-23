// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("Flavor");
    var keepInfo = true;

    WinJS.UI.Pages.define("/pages/login_sessions/flav_sel/flav_sel.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.getFlavSel();
            design.changeTextColor();
            console.log("Flavor actually flav_sel.js Loggedin");

            document.getElementById("age_p").textContent = "Age: " + roamingSettings.values["Age_name"];
            document.getElementById("base_p").textContent = "Base: " + roamingSettings.values["Base_name"];
           

            //the following are getting the information for the appropriate data and then changing it to numbers
            //and then storing that information inside var

            if(roamingSettings.values["Flav_name"] === "Caloric"){
                document.getElementById("flav_p").textContent = "Caloric";
                document.getElementById("cal_co").textContent = "caloric";
            } else {
                document.getElementById("flav_p").textContent = "Non-Caloric";
                document.getElementById("cal_co").textContent = "non-caloric";
            }

           // document.getElementById("flav_sel_header").textContent = "Choose Your " + roamingSettings.values["Age_name"] + " " + roamingSettings.values["Flav_name"] + " Flavor:";

            document.getElementById("age_pic").src = roamingSettings.values["Age_pic"];
            document.getElementById("base_pic_footer").src = roamingSettings.values["Base_pic"];
            document.getElementById("flav1_pic").src = roamingSettings.values["Flav_pic"];

            server.flav_sel(roamingSettings.values["Flav_name"]);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
                remove.pop_list(age_data.model.flavor1);
            
            if (!keepInfo) {
                remove.pop_list(age_data.model.info_page4);
            }
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
    var the_choosenFlav = "";
    WinJS.Namespace.define("flav_sel_clicked", {
      
        clicked: function (flav1) {
            var updated_flav1 = flav1.replace(/^\s+/, '').replace(/\s+$/, '');

            remove.pop_list(age_data.model.info_page4);
            the_choosenFlav = updated_flav1;
            server.flav_sel_sub(updated_flav1);
        },

        next_page_boost: function () {
            WinJS.Navigation.navigate('pages/login_sessions/boost/boost.html');

            roamingSettings.values["FlavSel_name"] = the_choosenFlav;
            roamingSettings.values["FlavSel_pic"] = document.getElementById("hidden_flav_pic").src;
            roamingSettings.values["FlavSel_vend"] = document.getElementById("f_vend").textContent;
            roamingSettings.values["FlavSel_info"] = null;
            roamingSettings.values["FlavSel_price"] = null;
            keepInfo = false;
        },
        more_info: function (clicked) {
            roamingSettings.values["Item_choosen"] = clicked;
            roamingSettings.values["Clicked_cat"] = "Flavor"
            WinJS.Navigation.navigate('pages/login_sessions/item_info/item_info.html');
            keepInfo = true;
        }

    })

})();

(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("Age");

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            document.getElementById("home").removeAttribute("hidden");

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
         roamingSettings.values["Flav_name"] = "",
         roamingSettings.values["creat_cust"] = "",
         roamingSettings.values["creat_last"] = "",

         roamingSettings.values["Boost4_name"] = "",
         roamingSettings.values["Boost4_pic"] = "",
         roamingSettings.values["Boost4_vend"] = "",
         roamingSettings.values["Boost4_price"] = "",

         roamingSettings.values["Boost5_name"] = "",
         roamingSettings.values["Boost5_pic"] = "",
         roamingSettings.values["Boost5_vend"] = "",
         roamingSettings.values["Boost5_price"] = "",

         roamingSettings.values["Boost6_name"] = "",
         roamingSettings.values["Boost6_pic"] = "",
         roamingSettings.values["Boost6_vend"] = "",
         roamingSettings.values["Boost6_price"] = "",

         roamingSettings.values["Boost7_name"] = "",
         roamingSettings.values["Boost7_pic"] = "",
         roamingSettings.values["Boost7_vend"] = "",
         roamingSettings.values["Boost7_price"] = "",

         roamingSettings.values["Boost8_name"] = "",
         roamingSettings.values["Boost8_pic"] = "",
         roamingSettings.values["Boost8_vend"] = "",
         roamingSettings.values["Boost8_price"] = "",

         roamingSettings.values["Boost9_name"] = "",
         roamingSettings.values["Boost9_pic"] = "",
         roamingSettings.values["Boost9_vend"] = "",
         roamingSettings.values["Boost9_price"] = ""

         remove.pop_list(age_data.model.the_boost_sel);

            remove.pop_list(age_data.model.info);
            WinJS.Binding.processAll(element, age_data.model);
            
            design.getHome();
            design.changeTextColor();
            roamingSettings.values["I_ordered"] = "no";

            document.getElementById("more_info_home").setAttribute("hidden", true);
            document.getElementById("shop").setAttribute("hidden", true);

        },
    });

    //gather the infomation from the database and displays it on the sreen
    server.home();
   
    // the following namespace will be used to complete all click events on the home.html page
    var _choosen_age = "";

    WinJS.Namespace.define('clicked_me', {
        //the clicked function will show the photo and the more indept information of the clicked age group
        //at the bottem of the home.html page
        clicked: function (me) {          
            var updated_answer = me.replace(/^\s+/, '').replace(/\s+$/, '');
            _choosen_age = updated_answer;
            //gather information from from the database as the user clicks on the diffent ages
            //and then displays that information
            server.home_sub(updated_answer);
        },
        next_page: function () {
            WinJS.Navigation.navigate('pages/base/base.html');
            var appData = Windows.Storage.ApplicationData.current;
            var roamingSettings = appData.roamingSettings;
            roamingSettings.values["Age_name"] = _choosen_age;
            roamingSettings.values["Age_pic"] = document.getElementById("sel_age_pic").src;
            roamingSettings.values["Age_info"] = null;
            roamingSettings.values["Age_price"] = null;
        },
        more_info: function (clicked) {
            var updated_answer = clicked.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Item_choosen"] = updated_answer;
            roamingSettings.values["Clicked_cat"] = "Age"
            WinJS.Navigation.navigate('pages/item_info/item_info.html');
        }
    })
    
})();

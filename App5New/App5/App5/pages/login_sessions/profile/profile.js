// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    WinJS.UI.Pages.define("/pages/login_sessions/profile/profile.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            server.login_user_past();
            design.login_home();
            design.changeTextColor();
            WinJS.Binding.processAll(element, age_data.model);
            document.getElementById("company_name").textContent = "Hello" + " " + roamingSettings.values["login_fName"];
            document.getElementById("signUp").setAttribute("hidden", true);
            document.getElementById("login").setAttribute("hidden", true);
            document.getElementById("shop").setAttribute("onclick", "WinJS.Navigation.navigate('pages/login_sessions/home/home.html')");
            document.getElementById("more_info_home").setAttribute("onclick", "WinJS.Navigation.navigate('pages/login_sessions/info_home/info_home.html')");
            document.getElementById("home").setAttribute("onclick", "WinJS.Navigation.navigate('pages/login_sessions/launch_page/launch_page.html')");
            document.getElementById("logout").removeAttribute("hidden");
            document.getElementById("profile").removeAttribute("hidden");
            document.getElementById("fullName").textContent = roamingSettings.values["login_fName"] + " " + roamingSettings.values["login_lName"];
            document.getElementById("email34").textContent = roamingSettings.values["login_email"];
            console.log(document.getElementById("previous_purchases_boost2_name").textContent);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(age_data.model.login_user_past);
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
    WinJS.Namespace.define("reorder", {

        submit: function (BasePrice, BasePic, BaseName, BaseVend, Boost1Price, Boost1Pic, Boost1Name, Boost1Vend, Boost2Price, Boost2Pic, Boost2Name, Boost2Vend, Boost3Price, Boost3Pic, Boost3Name, Boost3Vend, FlavName, FlavVend, FlavPic) {
            console.log(BasePrice.replace(/^\s+/, '').replace(/\s+$/, ''), BasePic.replace(/^\s+/, '').replace(/\s+$/, ''), BaseName.replace(/^\s+/, '').replace(/\s+$/, ''), BaseVend.replace(/^\s+/, '').replace(/\s+$/, ''), Boost1Price, Boost1Pic, Boost1Name, Boost1Vend, Boost2Price, Boost2Pic, Boost2Name, Boost2Vend, Boost3Price, Boost3Pic, Boost3Name, Boost3Vend);

            roamingSettings.values["Base_name"] = BaseName.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Base_vend"] = BaseVend.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Base_pic"] = BasePic.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Base_price"] = BasePrice.replace(/^\s+/, '').replace(/\s+$/, '');

            roamingSettings.values["flavSel_name"] = FlavVend.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["flavSel_vend"] = FlavPic.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["flavSel_pic"] = FlavName.replace(/^\s+/, '').replace(/\s+$/, '');

            roamingSettings.values["Boost1_name"] = Boost1Name.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost1_vend"] = Boost1Vend.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost1_pic"] = Boost1Pic.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost1_price"] = Boost1Price.replace(/^\s+/, '').replace(/\s+$/, '');

            roamingSettings.values["Boost2_name"] = Boost2Name.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost2_vend"] = Boost2Vend.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost2_pic"] = Boost2Pic.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost2_price"] = Boost2Price.replace(/^\s+/, '').replace(/\s+$/, '');

            roamingSettings.values["Boost3_name"] = Boost3Name.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost3_vend"] = Boost3Vend.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost3_pic"] = Boost3Pic.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost3_price"] = Boost3Price.replace(/^\s+/, '').replace(/\s+$/, '');
            
            WinJS.Navigation.navigate('pages/login_sessions/final/final.html');
        }

    })
})();

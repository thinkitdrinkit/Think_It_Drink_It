// For an introduction to the Page Control template, see the following documentation:
//MILO DOCUMENT LINK USED FOR BACK END MOBILE DEV IT IS WHAT THE APP USES 
// http://msdn.microsoft.com/en-us/library/azure/jj554207.aspx
(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    var Age = thinkitdrinkitDataClient.getTable("UserOrders");

    WinJS.UI.Pages.define("/pages/thankyou/thankyou.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            design.getThanks();
            design.changeTextColor();
            document.getElementById("thanks_h1").textContent = "Thank you, an associate will take your payment at the counter.";
            document.getElementById("thanks_h2").textContent = "Your order number is: " + (roamingSettings.values["Invoice_number"]) + ".";
            document.getElementById("no_btn").textContent = "Make a New Order";
            console.log("thankyou order#", roamingSettings.values["Invoice_number"]);

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    WinJS.Namespace.define("thanksClick", {
        clicked_yes: function () {

            //milo: I_ordered probably needs to be in a if statment, does nothing now
            roamingSettings.values["I_ordered"] === "yes";

            WinJS.Navigation.navigate('pages/signup/signup.html')
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
             roamingSettings.values["Boost4_name"] = "",
             roamingSettings.values["Boost4_pic"] = "",
             roamingSettings.values["Boost4_vend"] = "",
             roamingSettings.values["Boost4_price"] = "",
             roamingSettings.values["FlavSel_name"] = "",
             roamingSettings.values["FlavSel_pic"] = "",
             roamingSettings.values["FlavSel_vend"] = "",
             roamingSettings.values["Flav_name"] = "",
             roamingSettings.values["creat_cust"] = "",
             roamingSettings.values["creat_last"] = ""

        },
        clicked_no: function () {

            //milo: I_ordered probably needs to be in a if statment, does nothing
            roamingSettings.values["I_ordered"] === "no";

            WinJS.Navigation.navigate('pages/launch_page/launch_page.html')
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
            roamingSettings.values["Boost4_name"] = "",
            roamingSettings.values["Boost4_pic"] = "",
            roamingSettings.values["Boost4_vend"] = "",
            roamingSettings.values["Boost4_price"] = "",
            roamingSettings.values["FlavSel_name"] = "",
            roamingSettings.values["FlavSel_pic"] = "",
            roamingSettings.values["FlavSel_vend"] = "",
            roamingSettings.values["Flav_name"] = "",
            roamingSettings.values["creat_cust"] = "",
            roamingSettings.values["creat_last"] = ""
        },

    })

    function Delayer() {
        setTimeout("WinJS.Navigation.navigate('pages/launch_page/launch_page.html')", 10000);
    } Delayer()

})();

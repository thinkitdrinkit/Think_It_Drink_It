// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    var Age = thinkitdrinkitDataClient.getTable("UserOrders");

    WinJS.UI.Pages.define("/pages/login_sessions/thankyou/thankyou.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            design.getThanks();
            design.changeTextColor();
            document.getElementById("thanks_h1").textContent = "Thank you for your order " + roamingSettings.values["login_fName"] + ".";
            document.getElementById("thanks_h2").textContent = "Your order number is: " + (parseFloat(roamingSettings.values["Invoice_number"]) + 1) + ".";

            var query = Age.where({
                OrderNumber: (parseFloat(roamingSettings.values["Invoice_number"]) + 1)
            }).read().done(function (results) {
                roamingSettings.values["the_id"] = results[0].id;
            }, function (err) {
                console.log(err);
            });

            function Delayer() {
                setTimeout("WinJS.Navigation.navigate('pages/login_sessions/launch_page/launch_page.html')", 5000);
            }
            Delayer()
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
            roamingSettings.values["I_ordered"] === "yes";
            WinJS.Navigation.navigate('pages/signup/signup.html')
        },
        clicked_no: function () {
            roamingSettings.values["I_ordered"] === "no";
            WinJS.Navigation.navigate('pages/home/home.html')
        }
    })
})();

// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    WinJS.UI.Pages.define("/pages/thankyou/thankyou.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            design.getThanks();
            design.changeTextColor();
            document.getElementById("thanks_h1").textContent = "Thank you for your order.";
            document.getElementById("thanks_h2").textContent = "Your order number is: " + (parseFloat(roamingSettings.values["Invoice_number"]) + 1) + ".";
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
})();

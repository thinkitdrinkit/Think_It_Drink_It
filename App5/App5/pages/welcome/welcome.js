// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    WinJS.UI.Pages.define("/pages/welcome/welcome.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            design.getWelcome();
            design.changeTextColor();

            document.getElementById("welcome").textContent = "Thanks for becoming a member " + roamingSettings.values["Sign_first"] + ".";

            function Delayer() {
                setTimeout("WinJS.Navigation.navigate('pages/launch_page/launch_page.html')", 5000);
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

})();

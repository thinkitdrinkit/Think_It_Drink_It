// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    WinJS.UI.Pages.define("/pages/info_home/info_home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.getInfoHome();
            design.changeTextColor();
            document.getElementById("home").removeAttribute("hidden");
            document.getElementById("company_name").textContent = roamingSettings.values["Clicked_cat"];

            var webviewControl = document.getElementById("webview_learn");
            webviewControl.navigate("https://www.shoesofprey.com/content/concept.html");

            webviewControl.addEventListener("MSWebViewNavigationStarting", inner_site_browsing);
            document.getElementById("backButton").addEventListener("click", goBack, false);
            document.getElementById("forwardButton").addEventListener("click", goForward, false);

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            // TODO: Respond to changes in layout.


        }
    });



    function goForward() {
        var webviewControl = document.getElementById("webview_learn");
        if (webviewControl.canGoForward) {
            webviewControl.goForward();
        }
    }

    function goBack() {
        var webviewControl = document.getElementById("webview_learn");
        if (webviewControl.canGoBack) {
            webviewControl.goBack();
        }
    }

    function updateNavigatingState(isNavigating) {
        document.getElementById("progressRing").style.visibility = (isNavigating ? "visible" : "hidden");


        if (!isNavigating) {
            document.getElementById("backButton").disabled = !(document.getElementById("webview_learn").canGoBack);
            document.getElementById("forwardButton").disabled = !(document.getElementById("webview_learn").canGoForward);
        }
    }

    function inner_site_browsing(e) {
        var Uri = new Windows.Foundation.Uri(e.uri);
        var clicked = e.uri;
        if (Uri.rawUri != event.srcElement.textContent) {
            e.preventDefault();
        }
        else if (Uri.domain != event.srcElement.textContent) {
            e.preventDefault();
        }
        else if (Uri.host != event.srcElement.textContent) {
            e.preventDefault();
        }
    } 



})();

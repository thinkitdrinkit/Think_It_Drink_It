// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var test1 = "";

    WinJS.UI.Pages.define("/pages/supl_sport_item_info/supl_sport_item_info.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.getSport_info();
            design.changeTextColor();
            var updated_name = roamingSettings.values["Item_choosen"].replace(/^\s+/, '').replace(/\s+$/, '');
            document.getElementById("item_name").textContent = "Information on " + updated_name + ".";
            server.sport_info(updated_name);


            //$("#main_footer").hide();



            //document.getElementById("link_webview").textContent = updated_name;
           
            document.onload = function () {
                
               // console.log(document.getElementById("sport_info_info").innerText.replace(/eros/g, "<span>cras</span>"));
                if (document.getElementById("sport_info_info2").textContent === "") {
                    document.getElementById("sport_info_info2").setAttribute("hidden", true)
                }
                if (document.getElementById("sport_info_info3").textContent === "") {
                    document.getElementById("sport_info_info3").setAttribute("hidden", true)
                }
                function test() {
                    document.getElementById("sport_info_info").style.color = "blue";
                };
                test1 = test();
            };
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.

            //milo:this helps with reapeating duplicates
            remove.pop_list(age_data.model.item_info_sport);

        },

        updateLayout: function (element) {
            // TODO: Respond to changes in layout.
        }
    });


    WinJS.Namespace.define("webview_clicked", {

        clicked1: function () {
            //var updated_name = roamingSettings.values["Item_choosen"].replace(/^\s+/, '').replace(/\s+$/, '');
            if (age_data.model.item_info_sport.length > 0) {
                document.getElementById("webview2").setAttribute("hidden", true);
                document.getElementById("webview3").setAttribute("hidden", true);

                document.getElementById("webview").removeAttribute("hidden");
                document.getElementById("webview").navigate(event.srcElement.textContent);
                document.getElementById("webview").addEventListener("MSWebViewNavigationStarting", inner_site_browsing);
            } 
        },

        clicked2: function () {
            //var updated_name = roamingSettings.values["Item_choosen"].replace(/^\s+/, '').replace(/\s+$/, '');
            if (age_data.model.item_info_sport.length > 0) {
                document.getElementById("webview").setAttribute("hidden", true);
                document.getElementById("webview3").setAttribute("hidden", true);

                document.getElementById("webview2").removeAttribute("hidden");
                document.getElementById("webview2").navigate(event.srcElement.textContent);
                document.getElementById("webview2").addEventListener("MSWebViewNavigationStarting", inner_site_browsing);
            }
        },

        clicked3: function () {
            //var updated_name = roamingSettings.values["Item_choosen"].replace(/^\s+/, '').replace(/\s+$/, '');
            if (age_data.model.item_info_sport.length > 0) {
                document.getElementById("webview2").setAttribute("hidden", true);
                document.getElementById("webview").setAttribute("hidden", true);

                document.getElementById("webview3").removeAttribute("hidden");
                document.getElementById("webview3").navigate(event.srcElement.textContent);
                document.getElementById("webview3").addEventListener("MSWebViewNavigationStarting", inner_site_browsing);
            } 
        }

    });

    function inner_site_browsing(e) {
        var Uri = new Windows.Foundation.Uri(e.uri);
        if (Uri.domain != event.srcElement.textContent) {
            e.preventDefault();
        }
    }

    //setTimeout(test1, 5000)
})();

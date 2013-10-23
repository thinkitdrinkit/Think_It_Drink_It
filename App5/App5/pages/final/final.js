// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/final/final.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            document.getElementById("age_pic").src = get_set.set_age("pic");
            document.getElementById("base_pic").src = get_set.set_base("pic");
            document.getElementById("flav1_pic").src = get_set.set_flav("pic");
            document.getElementById("flav2_pic").src = get_set.set_sel_flav("pic");
            document.getElementById("boost_pic1").src = get_set.set_boost1("pic");

            if (get_set.set_boost2("name") != "") {
                document.getElementById("boost_pic2").src = get_set.set_boost2("pic");
                document.getElementById("boost_pic2").removeAttribute("hidden");
            }

            if (get_set.set_boost3("name") != "") {
                document.getElementById("boost_pic3").src = get_set.set_boost3("pic");
                document.getElementById("boost_pic3").removeAttribute("hidden");
            }

         
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            get_set.get_boost2("", "", null, get_set.set_boost2("price"));
            //document.getElementById("boost_pic2").setAttribute("hidden", true);
            get_set.get_boost3("", "", null, get_set.set_boost3("price"));
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
})();

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

            document.getElementById("my_base_img").src = get_set.set_base("pic");
            document.getElementById("my_flav_img").src = get_set.set_sel_flav("pic");
            document.getElementById("my_boost1_img").src = get_set.set_boost1("pic");

            document.getElementById("my_base_name").textContent ="Base: " +  get_set.set_base("name");
            document.getElementById("my_flav_name").textContent = "Flavor: " + get_set.set_sel_flav("name");
            document.getElementById("my_boost1_name").textContent = "Boost: " + get_set.set_boost1("name");

            document.getElementById("base_price").value = "$" + get_set.set_base("price");
            document.getElementById("boost_price1").value = "$" + get_set.set_boost1("price");
            document.getElementById("total").value = "$" + (parseFloat(get_set.set_base("price")) + parseFloat(get_set.set_boost1("price")));

            if (get_set.set_boost2("name") != "") {
                document.getElementById("boost_pic2").src = get_set.set_boost2("pic");
                document.getElementById("my_boost2_img").src = get_set.set_boost2("pic");
                document.getElementById("my_boost2_name").textContent = "Boost: " + get_set.set_boost2("name");

                document.getElementById("boost_price2").value = "$" + get_set.set_boost2("price") ;
                document.getElementById("total").value = "$" + (parseFloat(get_set.set_base("price")) + parseFloat(get_set.set_boost1("price")) + parseFloat(get_set.set_boost2("price")));

                document.getElementById("price2_boost").removeAttribute("hidden");
                document.getElementById("boost_price2").removeAttribute("hidden");
                document.getElementById("my_boost2").removeAttribute("hidden");
                document.getElementById("boost_pic2").removeAttribute("hidden");
            }

            if (get_set.set_boost3("name") != "") {
                document.getElementById("boost_pic3").src = get_set.set_boost3("pic");
                document.getElementById("my_boost3_img").src = get_set.set_boost3("pic");
                document.getElementById("my_boost3_name").textContent = "Boost: " + get_set.set_boost3("name");

                document.getElementById("boost_price3").value = "$" + get_set.set_boost3("price");
                document.getElementById("total").value = "$" + (parseFloat(get_set.set_base("price")) + parseFloat(get_set.set_boost1("price")) + parseFloat(get_set.set_boost2("price")) + parseFloat(get_set.set_boost3("price")));

                document.getElementById("boost_price3").removeAttribute("hidden");
                document.getElementById("price3_boost").removeAttribute("hidden");

                document.getElementById("my_boost3").removeAttribute("hidden");
                document.getElementById("boost_pic3").removeAttribute("hidden");
                var the_added = parseFloat(get_set.set_boost3("price")) + parseFloat(get_set.set_boost2("price")) + parseFloat(get_set.set_boost1("price")) + parseFloat(get_set.set_base("price"));
            }

         
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            get_set.get_boost2("", "", null, get_set.set_boost2("price"));

            get_set.get_boost3("", "", null, get_set.set_boost3("price"));
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
})();

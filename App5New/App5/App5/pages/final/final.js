// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;


    WinJS.UI.Pages.define("/pages/final/final.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
          /*document.getElementById("age_pic").src = get_set.set_age("pic");
            document.getElementById("base_pic").src = get_set.set_base("pic");
            document.getElementById("flav1_pic").src = get_set.set_flav("pic");
            document.getElementById("flav2_pic").src = get_set.set_sel_flav("pic");
            document.getElementById("boost_pic1").src = get_set.set_boost1("pic");*/

            document.getElementById("price_base").textContent = roamingSettings.values["Base_name"] + " base price:";
            document.getElementById("price1_boost").textContent = roamingSettings.values["Boost1_name"] + " boost price:";

            document.getElementById("my_base_img").src = roamingSettings.values["Base_pic"];
            document.getElementById("my_flav_img").src = roamingSettings.values["flavSel_pic"];
            document.getElementById("my_boost1_img").src = roamingSettings.values["Boost1_pic"];

            document.getElementById("my_base_name").textContent = "Base: " + roamingSettings.values["Base_name"];
            document.getElementById("my_flav_name").textContent = "Flavor: " + roamingSettings.values["flavSel_name"];
            document.getElementById("my_boost1_name").textContent = "Boost: " + roamingSettings.values["Boost1_name"];

            document.getElementById("base_price").textContent = "$" + roamingSettings.values["Base_price"];
            document.getElementById("boost_price1").textContent = "$" + roamingSettings.values["Boost1_price"];
            document.getElementById("total").textContent = "$" + (parseFloat(roamingSettings.values["Base_price"]) + parseFloat(roamingSettings.values["Boost1_price"]));

            if (roamingSettings.values["Boost2_name"] != "") {
               // document.getElementById("boost_pic2").src = get_set.set_boost2("pic");
                document.getElementById("my_boost2_img").src = roamingSettings.values["Boost2_pic"];
                document.getElementById("my_boost2_name").textContent = "Boost: " + roamingSettings.values["Boost2_name"];
                document.getElementById("price2_boost").textContent = roamingSettings.values["Boost2_name"] + " boost price:";

                document.getElementById("boost_price2").textContent = "$" + roamingSettings.values["Boost2_price"];
                document.getElementById("total").textContent = "$" + (parseFloat(roamingSettings.values["Base_price"]) + parseFloat(roamingSettings.values["Boost1_price"]) + parseFloat(roamingSettings.values["Boost2_price"]));

                document.getElementById("price2_boost").removeAttribute("hidden");
                document.getElementById("boost_price2").removeAttribute("hidden");
                document.getElementById("my_boost2").removeAttribute("hidden");
               // document.getElementById("boost_pic2").removeAttribute("hidden");
            }

            if (roamingSettings.values["Boost3_name"] != "") {
               // document.getElementById("boost_pic3").src = get_set.set_boost3("pic");
                document.getElementById("my_boost3_img").src = roamingSettings.values["Boost3_pic"];
                document.getElementById("my_boost3_name").textContent = "Boost: " + roamingSettings.values["Boost3_name"];
                document.getElementById("price3_boost").textContent = roamingSettings.values["Boost3_name"] + " boost price:";

                document.getElementById("boost_price3").textContent = "$" + roamingSettings.values["Boost3_price"];
                document.getElementById("total").textContent = "$" + (parseFloat(roamingSettings.values["Base_price"]) + parseFloat(roamingSettings.values["Boost1_price"]) + parseFloat(roamingSettings.values["Boost2_price"]) + parseFloat(roamingSettings.values["Boost3_price"]));

                document.getElementById("boost_price3").removeAttribute("hidden");
                document.getElementById("price3_boost").removeAttribute("hidden");

                document.getElementById("my_boost3").removeAttribute("hidden");
              //  document.getElementById("boost_pic3").removeAttribute("hidden");
                var the_added = parseFloat(roamingSettings.values["Boost3_price"]) + parseFloat(roamingSettings.values["Boost2_price"]) + parseFloat(roamingSettings.values["Boost1_price"]) + parseFloat(roamingSettings.values["Base_price"]);
            }
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.

            roamingSettings.values["Boost2_name"] = "";
            roamingSettings.values["Boost2_pic"] = null;
            roamingSettings.values["Boost2_info"] = null;
            roamingSettings.values["Boost2_price"] = null;

            roamingSettings.values["Boost3_name"] = "";
            roamingSettings.values["Boost3_pic"] = null;
            roamingSettings.values["Boost3_info"] = null;
            roamingSettings.values["Boost3_price"] = null;
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
    WinJS.Namespace.define("FinalClick", {

        clicked: function () {
            WinJS.Navigation.back(5)
            //Windows.print(false);
            window.print(false);
        }
    })

    function insert(item, user, request) {
        function insert(item, user, request) {
            var queryString = "INSERT INTO Map (ZoomLevel, MapType, Center, RouteName, RouteType, FunRating, DifficultyRating, Comments, Route) VALUES (?, ?, geography::STPointFromText('POINT(' + ? + ' ' + ? + ')', 4326), ?, ?, ?, ?, ?, geography::STGeomFromText('LINESTRING(' + ? + ')', 4326)) ";
            mssql.query(queryString, [item.zoomLevel, item.mapType, item.longitude.toString(), item.latitude.toString(), item.routeName, item.routeType, item.funRating, item.difficultyRating, item.comments, item.route], {
                success: function () {
                    request.respond(statusCodes.OK, item);
                },
                error: function (err) {
                    console.error("Error inserting:", item, err);
                    request.respond(statusCodes.OK);
                }
            });
        }
    }

})();

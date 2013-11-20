﻿// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    //"use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("UserOrders");


    WinJS.UI.Pages.define("/pages/final/final.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            design.getFinal();
            design.changeTextColor();
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
            var query = Age.where({
            }).read().done(function (results) {
              var r = parseFloat(results.length) + (Math.floor((Math.random() * 100) + 1));

                function my_curr_date() {
                    var currentDate = new Date()
                    var day = currentDate.getDate();
                    var month = currentDate.getMonth() + 1;
                    var year = currentDate.getFullYear();
                    var my_date = month + "-" + day + "-" + year;
                    return my_date;

                }
                function my_curr_time() {
                    var d = new Date(); 
                   var theHour = d.getHours(); 
                    d.getMinutes(); 
                    d.getSeconds(); 
                    var mid = "am";
                    if (theHour > 12) {
                        mid = "pm";
                        theHour -= 12;
                    }else if(theHour == 12){
                        mid = "pm";
                    } else if (theHour == 0) {
                        theHour = 12;
                    }
                    var theTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + mid;
                    return theTime;
                }
               
                if (roamingSettings.values["Boost2_name"] != "" && roamingSettings.values["Boost3_name"] === "") {
                    if (document.getElementById("first_name").value === "") {
                        Age.insert({
                            Name: "Guest",
                            Base: roamingSettings.values["Base_name"],
                            Age: roamingSettings.values["Age_name"],
                            Boost1: roamingSettings.values["Boost1_name"],
                            Boost2: roamingSettings.values["Boost2_name"],
                            TotalPrice: document.getElementById("total").textContent,
                            OrderNumber: r,
                            PurchaseDate: my_curr_date(),
                            TimePurchase: my_curr_time()
                        }).done(function (result) {
                            WinJS.Navigation.back(5);
                        }), function (err) {
                            console.log(err);
                        }
                    } else {
                        Age.insert({
                            Name: document.getElementById("first_name").value + " " + document.getElementById("last_name").value,
                            Base: roamingSettings.values["Base_name"],
                            Age: roamingSettings.values["Age_name"],
                            Boost1: roamingSettings.values["Boost1_name"],
                            Boost2: roamingSettings.values["Boost2_name"],
                            TotalPrice: document.getElementById("total").textContent,
                            OrderNumber: r,
                            PurchaseDate: my_curr_date(),
                            TimePurchase: my_curr_time()
                        }).done(function (result) {
                            WinJS.Navigation.back(5);
                        }), function (err) {
                            console.log(err);
                        }
                    }
                } else if (roamingSettings.values["Boost3_name"] != "") {
                    if (document.getElementById("first_name").value === "") {

                        Age.insert({
                            Name: "Guest",
                            Base: roamingSettings.values["Base_name"],
                            Age: roamingSettings.values["Age_name"],
                            Boost1: roamingSettings.values["Boost1_name"],
                            Boost2: roamingSettings.values["Boost2_name"],
                            Boost3: roamingSettings.values["Boost3_name"],
                            TotalPrice: document.getElementById("total").textContent,
                            PurchaseDate: my_curr_date(),
                            OrderNumber: r,
                            TimePurchase: my_curr_time()
                        }).done(function (result) {
                            WinJS.Navigation.back(5);
                            //window.print(false);
                        }), function (err) {
                            console.log(err);
                        }
                    } else {
                        Age.insert({
                            Name: document.getElementById("first_name").value + " " + document.getElementById("last_name").value,
                            Base: roamingSettings.values["Base_name"],
                            Age: roamingSettings.values["Age_name"],
                            Boost1: roamingSettings.values["Boost1_name"],
                            Boost2: roamingSettings.values["Boost2_name"],
                            Boost3: roamingSettings.values["Boost3_name"],
                            TotalPrice: document.getElementById("total").textContent,
                            OrderNumber: r,
                            PurchaseDate: my_curr_date(),
                            TimePurchase: my_curr_time()
                        }).done(function (result) {
                            WinJS.Navigation.back(5);
                           // window.print(false);
                        }), function (err) {
                            console.log(err);
                        }
                    }
                } else {
                    if (document.getElementById("first_name").value === "") {
                        Age.insert({
                            Name: "Guest",
                            Base: roamingSettings.values["Base_name"],
                            Age: roamingSettings.values["Age_name"],
                            Boost1: roamingSettings.values["Boost1_name"],
                            TotalPrice: document.getElementById("total").textContent,
                            OrderNumber: r,
                            PurchaseDate: my_curr_date(),
                            TimePurchase: my_curr_time()
                        }).done(function (result) {
                            WinJS.Navigation.back(5);
                        }), function (err) {
                            console.log(err);
                        }
                    } else {
                        Age.insert({
                            Name: document.getElementById("first_name").value + " " + document.getElementById("last_name").value,
                            Base: roamingSettings.values["Base_name"],
                            Age: roamingSettings.values["Age_name"],
                            Boost1: roamingSettings.values["Boost1_name"],
                            TotalPrice: document.getElementById("total").textContent,
                            OrderNumber: r,
                            PurchaseDate: my_curr_date(),
                            TimePurchase: my_curr_time()
                        }).done(function (result) {
                            WinJS.Navigation.back(5);
                            //window.print(false);
                        }), function (err) {
                            console.log(err);
                        }
                    }
                }
            }, function (err) {
                console.log(err);
            });
        }
    })

})();
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    //"use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("UserOrders");

    WinJS.UI.Pages.define("/pages/login_sessions/final/final.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            design.getFinal();
            design.changeTextColor();

            var theNew = roamingSettings.values["Base_Vend"];


            console.log(roamingSettings.values["Base_vend"], roamingSettings.values["Boost1_vend"], roamingSettings.values["Boost3_vend"], roamingSettings.values["Boost2_vend"], roamingSettings.values["FlavSel_vend"]);
            document.getElementById("price_base").textContent = roamingSettings.values["Base_name"] + " base price:";
            document.getElementById("price1_boost").textContent = roamingSettings.values["Boost1_name"] + " boost price:";

            if (roamingSettings.values["Base_protein"] === true) {
                document.getElementById("my_flav").setAttribute("hidden", true);
                document.getElementById("the_name").style.marginTop = "160px";
            }

            document.getElementById("my_base_img").src = roamingSettings.values["Base_pic"];
            document.getElementById("my_flav_img").src = roamingSettings.values["flavSel_pic"];
            document.getElementById("my_boost1_img").src = roamingSettings.values["Boost1_pic"];

            document.getElementById("my_base_name").textContent = "Base: " + roamingSettings.values["Base_name"];
            document.getElementById("my_flav_name").textContent = "Flavor: " + roamingSettings.values["flavSel_name"];
            document.getElementById("my_boost1_name").textContent = "Boost: " + roamingSettings.values["Boost1_name"];

            document.getElementById("base_price").textContent = "$" + roamingSettings.values["Base_price"];
            document.getElementById("boost_price1").textContent = "$" + roamingSettings.values["Boost1_price"];
          

            document.getElementById("product_total").textContent = "$" + (parseFloat(roamingSettings.values["Base_price"]) + parseFloat(roamingSettings.values["Boost1_price"]));
            document.getElementById("tax").textContent = "$" + Math.ceil(((parseFloat(roamingSettings.values["Base_price"]) + parseFloat(roamingSettings.values["Boost1_price"])) * .0636) * 100) / 100;

            roamingSettings.values["total_price"] = parseFloat(roamingSettings.values["Base_price"]) + parseFloat(roamingSettings.values["Boost1_price"]);
            document.getElementById("total").textContent = "$" + Math.ceil(((roamingSettings.values["total_price"] * .0636) + roamingSettings.values["total_price"]) * 100) / 100;

            if (roamingSettings.values["Boost2_name"] != "") {
                // document.getElementById("boost_pic2").src = get_set.set_boost2("pic");
                document.getElementById("my_boost2_img").src = roamingSettings.values["Boost2_pic"];
                document.getElementById("my_boost2_name").textContent = "Boost: " + roamingSettings.values["Boost2_name"];
                document.getElementById("price2_boost").textContent = roamingSettings.values["Boost2_name"] + " boost price:";

                document.getElementById("boost_price2").textContent = "$" + roamingSettings.values["Boost2_price"];
             
                document.getElementById("price2_boost").removeAttribute("hidden");
                document.getElementById("boost_price2").removeAttribute("hidden");
                document.getElementById("my_boost2").removeAttribute("hidden");

                document.getElementById("total").textContent = "$" + Math.ceil(((roamingSettings.values["total_price"] * .0636) + roamingSettings.values["total_price"]) * 100) / 100;
                roamingSettings.values["total_price"] = parseFloat(roamingSettings.values["Base_price"]) + parseFloat(roamingSettings.values["Boost1_price"]) + parseFloat(roamingSettings.values["Boost2_price"]);
                document.getElementById("product_total").textContent = "$" + roamingSettings.values["total_price"];
                document.getElementById("tax").textContent = "$" + Math.ceil((roamingSettings.values["total_price"] * .0636) * 100) / 100;
            }

            if (roamingSettings.values["Boost3_name"] != "") {

                document.getElementById("my_boost3_img").src = roamingSettings.values["Boost3_pic"];
                document.getElementById("my_boost3_name").textContent = "Boost: " + roamingSettings.values["Boost3_name"];
                document.getElementById("price3_boost").textContent = roamingSettings.values["Boost3_name"] + " boost price:";

                document.getElementById("boost_price3").textContent = "$" + roamingSettings.values["Boost3_price"];
               
                document.getElementById("boost_price3").removeAttribute("hidden");
                document.getElementById("price3_boost").removeAttribute("hidden");
                document.getElementById("my_boost3").removeAttribute("hidden");
                //  document.getElementById("boost_pic3").removeAttribute("hidden");
                var the_added = parseFloat(roamingSettings.values["Boost3_price"]) + parseFloat(roamingSettings.values["Boost2_price"]) + parseFloat(roamingSettings.values["Boost1_price"]) + parseFloat(roamingSettings.values["Base_price"]);

                roamingSettings.values["total_price"] = parseFloat(roamingSettings.values["Base_price"]) + parseFloat(roamingSettings.values["Boost1_price"]) + parseFloat(roamingSettings.values["Boost2_price"]) + parseFloat(roamingSettings.values["Boost3_price"]);
                document.getElementById("product_total").textContent = "$" + roamingSettings.values["total_price"];
                document.getElementById("tax").textContent = "$" + Math.ceil((roamingSettings.values["total_price"] * .0636) * 100) / 100;
                document.getElementById("total").textContent = "$" + Math.ceil(((roamingSettings.values["total_price"] * .0636) + roamingSettings.values["total_price"]) * 100) / 100;
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
            roamingSettings.values["I_ordered"] = "yes";
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    //storing the invoice number that is being created by the vend whenever a user hits the submit btn

    WinJS.Namespace.define("FinalClick", {

        clicked: function () {

            // Always catch network exceptions for async methods

            function onError(reason) {
                // Details in reason.Message and ex.HResult.       
            }


            var query = Age.where({
            }).read().done(function (results) {

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
                    } else if (theHour == 12) {
                        mid = "pm";
                    } else if (theHour == 0) {
                        theHour = 12;
                    }
                    var theTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + mid;
                    return theTime;
                }

                if (roamingSettings.values["Boost2_name"] != "" && roamingSettings.values["Boost3_name"] === "") {
                    if (roamingSettings.values["Base_protein"] === true) {
                        WinJS.xhr({
                            type: "POST",
                            url: "http://thinkitdrinkit.vendhq.com/api/register_sales",
                            headers: { "Content-type": "application/json" },
                            password: "agave2013",
                            data: JSON.stringify({
                                "register_id": "5ecccd41-3cbc-11e3-a29a-bc305bf5da20",
                                "user_name": "",
                                "customer_id": roamingSettings.values["login_vID"],
                                "status": "SAVED",
                                "total_price": roamingSettings.values["total_price"],
                                "total_tax": (roamingSettings.values["total_price"] * .0636),
                                "note": "New Order",
                                "register_sale_products": [
                                   {
                                       "product_id": roamingSettings.values["Base_vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Base_price"],
                                       "tax": (roamingSettings.values["Base_price"] * .0636)
                                   },
                                   {
                                       "product_id": roamingSettings.values["Boost1_vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Boost1_price"],
                                       "tax": (roamingSettings.values["Boost1_price"] * .0636)
                                   },
                                   {
                                       "product_id": roamingSettings.values["Boost2_vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Boost2_price"],
                                       "tax": (roamingSettings.values["Boost2_price"] * .0636)
                                   }
                                ]
                            }),
                        }).then(function sucess(res) {
                            roamingSettings.values["Invoice_number"] = JSON.parse(res.responseText).register_sale.invoice_number;
                            console.log(roamingSettings.values["Invoice_number"]);
                            roamingSettings.values["I_ordered"] = "yes";
                        }, function error(err) {
                            console.log("fail", err.responseText)
                        });
                    } else {
                        WinJS.xhr({
                            type: "POST",
                            url: "http://thinkitdrinkit.vendhq.com/api/register_sales",
                            headers: { "Content-type": "application/json" },
                            password: "agave2013",
                            data: JSON.stringify({
                                "register_id": "5ecccd41-3cbc-11e3-a29a-bc305bf5da20",
                                "user_name": "test",
                                "customer_id": roamingSettings.values["login_vID"],
                                "status": "SAVED",
                                "total_price": roamingSettings.values["total_price"],
                                "total_tax": (roamingSettings.values["total_price"] * .0636),
                                "note": "New Order",
                                "register_sale_products": [
                                   {
                                       "product_id": roamingSettings.values["Base_Vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Base_price"],
                                       "tax": (roamingSettings.values["Base_price"] * .0636)
                                   },
                                   {
                                       "product_id": roamingSettings.values["FlavSel_vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["FlavSel_price"],
                                       "tax": (roamingSettings.values["FlavSel_price"] * .0636)
                                   },
                                   {
                                       "product_id": roamingSettings.values["Boost1_vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Boost1_price"],
                                       "tax": (roamingSettings.values["Boost1_price"] * .0636)
                                   },
                                   {
                                       "product_id": roamingSettings.values["Boost2_vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Boost2_price"],
                                       "tax": (roamingSettings.values["Boost2_price"] * .0636)
                                   }
                                ]
                            }),
                        }).then(function sucess(res) {
                            roamingSettings.values["Invoice_number"] = JSON.parse(res.responseText).register_sale.invoice_number;
                            console.log(roamingSettings.values["Invoice_number"]);
                            roamingSettings.values["I_ordered"] = "yes";
                        }, function error(err) {
                            console.log("fail", err.responseText)
                        });
                    }

                    Age.insert({
                        Name: roamingSettings.values["login_fName"] + " " + roamingSettings.values["login_lName"],
                        Base: roamingSettings.values["Base_name"],
                        BaseImage: roamingSettings.values["Base_pic"],
                        BaseID: roamingSettings.values["Base_vend"],
                        BasePrice: roamingSettings.values["Base_price"],
                        Age: roamingSettings.values["Age_name"],
                        AgeImage: roamingSettings.values["Age_pic"],
                        Boost1: roamingSettings.values["Boost1_name"],
                        Boost1Image: roamingSettings.values["Boost1_pic"],
                        Boost1ID: roamingSettings.values["Boost1_vend"],
                        Boost1Price: roamingSettings.values["Boost1_price"],
                        Boost2: roamingSettings.values["Boost2_name"],
                        Boost2Image: roamingSettings.values["Boost2_pic"],
                        Boost2ID: roamingSettings.values["Boost2_vend"],
                        Boost2Price: roamingSettings.values["Boost2_price"],
                        FlavName: roamingSettings.values["FlavSel_name"],
                        FlavImage: roamingSettings.values["FlavSel_pic"],
                        FlavID: roamingSettings.values["FlavSel_vend"],
                        Caloric: roamingSettings.values["Flav_name"],
                        TotalPrice: document.getElementById("total").textContent,
                        OrderNumber: (parseFloat(roamingSettings.values["Invoice_number"]) + 1),
                        VendID: roamingSettings.values["login_vcode"],
                        PurchaseDate: my_curr_date(),
                        TimePurchase: my_curr_time()
                    }).done(function (result) {
                        WinJS.Navigation.navigate('pages/login_sessions/thankyou/thankyou.html');
                    }), function (err) {
                        console.log(err);
                    }
                } else if (roamingSettings.values["Boost3_name"] != "") {
                    if (roamingSettings.values["Base_protein"] === true) {
                        WinJS.xhr({
                            type: "POST",
                            url: "http://thinkitdrinkit.vendhq.com/api/register_sales",
                            headers: { "Content-type": "application/json" },
                            password: "agave2013",
                            data: JSON.stringify({
                                "register_id": "5ecccd41-3cbc-11e3-a29a-bc305bf5da20",
                                "user_name": "test",
                                "customer_id": roamingSettings.values["login_vID"],
                                "status": "SAVED",
                                "total_price": roamingSettings.values["total_price"],
                                "total_tax": (roamingSettings.values["total_price"] * .0636),
                                "note": "New Order",
                                "register_sale_products": [
                                   {
                                       "product_id": roamingSettings.values["Base_Vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Base_price"],
                                       "tax": (roamingSettings.values["Base_price"] * .0636)
                                   },
                                   {
                                       "product_id": roamingSettings.values["Boost1_vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Boost1_price"],
                                       "tax": (roamingSettings.values["Boost1_price"] * .0636)
                                   },
                                   {
                                       "product_id": roamingSettings.values["Boost2_vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Boost2_price"],
                                       "tax": (roamingSettings.values["Boost2_price"] * .0636)
                                   },
                                   {
                                       "product_id": roamingSettings.values["Boost3_vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Boost3_price"],
                                       "tax": (roamingSettings.values["Boost3_price"] * .0636)
                                   }
                                ]
                            }),
                        }).then(function sucess(res) {
                            roamingSettings.values["Invoice_number"] = JSON.parse(res.responseText).register_sale.invoice_number;
                            roamingSettings.values["I_ordered"] = "yes";
                        }, function error(err) {
                            console.log("fail", err.responseText)
                        });
                    } else {
                        WinJS.xhr({
                            type: "POST",
                            url: "http://thinkitdrinkit.vendhq.com/api/register_sales",
                            headers: { "Content-type": "application/json" },
                            password: "agave2013",
                            data: JSON.stringify({
                                "register_id": "5ecccd41-3cbc-11e3-a29a-bc305bf5da20",
                                "user_name": "test",
                                "customer_id": roamingSettings.values["login_vID"],
                                "status": "SAVED",
                                "total_price": roamingSettings.values["total_price"],
                                "total_tax": (roamingSettings.values["total_price"] * .0636),
                                "note": "New Order",
                                "register_sale_products": [
                                   {
                                       "product_id": roamingSettings.values["Base_Vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Base_price"],
                                       "tax": (roamingSettings.values["Base_price"] * .0636)
                                   },
                                   {
                                       "product_id": roamingSettings.values["FlavSel_vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["FlavSel_price"],
                                       "tax": (roamingSettings.values["FlavSel_price"] * .0636)
                                   },
                                   {
                                       "product_id": roamingSettings.values["Boost1_vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Boost1_price"],
                                       "tax": (roamingSettings.values["Boost1_price"] * .0636)
                                   },
                                   {
                                       "product_id": roamingSettings.values["Boost2_vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Boost2_price"],
                                       "tax": (roamingSettings.values["Boost2_price"] * .0636)
                                   },
                                   {
                                       "product_id": roamingSettings.values["Boost3_vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Boost3_price"],
                                       "tax": (roamingSettings.values["Boost3_price"] * .0636)
                                   }
                                ]
                            }),
                        }).then(function sucess(res) {
                            roamingSettings.values["Invoice_number"] = JSON.parse(res.responseText).register_sale.invoice_number;
                            console.log(roamingSettings.values["Invoice_number"]);
                            roamingSettings.values["I_ordered"] = "yes";
                        }, function error(err) {
                            console.log("fail", err.responseText)
                        });
                    }

                    Age.insert({
                        Name: roamingSettings.values["login_fName"] + " " + roamingSettings.values["login_lName"],
                        Base: roamingSettings.values["Base_name"],
                        BaseImage: roamingSettings.values["Base_pic"],
                        BaseID: roamingSettings.values["Base_vend"],
                        BasePrice: roamingSettings.values["Base_price"],
                        Age: roamingSettings.values["Age_name"],
                        AgeImage: roamingSettings.values["Age_pic"],
                        Boost1: roamingSettings.values["Boost1_name"],
                        Boost1Image: roamingSettings.values["Boost1_pic"],
                        Boost1ID: roamingSettings.values["Boost1_vend"],
                        Boost1Price: roamingSettings.values["Boost1_price"],
                        Boost2: roamingSettings.values["Boost2_name"],
                        Boost2Image: roamingSettings.values["Boost2_pic"],
                        Boost2ID: roamingSettings.values["Boost2_vend"],
                        Boost2Price: roamingSettings.values["Boost2_price"],
                        Boost3: roamingSettings.values["Boost3_name"],
                        Boost3Image: roamingSettings.values["Boost3_pic"],
                        FlavName: roamingSettings.values["FlavSel_name"],
                        FlavImage: roamingSettings.values["FlavSel_pic"],
                        FlavID: roamingSettings.values["FlavSel_vend"],
                        Caloric: roamingSettings.values["Flav_name"],
                        Boost3ID: roamingSettings.values["Boost3_vend"],
                        Boost3Price: roamingSettings.values["Boost3_price"],
                        VendID: roamingSettings.values["login_vcode"],
                        TotalPrice: document.getElementById("total").textContent,
                        OrderNumber: (parseFloat(roamingSettings.values["Invoice_number"]) + 1),
                        PurchaseDate: my_curr_date(),
                        TimePurchase: my_curr_time()
                    }).done(function (result) {
                        WinJS.Navigation.navigate('pages/login_sessions/thankyou/thankyou.html');
                    }), function (err) {
                        console.log(err);
                    }
                } else {
                    if (roamingSettings.values["Base_protein"] === true) {
                        WinJS.xhr({
                            type: "POST",
                            url: "http://thinkitdrinkit.vendhq.com/api/register_sales",
                            headers: { "Content-type": "application/json" },
                            password: "agave2013",
                            data: JSON.stringify({
                                "register_id": "5ecccd41-3cbc-11e3-a29a-bc305bf5da20",
                                "user_name": "test",
                                "customer_id": roamingSettings.values["login_vID"],
                                "status": "SAVED",
                                "total_price": roamingSettings.values["total_price"],
                                "total_tax": (roamingSettings.values["total_price"] * .0636),
                                "note": "New Order",
                                "register_sale_products": [
                                   {
                                       "product_id": roamingSettings.values["Base_Vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Base_price"],
                                       "tax": (roamingSettings.values["Base_price"] * .0636)
                                   },
                                   {
                                       "product_id": roamingSettings.values["Boost1_vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Boost1_price"],
                                       "tax": (roamingSettings.values["Boost1_price"] * .0636)
                                   }
                                ]
                            }),
                        }).then(function sucess(res) {
                            roamingSettings.values["Invoice_number"] = JSON.parse(res.responseText).register_sale.invoice_number;
                            console.log(roamingSettings.values["Invoice_number"]);
                            roamingSettings.values["I_ordered"] = "yes";
                        }, function error(err) {
                            console.log("fail", err.responseText)
                        });
                    } else {
                        WinJS.xhr({
                            type: "POST",
                            url: "http://thinkitdrinkit.vendhq.com/api/register_sales",
                            headers: { "Content-type": "application/json" },
                            password: "agave2013",
                            data: JSON.stringify({
                                "register_id": "5ecccd41-3cbc-11e3-a29a-bc305bf5da20",
                                "user_name": "",
                                "customer_id": roamingSettings.values["login_vID"],
                                "status": "SAVED",
                                "total_price": roamingSettings.values["total_price"],
                                "total_tax": (roamingSettings.values["total_price"] * .0636),
                                "note": "New Order",
                                "register_sale_products": [
                                   {
                                       "product_id": roamingSettings.values["Base_Vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Base_price"],
                                       "tax": (roamingSettings.values["Base_price"] * .0636)
                                   },
                                   {
                                       "product_id": roamingSettings.values["FlavSel_vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["FlavSel_price"],
                                       "tax": (roamingSettings.values["FlavSel_price"] * .0636)
                                   },
                                   {
                                       "product_id": roamingSettings.values["Boost1_vend"],
                                       "quantity": 1,
                                       "price": roamingSettings.values["Boost1_price"],
                                       "tax": (roamingSettings.values["Boost1_price"] * .0636)
                                   }
                                ]
                            }),
                        }).then(function sucess(res) {
                            roamingSettings.values["Invoice_number"] = JSON.parse(res.responseText).register_sale.invoice_number;
                            console.log(roamingSettings.values["Invoice_number"]);
                            roamingSettings.values["I_ordered"] = "yes";
                        }, function error(err) {
                            console.log("fail", err.responseText)
                        });
                    }
                    Age.insert({
                        Name: roamingSettings.values["login_fName"] + " " + roamingSettings.values["login_lName"],
                        Base: roamingSettings.values["Base_name"],
                        BaseImage: roamingSettings.values["Base_pic"],
                        BaseID: roamingSettings.values["Base_vend"],
                        BasePrice: roamingSettings.values["Base_price"],
                        Age: roamingSettings.values["Age_name"],
                        AgeImage: roamingSettings.values["Age_pic"],
                        Boost1: roamingSettings.values["Boost1_name"],
                        Boost1Image: roamingSettings.values["Boost1_pic"],
                        Boost1ID: roamingSettings.values["Boost1_vend"],
                        VendID: roamingSettings.values["login_vcode"],
                        Boost1Price: roamingSettings.values["Boost1_price"],
                        FlavName: roamingSettings.values["FlavSel_name"],
                        FlavImage: roamingSettings.values["FlavSel_pic"],
                        Caloric: roamingSettings.values["Flav_name"],
                        FlavID: roamingSettings.values["FlavSel_vend"],
                        TotalPrice: document.getElementById("total").textContent,
                        OrderNumber: (parseFloat(roamingSettings.values["Invoice_number"]) + 1),
                        PurchaseDate: my_curr_date(),
                        TimePurchase: my_curr_time()
                    }).done(function (result) {
                        WinJS.Navigation.navigate('pages/login_sessions/thankyou/thankyou.html');
                    }), function (err) {
                        console.log(err);
                    }
                }
            }, function (err) {
                console.log(err);
            });
        }
    })

})();

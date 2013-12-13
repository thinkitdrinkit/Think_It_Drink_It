// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;

    var Age = thinkitdrinkitDataClient.getTable("Users");
    var Age1 = thinkitdrinkitDataClient.getTable("UserOrders");

    WinJS.UI.Pages.define("/pages/signup/signup.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            design.getSignUp();
            design.changeTextColor();

            var ok = false;
            WinJS.Namespace.define("Clicked", {
        
                CheckOnType: function () {
                    var pass1 = document.getElementById("pass").value;
                    var pass2 = document.getElementById("cPass").value;

                    if (pass1 != pass2) {
                        document.getElementById("cPass").style.borderColor = "red";
                        ok = false;
                    } else {
                        document.getElementById("cPass").style.borderColor = "green";
                        ok = true;
                    }
                    return ok;
                },
                finalClick: function () {
                   
                    roamingSettings.values["Sign_first"] = document.getElementById("Fname").value;
                    roamingSettings.values["Sign_last"] = document.getElementById("Lname").value;
                    roamingSettings.values["Sign_email"] = document.getElementById("email").value;
                    roamingSettings.values["Sign_phone"] = document.getElementById("phone").value;
                    roamingSettings.values["Zip_number"] = document.getElementById("zip").value;

                    if (ok) {
                        WinJS.xhr({
                            type: "POST",
                            url: "http://thinkitdrinkit.vendhq.com/api/customers",
                            headers: { "Content-type": "application/json" },
                            password: "agave2013",
                            data: JSON.stringify({
                                "first_name": roamingSettings.values["Sign_first"],
                                "last_name": roamingSettings.values["Sign_last"],
                                "email": roamingSettings.values["Sign_email"],
                                "phone": roamingSettings.values["Sign_phone"],
                                "postal_postcode": roamingSettings.values["Zip_number"]
                            }),
                        }).then(function sucess(res) {
                            console.log(res.responseText);
                            Age.insert({
                                FirstName: roamingSettings.values["Sign_first"],
                                LastName: roamingSettings.values["Sign_last"],
                                Email: roamingSettings.values["Sign_email"],
                                Phone: roamingSettings.values["Sign_phone"],
                                Zip: roamingSettings.values["Zip_number"],
                                VendId: JSON.parse(res.responseText).customer.id,
                                VendCode: JSON.parse(res.responseText).customer.customer_code
                                // Password:roamingSettings.values["pass"],
                                //VendId: (parseFloat(roamingSettings.values["Invoice_number"]) + 1)
                            }).done(function (result) {
                                if (roamingSettings.values["I_ordered"] === "yes") {
                                    Age1.update({
                                        id: roamingSettings.values["the_id"],
                                        Name: document.getElementById("Fname").value,
                                        VendID: JSON.parse(res.responseText).customer.customer_code
                                    })
                                }
                                document.getElementById("Fname").value =  "";
                                document.getElementById("Lname").value = "";
                                document.getElementById("email").value = "";
                                document.getElementById("phone").value = "";
                                document.getElementById("zip").value = "";
                                document.getElementById("pass").value = "";
                                document.getElementById("cPass").value = "";
                                WinJS.Navigation.navigate('pages/welcome/welcome.html');
                            }), function (err) {
                                console.log(err);
                            }
                            //roamingSettings.values["Invoice_number"] = JSON.parse(res.responseText).register_sale.invoice_number;
                        }, function error(err) {
                            console.log("fail", err.responseText)
                        })
                    } else {
                       // WinJS.Navigation.navigate('pages/signup/signup.html');
                        console.log("Sorry your passwords don't match!");
                    }
                }
            })
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            roamingSettings.values["I_ordered"] = "no";
            console.log(roamingSettings.values["I_ordered"]);
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
})();

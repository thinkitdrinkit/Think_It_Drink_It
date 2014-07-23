// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    WinJS.UI.Pages.define("/pages/login_sessions/profile/profile.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            design.colorChange("#ffa500", "white");
            server.login_user_past();
            design.login_home();
            design.changeTextColor();
            WinJS.Binding.processAll(element, age_data.model);
            document.getElementById("company_name").textContent = "Hello" + " " + roamingSettings.values["login_fName"];
            document.getElementById("signUp").setAttribute("hidden", true);
            document.getElementById("login").setAttribute("hidden", true);
            document.getElementById("shop").setAttribute("onclick", "WinJS.Navigation.navigate('pages/login_sessions/home/home.html')");
            document.getElementById("more_info_home").setAttribute("onclick", "WinJS.Navigation.navigate('pages/login_sessions/info_home/info_home.html')");
            document.getElementById("home").setAttribute("onclick", "WinJS.Navigation.navigate('pages/login_sessions/launch_page/launch_page.html')");
            document.getElementById("logout").removeAttribute("hidden");
            document.getElementById("profile").removeAttribute("hidden");
            document.getElementById("fullName").textContent = roamingSettings.values["login_fName"] + " " + roamingSettings.values["login_lName"];
            document.getElementById("email34").textContent = roamingSettings.values["login_email"];
            document.getElementById("float_rightid").textContent = "Logout";
            document.getElementById("float_rightid").setAttribute("onclick", "login.logout()");
            
            document.getElementById("tier_one_img").style.filter = "greyscale";

            console.log(((roamingSettings.values["numberOfPurchases"] / 10) % 1) + " ", ((roamingSettings.values["numberOfPurchases"] / 20) % 1) + " ", ((roamingSettings.values["numberOfPurchases"] / 30) % 1) + " ", ((300 / 30) % 1) + " ", ((1000 / 10) % 1) + " ",((20000 / 20) %1))

           
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(age_data.model.login_user_past);
            roamingSettings.values["numberOfPurchases"] === 44;
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
    WinJS.Namespace.define("reorder", {

        submit: function (BasePrice, BasePic, BaseName, BaseVend, Boost1Price, Boost1Pic, Boost1Name, Boost1Vend, Boost2Price, Boost2Pic, Boost2Name, Boost2Vend, Boost3Price, Boost3Pic, Boost3Name, Boost3Vend, FlavName, FlavVend, FlavPic) {
            console.log(BasePrice.replace(/^\s+/, '').replace(/\s+$/, ''), BasePic.replace(/^\s+/, '').replace(/\s+$/, ''), BaseName.replace(/^\s+/, '').replace(/\s+$/, ''), BaseVend.replace(/^\s+/, '').replace(/\s+$/, ''), Boost1Price, Boost1Pic, Boost1Name, Boost1Vend, Boost2Price, Boost2Pic, Boost2Name, Boost2Vend, Boost3Price, Boost3Pic, Boost3Name, Boost3Vend);

            roamingSettings.values["Base_name"] = BaseName.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Base_vend"] = BaseVend.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Base_pic"] = BasePic.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Base_price"] = BasePrice.replace(/^\s+/, '').replace(/\s+$/, '');

            roamingSettings.values["flavSel_name"] = FlavVend.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["flavSel_vend"] = FlavPic.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["flavSel_pic"] = FlavName.replace(/^\s+/, '').replace(/\s+$/, '');

            roamingSettings.values["Boost1_name"] = Boost1Name.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost1_vend"] = Boost1Vend.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost1_pic"] = Boost1Pic.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost1_price"] = Boost1Price.replace(/^\s+/, '').replace(/\s+$/, '');

            roamingSettings.values["Boost2_name"] = Boost2Name.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost2_vend"] = Boost2Vend.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost2_pic"] = Boost2Pic.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost2_price"] = Boost2Price.replace(/^\s+/, '').replace(/\s+$/, '');

            roamingSettings.values["Boost3_name"] = Boost3Name.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost3_vend"] = Boost3Vend.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost3_pic"] = Boost3Pic.replace(/^\s+/, '').replace(/\s+$/, '');
            roamingSettings.values["Boost3_price"] = Boost3Price.replace(/^\s+/, '').replace(/\s+$/, '');
            
            WinJS.Navigation.navigate('pages/login_sessions/final/final.html');
        },
        edit: function () {
            document.getElementById("fullName").setAttribute("hidden", true);
            document.getElementById("email34").setAttribute("hidden", true);
            document.getElementById("edit_btn").setAttribute("hidden", true);
            document.getElementById("profile_info").style.width = "730px";

            document.getElementById("addedForm").removeAttribute("hidden");
            //document.getElementById("profile_info").style.height = "200px";

            document.getElementById("fname").value = roamingSettings.values['login_fName'];
            document.getElementById("lname").value = roamingSettings.values['login_lName'];
            document.getElementById("editEmail").value = roamingSettings.values['login_email'];
            document.getElementById("phone").value = roamingSettings.values['login_phone'];
            document.getElementById("zip").value = roamingSettings.values['login_zip'];

            document.getElementById("loyal").style.marginLeft = "680px";

            document.getElementById("moveRight").style.marginLeft = "333px";
            document.getElementById("moveRight1").style.marginLeft = "333px";
            document.getElementById("editSub_btn").style.marginLeft = "373px";
            document.getElementById("editSub_btn").style.marginTop = "-140px";
           // document.getElementById("editForm").querySelector("li").style.listStyle = "none";

            document.getElementById("moveRightL").style.marginLeft = "333px";
            document.getElementById("moveRight1L").style.marginLeft = "333px";
            document.getElementById("moveRightL").style.marginTop = "-178px";

            document.getElementById("list1").style.listStyle = "none";
            document.getElementById("list2").style.listStyle = "none";
            document.getElementById("list3").style.listStyle = "none";
            document.getElementById("list1L").style.listStyle = "none";
            document.getElementById("list2L").style.listStyle = "none";
            document.getElementById("list3L").style.listStyle = "none";
            document.getElementById("moveRight").style.listStyle = "none";
            document.getElementById("moveRight1").style.listStyle = "none";

            document.getElementById("moveRightL").style.listStyle = "none";
            document.getElementById("moveRight1L").style.listStyle = "none";
           
        },
        onsub: function () {
            document.getElementById("fullName").textContent = document.getElementById("fname").value + " " + document.getElementById("lname").value;
            document.getElementById("email34").textContent = document.getElementById("editEmail").value;
            roamingSettings.values["login_phone"] = document.getElementById("phone").value;
            roamingSettings.values["login_zip"] = document.getElementById("zip").value;
            roamingSettings.values["login_fName"] = document.getElementById("fname").value;
            roamingSettings.values["login_lName"] = document.getElementById("lname").value;
            roamingSettings.values["login_email"] = document.getElementById("editEmail").value;
            
            document.getElementById("company_name").textContent = "Hello" + " " + roamingSettings.values["login_fName"];
            WinJS.xhr({
                type: "POST",
                url: "http://thinkitdrinkit.vendhq.com/api/customers",
                headers: { "Content-type": "application/json" },
                password: "agave2013",
                data: JSON.stringify({
                    "id": roamingSettings.values["login_vID"],
                    "first_name": document.getElementById("fname").value,
                    "last_name": document.getElementById("lname").value,
                    "email": document.getElementById("editEmail").value,
                    "phone": document.getElementById("phone").value,
                    "postal_postcode": document.getElementById("zip").value
                }),
            }).then(function sucess(res) {
                var Age = thinkitdrinkitDataClient.getTable("Users");
                Age.update({
                    id:  roamingSettings.values["login_id"],
                    FirstName: document.getElementById("fname").value,
                    LastName: document.getElementById("lname").value,
                    Email: document.getElementById("editEmail").value,
                    Phone: document.getElementById("phone").value,
                    Zip: document.getElementById("zip").value
                }).done(function (result) {
                    document.getElementById("profile_info").style.width = "250px";
                    document.getElementById("loyal").style.marginLeft = "200px";
                    document.getElementById("addedForm").setAttribute("hidden", true)
                    document.getElementById("fullName").removeAttribute("hidden");
                    document.getElementById("email34").removeAttribute("hidden");
                    document.getElementById("edit_btn").removeAttribute("hidden");
                   
              
                }), function (err) {
                    console.log(err);
                }
                //roamingSettings.values["Invoice_number"] = JSON.parse(res.responseText).register_sale.invoice_number;
            }, function error(err) {
                console.log("fail", err.responseText)
            })
        }
    })
})();

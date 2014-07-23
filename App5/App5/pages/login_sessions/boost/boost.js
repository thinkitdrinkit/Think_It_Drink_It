// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var _num4 = "";
    var _num3 = "";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("Boost");
    var keepInfo = true;
    var boost1Active = false;
    var boost2Active = false;
    var boost3Active = false;

    WinJS.UI.Pages.define("/pages/login_sessions/boost/boost.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.getBoost();
            design.changeTextColor();
            document.getElementById("age_p").textContent = "Age: " + roamingSettings.values["Age_name"];
            document.getElementById("base_p").textContent = "Base: " + roamingSettings.values["Base_name"];
            document.getElementById("flav2_p").textContent = "Flavor: " + roamingSettings.values["FlavSel_name"];
            document.getElementById("cal_co").textContent = roamingSettings.values["Flav_name"].toLowerCase();
            console.log('Boost Loggedin');

            if (roamingSettings.values["Flav_name"] === "Caloric") {
                document.getElementById("flav_p").textContent = "Caloric";
            } else {
                document.getElementById("flav_p").textContent = "Non-Caloric";
            }

            if (roamingSettings.values["Base_protein"] === true) {
                document.getElementById("flav_div").setAttribute("hidden", true)
                document.getElementById("flav2_div").setAttribute("hidden", true)
            }


            document.getElementById("age_pic").src = roamingSettings.values["Age_pic"];
            document.getElementById("base_pic_footer").src = roamingSettings.values["Base_pic"];
            document.getElementById("flav1_pic").src = roamingSettings.values["Flav_pic"];
            document.getElementById("flav2_pic").src = roamingSettings.values["FlavSel_pic"];

            document.getElementById("theBoostAge").textContent = roamingSettings.values["Age_name"];

            server.boost(roamingSettings.values["Age_name"]);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(age_data.model.boost);
            remove.pop_list(age_data.model.the_boost_sel);
            
            if (!keepInfo) {
                remove.pop_list(age_data.model.info_page5);               
            }
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    var thename1 = "";
    var thename2 = "";

    WinJS.Namespace.define("boost_clicked", {
       
        clicked1: function (name, img, price, vend) {
            document.getElementById("btn_right").removeAttribute("hidden");

            //var boostView = element.querySelector().winControl;

            if (age_data.model.the_boost_sel.length < 3) {

                age_data.model.the_boost_sel.push({ the_name: name, the_pic: img });
              
                //console.log("double " + thename1 +" "+ thename2 +" "+ thename3 +" "+ name)
               
                //if statements should be placed here for the 1 boost condition
                if (name == thename1 || name == thename2) {
                    console.log("Sorry you may only choose 1 " + name);
                }
                if (age_data.model.the_boost_sel.length === 1) {
                    thename1 = name;
                    document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                    document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                    roamingSettings.values["Boost1_name"] = name;
                    roamingSettings.values["Boost1_pic"] = img;
                    roamingSettings.values["Boost1_info"] =  null;
                    roamingSettings.values["Boost1_price"] = price;
                    roamingSettings.values["Boost1_vend"] = vend;
                    console.log("Boost1: " + vend);
                    boost1Active = true;
                    document.getElementById("div_boost1_name").textContent = name;
                    document.getElementById("area_img1").src = roamingSettings.values["Boost1_pic"];
                    document.getElementById("area_img1").removeAttribute("hidden");
                    document.getElementById("boost1_div").removeAttribute("hidden");
                    document.getElementById("the_test");
                    keepInfo = false;
                } else if (age_data.model.the_boost_sel.length === 2) {
                    thename2 = name;
                    document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                    document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                    boost2Active = true;
                    roamingSettings.values["Boost2_name"] = name;
                    roamingSettings.values["Boost2_pic"] = img;
                    roamingSettings.values["Boost2_info"] = null;
                    roamingSettings.values["Boost2_price"] = price;
                    roamingSettings.values["Boost2_vend"] = vend;
                    console.log("Boost2: " + vend);

                    document.getElementById("div_boost2_name").textContent = name;
                    document.getElementById("area_img2").src = roamingSettings.values["Boost2_pic"];
                    document.getElementById("boost2_div").removeAttribute("hidden");
                    document.getElementById("area_img2").removeAttribute("hidden");
                } else if (age_data.model.the_boost_sel.length === 3) {
                    document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                    document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                    boost3Active = true;
                    roamingSettings.values["Boost3_name"] = name;
                    roamingSettings.values["Boost3_pic"] = img;
                    roamingSettings.values["Boost3_info"] = null;
                    roamingSettings.values["Boost3_price"] = price;
                    roamingSettings.values["Boost3_vend"] = vend;
                    document.getElementById("area_img3").src = roamingSettings.values["Boost3_pic"];
                    document.getElementById("area_img3").removeAttribute("hidden");
                    document.getElementById("boost3_div").removeAttribute("hidden");
                    document.getElementById("div_boost3_name").textContent = name;
                }
              
            } else {
                document.getElementById("overError").textContent = " Sorry, You May Only Choose 3 Boosts. If You Want To Change Boosts, Please Click the Remove Last Button";
                document.getElementById("overError").style.color = "red";
                document.getElementById("overError").style.fontSize = "30px";
                document.getElementById("overError").style.marginTop = "100px";
                document.getElementById("overError").style.position = "Absolute";
            }

            if (age_data.model.the_boost_sel.length + 1 > 0) {
               // document.getElementById("btn_right").removeAttribute("hidden");
            } else if (age_data.model.the_boost_sel.length <= 0) {
               // document.getElementById("btn_right").setAttribute("hidden", true);
            }
        },

        clicked: function (name) {
            remove.pop_list(age_data.model.info_page5);
            var updated_name = name.replace(/^\s+/, '').replace(/\s+$/, '');
            server.boost_sub(updated_name);
            keepInfo = false;
        },

        release: function () {
            if (age_data.model.the_boost_sel.length === 1) {
                roamingSettings.values["Boost1_name"] = "";
                roamingSettings.values["Boost1_pic"] = "";
                roamingSettings.values["Boost1_vend"] = "";
                roamingSettings.values["Boost1_info"] = null;
                roamingSettings.values["Boost1_price"] = null;
                document.getElementById("area_img1").setAttribute("hidden", true);
                document.getElementById("boost1_div").setAttribute("hidden", true);
            } else if (age_data.model.the_boost_sel.length === 2) {
                roamingSettings.values["Boost2_name"] = "";
                roamingSettings.values["Boost2_pic"] = "";
                roamingSettings.values["Boost2_vend"] = "";
                roamingSettings.values["Boost2_info"] = null;
                roamingSettings.values["Boost2_price"] = null;
                document.getElementById("area_img2").setAttribute("hidden", true);
                document.getElementById("boost2_div").setAttribute("hidden", true);
            } else if (age_data.model.the_boost_sel.length === 3) {
                roamingSettings.values["Boost3_name"] = "";
                roamingSettings.values["Boost3_pic"] = "";
                roamingSettings.values["Boost3_vend"] = "";
                roamingSettings.values["Boost3_info"] = null;
                roamingSettings.values["Boost3_price"] = null;
                document.getElementById("area_img3").setAttribute("hidden", true);
                document.getElementById("boost3_div").setAttribute("hidden", true);
            }
           
            age_data.model.the_boost_sel.pop();
            document.getElementById("overError").textContent = "";
            document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
            document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
            if (age_data.model.the_boost_sel.length > 0) {
                document.getElementById("btn_right").removeAttribute("hidden");
            } else if (age_data.model.the_boost_sel.length <= 0) {
                document.getElementById("btn_right").setAttribute("hidden", true);
            }
        },
        more_info: function (clicked) {
            roamingSettings.values["Item_choosen"] = clicked;
            roamingSettings.values["Clicked_cat"] = "Boost";
            WinJS.Navigation.navigate('pages/item_info/item_info.html');
            keepInfo = true;
        }
    })
})();

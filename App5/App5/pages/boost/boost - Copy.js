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

    WinJS.UI.Pages.define("/pages/boost/boost.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            
            if (roamingSettings.values["orderComplete"]) {
                remove.pop_list(age_data.model.the_boost_sel);
            }

            design.getBoost();
            design.changeTextColor();
            document.getElementById("age_p").textContent = "Age: " + roamingSettings.values["Age_name"];
            document.getElementById("base_p").textContent = "Base: " + roamingSettings.values["Base_name"];
            document.getElementById("flav2_p").textContent = "Flavor: " + roamingSettings.values["FlavSel_name"];
            document.getElementById("cal_co").textContent = roamingSettings.values["Flav_name"].toLowerCase();

            document.getElementById("btn_right").removeAttribute("hidden");
            //if (age_data.model.the_boost_sel.length > 0) {
            //    document.getElementById("btn_right").removeAttribute("hidden");
            //} else if (age_data.model.the_boost_sel.length <= 0) {
            //    document.getElementById("btn_right").setAttribute("hidden", true);
            //}

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

            if (age_data.model.the_boost_sel.length === 1) {
                thename1 = roamingSettings.values["Boost1_name"];
                //console.log(roamingSettings.values["Boost1_name"] + roamingSettings.values["Boost1_pic"]);
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
    
                document.getElementById("div_boost1_name").textContent = roamingSettings.values["Boost1_name"];
                document.getElementById("area_img1").src = roamingSettings.values["Boost1_pic"];

                document.getElementById("boost1_div").removeAttribute("hidden");
                document.getElementById("the_test");
               // keepInfo = false;
            } else if (age_data.model.the_boost_sel.length === 2) {
                
                thename1 = roamingSettings.values["Boost1_name"];
               // console.log("one boost " + roamingSettings.values["Boost1_name"] + roamingSettings.values["Boost1_pic"]);
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;

                document.getElementById("div_boost1_name").textContent = roamingSettings.values["Boost1_name"];
                document.getElementById("area_img1").src = roamingSettings.values["Boost1_pic"];

                document.getElementById("boost1_div").removeAttribute("hidden");
                document.getElementById("the_test");

               // console.log("two boost: " + roamingSettings.values["Boost2_name"] + roamingSettings.values["Boost2_pic"]);
                thename2 = roamingSettings.values["Boost2_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;

                document.getElementById("div_boost2_name").textContent = roamingSettings.values["Boost2_name"];
                document.getElementById("area_img2").src = roamingSettings.values["Boost2_pic"];
                document.getElementById("boost2_div").removeAttribute("hidden");

            } else if (age_data.model.the_boost_sel.length === 3) {
               
                thename1 = roamingSettings.values["Boost1_name"];
               // console.log("one boost " + roamingSettings.values["Boost1_name"] + roamingSettings.values["Boost1_pic"]);
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;

                document.getElementById("div_boost1_name").textContent = roamingSettings.values["Boost1_name"];
                document.getElementById("area_img1").src = roamingSettings.values["Boost1_pic"];

                document.getElementById("boost1_div").removeAttribute("hidden");
                document.getElementById("the_test");

                thename2 = roamingSettings.values["Boost2_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;

                document.getElementById("div_boost2_name").textContent = roamingSettings.values["Boost2_name"];
                document.getElementById("area_img2").src = roamingSettings.values["Boost2_pic"];
                document.getElementById("boost2_div").removeAttribute("hidden");

//console.log("three boost " + roamingSettings.values["Boost3_name"] + roamingSettings.values["Boost3_pic"]);
                //thename3 = name;
                thename3 = roamingSettings.values["Boost3_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("area_img3").src = roamingSettings.values["Boost3_pic"];
                document.getElementById("boost3_div").removeAttribute("hidden");
                document.getElementById("div_boost3_name").textContent = roamingSettings.values["Boost3_name"];

            } else if (age_data.model.the_boost_sel.length === 0) {
                thename0 = roamingSettings.values["Boost0_name"];
                document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;

                //document.getElementById("div_boost1_name").textContent = roamingSettings.values["Boost1_name"];
                //document.getElementById("area_img1").src = roamingSettings.values["Boost1_pic"];

                document.getElementById("the_test");
            }
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(age_data.model.boost);
            remove.pop_list(age_data.model.info_page5);
            
            if (!keepInfo) {
                remove.pop_list(age_data.model.the_boost_sel);
            }
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    var thename1 = "";
    var thename2 = "";
    var thename3 = "";
    var thename0 = "";
    //console.log(thename1, thename2, thename3);

    WinJS.Namespace.define("boost_clicked", {
       
        clicked1: function (name, img, price, vend, label) {
            document.getElementById("btn_right").removeAttribute("hidden");

            //var boostView = element.querySelector().winControl;

            if (age_data.model.the_boost_sel.length < 3) {
                //console.log(thename1, thename2, thename3);
                var fix1 = age_data.model.the_boost_sel.length;

                if (name === thename1 && (fix1 > 0 && fix1 < 3)) {
                    document.getElementById("only_one_warning").removeAttribute("hidden");
                } else if (name === thename2) {
                    document.getElementById("only_one_warning").removeAttribute("hidden");
                } else if (name === thename3) {
                    document.getElementById("only_one_warning").removeAttribute("hidden");
                } else {
                    age_data.model.the_boost_sel.push({ the_name: name, the_pic: img });            
                    document.getElementById("only_one_warning").setAttribute("hidden", true);

                    //console.log("double " + thename1 +" "+ thename2 +" "+ thename3 +" "+ name)

                    //if statements should be placed here for the 1 boost condition
                    if (age_data.model.the_boost_sel.length === 1) {
                        thename1 = name;
                        document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                        document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                        roamingSettings.values["Boost1_name"] = name;
                        roamingSettings.values["Boost1_pic"] = img;
                        roamingSettings.values["Boost1_info"] = null;
                        roamingSettings.values["Boost1_price"] = price;
                        roamingSettings.values["Boost1_vend"] = vend;
                        roamingSettings.values["Boost1_pic_label"] = label;
                        document.getElementById("div_boost1_name").textContent = name;
                        document.getElementById("area_img1").src = roamingSettings.values["Boost1_pic"];
                        document.getElementById("boost1_div").removeAttribute("hidden");
                        document.getElementById("the_test");
                        console.log(roamingSettings.values["Boost1_name"] + roamingSettings.values["Boost1_pic"]);
                        keepInfo = false;

                    } else if (age_data.model.the_boost_sel.length === 2) {
                        thename2 = name;
                        document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                        document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                        roamingSettings.values["Boost2_name"] = name;
                        roamingSettings.values["Boost2_pic"] = img;
                        roamingSettings.values["Boost2_info"] = null;
                        roamingSettings.values["Boost2_price"] = price;
                        roamingSettings.values["Boost2_vend"] = vend;
                        roamingSettings.values["Boost2_pic_label"] = label;
                        document.getElementById("div_boost2_name").textContent = roamingSettings.values["Boost2_name"];
                        document.getElementById("area_img2").src = roamingSettings.values["Boost2_pic"];
                        console.log(roamingSettings.values["Boost2_name"] + roamingSettings.values["Boost2_pic"]);
                        document.getElementById("boost2_div").removeAttribute("hidden");
                        document.getElementById("the_test");
                        keepInfo = false;
                    } else if (age_data.model.the_boost_sel.length === 3) {
                        thename3 = name;
                        document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
                        document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
                        roamingSettings.values["Boost3_name"] = name;
                        roamingSettings.values["Boost3_pic"] = img;
                        roamingSettings.values["Boost3_info"] = null;
                        roamingSettings.values["Boost3_price"] = price;
                        roamingSettings.values["Boost3_vend"] = vend;
                        roamingSettings.values["Boost3_pic_label"] = label;
                        document.getElementById("area_img3").src = roamingSettings.values["Boost3_pic"];
                        console.log(roamingSettings.values["Boost3_name"] + roamingSettings.values["Boost3_pic"]);
                        document.getElementById("boost3_div").removeAttribute("hidden");
                        document.getElementById("div_boost3_name").textContent = name;
                        document.getElementById("the_test");
                        keepInfo = false;
                    }
                }//ends else for duplicate check
            } else {
                document.getElementById("overError").textContent = " Sorry, You May Only Choose 3 Boosts. If You Want To Change Boosts, Please Click the Remove Last Button";
                document.getElementById("overError").style.color = "red";
                document.getElementById("overError").style.fontSize = "30px";
                document.getElementById("overError").style.marginTop = "100px";
                document.getElementById("overError").style.position = "Absolute";
            }
        },

        clicked: function (name) {
            remove.pop_list(age_data.model.info_page5);
            var updated_name = name.replace(/^\s+/, '').replace(/\s+$/, '');
            server.boost_sub(updated_name);
            keepInfo = false;
        },

        release: function () {
            document.getElementById("only_one_warning").setAttribute("hidden", true);
            if (age_data.model.the_boost_sel.length === 1) {
                roamingSettings.values["Boost1_name"] = "";
                roamingSettings.values["Boost1_pic"] = "";
                roamingSettings.values["Boost1_vend"] = "";
                roamingSettings.values["Boost1_info"] = null;
                roamingSettings.values["Boost1_price"] = null;
                roamingSettings.values["Boost1_pic_label"] = "";
                thename1 = "";
                document.getElementById("boost1_div").setAttribute("hidden", true);

            } else if (age_data.model.the_boost_sel.length === 2) {
                roamingSettings.values["Boost2_name"] = "";
                roamingSettings.values["Boost2_pic"] = "";
                roamingSettings.values["Boost2_vend"] = "";
                roamingSettings.values["Boost2_info"] = null;
                roamingSettings.values["Boost2_price"] = null;
                roamingSettings.values["Boost2_pic_label"] = "";
                thename2 = "";
                document.getElementById("boost2_div").setAttribute("hidden", true);
                document.getElementById("div_boost2_name_duplicate").setAttribute("hidden", true);

            } else if (age_data.model.the_boost_sel.length === 3) {
                roamingSettings.values["Boost3_name"] = "";
                roamingSettings.values["Boost3_pic"] = "";
                roamingSettings.values["Boost3_vend"] = "";
                roamingSettings.values["Boost3_info"] = null;
                roamingSettings.values["Boost3_price"] = null;
                roamingSettings.values["Boost3_pic_label"] = "";
                thename3 = "";
                document.getElementById("boost3_div").setAttribute("hidden", true);
            }
           
            age_data.model.the_boost_sel.pop();
            document.getElementById("overError").textContent = "";
            document.getElementById("the_number").textContent = age_data.model.the_boost_sel.length;
            document.getElementById("the_num").textContent = age_data.model.the_boost_sel.length;
            //if (age_data.model.the_boost_sel.length > 0) {
            //    document.getElementById("btn_right").removeAttribute("hidden");
            //} else if (age_data.model.the_boost_sel.length <= 0) {
            //    document.getElementById("btn_right").setAttribute("hidden", true);
            //}
        },
        more_info: function (clicked) {
            roamingSettings.values["Item_choosen"] = clicked;
            roamingSettings.values["Clicked_cat"] = "Boost";
            WinJS.Navigation.navigate('pages/item_info/item_info.html');
            roamingSettings.values["orderComplete"] = false;
            keepInfo = true;
        },
        finalKeepInfo: function () {
            WinJS.Navigation.navigate('pages/final/final.html');
            thename1 = "";
            thename2 = "";
            thename3 = "";
            thename0 = "";
            roamingSettings.values["orderComplete"] = false;
            keepInfo = true;

        }
    })
})();

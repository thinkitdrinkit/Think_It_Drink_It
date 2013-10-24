// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var _num4 = "";
    var _num3 = "";
    WinJS.UI.Pages.define("/pages/boost/boost.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            document.getElementById("choosen_base").textContent = "Choose Your Boost (Max of 3):";

            document.getElementById("age_pic").src = get_set.set_age("pic");
            document.getElementById("base_pic").src = get_set.set_base("pic");
            document.getElementById("flav1_pic").src = get_set.set_flav("pic");
            document.getElementById("flav2_pic").src = get_set.set_sel_flav("pic");

            _num4 = age_data.get_age_num(get_set.set_age("name"));
            _num3 = age_data.get_base_num(get_set.set_base("name"));


            WinJS.xhr({ url: "resource/data.txt" }).then(function (xhr) {
                var age_boost = JSON.parse(xhr.responseText);
                age_boost.forEach(function (age_boosts) {
                    for (var i = 0; i < age_boosts[_num4].Base[_num3].boost.length; i++) {
                        age_data.model.boost.push({ boost_name: age_boosts[_num4].Base[_num3].boost[i].name, boost_pic: age_boosts[_num4].Base[_num3].boost[i].image });
                    }
                });
            });
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
            remove.pop_list(age_data.model.boost);
            remove.pop_list(age_data.model.info_page5);
            remove.pop_list(age_data.model.the_boost_sel);
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    WinJS.Namespace.define("boost_clicked", {
       
        clicked1: function (name, img, price) {
            document.getElementById("btn_right").removeAttribute("hidden");
            if (age_data.model.the_boost_sel.length < 3) {

                age_data.model.the_boost_sel.push({ the_name: name, the_pic: img });
       

                if (age_data.model.the_boost_sel.length === 1) {
                    get_set.get_boost1(name, img, null, price);
                    document.getElementById("area_img1").src = get_set.set_boost1("pic");
                    document.getElementById("area_img1").removeAttribute("hidden");
                    document.getElementById("the_test");
                } else if (age_data.model.the_boost_sel.length === 2) {
                    get_set.get_boost2(name, img, null, price)
                    document.getElementById("area_img2").src = get_set.set_boost2("pic");
                    document.getElementById("area_img2").removeAttribute("hidden");
                } else if (age_data.model.the_boost_sel.length === 3) {
                    get_set.get_boost3(name, img, null, price);
                    document.getElementById("area_img3").src = get_set.set_boost3("pic");
                    document.getElementById("area_img3").removeAttribute("hidden");
                }
              
            } else {
                document.getElementById("overError").textContent = " Sorry You May Only Choose 3 Boost, If You Want To Change Boost Please Click the Remove Last Button";
                document.getElementById("overError").style.color = "red";
                document.getElementById("overError").style.fontSize = "15px";
            }

            if (age_data.model.the_boost_sel.length + 1 > 0) {
               // document.getElementById("btn_right").removeAttribute("hidden");
            } else if (age_data.model.the_boost_sel.length <= 0) {
               // document.getElementById("btn_right").setAttribute("hidden", true);
            }
        },

        clicked: function (name) {
           remove.pop_list(age_data.model.info_page5);
           var the_age_num = age_data.get_age_num(get_set.set_age("name"));
           var the_base_num = age_data.get_base_num(get_set.set_base("name"));
           var the_boost_num = age_data.get_boost_num(name);

            WinJS.xhr({ url: "resource/data.txt" }).then(function (xhr) {
                var the_sel_boost = JSON.parse(xhr.responseText);
                the_sel_boost.forEach(function (sel) {
                    age_data.model.info_page5.push({ the_name: sel[the_age_num].Base[the_base_num].boost[the_boost_num].name, the_info: sel[the_age_num].Base[the_base_num].boost[the_boost_num].info, the_label: sel[the_age_num].Base[the_base_num].boost[the_boost_num].label, the_pic: sel[the_age_num].Base[the_base_num].boost[the_boost_num].image, the_price: sel[the_age_num].Base[the_base_num].boost[the_boost_num].price });
                })
            })
        },

        release: function () {

            if (age_data.model.the_boost_sel.length === 1) {
                get_set.get_boost1("", "", null, null);
                document.getElementById("area_img1").setAttribute("hidden", true);
            } else if (age_data.model.the_boost_sel.length === 2) {
                get_set.get_boost2("", "", null, null);
                document.getElementById("area_img2").setAttribute("hidden", true);
            } else if (age_data.model.the_boost_sel.length === 3) {
                get_set.get_boost3("", "", null, null);
                document.getElementById("area_img3").setAttribute("hidden", true);
            }
           
            age_data.model.the_boost_sel.pop();
            document.getElementById("overError").textContent = "";

            if (age_data.model.the_boost_sel.length > 0) {
                document.getElementById("btn_right").removeAttribute("hidden");
            } else if (age_data.model.the_boost_sel.length <= 0) {
                document.getElementById("btn_right").setAttribute("hidden", true);
            }
        }

    })
})();

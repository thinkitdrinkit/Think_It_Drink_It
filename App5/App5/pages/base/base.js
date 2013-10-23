// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var num = 0;

    WinJS.UI.Pages.define("/pages/base/base.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            WinJS.Binding.processAll(element, age_data.model);
            
            document.getElementById("choosen_age").textContent = "Choose Your Base:";

            var the_sel_age = get_set.set_age("name");

            document.getElementById("age_pic").src = get_set.set_age("pic");

           //alt = options.age;

            //sending the users choosen age to the age_data namespace and then receiving a number that will 
            //be used to access the right object on the array
            num = age_data.get_age_num(get_set.set_age("name"));

            WinJS.xhr({ url: "resource/data.txt" }).then(function (xhr) {
                var age_bases = JSON.parse(xhr.responseText);
                age_bases.forEach(function (age_base) {
                    for (var i = 0; i < age_base[num].Base.length; i++) {
                        age_data.model.base.push({ b_name: age_base[num].Base[i].name, b_pic: age_base[num].Base[i].image })
                    }
                });
            });
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.

            //using the removeInfo.js file to delete the last object of the array as long as an item exists
            remove.pop_list(age_data.model.base)
            remove.pop_list(age_data.model.info_page2)
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    var age3 = "";
    var base3 = "";
    WinJS.Namespace.define("base_clicked", {
        clicked: function (base) {
            remove.pop_list(age_data.model.info_page2)
            var age_num = 0;
            var base_num = 0;
            age3 = get_set.set_age("name");
            base3 = base;

            if (base === "Protein") {

            } else {
                age_num = age_data.get_age_num(get_set.set_age("name"));
                base_num = age_data.get_base_num(base);

                WinJS.xhr({ url: "resource/data.txt" }).then(function (xhr) {
                    var base_sel = JSON.parse(xhr.responseText);
                    base_sel.forEach(function (sel) {
                        age_data.model.info_page2.push({ the_name: sel[age_num].Base[base_num].name, the_img: sel[age_num].Base[base_num].label, the_info: sel[age_num].Base[base_num].info, the_pic: sel[age_num].Base[base_num].image, base_price: sel[age_num].Base[base_num].price });
                    });
                });
            };
        },
        next_page_flavor: function () {
            WinJS.Navigation.navigate('pages/flavor/flavor.html')
            get_set.get_base(base3, document.getElementById("choosen_base_carry").src, document.getElementById("sel_base_info").textContent, document.getElementById("base_price").textContent);
        }

    })

})();

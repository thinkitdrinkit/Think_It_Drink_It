// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
   var _baseChoice = "";
   var _ageChoice = "";
   var _ageName = "";
   var _agePic = "";
   var _baseName = "";
   var _basePic = "";
    WinJS.UI.Pages.define("/pages/flavor/flavor.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);

            _ageName = get_set.set_age("name");
            _baseName = get_set.set_base("name");
            _agePic = get_set.set_age("pic");
            _basePic = get_set.set_base("pic");

            if (_ageName === "Toddler" || _ageName === "Youth") {
                document.getElementById("choosen_base").textContent = "Based on the Age You've Choosen You Must Select Non-Caloric."
            } else {
                document.getElementById("choosen_base").textContent = "Would You Like A Caloric or Non-Caloric Flavor?";
            }

            _baseChoice = age_data.get_base_num(_baseName);
            _ageChoice = age_data.get_age_num(_ageName);
            
            document.getElementById("age_pic").src = _agePic;
            document.getElementById("base_pic").src = _basePic;

            console.log(_baseChoice + " " + _ageChoice);

            WinJS.xhr({ url: "resource/data.txt" }).then(function (xhr) {
                var age_flavor = JSON.parse(xhr.responseText);
                age_flavor.forEach(function (age_flavors) {
                    for (var i = 0; i < age_flavors[_ageChoice].Base[_baseChoice].flavor.length; i++) {
                        age_data.model.flavor.push({ flavor_name: age_flavors[_ageChoice].Base[_baseChoice].flavor[i].name, flavor_pic: age_flavors[_ageChoice].Base[_baseChoice].flavor[i].image });
                    }
                });
            });
            
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.       
            remove.pop_list(age_data.model.flavor);
            remove.pop_list(age_data.model.info_page3);
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    WinJS.Namespace.define("flavor_clicked", {
        clicked: function (flavor) {
            remove.pop_list(age_data.model.info_page3);

            var flav_3 = age_data.get_flav_num(flavor);
            console.log(_ageChoice + " " + _baseChoice + " " + flav_3);

            WinJS.xhr({ url: "resource/data.txt" }).then(function (xhr) {
                var flav_info = JSON.parse(xhr.responseText);
                flav_info.forEach(function (flav_infos) {
                    age_data.model.info_page3.push({ the_info_flav: flav_infos[_ageChoice].Base[_baseChoice].flavor[flav_3].info, info_img_flav: flav_infos[_ageChoice].Base[_baseChoice].flavor[flav_3].image, info_name_flav: flav_infos[_ageChoice].Base[_baseChoice].flavor[flav_3].name})
                    console.log(flav_infos[_ageChoice].Base[_baseChoice].flavor[flav_3].image);
                });
            });
        },

        next_page_boost: function () {
            WinJS.Navigation.navigate('pages/flav_sel/flav_sel.html');
            get_set.get_flav(document.getElementById("the_choosen_name3").textContent, document.getElementById("choosen_flav_pic").src, null, null)
        }

    });
})();

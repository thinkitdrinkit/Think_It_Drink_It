(function () {
    WinJS.Namespace.define("age_data", {
        /* this model will take the needed information being gathered from the json file and store it in a n array that will be used
        to populate the html page*/

        model: WinJS.Binding.as({
            age: new WinJS.Binding.List([
            ]),
            base: new WinJS.Binding.List([
            ]),
            boost: new WinJS.Binding.List([
            ]),
            flavor: new WinJS.Binding.List([
            ]),
            info: new WinJS.Binding.List([
            ]),
            info_page2: new WinJS.Binding.List([
            ]),
            info_page3: new WinJS.Binding.List([
            ]),
            flavor1: new WinJS.Binding.List([
            ]),
            info_page4: new WinJS.Binding.List([
            ]),
            info_page5: new WinJS.Binding.List([
            ]),
            the_boost_sel: new WinJS.Binding.List([
            ]),
            example: new WinJS.Binding.List([
            ])
        }),
        /* taking the information that is being sent in and sending back a number 
        based on which age is choosen.*/
        get_age_num: function (num) {
        if (num === "Toddler") {
            num = 0;
        } else if (num === "Youth") {
            num = 1;
        } else if (num === "Teen") {
            num = 2;
        } else if (num === "Adult") {
            num = 3;
        } else if (num === "Senior") {
            num = 4;
        }
            return num;
        },

        get_base_num: function (base) {
            if (base === "Sports Nutrition") {
                base = 0;
            } else if (base === "Energy") {
                base = 1;
            } else if (base === "Natural Energy") {
                base = 2;
            } else if (base === "Weight Management") {
                base = 3;
            } else if (base === "Protein") {
                base = 4;
            } else if (base === "Sports Nutrition(Y)") {
                base = 8;
            }
            return base
        },

        get_flav_num: function (flav) {
            if (flav === "Non-Caloric") {
                flav = 1;
            } else if (flav === "Caloric") {
                flav = 0;
            }
            return flav
        },

        get_flav_sel_num: function (flav) {
            if (flav === "Sour Apple" || flav === "Sour Apple(c)") {
                flav = 0;
            } else if (flav === "Lemonade" || flav === "Lemonade(c)") {
                flav = 1;
            } else if (flav === "Pineapple" || flav === "Pineapple(c)") {
                flav = 2;
            } else if (flav === "Pom Acia" || flav === "Pom Acia(c)") {
                flav = 3;
            } else if (flav === "Lemon Lime" || flav === "Lemon Lime(c)") {
                flav = 4;
            } else if (flav === "Mint" || flav === "Mint(c)") {
                flav = 5;
            }
            return flav;
        },

        get_boost_num: function (boost) {
            if (boost === "Focus") {
                boost = 8;
            } else if (boost === "Joint Tissue") {
                boost = 9;
            } else if (boost === "Cellular Support") {
                boost = 10;
            } else if (boost === "Fat Buner") {
                boost = 11;
            } else if (boost === "Strength and Agility" ) {
                boost = 12;
            } else if (boost === "Endurance") {
                boost = 22;
            } else if (boost === "Energy") {
                boost = 13;
            } else if (boost === "Natural Energy") {
                boost = 14;
            } else if (boost === "Digestive Probiotic") {
                boost = 15;
            } else if (boost === "Fiber") {
                boost = 16;
            } else if (boost === "Beauty/ Skin Health") {
                boost = 17;
            } else if (boost === "Vitamin D") {
                boost = 18;
            } else if (boost === "Omega 3's") {
                boost = 19;
            } else if (boost === "Womens Mineral") {
                boost = 20;
            } else if (boost === "Womens Hormone") {
                boost = 21;
            } else if (boost === "bone") {
                boost = 0;
            } else if (boost === "immunity") {
                boost = 1;
            } else if (boost === "digestive") {
                boost = 2;
            } else if (boost === "dental") {
                boost = 3;
            } else if (boost === "Endurance(Y)") {
                boost = 4;
            } else if (boost === "Focus(Y)") {
                boost = 5;
            } else if (boost === "Recovery(Y)") {
                boost = 6;
            } else if (boost === "Strength and Agility(Y)") {
                boost = 7;
            }
            return boost;
        }
    })


})();
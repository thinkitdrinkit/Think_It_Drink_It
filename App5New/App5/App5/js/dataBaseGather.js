(function () {


    WinJS.Namespace.define("server", {

        home: function () {
            var Age = thinkitdrinkitDataClient.getTable("Age");
            var query = Age.where({
            }).read().done(function (results) {
                for (var i = 0; i < results.length; i++) {
                    age_data.model.age.push({ age: results[i].Name, img: results[i].Image })
                }
            }, function (err) {
                console.log(err);
            });
        },
        home_sub: function (name) {
            var Age = thinkitdrinkitDataClient.getTable("Age");
            remove.pop_list(age_data.model.info)
            
            var query = Age.where({
                Name: name
            }).read().done(function (results) {
                age_data.model.info.push({ the_info: results[0].Info, info_img: results[0].Image })
            }, function (err) {
                console.log(err);
            });
        },
        base: function (the_sel_age) {

            var Age = thinkitdrinkitDataClient.getTable("Base");

            if (the_sel_age === "Youth" || the_sel_age === "Toddler") {
                var query = Age.where({
                    Access: 1
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.base.push({ b_name: results[i].Name, b_pic: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });

            } else {
                var query = Age.where({
                    Access: 2
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.base.push({ b_name: results[i].Name, b_pic: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });
            }
        },
        base_sub: function (name) {
            var Age = thinkitdrinkitDataClient.getTable("Base");

            var query = Age.where({
                Name: name
            }).read().done(function (results) {
                age_data.model.info_page2.push({ the_name: results[0].Name, the_info: results[0].Info, the_img: results[0].Label, base_price: results[0].Price, the_pic: results[0].Image })
            }, function (err) {
                console.log(err);
            })

        },
        protein: function (){
            var Age = thinkitdrinkitDataClient.getTable("Base");
            var query = Age.where({
                Access: 3
            }).read().done(function (results) {
                for (var i = 0; i < results.length; i++) {
                    age_data.model.the_protein.push({ b_name: results[i].Name, b_pic: results[i].Image })
                }
            }, function (err) {
                console.log(err);
            });
        },
        protein_sub: function (name){
            var Age = thinkitdrinkitDataClient.getTable("Base");
            var query = Age.where({
                Name: name
            }).read().done(function (results) {
                age_data.model.protein_info.push({ the_name: results[0].Name, the_info: results[0].Info, the_img: results[0].Label, base_price: results[0].Price, the_pic: results[0].Image })
            }, function (err) {
                console.log(err);
            })
        },
        flav: function (name) {
            var Age = thinkitdrinkitDataClient.getTable("FlavorBase");

            if (name === "Youth" || name === "Toddler") {
                var query = Age.where({
                    Access: 1
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.flavor.push({ flavor_name: results[i].Name, flavor_pic: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });

            } else {
                var query = Age.where({
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.flavor.push({ flavor_name: results[i].Name, flavor_pic: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });
            }
        },
        flav_sub: function (name) {
            var Age = thinkitdrinkitDataClient.getTable("FlavorBase");
            var query = Age.where({
                Name: name
            }).read().done(function (results) {
                age_data.model.info_page3.push({ info_name_flav: results[0].Name, the_info_flav: results[0].Info, base_price: results[0].Price, info_img_flav: results[0].Image })
            }, function (err) {
                console.log(err);
            })
        },
        flav_sel: function (name) {
            var Age = thinkitdrinkitDataClient.getTable("Flavor");

            if (name === "Caloric") {
                var query = Age.where({
                    Caloric: true
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.flavor1.push({ sel_flav_name: results[i].Name, sel_flav_pic: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });

            } else {
                var query = Age.where({
                    NonCaloric: true
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.flavor1.push({ sel_flav_name: results[i].Name, sel_flav_pic: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });
            }
        },
        flav_sel_sub: function (name) {
            var Age = thinkitdrinkitDataClient.getTable("Flavor");
            var query = Age.where({
                Name: name
            }).read().done(function (results) {
                age_data.model.info_page4.push({ sel_name: results[0].Name, sel_info: results[0].Info, sel_pic: results[0].Image, sel_label: results[0].Label })
            }, function (err) {
                console.log(err);
            })
        },
        boost: function (name) {
            var Age = thinkitdrinkitDataClient.getTable("Boost");
            if (name === "Youth") {
                var query = Age.where({
                    Access1: 11
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.boost.push({ boost_name: results[i].Name, boost_pic: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });
                2
            } else if (name === "Toddler") {
                var query = Age.where({
                    Access: 1
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.boost.push({ boost_name: results[i].Name, boost_pic: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });
            } else {
                var query = Age.where({
                    Access: 2
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.boost.push({ boost_name: results[i].Name, boost_pic: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });
            }
        },
        boost_sub: function (name) {
            var Age = thinkitdrinkitDataClient.getTable("Boost");

            var query = Age.where({
                Name: name
            }).read().done(function (results) {
                age_data.model.info_page5.push({ the_name: results[0].Name, the_info: results[0].Info, the_pic: results[0].Image, the_label: results[0].Label, the_price: results[0].Price })
            }, function (err) {
                console.log(err);
            })
        }

    })

})()
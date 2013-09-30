(function () {
    "use strict";

    var storage = Windows.Storage;
    var dtm = Windows.ApplicationModel.DataTransfer.DataTransferManager;
    var start = Windows.UI.StartScreen;
    var item;
    var capture = Windows.Media.Capture;
    var _photo;
    var _video;
    var notify = Windows.UI.Notifications;
    var popups = Windows.UI.Popups;


    WinJS.UI.Pages.define("/pages/itemDetail/itemDetail.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            item = options && options.item ? Data.resolveItemReference(options.item) : Data.items.getAt(0);
            element.querySelector(".titlearea .pagetitle").textContent = item.group.title;
            element.querySelector("article .item-title").textContent = item.title;
            element.querySelector("article .item-subtitle").textContent = item.preptime;
            element.querySelector("article .item-image").src = item.backgroundImage;
            element.querySelector("article .item-image").alt = item.shortTitle;
            // Display ingredients list
            var ingredients = element.querySelector("article .item-ingredients");
            for (var i = 0; i < item.ingredients.length; i++) {
                var ingredient = document.createElement("h2");
                ingredient.textContent = item.ingredients[i];
                ingredient.className = "ingredient";
                ingredients.appendChild(ingredient);
            }

// Determine whether Italian recipes have been purchased
var app = Windows.ApplicationModel.Store.CurrentAppSimulator;
var license = app.licenseInformation;

if (license.productLicenses.ItalianRecipes.isActive || item.group.key !== "Italian") {
    // Display cooking directions
    element.querySelector("article .item-directions").textContent = item.directions;
}
else {
    // Show the purchase price on the purchase button
    var button = document.querySelector("#purchaseRecipes");

    app.loadListingInformationAsync().then(function (listing) {
        var price = listing.productListings.ItalianRecipes.formattedPrice;
        button.style.display = 'block';
        button.textContent = "Purchase Italian Recipes for " + price;
    });

    // Handle clicks of the purchase button
    button.onclick = function () {
        if (!app.licenseInformation.isTrial) {
            app.requestProductPurchaseAsync("ItalianRecipes", false).done(
                function () {
                    if (app.licenseInformation.productLicenses.lookup("ItalianRecipes").isActive) {
                        var directions = element.querySelector("article .item-directions");
                        if (directions !== null) {
                            directions.textContent = item.directions;
                        }
                        button.style.display = 'none'; 
                    }
                });
        }
        else
            new Windows.UI.Popups.MessageDialog("You must go into settings->about and purchase the app first").showAsync(); 
    }; 
}

            element.querySelector(".content").focus();

            dtm.getForCurrentView().addEventListener("datarequested", this.onDataRequested);

            // Handle click events from the Photo command
            document.getElementById("photo").addEventListener("click", function (e) {
                var camera = new capture.CameraCaptureUI();

                // Capture a photo and display the share UI
                camera.captureFileAsync(capture.CameraCaptureUIMode.photo).then(function (file) {
                    if (file != null) {
                        _photo = file;
                        dtm.showShareUI();
                    }
                });

            });

            // Handle click events from the Video command
            document.getElementById("video").addEventListener("click", function (e) {
                var camera = new capture.CameraCaptureUI();
                camera.videoSettings.format = capture.CameraCaptureUIVideoFormat.wmv;

                // Capture a video and display the share UI
                camera.captureFileAsync(capture.CameraCaptureUIMode.video).then(function (file) {
                    if (file != null) {
                        _video = file;
                        dtm.showShareUI();
                    }
                });

            });

            document.getElementById("pin").addEventListener("click", function (e) {
                var uri = new Windows.Foundation.Uri("ms-appx:///" + item.tileImage);

                var tile = new start.SecondaryTile(
                    item.key,                                    // Tile ID
                    item.shortTitle,                             // Tile short name
                    item.title,                                  // Tile display name
                    JSON.stringify(Data.getItemReference(item)), // Activation argument
                    start.TileOptions.showNameOnLogo,            // Tile options
                    uri                                          // Tile logo URI
                );

                tile.requestCreateAsync();
            });

            // Handle click events from the Reminder command
            document.getElementById("remind").addEventListener("click", function (e) {
                // Create a toast notifier
                var notifier = notify.ToastNotificationManager.createToastNotifier();

                // Make sure notifications are enabled
                if (notifier.setting != notify.NotificationSetting.enabled) {
                    var dialog = new popups.MessageDialog("Notifications are currently disabled");
                    dialog.showAsync();
                    return;
                }

                // Get a toast template and insert a text node containing a message
                var template = notify.ToastNotificationManager.getTemplateContent(notify.ToastTemplateType.toastText01);
                var element = template.getElementsByTagName("text")[0];
                element.appendChild(template.createTextNode("Reminder!"));

                // Schedule the toast to appear 30 seconds from now
                var date = new Date(new Date().getTime() + 30000);
                var stn = notify.ScheduledToastNotification(template, date);
                notifier.addToSchedule(stn);
            });

        },
        onDataRequested: function (e) {
            var request = e.request;
            request.data.properties.title = item.title;

            if (_photo != null) {
                request.data.properties.description = "Recipe photo";
                var reference = storage.Streams.RandomAccessStreamReference.createFromFile(_photo);
                request.data.properties.Thumbnail = reference;
                request.data.setBitmap(reference);
                _photo = null;
            }
            else if (_video != null) {
                request.data.properties.description = "Recipe video";
                request.data.setStorageItems([_video]);
                _video = null;
            }
            else {

                request.data.properties.description = "Recipe ingredients and directions";

                // Share recipe text
                var recipe = "\r\nINGREDIENTS\r\n" + item.ingredients.join("\r\n");
                recipe += ("\r\n\r\nDIRECTIONS\r\n" + item.directions);
                request.data.setText(recipe);

                // Share recipe image
                var uri = item.backgroundImage;
                if (item.backgroundImage.indexOf("http://") != 0)
                    uri = "ms-appx:///" + uri;

                uri = new Windows.Foundation.Uri(uri);
                var reference = storage.Streams.RandomAccessStreamReference.createFromUri(uri);
                request.data.properties.thumbnail = reference;
                request.data.setBitmap(reference);
            }
        },

        unload: function () {
            WinJS.Navigation.removeEventListener("datarequested", this.onDataRequested);
        }

    });
})();

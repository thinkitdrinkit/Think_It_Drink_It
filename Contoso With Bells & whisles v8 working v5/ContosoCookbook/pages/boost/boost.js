/// <reference path="../../js/dataBoost.js" />


(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;

    ui.Pages.define("/pages/boost/boost.html", {
        // Navigates to the groupHeaderPage. Called from the groupHeaders,
        // keyboard shortcut and iteminvoked.
        navigateToGroup: function (key) {
            nav.navigate("/pages/itemDetail/itemDetail.html", { groupKey: key });
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's DataBoost.
        ready: function (element, options) {
            var semanticZoom = element.querySelector("#zoom").winControl;
            var zoomedInListView = element.querySelector("#zoomedInListView").winControl;
            var zoomedOutListView = element.querySelector("#zoomedOutListView").winControl;

            zoomedOutListView.itemTemplate = element.querySelector(".zoomedOutItemTemplate");
            zoomedOutListView.itemDataSource = DataBoost.groups.dataSource;
            zoomedOutListView.groupDataSource = null;
            zoomedOutListView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });

            zoomedInListView.groupHeaderTemplate = element.querySelector(".headertemplate");
            zoomedInListView.itemTemplate = element.querySelector(".itemtemplate");
            zoomedInListView.oniteminvoked = this._itemInvoked.bind(this);

            if (appView.value === appViewState.snapped) {
                // If the app is snapped, configure the zoomed-in ListView
                // to show groups and lock the SemanticZoom control
                zoomedInListView.itemDataSource = DataBoost.groups.dataSource;
                zoomedInListView.groupDataSource = null;
                zoomedInListView.layout = new ui.ListLayout();
                semanticZoom.locked = true;
            }
            else {
                // If the app isn't snapped, configure the zoomed-in ListView
                // to show items and groups and unlock the SemanticZoom control
                zoomedInListView.itemDataSource = DataBoost.items.dataSource;
                zoomedInListView.groupDataSource = DataBoost.groups.dataSource;
                zoomedInListView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });
                semanticZoom.locked = false;
            }

            semanticZoom.element.focus();
        },

        // This function updates the page layout in response to viewState changes.
        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            /// <param name="viewState" value="Windows.UI.ViewManagement.ApplicationViewState" />
            /// <param name="lastViewState" value="Windows.UI.ViewManagement.ApplicationViewState" />

            var semanticZoom = element.querySelector("#zoom").winControl;
            var zoomedInListView = element.querySelector("#zoomedInListView").winControl;

            if (appView.value === appViewState.snapped) {
                zoomedInListView.itemDataSource = DataBoost.groups.dataSource;
                zoomedInListView.groupDataSource = null;
                zoomedInListView.layout = new ui.ListLayout();
                semanticZoom.zoomedOut = false;
                semanticZoom.locked = true;
            }
            else {
                zoomedInListView.itemDataSource = DataBoost.items.dataSource;
                zoomedInListView.groupDataSource = DataBoost.groups.dataSource;
                zoomedInListView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });
                semanticZoom.locked = false;

            }
        },


        // This function updates the ListView with new layouts
        _initializeLayout: function (listView, viewState) {
            /// <param name="listView" value="WinJS.UI.ListView.prototype" />

            if (viewState === appViewState.snapped) {
                listView.itemDataSource = DataBoost.groups.dataSource;
                listView.groupDataSource = null;
                listView.layout = new ui.ListLayout();
            } else {
                listView.itemDataSource = DataBoost.items.dataSource;
                listView.groupDataSource = DataBoost.groups.dataSource;
                listView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });
            }
        },

        _itemInvoked: function (args) {
            if (appView.value === appViewState.snapped) {
                // If the page is snapped, the user invoked a group.
                var group = DataBoost.groups.getAt(args.detail.itemIndex);
                this.navigateToGroup(group.key);
            } else {
                // If the page is not snapped, the user invoked an item.
                var item = DataBoost.items.getAt(args.detail.itemIndex);
                nav.navigate("/pages/itemDetail/itemDetail.html", { item: DataBoost.getItemReference(item) });
            }
        }
    });
})();

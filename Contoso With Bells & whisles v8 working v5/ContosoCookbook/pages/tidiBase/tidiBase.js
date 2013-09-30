/// <reference path="../../js/dataTidiBase.js" />


(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;

    ui.Pages.define("/pages/tidiBase/tidiBase.html", {
        // Navigates to the groupHeaderPage. Called from the groupHeaders,
        // keyboard shortcut and iteminvoked.
        navigateToGroup: function (key) {
            nav.navigate("/pages/flavor/flavor.html", { groupKey: key });
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's DataTidiBase.
        ready: function (element, options) {
        var semanticZoom = element.querySelector("#zoom").winControl;
    var zoomedInListView = element.querySelector("#zoomedInListView").winControl;
    var zoomedOutListView = element.querySelector("#zoomedOutListView").winControl;

    zoomedOutListView.itemTemplate = element.querySelector(".zoomedOutItemTemplate");
    zoomedOutListView.itemDataSource = DataTidiBase.groups.dataSource;
    zoomedOutListView.groupDataSource = null;
    zoomedOutListView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });

    zoomedInListView.groupHeaderTemplate = element.querySelector(".headertemplate");
    zoomedInListView.itemTemplate = element.querySelector(".itemtemplate");
    zoomedInListView.oniteminvoked = this._itemInvoked.bind(this);

    if (appView.value === appViewState.snapped) {
        // If the app is snapped, configure the zoomed-in ListView
        // to show groups and lock the SemanticZoom control
        zoomedInListView.itemDataSource = DataTidiBase.groups.dataSource;
        zoomedInListView.groupDataSource = null;
        zoomedInListView.layout = new ui.ListLayout();
        semanticZoom.locked = true;
    }
    else {
        // If the app isn't snapped, configure the zoomed-in ListView
        // to show items and groups and unlock the SemanticZoom control
        zoomedInListView.itemDataSource = DataTidiBase.items.dataSource;
        zoomedInListView.groupDataSource = DataTidiBase.groups.dataSource;
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
        zoomedInListView.itemDataSource = DataTidiBase.groups.dataSource;
        zoomedInListView.groupDataSource = null;
        zoomedInListView.layout = new ui.ListLayout();
        semanticZoom.zoomedOut = false;
        semanticZoom.locked = true;
    }
    else {
        zoomedInListView.itemDataSource = DataTidiBase.items.dataSource;
        zoomedInListView.groupDataSource = DataTidiBase.groups.dataSource;
        zoomedInListView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });
        semanticZoom.locked = false;

    };




    //Milo added this for groups.base1 to be tested
   
    //    var listView = element.querySelector(".itemslist").winControl;
    //    var group = (options && options.groupKey) ? DataTidiBase.resolveGroupReference(options.groupKey) : DataTidiBase.groups.getAt(0);
    //    this._items = DataTidiBase.getItemsFromGroup(group);
    //    var pageList = this._items.createGrouped(
    //        function groupKeySelector(item) { return group.key; },
    //        function groupDataSelector(item) { return group; }
    //    );

    //    element.querySelector("header[role=banner] .pagetitle").textContent = group.title;

    //    listView.itemDataSource = pageList.dataSource;
    //    listView.itemTemplate = element.querySelector(".itemtemplate");
    //    listView.groupDataSource = pageList.groups.dataSource;
    //    listView.groupHeaderTemplate = element.querySelector(".headertemplate");
    //    listView.oniteminvoked = this._itemInvoked.bind(this);

    //    this._initializeLayout(listView, Windows.UI.ViewManagement.ApplicationView.value);
    //    listView.element.focus();




    },
        // This function updates the ListView with new layouts
        _initializeLayout: function (listView, viewState) {
            /// <param name="listView" value="WinJS.UI.ListView.prototype" />

            if (viewState === appViewState.snapped) {
                listView.itemDataSource = DataTidiBase.groups.dataSource;
                listView.groupDataSource = null;
                listView.layout = new ui.ListLayout();
            } else {
                listView.itemDataSource = DataTidiBase.items.dataSource;
                listView.groupDataSource = DataTidiBase.groups.dataSource;
                listView.layout = new ui.GridLayout({ groupHeaderPosition: "top" });
            }
        },

        _itemInvoked: function (args) {
            if (appView.value === appViewState.snapped) {
                // If the page is snapped, the user invoked a group.
                var group = DataTidiBase.groups.getAt(args.detail.itemIndex);
                this.navigateToGroup(group.key);
            } else {
                // If the page is not snapped, the user invoked an item.
                var item = DataTidiBase.items.getAt(args.detail.itemIndex);
                nav.navigate("/pages/flavor/flavor.html", { item: DataTidiBase.getItemReference(item) });
            }
        }
    });
})();

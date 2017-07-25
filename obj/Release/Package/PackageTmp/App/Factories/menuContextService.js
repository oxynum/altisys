
(function (app) {
    'use strict';

    app.factory('menuContextService', function ($rootScope, cookieService) {
        return {
            get:function (listName) {
                return this.get$data(listName, null);
            },
            get$data: function (listName, data) {
                var items = [];
                var listItems = '';
                try
                {
                    items = data ? data : cookieService.get(listName);
                    if (items && items.length > 0)
                    {
                        listItems = "['" + items[0].label + "', function ($itemScope) {$itemScope.mcAction('" + listName + "','##action##'," + 0 + ");}]";
                        for (var i = 1; i < items.length ; ++i) {
                            listItems += ",['" + items[i].label + "', function ($itemScope) {$itemScope.mcAction('" + listName + "','##action##'," + i + ");}]";
                        }
                        var listItemsToRedirect = listItems.replace(/##action##/g, 'redirect');
                        var listItemsToRemove = listItems.replace(/##action##/g, 'remove');
                        var result = '';
                        result = listItemsToRedirect + ", null, ['Retirer...', [" + listItemsToRemove + "]]";
                        result += ", ['Tout effacer', function ($itemScope) {$itemScope.mcClear('" + listName + "');$itemScope.mcChanged('" + listName + "', null);}]";

                        return new Function("return [" + result + "];")();
                    }
                    else
                    {
                        var defaultItem = "['vide...', function ($itemScope) {}]";
                        return new Function("return [" + defaultItem + "];")();
                    }
                    
                }
                catch(e)
                {
                    console.log("Invalid item object");
                }
                return [];
            },
            getItem: function (listName, index) {
                //var favorites = cookieService.get(listName);
                var items = cookieService.get(listName);
                try
                {
                    //items = favorites;
                    return items[index];
                }
                catch(e)
                {
                    console.log("Invalid item object");
                }
                return undefined;
            },
            addItem: function (listName, item) {
                cookieService.addItemFIFO(listName, item);
            },
            removeItem: function (listName, item) {
                var items = cookieService.get(listName);
                if (item && typeof item === "object")
                {
                    var index = -1;
                    //var index = items.map(x => x.url).indexOf(item);
                    for (var i = 0; i < items.length;i++)
                    {
                        if(items[i].url == item.url)
                        {
                            index = i;
                            break;
                        }
                    }
                    cookieService.removeItemAt(listName, index);
                }
                else
                    cookieService.removeItemAt(listName, item);
            },
            setMax: function (listName, max) {
                if (!cookieService.get(listName))
                    throw Error("Menu list " + listName + " doesn't exists yet");
                cookieService.defineMaxFIFO(listName, max);
            },
            clearAll: function (listName) {
                cookieService.remove(listName);
                cookieService.remove(listName + "-max");
            }

        }
    });

})(angular.module('appMain'));

(function (app) {
    'use strict';

    app.factory('widgetConfigService', function ($rootScope, cookieService) {
        return {
            get: function (userName) {
                return cookieService.get(userName + '-widget-config') || [
                    { id: '1', label: '', widgets: {} },
                    { id: '2', label: '', widgets: {} },
                    { id: '3', label: '', widgets: {} },
                    { id: '4', label: '', widgets: {} },
                    { id: '5', label: '', widgets: {} }
                ];
            },
            set: function (userName, widgets) {
                cookieService.set(userName + "-widget-config", widgets);
            },
            addWidget: function (userName, page, widget) {
                var pages = cookieService.get(userName + '-widget-config') || {};
                var indexPage = page - 1;
                var itemToAdd = {};
                if (widget && typeof widget === 'string')
                    itemToAdd = (new Function("return " + widget + ";"))() || {};
                else
                    itemToAdd = widget;
                // Add widget
                if (!pages[indexPage])
                    pages[indexPage] = {
                        id: "'"+ indexPage + "'",
                        label: 'Page ' + page,
                        widgets: []
                    };
                if (!pages[indexPage].widgets)
                    pages[indexPage].widgets = [];
                pages[indexPage].widgets.push(itemToAdd);
                cookieService.set(userName + '-widget-config', pages);
                    
            },
            removeWidget: function (userName, page, widget) {
                var pages = cookieService.get(userName + '-widget-config') || {};
                var itemToAdd = {};
                var indexPage = page - 1;
                // Add widget
                if (!pages[indexPage])
                    pages[indexPage] = [];
                if (pages[indexPage].widgets)
                {
                    var index = -1;
                    for (var i = 0 ; i < pages[indexPage].widgets.length ; i++)
                    {
                        if (pages[indexPage].widgets[i].label == widget.label)
                        {
                            index = i;
                            break;
                        }
                            
                    }
                    pages[indexPage].widgets.splice(index, 1);
                    //pages[page].widgets.splice(pages[page].widgets.map(x => x.label).indexOf(widget), 1);
                    //pages[indexPage].widgets = pages[indexPage].widgets.filter(function (w) { return w.label !== widget.label; });
                }
                    
                cookieService.set(userName + '-widget-config', pages);
            }
        }
    });

})(angular.module('appMain'));

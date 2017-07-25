'use strict';
var app = angular.module('appMain');
var appPopin = angular.module('appPopin');

app.factory('gridConfService', ['$rootScope', '$http', 'gridSetting', 'storageService', 'apiService', 'uiGridConstants', function ($rootScope, $http, gridSetting, storageService, apiService, uiGridConstants) {
    return {
        simpleConf: function (currentScope, dataProviderUrl) {
            this.simpleConf$columnDefs(currentScope, dataProviderUrl, null);
        },
        simpleConf$columnDefs: function (currentScope, dataProviderUrl, idliste) {
            this.simpleConf$columnDefs$specificDefs(currentScope, dataProviderUrl, idliste, '');
        },
        simpleConf$columnDefs$specificDefs: function (currentScope, dataProviderUrl, idliste, specificDefs) {

            this.expandableConf(currentScope, dataProviderUrl, idliste,  null, null, specificDefs);
        },
        expandableConf: expandableConf,
        // Refresh DATA function
        getData: getData,
        getData$lastSort: getData$lastSort

    }
    function expandableConf(currentScope, dataProviderUrl, idliste, nested_dataProviderUrl, nested_idliste, specificDefs) {
        currentScope.lastSort = '1';
        currentScope.TotalPages = 10;
        currentScope.loadingIndicator = true;
        currentScope.dataProviderUrl = dataProviderUrl;
        var defaultGridDefs = storageService.get('grid.defs.default');
        if (!currentScope.paginationOptions)
            currentScope.paginationOptions = defaultGridDefs.paginationOptions;

        //console.log(specificDefs);

        if (!currentScope.gridOptions) {
            currentScope.gridOptions = {
                //enablePaginationControls: false,
                showGridFooter: false,
                selectionRowHeaderWidth: 35,
                rowHeight: 35,
                expandableRowTemplate: 'NestedGridSimpleView.html',
                enableColumnMenus : false,
                onRegisterApi: function (gridApi) {
                    currentScope.gridApi = gridApi;
                    currentScope.gridApi.core.on.sortChanged(currentScope, function (grid, sortColumns) {
                        if (sortColumns.length == 0) {
                            currentScope.paginationOptions.sort = null;
                        } else {
                            currentScope.paginationOptions.sort = sortColumns[0].sort.direction;
                            currentScope.lastSort = sortColumns[0].name.toLowerCase();
                        }

                        getData$lastSort(currentScope, currentScope.gridOptions, currentScope.dataProviderUrl, currentScope.paginationOptions, currentScope.lastSort);
                        currentScope.paginationOptions.totalPage = Math.ceil(currentScope.gridOptions.totalItems / currentScope.pageSize);
                    });
                    currentScope.gridApi.pagination.on.paginationChanged(currentScope, function (newPage, pageSize) {
                        currentScope.paginationOptions.pageNumber = newPage;
                        currentScope.paginationOptions.pageSize = pageSize;
                        currentScope.paginationOptions.currentPage = newPage;
                        getData(currentScope, currentScope.dataProviderUrl, currentScope.paginationOptions);
                        currentScope.paginationOptions.totalPage = Math.ceil(currentScope.gridOptions.totalItems / currentScope.pageSize);
                    });
                    // Selections events for selectable grid
                    if (specificDefs && specificDefs.hasSelection) {
                        currentScope.gridApi.selection.on.rowSelectionChangedBatch(currentScope, function (rows) {
                            currentScope.rowsSelected(currentScope.gridApi.selection.getSelectedRows());
                        });

                        currentScope.gridApi.selection.on.rowSelectionChanged(currentScope, function (row) {
                            currentScope.rowsSelected(currentScope.gridApi.selection.getSelectedRows());
                        });
                    }
                    // Expandable grid => configuration of nested grid
                    if (nested_dataProviderUrl && nested_idliste) {
                        currentScope.gridOptions.expandableRowTemplate = '/Views/_Template/NestedGridSimpleView.html';
                        currentScope.gridOptions.expandableRowHeight = 200;
                        currentScope.gridApi.expandable.on.rowExpandedStateChanged(currentScope, function (row) {

                            if (row.isExpanded) {
                                row.entity.subGridOptions = {};
                                row.entity.subGridOptions.enablePaginationControls = defaultGridDefs.gridOptions.enablePaginationControls;
                                row.entity.subGridOptions.showGridFooter = defaultGridDefs.gridOptions.showGridFooter;
                                row.entity.subGridOptions.paginationPageSizes = defaultGridDefs.gridOptions.paginationPageSizes;
                                row.entity.subGridOptions.paginationPageSize = defaultGridDefs.gridOptions.paginationPageSize;
                                row.entity.subGridOptions.useExternalPagination = defaultGridDefs.gridOptions.useExternalPagination;
                                row.entity.subGridOptions.useExternalSorting = defaultGridDefs.gridOptions.useExternalSorting;
                                row.entity.subGridOptions.enableSelectAll = defaultGridDefs.gridOptions.enableSelectAll;
                                row.entity.subGridOptions.enableFullRowSelection = defaultGridDefs.gridOptions.enableFullRowSelection;
                                row.entity.subGridOptions.selectionRowHeaderWidth = defaultGridDefs.gridOptions.selectionRowHeaderWidth;
                                row.entity.subGridOptions.enableRowSelection = defaultGridDefs.gridOptions.enableRowSelection;
                                row.entity.subGridOptions.enableGroupHeaderSelection = defaultGridDefs.gridOptions.enableGroupHeaderSelection;
                                row.entity.subGridOptions.enableSelectionBatchEvent = defaultGridDefs.gridOptions.enableSelectionBatchEvent;
                                row.entity.subGridOptions.hasSelection = defaultGridDefs.hasSelection;
                                row.entity.subGridOptions.paginationOptions = defaultGridDefs.paginationOptions; 
                                row.entity.subGridOptions.enableColumnMenus = false;
                                row.entity.subGridOptions.columnDefs = gridSetting.getColumnDefs(nested_idliste);

                                if (specificDefs) {
                                    if (specificDefs.nested_columnDefs) {
                                        for (var i = 0; i < specificDefs.nested_columnDefs.length; i++) {
                                            row.entity.subGridOptions.columnDefs.push({
                                                pinnedRight: true, cellTemplate: specificDefs.nested_columnDefs[i].cellTemplate, visible: specificDefs.nested_columnDefs[i].isvisible, displayName: specificDefs.nested_columnDefs[i].nomchamp, name: specificDefs.nested_columnDefs[i].nomchamp, field: specificDefs.nested_columnDefs[i].nomchamp
                                            });
                                        }
                                    }
                                }

                                getData$lastSort(currentScope, row.entity.subGridOptions, nested_dataProviderUrl + row.entity.FILTER + '/', currentScope.paginationOptions, '1');
                            }
                        });
                    }
                }
            };
            currentScope.gridOptions.getTotalPages = function () {
                if (currentScope.gridOptions.paginationPageSize && currentScope.gridOptions.paginationPageSize != 0 && currentScope.gridOptions.totalItems && currentScope.gridOptions.totalItems != 0) {
                    var total = Math.ceil(currentScope.gridOptions.totalItems / currentScope.gridOptions.paginationPageSize);
                    if (total != currentScope.TotalPages) {
                        currentScope.TotalPages = total;
                    }
                    return total;
                }
            }
            if (idliste)
                currentScope.gridOptions.columnDefs = gridSetting.getColumnDefs(idliste);

            currentScope.gridOptions.enablePaginationControls = defaultGridDefs.gridOptions.enablePaginationControls;
            currentScope.gridOptions.showGridFooter = defaultGridDefs.gridOptions.showGridFooter;
            currentScope.gridOptions.paginationPageSizes = defaultGridDefs.gridOptions.paginationPageSizes;
            currentScope.gridOptions.paginationPageSize = defaultGridDefs.gridOptions.paginationPageSize;
            currentScope.gridOptions.useExternalPagination = defaultGridDefs.gridOptions.useExternalPagination;
            currentScope.gridOptions.useExternalSorting = defaultGridDefs.gridOptions.useExternalSorting;
            currentScope.gridOptions.enableSelectAll = defaultGridDefs.gridOptions.enableSelectAll;
            currentScope.gridOptions.enableFullRowSelection = defaultGridDefs.gridOptions.enableFullRowSelection;
            currentScope.gridOptions.selectionRowHeaderWidth = defaultGridDefs.gridOptions.selectionRowHeaderWidth;
            currentScope.gridOptions.enableRowSelection = defaultGridDefs.gridOptions.enableRowSelection;
            currentScope.gridOptions.enableGroupHeaderSelection = defaultGridDefs.gridOptions.enableGroupHeaderSelection;
            currentScope.gridOptions.enableSelectionBatchEvent = defaultGridDefs.gridOptions.enableSelectionBatchEvent;
            currentScope.gridOptions.hasSelection = defaultGridDefs.hasSelection;
            currentScope.gridOptions.paginationOptions = defaultGridDefs.paginationOptions;

            if (specificDefs) {
                if (specificDefs.gridOptions) {
                    currentScope.gridOptions.enablePaginationControls = specificDefs.gridOptions.enablePaginationControls != undefined ? specificDefs.gridOptions.enablePaginationControls : defaultGridDefs.gridOptions.enablePaginationControls;
                    currentScope.gridOptions.showGridFooter = specificDefs.gridOptions.showGridFooter ? specificDefs.gridOptions.showGridFooter : defaultGridDefs.gridOptions.showGridFooter;
                    currentScope.gridOptions.paginationPageSizes = specificDefs.gridOptions.paginationPageSizes ? specificDefs.gridOptions.paginationPageSizes : defaultGridDefs.gridOptions.paginationPageSizes;
                    currentScope.gridOptions.paginationPageSize = specificDefs.gridOptions.paginationPageSize ? specificDefs.gridOptions.paginationPageSize : defaultGridDefs.gridOptions.paginationPageSize;
                    currentScope.gridOptions.useExternalPagination = specificDefs.gridOptions.useExternalPagination ? specificDefs.gridOptions.useExternalPagination : defaultGridDefs.gridOptions.useExternalPagination;
                    currentScope.gridOptions.useExternalSorting = specificDefs.gridOptions.useExternalSorting ? specificDefs.gridOptions.useExternalSorting : defaultGridDefs.gridOptions.useExternalSorting;
                    currentScope.gridOptions.enableSelectAll = specificDefs.gridOptions.enableSelectAll ? specificDefs.gridOptions.enableSelectAll : defaultGridDefs.gridOptions.enableSelectAll;
                    currentScope.gridOptions.enableFullRowSelection = specificDefs.gridOptions.enableFullRowSelection ? specificDefs.gridOptions.enableFullRowSelection : defaultGridDefs.gridOptions.enableFullRowSelection;
                    currentScope.gridOptions.selectionRowHeaderWidth = specificDefs.gridOptions.selectionRowHeaderWidth ? specificDefs.gridOptions.selectionRowHeaderWidth : defaultGridDefs.gridOptions.selectionRowHeaderWidth;
                    currentScope.gridOptions.enableRowSelection = specificDefs.gridOptions.enableRowSelection ? specificDefs.gridOptions.enableRowSelection : defaultGridDefs.gridOptions.enableRowSelection;
                    currentScope.gridOptions.enableGroupHeaderSelection = specificDefs.gridOptions.enableGroupHeaderSelection ? specificDefs.gridOptions.enableGroupHeaderSelection : defaultGridDefs.gridOptions.enableGroupHeaderSelection;
                    currentScope.gridOptions.enableSelectionBatchEvent = specificDefs.gridOptions.enableSelectionBatchEvent ? specificDefs.gridOptions.enableSelectionBatchEvent : defaultGridDefs.gridOptions.enableSelectionBatchEvent;
                    currentScope.gridOptions.hasSelection = specificDefs.gridOptions.hasSelection ? specificDefs.gridOptions.hasSelection : defaultGridDefs.hasSelection;
                    currentScope.gridOptions.paginationOptions = specificDefs.gridOptions.paginationOptions ? specificDefs.gridOptions.paginationOptions : defaultGridDefs.paginationOptions;
                    currentScope.gridOptions.columnDefs = specificDefs.gridOptions.columnDefs != undefined ? specificDefs.gridOptions.columnDefs : currentScope.gridOptions.columnDefs;
                }
                if (specificDefs.columnDefsAppend) {
                    if (!currentScope.gridOptions.columnDefs)
                        currentScope.gridOptions.columnDefs = [];
                    for (var i = 0; i < specificDefs.columnDefsAppend.length; i++) {
                        currentScope.gridOptions.columnDefs.push({ pinnedRight: true, width: 80, cellTemplate: specificDefs.columnDefsAppend[i].cellTemplate, visible: specificDefs.columnDefsAppend[i].isvisible, displayName: specificDefs.columnDefsAppend[i].nomchamp, name: specificDefs.columnDefsAppend[i].nomchamp, field: specificDefs.columnDefsAppend[i].nomchamp });
                    }
                }

                if (specificDefs.columnDefs) {
                    currentScope.gridOptions.columnDefs = [];
                    for (var i = 0; i < specificDefs.columnDefs.length; i++) {
                        currentScope.gridOptions.columnDefs.push({ name: specificDefs.columnDefs[i].nomchamp, field: specificDefs.columnDefs[i].nomchamp, width: specificDefs.columnDefs[i].width
                        });
                    }
                }

                //if (specificDefs.ids != null) {

                //    alert('test')
                //    //alert(JSON.stringify(currentScope.gridOpts.data))
                //    for (var i = 0 ; i < currentScope.gridOpts.data.length; i++) {
                //        alert(JSON.stringify(currentScope.gridOpts.data[i].id))
                //        if (specificDefs.ids[currentScope.gridOpts.data[i].id]) {
                //            currentScope.gridApi.selection.selectRow(currentScope.gridOpts.data[i]);
                //        }
                //    }
                //}
            }

            if (currentScope.rowTemplate != undefined)
                currentScope.gridOptions.rowTemplate = currentScope.rowTemplate;
            else {
                currentScope.gridOptions.rowTemplate = '<div style="color: {{row.entity.ColorCritere}};" >' +
                         '  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                         '</div>';
            }



        }
        getData(currentScope, currentScope.dataProviderUrl, currentScope.paginationOptions);

    }

    function getData(currentScope, dataProviderUrl, pOptions) {
        getData$lastSort(currentScope, currentScope.gridOptions, dataProviderUrl, pOptions, '1');
    }

    function getData$lastSort(currentScope, gridOptions, dataProviderUrl, pOptions, lastSort) {
        currentScope.loadingIndicator = true;
        var pagurl = (pOptions.pageNumber -1) + '/' + pOptions.pageSize + '/' + lastSort;
        switch (pOptions.sort) {
            case 'asc':
                pagurl += '/ASC';
                break;
            case 'desc':
                pagurl += '/DESC';
                break;
            default:
                pagurl += '/ASC';
                break;
        }


        var url = '';
        if (dataProviderUrl.indexOf('##paging-params##') != -1) {
            url = dataProviderUrl.replace('##paging-params##', pagurl);
        }
        else {
            url = dataProviderUrl + pagurl;
        }

        $http.get(url)
        .success(function (data) {
                gridOptions.totalItems =  data.Rowcount;
                gridOptions.data = data.Results;
            })
        .finally(function () {
            currentScope.loadingIndicator = false;
            $rootScope.$broadcast('DataGridCompleted');
        });
    }
}]);


app.factory('gridSetting', ['storageService', function ( storageService) {

    return {
        getColumnDefs: function (idGrid) {
            var columnDefs = [];
            // When dynamic a column is not named (d.nomchamp == null), then replace by default labels
            if (storageService.get('grid.column.config')) {
                var conf = storageService.get('grid.column.config').find(function (conf) { return conf.idListe == idGrid; });
                var dynCpt = 1;
                for (var i = 0; i < conf.columnDefs.length; i++) {
                    var fieldName = conf.columnDefs[i].nomchamp;
                    var type = conf.columnDefs[i].type_col;

                    //console.log(type);
                        
                    var sname = conf.columnDefs[i].libcolumn;
                    if (fieldName === null) {
                        fieldName = 'DynamicCol_' + dynCpt++;
                    }
                    else {
                        fieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
                    }

                    switch (type) {
                    case "N":
                        columnDefs.push({
                            displayName: sname,
                            name: fieldName,
                            field: fieldName,
                            width: conf.columnDefs[i].width,
                            cellFilter: 'number: 2',
                            cellClass: 'grid-align-right'

                        });
                        break;
                    case "I":
                        columnDefs.push({
                            displayName: sname,
                            name: fieldName,
                            field: fieldName,
                            width: conf.columnDefs[i].width,
                            cellFilter: 'number',
                            cellClass: 'grid-align-right'
                        });
                        break;
                    case "D":
                        columnDefs.push({
                            displayName: sname,
                            name: fieldName,
                            field: fieldName,
                            width: conf.columnDefs[i].width,
                            cellFilter: 'date:\'yyyy-MM-dd\'',
                            cellClass: 'grid-align-right'
                        });
                        break;
                    default:
                        columnDefs.push({
                            displayName: sname,
                            name: fieldName,
                            field: fieldName,
                            width: conf.columnDefs[i].width
                        });
                    }
                }
                //for(var d of conf.columnDefs)
                //{
                //    var fieldName = d.nomchamp;
                //    if (fieldName === null)
                //        fieldName = 'DynamicCol_'+dynCpt++;
  
                //    columnDefs.push({ name: fieldName, field: fieldName, width: d.width });
                //}
                // Test series because real column specification doesn't match with grid data 
                // TODO : find right idliste for each grid
                //columnDefs.push({ name: 'Npiece', field: 'Npiece' });
                //columnDefs.push({ name: 'Numcomptable', field: 'Numcomptable' });
                //columnDefs.push({ name: 'Montant', field: 'Montant', width:100 });
            }
            return columnDefs;
        }
}

}]);


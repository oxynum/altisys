(function () {
    'use strict';
 
    var app = angular.module('appRouteAccueil')
    app.controller('designerV2Controller', ['$rootScope', '$scope', 'config', '$location', '$http', 'reportService', 'reportVarService', 'stiDesignerOptionsService', function ($rootScope, $scope, config, $location, $http, reportService, reportVarService, stiDesignerOptionsService) {

        console.log('designerV2Controller');

        console.log('Loading Designer view');

        //Handler for DBMS
        StiOptions.WebServer.url = config.urlV1 + 'Handlers/Handler.aspx';
        console.log('StiOptions.WebServer.url' + StiOptions.WebServer.url);

        var loadVars = function () {
            console.log('loadVars');
            //load report vars
            var reportVars = reportVarService.get();

            console.log(JSON.stringify(reportVars));
            //console.log('report.dictionary.variables.list: ' + report.dictionary.variables.list);
            //console.log('report.dictionary.variables.list.length: ' + report.dictionary.variables.list.length);

            // Warning, by convention vars from reports must always be named with the same name. Todo choose right names
            // Change the variables values
            report.dictionary.variables.list.forEach(function (item, i, arr) {
                console.log('item.name: ' + item.name);
                switch (item.name) {
                    case 'fid':
                        var fidList = JSON.stringify(reportVars.fid);
                        fidList = fidList.replace('[', '(');
                        fidList = fidList.replace(']', ')');
                        item.valueObject = fidList; break;
                    case 'societe':
                        item.valueObject = reportVars.societe; break;
                    case 'numcomptable':
                        item.valueObject = reportVars.numcomptable; break;
                }
            });
        }

        var loadLocal = function () {
            console.log('loadLocal');
            //Localization of GUI in Reports.JS
            Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile("localization/fr.xml"); //
        }

        var assignAndRenderReport = function () {
            console.log('assignAndRenderReport');

            console.log('Edit report template in the designer');
            designer.report = report;

            console.log('Rendering the designer to selected element');
            designer.renderHtml('designer');

            console.log('Loading completed successfully!');
        }

        //var options = new Stimulsoft.Designer.StiDesignerOptions();

        //load Altisys options.
        var options = stiDesignerOptionsService.get();

        console.log('stiDesignerOptionsService');
        console.log(options);

        console.log('Create the report designer with specified options');
        var designer = new Stimulsoft.Designer.StiDesigner(options, 'StiDesigner', false);

        console.log('Create a new report instance');
        var report = new Stimulsoft.Report.StiReport();

        $scope.altisysReport = reportService.get();

        console.log('$scope.altisysReport.familyId:' + $scope.altisysReport.familyId);

        if ($scope.altisysReport.id) { //existing report
            console.log('altisysReport id:');
            console.log($scope.altisysReport.id);


            if ($scope.altisysReport.value) { //dirty so reload with previous temporary modification
                console.log('Load report from report service with previous temporary modification');
                report.load($scope.altisysReport.value);

                loadVars();
                loadLocal();
                assignAndRenderReport();
            }
            else { //never modify

                $http({
                    method: 'GET',
                    url: config.url + '/Report/GetCourrier/' + $scope.altisysReport.id
                })
                    .success(function (data) {
                        //altisysReport.value = data;
                        console.log('Load report from WebAPI');
                        report.load(data);
                        console.log('Loaded !');

                        loadVars();
                        loadLocal();
                        assignAndRenderReport();
                    });
            }
        }
        else if ($scope.altisysReport.toSaveInDB) { // New report to save into DB

            //get id template 
            var idTemplate = $location.search().idTemplate;

            //get template for datasource
            $http({
                method: 'GET',
                url: config.url + '/Report/GetReportTemplate/' + idTemplate
            })
                .success(function (data) {
                    var sr = new Stimulsoft.Report.StiReport();
                    console.log('Load id template from WebAPI');
                    sr.load(data);
                    console.log('Loaded !');

                    report.dictionary = sr.dictionary
                    console.log('Datasource copied');


                    report.dictionary.databases.clear();

                    //todo retrieve by config.prod
                    //Set connection string by code
                    var newConnectionString = "Integrated Security=False; Data Source=polarisvm01;Initial Catalog=151; User ID=sa; Password=IDP3Geny;";
                    report.dictionary.databases.add(new Stimulsoft.Report.Dictionary.StiSqlDatabase("Connection", "AliasConnection", newConnectionString));
                     
                    loadLocal();
                    assignAndRenderReport();

                    //////////////////////////////////////
                    //manual add test
                    //////////////////////////////////////

                    ////Add DataSources: //todo retrieve by template selected
                    //    //StiSqlSource(nameInSource:String, name:String, alias:String, sqlCommand:String, connectOnStart:Boolean = true, reconnectOnEachRow:Boolean = false, commandTimeout:int = 30)
                    //var ds1 = new Stimulsoft.Report.Dictionary.StiSqlSource("Connection", "DS1", "AliasDS1", "select * from v_courrier_standard  where clt_societe= '{societe}' and clt_numcomptable = '{numcomptable}' and factures_id in {fid}", true, false, 600);
                    //var ds2 = new Stimulsoft.Report.Dictionary.StiSqlSource("Connection", "DS2", "AliasDS2", "select * from v_courrier_standard  where clt_societe= '{societe2}' and clt_numcomptable = '{numcomptable}' and factures_id in {fid}", true, false, 600);

                    //// todo retrieve by template selected
                    //// add columns
                    //                                              // StiDataColumn(nameInSource:String = Column, name:String = Column, alias:String = Column, type:int = 18)
                    //ds1.columns.add(new Stimulsoft.Report.Dictionary.StiDataColumn("clt_raisonsociale", "clt_raisonsociale", "raisonsociale"));
                    //ds1.columns.add(new Stimulsoft.Report.Dictionary.StiDataColumn("clt_societe", "societe", "societe"));
                    //ds1.columns.add(new Stimulsoft.Report.Dictionary.StiDataColumn("clt_numcomptable", "numcomptable", "numero_comptable"));

                    //ds2.columns.add(new Stimulsoft.Report.Dictionary.StiDataColumn("clt_raisonsociale", "clt_raisonsociale", "raisonsociale2"));

                    //report.dictionary.dataSources.add(ds1);
                    //report.dictionary.dataSources.add(ds2);

                    ////add vars //todo from WebAPI

                    //                                          //StiVariable(category:String, name:String, alias:String, type:int = 18, value:String, readOnly:Boolean = false, initBy:int = 0, requestFromUser:Boolean = false, dialogInfo:StiDialogInfo = null, key:String = null, allowUseAsSqlParameter:Boolean = false, selection:int = 0)
                    //var var1 = new Stimulsoft.Report.Dictionary.StiVariable();
                    //var1.name = "societe";
                    //var1.alias = "societe";
                    //report.dictionary.variables.add(var1);

                    ////Add Relations: 
                    //var dataRelation = new Stimulsoft.Report.Dictionary.StiDataRelation("MyRelation", parentDS, childDS, new string[] { "Field" }, new string[] { "Field" }); 
                    //report.dictionary.regRelations(); 
                    //report.dictionary.relations.add(dataRelation);

                });



        }
        else if ($location.search().status == 'dirty') {
            //get id template 
            var idTemplate = $location.search().idTemplate;
            //get id template 
            var status = $location.search().status;

            console.log('status: ' + status);

            $http({
                method: 'GET',
                url: config.url + '/Report/GetReportTemplate/' + idTemplate
            })
                .success(function (data) {
                    //altisysReport.value = data;
                    console.log('Load report from WebAPI');
                    report.load(data);
                    console.log('Loaded !');

                    loadVars();
                    loadLocal();
                    assignAndRenderReport();
                });
        }


            

        // Assign the onSaveReport event function
        designer.onSaveReport = function (e) {
            console.log('onSaveReport');

            console.log('$scope.altisysReport.familyId:' + $scope.altisysReport.familyId);

            //save the report
            var jsonStr = e.report.saveToJsonString();
            console.log(jsonStr);

            if ($scope.altisysReport.id) { //existing report
                if ($scope.altisysReport.toSaveInDB) { // modification into DB
                    reportService.set($scope.altisysReport.id, $scope.altisysReport.name, jsonStr, $scope.altisysReport.familyId, true);

                    console.log('UpdateReport:' + $scope.altisysReport.name);
                    $http({
                        method: 'POST',
                        url: config.url + '/Report/UpdateReport',
                        data: JSON.stringify($scope.altisysReport),
                        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
                    })
                    .success(function (data, status, headers, config) {
                        console.log('Success');
                        relocate('/admin');
                    })
                    .error(function (data, status, header, config) {
                        console.log('error');
                    });
                }
                else { //temporary modification
                    reportService.set($scope.altisysReport.id, $scope.altisysReport.name, jsonStr, $scope.altisysReport.familyId, false);
                    relocate('/reportViewerV2');
                }
            }
            else if ($scope.altisysReport.toSaveInDB) { //new report to put into DB
                reportService.set(null, $scope.altisysReport.name, jsonStr, $scope.altisysReport.familyId, true);
                $http({
                    method: 'POST',
                    url: config.url + '/Report/AddReport',
                    data: JSON.stringify($scope.altisysReport),
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
                })
                .success(function (data, status, headers, config) {
                    console.log('Success');
                    relocate('/admin');
                })
                .error(function (data, status, header, config) {
                    console.log('error');
                });
            }
        }

        var relocate = function (path) {
            console.log('relocate:' + path);
            var societe = $location.search().societe;
            var numcomptable = $location.search().numcomptable;
            if (societe && numcomptable) {
                if (path == '/admin') {//TEMP DEMO
                    $location.path(path).search({ societe: window.encodeURIComponent(societe), numcomptable: window.encodeURIComponent(numcomptable) });
                }
                else {
                    $rootScope.$apply(function () {
                        $location.path(path).search({ societe: window.encodeURIComponent(societe), numcomptable: window.encodeURIComponent(numcomptable) });
                    });
                }
            }
            else {
                if (path == '/admin') {//TEMP DEMO
                    $location.path(path);
                }
                else {
                    $rootScope.$apply(function () {
                        $location.path(path).search({ societe: window.encodeURIComponent(societe), numcomptable: window.encodeURIComponent(numcomptable) });
                    });
                }
            }
        }

        // Assign the onCreateReport event function
        designer.onCreateReport = function (e) {
            console.log('onCreateReport');
            //var ds = new Stimulsoft.System.Data.DataSet("Demo");
            //ds.readJsonFile("../reports/Demo.json");
            //e.report.regData("Demo", "Demo", ds);
        }

        // Assign the onPreviewReport event function
        designer.onPreviewReport = function (e) {
            console.log('onPreviewReport');
            //switch (e.format) {
            //    case Stimulsoft.Report.StiExportFormat.Html:
            //        e.settings.zoom = 2; // Set HTML zoom factor to 200%
            //        break;
            //}
        }

        // Assign the onExit event function
        designer.onExit = function (e) {
            console.log('onExit');
        }
        

    }]);
}());
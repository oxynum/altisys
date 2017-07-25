(function () {
    'use strict';
 
    var app = angular.module('appRouteAccueil')
    app.controller('designerV2TemplateController', ['$rootScope', '$scope', 'config', '$location', '$http', 'stiDesignerTemplateOptionsService', function ($rootScope, $scope, config, $location, $http, stiDesignerTemplateOptionsService) {

        //designerV2TemplateController: save datasource template for injection into reports.
        console.log('designerV2TemplateController');

        $scope.templateName = window.decodeURIComponent($location.search().templateName);
        console.log('$scope.templateName:' + $scope.templateName);


        var loadLocal = function () {
            console.log('loadLocal');
            //Localization of GUI in Reports.JS
            Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile("localization/fr.xml"); //
        }

        var assignAndRenderReport = function () {
            console.log('assignAndRenderReport');

            console.log('Edit report template in the templateDesigner');
            templateDesigner.report = report;

            console.log('Rendering the templateDesigner to selected element');
            templateDesigner.renderHtml('designer');

            console.log('Loading completed successfully!');
        }

        var relocate = function () {
            console.log('relocate'); {
                    $location.path('/admin');
            }
        }
        
        //Handler for DBMS
        StiOptions.WebServer.url = config.urlV1 + 'Handlers/Handler.aspx';
        console.log('StiOptions.WebServer.url' + StiOptions.WebServer.url);
                        
        //load Altisys options.
        var options = stiDesignerTemplateOptionsService.get();
            
        console.log('stiDesignerTemplateOptionsService');
        console.log(options);

        console.log('Create the report templateDesigner with specified options');
        var templateDesigner = new Stimulsoft.Designer.StiDesigner(options, 'StiTemplateDesigner', false);

        console.log('Create a new report instance');
        var report = new Stimulsoft.Report.StiReport();

        //todo retrieve by config.prod
        var newConnectionString = "Integrated Security=False; Data Source=polarisvm01;Initial Catalog=151; User ID=sa; Password=IDP3Geny;"; 
        report.dictionary.databases.add(new Stimulsoft.Report.Dictionary.StiSqlDatabase("Connection", "AliasConnection", newConnectionString));



        ////TEST

        ////report
        console.log('report');
        console.log(report);
                
        ////dictionary
        console.log('report.dictionary');
        console.log(report.dictionary);
                
        ////databases
        //console.log('report.dictionary.databases');
        //console.log(report.dictionary.databases);
        //console.log('report.dictionary.databases.count');
        //console.log(report.dictionary.databases.count);

        //console.log('report.dictionary.databases.getByIndex(0)');
        //console.log(report.dictionary.databases.getByIndex(0));
        //console.log('report.dictionary.databases.getByIndex(0).name');
        //console.log(report.dictionary.databases.getByIndex(0).name);
        //console.log('report.dictionary.databases.getByIndex(0).alias');
        //console.log(report.dictionary.databases.getByIndex(0).alias);
        //console.log('report.dictionary.databases.getByIndex(0).connectionString');
        //console.log(report.dictionary.databases.getByIndex(0).connectionString);
        //console.log('report.dictionary.databases.getByIndex(0).connectionStringEncrypted');
        //console.log(report.dictionary.databases.getByIndex(0).connectionStringEncrypted);

        //report.dictionary.databases.add(new Stimulsoft.Report.Dictionary.StiSqlDatabase("test_" + report.dictionary.databases.getByIndex(0).name, "test_" + report.dictionary.databases.getByIndex(0).alias, report.dictionary.databases.getByIndex(0).connectionString));
                
        ////END TEST

        //Add DataSources: //todo retrieve by template selected
            //StiSqlSource(nameInSource:String, name:String, alias:String, sqlCommand:String, connectOnStart:Boolean = true, reconnectOnEachRow:Boolean = false, commandTimeout:int = 30)
        var ds1 = new Stimulsoft.Report.Dictionary.StiSqlSource("Connection", "DS1", "AliasDS1", "select * from v_courrier_standard  where clt_societe= '{societe}' and clt_numcomptable = '{numcomptable}' and factures_id in {fid}", true, false, 600);
                 
        // retrieve into designer by interface button "retrieve columns"
        // add columns
        //                                                // StiDataColumn(nameInSource:String = Column, name:String = Column, alias:String = Column, type:int = 18)
        //ds1.columns.add(new Stimulsoft.Report.Dictionary.StiDataColumn("clt_raisonsociale", "clt_raisonsociale", "raisonsociale"));
        //ds1.columns.add(new Stimulsoft.Report.Dictionary.StiDataColumn("clt_societe", "societe", "societe"));
        //ds1.columns.add(new Stimulsoft.Report.Dictionary.StiDataColumn("clt_numcomptable", "numcomptable", "numero_comptable"));

        report.dictionary.dataSources.add(ds1);

        //add vars //todo from WebAPI                	
                                                    //StiVariable(category:String, name:String, alias:String, type:int = 18, value:String, readOnly:Boolean = false, initBy:int = 0, requestFromUser:Boolean = false, dialogInfo:StiDialogInfo = null, key:String = null, allowUseAsSqlParameter:Boolean = false, selection:int = 0)
        var var1 = new Stimulsoft.Report.Dictionary.StiVariable();
        var1.name = "societe";
        var1.alias = "societe";
        report.dictionary.variables.add(var1);

        var var2 = new Stimulsoft.Report.Dictionary.StiVariable();
        var2.name = "numcomptable";
        var2.alias = "numero_comptable";
        report.dictionary.variables.add(var2);

        var var3 = new Stimulsoft.Report.Dictionary.StiVariable();
        var3.name = "fid";
        var3.alias = "facture_id";
        report.dictionary.variables.add(var3);
                                
        ////Add Relations: 
        //var dataRelation = new Stimulsoft.Report.Dictionary.StiDataRelation("MyRelation", parentDS, childDS, new string[] { "Field" }, new string[] { "Field" }); 
        //report.dictionary.regRelations(); 
        //report.dictionary.relations.add(dataRelation);

        loadLocal();
        assignAndRenderReport();
        // Assign the onSaveReport event function
        templateDesigner.onSaveReport = function (e) {
            console.log('onSaveReport');

            //save the report
            var jsonStr = e.report.saveToJsonString();
            console.log(jsonStr);

            var report = {
                name: $scope.templateName,
                value: jsonStr
            }

            $http({
                method: 'POST',
                url: config.url + '/Report/AddTemplate', //TODO 
                data: JSON.stringify(report),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            })
            .success(function (data, status, headers, config) {
                console.log('Success');
                relocate();
            })
            .error(function (data, status, header, config) {
                console.log('error');
            });
        }



        // Assign the onCreateReport event function
        templateDesigner.onCreateReport = function (e) {
            console.log('onCreateReport');
            //var ds = new Stimulsoft.System.Data.DataSet("Demo");
            //ds.readJsonFile("../reports/Demo.json");
            //e.report.regData("Demo", "Demo", ds);
        }

    }]);
}());
(function (app) {
    'use strict';

    app.factory('stiDesignerOptionsService', function () {

        return {
            //Altisys default values
            get: function () {
                var options = new Stimulsoft.Designer.StiDesignerOptions();


                console.log(options);
                /////////////////////////
                // Appearance
                /////////////////////////

                //A default value of unit in the designer.
                //      It has the following values:
                //          Stimulsoft.Report.StiReportUnitType.Centimeters,
                //          Stimulsoft.Report.StiReportUnitType. HundredthsOfInch,
                //          Stimulsoft.Report.StiReportUnitType. Inches,
                //          Stimulsoft.Report.StiReportUnitType. Millimeters
                options.appearance.defaultUnit = Stimulsoft.Report.StiReportUnitType. Centimeters;                


                //The type of the designer interface.
                //      It has the following values: 
                //          Stimulsoft.Designer. StiInterfaceType.Auto,
                //          Stimulsoft.Designer. StiInterfaceType.Mouse,
                //          Stimulsoft.Designer. StiInterfaceType.Touch
                options.appearance.interfaceType = Stimulsoft.Designer. StiInterfaceType.Auto;

                //Show menu animation for designer
                options.appearance.showAnimation =true;

                //Displays the dialog to enter the name of the report when it is saved
                options.appearance.showSaveDialog = false;

                //Displays tips for the designer controls when hovering the mouse
                options.appearance.showTooltips = true;

                //Displays a link to the online documentation on the tips                                
                options.appearance.showTooltipsHelp =true;

                //Sets the full screen mode of the report designer. If set to =true; then width and height are ignored
                options.appearance.fullScreenMode = false;
                                

                /////////////////////////
                //Toolbar
                /////////////////////////    
                
                //Shows/hides the Page button in the toolbar of the designer
                options.toolbar.showPageButton=true;

                //Shows/hides the Preview button in the toolbar of the designer
                options.toolbar.showPreviewButton == true;
                
                //Shows/hides the Save button in the toolbar of the designer
                options.toolbar.showSaveButton = true;

                //Shows/hides the About button in the toolbar of the designer
                options.toolbar.showAboutButton =true;
                
                //Shows/hides the file menu of the designer
                options.toolbar.showFileMenu = true;

                //Shows/hides the New item in the file menu of the designer                
                options.toolbar.showFileMenuNew = true;

                //Shows/hides the Open item in the file menu of the designer               
                options.toolbar.showFileMenuOpen =true;

                //Shows/hides the Save item in the file menu of the designer                
                options.toolbar.showFileMenuSave = true;

                //Shows/hides the Close item in the file menu of the designer               
                options.toolbar.showFileMenuClose = true;

                //Shows/hides the Exit item in the file menu of the designer               
                options.toolbar.showFileMenuExit = true;

                //Shows/hides the Report Setup item in the file menu of the designer               
                options.toolbar.showFileMenuReportSetup =true;

                //Shows/hides the Options item in the file menu of the designer                
                options.toolbar.showFileMenuOptions = true;

               


                /////////////////////////
                //Bands
                /////////////////////////

                //Shows/hides the ReportTitleBand item in the bands menu of the designer
                options.bands.showReportTitleBand=true;
                
                //Shows/hides the ReportSummaryBand item in the bands menu of the designer
                options.bands.showReportSummaryBand=true;
                
                //Shows/hides the PageHeaderBand item in the bands menu of the designer
                options.bands.showPageHeaderBand =true;
               
                //Shows/hides the PageFooterBand item in the bands menu of the designer
                options.bands.showPageFooterBand =true;
               
                //Shows/hides the GroupHeaderBand item in the bands menu of the designer
                options.bands.showGroupHeaderBand =true;
               
                //Shows/hides the HeaderBand item in the bands menu of the designer
                options.bands.showHeaderBand=true;
                
                //Shows/hides the FooterBand item in the bands menu of the designer
                options.bands.showFooterBand=true;
                
                //Shows/hides the ColumnHeaderBand item in the bands menu of the designer
                options.bands.showColumnHeaderBand =true;
               
                //Shows/hides the ColumnFooterBand item in the bands menu of the designer
                options.bands.showColumnFooterBand=true;
                
                //Shows/hides the DataBand item in the bands menu of the designer
                options.bands.showDataBand=true;
                
                //Shows/hides the HierarchicalBand item in the bands menu of the designer
                options.bands.showHierarchicalBand =true;
               
                //Shows/hides the ChildBand item in the bands menu of the designer
                options.bands.showChildBand=true;
                
                //Shows/hides the EmptyBand item in the bands menu of the designer
                options.bands.showEmptyBand=true;
                
                //Shows/hides the OverlayBand item in the bands menu of the designer
                options.bands.showOverlayBand =true;
               
                //Shows/hides the Table item in the bands menu of the designer
                options.bands.showTable=true;
                

                /////////////////////////
                //Cross-Bands
                /////////////////////////

                //Shows/hides the CrossTab item in the cross bands menu of the designer
                options.crossBands.showCrossTab = false;
                
                //Shows/hides the CrossGroupHeaderBand item in the cross bands menu of the designer
                options.crossBands.showCrossGroupHeaderBand = false;
                
                //Shows/hides the CrossGroupFooterBand item in the cross bands menu of the designer
                options.crossBands.showCrossGroupFooterBand = false;
                
                //Shows/hides the CrossHeaderBand item in the cross bands menu of the designer
                options.crossBands.showCrossHeaderBand = false;
                
                //Shows/hides the CrossFooterBand item in the cross bands menu of the designer
                options.crossBands.showCrossFooterBand = false;
                
                //Shows/hides the CrossDataBand item in the cross bands menu of the designer
                options.crossBands.showCrossDataBand = false;
               

                /////////////////////////
                //Components
                /////////////////////////

                //Shows/hides the Text item in the components menu of the designer
                options.components.showText = true;

                //Shows/hides the TextInCells item in the components menu of the designer
                options.components.showTextInCells=false;
                
                //Shows/hides the RichText item in the components menu of the designer
                options.components.showRichText=false;
                
                //Shows/hides the Image item in the components menu of the designer
                options.components.showImage=true;
                
                //Shows/hides the BarCode item in the components menu of the designer
                options.components.showBarCode =false;
               
                //Shows/hides the Shape item in the components menu of the designer
                options.components.showShape =true;
               
                //Shows/hides the Panel item in the components menu of the designer
                options.components.showPanel =true;
               
                //Shows/hides the Clone item in the components menu of the designer
                options.components.showClone=false;
                
                //Shows/hides the CheckBox item in the components menu of the designer
                options.components.showCheckBox =true;
               
                //Shows/hides the SubReport item in the components menu of the designer
                options.components.showSubReport =true;
               
                //Shows/hides the ZipCode item in the components menu of the designer
                options.components.showZipCode=false;
                
                //Shows/hides the Chart item in the components menu of the designer
                options.components.showChart=true;
                

                /////////////////////////
                //Dictionary
                /////////////////////////
                //Almost all options described below can take the following values:
                //Stimulsoft.Designer.StiDesignerPermissions.None - deny all;
                //Stimulsoft.Designer.StiDesignerPermissions.Create – allows creating an item;
                //Stimulsoft.Designer.StiDesignerPermissions.Delete – allows deleting an item;
                //Stimulsoft.Designer.StiDesignerPermissions.Modify – allows modifying an item;
                //Stimulsoft.Designer.StiDesignerPermissions.View – allows viewing an item;
                //Stimulsoft.Designer.StiDesignerPermissions.ModifyView – allows modifying and viewing an item  (Modify + View);
                //Stimulsoft.Designer.StiDesignerPermissions.All – allows any action with the item (Create + Delete + Modify + View).
                /////////////////////////

                //Shows/hides the dictionary in the designer
                options.dictionary.showDictionary = true;

                //A value of permissions for data sources in the designer
                options.dictionary.dataSourcesPermissions = Stimulsoft.Designer.StiDesignerPermissions.All;
                //A value of connections for data sources in the designer
                options.dictionary.dataConnectionsPermissions = Stimulsoft.Designer.StiDesignerPermissions.All;
                //A value of connections for columns in the designer
                options.dictionary.dataColumnsPermissions = Stimulsoft.Designer.StiDesignerPermissions.All;
                //A value of connections for relations in the designer 
                options.dictionary.dataRelationsPermissions = Stimulsoft.Designer.StiDesignerPermissions.All;
                //A value of connections for business objects in the designer
                options.dictionary.businessObjectsPermissions = Stimulsoft.Designer.StiDesignerPermissions.All;
                //A value of connections for variables in the designer
                options.dictionary.variablesPermissions = Stimulsoft.Designer.StiDesignerPermissions.All;

                return options;
            }
        };
    });
})(angular.module('appMain'));
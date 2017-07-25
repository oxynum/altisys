(function (app) {
    'use strict';

    app.factory('stiViewerOptionsService', function () {

        return {
            //Altisys default values
            get: function () {
                var options = new Stimulsoft.Viewer.StiViewerOptions();

                /////////////////////////
                // Appearance
                /////////////////////////
                //        Changes the background color of the viewer 
                options.appearance.backgroundColor = Stimulsoft.System.Drawing.Color.white;
                //        Sets the border color of report pages
                options.appearance.pageBorderColor = Stimulsoft.System.Drawing.Color.gray;
                //        Sets the Right to Left mode for viewer controls
                options.appearance.rightToLeft = false;
                //        Sets the full screen mode of the report viewer. If set to true, then the width and height are ignored
                options.appearance.fullScreenMode = false;
                //        Sets the mode of displaying the report viewer without scroll bars or with them
                options.appearance.scrollbarsMode = false;
                //        Target window to open the link contained in the report
                options.appearance.openLinksTarget = "_self";
                //        Target window to open the export file from the viewer
                options.appearance.openExportedReportTarget = "_blank";
                //        Displays tips for the viewer controls when hovering the mouse
                options.appearance.showTooltips = true;
                //        Sets the position of the report page in the viewer window. 
                            // Possible StiContentAlignment :
                                //  Stimulsoft.Viewer.StiContentAlignment.Left – the page is aligned by the left side of the viewer;
                                //  Stimulsoft.Viewer.StiContentAlignment.Center – the page is aligned by the center;
                                //  Stimulsoft.Viewer.StiContentAlignment.Right – the page will be aligned by the right side of the viewer.
                options.appearance.pageAlignment = Stimulsoft.Viewer.StiContentAlignment.Center;

                //        Hides the report page shadow
                options.appearance.showPageShadow = true;
                //        Prints report bookmarks on the printer (in addition to the report)
                options.appearance.bookmarksPrint = false;
                //        Sets the width of the bookmark panel in pixels
                options.appearance.bookmarksTreeWidth = 180;
                //        Sets the maximum height of the parameter panel in pixels
                options.appearance.parametersPanelMaxHeight = 300;
                //        Sets the number of columns for showing report parameters
                options.appearance.parametersPanelColumnsCount = 2;
                //        Sets the date format and time for variables of the corresponding type on the parameters panel
                options.appearance.parametersPanelDateFormat = "";
                //        Sets the type of the interface viewer.               
                            //Can take the following values:   
                                    //Stimulsoft.Viewer.StiInterfaceType.Auto – the interface type of the report viewer is selected automatically depending on the device used;
                                    //Stimulsoft.Viewer.StiInterfaceType.Mouse – forced use the interface to manage viewer using the mouse device;
                                    //Stimulsoft.Viewer.StiInterfaceType.Touch – force use of the touch interface to manage viewer using the touch screen (mobile devices).
                options.appearance.interfaceType = Stimulsoft.Viewer.StiInterfaceType.Auto;

                //        Sets the type of drawing charts on the report page.
                options.appearance.chartRenderType = Stimulsoft.Viewer.StiChartRenderType.AnimatedVector;
                                //It has the following values: 
                                    //Stimulsoft.Viewer.StiChartRenderType.AnimatedVector – charts are drawn in the vector mode with animation;
                                    //Stimulsoft.Viewer.StiChartRenderType.Vector – charts are drawn as vector images;
                                    //Stimulsoft.Viewer.StiChartRenderType.Image – charts are drawn as images.


                /////////////////////////
                //Toolbar
                /////////////////////////
                //        Shows/hides the toolbar of the report viewer
                options.toolbar.visible = true;
                //        Changes the toolbar color
                options.toolbar.backgroundColor = Stimulsoft.System.Drawing.Color.empty;
                //        Changes the color of the toolbar borders
                options.toolbar.borderColor = Stimulsoft.System.Drawing.Color.empty;
                //        Changes the font color for the toolbar and menu
                options.toolbar.fontColor = Stimulsoft.System.Drawing.Color.empty;
                //        Changes the font family for the toolbar and menu
                options.toolbar.fontFamily = "montserratregular"
                //        Sets the position of the toolbar controls.
                            //Stimulsoft.Viewer.StiContentAlignment.Default – the items are placed depending on the value of the RightToLeft option; 
                            //Stimulsoft.Viewer.StiContentAlignment.Left – the items are aligned by the left side of the toolbar;
                            //Stimulsoft.Viewer.StiContentAlignment.Center – the items are aligned by the center of the toolbar;
                            //Stimulsoft.Viewer.StiContentAlignment.Right – the items are aligned by the right side of the toolbar.
                options.toolbar.alignment = Stimulsoft.Viewer.StiContentAlignment.Default;

                //        Shows/hides the buttons of the viewer toolbar
                options.toolbar.showButtonCaptions = true;
                //        Shows/hides the Print button on the toolbar of the report viewer
                options.toolbar.showPrintButton = true;
                //        Shows/hides the  Save button on the toolbar of the report viewer
                options.toolbar.showSaveButton = true;
                //        Shows/hides the Send Email button  on the toolbar of the report viewer
                options.toolbar.showSendEmailButton = false;
                //        Shows/hides the Bookmarks button on the toolbar of the report viewer. If this button is hidden then the toolbar panel will not be shown even if bookmarks are present in the report.
                options.toolbar.showBookmarksButton = true;
                //        Shows/hides the Parameters button on the toolbar of the report viewer. If this button is hidden then the toolbar panel will not be shown even if bookmarks are present in the report.
                options.toolbar.showParametersButton = true;
                //        Shows/hides the Editor button on the report viewer toolbar. If the report does not have editable components, the button will be hidden regardless of the property value.
                options.toolbar.showEditorButton = true;
                //        Shows/hides the Full Screen button on the toolbar of the report viewer
                options.toolbar.showFullScreenButton = true;
                //        Shows/hides the First Page button on the toolbar of the report viewer
                options.toolbar.showFirstPageButton = true;
                //        Shows/hides the Previous Page button on the toolbar of the report viewer
                options.toolbar.showPreviousPageButton = true;
                //        Shows/hides the indicator of the current report page
                options.toolbar.showCurrentPageControl = true;
                //        Shows/hides the Next Page button on the toolbar of the report viewer
                options.toolbar.showNextPageButton = true;
                //        Shows/hides the Last Page button on the toolbar of the report viewer
                options.toolbar.showLastPageButton = true;
                //        Shows/hides the button for selecting the report zoom
                options.toolbar.showZoomButton = true;
                //        Shows/hides the button for selecting viewing modes of report pages
                options.toolbar.showViewModeButton = true;
                //        Shows/hides the Design button on the toolbar of the report viewer
                options.toolbar.showDesignButton = true;
                //        Shows/hides the About button on the toolbar of the report viewer
                options.toolbar.showAboutButton = true;
                //        Sets the mode of showing report pages.
                        //  Stimulsoft.Viewer.StiWebViewMode.OnePage – shows one page of the report selected in the toolbar of the viewer;
                        //  Stimulsoft.Viewer.StiWebViewMode.WholeReport – displays all report pages at once.
                options.toolbar.viewMode = Stimulsoft.Viewer.StiWebViewMode.OnePage;


                //        This method sets zoom of report pages. By default, it is 100 percent. Values vary from 10 to 500 percent.
                            //You can use the predefined values:
                            //Stimulsoft.Viewer.StiZoomMode.PageWidth – when you run the viewer, the zoom will be set to display the report by the page width.
                            //Stimulsoft.Viewer.StiZoomMode.PageHeight – when you run the viewer, the zoom will be set to display the report by the page height.
                options.toolbar.zoom = 100;


                //        Disables animation when showing/hiding the menu of the report viewer
                options.toolbar.menuAnimation = true;
                //        Sets the mode of showing the menu
                options.toolbar.showMenuMode = Stimulsoft.Viewer.StiShowMenuMode.Click;


                /////////////////////////
                //Exports
                /////////////////////////
               
                //          Shows/hides the export parameters dialog. If the dialog window is disabled then exporting will be processed with the standard settings.
                options.exports.showExportDialog = true;

                //          Shows/hides the menu item Document File
                options.exports.showExportToDocument=true
                
                //          Shows/hides the menu item Adobe PDF File
                options.exports.showExportToPdf = true;
                
                //          Shows/hides the menu item HMTL File
                options.exports.showExportToHtml=true;
                
                //          Shows/hides the menu item Microsoft Word 2007/2010 File.
                options.exports.showExportToWord2007 = true;
                
                //          Shows/hides the menu item Microsoft Excel 2007/2010 File.
                options.exports.showExportToExcel2007 = true;
                               

                return options;
            }
        };
    });
})(angular.module('appMain'));
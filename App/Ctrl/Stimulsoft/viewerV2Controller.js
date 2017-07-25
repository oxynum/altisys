(function () {
    'use strict';

    var app = angular.module('appRouteAccueil');
    app.controller('viewerV2Controller', ['$rootScope', '$scope', 'config', '$location', '$http', 'reportService', 'reportVarService', 'stiViewerOptionsService', function ($rootScope, $scope, config, $location, $http, reportService, reportVarService, stiViewerOptionsService) {

        console.log('viewerV2Controller');

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

            console.log('Assigning report to the viewer, the report will be built automatically after rendering the viewer');
            viewer.report = report;

            console.log('Rendering the viewer to selected element');
            viewer.renderHtml('viewer');

            console.log('Loading completed successfully!');
        }



        //console.log('Creating the report viewer with default options');
        //var viewer = new Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);

            // Enable the design button
        //var options = new Stimulsoft.Viewer.StiViewerOptions();

        //load Altisys options.
        var options = stiViewerOptionsService.get();

        console.log('stiViewerOptionsService');
        //console.log(options);

        // Create the report viewer
        var viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);
        
            // Assign the onGetReportData event function
        viewer.onGetReportData = function (event) {
            console.log('onGetReportData');
            //var ds = new Stimulsoft.System.Data.DataSet("Demo");
            //ds.readJsonFile("../reports/Demo.json");
            //event.report.regData("Demo", "Demo", ds);
        }

            // Assign the onPrintReport event function
        viewer.onPrintReport = function (event) {
            console.log('onPrintReport');
        }

            // Assign the onReportExport event function
        viewer.onEndExportReport = function (event) {
            console.log('onEndExportReport');
            //switch (event.format) {
            //    case Stimulsoft.Report.StiExportFormat.Html:
            //        event.settings.zoom = 2;  // Set HTML zoom factor to 200%
            //        break;
            //}
        }

            // Assign the onReportDesign event function
        viewer.onDesignReport = function (event) {
            console.log("Design button pressed.");
            
            var societe = $location.search().societe;
            var numcomptable = $location.search().numcomptable;
            
            $rootScope.$apply(function () {
                $location.path('/reportDesignerV2').search({ societe: window.encodeURIComponent(societe), numcomptable: window.encodeURIComponent(numcomptable) });
                });

        }


        //$scope.reportChange = function () {
        //    console.log($scope.reports.model);

        //    $scope.loadReport($scope.reports.model);
        //}

        //// Change report viewer options
        //var options = new Stimulsoft.Viewer.StiViewerOptions();
        //options.appearance.scrollbarsMode = true;
        //options.appearance.pageBorderColor = Stimulsoft.System.Drawing.Color.navy;
        //options.toolbar.borderColor = Stimulsoft.System.Drawing.Color.navy;
        //options.toolbar.showPrintButton = true;
        //options.toolbar.showSendEmailButton = false;
        //options.toolbar.showEditorButton = true;
        //options.toolbar.showViewModeButton = false;
        ////options.toolbar.viewMode = Stimulsoft.Viewer.StiWebViewMode.WholeReport;
        ////options.toolbar.zoom = 50;
        ////options.width = "1000px";
        //options.height = "800px";

        //var viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);

        console.log('Creating a new report instance');
        var report = new Stimulsoft.Report.StiReport();

        //console.log(report);

        ////image base64 string
        //myVariable.value = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZkAAAB6CAIAAADiYLkBAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAE8wSURBVHja7H13fBVV+v77npm5M7elkZAQipQQSgiE3lk6ihUQFV3L4rrqqquIrvWrrq7lZwPFgl1UxK6IoqAkofcQAimEhJ4G6eXWmXN+f8y9k9sSktDZeT58NLm5c+bMmXOe877veQsyxkDHKUAdQERkjCGi+on6Q5uaA0BgwBhQAsTzCQAgMu1HoABAATn1rwwBAQAYAgNABgwZgIKAyAgDBARkAMAoAgAQQGAAwAABAP1u7NsNAIYUABHwfBtyAAbq4OjQ4QXqXHYqLObLWb6/Nktn1MNIoTiCNTKTxlwBaxgbP0btOwyAeniNqN86yVKnAC4AF2NOWWYyYwrjQCFM4QkxCAZR4AER4LzlMoDzrlc6zjF4fQjaAEqpxlbqfxVF8f0Cx3HN7B/e1RhilSKoewuq/IRAAZABYiOXMY9AxXzFKgTgGukRwQlQK9Mqh8vmcDbY3Scc9op6R12Ds7bOXl7fUNtQD4pT4iBSFOKjIjtGhkdbLDERljCTYCA8B0ylRI1XzzVzYdAA6tChc1nr0dDQ4HQ6HQ4HABBCDAaDwWDgeZ7neUI84o/b7VbZTZZlRDQajYwxh8PhcrkURTGbLUajFLAUNYnYV4KjgMSjRKqMRRgAetiPeKUxvxVdLSul9c6yBkdxZfXR8prj9a7SyuoTdVVVdlelTalpcNQ5HU6HGxQZeC4+wpgcHzOwR5deHWK6R0d1CRPbm4wmAw/AGHiUUfSypnrjljNHSGlU08HbtmswxhAbN4bi4pK8vLyEhB5dunQ5JV3+1GRwHbqOeZ5auwIWG2OstLS0tLS0qKiIMRYdHR0RESFJktVqtVgsHMcJgtCSZp1OZ11d3dGjR48eLSovL4+IiEhJ6d+jR48AEQ8R0VfwQqBAARjx9MhPxKtncLym9nB1fW5RTWFZ2aGK6qLq+uLqhqp6Z4MMTKaACnAMCIKbgZuCgcS0M43sFDehd+LArtEJsVEdjYaQui0waOxGm8SgkLQVcoRb84IoAG7ZsnnVqj+ysvbm5OTu25fz4osvPProo2eZX9Tb1dbWLVny2bq165xOV9++fW+77ZbefXrpPKJz2XlifPGsB1mWd+/evXXr1tLS0ujo6K5duyYkJHTt2tVkMp3iTi7LSkFBwcqVK//8cw2lbNzYcVdcMb3/gOQQfWEAhAIwjcLcAEeqa3NLyveUVOcerykoPVFUcbyspt6pSMAoEARCgHAAHBAGBMDpBlkBHhPah03p1WV8z65DunfsHm7yJy7mEfY8UhfzWuqIn7rblFWvlcLLqYlmUFtbN2nSpB07thsEk0EwNNjqn/3vf5584nH/UcOzoHuWlJTccsttf/6ZauANSIjL5erUqdPHn3wwefJEnUp0LjsvsHHjxl9++aWgoDA2tv3o0aNHjhzZtWvXkAu1VbKA5zDQR7ypqKj8bMnnCxa8WXaiZOzYUVddddVVV14VfK86RT5YXr+7qHz3keM7Dx7NL68ur6l3yQyQB44DngOOAAIwRFTNa8goBYcdmNw5JmpSYpcr+nUf27Nze5OotakAJQDICKBHnfSnUM+HxIfhWevpYd++fT/++BMhRB0ll8s1btzYsWPHnsrbqaionDplWt6+fKNkBMCamupnn3vmscce8b6Ls8dld9zxjw8//CgqMkabA3V1db16Jf6+amV8fJy+jnR72RkUtTw2KAD1CD9AQCgqKv7++x+++eYbh8MxZcrkxx9/bODAgU2yvo+lv9lbM2BEU80YMM1+z4C0axc178H7r7t+9n/++9wHixev+XPN2wvfmDp56pzbbksZNrTI5sg4eGzj/sMbC4sPVNmr653gcgEngEEE0QhGRMYBQwYMQVH/xxiC7AZnQ5jJNHJAtxkp3af26dXNKvk9PVFdGIj3sCDEM2DAh9gq5bIRixa9+/bbbwi8STW7uWXbqFFj09L+NBgMbX6VhBBCeGAIQDycxXyV1pOymHZQQ9qq9lIAcvDgkdWrUi3mcO9VBAAsFktOTu7q1X/cdtvNOpvoXHb27GLa3N29e88nn3z8zTffmkym22+//dZbb46Pjz89cq5H4qEegmAEmMdmT5ApjCJCx47x77/77hUTpjz45FP7S8vzV6z9+og9aWL+wQbn4fIGcLlBkEDgQZRAMiADZIQiIGMIlCICKgCMKghOOzCaGNvuygHJMwb1GtI5ziuGMRkoAOEZtsTkdbrkmdra+o0bN5qM4ZJk9AiDiikvd19mZtawYUPOqT0UT90frbjoWF1dHc/zwbc4cKCweS1bh85lpwVEVcbUX/bs2bNo0TtLly5FxHnz7r/vvvvat4/xmfenOhW90hgFZAAEEBkSr7JJOQTVEFYD0GnipL63Fh3OOkg6dD9BSPrhE0B4EMxokAkqgAoFZEAACFNdMZAwUDgmKwplTifhcWT3+BuH978qJaGTWRXEFMbAa2zz+IV5ifRsIGPXroL9BaIoamPI81xtbd3atWvPFZcBACIBAEVR8vP3b9iwyeVy3H33XYSQ1lhXCAC0axctSVJDQ4PX4abx8ri4uFYKejp0Lms5n/htkggABw4cfOeddz/66KPq6sprZ815+ukn+iUn+Ypsp2ciMvB4eykAiAxV91VV7eXcAFuPlK7KKVyTe3jHsUo3AOneW1EYUoUZBUBAcDLGFI+DGRIFARlFCqgAMpCJYpPDRDIlpdecMQOm9L4kDFUVSGZACICCDIAQIKoZjSJjHsezs4HUP9McDqcoSr4sgIjpaesefHAex5FzQWR4+PDhJUs+27Rpy9692UVFhwf0T7nzzn9ozjQtR0LPhBEjhv340/J2Ue20N2232zt16jRlyhSdSnQuO+MqBiLa7Y533nln0aK3Dh8+2LVrj3fefmfOjdcHGMJOI5HKAADIEYaMIqryER6oqf9t76GfduZvPHDM7nQDZwDBgBwwtypIEaQ8IEWkhPIABBgyUIBQ1V+VuWRwuqwW8zVj+80dO2BclxjSyJ2UAFGNdNrrZB6bEiUAAV4dZwhOp2vDhg08H3AvajQad+3KLCw8kJiYcE7mwOLF77/00guiwSyKkiRaLRar+sJb9d4ZYzxPnnn2qdy83Ly8XKNkJoQ4nU5RFJ/5z//17NlDpxKdy87sngwA69auf/qZZ9empzOQr7lm5iuvvJyQ0AMAKGWEnH6BhQIAUF4Nl0RiZywt78h3GXlpufsPVduAGkAUwSQhUgCFISJDjiIDVIjqy69QBO/xBQMEJitgc8WEma4blXzruAFDOkR71FjKANVTUg59dB71avQ4uhL/E8szuGHkZOfs3btXFCVVzpVlWRB4AOR5oby8fO3ateeKy1wuF0dEi8UKAC6Xu+1vltL+yck//fT9woVvbNu2w+Vy9UxI+Med/7j00qk6j+hcdsYn8WuvLliw4I0T5ScMgmHeg/9+9tmn1QM1xhRCWnOKr7nDa54KTTgsEAACBIAUNbhWZOYv3bp3y5ES2UFBNIBkQQRklDGKDJgaiI5A1bMCZACEMRGAMmQAFJFwlHYMN86a0H/O8P5DYiPAa4xjAJRwHAVkwAgooGqVntByqoqCQM6C+UazOq1bv76ysjI8PAIROY5LTEwsKMjXTFJpaWl33HH7OZkGhPDayeOpDIjqkdOrV693332nurpWlt3R0e10BtG57AwuLlVlO3zoyPyHHln+008AGBkR/uxz/7n33nt85iXX6jYZ0Vr36HCN4T0aNSEAZB2vXrZtz4+79u8rqQTkQRTB4pUAGTAt1pIhIzIAA+SREcI8eSyAESRE4KmhqtSZndE5LvL5x/8qGcRGJRY5z7Gc13PCK315ZDLiazU8K/IvpUp6ejrH8YicLLsiIsKvv/7aV1993WazEcJJkmHH9p3HjhV16tTxXIjnzEdoZm1+Rt9fIyLCdO7QuezMCgiICIA7duy84+937tmTbTAYLBbTorfeuP7666DtR+bokaHU0CJgDJAiEgqASJERoAiEAWw9cuKzDZnf7tlXXmUDgwRmIwIhCtImuoyUUxea4qEfmREigYGvrZYP7nHtzzCUn9i2ofbh9mFvLlqIJMgDzNcNF0L8fNZw8OChzMxMURRV7TI2rv3kKZM++eSTmppaUeQEQTxy5OjWrVs7dZp5ijEAOnRc3FzmUXTUFbJ69Zq/3/7348dPGCVJlAzvLn5n1qwZvtpQW7ZlTRZTBTQkoLKaJ+Ab04+UvJeesTyjwO6gYBA4c7iCPKEI4GBECTXOjCEgQ4Y8QwqggEsGWRFdNv5YPuzbKVSW8EgIzxvCLe+9/0FSv6S77v7HeWuU3LRpS3FRicUSBgBut7tb125JSUk9EhL27VNdNFCW5dQ16bNmzdSJrGllInjSYSsvb13IWdBNSVs738SKOcvGhItjHiB6VsiKn1fecvOtFRVVkiQBwBtvLpw1a0abNQsf4gHqYS+eAgHq8UAnABsPl9zw8fJpC5d9tSXPjjxYRSLwDBkQJyN2hshCbRgIyFECwBi6QZGhzhYjsEemj7gyQq5P/cFYUWJCjiccQ0p4ziAYXnjh/+Vk552372DNmlTKVE8uRilN7t8PEQYPHizLHlu7JBk3b95aWVmlE1kTK594/6HPv5bt4ar7IWMtn+fqhf6be2D6lqYWQhOciwEUefaDI/mLYh548OefaXfccWdtbZ3RaKytrfvv8/+56aY5mmp5KquIoScNK6huFgQBIKO4fPGabV/vKqh1UBCNaOIYMGSUEoYAHGUUgREEBshCMDAjjCpusDmtRvGGccl/Hz9oWHz0eqv7z4/eVijlgCIDBB4AJaOpqKjo5Zdf+XTJR3D+OZeXlZVv37ZDEiUApIosGcXBgwcCwPDhwyRJopSpiZIKCwszMjInT54AbQn0vHgsIQHvzuVyud1uAJQkieNIwMg0k+/TR8Il4AlMYy3jvpME5DUzwQI+ttsdlFJC0Gg0+mUJ9R6VnE0x/OLQMREAMjOz7vzHP2tqasxmc01NzZw5N/z73/O9G8Wpip+EAiCjqBDkESCvsubt9C1fb8k9UesEkxXMPDIFQEHgkPEMFGRAGIeACgktgVNQwG4zCdy1I3rfNXH4yM7t1T8MHJCS2L1bdm4eSmZkFIAyQAS0Wq0rVvyydev24cOHnk9ExgBw+7ZtR44c5XkDAMqKEts+tm/fvgDQLympS5dLjh49JooSIXxtbW1aavrkyRPOMpEFD1cbHGVPb2cqKiu3bNm6edPmvNx9VVVVTqcTEY0mU3S7dp07d+7bt2+fvn169UoIDw8P6Lzvr3a7o76uoaampqKy8vjx0oiIyLFjR7ewD1VV1evXbzAIYlxcXHRMu/DwcKvVrP1VzUPV1OUFBYWbNm3avn3HoYNHampqKKMc4SwWS/vYmO7duvft2zcpqW+PhG6CIJzliXqR2P4rK6v+efe9R44ciYiItNnqExISXnrpBURknvQ2tFV0Fiw2MAREIMCXOtwfbdj5Xlrm0Yo6MJrQIgFjwBRP1kRQKALHkCLIHABjqtmfIdNSWjDGwGHjOLi0f/d7Jwy/NLGjdy+kiGgJt/YfNHDHrixRDAPggMkEGQPkeaGmuuqTjz8ZPnzo+Tb4qWmpdrs9IkJSpYx+/frFxcUCQGxcbHJyv8LCgwaDhAiCIK5fv87hcKjq/9kzo/gzFyIinjMuKys7/tGHH3/73Xf78/c7HE5COI7j1IAqxpiiKKpMFBER0bVb5xEjhk+fPn3CxAmiNzK/pKR02bKv8vPzTxyvqK6urqioqKmpsdlstbW1Vqt1Terq5OR+PjYsbIpMn3/+xddeezXMGmE2W6xWa/v2MdEx0R06tO/Tu/cNc26Ijo5mLEQGgoyduxa/997q1X8UFxUzBmrn1T9RStVkywIvxLSPSezVY/z4cZdddtmgQYN0LmudxP7kE09v3botMjJKlt1I2LPPPR3fMU4ViRFZq1v10Jma4YsiEkR0AH6Tkffaqi1ZhypAMkJYGFIAaHznarZ9hgCMEYaKx8uLEsaQgUIUxjiwuQDcf+nd8d7JI2b07cb5zTHPAkvu15cgBXD7qA0UAIwm0+rVfxYXl8THdzh/JOKGBtuGDRsNBjU5JWVMGT5iGCGcOvgjRgz78ccfESkAiKKQl7cvK2tva2IzMZS5mjVvufvk4yWCwQCAwBjHcZmZmWazWb1KFKVjx0r+dtvfOY5TqOLrNqjuOZRSUTQ8OP+B3r17AcCKFb9+/fU3BsHgDVFn3hg1AABZlmPaRz/yyMOxse1b8jC//776sUef2L07y2g0SpIkSU3mxXO5XDnZeTt37vrwg09GjR757LPPjBo1EgCy9+Y9NP/fiITnBUIIxxEVRqOpsrLyzz9SvVyGzUiF1dU1q1f9IYlmjuMbGhrq6uqPHi2iVHG6HEbJMGr06JiYmIAxVhT68suvLlzwxokT5RaLxWoNb0Y/ra6u2rB+U+qatIULFl13/ewnnng8Pr7DWTCMXAxy2Y8/LP/00yVhYWEAUF9fd8Oc2bNnz2qrykQZMMI8FY6QARAOAFIPF720cvMfWUVABLCaOARUmIKBshsAIFCGhAGiNycYRcKAgo2C4hzSI/beCUOvH9RLwkYDhm/QKAD06NFdFEXGaID4IAhCaWnphg0br7vu2vNn8HftyiwsOCCKIgBSKhuNxtGjR2nbzIiRI8xmM6UKIRzP81VVVWc6znzr1m1Lv/xM4I3q6DEGRqMoiiKlDAB4ntTU1Hz55bImqi6gLMuiJN7xD49b71dfff3ll58bBLMPmTaSrCwrgPSKKy6LjT15LsaPPvrkwXkPOl1yZGSUr8nLv1nvsuQFnhckyUipsmZN6rFjxzZv3hgZGTFocMqgQYPz8vICZFvGGCHcli1bWzJEBQWFx8uOi6Ko8qBXZaHYgIMGpyQlJXlY2zshnU7X3Xfds2TJZ2azuV27dpRSn86rBhyqjSciCoIoCAaz2eJyud555y3G2DvvvHUW9M0Lm8sQsbKy6r//fYExxnGc2+2Kjm43f/48f/slaQmHATC1HAgDjqE3SxZiQZ39jT92fLQxw+5wg2QmBCihFPhQyaQBABkTAIAwSokCAIxyILvAbe8d3+GuiQNvHdorQhAAKGOguqQFIyamvclkcruV4IeVZXnnzozzisvWrl1bW1sbHh4OQF0uV48e3fv3b8yX269fUvfu3fLy8o1GIwAQwqWlps+f/+Bpjx7TzMwGg8EgmCwWq3cnoACoEpl3zROrNawpu0JdXd3IESNSUlK0/YPnJKvVGjBX1C8risKY0hJzxfff//DA/Q8yBlaL1efwkQTYy0MpyJyBN/RL6mexmAEgKipi4sTxmZm7ArgMESVJyszMLCs7ERsb0/xYZWdnV9fUmM2BBO12u0aPGiVJIgDVVg9j8NBDjyxZ8ll4eAQhxGtKY/7Hl4He2YhqBKvAc1L//v3Vds40m13wctmnny7ZvXt3eHgEADQ01M+58TptIrbCPAYMkHqHmykAPKAb8MMtu1//bVtBWT0YJd7IU5ApcmoQOOUUpHxwSwSouqUxxoPLCc767h1i/j52zC2jkjyJ9pnqagucWisk6OjabDZLRqPTWRtczIkQUlCw//w5x6SUpqev0/rpcrkGDx4cERGufcFqtQwePHjPnmyVyyRJysrK2r9/f69eiaf3kAu9coTT6XS5bfX1SAhRHQ9EUTQYDNrtKKUNDTYfSvIdf+ZyN0yeMkkQeHW5Op0OWXHU19drX+A4Tn0Wn1s3tVl6Cq8cOHDosUefkGXFYrH4vO7GWzPGmKfYgu+bRQBkjAoG4dbbbtNKTEy7dMq77y6mlAbYAQVBOHr02O7dWVOnTgoW6n2xe3eWLLt9bqTSPZUkaeTIkQHjuXTpsvffez8sLJwQDoB5cyWh1wsEGGMICI1uAgg+9S569+49a9YsADgLE/bC5rKK8ooln34uipIqs4SHh91yyy3BJz7NbprMwydMrYeLBJEAbD56/IVfN/yy+wBwPFiNgAwUBBQACANEGtrDgzBGEBSCTKbgdHSJNN8+dfCNY1MSws3q0mdAEBAJEI9YHqKfPM/zTZSkI4ScOHHC4XAELKdzZancl5e/J2uvKiMwxjiOjBkzKmD8R44c/vnnX6iR/DzPV1RUbFi/oVevxNPdH88N+/fvP3nyNFGQABGQ8Ry/f39BUVGRmkNRURSz2TxixHBCOP9dRI2Hd7drFzVnznXap9OnX3r8+Amj0QiMADCOJ9VV1dnZOR4vn5OsUU+X3njjjcKCA5FRUb53RERZdjc02ADAYBAIIS6XSzWfcxwvigaeNyCizdaQkpIyefIEbcyHDh2alNR3z569RqPZR0VliOh2uzdu3Dh16iRsOmBYUWj23r3+GSURANxud1xc3MBBAz0GY2CIUFFe+dqrr3OcZuPXtl7mdLrsdjvPcYJBoJS63bL6J0EwiKKBEA4RHA77NTOujok5S1GrFzaX/bryt9yc3LDwcETicNgnTPzL0KFDfGX7FrCZd28EombnqXC430rLfCNtW1W9C0xhAlBKGSUoc4gUkXp3Hxai2hpDJisKOJToMOMt4wb+Y8LgXhFhAEBBUTPzIIBCGGm28CSlVKGho56QEJutwe12n3MuU5dpWtraqspKi9WqEkFkZNSw4cMCvjl8xPDwiHC7zUGIgIiKQlPT0m7/+1zN/+h09Ufdka688vIrr7zc908PP/zowgVvqJK7w+Hom9Rn+c8/8jzx1Bn1MVtpqVM0Termm2+++eabG7+JsHnztquvusblcvM8z04+u8jBg4eW/7TC1KjQeXrrdDp4nrv66ivG/WXcJZdcgoj19fUVFRX79u3Lycndvz+/rPQEALjcrmtnzzQaJW2swsKs4yf8ZefODKPRHHA/juO2b9shywrPc02dkJSUlBQeKDQ0hvd6+uNyufr27dOlSyffktI/r1ixd2+2aonWJEhEtNlsHTrEXX7F9CFDhkRFRcqyu7a2rqSkNDcnLycn98CBAzU1NYgYERmhxQ4CsDN9fHwBcxlj7OflKwARgFBKZVmeNm2aIPBeS+TJrRie6ckaa3OvzDvy5C/rduUfBSkMTSYgsswAGBIKimcbdjFUAAhjnOZm4dnWKQWHPcwsXDeu732ThvVvHwEAFCgwJMBRQIpAkHriwJv2ErHb7U6Ho+lzovPoFaxdu1ZTl1wuV8rAHr17BwpcPXsm9O7Ve+vWbYIgqBrftm3bysrKYmNjz4SmHKyAk8A4VsZxoSUq9ZuqTY0xUHNiIhLfb3Lk5EYurT0AWLMmtaS01GK2+E48t9ttMhkXLHx9zpzrQ25m+fn56enrvv3m28qqyuuumx3whcsuu/TttxZTqhDC+xi8iChK2dk5hw8d6ZHQrak+5eTklJdXBKSZU91BRo0aiYgAFFHVMeC3laugUXv0KOl2u33AgP4ff/Jhnz69g9uvr6/fvTtr1ao/v/3mm9FjRvXr1zdAaNC5LMR8PXTo8K5duyVJAqCKIkdFRYwZM6ZJY78nuwXzOs6qfl+EedNKHKqzv/Tbxk837nFSAmERRD1+p8g8rxeIeihJOLUiLqopLxgwJIxRsNWZRX7WyKR7x6cM6RynuWkgepP9e3t10gz8lZWVdrud44SgB2GMMrPJKgjiOX8DAHjs2LHt23eIkqSSvFt2jRw5LDgdviAIw4cP27Rps3rgJQiG4qLiDRs2qrGZp11UbOpYwPdXShWO45tvBzF0MhVVZPbav0+OnTt3UkXxP6pmDQ31t952l0pkjDH0nxOEkN69e/fu3fv22/9WWVkZGxur9Uqd+UOGDElK6puVtcdkMnojn1TrBFdWVpaRkdEjoVtTM2zv3my7zWGxWL2WewqAikKt1jCvsczTWkVFZX5+vigKATzL8eSpp//Ph8j8tmWLxTJ69KjRo0fNm/cv7YWcHYe+CzgeMzNzd2lpKc8L6hFM165de/ZsLtufgjIFpmatZmoRAHAjATfAxzvzpiz44r3UXU4ioChiY9CR18EVKUMFUOEoEsWAlAfGIeUpA2arN8r2G4b0WXn/nE9uvnRo5zjmWT+0OcpqmsuOHj3q8JPLGvc0RVHat28vSeL5MP4bN24uLi5WbdKUUqNkHDVqFIQKxBs5aqQoipTK6kJ1u+W0tPQL2bbRUimDMThy5EjQGQ4qijJ0yDDNMsVY6GREgiCoRBZ0OmSaOHGCLLvVwwHtWtVktmnT5ma6tHt3ls9ZpGrKQLfb1bXrJUkeGcqDsrLSiooKX9JnDGRZjm7Xrn//fv4vOoRJJDIyIiIi4my+lQuYy/bu2eNwOAhBRFQUpVv3buHhYU3OPQBkHAFEULxDzwEKu0/U3PjRL7d/sqrghIuYrSFz0jMAYDwADwxRrSqCSBlSW53IbDOH9Pj5vuu+vP3Kcd06oKfKJPOWrWyRKhKAffvy3bKsioPeaapOO0Yp7dGj+3lwhokAkLomnVKPQifL7vj4DoMHDw7JZUOGDG7fvr3b7fYuUXHTxs01NbVwsUNRlJqamqCQKURCTpw44ZX+NCUukNGYF0FmQZg6bYrJZFI8El+jC7EkSTt37rTbbU2YLxzZ2dkBxjLVPtC/f3J0dJS/tthgs9l8NXREJISz2x1VVTXBmrFv5wO6rXPZSbSJw0eOeF1gGKW0c6fOTW6PyCgyQhFpY9U3G4PX1+668vUvvtuRD6KIEs+QUgy5cBkBmVBAEGTkKZPBViuB/dph3X6659pv514zOaGTpwg4Y8gYgho61RYLAaUse2+OQTCEOJ1gjOf5gQNTzodXUFFRuXXrVq3qpdPpTOqX1LFjx5C6XqdO8UlJfd0ul/qrKIr5+QU7d+5qZle/aKCGQASsOJPR+PkXXxw8eFjbGDwzpvF1N9bTCRmSOWzY0N69E51OZ8A8EQR+//79+/YVhOxMQUHBsWNFQXYApiiyGldwMrUdeZ6vqald9ObbXicSAED/zqti5jnI7HQBy2W1NTXqRFFpo31zcSQMwA1EAUAAHoCsP1I68+0f5i9LPWqTwWwmyABcDD2erqFZhmMKyFBvs1J5zpAeK+6f/dXcGZcmXEIYAGNe7VXL2ULaFkF99OixvLy8gJ1T3eLcbldMTMyo0SPPh8HfsWNHYWGBN+E4VRRFVTCbIvDRY0YqVPE6eRGn07lmzZqmdvWLBjzPxcREK4ri/6QgScbcnNzrZl//88+/OJ1OAIJIEAljKi+cPIGPyWScNHmiJupq4Di+orxy+/YdTRnLampq/bmMqZ4ow4YHBmNERkRYrVbqd6ROGaOSJH3xxdLbbr09MzNLE9d8Og9wjlLUXcBc5nL7+Pshms2mpjUiRMoDckCgyuV+ctW2K978blXuQbAYed7MMQ4ACCUcRQwSjFVXGyoDq3cYmfOGEQk/33/9l3NnTL4kngMAJjNwqzkVKYJCGGiG4za5B27fvq24uDhgtqkN2e32UaNGdOnS+XwY/NTUNLvDTghBREpZeHi4urE3pVgMHz7MarVSqmiWoA3rN9ntjotezezdu7c/l3k0MLPZnJOTe+Ocmy6fftXbb79bWFjoL4g1n7+MAcC0S6dZwyyKQgMkKcrY5s1bgvdCAMjavUf2XTXAAMDlcvXqndirV68gabpjfHy8f7UXphZzkCRp2bKvLrt0+i233Pbjjz9VVFSAT1XGcxW6fwFzmUFUI34RAAgia0ZTYYiEAMDK/GOXLfzq+R/X1cqEGE0ECEU3JW6KSJGjCIxQfwMvgtvNbPUm4r5xWOLv/7p+2a1XjO/aQRMGAThEjgFR9VZyytLFypW/OZ1On4N/TfdUDAbDdddf1yrb8xmC3W7fvGmzQRDVdeJ2uxN6JiQnJ0PTZUZTUlIu6dpFlSMQQRTF7Ozs7Oyci57LJk6cYDabfOis8d0ZjUaDQdy4cfO8B+ZPnDD5xhtvWrp0mdeOdlKnIhg2dGjv3r2cjsD9QJKkzF27a2pqgswXdO/evcHBJG7ZPXjwIJMp0GPRZDaNGTPG5XT6T0WPi1lYWJjN5vjqq2/+etOtEyZMevDB+Wlp6Urjia3OZa1BZHgkUxgDZIiMoq3WFqCtMPDyG8LhWts/vv1t1uJvtx6uBnMY8gQYAiMMKQMKDBjjVNUfQTV4AcgK1NXEi+TOvwxY/cDsT/82fVzXOE+7oIWjIQBpzATK2vAmGWMe5evokaPp6etMJrP34IBoMnyDzT5kSMr06dO8FpZzaf/fk5Wdm5tvMEiqF5LT6Rw6ZKjVamnmkoiI8EGDBjqdbtWHgOP46uqqdM9pZjNiCAuUsNugvDM8pctDCvotSvpKAdi4cWPHjBldV1eHSPyTxxIAQghvNlus1rDq6trvvvvx9tvvmDhx6lNP/cdrSmvKiE4AmCRJkydNdrld2oeIHAARBPHIkSN79mSDXxEMOH78eH7+fsFjiiXeGCngOH7USPUAWglQ9v96840x7WNcLpd/zlvQhOswa7goSgcKDy96850Z18yaOnX6p59+5nS6AuTBs6TRX4gspu4Ml1zSBUFGcDNC3ZyrqLLEh52Zlje7AeDLjXteXrW94EQFmMxoAgA7AIeMB1Qo8ABqgjMFGCAiBQZOF7hdCXGRs6cMnDO0T3L7SJ+VRQFJk85FbV0m6mz79rvvi44VBUc+K4pCCPvnPf88y5m/Qg47AKxdt66qqioiIoIxighms3nLlq3XzZ4jK01WnxR4IT+/wGg0ajHGPM+vXbd23oP3c9wZLkWMAbFKZ2mBIQJjIAjCk//35PbtGQ0NNqPRFPLuiEQQREEQGaMHDxx6/r8vLfvyqzvv+se99/6zef+bqdOmvP32u7Is8zwPQBkjAEAI1tTUbN26dcyYUeq5p/rW9u/fX1xcLDQeKwEAyLLcPiZm6LChoXYRTE5O+tf99z75xFMREZFev9zA6U4IJ0lGSTIqirxh/cYN6zd+tuSLB+fff8UVl+u5GFuK/ikDBJMJKQqUF4E/dviwN8CSMq+z94ajx5/7dd3qvQeASGiKIExhzM0QkfKMGSiRARQEIAohwNxEYS4XUBjUMfqvw/rMHNr7kjCvuzYFANUmxuA0rwZUfTJramqWLv3SZ2Ez7TCrrq72yiuvmDlz5vkw7IpC09PTVcdx1TwiCEJ+fn5WVlbTUgwDYJJkFEVR26pFUczavaegsLBXYmIzuQMvZDRGpL744vP33z/PZqs3mUwBiYO8yoSH/iRJEkWxpKT4kX8/um7tujffXNi12yU+8wF9ow4GDRrUt2/fHTu287zZ6/jqCRTVTGYaoezO2uN0OkWD33bodDqT+vXzGmF9k3F7rGPz58/Lz9//2ZLPwsLCVV/OIMnUoz5zHKeeFWzYsH7Hzm0PPDDvqaeeCPad1rkshBSTMnBAfJfY0sPHzYJZ4Mz5+QePl1e0j2mnGt2PNbjeWrNt8dqMmgYZzFbk3Ki4AAlDnqEaHSYDo4gMmKIwVByyQWCje3a8adTAK/p3ixV4r+GfolqEHBggUEA8M8vus8+W7sna6yOUeYjMZrfFx3d47r/PapkSzpVYpv5vf/7+PVl71fJx2kiouSiaGBX0r2fh+Q7PCyUlpZs2bu6VmAgXJxrlktv/fptkND7+2GNFRcUWi9W7wjHI1MPUDUKSrKJo+uWXlSUlpV9/82X37t0gVHiWySRNmjR+06aNPgl8EABFSdy7Z29paZma4Fcz/AcUsVedmUaOHKa6VQbY7NW8PaIoLl78dmRk+Acffuios5vNFsJx/rqjn1hNCBdmbeeWHc//94XKisqFC1/nBe7sDPcFbC/rFN9x3MiRdoddJsCL5MjBguzMHQDAAL/YVTB14bL/t3JLjUJ4s4kAx4CnhChIGBBgHCNAiQLAmNPN6t1GwmYN6/7jvdf+dt91tw/uqRKZGqKESCjyDFGlNKbVpTytsllp6fF331ksCAafYBdUk3+4Xc6nnn4yKanPuSYyzwNv2LCprKzMZ79llCqKouZIph4wn5+pov3gdTXw5HVgDLyeGRd/KZObbrr+jz9//9vfbuM4rqamxuVy+bjvMAAFQPEeOKlV6zEqKiojI+POO/9ZX9/QlFVx2qXTIiMjZNn3qJQJgqG0tCwra6/2kcPhzM/fHyAlMcYksTHPTxANe45xJElasOD1r79eNmr0SJu9oba2VpZdjFFvyIHi/Uc9Tt1IBcEQHh7xzjuLX3ttoY/1UOeypnHj9bdKkolRt0hke0Pd96tTt5ZWXPPh8ls/+DG3tAosJhR4mSBDyikcAHKMcQoDhkA5aHBDg71rpHXeZUNS59/4zd+ump7YWQQFmMyANubL03Q9QAJIAE8aUNkGvPLyq/n5+Uaj5CvAU0rr6mrvf+Bft9/+NzgXRbpCihmpqWmMaTkPCKXU5XLJsluW3bLbJcsuWXbJbqfsdnp+9vxzy7LscrkoVTTZQpKkHdt3FhUVX/REpnppJSYmfvDh4pW/rfjnP++KaR9dW1tdV1frdju9K9FrXGcEGGEMASAiIjJ1Terid99T5abgOZCS0j8pKcnpOW1EbRe02ew7d+zUvlZcVHz40OEA0d7tdnfs1DElZYCv3B3STgoAl0+//NeVKz77/NPLL7+UF7ja2mq7vYFSJbAaHiPAPMc7Fovltdde3bkz439XxwzK16OdS2IAh/xlwpgpU0b/tmKFbI2ErklfHrZ/9eZ3FbX1YDQRUH29VAc+pKgAAYUhuBVw2wSRH9e7y6whiZf179XV4lGXKFMjwBGAMZQpEIIEAT25xnysHKfXuvPnn2s+/PAjb7hv4wSqqqqaNWvmc889q6bKOx/yL5YUl+7cuVMUPZzrdrujo6Nef/216Ogo/zxFITIdchxXWlL20EMPV1ZWqYtKEIRjx4q2bt02c+Y1FzeXIYLXG54MHz50+PCh/37koT/++POXFb9s2rSlrOyEWgDAM2jItFmGiJJk/Oijj2+59eb27WMCKAYRjUbjpEmTNmzYZDIz1PIXIEHEHT5ctr+goLy8IoDLnE7XwIEDY2KiPQlCm55fagC80WicPfva2bOv3bUrc+Wvv//++6rdu7Nstlqz2SwIBm+RDG9lBAYGg1hRWfnee++9//57Z8HpjD8PiYyp6b08Qd3gLRgOFDjPMTIwAMIAeIF//InH0vfk2Tv1M/QdWWsMV2xuNFqQMY/nBAABxpAxqoBdBka7xoRP6dPz2oG9x/S6xOR/X+KlSgRE4FiA9IpBRt22btLe+YGIWFZ24rFHn3Q6XVarVTOIMKZUV1dNu3TKu4vfUk+yzl0ZNM3kTABg0+bNx44VSZKkHpA5HLbk5HFXX3N5y5v7/Islv/+2Wl1UhBCHw7lmTerMmde0fFAZa3OW0nPmlxe8kjt2jL/ttltuu+2WrKw9P/24/Jtvfti/P99oNAoCz5jfni5J0sGDh1JTU2+44Xrf59b2tqmXTlm48A0qy5yPCikIQk5ublVVdWRkBADs3bPXbrf7xJNQVd8fOWpEgGmvObOfFwMHpgwcmPLg/AfWr1//zTffrPz194qKSqvVEiyHmIymtWvXFxUVd+wY/z+nYyIAUbkLmWqkB0YY4wA4DhhhCgNFrYKLCKVO90ablVzxT/eQabawCIWTkUdGZOb1/AJKqIuyBkcEwJSkrm/fetmaB+e8f8O0qb0uMfmHAWKIrfQMCULa5omU0n8//MiuXZlWq4V5K84pslxVVXX5FZd9/vmS6Oh27HzKWJaWmuZyuVQiUzF0aOtq3I0aNUKhmnEHRVHcuHFTbW3tSeUa/58vhoAn9c3275/81NNP/vHnbw8+OI8xKssyBFUUp5RmeMJXQ/khD+g/IGWA0+nwnSoGg6G0tDQvz1PrPjsnh/gnYqOUhodbT6VEodEoTZ065cMPP/h5xU+Tp0xqqLf5PpdHVuL50pLS3Nzc/1EdUxVRASgCZQwZctio3XFqQrBSt/vn7VnvrN21+0gNGCOBk5E6CSUMCFEoQ6RuGdwOA8+S4qInp/S6ckCP4R3bG7T9mVF25hNdnpTO/vOf57766uvwsDA1Jp0QdLmcNlv93+b+bcGCV61Wy3mgWjbam+vq6jdu3CyKhkbLsSSOGDEM/H0ym9VTcMyYsRaLWVEUjuMA0GAQDx06tH37jkmTmixlRAgGRGgrsnLRqJ+q+tahQ+yLLz0XFmZ99tnnTCYzItGqHKmOL0ePHWuqBUmSJk+euGH9BqNf9RBsqK/fvXv3yJEj7Hb7/v37BYPfYnc5XQkJvfr55/lpLRGrNxoyZPBXX305+9ob1q5dZzKZUT30V8NiONLQYD/WdOcvZrnMq1IiAAeUR8oR1XFCdWMhUOJwLVq/Z9prX975Reru4lo0iYRzIaXICEMEXkBiNAH0i7XcOaH/t/fM+nP+jS9PHzlWJbJGJYNDxp+TiatNgrfeeuuVl181Gk1IiMoDNluDrLifePKJDz5crLrRNxUSdE6wc+fOwsIDmrOl2+3u2LFjysABLdazEAD69++f2LOny5szg+OIrcGWlrY2eEtvRmiWFaUNq+5cSV7ND4iatEet53TXXf9ITExUy5gHiPB2u6OZtqZNmxoWFk4bBV5PdqCsrD0AUFxcXHSsKMAn2elyDBky1GQyte1BtJmpTmmr1XLvffcIPK+6T/v60MmyrJY1+N+TyxioeVxVq4iarRcAEfgDdfZl23O/2JSZV1QFRARjBBDKGDJKQXYxWQHqRmcDVhax8rLX33xpyqAkz9QHxgGqPhVq9ZCzS+N+RwXqDPjgg48ef+z/BMGgHpNTKtfU1PTo0e3Fl573Tbh6/hAZAKSlpdvtdi37u9PpTEkZ0K5dVAv7qcplFotl+IgRu3bt8ZYsQI7j165d53a7BUEIKd9xHNH+pF6iKKcgl52tIdU6XFJc1iE+Nngo/CyAAAAQFh4eGxu3b19+gMkMGBN4vpl+9++fPCAlefOmLWazFkmGPC/k5uYBwJEjRysqK3ne4NsBQeBHjR7R/CM4HM662vqY9u18izP49lz9WdUeOnXqZDQZnU4XIX6nQIQj3lLQ/2tyGaoOfYyAjMiAoAK4reTEvJ/SL3358ye/Scs73gBmCUwcUBkcbmioB7ejRzvLHeOSFs8eP6B4t/zzF8rW1JceuLekuAgAFEYBgKq1ryhBhgwUQOXsZs5vdOIHgLfffnf+g/OBoZoC326zNTTUz7p2xsrfflGJjNLzKKWXOoldLteGDet5nkNPpSqGCMNHDGtDg2PGjOF5rQwSSpKUk52zd292U5zIcbzBYPDZ6pksu1t+O47zK+RBFeXsvHhVcjlQeOjSS6dff91Nq1f/qdrCQj6m+kltTU1JiZolhfqmA6OMRcdEN/OCDAbDlCmTtfbVJgVBOHjwUHV19YEDBxvqbV69FUCtuB4TM2TIYJ+9NgSWffnViBEjn3zimbzcfb7J1ALENPXDI0eO2G124h/gRykVDWJMTMzFKpedvEgSAgLw1TJbm3tg6fbcP/MOVNXZgDeC2QIKBYcDZJfBKPXuEDmmZ4dJfbsP6dapi0kEgKkd/99997tX/fFH6vq1f73ltk8/+aRz507ek1HN+HPOGNztlp999r+vv/Yax/OiKDqdroaG+t69ez/08IO33nqzelip1s4437aYnJzcrMbycaAozGq1DhvWFi4bMWJETExMVVW1wcABACGkrq42LTV94MCUkFwmigajyaTV6wXAViULEgSesUah2O5w2G12//K9ZxA//7wia8+e7OzsVatWjRo94pprrhk//i+JiT39ucDzuj/48MPCwgNeiZVpIROI0GwVPgaA06ZNfe3VBZohUiXx8vLynJy8woJCn8gnT+XKXr2GJCT0bKbnsqx89+0PBw4WvvTS//vssyXTLpt69VVXDR8+PCYmOjg9ZF1d/eLFi92ybBD94j0ppeER4d26db8guIwCIxo1+bIU89evkHkyUHoDNYgnnzQDROabTdoJkF1csTwr/9fsA5kHShUFwWgAgwGcLqBKbLipX4eO43pfMrJ7x0Gd4tqJfo/QrVevr7//9oUXXnhr0Tupa/6cOWP2e++9M2jwQE/eV0TQ4jjOsKqhqUuMeSZr0bHiRx994quvvjKbrQCsuromJjr673fMfeCBf6kBcZ6qi3heOcF7Un+sTV9fXaXWJ1erLjl79eqVnNyvVXKK+kOXLp0GDkz57bdVBoOkrmRCyNp1ax+Y96/gdNIq2VnNVi1mABHqauu9g6xo88s3jtoXERFRmqmI5/kTx8tLisusvVQPGOaj9AWk0GjGibClgp3bLf/440+SQTJbrIriTl2T/sfqNR07dRwxfMS4v4wZMKB/p06d1Hj7gwcOfv31N59++pkoigFKnKIoVqtldNM5OL2GyOQBAwZs2rTZbDarS4wQTpHptq07CgoOCoLgrSUMjIHL5Ro2bLgg8E0/I+zalbl9x/aI8GiO42pq6j75aMnSz5clJvYcN27syFEj+vbt265dO1ESnQ7nrl2Z777zXnr6WrPZFNCaw+EcMCDltJdDPWNyWaDjFfV92wTQk3TFk+ewMX84IjBgBNUScEQBOFDdsDZ7//d7C9cVHLLVuYESEBAECEPaNa7D8G5x4xI7Dr6kffd24c1kDzCbTc8//99Ro8Y8/98XNm9ZP/3yyxcuXHjDDdd5aeVs6cpeE4M61dasSXv4oX9nZe0xmcwNDfXh4eG33nrLfffdMyAlGc4Dn/6mGVldTjR97VovI3hUzoEDBzSf56cZjPvLuN9+W+Wt/sdEUczI2HXgwIGEhNDVZ2LaR2tDxPN8YeEBVQDx3SqgiePUzp07qSotIvI8X15esWzZ108/84Q35aGfDS0zc/fSpV8mJyffcstfW2ADPQk2btyUmZkpSpJqFrRYrABQWVH1ww8//PDDj2azKTw83GI1KQo7Xna8vr7eZDLzvBbtSFTDus3WMHHihIEDBzWr0zCe56dOnbJ+/YaAD1NTU0tLy7yV2JmqsppN5tGjR0GoGE8NapLFyMgoABAEISIiglJWUHAgJyfvgw8+MlvMkRFhRpO5ob6hrOy4WkTZv9qemgzZffXVV0qS2OKSteeSy0iwVchbRZr4vnGmZpEO5D4E4PZX1a8vLPptT0Fa3pGKE9UgK2ASzEaxV3R0325xg7vFjOgc1yc2JrwxSJUylQZDbcXqJ5dffum4caPfe/+DBa8vmDPn+lWrVr/44vO+obZnhwUAoPxE+auvLly8eHFNbSXPGcLDrTfddP3c228fOnRwgJH4PISntMLhwxk7M7zZ/ZmqBY8cOaLNzY4ZMyoszCrLntpuPC8cLzu+fsPGAC7TXu4ll3TRRkmSjBkZGe+//+Hdd9/pdVmAzMzdlZWVEydOCL5XcnK/8IjwhnqbKptIkrRo0VtGk+nGG6/r1KkjADidroMHD27csHnVqj/Wrl17/ETRuLET5sy5wSu2hH65LZkA33zztd1uDwsL91EYwWAwGAwGNa67qqqqvLyCEOQ43moN8274jVyg5vO5+5938TzXVOFXNWIfEaZMnfz66wucTpdW/lIUxS1btqiphxgDQpAxcLtdnbt0VkOXmiKy48dPrFz5qyQZ/QVklCSjJEmUUkVWSkvLGTtBCDEYDD5OM41x8jabrU+fPjfdNKd50jzP7GVMi4lFxhCAoKcekep+79XsfB6mzC3vLT6x7WBJ2u6cjYfKbDU24PjYdmHjBvTo27H9gE5xA7q2T4w0txN9JTBFNaAz8E2O3dTbBavV+tD8B6+dNeuDDz785KMlq1etvv+Bf919951n1FaivTNEcLncS5d++fLLr+TlZQu8afTosZdfftnMWTN9MkMwxuA8UypDYMOGDSUlJVoOD1mWo6Iih3i5uA3o1y+pe/due/Zkm0yc9hLTUtP+dtutIcezX3KSIPCUKoRwhCAh+H9PPrVz584BA/pXVVXt2pW5Yf3G8IjwjRvXxwaVfejdu9fwYUNXrPg1IiJSFesURXnm6Wc+eP+DTp3iCeFqaqqPHz9x4kS5oigmkynM2i4vL39/fkHfpN4nmfLNoq6uLjU1PcDWooVYq8mmOY73CStivjlFEIFSVlNbffvtc6+66oqWKO8DBvRPTu63YcNGi8WiSY6yrCB6RFd1XTidzuTkpPiOcc1QzM6dGdnZ2SajNUAI1eqSIHIGAx98huFzXzel9Omnn4yNa69ZKi4ELkPwGsNUywUw5tEtfZKMYKXDlXuianPh0c2Fx7IPlZ6osckc6xgdfuWAxMHdOvaLi+4ZFxMbbgxiGkqBISB6KoOAqvif9NWq6Nr1kueff+7uu+5a9tVX33///YoVK2bMmHHttbN8E+eHPG9ug2lM+29dXd13333/zjvv7ty5MyEh4e67773qqivHjhljtpga7YyAABcAkQGAWs5S66nb7ereo09whviWD5jJZBo5asTOnRmaf5PBIG7buqOkuLRDfFywnj5s6JDEXj1zc/ap+5AgCLIsf7bkC7XOHs/xBlEqLipJTU0LrgSOiPc/8K+09LVOp0ONJOU4zmg0lpWVqj6chKAgCCaTiRCiikvHTxSnpaWF5jKvg+BJ35vFYn7ooflPPP5keXmFxWLhecF3hoSy0IFvSSpFUaqqq6dNnfbSSy+E0oFCWHk4jkydNmXdunUq6ag38jFBqj1nlCpjxo5ufsIPGzZk7ty5n3yyxOkgRpOR43jNmOtPfwFpST0/O51Oh8P+9NNPzb5uVghT1BnSIc6cgsMAquyOw5W1hyoq9xVV5ZafKK2pr3O6RY67JNzav0uXxPjYLjHWTpHWKC7ElucxbWFjSmrP+YFXgQPv4WRT5gxvtqzGkXc6nampab///nt1dU2fPn3Gjh3dp0+fqKio0/XIbrc7Nzfv999/X7VqdWVl5ZAhQ6655urhw4dFR0cHER9cKIluDh8+MmH8pGPHir3Bz6yuvuqee+576603235eBOTHH5dfN/sGg0FSk2dRSm0225fLPr/hhut8bSvaPvHVV9/M/dsdAODr3um7riorK6+55spvv/s6ZKLa119f+NgjTxCOM5lM/p6o1DtbQFEUh8OuKEq/5L6LFr05ZszoUCLq5ssuvVy11lFKFUVe8etPUyZPbupRd+zYuWjRW6tX/1l+vJzjeUmSVDOfzwpHf9kNKKUOh8Ptds26duabby4MCClvHpmZuydNmtxQb1OL2/M8z/O87xqXZZkXuFWrVw4eNOikutbXX3/93uL3MzJ2NdTbJKMkCAZCPB45TXAZUKrU1dWHhVkefeyRhx+efzYn6umRy2QAtyzbXXKD3XGipuZYbfUJBz1ebW9wUafTJqISZbVc2qfHJXHtO0WFx5kMhiZMqaiaJ4EAgjdZP/HGmXvqWnoT8JzUlsjULUSd8OqOJ4riZZddetlll9bW1m7fviM7Ozs3NzcqKqpLly6dO3cODw9X333r1iWldru9pKSksLBw//6CsrITUVGRzzzzzKBBKT4Z8ph2SundQgAvkJxdx4qKeIHv1q2rahOhVI4nHWbOnNFmI4j67GPHjp46dUpubp436wbU1dUePny4qatuuOE6h9317LPPqZXAVeMXY6DGMFLKLBZLx46dmhKZH3zwgciIdq+88mphYQGlzGAwqEmfGVMUWZYV2WAQwiMihgwZdM2Mq+fMuaFdu6iQ5urY9u379OldWVklCLwsy2azKS42rhlpfciQwUuWfJKVteenH3/+c82a/Lz86ppqRaHqTCOEI4SoWQ8ppYqiuFxOQkhCQsI/77n7rrvuaK13TnJyv1mzZq5a9YfJaCEE6+rq6+vrtUYQ0eVyJSWl9O7V+6SvDxFuuOH6mTNnpKWl//TTzxs3bDp69EhtbT0iCLyB49WeE1UXplSRZbfL5TYapcmTJ/77kYcmTBh/dsxkLZXLmCfI25PHS6FMVmTGQKaKLNMGh6Pa6bRT6pKZ3el0uRXZrRCQzQKJCI+MtJrDzOZwMTgdaoBQSpqV7c7sQFBKy8rKysvLFUURRVEURaPRaDQaOY4TRVHLkaJFU6se5+obIoQ4nc76+vrq6uq6ujqr1RoTExMZGQkXF2RZrqur01LCqp6ZbT7B9IXL6aqrr/OJimXq4DdzycGDh7799ruNGzYfOnTIZrfxPB8RHtG9e/f+A5LHjRszYsTw5tX2srKyX1b8um7dxry8vOrqKsZQFA1xcXE9E3sMGzZ06NAhffr0OSl91NfVO10u1ZLCC0JYWEvNry63e++e7J07dmVmZubm5RYXFdfV1drtTkWReV6QJKldu6h+yX0nT5585ZWXt9m/VFGU6upqgoQB3HTjrenpaT7BAFBTU3PPvXctXPh6a5utrKzMyNi1a1fm7t27C/YXHj9ebrPZnE4npVQURZPR2KFjhyFDBl1xxRVTpkw6Jw6SgVym8agsyxzHyYoiKzJjTKFUzSVOKWMALpdLYSAaDBIiIBCe51RLZujUY3gBrVutLpbKbhqXqb74WqVoURRV8wqcy4Q8/0MI2OEbGhoaGmyCIJjNZt8QmaYEgYDPnU6XmpxDkowWi+lMyw7BvVIUWlVVVVpaWlNT63Q4JaMxMiIivmN8ePhpO5gqKioeNXJsdXW1FkLLGLXb7V8s/axVCeOCO+9yuY+XHT9+vLyuvo4q1GIxx8TExHfscHZilVrNZVqGBq8fBSJl3gjJpiUnb9IxBqBGVeLpqeJ1ZmdYM2kePDLpyTirJYkidJziy/Kx5rf6FZz08uap8PTNtBbZFk5LNz799PO77rzbbLZoTTmdzvj4DmvXpbbKOcmXIk7aq3O4EPggJdnTiUYdu9H+5LH0oTdPIvic5ngPArUykdRj/TqPpTLtUKYZRtPOnrQ32szXdJzRl3WK3zn1Fk7HU4TkrED15VS6ofHgH6vXBOSMcrmcQ4cNboOXpX8kPPN/EN/On8uoFb51z+M9b1GTT3s9X7UzOV8Rr7EGx4WyQlq4EnTauhDJ7ty+tabu3tpetdx5aF/e/rS0VF/jI2MMkI0fP/4UO+/za0BW9HNsaQl9exb8OwvcPDzJLAL/rMlm6JualelLTYeOpumiVVs+ItbV1bnd7maoZ8GCheXlFb6VfWVZjomJHj9+3GllD2y27Px5wGV+7MMCB5x5HPoxyF8VPfWwfMqN6DSmQ8dplO8Q0W63z5lz4/TLpn/33XfBaQ4pZa+88soXX3zh4xIEAGC324cPG95UxOupsfB5wWV8Ux1s4pfgDwK/6ydrYlNt6NCho434ZcWvv61czXHcpk3b+/VLGj9hwsCUAVHtIqlCDx06/Msvv6SlpQuCgeM4b/FNxhjjOHLFFZdfxMOC53Ngsw4dOgLgdruvumpGWmq6xWKllDqdTrfbzfO8wWBQa5UCgNls9vXORwS73REfH7dufVpcXNzZ9F8993KZDh06zk+kpa1dv26D0WgGQI7jjEaT0cgopYwxjuPMZrP3YNQ3IJzZ7A0zZs6Ii4uDi/fwSucyHTouGCiK8sknnzidTkkyaRkBASCgTlVAmGRDQ0NiYs977rkbLmpHSJ3LdOi4YLB9+46VK1eazWY1hLMllzgcDkHgX3zxeTUxzEXsUaQH3+jQccEgPDy8e/fuNbXVdruNUsXHHSr4H1BK6+rqBEFY+MbCGTOu8SYZv2ih2/516LiQUFJSunjxez/+sLygoMDlcguCIAgCIUQL1FHzbTidTsbY8OHDn3vumQkT/wKNGc0uWrlM5zIdOi48VFRUrF+3Ye26tbt3Zx09eqy6qsbpdCqKQjhilIzR0dH9+vW58qorZ8yYYbGY/0fGROcyHTouJAQl/HCWlJSWlpZVVFQ4nU5RFKOjo7t06dShQ4f/tZHRuUyHjguPy1pyHKlm3PvfSUilc5kOHRctnf1P4fT4ZDz26c6sg1X6aOrQoeO0oH+3yBdva12hL10u06FDx8UA3b9Mhw4dOpfp0KFDh85lOnTo0KFzmQ4dOnToXKZDhw6dy3To0KFD5zIdOnTo0LlMhw4dOnQu06FDx8WKM55X9tAfyy5fWQ4Afaff9O2UqJCf6Ag5YlfPve+FZH08dJzLSXgBLdtT4LKy7bNf2pIT9HHAox4qLVd/yCmtAtCZ66SoTM0s10dBx3nHbuf9Qj4FLjtemRPq45yVS5NWJr69YNp4AADoGhcNUA4AfeMiT7WzGnvGj/j14aFdL/LJkzj1YhXK9qxK+jj/LO3wF9+cOUdPdDoX8pl5qNOhYzbevvDxeSuXAwDk3/NKlPph1ylzsqfou1rLETX34fvmXuQ7fKX6Q884XU6/YHD+L+TTa/vv8cKjI/qqPxYXpJbpE0BHM0p0dEJ7fTR0nA86ZkjERvUE8NU9W2EyDDLA+V6S/vmiezK8fyjecvm8LYFtejWXIGkRACo/fmXpa8VBdxw0PfvmHqFlB2+31VU3/9E5c2NDaEmaPqjp1D7XJr69YOgBz319WmjRtT6Gf8/3E99eMG2877UhO99s4001pQ2j7yCHOHloU+O+/fR7iVD+2kuLXgvxII0vy68PIdWQNs8ZTw+j5z86p/tqz9f8btfcdGpqtgQ9e8AQtaDPob/jHaJTWwXN6ftN9uSkC7nZOzY5Mj5fO/lDnQu5rO1I/3xRUtBJQs7KpUmvbD/Uwsv9lpk6KKvS29oZHyJTV92yj8u0lRZ0L8i/Z572Ba+VdBCsnqcRaFT32NZc6yOzpGfmAwDEw+qAazNWPr4H/CngJI031VTOyqWP/7F99jxfooHlH/uOXtsb9+ln5YHSEKMdZH+JmpgS7elDZmHjx177bN+UHl1Px5xR8dtnfk99itNpdeCFfkPUwj4f+mNZ4HcyViZ9Xni6V0GId5qzcqn/pDpdd6x8O+Bep7A8z5ZctqdgOfiu3hZetco7n7R9zLs5F295+I8e306JGn/zfdlTQxsID/2xTL28kcs9O0D+PZ8nZN/cw98IpRn1oudP7dFcZ7yb4aE/ll2emTAxNrTI4N15yn/Lqpw7JapxxWbkL2/crKK6turaxtHzflKcv9z7gNoOuTyz8IXkHk3JMk02Xpy/3Pu1xqZWbvEKj1pT+av3TBuf3JbGm+hn1NyH75vbAsN/1/4JfVeW5wBARkH6zT3G+3KlZmU7tTmj7VI5xSEEkJNNp6aQvzxDmzbaoJW/trpwrnpVC/oMUPi+uo8GSC4AAHBqqyDgMVd5Nlp/e3cr7J6tuGN5TrH2tcAJ1oLXdA7kssLHG9WWoeNbbED5+Pd8ryqnCeRRc2/xmN5yVm5Pb5H9JfEebW0kD50frxJKQXrgC9i23NPDaXNjm7NMa/JC1ylzstXx3bM9SPcJcqEoK/yt2EfeXnBf9oL7sh8e2rVV18ZHeV9nVUFxoPzfNdhk3pLG/ZsK8lwL0qM12bD1jTfZz2BKCm2p6HFZvIcdVnvEhMLVXhaYmnzqc8ZfMJx+U/aC+7IXqE/XuukUiPgRv3rWcGNnvFe1vc/jb76vWQ5tQ7cbrZbzb9G4o8cLC1ru0ti6O/psXY1y937vWjtv5DKviuv7Rl9pha6rLQN/Ua7R9FZ5oAzGx5708vx75uWf5FZl2x9eGfQCAoSCuCj17DnAucRnLsLyjxctD5rEnkdudFVJfNvXYNeqa+O8XFZWuT9oSIPYtmWNh2rKZ6oFM7tXL25r48G7go/g2bzhP2piSvRrxT4yndb+oITxp2HO+NlM/cXD1kynYFr06r+hOtPCPveYOgiWZ2jLKniPOeVV0MwAtgJtH6jGJXZaXdVOu70sev6j92W3SkpsXAZR/ldFJsS35vKWCICfecwQV8+d1qTYmDzt7UG+9o5FHlOFr8Dlh8S3FzQ+cuMC9pVMW3nt1SmeTfhQVkFO0CLRvBY9ok0LGw/RVOPmfFn/qMA5qr6Otjce1M/WLKGu/RN8hRqtfc/InOKcOT3T6aTw70yL+zz+5pvmx/udkCT5G91OQ7eb7Mw5GajzRy47RZ89bV8qrjwE0LXNW8fJj2w8uhIMmt68ID3+5vuyb/Y5+sxY+XjKfS+0b9zJmxH4NeO9Dzv4SQEtuVaTWULRgSbaBDnTtqjxkzGLZvGM85/lrW48VD9bvoRie1wWvyWnWJVWKg941RlPU6drzpy5We2vd7eyzx7zrs9hevlrL63qvmDa+NPe7cDOnJOBOk/lslPZvioPlLV+64iN6ul5K817tGm2vCZM/kFqztyH7/t1enTjB03EOQSIfkHG+1O5NpRGFmxTa13jvk2FGOFAxbDtjQfb/kIp0c2qmeoy/i2r0LPaPQrmKc+Z0zCdQiOntCqU5KK+0Fb3ueuUOdkL7vNqCf5XnWK3te833+wZG6iLlcsaZ+1rn2kn0436YKPa0jh8lYcaL+8xdRAEXQ4AhY/PWzT7D8/KTP98ZfMmf+/XFvkcfvt7dbaP8mo92wJP2bUD9ZALGNp8rabuqaeoTdBBSxpvYVPBEtZpbrwVtl5NzcxZuWW5v+p9ynOmGbRoOjWJRucJn854rA0t63PZ9tnzFvk4RgQ5spzCKjjZY1Z+/MqiFvtknNpAQUse6uzrmKeMrlOmzc/0nEwHHiP4mWa9ZlGvuVE9HBl/8/SrM1YuhxCX9/WOr/cUTLXoNyUeq19bmeTvcOSlv6H3DNpyTwY0Onk2djJIRAqQO2LbdG0odS+EQb0ljTfblA9HBElYp9y4r/uYZvSFjJVJGSdTTxpvHUKnPsU506yF4aTT6WR05jd/Gk+ZWtznEMcsPntwm1dBix7z6hYv21MdqCBmbNVrOj/lMo9Clz030f/D6PmPBh5F+5tFNetMjxcW+OuD3stbORw9Xlgw/eogC7fWyPibg+/iZ0gKuYDbfG3I1kJZptrYsWDzXEgJ69Qa9/e98DtX8T/1C7laUnymRKOCeVrmTPPToI3Tqe/0m/y6NGh6tp+RqwV9jh36rRYI2MStT9Mq6PFCowLb2P/WpJk6Xeuuba8pEHrdch06ThV6Sj7dXqZDhw4dOpfp0KFDh85lOnTouJig28t06NChy2U6dOjQoXOZDh06dOhcpkOHDh06l+nQoUPnMh06dOjQuUyHDh06dC7ToUOHDp3LdOjQoXOZDh06dOhcpkOHDh06l+nQoUOHzmU6dOjQuUyHDh06dC7ToUOHDp3LdOjQoUPnMh06dPwv4f8PAEGm/YqsuipqAAAAAElFTkSuQmCC";
        ////myVariable.valueObject = // image ByteArray (png, gif, jpeg, bmp)

        //report.dictionary.variables.add(myVariable);
        
        //console.log('Load report from url');
        $scope.altisysReport = reportService.get();
        console.log('altisysReport:');
        console.log(JSON.stringify($scope.altisysReport));
        console.log($scope.altisysReport.name);
        
        if (!$scope.altisysReport.value) { //report from WebAPI
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
        else { //report modified into designer
            console.log('Load report from reportService');
            report.load($scope.altisysReport.value);
            console.log('Loaded !');

            loadVars();
            loadLocal();
            assignAndRenderReport();
        }



    }]);
}());
(function (app) {
    'use strict';
    app.controller('widgetDSOController', ['$scope', '$http', '$location', 'gridConfService', 'config', 'cookieService', function ($scope, $http, $location, gridConfService, config, cookieService) {
        
        
        
        /*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
        nv.addGraph(function () {

            $http({
                method: 'GET',
                url: config.url + '/Widget/GetDso'
            })
             .success(function (data) {
                 var chart = nv.models.lineChart()
                               .margin({ left: 100 })  //Adjust chart margins to give the x-axis some breathing room.
                               .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                               .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                               .showYAxis(true)        //Show the y-axis
                               .showXAxis(true)        //Show the x-axis
                 ;


                 /* Done setting the chart up? Time to render it!*/
                 //You need data...
                 var myData = [data];

                 var table = [];
                 for (var i = 0; i < 9; i++)
                 {
                     table.add(data.values[i].x);
                 }

                 //var x = d3.scale.ordinal()
                 //    .domain(table)
                 //    .rangePoints([0, 500]);

                 //var xAxis = d3.svg.axis()
                 //    .scale(x)
                 //    .orient("bottom");
                 chart.x(function (d, i) {
                             return i;
                     })

                 chart.xAxis     //Chart x-axis settings
                     .axisLabel('Periode')
                     .tickFormat(function (d)
                     {
                         if (data.values[d]) {
                             return data.values[d].x;
                         }
                         else {
                             return d;
                         }
                     });

                 chart.yAxis     //Chart y-axis settings
                     .axisLabel('Moyenne DSO')
                     .tickFormat(d3.format('.2f'));


                 d3.select('#chart svg')    //Select the <svg> element you want to render the chart in.   
                     .datum(myData)         //Populate the <svg> element with chart data...
                     .call(chart);          //Finally, render the chart!

                 //Update the chart when window resizes.
                 nv.utils.windowResize(function () { chart.update() });
                 return chart;

             });

        });



    }]);
})(angular.module('appMain'));

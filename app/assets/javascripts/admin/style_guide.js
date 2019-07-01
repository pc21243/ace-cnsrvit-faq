//= require chartist/chartist.min.js
//= require chartjs/Chart.min.js




// This is just for the display range on our graph. Just for the looks ya know?
const rando = (count) => {
    return Array(count).fill().map(() => Math.round(Math.random() * 10000000) + 100000)
}

// $(function() {
//
//
//     // Simple line
//
//     let chartistSimpleLine = new Chartist.Line('#ct-chart1', {
//         labels: ['18Q1', '18Q2', '18Q3', '18Q4', '19Q1'],
//         series: [
//             [12, 9, 7, 8, 5],
//             [2, 1, 3.5, 7, 3],
//             [1, 3, 4, 5, 6],
//             [12, 14, 15, 2, 5],
//             [3, 3, 42, 51, 5],
//             [2, 3, 14, 5, 5],
//             [23, 3, 4, 5, 25],
//             [23, 3, 34, 5, 5],
//             [2, 12, 12, 16, 5.5],
//             [6, 3.5, 9.5, 12, 17],
//         ]
//     }, {
//         showArea: true,
//         fullWidth: true,
//         axisY: {
//             onlyInteger: true,
//             offset: 20
//         },
//         chartPadding: {
//             right: 40
//         },
//     });
//
//     chartistSimpleLine.on('draw', function(data) {
//         if (data.type === 'line' || data.type === 'area') {
//             data.element.animate({
//                 d: {
//                     begin: 200 * data.index,
//                     dur: 1000,
//                     from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
//                     to: data.path.clone().stringify(),
//                     easing: Chartist.Svg.Easing.easeOutQuint
//                 }
//             });
//         }
//     });
//
//
//     // Line scatter diagram
//
//     var times = function(n) {
//         return Array.apply(null, new Array(n));
//     };
//
//     var data = times(26).map(Math.random).reduce(function(data, rnd, index) {
//         data.labels.push(index + 1);
//         data.series.forEach(function(series) {
//             series.push(Math.random() * 100)
//         });
//
//         return data;
//     }, {
//         labels: [],
//         series: times(4).map(function() {
//             return new Array()
//         })
//     });
//
//     var options = {
//         showLine: false,
//         axisX: {
//             labelInterpolationFnc: function(value, index) {
//                 return index % 13 === 0 ? 'W' + value : null;
//             }
//         }
//     };
//
//     new Chartist.Line('#ct-chart2', data, options);
//
//
//     // Stocked bar chart
//
//     new Chartist.Bar('#ct-chart3', {
//         labels: ['Q1', 'Q2', 'Q3', 'Q4'],
//         series: [
//             [800000, 1200000, 1400000, 1300000],
//             [200000, 400000, 500000, 300000],
//             [100000, 200000, 400000, 600000]
//         ]
//     }, {
//         stackBars: true,
//         axisY: {
//             labelInterpolationFnc: function(value) {
//                 return (value / 1000) + 'k';
//             }
//         }
//     }).on('draw', function(data) {
//         if (data.type === 'bar') {
//             data.element.attr({
//                 style: 'stroke-width: 30px'
//             });
//         }
//     });
//
//
//     // Stocked horizontal bar
//
//     new Chartist.Bar('#ct-chart4', {
//         labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//         series: [
//             [5, 4, 3, 7, 5, 10, 3],
//             [3, 2, 9, 5, 4, 6, 4]
//         ]
//     }, {
//         seriesBarDistance: 10,
//         reverseData: true,
//         horizontalBars: true,
//         axisY: {
//             offset: 70
//         }
//     });
//
//
//     // Simple pie chart
//
//     var data = {
//         series: [5, 3, 4]
//     };
//
//     var sum = function(a, b) {
//         return a + b
//     };
//
//     new Chartist.Pie('#ct-chart5', data, {
//         labelInterpolationFnc: function(value) {
//             return Math.round(value / data.series.reduce(sum) * 100) + '%';
//         }
//     });
//
//     // Gauge chart
//
//     new Chartist.Pie('#ct-chart6', {
//         series: [20, 10, 30, 40]
//     }, {
//         donut: true,
//         donutWidth: 60,
//         startAngle: 270,
//         total: 200,
//         showLabel: false
//     });
//
// });

$(function() {


    // var lineData = {
    //     labels: ["January", "February", "March", "April", "May", "June", "July"],
    //     datasets: [
    //
    //         {
    //             label: "Data 1",
    //             backgroundColor: 'rgba(26,179,148,0.5)',
    //             borderColor: "rgba(26,179,148,0.7)",
    //             pointBackgroundColor: "rgba(26,179,148,1)",
    //             pointBorderColor: "#fff",
    //             data: [28, 48, 40, 19, 86, 27, 90]
    //         }, {
    //             label: "Data 2",
    //             backgroundColor: 'rgba(220, 220, 220, 0.5)',
    //             pointBorderColor: "#fff",
    //             data: [65, 59, 80, 81, 56, 55, 40]
    //         }
    //     ]
    // };
    //
    // var lineOptions = {
    //     responsive: true
    // };
    //
    //
    // var ctx = document.getElementById("lineChart").getContext("2d");
    // new Chart(ctx, {
    //     type: 'line',
    //     data: lineData,
    //     options: lineOptions
    // });

    var barData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
                label: "PWN",
                backgroundColor: 'rgb(229, 115, 115)',
                borderColor: "rgba(229, 115, 115, 0.7)",
                pointBackgroundColor: "rgb(229, 115, 115)",
                pointBorderColor: "#fff",
                data: rando(8)
            },
            {
                label: "PWC",
                backgroundColor: 'rgb(144, 202, 249)',
                borderColor: "rgba(144, 202, 249, 0.7)",
                pointBackgroundColor: "rgb(144, 202, 249)",
                pointBorderColor: "#fff",
                data: rando(8)
            },
            {
                label: "PWS",
                backgroundColor: 'rgb(230, 238, 156)',
                borderColor: "rgba(230, 238, 156, 0.7)",
                pointBackgroundColor: "rgb(230, 238, 156)",
                pointBorderColor: "#fff",
                data: rando(8)
            },
            {
                label: "YCC",
                backgroundColor: 'rgb(197, 225, 165)',
                borderColor: "rgba(197, 225, 165, 0.7)",
                pointBackgroundColor: "rgb(197, 225, 165)",
                pointBorderColor: "#fff",
                data: rando(8)
            },
            {
                label: "SEN",
                backgroundColor: 'rgb(244, 143, 177)',
                borderColor: "rgba(244, 143, 177, 0.7)",
                pointBackgroundColor: "rgb(244, 143, 177)",
                pointBorderColor: "#fff",
                data: rando(8)
            },
            {
                label: "MTW",
                backgroundColor: 'rgb(129, 212, 250)',
                borderColor: "rgba(129, 212, 250, 0.7)",
                pointBackgroundColor: "rgb(129, 212, 250)",
                pointBorderColor: "#fff",
                data: rando(8)
            },
            {
                label: "SWA",
                backgroundColor: 'rgba(255, 224, 130, 1)',
                borderColor: "rgba(255, 224, 130, 0.7)",
                pointBackgroundColor: "rgba(255, 224, 130, 1)",
                pointBorderColor: "#fff",
                data: rando(8)
            },
            {
                label: "SWT",
                backgroundColor: 'rgba(255, 171, 145, 1)',
                borderColor: "rgba(255, 171, 145, 0.7)",
                pointBackgroundColor: "rgba(255, 171, 145, 1)",
                pointBorderColor: "#fff",
                data: rando(8)

            }
        ],

    };

    var barOptions = {
        responsive: true
    };


    var ctx2 = document.getElementById("barChart").getContext("2d");
    new Chart(ctx2, {
        type: 'bar',
        data: barData,
        options: barOptions
    });

    var doughnutData = {
        labels: ["Draft", "Review", "Approved", "Paid"],
        datasets: [{
            data: rando(4),
            backgroundColor: [
                "rgba(255, 224, 130, 1)", "rgb(129, 212, 250)", "rgba(255, 171, 145, 1)", "rgb(197, 225, 165)"
            ],
        }]
    };


    var doughnutOptions = {
        responsive: true
    };


    var ctx4 = document.getElementById("doughnutChart").getContext("2d");
    new Chart(ctx4, {
        type: 'doughnut',
        data: doughnutData,
        options: doughnutOptions
    });



});
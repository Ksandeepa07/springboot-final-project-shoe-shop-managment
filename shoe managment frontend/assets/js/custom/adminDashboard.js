
let itemId=[];
let itemQtyTotal=[];
let topSellingItemTotal=0;
let topSellingItemTotalForADay=0;


loadTopSellingItems();
// loadTopSellingItemsForADay();

/*all time top selling items*/
 function loadTopSellingItems() {
     $.ajax({
        url: "http://localhost:8080/api/v1/dashboard/mostSalesItem",
        "headers": {
            "Authorization": "Bearer " + token
        },
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            console.log(response.length);
            loadPieChartDatOfAllTImeSellingProducts(response);
            // loadPieChartDatOfSingleImeSellingProducts(response);

        },
        error: function (xhr, status, err) {
            console.log(err)
            console.log(xhr.status);


        }
    })

}

/*pie chart data*/
function loadPieChartDatOfAllTImeSellingProducts(response){

    $.each(response, function (index, topSelling) {
        itemId.push(topSelling.item_id)
        itemQtyTotal.push(topSelling.total)
        loadItemsDetailsOnMostSellingItemCodes();

    })

    if ($("#mostSellingItemsAllTime").length) {
        var areaData = {
            labels: [itemId[0],itemId[1],itemId[2]],
            datasets: [{
                data: [itemQtyTotal[0], itemQtyTotal[1], itemQtyTotal[2]],
                backgroundColor: [
                    "#8F5FE8","#00d25b","#ffab00"
                ]
            }
            ]
        };
        var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            segmentShowStroke: false,
            cutoutPercentage: 70,
            elements: {
                arc: {
                    borderWidth: 0
                }
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: true
            }
        }
        var transactionhistoryChartPlugins = {
            beforeDraw: function(chart) {
                var width = chart.chart.width,
                    height = chart.chart.height,
                    ctx = chart.chart.ctx;

                ctx.restore();
                var fontSize = 1;
                ctx.font = fontSize + "rem sans-serif";
                ctx.textAlign = 'left';
                ctx.textBaseline = "middle";
                ctx.fillStyle = "#ffffff";

                var text = "$"+topSellingItemTotal,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2.4;

                ctx.fillText(text, textX, textY);

                ctx.restore();
                var fontSize = 0.75;
                ctx.font = fontSize + "rem sans-serif";
                ctx.textAlign = 'left';
                ctx.textBaseline = "middle";
                ctx.fillStyle = "#6c7293";

                var texts = "Total",
                    textsX = Math.round((width - ctx.measureText(text).width) / 1.93),
                    textsY = height / 1.7;

                ctx.fillText(texts, textsX, textsY);
                ctx.save();
            }
        }

        var transactionhistoryChartCanvas = $("#mostSellingItemsAllTime").get(0).getContext("2d");

        var transactionhistoryChart = new Chart(transactionhistoryChartCanvas, {
            type: 'doughnut',
            data: areaData,
            options: areaOptions,
            plugins: transactionhistoryChartPlugins
        });

    }
}

function loadItemsDetailsOnMostSellingItemCodes(){

    for (let i = 0; i <itemId.length ; i++) {
        $.ajax({
            url: "http://localhost:8080/api/v1/dashboard/findByCode/"+itemId[i],
            method: "GET",
            "headers": {
                "Authorization": "Bearer "+token
            },
            success: function (response) {
                console.log(response);
                topSellingItemTotal=topSellingItemTotal+parseInt(response.salePrice)*parseInt(itemQtyTotal[i]);
                console.log(parseInt(topSellingItemTotal))
            },
            error: function (xhr, status, err) {
                console.log(err)

            }
        })
    }

}



/*load most selling items in single day*/

$("#searchByDaySelling").click(function (){
    loadTopSellingItemsForADay();
})

function loadTopSellingItemsForADay() {

    console.log($("#singleDaySelling").val())

    $.ajax({
        url: "http://localhost:8080/api/v1/dashboard/mostSaleItemForADay/"+$("#singleDaySelling").val(),
        "headers": {
            "Authorization": "Bearer " + token
        },
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            console.log(response.length);
            loadPieChartDatOfSingleImeSellingProducts(response);


            $.ajax({
                url: "http://localhost:8080/api/v1/dashboard/findByCode/"+response.item_id,
                method: "GET",
                "headers": {
                    "Authorization": "Bearer "+token
                },
                success: function (responseForDetails) {

                    console.log(responseForDetails.salePrice);
                    topSellingItemTotalForADay=topSellingItemTotalForADay+parseInt(responseForDetails.salePrice)*parseInt(response.total);
                    console.log(parseInt(topSellingItemTotalForADay))
                },
                error: function (xhr, status, err) {
                    console.log(err)

                }
            })

        },
        error: function (xhr, status, err) {
            console.log(err)
            console.log(xhr.status);
            if (xhr.status===404){
                alert("No orders available for selected date!!")
            }
        }
    })

}



function loadPieChartDatOfSingleImeSellingProducts(response){

    if ($("#mostSellingItemsForADay").length) {
        var areaData = {
            labels: [response.item_id],
            datasets: [{
                data: [response.total],
                backgroundColor: [
                   "#ffab00"
                ]
            }
            ]
        };
        var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            segmentShowStroke: false,
            cutoutPercentage: 70,
            elements: {
                arc: {
                    borderWidth: 0
                }
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: true
            }
        }
        var transactionhistoryChartPlugins = {
            beforeDraw: function(chart) {
                var width = chart.chart.width,
                    height = chart.chart.height,
                    ctx = chart.chart.ctx;

                ctx.restore();
                var fontSize = 1;
                ctx.font = fontSize + "rem sans-serif";
                ctx.textAlign = 'left';
                ctx.textBaseline = "middle";
                ctx.fillStyle = "#ffffff";

                var text = "$"+topSellingItemTotalForADay,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2.4;

                ctx.fillText(text, textX, textY);

                ctx.restore();
                var fontSize = 0.75;
                ctx.font = fontSize + "rem sans-serif";
                ctx.textAlign = 'left';
                ctx.textBaseline = "middle";
                ctx.fillStyle = "#6c7293";

                var texts = "Total",
                    textsX = Math.round((width - ctx.measureText(text).width) / 1.93),
                    textsY = height / 1.7;

                ctx.fillText(texts, textsX, textsY);
                ctx.save();
            }
        }

        var transactionhistoryChartCanvas = $("#mostSellingItemsForADay").get(0).getContext("2d");

        var transactionhistoryChart = new Chart(transactionhistoryChartCanvas, {
            type: 'doughnut',
            data: areaData,
            options: areaOptions,
            plugins: transactionhistoryChartPlugins
        });

    }
}





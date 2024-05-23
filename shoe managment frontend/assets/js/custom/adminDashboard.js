let proPic = ` <img alt="" class="img-xs rounded-circle " src="data:image/png;base64,${localStorage.getItem("userProPic")}">
                        <span class="count bg-success"></span>`;
$(".userPic").append(proPic);
$(".userName").text(localStorage.getItem("userName"));

let itemId=[];
let itemQtyTotal=[];
let topSellingItemTotal=0;
let topSellingItemTotalForADay=0;

/*pie chart vars*/
var mostSellingItemForADay;
var totalProfitChart;
var totalSalesChart;

/*price vars*/
let totalSalePriceForADay=0;
let totalBuyPriceForDay=0;


loadTopSellingItems();
loadTopSellingItemsForADay();
singleDaySales();
singleDayProfits();
countCustomers();
countEmployees();
countSuppliers();
countOrders();



/*load today date*/
function loadDate(){

    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    return year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

}


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
        console.log(index)
        itemId.push(topSelling.item_id)
        itemQtyTotal.push(topSelling.total)

    })

    loadItemsDetailsOnMostSellingItemCodes();

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
                setDataToDashboardTopSellingCards(response);
                topSellingItemTotal=topSellingItemTotal+parseInt(response.salePrice)*parseInt(itemQtyTotal[i]);
                console.log(parseInt(topSellingItemTotal))

                let cardData=` <div class="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                                    <div class="text-md-center text-xl-left">
                                        <h6 class="mb-1">${itemId[i]}</h6>
                                        <p class="text-muted mb-0">${response.name}</p>
                                    </div>
                                    <div class="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                                        <h6 class="font-weight-bold mb-0">${itemQtyTotal[i]}</h6>
                                    </div>
                                </div>`

                $(".topSellingItemDetailsCards").append(cardData);

            },
            error: function (xhr, status, err) {
                console.log(err)

            }
        })
    }

}


function setDataToDashboardTopSellingCards(response){

    let cardData=`   <div class="col-sm-4 grid-margin">
                        <div class="card">
                            <div class="card-body">
                                <h5>Top Selling</h5>
                                <div class="row">
                                    <div class="col-8 col-sm-12 col-xl-8 my-auto">
                                        <div class="d-flex d-sm-block d-md-flex align-items-center">
                                            <h6 class="mb-0">${response.name}</h6>
                                        </div>
                                        <h6 class="text-muted font-weight-normal">$${response.salePrice}</h6>
                                    </div>
                                    <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                                        <img style="width: 60px;height:60px;" src="${response.itemPic}">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`

    $("#topSellingProductCards").append(cardData);



}









/*load most selling items in single day*/
$("#searchByDaySelling").click(function (){
        if (mostSellingItemForADay) {
            mostSellingItemForADay.destroy();
        }
        topSellingItemTotalForADay=0;
        loadTopSellingItemsForADay();
    })

function loadTopSellingItemsForADay() {
    let dateValue;

    if ($("#singleDaySelling").val()!==""){
        dateValue=$("#singleDaySelling").val();

    }else{
        dateValue=loadDate();
    }


    $.ajax({
        url: "http://localhost:8080/api/v1/dashboard/mostSaleItemForADay/"+dateValue,
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
                    $("#singleDayPieChartItemCode").text(response.item_id)
                    $("#singleDayPieChartItemName").text(responseForDetails.name)
                    $("#singleDayPieChartItemQty").text(response.total)
                    $("#singleDayPieChartItemImage").attr("src", responseForDetails.itemPic);

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

        mostSellingItemForADay = new Chart(transactionhistoryChartCanvas, {
            type: 'doughnut',
            data: areaData,
            options: areaOptions,
            plugins: transactionhistoryChartPlugins
        });

    }
}








/*total sales and profits for a day*/

/*sales*/
$("#singleDaySalesANdProfitsBTn").click(function (){

    if (totalProfitChart) {
        totalProfitChart.destroy();
    }

    if (totalSalesChart) {
        totalSalesChart.destroy();
    }
    totalSalePriceForADay=0;
    totalBuyPriceForDay=0;
    singleDaySales();
    singleDayProfits();
})

function singleDaySales(){

    let dateValue;
    if ($("#singleDaySalesANdProfits").val()!==""){
        dateValue=$("#singleDaySalesANdProfits").val();
    }else{
        dateValue=loadDate();
    }


    $.ajax({
        url: "http://localhost:8080/api/v1/dashboard/totalSalesForADay/"+dateValue,
        "headers": {
            "Authorization": "Bearer " + token
        },
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            console.log(response.length);

            totalSalePriceForADay=parseInt(response);
            loadPieChartTotalSalesForADay();
        },
        error: function (xhr, status, err) {
            console.log(err)
            console.log(xhr.status);
            alert("No orders available for selected date!!")
            totalProfitChart.destroy();
            totalSalesChart.destroy();
        }
    })

}

function loadPieChartTotalSalesForADay(){

    if ($("#totalSalesForADay").length) {
        var areaData = {
            labels: [totalSalePriceForADay],
            datasets: [{
                data: [totalSalePriceForADay],
                backgroundColor: [
                    "#fc424a"
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
                var fontSize = 12;
                ctx.font = fontSize + "px sans-serif";
                ctx.textAlign = 'left';
                ctx.textBaseline = "middle";
                ctx.fillStyle = "#ffffff";

                var text = "$"+totalSalePriceForADay,
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

        var transactionhistoryChartCanvas = $("#totalSalesForADay").get(0).getContext("2d");

         totalSalesChart = new Chart(transactionhistoryChartCanvas, {
            type: 'doughnut',
            data: areaData,
            options: areaOptions,
            plugins: transactionhistoryChartPlugins
        });

    }
}



/*profits*/
function singleDayProfits(){

    let dateValue;
    if ($("#singleDaySalesANdProfits").val()!==""){
        dateValue=$("#singleDaySalesANdProfits").val();
    }else{
        dateValue=loadDate();
    }

    $.ajax({
        url: "http://localhost:8080/api/v1/dashboard/allItemsCodesSellingForADay/"+dateValue,
        "headers": {
            "Authorization": "Bearer " + token
        },
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            console.log(response.length);
            // loadPieChartTotalProfitsForADay(response);
            loadItemsDetailsOnResult(response);
        },
        error: function (xhr, status, err) {
            console.log(err)
            console.log(xhr.status);
            // if (xhr.status===404){
            //     alert("No orders available for selected date!!")
            // }
        }
    })

}

function loadItemsDetailsOnResult(response){
    $.each(response,function (index,item){

        $.ajax({
            url: "http://localhost:8080/api/v1/dashboard/findByCode/"+item.item_id,
            method: "GET",
            "headers": {
                "Authorization": "Bearer "+token
            },
            success: function (itemResponse) {
                console.log(itemResponse.buyPrice)
                console.log(item.item_qty)
                totalBuyPriceForDay=totalBuyPriceForDay+parseInt(itemResponse.buyPrice)*parseInt(item.item_qty);
                console.log(parseInt(totalBuyPriceForDay))
                loadPieChartTotalProfitsForADay();

                $("#pieChartTotalSalesForTheDay").text("$"+totalSalePriceForADay)
                let profit=totalSalePriceForADay-totalBuyPriceForDay;
                $("#pieChartTotalProfitsForTheDay").text("$"+profit)
                if ($("#singleDaySalesANdProfits").val()!==""){
                    $(".pieChartDate").text($("#singleDaySalesANdProfits").val())
                }else{
                    $(".pieChartDate").text(loadDate())
                }

            },
            error: function (xhr, status, err) {
                console.log(err)

            }
        })

    })
}

function loadPieChartTotalProfitsForADay(){

    console.log(totalSalePriceForADay)
    console.log(totalBuyPriceForDay)
    let profit=parseInt(totalSalePriceForADay)-parseInt(totalBuyPriceForDay);
    console.log(profit)

    if ($("#totalProfitsForADay").length) {
        var areaData = {
            labels: [profit],
            datasets: [{
                data: [profit],
                backgroundColor: [
                    "#00d25b"
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
                var fontSize = 12;
                ctx.font = fontSize + "px sans-serif";
                ctx.textAlign = 'left';
                ctx.textBaseline = "middle";
                ctx.fillStyle = "#ffffff";

                var text = "$"+profit,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2.4;

                ctx.fillText(text, textX, textY);

                ctx.restore();
                var fontSize = 0.75;
                ctx.font = fontSize + "rem sans-serif";
                ctx.textAlign = 'left';
                ctx.textBaseline = "middle";
                ctx.fillStyle = "#6c7293";

                var texts = "Profit",
                    textsX = Math.round((width - ctx.measureText(text).width) / 1.93),
                    textsY = height / 1.7;

                ctx.fillText(texts, textsX, textsY);
                ctx.save();
            }
        }

        var transactionhistoryChartCanvas = $("#totalProfitsForADay").get(0).getContext("2d");

         totalProfitChart = new Chart(transactionhistoryChartCanvas, {
            type: 'doughnut',
            data: areaData,
            options: areaOptions,
            plugins: transactionhistoryChartPlugins
        });

    }


}




/*count customers*/
function countCustomers(){
    $.ajax({
        url: "http://localhost:8080/api/v1/dashboard/countCustomers",
        "headers": {
            "Authorization": "Bearer "+token
        },
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            if (response<10){
                $("#customerCount").text("0"+response)
            }else{
                $("#customerCount").text(response)
            }


        },
        error: function (xhr, status, err) {
            console.log(err)
            console.log(xhr.status);
        }
    })
}

/*count employees*/
function countEmployees(){
    $.ajax({
        url: "http://localhost:8080/api/v1/dashboard/countEmployees",
        "headers": {
            "Authorization": "Bearer "+token
        },
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            if (response<10){
                $("#employeesCount").text("0"+response)
            }else{
                $("#employeesCount").text(response)
            }


        },
        error: function (xhr, status, err) {
            console.log(err)
            console.log(xhr.status);
        }
    })
}

/*count suppliers*/
function countSuppliers(){
    $.ajax({
        url: "http://localhost:8080/api/v1/dashboard/countSuppliers",
        "headers": {
            "Authorization": "Bearer "+token
        },
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            if (response<10){
                $("#suppliersCount").text("0"+response)
            }else{
                $("#suppliersCount").text(response)
            }

        },
        error: function (xhr, status, err) {
            console.log(err)
            console.log(xhr.status);
        }
    })
}

/*count orders*/
function countOrders(){
    $.ajax({
        url: "http://localhost:8080/api/v1/dashboard/countOrders",
        "headers": {
            "Authorization": "Bearer "+token
        },
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            if (response<10){
                $("#ordersCount").text("0"+response)
            }else{
                $("#ordersCount").text(response)
            }

        },
        error: function (xhr, status, err) {
            console.log(err)
            console.log(xhr.status);
        }
    })
}


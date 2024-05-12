getAllSales();
let getAllResponse;
function getAllSales(){

    $.ajax({
        url: "http://localhost:8080/api/v1/sales/getAll",
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            getAllResponse=response;
            console.log(response.length);
            setLastDaysSalesDataToTable(response)
        },
        error: function (xhr, status, err) {
            console.log(err)
        }
    })

}

function setLastDaysSalesDataToTable(response) {
    $("#rTable").empty();

    /*filter last 3 days data*/

    $.each(response, function (index, sales) {

        const orderDate = new Date(sales.orderDate);
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(new Date().getDate() - 3);

        if (orderDate >= threeDaysAgo){

            if (sales.customerName==="" || sales.customerName===null){
                sales.customerName="Not a loyalty customer"
            }

            if (sales.addedPoints===null){
                sales.addedPoints="No points added"
            }

            if (sales.customerId===null){
                sales.customerId="Not a loyalty customer";
            }

            let formattedDateTime=convertToDateAndTime(sales.orderDate)
            let data = `<tr>
                            <td>${sales.orderId}</td>
                            <td>${sales.customerId}</td>
                            <td>${sales.customerName}</td>
                            <td>${formattedDateTime}</td>
                            <td>${sales.paymentMethod}</td>
                            <td>${sales.totalPrice}</td>
                            <td>${sales.addedPoints}</td>
                            <td>${sales.cashierName}</td>
                            <td><button  onclick="openSmallRefundTable()" type="button"  data-toggle="modal" data-target="#exampleModal" class="btn bg-primary refundBtn ">Refund & Details</button></td>
                            </tr>`
            $("#rTable").append(data);
        }

    });
}
function openSmallRefundTable(){
    $('#rTable').on('click', 'tr', function (){
        var oCode= $(this).find('td:eq(0)').text();
        var cCode= $(this).find('td:eq(1)').text();
        var cName= $(this).find('td:eq(2)').text();
        var date= $(this).find('td:eq(3)').text();
        var paymentMethod= $(this).find('td:eq(4)').text();
        var ttPrice= $(this).find('td:eq(5)').text();
        var points= $(this).find('td:eq(6)').text();
        var cashierName= $(this).find('td:eq(7)').text();

        $.each(getAllResponse,function (index,response){
            if (oCode===response.orderId){
                $("#rsTable").empty();
                for (let i = 0; i < response.salesServices.length; i++) {
                    console.log(response.salesServices[i]);
                    console.log(response.salesServices[i].size);

                    let data = `<tr>
                            <td>${response.salesServices[i].order_Id}</td>
                            <td>${response.salesServices[i].item_id}</td>
                            <td>${response.salesServices[i].size}</td>
                            <td>${response.salesServices[i].itemQty}</td>
                            <td>${response.salesServices[i].unitPrice}</td>
                            <td><button onclick="sendAjaxReqToRefund()" type="button" class="btn bg-primary miniRefundBtn">Refund</button></td>                      
                            </tr>`
                    $("#rsTable").append(data);
                }
                // setDataToModal(response);
            }
        })

    });

}

function sendAjaxReqToRefund(){

    $('#rsTable').on('click', 'tr', function () {
        let row=$(this);
        var orderId = $(this).find('td:eq(0)').text();
        var itemId = $(this).find('td:eq(1)').text();
        var itemSize = $(this).find('td:eq(2)').text();
        var itemQty = $(this).find('td:eq(3)').text();
        var price = $(this).find('td:eq(4)').text();

        $.ajax({
            url: 'http://localhost:8080/api/v1/sales/refundOrDelete',
            method:"Patch",
            dataType:"json",
            contentType:"application/json",
            data:JSON.stringify({
                "orderId":orderId,
                "itemId":itemId,
                "size":itemSize,
                "qty":itemQty,
                "price":price
            }),

            success:function (response){
                console.log(response)
                row.remove();

                alert("Refund successful !!")
                getAllSales();

            },
            error:function (xhr,status,err,response) {
                console.log(err)
                console.log(xhr.status)

            }
        })

    })


}

/*this method takes two clicks to load open modal*/

// $(document).on('click', '.refundBtn', function() {
//
//     $('#rTable').on('click', 'tr', function (){
//         var oCode= $(this).find('td:eq(0)').text();
//         var cCode= $(this).find('td:eq(1)').text();
//         var cName= $(this).find('td:eq(2)').text();
//         var date= $(this).find('td:eq(3)').text();
//         var paymentMethod= $(this).find('td:eq(4)').text();
//         var ttPrice= $(this).find('td:eq(5)').text();
//         var points= $(this).find('td:eq(6)').text();
//         var cashierName= $(this).find('td:eq(7)').text();
//
//         $.each(getAllResponse,function (index,response){
//             if (oCode===response.orderId){
//                 $("#rsTable").empty();
//                 for (let i = 0; i < response.salesServices.length; i++) {
//                     console.log(response.salesServices[i]);
//                     console.log(response.salesServices[i].size);
//
//                     let data = `<tr>
//                             <td>${response.salesServices[i].order_Id}</td>
//                             <td>${response.salesServices[i].item_id}</td>
//                             <td>${response.salesServices[i].size}</td>
//                             <td>${response.salesServices[i].itemQty}</td>
//                             <td>${response.salesServices[i].unitPrice}</td>
//                             <td><button type="button" class="btn bg-primary miniRefundBtn">Refund</button></td>
//                             </tr>`
//                     $("#rsTable").append(data);
//                     $('#exampleModal').modal();
//                 }
//                 // setDataToModal(response);
//             }
//         })
//
//     });
// });

/*this method take long to make req*/
// $(document).on('click', '.miniRefundBtn', function() {
//
//     $('#rsTable').on('click', 'tr', function () {
//         var orderId = $(this).find('td:eq(0)').text();
//         var itemId = $(this).find('td:eq(1)').text();
//         var itemSize = $(this).find('td:eq(2)').text();
//         var itemQty = $(this).find('td:eq(3)').text();
//         var price = $(this).find('td:eq(4)').text();
//
//         $.ajax({
//             url: 'http://localhost:8080/api/v1/sales/refundOrDelete',
//             method:"Patch",
//             dataType:"json",
//             contentType:"application/json",
//             data:JSON.stringify({
//                 "orderId":orderId,
//                 "itemId":itemId,
//                 "size":itemSize,
//                 "qty":itemQty,
//                 "price":price
//             }),
//
//             success:function (response){
//                 console.log(response)
//
//             },
//             error:function (xhr,status,err,response) {
//                 console.log(err)
//                 console.log(xhr.status)
//
//             }
//         })
//
//     })
// })


function convertToDateAndTime(date){
    let newDate = new Date(date);

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');

    const hours = String(newDate.getHours()).padStart(2, '0');
    const minutes = String(newDate.getMinutes()).padStart(2, '0');
    const seconds = String(newDate.getSeconds()).padStart(2, '0');
    const formattedDateTime = `${year}-${month}-${day} / ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}


/*search table*/

$("#rSearch").on("input", function () {
    $("#rTable").empty();
    let id=$("#rSearch").val();
    console.log(name.trim())
    $.ajax({
        url: 'http://localhost:8080/api/v1/sales/searchById?id='+id,
        method:"GET",
        dataType: "json",
        success:function (response) {

            console.log(response)

            $.each(response, function (index, sales) {

                setTimeout(function (){
                    $("#rTable").empty();
                    const orderDate = new Date(sales.orderDate);
                    const threeDaysAgo = new Date();
                    threeDaysAgo.setDate(new Date().getDate() - 3);

                    if (orderDate >= threeDaysAgo){

                        if (sales.customerName==="" || sales.customerName===null){
                            sales.customerName="Not a loyalty customer"
                        }

                        if (sales.addedPoints===null){
                            sales.addedPoints="No points added"
                        }

                        if (sales.customerId===null){
                            sales.customerId="Not a loyalty customer";
                        }

                        let formattedDateTime=convertToDateAndTime(sales.orderDate)
                        let data = `<tr>
                            <td>${sales.orderId}</td>
                            <td>${sales.customerId}</td>
                            <td>${sales.customerName}</td>
                            <td>${formattedDateTime}</td>
                            <td>${sales.paymentMethod}</td>
                            <td>${sales.totalPrice}</td>
                            <td>${sales.addedPoints}</td>
                            <td>${sales.cashierName}</td>
                            <td><button  onclick="openSmallRefundTable()" type="button"  data-toggle="modal" data-target="#exampleModal" class="btn bg-primary refundBtn ">Refund & Details</button></td>
                            </tr>`
                        $("#rTable").append(data);
                    }

                },600,index)
            })

        },
        error:function (xhr,status,err) {
            console.log(err)
        }
    })
});





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
            setSalesDataToTable(response)
        },
        error: function (xhr, status, err) {
            console.log(err)
        }
    })

}

function setSalesDataToTable(response) {
    $("#rTable").empty();
    $.each(response, function (index, sales) {

        let data = `<tr>
                            <td>${sales.orderId}</td>
                            <td>${sales.customerId}</td>
                            <td>${sales.customerName}</td>
                            <td>${sales.orderDate}</td>
                            <td>${sales.paymentMethod}</td>
                            <td>${sales.totalPrice}</td>
                            <td>${sales.addedPoints}</td>
                            <td>${sales.cashierName}</td>
                            <td><button type="button" data-toggle="modal" data-target="#exampleModal" class="btn bg-primary refundBtn">Refund & Details</button></td>
                            </tr>`
        $("#rTable").append(data);
    });
}

$(document).on('click', '.refundBtn', function() {

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

                for (let i = 0; i < response.salesServices.length; i++) {
                    console.log(response.salesServices[i]);
                    console.log(response.salesServices[i].size);

                    let data = `<tr>
                            <td>${response.salesServices[i].order_Id}</td>
                            <td>${response.salesServices[i].item_id}</td>
                            <td>${response.salesServices[i].size}</td>
                            <td>${response.salesServices[i].itemQty}</td>
                            <td><button type="button" class="btn bg-primary miniRefundBtn">Refund</button></td>
                         
                            </tr>`
                    $("#rsTable").append(data);
                }
                // setDataToModal(response);
            }
        })

    });
});

$(document).on('click', '.miniRefundBtn', function() {

    $('#rsTable').on('click', 'tr', function () {
        var orderId = $(this).find('td:eq(0)').text();
        var itemId = $(this).find('td:eq(1)').text();
        var itemSize = $(this).find('td:eq(2)').text();
        var itemQty = $(this).find('td:eq(3)').text();


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
            }),

            success:function (response){
                console.log(response)

            },
            error:function (xhr,status,err,response) {
                console.log(err)
                console.log(xhr.status)

            }
        })

    })
})



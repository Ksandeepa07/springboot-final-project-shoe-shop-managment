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
            setAllSalesToTable(response)
        },
        error: function (xhr, status, err) {
            console.log(err)
        }
    })

}

function setAllSalesToTable(response) {
    $("#saleTable").empty();

    /*filter last 3 days data*/

    $.each(response, function (index, sales) {

            if (sales.customerName===""){
                sales.customerName="Not a loyalty customer"
            }

            if (sales.addedPoints===null){
                sales.addedPoints="No points added"
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
                            <td><button type="button" data-toggle="modal" data-target="#exampleModal" class="btn bg-primary shoeMBtn">Show More</button></td>
                            </tr>`
            $("#saleTable").append(data);


    });
}

$(document).on('click', '.shoeMBtn', function() {

    $('#saleTable').on('click', 'tr', function (){
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
                $("#allSaleMiniTable").empty();
                for (let i = 0; i < response.salesServices.length; i++) {
                    console.log(response.salesServices[i]);
                    console.log(response.salesServices[i].size);

                    let data = `<tr>
                            <td>${response.salesServices[i].order_Id}</td>
                            <td>${response.salesServices[i].item_id}</td>
                            <td>${response.salesServices[i].size}</td>
                            <td>${response.salesServices[i].itemQty}</td>
                            <td>${response.salesServices[i].unitPrice}</td>
                            </tr>`
                    $("#allSaleMiniTable").append(data);
                }
                // setDataToModal(response);
            }
        })

    });
});


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

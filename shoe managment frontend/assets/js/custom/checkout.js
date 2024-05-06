

// ------------step-wizard-------------
$(document).ready(function () {
    $('.nav-tabs > li a[title]').tooltip();

    //Wizard
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

        var target = $(e.target);

        if (target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var active = $('.wizard .nav-tabs li.active');
        active.next().removeClass('disabled');
        nextTab(active);

    });
    $(".prev-step").click(function (e) {

        var active = $('.wizard .nav-tabs li.active');
        prevTab(active);

    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}


$('.nav-tabs').on('click', 'li', function() {
    $('.nav-tabs li.active').removeClass('active');
    $(this).addClass('active');
});

// ------------step-wizard end-------------


loadAllCustomerInCheckOut();
loadAllItemInCheckOut();

/*customers load*/
function loadAllCustomerInCheckOut(){
    $.ajax({
        url: "http://localhost:8080/api/v1/customer/getAllCustomers",
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            console.log(response.length);
            loadAllCustomerInCheckOutComboBox(response);
        },
        error: function (xhr, status, err) {
            console.log(err)
        }
    })
}

function loadAllCustomerInCheckOutComboBox(response) {
    $("#pCustomerCode").empty();
    $.each(response, function (index, customer) {
       let data=`<option>${customer.code}</option>`
        $("#pCustomerCode").append(data);
    });
}

$("#pCustomerCode").click(function (){
    let code=$("#pCustomerCode").val();
    $.ajax({
        url: "http://localhost:8080/api/v1/customer/findByCode/"+code,
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            // console.log(response.length);

            $("#pCustomerName").val(response.name);
            $("#pCustomerEmail").val(response.email);
            $("#PCustomerContact").val(response.contact);
            $("#pLevel").text(response.loyaltyLevel);
        },
        error: function (xhr, status, err) {
            console.log(err)
        }
    })
})


/*items load*/


function loadAllItemInCheckOut(){
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/getALl",
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            console.log(response.length);
            loadAllItemInCheckOutComboBox(response);
        },
        error: function (xhr, status, err) {
            console.log(err)
        }
    })
}

function loadAllItemInCheckOutComboBox(response) {
    $("#pItemCode").empty();
    $.each(response, function (index, inventory) {
        let data=`<option>${inventory.code}</option>`
        $("#pItemCode").append(data);
    });
}

let imageResponse;

$("#pItemCode").click(function (){
    let code=$("#pItemCode").val();
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/findByCode/"+code,
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            console.log(response.length);

            $("#pItemName").val(response.name);
            $("#pItemCategory").val(response.category);
            $("#pItemPrice").val(response.salePrice);
            imageResponse=response.itemPic;
            let image=`<img style="width:100px;height: 80px; border-radius:10%;" alt="image" src="${response.itemPic}"/>`
            $(".pItemImage").empty();
            $(".pItemImage").append(image)
            loadItemSizesToComboBox(response);
            // $("#pI").text(response.loyaltyLevel);
        },
        error: function (xhr, status, err) {
            console.log(err)
        }
    })
})

let newShoeSizes=[];
function loadItemSizesToComboBox(response){
    $("#pItemSizes").empty();

    // for (let i = 0; i < response.shoeSizes.length; i++) {
    //     let data=`<option>${response.shoeSizes[i].size}</option>`;
    //     $("#pItemSizes").append(data)
    // }

    newShoeSizes=response.shoeSizes;
    $.each(response.shoeSizes, function(index, item) {
        let data = `<option>${item.size}</option>`;
        $("#pItemSizes").append(data);
    });

    console.log(newShoeSizes)

}

$("#pItemSizes").click(function (){

    $.each(newShoeSizes, function(index, item) {
        console.log(item.size)
        if($("#pItemSizes").val()===item.size){
            $("#pItemQuantity").val(item.qty);
            $("#pItemStatus").val(item.status);

        }
    })

})


let addToCartArray=[];

/*add to cart function starts here*/
$("#pAddTOCartBtn").click(function (){

    let code=$("#pItemCode").val();
    let name=$("#pItemName").val();
    let size=$("#pItemSizes").val();
    let unitPrice=$("#pItemPrice").val()
    let buyingQty=$("#pBuyingQuantity").val();

    // let total=parseInt(unitPrice)*parseInt(buyingQty);

    // console.log(code)
    // console.log(name)
    // console.log(size)
    // console.log(unitPrice)
    // console.log(buyingQty)

    let cartItems={
        item_id:code,
        name:name,
        size:size,
        unitPrice:unitPrice,
        itemQty:buyingQty,
        pic:$(".pItemImage").html(),
    }

    if (addToCartArray.length===0){
        addToCartArray.push(cartItems);
    }else{

        for (let i = 0; i < addToCartArray.length; i++) {
            if (addToCartArray[i].item_id===code && addToCartArray[i].size===size){
                let newCardDetails = searchOrder(addToCartArray[i].item_id,addToCartArray[i].size);
                newCardDetails.itemQty=parseInt(buyingQty)+parseInt(newCardDetails.itemQty);
                // newCardDetails.total=parseInt(addToCartArray[i].total)+total;

                calculateNetTotal();
                setDataToCart();
                return
            }
        }
        addToCartArray.push(cartItems);
    }

    calculateNetTotal();
    setDataToCart();

})


function setDataToCart(){
    $(".appendToCart").empty();
    $.each(addToCartArray,function (index, item){

        var matches = item.pic.match(/src="data:image\/(jpeg|png);base64,([^"]+)"/);

        if (matches) {
            var base64Data = matches[2];
            let cartItem=`<div class="col-12 d-flex " style="height: 120px">
                                      <div class="me-3 position-relative imageAdd">
                                            <img class="img-sm rounded border" src="data:image/jpeg;base64,${base64Data}" style="height: 96px; width: 120px;" alt="image"/>
                                      </div>

                                 <div class="">
                                     <p class="nav-link mb-0 font-weight-bold" href="#">${item.name}<br/></p>
                                     <p class="price mx-3"><span class="font-weight-bold">$${item.unitPrice}</span></p>
                                     <p class="price mx-3"><span class="font-weight-bold">${item.size} x ${item.itemQty}</span></p>
                                 </div>
                         </div>`

            $(".appendToCart").append(cartItem);
        }

    })
}

 function calculateNetTotal(){
    //  let netTotal=0;
    //  for (let i = 0; i < addToCartArray.length; i++) {
    //     console.log(parseInt(addToCartArray[i].unitPrice));
    //     console.log(parseInt(addToCartArray[i].itemQty));
    //     netTotal=netTotal+(parseInt(addToCartArray[i].total));
    //      $("#netTotal").text(netTotal)
    // }

     let netTotal=0;
     for (let i = 0; i < addToCartArray.length; i++) {
         console.log(parseInt(addToCartArray[i].unitPrice));
         console.log(parseInt(addToCartArray[i].itemQty));
         netTotal=netTotal+(parseInt(addToCartArray[i].unitPrice)*parseInt(addToCartArray[i].itemQty));
         $("#netTotal").val(netTotal)
     }
}

$("#discountPoints").on("keyup", function(){

    let finalDiscount=$("#netTotal").val()*$("#discountPoints").val()*2/100;
    $("#newNetTotal").val($("#netTotal").val()-finalDiscount);
})

function searchOrder(id,size) {
    return addToCartArray.find(function (cartDetails) {
        if (cartDetails.item_id===id && cartDetails.size===size){
            return cartDetails.item_id===id && cartDetails.size===size;
        }

    });

}



/*place order starts here*/
$("#placeOrderBtn").click(function (){
    let orderCode=$("#orderId").val()
    let cashierName="kaveen";
    let date="2022-11-20";
    let points=$("#discountPoints").val();
    let totalPrice=$("#netTotal").val();
    let paymentMethod="card";
    let customerId=$("#pCustomerCode").val();
    let customerName=$("#pCustomerName").val();

    console.log(totalPrice)

    var sales={
        "orderId":orderCode,
        "orderDate":date,
        "paymentMethod":paymentMethod,
        "totalPrice":totalPrice,
        "addedPoints":points,
        "cashierName":cashierName,
        "customerId":customerId,
        "customerName":customerName,
        "salesServices":addToCartArray
    }

    console.log(sales)


    $.ajax({
        url: 'http://localhost:8080/api/v1/sales/save',
        method:"Post",
        contentType:"application/json",
        data:JSON.stringify(sales),

        success:function (response) {
            console.log(response)

        },
        error:function (xhr,status,err) {
            console.log(err)
            console.log(xhr.status)

        }
    })

})

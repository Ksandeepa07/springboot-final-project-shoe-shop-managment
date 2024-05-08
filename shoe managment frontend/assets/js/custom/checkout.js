

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
loadDate();
loadNextOrderId();


/*load order id*/
function loadNextOrderId(){
    $.ajax({
        url:"http://localhost:8080/api/v1/sales/nextId",
        method:"GET",
        success:function (response) {
            console.log(response)
            $("#orderId").val(response);
        },
        error:function (xhr, status, error) {
            console.log(error)
        }
    })
}

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

/*load response customer ids to combo*/
function loadAllCustomerInCheckOutComboBox(response) {
    $("#pCustomerCode").empty();
    $.each(response, function (index, customer) {
       let data=`<option>${customer.code}</option>`
        $("#pCustomerCode").append(data);
    });
}


/*customer id combo click event*/
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

/*load all item ids to combo from response*/

function loadAllItemInCheckOutComboBox(response) {
    $("#pItemCode").empty();
    $.each(response, function (index, inventory) {
        let data=`<option>${inventory.code}</option>`
        $("#pItemCode").append(data);
    });
}

let imageResponse;


/*item code combo click event*/
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

/*load item size to combo*/
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

/*load available sizes when click*/
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
    console.log(size)
    // console.log(unitPrice)
    // console.log(buyingQty)

    if (code==="Choose..." || name==="" || size==="Choose..." || unitPrice==="" || buyingQty ===""){
        alert("please fill all the required fields before proceed !!")
        return;
    }

    if (buyingQty<=0){
        alert("Buying Quantity can't be 0")
        return;
    }

    if ($("#pItemQuantity").val()<=0){
        alert("This Item is out of stock !!")
        return;
    }

    let cartItems={
        item_id:code,
        name:name,
        size:size,
        // unitPrice:unitPrice,
        unitPrice:parseInt(unitPrice)*parseInt(buyingQty),
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



/*set new item to cart*/
function setDataToCart(){
    $(".appendToCart").empty();
    $.each(addToCartArray,function (index, item){

        var matches = item.pic.match(/src="data:image\/(jpeg|png);base64,([^"]+)"/);

        if (matches) {
            var base64Data = matches[2];
            // let cartItem=`<div class="col-12 d-flex" style="height: 120px">
            //                           <div class="me-3 position-relative imageAdd">
            //                                 <img class="img-sm rounded border" src="data:image/jpeg;base64,${base64Data}" style="height: 96px; width: 120px;" alt="image"/>
            //                           </div>
            //
            //                      <div class="">
            //                          <p class="nav-link mb-0 font-weight-bold" href="#">${item.name}<br/></p>
            //                          <p class="price mx-3"><span class="font-weight-bold">$${item.unitPrice}</span></p>
            //                          <p class="price mx-3"><span class="font-weight-bold">${item.size} x ${item.itemQty}</span></p>
            //
            //                      </div>
            //
            //              </div>`

            let cartItem=
                `<div class="col-12">
                       <div class="row itemCartOneRow ">

                              <div class="col-4">
                                      <div class="me-3 position-relative imageAdd">
                                      <img class="img-sm rounded border" src="data:image/jpeg;base64,${base64Data}" style="height: 96px; width: 120px;" alt="image"/>
                               </div>
                              </div>



                               <div class="col-6">
                                <p style="display: none" class="nav-link mb-0 font-weight-bold itemCartItemCode" href="#">${item.item_id}<br/></p>
                                <p style="display: none" class="nav-link mb-0 font-weight-bold itemCartItemSize" href="#">${item.size}<br/></p>
                                  <p class="nav-link mb-0 font-weight-bold" href="#">${item.name}<br/></p>
                                     <p class="price mx-3"><span class="font-weight-bold">$${item.unitPrice}</span></p>
                                      <p class="price mx-3"><span class="font-weight-bold">${item.size} x ${item.itemQty}</span></p>
            
                               </div>
                               
                               <div class="col-2 d-flex align-items-center justify-content-center">
                                
                                    <button id="cartItemDelete" type="button"  class="btn btn-danger h-25 w-25 d-flex align-items-center justify-content-center" style="border-radius: 50%"><img style="width:8px" src="https://cdn0.iconfinder.com/data/icons/entypo/52/x3-512.png" alt="cancel icon"></button>

                               </div>

                       </div>
                      </div>`

            $(".appendToCart").append(cartItem);
        }

    })
}

/*calculate net total */
 function calculateNetTotal(){

     let netTotal=0;
     for (let i = 0; i < addToCartArray.length; i++) {
         console.log(parseInt(addToCartArray[i].unitPrice));
         console.log(parseInt(addToCartArray[i].itemQty));
         netTotal=netTotal+(parseInt(addToCartArray[i].unitPrice)*parseInt(addToCartArray[i].itemQty));
         $("#netTotal").val(netTotal)
     }
}


/*set up net total after discount key type*/
$("#discountPoints").on("keyup", function(){

    let finalDiscount=$("#netTotal").val()*$("#discountPoints").val()*2/100;
    $("#newNetTotal").val($("#netTotal").val()-finalDiscount);
})


// search item from array to add quantity to existing item cart row* without adding new
function searchOrder(id,size) {
    return addToCartArray.find(function (cartDetails) {
        if (cartDetails.item_id===id && cartDetails.size===size){
            return cartDetails.item_id===id && cartDetails.size===size;
        }

    });

}



/*place order before (not using now)*/
$("#placeOrderBtn").click(function (){
    let orderCode=$("#orderId").val()
    let cashierName="kaveen";
    let date=new Date().getDate();
    let points=$("#discountPoints").val();
    let totalPrice=$("#newNetTotal").val();
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



/*place order req*/
$(".placeOrderBtn").click(function (){
    var cardBody = $(this).closest('.card-body');
    var spanElements = cardBody.find('strong');
    let paymentMethod;
    spanElements.each(function() {
       paymentMethod=$(this).text();
    });

    let orderCode=$("#orderId").val()
    let cashierName="kaveen";
    let date=new Date();
    let points=$("#discountPoints").val();
    let customerId=$("#pCustomerCode").val();
    let customerName=$("#pCustomerName").val();

    let totalPrice;
    if ($("#newNetTotal").val()===""){
        totalPrice=$("#netTotal").val();
    }else{
        totalPrice=$("#newNetTotal").val();
    }

    console.log(totalPrice)

    if (addToCartArray.length===0){
        alert("Can't place order please select at least one item !!")
        return;
    }

    if ($("#newNetTotal").val()===""){
        if ($("#pCash").val()<$("#netTotal").val()){
            alert("More Cash Required to place order !!")
            return;
        }
    }else{
        if ($("#pCash").val()<$("#newNetTotal").val()){
            alert("More Cash Required to place order !!")
            return;
        }
    }



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
            $('#pContinueBtn').trigger('click');
            $('.paymentBillSlip').css('display', 'block');
            setDataToBill(sales.salesServices);

        },
        error:function (xhr,status,err) {
            console.log(err)
            console.log(xhr.status)

        }
    })

})



/*set data to payment slip*/
function setDataToBill(salesServices) {

    $(".billOrderId").text($("#orderId").val());
    $(".billOrderDate").text( $("#pOrderDate").text());

    // $.each(salesServices,function (index,shoe){
    //     console.log(salesServices.name)
    //     console.log(salesServices.itemQty)
    //   let billItems= `<div class="order-number-label d-flex justify-content-between">
    //         <p class="mb-0 billItemName" style="color: #cccccc;font-weight: 500">${shoe.name} : </p>
    //         <p class="mb-0 billItemQuantity" style="color: #cccccc;font-weight: 500">${shoe.itemQty}</p>
    //     </div>`
    //
    //     $(".billItemList").append(billItems);
    // })

    if ($("#discountPoints").val()===""){
        $(".billTotal").text($("#netTotal").val());
    }else{
        $(".billTotal").text($("#newNetTotal").val());
    }


    $(".billCash").text( $("#pCash").val());
    $(".billBalance").text( $("#pBalance").val());


}


/*make balance on key type*/
$("#pCash").on("keyup", function(){

    if ($("#discountPoints").val()===""){
        $("#pBalance").val(parseInt($("#pCash").val())-parseInt($("#netTotal").val()));
    }else{
        $("#pBalance").val(parseInt($("#pCash").val())-parseInt($("#newNetTotal").val()));
    }

})


/*load date*/
function loadDate(){

    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

    $("#pOrderDate").text(formattedDate);
}


/*set time*/
function updateTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    hours = (hours < 10 ? '0' : '') + hours;
    minutes = (minutes < 10 ? '0' : '') + minutes;
    seconds = (seconds < 10 ? '0' : '') + seconds;
    var currentTime = hours + ':' + minutes + ':' + seconds;
    $("#pOrderTIme").text(currentTime);

}
// Update time every second
setInterval(updateTime, 1000);



/*remove item form cart an array*/
$(document).on('click', '#cartItemDelete', function() {
    console.log("before")
    console.log(addToCartArray)
    $(this).closest('.itemCartOneRow').remove();
    console.log($(this).closest('.itemCartItemCode').find().text())

    var itemCode = $(this).closest('.row').find('.itemCartItemCode').text();
    var itemSize = $(this).closest('.row').find('.itemCartItemSize').text();

    console.log(itemCode)
    console.log(itemSize)

    for (let i = 0; i < addToCartArray.length; i++) {
        if (addToCartArray[i].item_id===itemCode && addToCartArray[i].size===itemSize){
            addToCartArray.splice(i,1);
            break;
        }
    }

    console.log("after")
    console.log(addToCartArray)
});

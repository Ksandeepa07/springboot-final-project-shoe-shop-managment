window.onload = function() {

    loadAllSupplierCodes();
    getAllInventory();
    let supplierResponse;

    /*get all*/
    function getAllInventory(){
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/getALl",
            method: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response);
                console.log(response.length);
                loadInventoryData(response);

            },
            error: function (xhr, status, err) {
                console.log(err)
            }
        })
    }
    function loadInventoryData(response) {
        $.each(response, function (index, inventory) {
            let data = `<tr>
                  
                    <td><img alt="image" src="${inventory.itemPic}"/></td>
                    <td>${inventory.code}</td>
                    <td>${inventory.name}</td>
                    <td>${inventory.size}</td>
                    <td>${inventory.qty}</td>
                    <td>${inventory.category}</td>
                    <td>${inventory.salePrice}</td>
                    <td>${inventory.buyPrice}</td>
                    <td>${inventory.profit}</td>
                    <td>${inventory.profitMargin}</td>
                    <td>${inventory.status}</td>
                    <td>${inventory.code}</td>
                    <td>${inventory.code}</td>
                    <td>${inventory.scode}</td>
                    <td>${inventory.sname}</td>
                    
                   
                </tr>`;
            $("#iTable").append(data);
        });
    }




    /*load ids on click*/
    $("#iVariety").click(function (){
        console.log($("#iVariety").val())
        loadNextInventoryId($("#iVariety").val());
    })
    function loadNextInventoryId(variety){
        $.ajax({
            url:"http://localhost:8080/api/v1/inventory/nextId/"+variety,
            method:"GET",
            success:function (response) {
                console.log(response)
                $("#iCode").val(response);
            },
            error:function (xhr, status, error) {
                console.log(error)
            }
        })
    }




    /*load supplier codes to combo box and onclick*/
    function loadAllSupplierCodes(){
        $("#iSupplierCode").empty();
        $.ajax({
            url:"http://localhost:8080/api/v1/inventory/loadSupplierCode",
            method:"GET",
            success:function (response) {
                console.log(response)
                supplierResponse=response;
                $.each(response,function (index,supplier){
                    let codes=`<option>${supplier.code}</option>`
                    $("#iSupplierCode").append(codes)
                })
            },
            error:function (xhr, status, error) {
                console.log(error)
            }
        })
    }

    $("#iSupplierCode").click(function (){
        $.each(supplierResponse,function (index,supplier){
            if ($("#iSupplierCode").val()===supplier.code){

                $("#iSupplierName").val(supplier.name)
            }
        })
    })




    /*save inventory*/
    $("#iSaveBtn").click(function (){
        let code=$("#iCode").val();
        let name=$("#iDesc").val();
        let size=$("#iSize").val();
        let qty=$("#iQty").val();
        let category=$("#iCategory").val();
        let supplierCode=$("#iSupplierCode").val();
        let supplierName=$("#iSupplierName").val();
        let salePrice=$("#iSalePrice").val();
        let buyPrice=$("#iBuyPrice").val();
        let profit=$("#iProfit").val();
        let profitMargin=$("#iProfitMargin").val();
        let status=$("#iStatus").val();
        let itemPic=$("#iImage").prop('files')[0];

        let reader = new FileReader();
        reader.onload = function(event) {
            let base64String = event.target.result;

            $.ajax({
                url: 'http://localhost:8080/api/v1/inventory/save',
                method:"Post",
                dataType: "json",
                contentType:"application/json",
                data:JSON.stringify({
                    "code":code,
                    "name":name,
                    "size":size,
                    "qty":qty,
                    "category":category,
                    "scode":supplierCode,
                    "sname":supplierName,
                    "salePrice":salePrice,
                    "buyPrice":buyPrice,
                    "profit":profit,
                    "profitMargin":profitMargin,
                    "status":status,
                    "itemPic":base64String
                }),

                success:function (response) {
                    console.log(response)
                    getAllInventory();
                    // clearCustomerInputFields();
                    $("#iSaveBtn").prop("disabled", true);
                    $("#iUpdateBtn").prop("disabled", true);
                    $("#iDeleteBtn").prop("disabled", true);
                },
                error:function (xhr,status,err) {
                    console.log(err)
                    console.log(xhr.status)
                    console.log(xhr.responseText)
                    // if(xhr.status === 409){
                    //     let message=JSON.parse(xhr.responseText).message;
                    //     if(message==="id"){
                    //         alert("This customer is already in the system !!")
                    //     } else if(message==="email"){
                    //         alert("This customer email is already registered !!")
                    //     }
                    //
                    // }
                }

            })

        };
        reader.readAsDataURL(itemPic);

        console.log(code)
        console.log(name)
        console.log(size)
        console.log(qty)
        console.log(category)
        console.log(supplierCode)
        console.log(supplierName)
        console.log(salePrice)
        console.log(buyPrice)
        console.log(profit)
        console.log(profitMargin)
        console.log(status)

    })

}



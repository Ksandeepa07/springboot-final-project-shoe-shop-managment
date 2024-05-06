window.onload = function() {

    loadAllSupplierCodes();
    getAllInventory();
    let supplierResponse;

    /*get all*/
    function getAllInventory() {
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
        $("#iTable").empty();
        $.each(response, function (index, inventory) {
            console.log(index)
            let size = "";
            let qty = "";
            let status = "";
            let foreignKey="";
            for (let i = 0; i < inventory.shoeSizes.length; i++) {
                size += `<p><span style="font-size: 13px " class="font-weight-bold size text-primary ">${inventory.shoeSizes[i].size}</span></p><br>`
                qty += `<p><span style="font-size: 13px " class="font-weight-bold qty text-primary text-center">${inventory.shoeSizes[i].qty}</span></p><br>`
                status += `<p><span style="font-size: 13px " class="font-weight-bold qty text-primary text-center">${inventory.shoeSizes[i].status}</span></p><br>`
                foreignKey += `<p><span style="font-size: 13px " class="font-weight-bold foriegnKey">${inventory.shoeSizes[i].code}</span></p><br>`
            }

            let data = `<tr>

                    <td><img alt="image" src="${inventory.itemPic}"/></td>
                    <td>${inventory.code}</td>
                    <td>${inventory.name}</td>
                    <td>${size}</td>
                    <td>${qty}</td>
                    <td>${status}</td>
                    <td>${inventory.category}</td>
                    <td>${inventory.salePrice}</td>
                    <td>${inventory.buyPrice}</td>
                    <td>${inventory.profit}</td>
                    <td>${inventory.profitMargin}</td>
                    <td>${inventory.scode}</td>
                    <td>${inventory.sname}</td>
                    <td style="display: none">${foreignKey}</td>
                    
                </tr>`;
            $("#iTable").append(data);
        });
    }


    /*load ids on click*/
    $("#iVariety").click(function () {
        console.log($("#iVariety").val())
        loadNextInventoryId($("#iVariety").val());
    })


/*load next id*/
    function loadNextInventoryId(variety) {
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/nextId/" + variety,
            method: "GET",
            success: function (response) {
                console.log(response)
                $("#iCode").val(response);
            },
            error: function (xhr, status, error) {
                console.log(error)
            }
        })
    }




    /*load supplier codes to combo box and onclick*/
    function loadAllSupplierCodes() {
        $("#iSupplierCode").empty();
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/loadSupplierCode",
            method: "GET",
            success: function (response) {
                console.log(response)
                supplierResponse = response;
                $.each(response, function (index, supplier) {
                    let codes = `<option>${supplier.code}</option>`
                    $("#iSupplierCode").append(codes)
                })
            },
            error: function (xhr, status, error) {
                console.log(error)
            }
        })
    }

    $("#iSupplierCode").click(function () {
        $.each(supplierResponse, function (index, supplier) {
            if ($("#iSupplierCode").val() === supplier.code) {

                $("#iSupplierName").val(supplier.name)
            }
        })
    })






    /*save inventory*/
    $("#iSaveBtn").click(function () {
        let code = $("#iCode").val();
        let name = $("#iDesc").val();
        let category = $("#iCategory").val();
        let supplierCode = $("#iSupplierCode").val();
        let supplierName = $("#iSupplierName").val();
        let salePrice = $("#iSalePrice").val();
        let buyPrice = $("#iBuyPrice").val();
        let profit = $("#iProfit").val();
        let profitMargin = $("#iProfitMargin").val();
        let status = $("#iStatus").val();
        let itemPic = $("#iImage").prop('files')[0];

        /*validate before sending req*/
        if (code==="" || name==="" || category==="Choose..." || supplierCode==="Choose..."|| supplierName===""|| salePrice==="" ||
        buyPrice==="" || buyPrice==="" || profit==="" || profitMargin==="" || status==="" || $("#iImage").val()==="" ){
            alert("please fill all the empty fields !!");
        }

        if (salePrice<0 || buyPrice<0 || profit<0 ){
            alert("check prices!!")
            return false;
        }

        let showAlert=true;
        $('.sizeFields').each(function () {
             if($(this).find('.size-input').val()==="" || $(this).find('.qty-input').val()===""){
                 if(showAlert){
                    alert("fill minimum required sizes and quantities!!")
                     showAlert=false;
                 }
                 return false
             }
        })


        /*file reader for reading image files*/
        let reader = new FileReader();
        reader.onload = function (event) {
            let base64String = event.target.result;

            var itemData = {
                "code": code,
                "name": name,
                "category": category,
                "scode": supplierCode,
                "sname": supplierName,
                "salePrice": salePrice,
                "buyPrice": buyPrice,
                "profit": profit,
                "profitMargin": profitMargin,
                // "status": status,
                "itemPic": base64String,
                "shoeSizes": []
            }

            /*getting values from sizes and quantities*/
            $('.sizeFields').each(function () {
                let size = $(this).find('.size-input').val();
                let qty = $(this).find('.qty-input').val();
                if(qty<50){
                    itemData.shoeSizes.push({size: size, qty: qty,status:"Low stock"});
                }if(qty>50){
                    itemData.shoeSizes.push({size: size, qty: qty,status:"Available"});
                }


            })


            $.ajax({
                url: 'http://localhost:8080/api/v1/inventory/save',
                method: "Post",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(itemData),

                success: function (response) {
                    console.log(response)
                    getAllInventory();
                    clearInventoryInputFields()
                    $("#iSaveBtn").prop("disabled", true);
                    $("#iUpdateBtn").prop("disabled", true);
                    $("#iDeleteBtn").prop("disabled", true);
                },
                error: function (xhr, status, err) {
                    console.log(err)
                    console.log(xhr.status)
                    if(xhr.status===409){
                        alert("This Item is already in system.Try with another!!")
                    }
                }

            })

        };
        reader.readAsDataURL(itemPic);

    })



    /*update function*/
    $("#iUpdateBtn").click(function () {
        let code = $("#iCode").val();
        let name = $("#iDesc").val();
        let category = $("#iCategory").val();
        let supplierCode = $("#iSupplierCode").val();
        let supplierName = $("#iSupplierName").val();
        let salePrice = $("#iSalePrice").val();
        let buyPrice = $("#iBuyPrice").val();
        let profit = $("#iProfit").val();
        let profitMargin = $("#iProfitMargin").val();
        let status = $("#iStatus").val();
        let itemPic = $("#iImage").prop('files')[0];

        /*validate before sending req*/
        if (code==="" || name==="" || category==="Choose..." || supplierCode==="Choose..."|| supplierName===""|| salePrice==="" ||
            buyPrice==="" || buyPrice==="" || profit==="" || profitMargin==="" || status==="" || $("#iImage").val()==="" ){
            alert("please fill all the empty fields !!");
        }

        if (salePrice<0 || buyPrice<0 || profit<0 ){
            alert("check prices!!")
            return false;
        }

        let showAlert=true;
        $('.sizeFields').each(function () {
            if($(this).find('.size-input').val()==="" || $(this).find('.qty-input').val()===""){
                if(showAlert){
                    alert("fill minimum required sizes and quantities!!")
                    showAlert=false;
                }
                return false
            }
            return false;
        })

        /*file reader for image files*/
        let reader = new FileReader();
        reader.onload = function (event) {
            let base64String = event.target.result;
            // let base64String = event.target.result.split(',')[1];

            var itemData = {
                "code": code,
                "name": name,
                "category": category,
                "scode": supplierCode,
                "sname": supplierName,
                "salePrice": salePrice,
                "buyPrice": buyPrice,
                "profit": profit,
                "profitMargin": profitMargin,
                "status": status,
                "itemPic": base64String,
                "shoeSizes": []
            }


            $('.sizeFields').each(function () {
                let size = $(this).find('.size-input').val();
                let qty = $(this).find('.qty-input').val();
                let foreignKey = $(this).find('.foreign-input').val();

                if(qty<50){
                    itemData.shoeSizes.push({size: size, qty: qty,code:foreignKey,status:"Low Stock"});
                }if (qty>50){
                    itemData.shoeSizes.push({size: size, qty: qty,code:foreignKey,status:"Available"});
                }


            })


            $.ajax({
                url: 'http://localhost:8080/api/v1/inventory/update',
                method: "Patch",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(itemData),

                success: function (response) {
                    console.log(response)
                    getAllInventory();
                    clearInventoryInputFields()
                    $("#iSaveBtn").prop("disabled", true);
                    $("#iUpdateBtn").prop("disabled", true);
                    $("#iDeleteBtn").prop("disabled", true);
                },
                error: function (xhr, status, err) {
                    console.log(err)
                    console.log(xhr.status)
                    if(xhr.status===404){
                        alert("This Item is not in system.Try with another!!")
                    }
                }
            })

        };
        reader.readAsDataURL(itemPic);

    })





    /*table row click*/
    $('#iTable').on('click', 'tr', function () {

        $('#sizeFields').empty();
        var itemPic= $(this).find('td:eq(0)').html();
        var code = $(this).find('td:eq(1)').text();
        var name = $(this).find('td:eq(2)').text();
        // var size = $(this).find('td:eq(3)').text();
        // var qty = $(this).find('td:eq(4)').text();
        var category = $(this).find('td:eq(6)').text();
        var salePrice = $(this).find('td:eq(7)').text();
        var buyPrice = $(this).find('td:eq(8)').text();
        var profit = $(this).find('td:eq(9)').text();
        var profitMargin = $(this).find('td:eq(10)').text();
        // var status = $(this).find('td:eq(11)').text();
        var supplierCode = $(this).find('td:eq(11)').text();
        var supplierName = $(this).find('td:eq(12)').text();

        console.log(itemPic)

        console.log($(this).find('td:eq(3)').children("p").length)
        console.log($(this).find('td:eq(3)').find('p:eq(i)').children("span").text())


        /*add text fields and set data*/
        for (let i = 0; i < $(this).find('td:eq(3)').children("p").length; i++) {

            let pTagForSize = $(this).find('td:eq(3)').children("p").eq(i);
            let sizeValue = pTagForSize.find('span.size').text();

            let pTagForQty = $(this).find('td:eq(4)').children("p").eq(i);
            let qtyValue = pTagForQty.find('span.qty').text();


            let pTagForForeignKey = $(this).find('td:eq(13)').children("p").eq(i);
            let foreignKeyValue = pTagForForeignKey.find('span.foriegnKey').text();

            console.log(sizeValue)
            console.log(qtyValue)

            let newSizeField = ` <div class="form-group row sizeFields">
                        <div class="col-sm-3"></div>
                        
                        <div class="col-sm-4">
                          <input type="text" class="form-control size-input" id="iSize" value="${sizeValue}" placeholder="Size">
                        </div>
                        
                         <div class="col-sm-4">
                          <input type="number" class="form-control qty-input" id="iSize" value="${qtyValue}" placeholder="Quantity">
                        </div>
                        
                          <div style="display:none" class="col-sm-4">
                          <input type="number" class="form-control foreign-input" id="iForeignKey" value="${foreignKeyValue}" placeholder="">
                          </div>
                        
                         <div class="col-sm-1 d-flex justify-content-center align-items-center">
                          <button id="sizeFieldsCancel" type="button" class="btn btn-danger h-75 w-50 d-flex align-items-center justify-content-center" style="border-radius: 50%"><img style="width: 10px" src="https://cdn0.iconfinder.com/data/icons/entypo/52/x3-512.png" alt="cancel icon"></button>
                        </div>
                        
                      </div>`

            $('#sizeFields').append(newSizeField);

        }

        /*set image*/

        // var base64Data;
        // var matches = itemPic.match(/src="data:image\/png;base64,([^"]+)"/);
        // if (matches) {
        //     base64Data = matches[1];
        //     console.log(base64Data);
        //
        //     // Decode base64 data into a blob
        //     var byteCharacters = atob(base64Data);
        //     var byteNumbers = new Array(byteCharacters.length);
        //     for (var i = 0; i < byteCharacters.length; i++) {
        //         byteNumbers[i] = byteCharacters.charCodeAt(i);
        //     }
        //     var byteArray = new Uint8Array(byteNumbers);
        //     var blob = new Blob([byteArray], { type: 'image/png' });
        //
        //     // Create a file from the blob
        //     var file = new File([blob], 'image.png', { type: 'image/png' });
        //     console.log(file)
        //
        //     var dataTransfer = new DataTransfer();
        //     dataTransfer.items.add(file);
        //
        //     // Set the files property of the file chooser input field using the files property of the DataTransfer object
        //     var fileInput = document.getElementById('iImage');
        //     fileInput.files = dataTransfer.files;
        //
        // } else {
        //     console.log("No image data found in the table cell.");
        // }

        ///

        var matches = itemPic.match(/src="data:image\/(jpeg|png);base64,([^"]+)"/);
        if (matches) {
            var base64Data = matches[2];

            // Convert to jpeg
            var canvas = document.createElement('canvas');
            var img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                var newDataURL = canvas.toDataURL('image/jpeg', 1.0);
                var jpegBase64Data = newDataURL.split(',')[1];

                var byteCharacters = atob(jpegBase64Data);
                var byteNumbers = new Array(byteCharacters.length);
                for (var i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                var blob = new Blob([byteArray], { type: 'image/jpeg' });

                var file = new File([blob], 'item.jpg', { type: 'image/jpeg' });

                var dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);

                var fileInput = document.getElementById('iImage');
                fileInput.files = dataTransfer.files;
            };
            img.src = 'data:image/' + matches[1] + ';base64,' + base64Data;
        } else {
            console.log("No image data found in the table cell.");
        }



        $("#iSaveBtn").prop("disabled", false);
        $("#iUpdateBtn").prop("disabled", false);
        $("#iDeleteBtn").prop("disabled", false);

        $("#iCode").val(code);
        $("#iDesc").val(name);
        $("#iCategory").val(category);
        $("#iSalePrice").val(salePrice);
        $("#iBuyPrice").val(buyPrice);
        $("#iProfit").val(profit);
        $("#iProfitMargin").val(profitMargin);
        $("#iStatus").val(status);
        $("#iSupplierCode").val(supplierCode);
        $("#iSupplierName").val(supplierName);


    })





    /*add new size entering field*/
// let newSizeField;
    $('#addSizeBtn').click(function () {
        let newSizeField = ` <div class="form-group row sizeFields">
                        <div class="col-sm-3"></div>
                        
                        <div class="col-sm-4">
                          <input type="text" class="form-control size-input" id="iSize" placeholder="Size">
                        </div>
                        
                         <div class="col-sm-4">
                          <input type="number" class="form-control qty-input" id="iSize" placeholder="Quantity">
                        </div>
                        
                      
                         <div class="col-sm-1 d-flex justify-content-center align-items-center">
                          <button id="sizeFieldsCancel" type="button"  class="btn btn-danger h-50 w-50 d-flex align-items-center justify-content-center" style="border-radius: 50%"><img style="width:8px" src="https://cdn0.iconfinder.com/data/icons/entypo/52/x3-512.png" alt="cancel icon"></button>
                        </div>
                        
                      </div>`
        $('#sizeFields').append(newSizeField);


    });

    $(document).on('click', '#sizeFieldsCancel', function() {
        $(this).closest('.sizeFields').remove();
    });

    //jquery not working here
    // $("#sizeFieldsCancel").click(function (){
    //
    // })





    /*delete function*/
    $("#iDeleteBtn").click(function (){
        let id=$("#iCode").val();
        $.ajax({
            url: 'http://localhost:8080/api/v1/inventory/delete/'+id,
            method:"delete",
            success:function (response) {
                console.log(response)
                // getAllEmployees();
                // clearEmployeeInputFields();
                // $("#eSaveBtn").prop("disabled", true);
                // $("#eUpdateBtn").prop("disabled", true);
                // $("#eDeleteBtn").prop("disabled", true);
            },
            error:function (xhr,status,err) {
                console.log(err)
                console.log(xhr.status)
                if(xhr.status===404){
                    alert("This employee is not in system.Try with another!!")
                }
            }

        })
    })




    /*clear fields*/
    $("#iClearBtn").click(function (){

        clearInventoryInputFields()}
    )



    /*search function*/
    $("#iSearch").on("input", function () {
        $("#iTable").empty();
        let name=$("#iSearch").val();
        console.log(name.trim())
        $.ajax({
            url: 'http://localhost:8080/api/v1/inventory/search?name='+name,
            method:"GET",
            dataType: "json",

            success:function (response) {

                console.log(response)

                $.each(response, function (index, inventory) {

                    setTimeout(function (){

                        let size = "";
                        let qty = "";
                        let foreignKey="";
                        for (let i = 0; i < inventory.shoeSizes.length; i++) {
                            size += `<p><span style="font-size: 13px " class="font-weight-bold size text-primary ">${inventory.shoeSizes[i].size}</span></p><br>`
                            qty += `<p><span style="font-size: 13px " class="font-weight-bold qty text-primary text-center">${inventory.shoeSizes[i].qty}</span></p><br>`
                            foreignKey += `<p><span style="font-size: 13px " class="font-weight-bold foriegnKey">${inventory.shoeSizes[i].code}</span></p><br>`
                        }

                        let data = `<tr>

                    <td><img alt="image" src="${inventory.itemPic}"/></td>
                    <td>${inventory.code}</td>
                    <td>${inventory.name}</td>
                    <td>${size}</td>
                    <td>${qty}</td>
                    <td>${inventory.category}</td>
                    <td>${inventory.salePrice}</td>
                    <td>${inventory.buyPrice}</td>
                    <td>${inventory.profit}</td>
                    <td>${inventory.profitMargin}</td>
                    <td>${inventory.status}</td>
                    <td>${inventory.scode}</td>
                    <td>${inventory.sname}</td>
                    <td style="display: none">${foreignKey}</td>
                    
                </tr>`;
                        $("#iTable").append(data);

                    },600,index)
                })

            },
            error:function (xhr,status,err) {
                console.log(err)
            }
        })
    });



/*calculating profits and margin*/
    let buyPrice;
    let salePrice
    $("#iBuyPrice").on("keyup",function (e){
        if($("#iSalePrice").val()===""){
            $("#iProfit").val( $("#iBuyPrice").val())
        }
            $("#iProfit").val($("#iSalePrice").val()- $("#iBuyPrice").val());

       let profitMargin= ($("#iProfit").val()/$("#iSalePrice").val()*100).toFixed(2);
       $("#iProfitMargin").val(profitMargin);


    });

    $("#iSalePrice").on("keyup",function (e){
        if($("#iBuyPrice").val()===""){
            $("#iProfit").val( $("#iSalePrice").val())
        }
        $("#iProfit").val($("#iSalePrice").val()- $("#iBuyPrice").val());

        let profitMargin= ($("#iProfit").val()/$("#iSalePrice").val()*100).toFixed(2);
        $("#iProfitMargin").val(profitMargin);
    });



    $("#iVariety").click(function (){
        $("#iCategory").val( $("#iVariety").val());
    })

}






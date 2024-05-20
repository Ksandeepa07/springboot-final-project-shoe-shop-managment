
window.onload = function() {

    getAllSuppliers();
    loadNextSupplierId();
    let proPic = ` <img alt="" class="img-xs rounded-circle " src="data:image/png;base64,${localStorage.getItem("userProPic")}">
                        <span class="count bg-success"></span>`;
    $(".userPic").append(proPic);
    $(".userName").text(localStorage.getItem("userName"));

    /*get all suppliers*/
    function getAllSuppliers(){
        $.ajax({
            url: "http://localhost:8080/api/v1/supplier/getAll",
            method: "GET",
            dataType: "json",
            "headers": {
                "Authorization": "Bearer "+token
            },
            success: function (response) {
                console.log(response);
                console.log(response.length);
                loadSupplierDataInTable(response);
            },
            error: function (xhr, status, err) {
                console.log(err)
            }
        })
    }
    function loadSupplierDataInTable(response) {
        $("#sTable").empty();
        $.each(response, function (index, supplier) {
            let newCategory=supplierCapitalizeFirstLetter(supplier.category);


            let data = `<tr>
                            <td>${supplier.code}</td>                    
                            <td>${supplier.name}</td>
                            <td>${supplier.email}</td>
                            <td>${newCategory}</td>
                            <td>${supplier.addressLine1} ${supplier.addressLine2}</td>
                            <td>${supplier.contactMobile}</td>
                            <td>${supplier.contactLand}</td>
                            <td style="display: none">${supplier.addressLine1}</td>
                            <td style="display: none">${supplier.addressLine2}</td>
                            
                            </tr>`
            $("#sTable").append(data);
        });

    }




    /*next id*/
    function loadNextSupplierId(){
        $.ajax({
            url:"http://localhost:8080/api/v1/supplier/nextId",
            method:"GET",
            "headers": {
                "Authorization": "Bearer "+token
            },
            success:function (response) {
                console.log(response)
                $("#sId").val(response);
            },
            error:function (xhr, status, error) {
                console.log(error)
            }
        })
    }



    /*save supplier*/
    $("#sSaveBtn").click(function () {
        saveSupplier();

    })
    function  saveSupplier() {
        let code=$("#sId").val();
        let name=$("#sName").val();
        let category=$("#sCategory").val();
        let email=$("#sEmail").val();
        let address=$("#sAddress").val();
        let state=$("#sState").val();
        let mobile=$("#sMobile").val();
        let land=$("#sLand").val();

        console.log(code)
        console.log(name)
        console.log(category)
        console.log(email)
        console.log(address)
        console.log(state)
        console.log(mobile)
        console.log(land)

        if (category==="Choose..."){
            alert("please fill all empty fields !!")
        }


        $.ajax({
            url: 'http://localhost:8080/api/v1/supplier/save',
            method:"Post",
            dataType: "json",
            contentType:"application/json",
            "headers": {
                "Authorization": "Bearer "+token
            },
            data:JSON.stringify({
                "code":code,
                "name":name,
                "email":email,
                "category":category.toUpperCase(),
                "contactMobile":mobile,
                "contactLand":land,
                "addressLine1":address,
                "addressLine2":state,

            }),

            success:function (response) {
                console.log(response)
                getAllSuppliers()
                clearSupplierInputFields();
                $("#sSaveBtn").prop("disabled", true);
                $("#sUpdateBtn").prop("disabled", true);
                $("#sDeleteBtn").prop("disabled", true);
            },
            error:function (xhr,status,err) {
                console.log(err)
                console.log(xhr.status)
                if(xhr.status === 409){
                    let message=JSON.parse(xhr.responseText).message;
                    if(message==="id"){
                        alert("This id already in the system !!")
                    } else if(message==="email"){
                        alert("This email is already registered !!")
                    }

                }
            }

        })
    }




    /*update supplier*/
    $("#sUpdateBtn").click(function (){
        updateSupplier();
    })
    function updateSupplier(){

        let code=$("#sId").val();
        let name=$("#sName").val();
        let category=$("#sCategory").val();
        let email=$("#sEmail").val();
        let address=$("#sAddress").val();
        let state=$("#sState").val();
        let mobile=$("#sMobile").val();
        let land=$("#sLand").val();

        console.log(code)
        console.log(name)
        console.log(category)
        console.log(email)
        console.log(address)
        console.log(state)
        console.log(mobile)
        console.log(land)

        if (category==="Choose..."){
            alert("please fill all empty fields !!")
        }

        $.ajax({
            url: 'http://localhost:8080/api/v1/supplier/update',
            method:"Patch",
            dataType: "json",
            contentType:"application/json",
            "headers": {
                "Authorization": "Bearer "+token
            },
            data:JSON.stringify({
                "code":code,
                "name":name,
                "email":email,
                "category":category.toUpperCase(),
                "contactMobile":mobile,
                "contactLand":land,
                "addressLine1":address,
                "addressLine2":state,

            }),

            success:function (response) {
                console.log(response)
                getAllSuppliers()
                clearSupplierInputFields();
                $("#sSaveBtn").prop("disabled", true);
                $("#sUpdateBtn").prop("disabled", true);
                $("#sDeleteBtn").prop("disabled", true);
            },
            error:function (xhr,status,err) {
                console.log(err)
                console.log(xhr.status)
                if(xhr.status===404){
                    alert("This supplier is not in the system !!")
                }

                if(xhr.status === 409){
                    let message=JSON.parse(xhr.responseText).message;
                    if(message==="id"){
                        alert("This id already in the system !!")
                    } else if(message==="email"){
                        alert("This email is already registered !!")
                    }

                }
            }

        })

    }




    /*delete supplier*/
    $("#sDeleteBtn").click(function (){
        deleteSupplier();
    })
    function deleteSupplier(){

        let id=$("#sId").val();
        $.ajax({
            url: 'http://localhost:8080/api/v1/supplier/delete/'+id,
            method:"delete",
            "headers": {
                "Authorization": "Bearer "+token
            },
            success:function (response) {
                console.log(response)
                getAllSuppliers();
                clearSupplierInputFields();
                $("#sSaveBtn").prop("disabled", true);
                $("#sUpdateBtn").prop("disabled", true);
                $("#sDeleteBtn").prop("disabled", true);
            },
            error:function (xhr,status,err) {
                console.log(err)
                console.log(xhr.status)
                if(xhr.status===404){
                    alert("This Supplier is not in system.Try with another!!")
                }
            }

        })
    }




    /*search supplier*/
    $("#sSearch").on("input", function () {
        $("#sTable").empty();
        let name=$("#sSearch").val();
        console.log(name.trim())
        $.ajax({
            url: 'http://localhost:8080/api/v1/supplier/search?name='+name,
            method:"GET",
            dataType: "json",
            "headers": {
                "Authorization": "Bearer "+token
            },

            success:function (response) {

                console.log(response)

                $.each(response, function (index, supplier) {

                    setTimeout(function (){
                        let newCategory=supplierCapitalizeFirstLetter(supplier.category);


                        let data = `<tr>
                            <td>${supplier.code}</td>                    
                            <td>${supplier.name}</td>
                            <td>${supplier.email}</td>
                            <td>${newCategory}</td>
                            <td>${supplier.addressLine1} ${supplier.addressLine2}</td>
                            <td>${supplier.contactMobile}</td>
                            <td>${supplier.contactLand}</td>
                            <td style="display: none">${supplier.addressLine1}</td>
                            <td style="display: none">${supplier.addressLine2}</td>
                            
                            </tr>`
                        $("#sTable").append(data);
                    },600,index)
                })

            },
            error:function (xhr,status,err) {
                console.log(err)
            }
        })
    });




    /*table click*/
    $('#sTable').on('click', 'tr', function (){

        var code= $(this).find('td:eq(0)').text();
        var name = $(this).find('td:eq(1)').text();
        var email = $(this).find('td:eq(2)').text();
        var category = $(this).find('td:eq(3)').text();

        var contactMobile = $(this).find('td:eq(5)').text();
        var contactLand = $(this).find('td:eq(6)').text();

        var address= $(this).find('td:eq(7)').text();
        var state= $(this).find('td:eq(8)').text();

        $("#sSaveBtn").prop("disabled", false);
        $("#sUpdateBtn").prop("disabled", false);
        $("#sDeleteBtn").prop("disabled", false);

        $("#sId").val(code);
        $("#sName").val(name);
        $("#sEmail").val(email);
        $("#sCategory").val(category);
        $("#sMobile").val(contactMobile);
        $("#sLand").val(contactLand);
        $("#sAddress").val(address);
        $("#sState").val(state);


    })



    /*clear text fields*/
    $("#sClearBtn").click(function (){
        clearSupplierInputFields();
        loadNextSupplierId();
    })


    /*capitalize first letter*/
    function supplierCapitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }


}

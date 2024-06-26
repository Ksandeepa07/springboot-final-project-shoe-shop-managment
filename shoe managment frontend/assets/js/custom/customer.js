

window.onload = function() {
    getAllCustomers();
    loadNextCustomerId();

    let proPic = ` <img alt="" class="img-xs rounded-circle " src="data:image/png;base64,${localStorage.getItem("userProPic")}">
                        <span class="count bg-success"></span>`;
    $(".userPic").append(proPic);
    $(".userName").text(localStorage.getItem("userName"));


    /*get all*/
    function getAllCustomers() {
        console.log(+localStorage.getItem("token"));
        $.ajax({
            url: "http://localhost:8080/api/v1/customer/getAllCustomers",
            "headers": {
                "Authorization": "Bearer "+token
            },
            method: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response);
                console.log(response.length);
                loadCustomerDataInTable(response);
            },
            error: function (xhr, status, err) {
                console.log(err)
                console.log(xhr.status);
                // if(xhr.status === 401){
                //    alert("token expired!!")
                //
                // }
            }
        })
    }
    function loadCustomerDataInTable(response) {
        $("#cTable").empty();
        $.each(response, function (index, customer) {
            let newGender=customerCapitalizeFirstLetter(customer.gender)

            if(customer.recentPurchaseDate===null){
                customer.recentPurchaseDate="No Purchases Yet";
            }
            let data = `<tr>
                            <td>${customer.code}</td>
                            <td style="display: none" >${customer.code}</td>
                            <td>${customer.name}</td>
                            <td>${customer.email}</td>
                            <td>${customer.contact}</td>
                            <td>${customer.dob}</td>
                            <td>${newGender}</td>
                            <td>${customer.addressLine1} ${customer.addressLine2}</td>
                            <td style="display: none">${customer.addressLine2}</td>
                            <td>${customer.loyaltyDate}</td>
                            <td><div class="badge badge-outline-danger">${customer.loyaltyLevel}</div></td>
                            <td><div class="badge badge-outline-success">${customer.loyaltyPoints}</div></td>
                            <td>${customer.recentPurchaseDate}</td>
                            <td style="display: none">${customer.addressLine1}</td>
                            </tr>`
            $("#cTable").append(data);
        });

    }




    /*next id*/
    function loadNextCustomerId(){
        $.ajax({
            url:"http://localhost:8080/api/v1/customer/nextId",
            "headers": {
                "Authorization": "Bearer "+token
            },
            method:"GET",
            success:function (response) {
                console.log(response)
                $("#cId").val(response);
            },
            error:function (xhr, status, error) {
                console.log(error)
            }
        })
    }




    /*save customer*/
    $("#cSaveBtn").click(function (){
        saveCustomer();
    })
    function saveCustomer(){
        let id=$("#cId").val();
        let name=$("#cName").val();
        let email=$("#cEmail").val();
        let contact=$("#cContact").val();
        let addressLine1=$("#cAddressLine").val();
        let addressLine2=$("#cStateCity").val();
        let dob=$("#cDob").val();
        let loyaltyDate=$("#cLoyaltyDate").val();
        let gender=$("#cGender").val();

        console.log(name)
        console.log(email)
        console.log(contact)
        console.log(addressLine1)
        console.log(addressLine2)
        console.log(dob)
        console.log(loyaltyDate)
        console.log(gender)

        if(name==="" || email==="" || contact==="" || addressLine1==="" || addressLine2==="" || dob==="" ||loyaltyDate==="" || gender==="Choose..."){
            alert("fill all empty fields !!")
            return;
        }

        $.ajax({
            url: 'http://localhost:8080/api/v1/customer/save',
            method:"Post",
            dataType: "json",
            contentType:"application/json",
            "headers": {
                "Authorization": "Bearer "+token
            },
            data:JSON.stringify({
                "code":id,
                "name":name,
                "email":email,
                "gender":gender.toUpperCase(),
                "contact":contact,
                "dob":dob,
                "addressLine1":addressLine1,
                "addressLine2":addressLine2,
                "loyaltyDate":loyaltyDate,
                "loyaltyLevel":"NEW",
                "loyaltyPoints":0
            }),

            success:function (response) {
                console.log(response)
                getAllCustomers();
                clearCustomerInputFields();
                $("#cSaveBtn").prop("disabled", true);
                $("#cUpdateBtn").prop("disabled", true);
                $("#cDeleteBtn").prop("disabled", true);

                Swal.fire(
                    'Customer Saved Successfully',
                    'Customer has been Saved successfully..!',
                    'success'
                )
            },
            error:function (xhr,status,err) {
                console.log(err)
                console.log(xhr.status)
                console.log(xhr.responseText)
                if(xhr.status === 409){
                    let message=JSON.parse(xhr.responseText).message;
                    if(message==="id"){
                        alert("This customer is already in the system !!")
                    } else if(message==="email"){
                        alert("This customer email is already registered !!")
                    }

                }
            }

        })
    }




    /*update customer*/
    $("#cUpdateBtn").click(function (){
        updateCustomer()
    })
    function updateCustomer() {
        let code=$("#cId").val();
        let name=$("#cName").val();
        let email=$("#cEmail").val();
        let contact=$("#cContact").val();
        let addressLine1=$("#cAddressLine").val();
        let addressLine2=$("#cStateCity").val();
        let dob=$("#cDob").val();
        let loyaltyDate=$("#cLoyaltyDate").val();
        let loyaltyLevel=$("#cLevel").val();
        let gender=$("#cGender").val();
        let loyaltyPoints=$("#cLoyaltyPoint").val();
        let recentDate=$("#cRecentDate").val();


        if(name==="" || email==="" || contact==="" || addressLine1==="" || addressLine2==="" || dob==="" ||loyaltyDate==="" || gender==="Choose..."){
            alert("fill all empty fields !!")
            return;
        }

        if (recentDate==="No Purchases Yet"){
            recentDate=null;
        }


        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to Update this record!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'Close'
        }).then((result) => {
            if (result.isConfirmed) {

                $.ajax({
                    url: 'http://localhost:8080/api/v1/customer/update',
                    method:"Patch",
                    dataType:"json",
                    contentType:"application/json",
                    "headers": {
                        "Authorization": "Bearer "+token
                    },
                    data:JSON.stringify({
                        "code":code,
                        "name":name,
                        "email":email,
                        "gender":gender.toUpperCase(),
                        "contact":contact,
                        "dob":dob,
                        "addressLine1":addressLine1,
                        "addressLine2":addressLine2,
                        "loyaltyDate":loyaltyDate,
                        // "loyaltyLevel":loyaltyLevel.toUpperCase(),
                        // "loyaltyPoints":loyaltyPoints,
                        // "recentPurchaseDate":recentDate
                    }),

                    success:function (response){
                        console.log(response)
                        getAllCustomers();
                        clearCustomerInputFields();
                        $("#cSaveBtn").prop("disabled", true);
                        $("#cUpdateBtn").prop("disabled", true);
                        $("#cDeleteBtn").prop("disabled", true);
                    },
                    error:function (xhr,status,err,response) {
                        console.log(err)
                        console.log(xhr.status)
                        if(xhr.status===404){
                            alert("This customer is not in system.Try with another!!")
                        }

                        if(xhr.status === 409){
                            let message=JSON.parse(xhr.responseText).message;
                            if(message==="id"){
                                alert("This customer is already in the system !!")
                            } else if(message==="email"){
                                alert("This customer email is already registered !!")
                            }

                        }
                    }
                })

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'cancelled:)', 'info');
            }
        });



    }





    /*delete customer*/
    $("#cDeleteBtn").click(function (){
        deleteCustomer();
    })

    function deleteCustomer(){
        let id=$("#cId").val();


        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this record!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Close'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: 'http://localhost:8080/api/v1/customer/delete/'+id,
                    method:"delete",
                    "headers": {
                        "Authorization": "Bearer "+token
                    },
                    success:function (response) {
                        console.log(response)
                        getAllCustomers();
                        clearCustomerInputFields();
                        $("#cSaveBtn").prop("disabled", true);
                        $("#cUpdateBtn").prop("disabled", true);
                        $("#cDeleteBtn").prop("disabled", true);
                    },
                    error:function (xhr,status,err) {
                        console.log(err)
                        console.log(xhr.status)
                        if(xhr.status===404){
                            alert("This customer is not in system.Try with another!!")
                        }
                    }

                })

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Your record is safe :)', 'info');
            }
        });


    }





    /*table click*/
    $('#cTable').on('click', 'tr', function (){

        var id= $(this).find('td:eq(1)').text();
        var name = $(this).find('td:eq(2)').text();
        var email = $(this).find('td:eq(3)').text();
        var contact = $(this).find('td:eq(4)').text();
        var dob= $(this).find('td:eq(5)').text();
        var gender = $(this).find('td:eq(6)').text();
        var address = $(this).find('td:eq(13)').text();
        var cityAndState = $(this).find('td:eq(8)').text();
        var loyaltyDate = $(this).find('td:eq(9)').text();
        var loyaltyLevel = $(this).find('td:eq(10)').text();
        var loyaltyPoints = $(this).find('td:eq(11)').text();
        var recentDate = $(this).find('td:eq(12)').text();

        $("#cSaveBtn").prop("disabled", false);
        $("#cUpdateBtn").prop("disabled", false);
        $("#cDeleteBtn").prop("disabled", false);

        $("#cId").val(id);
        $("#cName").val(name);
        $("#cEmail").val(email);
        $("#cContact").val(contact);
        $("#cAddressLine").val(address);
        $("#cStateCity").val(cityAndState);
        $("#cDob").val(dob);
        $("#cLoyaltyDate").val(loyaltyDate);
        $("#cGender").val(gender);
        $("#cLevel").val(loyaltyLevel);
        $("#cLoyaltyPoint").val(loyaltyPoints);
        $("#cRecentDate").val(recentDate);

    })



    /*search function*/
    $("#cSearch").on("input", function () {
        $("#cTable").empty();
        let name=$("#cSearch").val();
        console.log(name.trim())
        $.ajax({
            url: 'http://localhost:8080/api/v1/customer/search?name='+name,
            method:"GET",
            dataType: "json",
            "headers": {
                "Authorization": "Bearer "+token
            },
            success:function (response) {

                console.log(response)

                $.each(response, function (index, customer) {

                    setTimeout(function (){
                        let newGender = customerCapitalizeFirstLetter(customer.gender)

                        if (customer.recentPurchaseDate === null) {
                            customer.recentPurchaseDate = "No Purchases Yet";
                        }
                        let data = `<tr>
                            <td>${customer.code}</td>
                            <td style="display: none" >${customer.code}</td>
                            <td>${customer.name}</td>
                            <td>${customer.email}</td>
                            <td>${customer.contact}</td>
                            <td>${customer.dob}</td>
                            <td>${newGender}</td>
                            <td>${customer.addressLine1} ${customer.addressLine2}</td>
                            <td style="display: none">${customer.addressLine2}</td>
                            <td>${customer.loyaltyDate}</td>
                            <td><div class="badge badge-outline-danger">${customer.loyaltyLevel}</div></td>
                            <td><div class="badge badge-outline-success">${customer.loyaltyPoints}</div></td>
                            <td>${customer.recentPurchaseDate}</td>
                            <td style="display: none">${customer.addressLine1}</td>
                            </tr>`
                        $("#cTable").append(data);
                    },600,index)
                })

            },
            error:function (xhr,status,err) {
                console.log(err)
            }
        })
    });




    /*clear function*/
    $("#cClearBtn").click(function (){
        clearCustomerInputFields();
        loadNextCustomerId();
    })



    /*capitalize first letter*/
    function customerCapitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }



};





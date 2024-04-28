
getAllEmployees();
loadNextEmployeeId();
let x=1;

/*next id*/
function loadNextEmployeeId(){
    $.ajax({
        url:"http://localhost:8080/api/v1/employee/nextId",
        method:"GET",
        success:function (response) {
            console.log(response)
            $("#eId").val(response);
        },
        error:function (xhr, status, error) {
            console.log(error)
        }
    })
}

/*get all employees*/
function getAllEmployees() {
    $.ajax({
        url: "http://localhost:8080/api/v1/employee/getAllEmployees",
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            console.log(response.length);

            loadEmployeeDataInTable(response);

        },
        error: function (xhr, status, err) {
            console.log(err)
        }
    })
}
function loadEmployeeDataInTable(response) {
    $.each(response, function (index, employee) {

        let newGender=employeeCapitalizeFirstLetter(employee.gender)
        let newRole=employeeCapitalizeFirstLetter(employee.role)

        let data = `<tr>
                    <td>${employee.code}</td>
                    <td><img alt="image" src="data:image/png;base64,${employee.proPic}"/></td>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.dob}</td>
                    <td>${newGender}</td>
                    <td>${employee.joinDate}</td>
                    <td>${newRole}</td>
                    <td>${employee.civilStatus}</td>
                    <td>${employee.designation}</td>
                    <td>${employee.addressLine1}${employee.addressLine2}</td>
                    <td>${employee.contact}</td>
                    <td>${employee.branch}</td>
                    <td>${employee.guardianName}</td>
                    <td>${employee.guardianContact}</td>
                    <td style="display: none">${employee.addressLine1}</td>
                    <td style="display: none">${employee.addressLine2}</td>
                  
                </tr>`;
        $("#eTable").append(data);
    });

}

/*save employee*/
$("#eSaveBtn").click(function (){
    saveEmployee();
})
function saveEmployee(){
    let code=$("#eId").val();
    let name=$("#eName").val();
    let email=$("#eEmail").val();
    let contact=$("#ePhone").val();
    let addressLine1=$("#eAddress").val();
    let addressLine2=$("#eState").val();
    let dob=$("#edOb").val();
    let designation=$("#eDesignation").val();
    let role=$("#eROle").val();
    let civilStatus=$("#eStatus").val();
    let joinDate=$("#eJoinDate").val();
    let guardian=$("#eGuardian").val();
    let guardianNumber=$("#eHomeNumber").val();
    let gender=$("#eGender").val();
    let branch=$("#eBranch").val();
    let proPicInput=$('#eImage').prop('files')[0];
    console.log(proPicInput)
    console.log(dob)



    var formData = new FormData();
    formData.append('code', code);
    formData.append('name', name);
    formData.append('proPic', proPicInput);
    formData.append('email', email);
    formData.append('contact', contact);
    formData.append('dob', dob);
    formData.append('addressLine1', addressLine1);
    formData.append('addressLine2', addressLine2);
    formData.append('joinDate', joinDate);
    formData.append('guardianContact', guardianNumber);
    formData.append('guardianName', guardian);
    formData.append('branch', branch);
    formData.append('gender', gender.toUpperCase());
    formData.append('civilStatus', civilStatus);
    formData.append('designation', designation);
    formData.append('role', role.toUpperCase());


    $.ajax({
        url: 'http://localhost:8080/api/v1/employee/save',
        method:"Post",
        processData: false,
        contentType: false,
        data:formData,

        success:function (response) {
            console.log(response)
        },
        error:function (xhr,status,err) {
            console.log(err)
        }
    })

}

/*update employee*/
$("#eUpdateBtn").click(function (){
    updateEmployee()
})
function updateEmployee(){

    let code=$("#eId").val()
    let name=$("#eName").val();
    let email=$("#eEmail").val();
    let contact=$("#ePhone").val();
    let addressLine1=$("#eAddress").val();
    let addressLine2=$("#eState").val();
    let dob=$("#edOb").val();
    let designation=$("#eDesignation").val();
    let role=$("#eROle").val();
    let civilStatus=$("#eStatus").val();
    let joinDate=$("#eJoinDate").val();
    let guardian=$("#eGuardian").val();
    let guardianNumber=$("#eHomeNumber").val();
    let gender=$("#eGender").val();
    let branch=$("#eBranch").val();
    let proPicInput=$('#eImage').prop('files')[0];
    console.log(proPicInput)
    console.log(dob)

    var formData = new FormData();
    formData.append('code', code);
    formData.append('name', name);
    formData.append('proPic', proPicInput);
    formData.append('email', email);
    formData.append('contact', contact);
    formData.append('dob', dob);
    formData.append('addressLine1', addressLine1);
    formData.append('addressLine2', addressLine2);
    formData.append('joinDate', joinDate);
    formData.append('guardianContact', guardianNumber);
    formData.append('guardianName', guardian);
    formData.append('branch', branch);
    formData.append('gender', gender.toUpperCase());
    formData.append('civilStatus', civilStatus);
    formData.append('designation', designation);
    formData.append('role', role.toUpperCase());


    $.ajax({
        url: 'http://localhost:8080/api/v1/employee/update',
        method:"Patch",
        processData: false,
        contentType: false,
        data:formData,

        success:function (response) {
            console.log(response)
        },
        error:function (xhr,status,err) {
            console.log(err)
        }
    })

}

/*table click*/
$('#eTable').on('click', 'tr', function (){

    var id= $(this).find('td:eq(0)').text();
    var proPic= $(this).find('td:eq(1)').html();
    var name = $(this).find('td:eq(2)').text();
    var email = $(this).find('td:eq(3)').text();
    var dob= $(this).find('td:eq(4)').text();
    var gender = $(this).find('td:eq(5)').text();
    var joinDate = $(this).find('td:eq(6)').text();
    var role = $(this).find('td:eq(7)').text();
    var civilStatus = $(this).find('td:eq(8)').text();
    var designation = $(this).find('td:eq(9)').text();
    var contact = $(this).find('td:eq(11)').text();
    var branch = $(this).find('td:eq(12)').text();
    var guardianName = $(this).find('td:eq(13)').text();
    var guardianContact = $(this).find('td:eq(14)').text();
    var address = $(this).find('td:eq(15)').text();
    var state = $(this).find('td:eq(16)').text();


    console.log("1 "+id)
    console.log("2 "+proPic)
    console.log("3 "+name)
    console.log("4 "+email)
    console.log("5 "+dob)
    console.log("6 "+gender)
    console.log("7 "+joinDate)
    console.log("8 "+role)
    console.log("9 "+civilStatus)
    console.log("10 "+designation)
    console.log("11 "+contact)
    console.log("12 "+branch)
    console.log("13 "+guardianName)
    console.log("14"+guardianContact)

    var base64Data;
    var matches = proPic.match(/src="data:image\/png;base64,([^"]+)"/);
    if (matches) {
        base64Data = matches[1];
        console.log(base64Data);

        // Decode base64 data into a blob
        var byteCharacters = atob(base64Data);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], { type: 'image/png' });

        // Create a file from the blob
        var file = new File([blob], 'image.png', { type: 'image/png' });
        console.log(file)

        var dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        // Set the files property of the file chooser input field using the files property of the DataTransfer object
        var fileInput = document.getElementById('eImage');
        fileInput.files = dataTransfer.files;

    } else {
        console.log("No image data found in the table cell.");
    }



    $("#eId").val(id);
    // $("#eImage").[0].files=[base64Data];
    // $("#eImage").val(blob);
    $("#eName").val(name);
    $("#eEmail").val(email);
    $("#edOb").val(dob);
    $("#eGender").val(gender);
    $("#eJoinDate").val(joinDate);
    $("#eROle").val(role);
    $("#eStatus").val(civilStatus);
    $("#eDesignation").val(designation);
    $("#eAddress").val(address );
    $("#ePhone").val(contact );
    $("#eBranch").val(branch );
    $("#eGuardian").val(guardianName );
    $("#eHomeNumber").val(guardianContact );
    $("#eState").val(state );


})

/*search table*/
$("#eSearch").on("input", function () {
    alert("dd")
    $("#eTable").empty();
    // let name=$("#cSearch").val();
    // console.log(name.trim())
    // $.ajax({
    //     url: 'http://localhost:8080/api/v1/customer/search?name='+name,
    //     method:"GET",
    //     dataType: "json",
    //
    //     success:function (response) {
    //
    //         console.log(response)
    //
    //         $.each(response, function (index, customer) {
    //
    //             setTimeout(function (){
    //                 let newGender = customerCapitalizeFirstLetter(customer.gender)
    //
    //                 if (customer.recentPurchaseDate === null) {
    //                     customer.recentPurchaseDate = "No Purchases Yet";
    //                 }
    //                 let data = `<tr>
    //                         <td>${customer.code}</td>
    //                         <td style="display: none" >${customer.code}</td>
    //                         <td>${customer.name}</td>
    //                         <td>${customer.email}</td>
    //                         <td>${customer.contact}</td>
    //                         <td>${customer.dob}</td>
    //                         <td>${newGender}</td>
    //                         <td>${customer.addressLine1} ${customer.addressLine2}</td>
    //                         <td style="display: none">${customer.addressLine2}</td>
    //                         <td>${customer.loyaltyDate}</td>
    //                         <td><div class="badge badge-outline-danger">${customer.loyaltyLevel}</div></td>
    //                         <td><div class="badge badge-outline-success">${customer.loyaltyPoints}</div></td>
    //                         <td>${customer.recentPurchaseDate}</td>
    //                         <td style="display: none">${customer.addressLine1}</td>
    //                         </tr>`
    //                 $("#cTable").append(data);
    //             },600,index)
    //         })
    //
    //     },
    //     error:function (xhr,status,err) {
    //         console.log(err)
    //     }
    // })
});



/*capital only first letter*/
function employeeCapitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
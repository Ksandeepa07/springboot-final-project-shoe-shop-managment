
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
                    <td>${x++}</td>
                    <td style="display: none">${employee.code}</td>
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
    formData.append('name', name);
    formData.append('proPic', proPicInput);
    formData.append('email', email);
    formData.append('contact', contact);
    formData.append('dob', dob);
    formData.append('addressLine1', addressLine1);
    formData.append('addressLine2', addressLine2);
    // formData.append('joinDate', joinDate);
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

/*table click*/
$('#eTable').on('click', 'tr', function (){

    var id= $(this).find('td:eq(1)').text();
    var proPic= $(this).find('td:eq(1)').text();
    var name = $(this).find('td:eq(3)').text();
    var email = $(this).find('td:eq(4)').text();
    var dob= $(this).find('td:eq(5)').text();
    var gender = $(this).find('td:eq(6)').text();
    var joinDate = $(this).find('td:eq(7)').text();
    var role = $(this).find('td:eq(8)').text();
    var civilStatus = $(this).find('td:eq(9)').text();
    var designation = $(this).find('td:eq(10)').text();
    var contact = $(this).find('td:eq(12)').text();
    var branch = $(this).find('td:eq(13)').text();
    var guardianName = $(this).find('td:eq(14)').text();
    var guardianContact = $(this).find('td:eq(15)').text();
    var address = $(this).find('td:eq(16)').text();
    var state = $(this).find('td:eq(17)').text();

    $("#eId").val(id);
    // $("#eImage").val(proPic);
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


/*capital only first letter*/
function employeeCapitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

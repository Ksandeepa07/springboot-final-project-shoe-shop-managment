let proPic = ` <img alt="" class="img-xs rounded-circle " src="data:image/png;base64,${localStorage.getItem("userProPic")}">
                        <span class="count bg-success"></span>`;
$(".userPic").append(proPic);
$(".userName").text(localStorage.getItem("userName"));

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*.{8,})/;
const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

$("#signUpBtn").click(function (){
    let email=$("#sUserEmail").val();
    let password=$("#sUserPassword").val();
    let role=$("#sUserRole").val();

    if (email==="" || password==="" || role==="Choose..."){
        alert("please fill all required fields to continue!!")
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Invalid email type!!");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Invalid password! Password must be at least 8 characters long, contain at least one uppercase letter, and at least one symbol.");
        return false;
    }


    $.ajax({
        url: 'http://localhost:8080/api/v1/auth/signup',
        method:"Post",
        dataType: "json",
        contentType:"application/json",
        data:JSON.stringify({
            "email":email,
            "password":password,
            "role":role,
        }),

        success:function (response) {
            console.log(response)
            // window.location.href="/shoe managment frontend/pages/auth/login.html";
            $("#sUserEmail").val("");
            $("#sUserPassword").val("");
            $("#sUserRole").prop('selectedIndex', 0);
        },
        error:function (xhr,status,err) {
            console.log(err)
            console.log(xhr.status)
            console.log(xhr.responseText)

        }

    })


})
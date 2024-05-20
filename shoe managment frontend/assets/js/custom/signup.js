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
            // localStorage.setItem("token",response.token)
            // localStorage.setItem("date",response.date)
            window.location.href="/shoe managment frontend/pages/auth/login.html";
            // $.each(response, function (index, login) {
            //     console.log(login.role)
            //     if (login.role==="ADMIN"){
            //         console.log(login.token)
            //         window.location.href="/shoe managment frontend/pages/admin/adminDashboard.html";
            //     }
            //     else if (login.role==="USER"){
            //         console.log(login.token)
            //         window.location.href="/shoe managment frontend/pages/user/userDashboard.html";
            //     }
            // })

        },
        error:function (xhr,status,err) {
            console.log(err)
            console.log(xhr.status)
            console.log(xhr.responseText)
            // if(xhr.status === 404){
            //     let message=JSON.parse(xhr.responseText).message;
            //     if(message==="username"){
            //         alert("Username is incorrect !!")
            //     } else if(message==="password"){
            //         alert("Password is incorrect !!")
            //     }
            //
            // }
        }

    })


})
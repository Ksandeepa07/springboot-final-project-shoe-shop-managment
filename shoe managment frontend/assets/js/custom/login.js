$("#loginBtn").click(function (){
    // console.log($("#lUserEmail").val())
    // console.log($("#lUserPassword").val())

    $.ajax({
        url: 'http://localhost:8080/api/v1/auth/signing',
        method:"Post",
        dataType: "json",
        contentType:"application/json",
        data:JSON.stringify({
            "email":$("#lUserEmail").val(),
            "password":$("#lUserPassword").val(),
        }),

        success:function (response) {
            console.log(response)
            localStorage.setItem("token",response.token)
            localStorage.setItem("date",response.date)
            $.each(response, function (index, login) {
                console.log(login.role)
                if (login.role==="ADMIN"){
                    console.log(login.token)
                    window.location.href="/shoe managment frontend/pages/admin/adminDashboard.html";
                }
               else if (login.role==="USER"){
                    console.log(login.token)
                    window.location.href="/shoe managment frontend/pages/user/userDashboard.html";
                }
            })

        },
        error:function (xhr,status,err) {
            console.log(err)
            console.log(xhr.status)
            console.log(xhr.responseText)
            if(xhr.status === 404){
                let message=JSON.parse(xhr.responseText).message;
                if(message==="username"){
                    alert("Username is incorrect !!")
                } else if(message==="password"){
                    alert("Password is incorrect !!")
                }

            }
        }

    })
})
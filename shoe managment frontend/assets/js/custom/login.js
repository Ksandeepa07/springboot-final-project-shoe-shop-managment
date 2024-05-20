$("#loginBtn").click(function () {
    let email = $("#lUserEmail").val();
    let password = $("#lUserPassword").val();

    if (email === "" || password === "") {
        alert("Please fill all empty fields before continue!!")
        return false;
    }

     $.ajax({
        url: 'http://localhost:8080/api/v1/auth/signing',
        method: "Post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            "email": email,
            "password": password,
        }),

        success: function (response) {
            console.log(response)
            localStorage.setItem("token", response.token)
            localStorage.setItem("date", response.date)

            $.each(response, function (index, login) {
                localStorage.setItem("userName", login.name)
                localStorage.setItem("userProPic", login.proPic)
                console.log(login.userRole)

                if (login.userRole === "ADMIN") {
                    console.log(login.token)
                    localStorage.setItem("userRole",login.userRole)
                    window.location.href = "/shoe managment frontend/pages/admin/adminDashboard.html";

                } else if (login.userRole === "USER") {
                    localStorage.setItem("userRole",login.userRole)
                    window.location.href = "/shoe managment frontend/pages/user/userDashboard.html";
                }
            })

        },
        error: function (xhr, status, err) {
            console.log(err)
            console.log(xhr.status)
            console.log(xhr.responseText)
            if (xhr.status === 404) {
                let message = JSON.parse(xhr.responseText).message;
                if (message === "username") {
                    alert("Username is incorrect !!")
                } else if (message === "password") {
                    alert("Password is incorrect !!")
                }

            }
        }

    })
})
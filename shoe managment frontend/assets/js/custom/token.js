
let token = localStorage.getItem("token");
const currentTime = new Date().getTime();
let isoString = localStorage.getItem("date");
let date = new Date(isoString);
let unixTimestamp = date.getTime();

/*reduce time by 20 sec*/
// let twentySecondsInMilliseconds = 10 * 1000;
// let newTimestamp = unixTimestamp - twentySecondsInMilliseconds;

console.log(token);

expire();

function expire() {
    if (currentTime > unixTimestamp) {
        window.location.href="/shoe managment frontend/pages/auth/login.html";

        // $.ajax({
        //     url: 'http://localhost:8080/api/v1/auth/refreshToken/' + token,
        //     method: "POST",
        //     dataType: "json",
        //     contentType: "application/json",
        //     headers: {
        //         "Authorization": "Bearer " + token
        //     },
        //     success: function (response) {
        //         console.log(response);
        //         token = response.token;
        //         localStorage.setItem("token", token);
        //         isoString = response.date;
        //         localStorage.setItem("date", isoString);
        //     },
        //     error: function (xhr, status, err) {
        //         console.log(err);
        //         console.log(xhr.status);
        //         console.log(xhr.responseText);
        //         alert("session expired log in again !!")
        //         window.location.href="/shoe managment frontend/pages/auth/login.html";
        //
        //     }
        // });
    }
}


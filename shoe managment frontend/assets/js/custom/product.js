getAllProducts();
countMensIds();
countWomensIds();

function getAllProducts() {
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/getALl",
        method: "GET",
        dataType: "json",
        "headers": {
            "Authorization": "Bearer "+token
        },
        success: function (response) {
            console.log(response);
            $(".productCount").text(response.length)
            $(".countOnSearch").text(response.length);
            loadProductsData(response);

        },
        error: function (xhr, status, err) {
            console.log(err)
        }
    })
}

// ${inventory.shoeSizes[0].size}

function loadProductsData(response) {
    $.each(response, function (index, inventory) {
        let sizesHTML = '';

        for (let i = 0; i < inventory.shoeSizes.length; i++) {
            sizesHTML += `<P style="display: inline; margin-right: 6px;border-radius: 50px;font-size: 12px" class="badge-primary font-weight-bold px-2 py-1">${inventory.shoeSizes[i].size}</P>`;
        }


        let product =
            `<div class="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 d-flex justify-content-center align-items-center">
                 <div style="width: 300px" class="card my-2 shadow-2-strong productCard">
              <div class="productImg"> <img class="card-img-top" src="${inventory.itemPic}" style="aspect-ratio: 1 / 0.8;"/></div>
                <div  class="card-body d-flex flex-column productCardBody shadow ">
                <div class="titleAndPrice row">
                <div class="col-6 d-flex justify-content-start align-items-center">
                  <p class="card-title font-weight-bold  m-0">${inventory.name}</p>
              </div>
                <div class="col-6 d-flex justify-content-end align-items-center">
                 <p style="font-size: 16px" class="card-text font-weight-bold mt-0 badge-outline-primary  px-2 py-1">$ ${inventory.salePrice}.00</p>
              </div>

               </div>
                      <div class="sizes mt-3">Sizes : ${sizesHTML}</div>
                    <div class="card-footer text-left  px-0 pb-0 mt-auto border-0 ">
<!--                        <a class="btn btn-primary shadow-0 mt-2 addToCartBtn" href="#!">Add to cart</a>-->
                    </div>
                </div>
            </div>
        </div>`


        $(".productGrid").append(product);

    });


}


/*count ids*/
function countMensIds() {
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/countByCategories/M",
        method: "GET",
        // dataType: "json",
        "headers": {
            "Authorization": "Bearer "+token
        },
        success: function (response) {
            console.log(response);
            console.log(response.length);
            if (response < 10) {
                $(".mensCount").text("0" + response)
            } else {
                $(".mensCount").text(response)

            }


        },
        error: function (xhr, status, err) {
            console.log(err)
        }
    })
}

function countWomensIds() {
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/countByCategories/W",
        method: "GET",
        // dataType: "json",
        "headers": {
            "Authorization": "Bearer "+token
        },
        success: function (response) {
            console.log(response);
            console.log(response.length);
            if (response < 10) {
                $(".womensCount").text("0" + response)
            } else {
                $(".womensCount").text(response)

            }


        },
        error: function (xhr, status, err) {
            console.log(err)
        }
    })
}


/*get check box values for search*/
$("#applyBtn").click(function () {
    let categoryBoxesArray = [];
    let typeBoxesArray = []
    let minPrice = $("#minPrice").val();
    let maxPrice = $("#maxPrice").val();


    let categoryBoxes = document.querySelectorAll('.categoryBox');
    categoryBoxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            categoryBoxesArray.push(checkbox.value);
        }
    });

    let typeBoxes = document.querySelectorAll('.typeChecked');
    typeBoxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            typeBoxesArray.push(checkbox.value);
        }
    });

    console.log(categoryBoxesArray);
    console.log(typeBoxesArray);
    console.log(minPrice);
    console.log(maxPrice);


    /*search with all conditions enabled*/
    if (categoryBoxesArray.length === 1 && typeBoxesArray.length === 1 && minPrice !== "" && maxPrice !== "") {
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/searchByAllConditions/" + categoryBoxesArray[0] + "/" + typeBoxesArray[0] + "/" + minPrice + "/" + maxPrice,
            method: "GET",
            "headers": {
                "Authorization": "Bearer "+token
            },
            success: function (response) {
                console.log(response);
                console.log(response.length);
                loadProductBasedOnSearch(response);
                $(".countOnSearch").text(response.length);

            },
            error: function (xhr, status, err) {
                console.log(err)
            }
        })

        /*search by single category*/

    } else if (categoryBoxesArray.length === 1 && typeBoxesArray.length === 0 && minPrice === "" && maxPrice === "") {

        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/searchByCategory/" + categoryBoxesArray[0],
            method: "GET",
            "headers": {
                "Authorization": "Bearer "+token
            },
            success: function (response) {
                console.log(response);
                console.log(response.length);
                loadProductBasedOnSearch(response);
                $(".countOnSearch").text(response.length);

            },
            error: function (xhr, status, err) {
                console.log(err)
            }
        })

        /*search by single type*/
    } else if (categoryBoxesArray.length === 0 && typeBoxesArray.length === 1 && minPrice === "" && maxPrice === "") {
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/searchByType/" + typeBoxesArray[0],
            method: "GET",
            "headers": {
                "Authorization": "Bearer "+token
            },
            success: function (response) {
                console.log(response);
                console.log(response.length);
                loadProductBasedOnSearch(response);
                $(".countOnSearch").text(response.length);

            },
            error: function (xhr, status, err) {
                console.log(err)
            }
        })

        /*search by single price*/
    } else if (categoryBoxesArray.length === 0 && typeBoxesArray.length === 0 && minPrice !== "" && maxPrice !== "") {
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/searchByPrice/" + minPrice + "/" + maxPrice,
            method: "GET",
            "headers": {
                "Authorization": "Bearer "+token
            },
            success: function (response) {
                console.log(response);
                console.log(response.length);
                loadProductBasedOnSearch(response);
                $(".countOnSearch").text(response.length);

            },
            error: function (xhr, status, err) {
                console.log(err)
            }
        })

        /*search by category and type*/
    } else if (categoryBoxesArray.length === 1 && typeBoxesArray.length === 1 && minPrice === "" && maxPrice === "") {
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/searchByCategoryAndType/" + categoryBoxesArray[0] + "/" + typeBoxesArray[0],
            method: "GET",
            "headers": {
                "Authorization": "Bearer "+token
            },
            success: function (response) {
                console.log(response);
                console.log(response.length);
                loadProductBasedOnSearch(response);
                $(".countOnSearch").text(response.length);

            },
            error: function (xhr, status, err) {
                console.log(err)
            }
        })

        /*search by category and price*/
    } else if (categoryBoxesArray.length === 1 && typeBoxesArray.length === 0 && minPrice !== "" && maxPrice !== "") {
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/searchByCategoryAndPrice/" + categoryBoxesArray[0] + "/" + minPrice + "/" + maxPrice,
            method: "GET",
            "headers": {
                "Authorization": "Bearer "+token
            },
            success: function (response) {
                console.log(response);
                console.log(response.length);
                loadProductBasedOnSearch(response);
                $(".countOnSearch").text(response.length);

            },
            error: function (xhr, status, err) {
                console.log(err)
            }
        })
    }
    /*search by type and  price*/
    else if (categoryBoxesArray.length === 0 && typeBoxesArray.length === 1 && minPrice !== "" && maxPrice !== "") {
        $.ajax({
            url: "http://localhost:8080/api/v1/inventory/searchByTypeAndPrice/" + typeBoxesArray[0] + "/" + minPrice + "/" + maxPrice,
            method: "GET",
            "headers": {
                "Authorization": "Bearer "+token
            },
            success: function (response) {
                console.log(response);
                console.log(response.length);
                loadProductBasedOnSearch(response);
                $(".countOnSearch").text(response.length);

            },
            error: function (xhr, status, err) {
                console.log(err)
            }
        })
    } else {
        alert("Choose only one option in each section !!")
    }


})

function loadProductBasedOnSearch(response) {

    $(".productGrid").empty();

    $.each(response, function (index, inventory) {
        let sizesHTML = '';

        for (let i = 0; i < inventory.shoeSizes.length; i++) {
            sizesHTML += `<P style="display: inline; margin-right: 6px;border-radius: 50px;font-size: 12px" class="badge-primary font-weight-bold px-2 py-1">${inventory.shoeSizes[i].size}</P>`;
        }


        let product = `<div class="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 d-flex justify-content-center align-items-center">
            <div style="width: 300px" class="card my-2 shadow-2-strong productCard" >
              <div class="productImg"> <img class="card-img-top" src="${inventory.itemPic}" style="aspect-ratio: 1 / 0.8;"/></div>
<!--                <img class="card-img-top" src="${inventory.itemPic}" style="aspect-ratio: 1 / 1"/>-->
                <div  class="card-body d-flex flex-column productCardBody shadow ">
                <div class="titleAndPrice row">
                <div class="col-6 d-flex justify-content-start align-items-center">
                  <p class="card-title font-weight-bold  m-0">${inventory.name}</p>
</div>
                <div class="col-6 d-flex justify-content-end align-items-center">
                 <p style="font-size: 16px" class="card-text font-weight-bold mt-0 badge-outline-primary  px-2 py-1">$ ${inventory.salePrice}.00</p>
</div>

</div>


                      <div class="sizes mt-3">Sizes : ${sizesHTML}</div>
                    <div class="card-footer text-left  px-0 pb-0 mt-auto border-0 ">
<!--                        <a class="btn btn-primary shadow-0 mt-2" href="#!">Add to cart</a>-->
                    </div>
                </div>
            </div>
        </div>`


        $(".productGrid").append(product);

    });

}


$(document).on('click', '.addToCartBtn', function () {
    // console.log( $(this).find(".productCard").closest(".card-title").text())
    console.log($(this).closest(".productCard").find(".card-title").text());
});






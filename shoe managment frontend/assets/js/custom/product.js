getAllProducts();
function getAllProducts(){
    $.ajax({
        url: "http://localhost:8080/api/v1/inventory/getALl",
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            console.log(response.length);
            loadProductsData(response);

        },
        error: function (xhr, status, err) {
            console.log(err)
        }
    })
}
// <img class="card-img-top"
//      src="${inventory.itemPic}" style="aspect-ratio: 1 / 1"/>
function loadProductsData(response) {
    $.each(response, function (index, inventory) {

       let product=`<div class=" col-xl-3 col-lg-4 col-md-6 col-sm-6 d-flex">
            <div class="card my-2 shadow-2-strong">
                <div class="productImg"></div>
                <div class="card-body d-flex flex-column productCardBody">
                    <h5 class="card-title">${inventory.name}</h5>
                    <p class="card-text">Blazer Suit Dress Jacket for Men, Blue color</p>
                    <div class="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                        <a class="btn btn-primary shadow-0 me-1 w-100" href="#!">Add to cart</a>
                    </div>
                </div>
            </div>
        </div>`

       $(".productGrid").append(product);

    });
}

const INVENTORY_NAME_REGEX=/^[A-Za-z ]{5,}$/;

let iValidations=[];
iValidations.push({field:$("#iDesc"),regEx:INVENTORY_NAME_REGEX});


function clearInventoryInputFields() {
    $("#iDesc").val("");
    $("#iDesc").css({"border": "none "});

    $("#iSupplierName").val("");
    $("#iSalePrice").val("");
    $("#iBuyPrice").val("");
    $("#iProfit").val("")
    $("#iProfitMargin").val("")
    $("#iImage").val("")
    $("#iCode").val("")

    $('#iSupplierCode').prop('selectedIndex', 0);
    $('#iCategory').prop('selectedIndex', 0);
    $('#iStatus').prop('selectedIndex', 0);

    // $(".sizeFields").each(function () {
    //     $(this).find('.size-input').val("");
    //     $(this).find('.qty-input').val("");
    // })

    $("#sizeFields").empty();

    setBtn();
}

$("#iDesc").on("keyup",function(e){

    let indexNo = iValidations.indexOf(iValidations.find((c) => c.field.attr("id") === e.target.id));
    console.log(indexNo);

    if(e.key==="Tab"){
        e.preventDefault();
    }
    checkValidations(iValidations[indexNo]);
    setBtn();
});

setBtn();

function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol, ob) {

    if (!bol && ob.field.val().length >= 1) {
        ob.field.css({
            "border": "1px solid #fc424a",
        });

    } else if(!bol && ob.field.val().length === 0){
        ob.field.css({
            "border": "none !important",
        });
    }
    else {
        ob.field.css({
            "border": "1px solid #00d25b",
        });

    }
}


function checkAll() {
    for (let i = 0; i < iValidations.length; i++) {
        if (!checkValidations(iValidations[i])) return false;
    }
    return true;
}

function setBtn() {
    if (checkAll()) {
        $("#iSaveBtn").prop("disabled", false);
        $("#iUpdateBtn").prop("disabled", false);
        $("#iDeleteBtn").prop("disabled", false);

    }else{
        $("#iSaveBtn").prop("disabled", true);
        $("#iUpdateBtn").prop("disabled", true);
        $("#iDeleteBtn").prop("disabled", true);
    }

}
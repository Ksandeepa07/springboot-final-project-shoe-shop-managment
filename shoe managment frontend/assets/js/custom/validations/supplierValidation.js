const SUPPLIER_NAME_REGEX=/^[A-Za-z ]{5,}$/;
const SUPPLIER_EMAIL_REGEX= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUPPLIER_ADDRESS_REGEX= /^[A-Za-z0-9 ]{5,}$/;
const SUPPLIER_CONTACT_REGEX= /^\d{10}$/;

let sValidations=[];
sValidations.push({field:$("#sName"),regEx:SUPPLIER_NAME_REGEX});
sValidations.push({field:$("#sEmail"),regEx:SUPPLIER_EMAIL_REGEX});
sValidations.push({field:$("#sAddress"),regEx:SUPPLIER_ADDRESS_REGEX});
sValidations.push({field:$("#sState"),regEx:SUPPLIER_ADDRESS_REGEX});
sValidations.push({field:$("#sMobile"),regEx:SUPPLIER_CONTACT_REGEX});
sValidations.push({field:$("#sLand"),regEx:SUPPLIER_CONTACT_REGEX});

function clearSupplierInputFields() {
    $("#sName").val("");
    $("#sName").css({"border": "none "});

    $("#sState").val("");
    $("#sState").css({"border": "none "});

    $("#sAddress").val("");
    $("#sAddress").css({"border": "none "});

    $("#sEmail").val("");
    $("#sEmail").css({"border": "none "});

    $("#sMobile").val("")
    $("#sMobile").css({"border": "none "});

    $("#sLand").val("")
    $("#sLand").css({"border": "none "});


    $('#sCategory').prop('selectedIndex', 0);

    setBtn();
}

$("#sName,#sEmail,#sAddress,#sState,#sMobile,#sLand").on("keyup",function(e){

    let indexNo = sValidations.indexOf(sValidations.find((c) => c.field.attr("id") === e.target.id));
    console.log(indexNo);

    if(e.key==="Tab"){
        e.preventDefault();
    }
    checkValidations(sValidations[indexNo]);
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
    for (let i = 0; i < sValidations.length; i++) {
        if (!checkValidations(sValidations[i])) return false;
    }
    return true;
}

function setBtn() {
    if (checkAll()) {
        $("#sSaveBtn").prop("disabled", false);
        $("#sUpdateBtn").prop("disabled", false);
        $("#sDeleteBtn").prop("disabled", false);

    }else{
        $("#sSaveBtn").prop("disabled", true);
        $("#sUpdateBtn").prop("disabled", true);
        $("#sDeleteBtn").prop("disabled", true);
    }

}
const EMPLOYEE_NAME_REGEX=/^[A-Za-z ]{5,}$/;
const EMPLOYEE_EMAIL_REGEX= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPLOYEE_ADDRESS_REGEX= /^[A-Za-z0-9 ]{5,}$/;
const EMPLOYEE_CONTACT_REGEX= /^\d{10}$/;

let eValidations=[];
eValidations.push({field:$("#eName"),regEx:EMPLOYEE_NAME_REGEX});
eValidations.push({field:$("#eEmail"),regEx:EMPLOYEE_EMAIL_REGEX});
eValidations.push({field:$("#eAddress"),regEx:EMPLOYEE_ADDRESS_REGEX});
eValidations.push({field:$("#ePhone"),regEx:EMPLOYEE_CONTACT_REGEX});
eValidations.push({field:$("#eGuardian"),regEx:EMPLOYEE_NAME_REGEX});
eValidations.push({field:$("#eHomeNumber"),regEx:EMPLOYEE_CONTACT_REGEX});
eValidations.push({field:$("#eState"),regEx:EMPLOYEE_ADDRESS_REGEX});

function clearEmployeeInputFields() {
    $("#eName").val("");
    $("#eName").css({"border": "none "});

    $("#eState").val("");
    $("#eState").css({"border": "none "});

    $("#eAddress").val("");
    $("#eAddress").css({"border": "none "});

    $("#eEmail").val("");
    $("#eEmail").css({"border": "none "});

    $("#eHomeNumber").val("")
    $("#eHomeNumber").css({"border": "none "});

    $("#ePhone").val("")
    $("#ePhone").css({"border": "none "});

    $("#eGuardian").val("")
    $("#eGuardian").css({"border": "none "});

    $("#eImage").val("")


    $('#eGender').prop('selectedIndex', 0);
    $('#eStatus').prop('selectedIndex', 0);
    $('#eDesignation').prop('selectedIndex', 0);
    $('#eROle').prop('selectedIndex', 0);
    $('#eBranch').prop('selectedIndex', 0);

    $("#edOb").val("")
    $("#eJoinDate").val("")


    setBtn();
}

$("#eName,#eEmail,#eAddress,#ePhone,#eGuardian,#eHomeNumber,#eState").on("keyup",function(e){

    let indexNo = eValidations.indexOf(eValidations.find((c) => c.field.attr("id") === e.target.id));
    console.log(indexNo);

    if(e.key==="Tab"){
        e.preventDefault();
    }
    checkValidations(eValidations[indexNo]);
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
    for (let i = 0; i < eValidations.length; i++) {
        if (!checkValidations(eValidations[i])) return false;
    }
    return true;
}

function setBtn() {
    if (checkAll()) {
        $("#eSaveBtn").prop("disabled", false);
        $("#eUpdateBtn").prop("disabled", false);
        $("#eDeleteBtn").prop("disabled", false);

    }else{
        $("#eSaveBtn").prop("disabled", true);
        $("#eUpdateBtn").prop("disabled", true);
        $("#eDeleteBtn").prop("disabled", true);
    }

}
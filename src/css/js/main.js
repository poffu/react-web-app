export function ValidateInput(name, value, regex = "") {
    if (value == '') {
        return name + " is required.";
    } else {
        var checkRegex = new RegExp(regex)
        if (regex != '' && !(checkRegex.test(value))) {
            return name + " is not valid."
        } else {
            return "";
        }
    }
}

export function ValidatePasswordConfirm(password, passwordConfirm) {
    if (password != '') {
        if (passwordConfirm == '' || passwordConfirm == undefined) {
            return "Password confirm is required.";
        } else if (passwordConfirm != password) {
            return "Password and password confirm is not the same."
        }
    }
    return "";
}

export function GetMaxPage(number) {
    return (number / 8 + 1);
}
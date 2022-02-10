export function ValidateInput(name, value, regex = "") {
    if (value === '') {
        return name + " is required.";
    } else {
        var checkRegex = new RegExp(regex)
        if (regex !== '' && !(checkRegex.test(value))) {
            return name + " is not valid."
        }
    }
}

function ValidatePasswordConfirm(password, passwordConfirm) {
    if (password !== '') {
        if (passwordConfirm === '' || passwordConfirm === undefined) {
            return "Password confirm is required.";
        } else if (passwordConfirm !== password) {
            return "Password and password confirm is not the same."
        }
    }
}

export function GetErrorValidateRegister(data) {
    let txtError = [];
    let validateEmail = ValidateInput('Email', data.email, '^[\\w]+@[a-z]+\\.[a-z]+$');
    let validateName = ValidateInput('Name', data.name, '^[A-Za-z\\s]+$');
    let validateTel = ValidateInput('Tel', data.tel, '^[0][0-9]{9}$');
    let validatePassword = ValidateInput('Password', data.password, '^.*(?=.)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).*$');
    let validatePasswordConfirm = ValidatePasswordConfirm(data.password, data.passwordConfirm);
    validateEmail ? txtError.push(validateEmail) : txtError = [...txtError];
    validateName ? txtError.push(validateName) : txtError = [...txtError];
    validateTel ? txtError.push(validateTel) : txtError = [...txtError];
    validatePassword ? txtError.push(validatePassword) : txtError = [...txtError];
    validatePasswordConfirm ? txtError.push(validatePasswordConfirm) : txtError = [...txtError];
    return txtError;
}
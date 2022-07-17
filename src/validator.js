function Validator(options) {

    function validate(inputElement, rule) {
        let errorElement = inputElement.parentElement.querySelector(".form-message")
        let errorMessage = rule.test(inputElement.value)

        if (errorMessage) {
            errorElement.innerText = errorMessage;

        } else {
            errorElement.innerText = ""
        }
        return !errorMessage
    }

    let formElement = document.querySelector(options.form)

    if (formElement) {
        options.rules.forEach((rule) => {
            let inputElement = formElement.querySelector(rule.selector)
            if (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }
            }
        })
    }
}

Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : "Vui lòng nhập trường này"
        }
    }
}

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : "Email không hợp lệ"
        }
    }
}
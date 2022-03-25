function listenForValidation(v) {
    let children = document.querySelectorAll('.' + v + ' input');
    for (let i = 0; i < children.length; i++) {
        children[i].addEventListener('change', function () {
            validateSingleChild(this);
        });
        children[i].addEventListener('blur', function () {
            validateSingleChild(this);
        });
    }
}

function validateSingleChild(c){
    let valid = c.checkValidity();
    if(valid){
        c.classList.remove('is-invalid');
        c.classList.add('is-valid');
        let valErr = c.parentNode.querySelector('valerr');
        if(valErr){
            valErr.remove();
        }
    }else{
        c.classList.remove('is-valid');
        c.classList.add('is-invalid');
        c.insertAdjacentHTML("afterend", `<valerr style='color:red'>${c.validationMessage}</valerr>`)
    }
}

function validateInputs(v) {
    let inputs = document.querySelectorAll('.' + v + ' input');
    if (inputs.length > 0) {
        document.querySelectorAll("valerr").forEach(e=>e.remove())
        for (let i of inputs) {
            if (i.validationMessage) {
                i.classList.add('is-invalid');
                i.insertAdjacentHTML("afterend", `<valerr style='color:red'>${i.validationMessage}</valerr>`)
            } else {
                if (i.classList.toString().includes('is-invalid')) {
                    i.classList.add("is-valid")
                }
                i.classList.remove('is-invalid');
            }
        }
    }
}
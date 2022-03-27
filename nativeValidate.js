function listenForValidation(classToValidate) {
    let children = document.querySelectorAll('.' + classToValidate + ' input');
    for (let i = 0; i < children.length; i++) {
        children[i].addEventListener('change', function () {
            validateSingleChild(this);
        });
        children[i].addEventListener('blur', function () {
            validateSingleChild(this);
        });
    }
}

function validateSingleChild(classToValidate){
    let valid = classToValidate.checkValidity();
    if(valid){
        classToValidate.classList.remove('is-invalid');
        classToValidate.classList.add('is-valid');
        let valErr = classToValidate.parentNode.querySelector('valerr');
        if(valErr){
            valErr.remove();
        }
    }else{
        classToValidate.classList.remove('is-valid');
        classToValidate.classList.add('is-invalid');
        classToValidate.insertAdjacentHTML("afterend", `<valerr style='color:red'>${classToValidate.validationMessage}</valerr>`)
    }
}

function validateInputs(classToValidate) {
    return new Promise((resolve,reject)=>{
        let inputs = document.querySelectorAll('.' + classToValidate + ' input');
        if (inputs.length > 0) {
            document.querySelectorAll("valerr").forEach(e=>e.remove())
            let errorCount=0
            for (let i of inputs) {
                if (i.validationMessage) {
                    i.classList.add('is-invalid');
                    i.insertAdjacentHTML("afterend", `<valerr style='color:red'>${i.validationMessage}</valerr>`)
                    errorCount++
                } else {
                    if (i.classList.toString().includes('is-invalid')) {
                        i.classList.add("is-valid")
                    }
                    i.classList.remove('is-invalid');
                }
            }
            if(errorCount>0){
                reject(errorCount)
            }else{
                resolve(true)
            }
        }else{
            resolve(true);
        }
    })
}
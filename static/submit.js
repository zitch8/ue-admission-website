document.addEventListener("DOMContentLoaded", () =>{
    var profile = localStorage.getItem('file-input-pic');
    console.log('profile', profile);
    var firstName = localStorage.getItem('firstName');
    var middleName = localStorage.getItem('middleName');
    var lastName = localStorage.getItem('lastName');
    var program = localStorage.getItem('course');
    var campus = localStorage.getItem('schoolSearch');
    var classS = localStorage.getItem('');
    var email = localStorage.getItem('email');
    var examination = localStorage.getItem('tba');
    
    const blob = new Blob([profile], {type: profile.type})
    console.log(profile, firstName, middleName, lastName, program, campus, classS, email, examination);
    const prof = document.getElementById('profile')
    prof.src = URL.createObjectURL(blob)
    // imageReader(prof, blob);

    const fn = document.getElementById("firstName");
    inputText(fn, firstName);

    const mn = document.getElementById("middleName");
    inputText(mn, middleName);

    const ln = document.getElementById('lastName');
    inputText(ln, lastName);

    const p = document.getElementById('program');
    inputText(p, program);

    const camp = document.getElementById('campus');
    inputText(camp, campus);

    const clas = document.getElementById('class');
    inputText(clas, classS);

    const em = document.getElementById('email');
    inputText(em, email);

    const ex = document.getElementById('examDate');
    inputText(ex, examination);

})
function imageReader(inputId, inputValue){
    const reader = new FileReader();
    reader.onload = () => {
        inputId.src = reader.result;
    }
    reader.readAsDataURL(inputValue);
}
function inputText(inputId, inputValue){
    if (inputId){
        inputId.disabled = false;
        inputId.value = inputValue || "";
        inputId.disabled = true;
    }
}

function validateInputs(){
    return true
}
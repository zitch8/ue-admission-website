function fillSchoolDetails(school) {
    if (school === 'manila') {
        // Fill details for University of the East - Manila
        document.getElementById('schoolAddress').value = "Recto Avenue, Manila, Philippines";
        document.getElementById('schoolType').value = "private";
        document.getElementById('schoolCode').value = "12345";
    } else if (school === 'caloocan') {
        // Fill details for University of the East - Caloocan
        document.getElementById('schoolAddress').value = "Caloocan City, Philippines";
        document.getElementById('schoolType').value = "private";
        document.getElementById('schoolCode').value = "67890";
    }

    // Disable the fields to prevent changes
    document.getElementById('schoolAddress').disabled = true;
    document.getElementById('schoolType').disabled = true;
    document.getElementById('schoolCode').disabled = true;
}

function school() {
    var schoolName = document.getElementById("schoolSearch").value;

    if (schoolName == "ust") {
        document.getElementById('schoolAddress').value = "España Blvd, Sampaloc, Manila, 1008 Metro Manila";
        document.getElementById('schoolType').value = "private";
        document.getElementById('schoolCode').value = "482072";
        disable();
    }
    else if (schoolName == "feu") {
        document.getElementById('schoolAddress').value = "Nicanor Reyes Sr, Street, Sampaloc, Manila, 1008 Metro Manila";
        document.getElementById('schoolType').value = "private";
        document.getElementById('schoolCode').value = "401168";
        disable();
    }
    else if (schoolName == "au") {
        document.getElementById('schoolAddress').value = "2600 Legarda St., Sampaloc, Manila, 1008 Metro Manila";
        document.getElementById('schoolType').value = "private";
        document.getElementById('schoolCode').value = "487518";
        disable();
    }
    else if (schoolName == "ceu") {
        document.getElementById('schoolAddress').value = "9 Mendiola St, San Miguel, Manila, 1008 Metro Manila";
        document.getElementById('schoolType').value = "private";
        document.getElementById('schoolCode').value = "401059";
        disable();
    }
    else if (schoolName == "nu") {
        document.getElementById('schoolAddress').value = "551 F Jhocson St, Sampaloc, Manila, 1008 Metro Manila";
        document.getElementById('schoolType').value = "private";
        document.getElementById('schoolCode').value = "406341";
        disable();
    }
    else if (schoolName == "beda") {
        document.getElementById('schoolAddress').value = "638 Mendiola St, San Miguel, Manila, 1005 Metro Manila";
        document.getElementById('schoolType').value = "private";
        document.getElementById('schoolCode').value = "428563";
        disable();
    }
    else if (schoolName == "tip") {
        document.getElementById('schoolAddress').value = "363 Casal St, Quiapo, Manila, 1001 Metro Manila";
        document.getElementById('schoolType').value = "private";
        document.getElementById('schoolCode').value = "401323";
        disable();
    }
    else if (schoolName == "um") {
        document.getElementById('schoolAddress').value = "546 Delos Santos St, 403, Manila, 1008 Metro Manila";
        document.getElementById('schoolType').value = "private";
        document.getElementById('schoolCode').value = "424285";
        disable();
    }
    else if (schoolName == "baste") {
        document.getElementById('schoolAddress').value = "Recto Ave, Quiapo, Manila, 1001 Metro Manila";
        document.getElementById('schoolType').value = "private";
        document.getElementById('schoolCode').value = "406311";
        disable();
    }
    else if (schoolName == "pup") {
        document.getElementById('schoolAddress').value = "1016 Anonas, Sta. Mesa, Maynila, Kalakhang Maynila";
        document.getElementById('schoolType').value = "public";
        document.getElementById('schoolCode').value = "600212";
        disable();
    }
}

// Function to clear all school details when "Others" is selected
function clearSchoolDetails() {
    // Clear the input fields
    document.getElementById('schoolAddress').value = "";
    document.getElementById('schoolType').value = "";
    document.getElementById('schoolCode').value = "";

    // Enable the fields so the user can fill them out manually
    document.getElementById('schoolAddress').disabled = false;
    document.getElementById('schoolType').disabled = false;
    document.getElementById('schoolCode').disabled = false;
}

function disable() {
    document.getElementById('schoolAddress').disabled = true;
    document.getElementById('schoolType').disabled = true;
    document.getElementById('schoolCode').disabled = true;
}

function validateInputs() {
    let isValid = true;
    clearErrors();

    // Validate the Grade 12 graduate radio buttons
    if (!document.querySelector('input[name="gradStatus"]:checked')) {
        
        showError("g12error","Please select whether you are a Grade 12 graduate or expecting to graduate.");
        isValid = false;
    }

    // Validate School Address, Type of School, School Code, and Year Graduated
    const schoolSearch = document.getElementById('schoolSearch');
    const schoolAddress = document.getElementById('schoolAddress');
    const schoolType = document.getElementById('schoolType');
    const schoolCode = document.getElementById('schoolCode');
    const yearGraduated = document.getElementById('yearGraduated');
    
    //
    const numRegEx = /^[0-9]+$/;
    const currentYear = new Date().getFullYear();

    // Add red borders for invalid fields
    if (schoolSearch.value === ""){
        schoolSearch.classList.add('border-red');
        
        showError("schoolError", "This field is required.")
        isValid = false;
    } else{
        schoolSearch.classList.remove("border-red");
    }

    if (schoolAddress.disabled === false && schoolAddress.value === "") {
        schoolAddress.classList.add('border-red');
        
        showError("schoolAdError", "This field is required.")
        isValid = false;
    } else {
        schoolAddress.classList.remove('border-red');
    }

    if (schoolType.disabled === false && schoolType.value === "") {
        schoolType.classList.add('border-red');
        
        showError("schoolTypeError", "This field is required.");
        isValid = false;
    } else {
        schoolType.classList.remove('border-red');
    }

    if (schoolCode.disabled === false && schoolCode.value === "") {
        schoolCode.classList.add('border-red');
        
        showError('schoolCodeError', "This field is required.");
        isValid = false;
    } else if (schoolCode.disabled === false && !numRegEx.test(schoolCode.value)){
        schoolCode.classList.add('border-red');
        
        showError('schoolCodeError', 'Please enter numeric values only.');
        isValid = false;
    } else {
        schoolCode.classList.remove('border-red');
    }

    if (yearGraduated.value.trim() === "") {
        yearGraduated.classList.add('border-red');
        showError('yearGradError', 'This field is required.');
        isValid = false;
    } else if (!numRegEx.test(yearGraduated.value)){
        yearGraduated.classList.add('border-red');
        showError('yearGradError', 'Please enter numeric values only.');
        isValid = false;
    } else if (yearGraduated.value < 1900 || yearGraduated.value > currentYear){
        yearGraduated.classList.add('border-red');
        showError('yearGradError', 'Year must be in range 1920 to current year.');
        isValid = false;
    } else {
        yearGraduated.classList.remove('border-red');
    }

    // If validation passes, proceed to next
    if (isValid) {
        alert("Form validated successfully!");
        // You can submit the form or navigate to the next page here
    }
}

function showError(elementId, message){
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
    const inputElemet = document.getElementById(elementId.replace("Error", ""));
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(el => el.innerText = "");
    document.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));
}
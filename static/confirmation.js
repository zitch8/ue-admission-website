function validateInputs() {
    var dateandtime = document.getElementById("dateandtime").value;
    var antiSpam = document.getElementById("antiSpam").value.toLowerCase();
    var dateandtimecontainer = document.getElementById("dateandtime");

    dateandtimecontainer.classList.remove('border-red');

    if (!dateandtime) {
        alert("Please select an examination date and time.");
        dateandtimecontainer.classList.add('border-red');
        return false;
    }

    // Check if the anti-spam input matches the expected value
    if (antiSpam !== "tm3xcz") {
        alert("The characters you typed are incorrect. Please try again.");
        return false; // Prevent form submission
    }
    localStorage.setItem('tba', dateandtime.value);
    return true;
}

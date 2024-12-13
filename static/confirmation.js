function validateInputs() {
    var dateandtime = document.getElementById("dateandtime").value;
    var antiSpam = document.getElementById("antiSpam").value.toLowerCase();
    var dateandtimecontainer = document.getElementById("dateandtime");

    dateandtimecontainer.style.border = "";

    if (!dateandtime) {
        alert("Please select an examination date and time.");
        dateandtimecontainer.style.border = "1px solid red";
        return false;
    }

    // Check if the anti-spam input matches the expected value
    if (antiSpam !== "tm3xcz") {
        alert("The characters you typed are incorrect. Please try again.");
        return false; // Prevent form submission
    }

    alert("Form validated successfully!");
    return true;
}

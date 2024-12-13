// Pages Array
const pages = [
    "applicant-information.html",
    "contact-information.html",
    "previous-school.html",
    "confirmation.html",
    "submit.html"
];

// Retrieve currentPageIndex from local storage or initialize to 0
let currentPageIndex = parseInt(localStorage.getItem("currentPageIndex")) || 0;

// Function to save currentPageIndex to local storage
function saveCurrentPageIndex(index) {
    localStorage.setItem("currentPageIndex", index);
}

// Function to navigate to a specific page
function navigateToPage(targetIndex) {
    const currentPage = pages[currentPageIndex];
    const targetPage = pages[targetIndex];

    // Check for skipped pages
    if (targetIndex > currentPageIndex + 1) {
        alert("You cannot skip intermediate pages.");
        return;
    }

    // Navigate to the target page
    currentPageIndex = targetIndex;
    saveCurrentPageIndex(currentPageIndex); // Save the updated index
    window.location.href = targetPage;

    // Add .bg-check class
    document.body.classList.add("bg-check");
}

// Function to validate the current page
function validatePage(page) {
    // Add your page-specific validation logic here
    if (page === "applicant-information.html") {
        const input = document.querySelector("#requiredField");
        return input && input.value.trim() !== "";
    }
    return true;
}

document.querySelectorAll('.link').forEach(anchor => {
    anchor.addEventListener('click', (event) => {
        event.preventDefault();
        const targetIndex = parseInt(event.target.dataset.target) - 1;
        navigateToPage(targetIndex);
    });
});

// Load the current page index from local storage and redirect if necessary
document.addEventListener("DOMContentLoaded", () => {
    const savedIndex = parseInt(localStorage.getItem("currentPageIndex"));
    if (!isNaN(savedIndex) && savedIndex !== currentPageIndex) {
        window.location.href = pages[savedIndex];
    }
});

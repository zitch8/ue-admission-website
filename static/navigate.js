// Function to save currentPageIndex to local storage
let currentPageIndex;
let pages;
let completedPages;

function saveCurrentPageIndex(index) {
    localStorage.setItem("currentPageIndex", index);
}

function saveCompletedPages(completedPages) {
    localStorage.setItem("completedPages", JSON.stringify(completedPages));
}

// Function to navigate to a specific page
function navigateToPage(targetIndex) {
    const targetPage = pages[targetIndex];
    console.log('asdf', completedPages);
    
    if (completedPages.includes(targetIndex) || targetIndex === currentPageIndex + 1) {
        currentPageIndex = targetIndex;
        saveCurrentPageIndex(currentPageIndex);
        console.log('targetPage', targetPage);
        window.location.href = targetPage;
        return
    }
    console.log('targetPage', targetPage);

    console.log("current", currentPageIndex);

    // Add .bg-check class
    document.classList.add("bg-check");
}

function markPageAsCompleted(index) {
    let completedPages = JSON.parse(localStorage.getItem("completedPages"));
    if (!completedPages.includes(index)) {
        completedPages.push(index);
        saveCompletedPages(completedPages);
    }
};

function removePageFromCompleted(index) {
    alert('Please complete the forms first.');
    let completedPages = JSON.parse(localStorage.getItem("completedPages"));
    if (completedPages.includes(index)){
        completedPages = completedPages.filter(pageIndex => pageIndex !== index)
        saveCompletedPages(completedPages);
    }
}

// Load the current page index from local storage and redirect if necessary
document.addEventListener("DOMContentLoaded", () => {
    
    pages = JSON.parse(localStorage.getItem('pages'));
        if (!pages) {
        pages = [
            "applicant-information.html",
            "contact-information.html",
            "previous-school.html",
            "confirmation.html",
            "submit.html"
        ];
        localStorage.setItem('pages', JSON.stringify(pages));   
    }

    currentPageIndex = parseInt(localStorage.getItem("currentPageIndex"));
    console.log("current index", currentPageIndex);
    if (isNaN(currentPageIndex)) {
        currentPageIndex = 0;
        localStorage.setItem("currentPageIndex", currentPageIndex);
    }

    completedPages = JSON.parse(localStorage.getItem("completedPages"));
    if (!completedPages) {
        completedPages = [];
        localStorage.setItem('completedPages', JSON.stringify(completedPages));
    }
                        
    document.querySelectorAll('.link').forEach(anchor => {
        anchor.addEventListener('click', (event) => {
            event.preventDefault();

            if (validateInputs()) {
                console.log('Target Index:', parseInt(event.currentTarget.dataset.target) - 1);
                const targetIndex = parseInt(event.currentTarget.dataset.target) - 1;
                markPageAsCompleted(currentPageIndex);
                console.log("anv", currentPageIndex);
                navigateToPage(targetIndex);
            } else {
                console.log("Validation failed. Fix the inputs before proceeding.");
                removePageFromCompleted(currentPageIndex);

            }
        });
    });

    document.getElementById('next').addEventListener('click', (event) => {
        event.preventDefault();
    
        if (validateInputs()) {
            console.log("All inputs valid. Proceeding to next page...");
            console.log(currentPageIndex);
            markPageAsCompleted(currentPageIndex);
    
            if (currentPageIndex < pages.length - 1) {
                navigateToPage(currentPageIndex + 1);
            } else {
                console.log("This is the last page.");
            }
        } else {
            console.log("Validation failed. Please correct the errors.");
            removePageFromCompleted(currentPageIndex);
        }
      });
    
});

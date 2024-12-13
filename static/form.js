// Function to validate input fields

function validateInputs() {
  // Select all input and select elements
  const fields = document.querySelectorAll('input, select, .drop-zone, .drop-zone-file');

  fields.forEach(field => {
      const errorSpan = field.nextElementSibling;
      if (errorSpan && errorSpan.id === 'input-error') {
        
        // For Drag Drop Input
          if (field.classList.contains('drop-zone') || field.classList.contains('drop-zone-file')){
            const fileInput = field.querySelector('input[type="file"]');
            console.log('fileInput', fileInput);
            if (!fileInput || fileInput.files.length === 0){
              
              errorSpan.textContent = 'Please upload a file.';
              field.classList.add('border-red');
            } else {
              console.log('fileInputLength', fileInput.files.length)
              errorSpan.textContent = '';
              field.classList.remove('border-red');
            }
          } else if (field.value.trim() === '' && field.id !== 'notRequired') {
              errorSpan.textContent = 'This field is required.';
              field.classList.add('border-red');
          }
          /* place else if here for other input validation (ex. email regex and etc. */ 
          else {
              errorSpan.textContent = '';
              field.classList.remove('border-red');
          }
      } else {
        console.log("test", field, "errrorspan", errorSpan);
      };
  });
}


// Handle Drop Zone Setup
function initializeDropZone(dropZone) {
  const fileInput = dropZone.querySelector(".file-input");
  const previewContainer = dropZone.querySelector(".preview-container");
  const previewImage = dropZone.querySelector(".preview-image");
  const placeholderText = dropZone.querySelector(".placeholder-text");
  const closeBtn = dropZone.querySelector(".close");
  const previewText = dropZone.querySelector(".preview-text");
  // Drag-and-Drop Events
  dropZone.addEventListener("dragover", (event) => {
    if (!dropZone.classList.contains("disabled")) {
        event.preventDefault();
        dropZone.classList.add("bg-light");
    }
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("bg-light");
  });

  dropZone.addEventListener("drop", (event) => {
    if (!dropZone.classList.contains("disabled")) {
        event.preventDefault();
        dropZone.classList.remove("bg-light");
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith("image/") && dropZone.id === 'drop-zone') {
          console.log('it is drop image')  
          handleFileUpload(file, previewImage, previewText,placeholderText, previewContainer, dropZone);
        } else if(file && (file.type.startsWith("image/") ||
          file.name.endsWith(".doc") ||
          file.name.endsWith(".docx")||
          file.name.endsWith(".pdf")) &&
          dropZone.id == 'drop-zone-file'){
            console.log('it is drop file')
            handleFileUpload(file, previewImage, previewText, placeholderText, previewContainer, dropZone)
        } else {
            alert("Please drop a valid image file!");
        }
    }
  });

  // File Input Click Trigger
  dropZone.addEventListener("click", (event) => {
      if (!dropZone.classList.contains("disabled") && event.target !== closeBtn) {
          fileInput.click();
      }
  });

  // File Input Change Event
  fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (file && file.type.startsWith("image/") && dropZone.id === 'drop-zone') {
        console.log('it is drop image')  
        handleFileUpload(file, previewImage, previewText,placeholderText, previewContainer, dropZone);
      } else if(file && (file.type.startsWith("image/") ||
        file.name.endsWith(".doc") ||
        file.name.endsWith(".docx")||
        file.name.endsWith(".pdf")) &&
        dropZone.id == 'drop-zone-file'){
          console.log('it is drop file')
          handleFileUpload(file, previewImage, previewText, placeholderText, previewContainer, dropZone)
      } else {
          alert("Please drop a valid image file!");
      }
  });

  // Close Button Click Event
  closeBtn.addEventListener("click", () => {
      resetDropZone(dropZone, previewImage, previewText, placeholderText, previewContainer, fileInput);
  });
}

// Handle File Upload
function handleFileUpload(file, previewImage, previewText, placeholderText, previewContainer, dropZone) {
  if (file.type.startsWith("image/")){
    console.log('dropfile')
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.src = reader.result;
      placeholderText.style.display = "none";
      previewContainer.style.display = "flex";
      dropZone.classList.add("disabled");
      
    };
    reader.readAsDataURL(file);
  } else {
    console.log('previewImage', file)
    previewImage.src = "../media/file.svg"
    previewImage.classList.add("icon")
    placeholderText.style.display = "none";
    previewContainer.style.display = "flex";
    dropZone.classList.add("disabled");
    previewText.textContent = file.name;
  }
}

// Reset Drop Zone
function resetDropZone(dropZone, previewImage, previewText, placeholderText, previewContainer, fileInput) {
  previewImage.src = "";
  placeholderText.style.display = "block";
  previewContainer.style.display = "none";
  previewImage.classList.remove("icon");
  dropZone.classList.remove("disabled");
  fileInput.value = "";
  previewText.textContent = "";
}

const dropzoneContainer = document.getElementById('drop-container');
const addDropzoneBtn = document.getElementById('add-drop-zone')

// DROP ZONE CREATE
function createDropZone() {
  const dropZoneWrapper = document.createElement('div');
  dropZoneWrapper.classList.add('image-search-container', 'col-6', 'me-1', 'mb-3');
  dropZoneWrapper.style.width = '175px';
  dropZoneWrapper.innerHTML = `
    <button id="close-btn-grade" class="close-btn-grade ms-auto mb-2 p-1" type="button">&times;</button>
    <div id="drop-zone-file" class="drop-zone dotted-border p-3 d-flex flex-column align-items-center justify-content-center">
        
        <div id="placeholder-text" class="placeholder-text">
            <i class="fas fa-solid fa-file"></i>
            <p class="text-muted mb-0">
                Drag and drop your files here or <span class="text-primary">Click to upload</span>
            </p>
        </div>
    
        <div id="preview-container" class="preview-container">
            <img id="preview-image" class="preview-image" alt="Preview of 2x2 Image"/>
            <p id="preview-file-name" class="preview-text"></p>
            <button id="close-btn" class="close btn btn-outline-danger" type="button">Remove</button>
        </div>
        <input type="file" id="file-input" class="file-input" style="display: none;" accept="image/*, .pdf, .doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
    </div>
    <span id="input-error" class="mt-2"></span>
  `;

  // Add the new drop zone to the container
  dropzoneContainer.insertBefore(dropZoneWrapper, addDropzoneBtn.parentNode);
  initializeDropZone(dropZoneWrapper.querySelector('.drop-zone'));

  // Add event listener for the close button
  const closeBtn = dropZoneWrapper.querySelector('.close-btn-grade');
  closeBtn.addEventListener('click', () => dropZoneWrapper.remove());
}


// Initialize all drop zones
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll("div.drop-zone").forEach((dropzone) => initializeDropZone(dropzone));

});
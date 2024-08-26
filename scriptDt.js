// // $(document).ready(function() {
// //   $("#menu-toggle").click(function(e) {
// //       e.preventDefault();
// //       $("#wrapper").toggleClass("toggled");
// //   });

// //   $('#loginForm').submit(function(e) {
// //       e.preventDefault();
// //       window.location.href = "home.html";
// //   });

// //   $('#getStartedBtn').click(function() {
// //       window.location.href = "document_translator.html";
// //   });
// // });

// // // Drag and Drop
// // document.addEventListener('DOMContentLoaded', function () {
// //   const dropZone = document.getElementById('drop-zone');
// //   const fileInput = document.getElementById('documentUpload');
// //   const fileNameDisplay = document.getElementById('fileNameDisplay');
// //   const fileInfoWrapper = document.getElementById('file-info-wrapper');

// //   fileInput.addEventListener('change', handleFileUpload);

// //   dropZone.addEventListener('dragover', function (e) {
// //       e.preventDefault();
// //       e.stopPropagation();
// //       dropZone.classList.add('dragover');
// //   });

// //   dropZone.addEventListener('dragleave', function (e) {
// //       e.preventDefault();
// //       e.stopPropagation();
// //       dropZone.classList.remove('dragover');
// //   });

// //   dropZone.addEventListener('drop', function (e) {
// //       e.preventDefault();
// //       e.stopPropagation();
// //       dropZone.classList.remove('dragover');

// //       const files = e.dataTransfer.files;
// //       if (files.length > 0) {
// //           fileInput.files = files;
// //           handleFileUpload();
// //       }
// //   });

// //   function handleFileUpload() {
// //       const file = fileInput.files[0];
// //       if (file) {
// //           fileInfoWrapper.style.display = 'block';
// //           const fileLink = document.createElement('a');
// //           fileLink.href = URL.createObjectURL(file);
// //           fileLink.textContent = file.name;
// //           fileLink.target = '_blank';
// //           fileNameDisplay.innerHTML = '';
// //           fileNameDisplay.appendChild(fileLink);
// //           fileInput.disabled = true;
// //       }
// //   }
// // });

// // // Dropdown
// // (function($) {
// //   var CheckboxDropdown = function(el) {
// //     var _this = this;
// //     this.isOpen = false;
// //     this.areAllChecked = false;
// //     this.$el = $(el);
// //     this.$label = this.$el.find('.dropdown-label');
// //     this.$checkAll = this.$el.find('[data-toggle="check-all"]').first();
// //     this.$inputs = this.$el.find('[type="checkbox"]');
    
// //     this.onCheckBox();
    
// //     this.$label.on('click', function(e) {
// //       e.preventDefault();
// //       _this.toggleOpen();
// //     });
    
// //     this.$checkAll.on('click', function(e) {
// //       e.preventDefault();
// //       _this.onCheckAll();
// //     });
    
// //     this.$inputs.on('change', function(e) {
// //       _this.onCheckBox();
// //     });
// //   };
  
// //   CheckboxDropdown.prototype.onCheckBox = function() {
// //     this.updateStatus();
// //   };
  
// //   CheckboxDropdown.prototype.updateStatus = function() {
// //     var checked = this.$el.find(':checked');
// //     var selectedText = [];

// //     this.areAllChecked = false;
// //     this.$checkAll.html('Check All');
    
// //     if(checked.length <= 0) {
// //       this.$label.html('Select Languages');
// //     }
// //     else if(checked.length === this.$inputs.length) {
// //       this.$label.html('All Selected');
// //       this.areAllChecked = true;
// //       this.$checkAll.html('Uncheck All');
// //     }
// //     else {
// //       checked.each(function() {
// //         selectedText.push($(this).parent('label').text().trim());
// //       });
// //       this.$label.html(selectedText.join(', '));
// //     }
// //   };
  
// //   CheckboxDropdown.prototype.onCheckAll = function(checkAll) {
// //     if(!this.areAllChecked || checkAll) {
// //       this.areAllChecked = true;
// //       this.$checkAll.html('Uncheck All');
// //       this.$inputs.prop('checked', true);
// //     }
// //     else {
// //       this.areAllChecked = false;
// //       this.$checkAll.html('Check All');
// //       this.$inputs.prop('checked', false);
// //     }
    
// //     this.updateStatus();
// //   };
  
// //   CheckboxDropdown.prototype.toggleOpen = function(forceOpen) {
// //     var _this = this;
    
// //     if(!this.isOpen || forceOpen) {
// //        this.isOpen = true;
// //        this.$el.addClass('on');
// //       $(document).on('click', function(e) {
// //         if(!$(e.target).closest('[data-control]').length) {
// //          _this.toggleOpen();
// //         }
// //       });
// //     }
// //     else {
// //       this.isOpen = false;
// //       this.$el.removeClass('on');
// //       $(document).off('click');
// //     }
// //   };
  
// //   var checkboxesDropdowns = document.querySelectorAll('[data-control="checkbox-dropdown"]');
// //   for(var i = 0, length = checkboxesDropdowns.length; i < length; i++) {
// //     new CheckboxDropdown(checkboxesDropdowns[i]);
// //   }
// // })(jQuery);

// // // Translation Validation
// // function validateTranslation() {
// //     const fileInput = document.getElementById('documentUpload');
// //     const targetLanguages = document.querySelectorAll('input[name="dropdown-group"]:checked');

// //     if (!fileInput.files.length) {
// //         alert('Please upload a document before starting the translation.');
// //         return false;
// //     }

// //     if (targetLanguages.length === 0) {
// //         alert('Please select at least one target language.');
// //         return false;
// //     }

// //     return true;
// // }

// function startProgress() {
//   if (!validateTranslation()) {
//       return;
//   }

//   let progressBar = document.querySelector(".circular-progress");
//   let valueContainer = document.querySelector(".value-container");
//   let tickImg = document.querySelector(".tick-img");
//   let translatedDocuments = document.getElementById('translatedDocuments');

//   let progressValue = 0;
//   let progressEndValue = 100;
//   let duration = 120000; // 2 minutes in milliseconds
//   let intervalTime = 100; // Update every 100 milliseconds

//   let totalUpdates = duration / intervalTime;
//   let increment = progressEndValue / totalUpdates;

//   clearInterval(window.progress);

//   let submitButton = document.querySelector(".submitbutton");
//   submitButton.disabled = true;

//   translatedDocuments.style.display = 'none'; // Hide the translated documents section until translation is complete

//   window.progress = setInterval(() => {
//       progressValue += increment;
//       if (progressValue >= progressEndValue) {
//           progressValue = progressEndValue;
//           clearInterval(window.progress);
//           progressBar.style.display = 'none';
//           tickImg.style.display = 'block';

//           displayTranslatedDocuments(); // Display translated documents after completion
//       }
//       valueContainer.textContent = `${Math.round(progressValue)}%`;
//       progressBar.style.background = `conic-gradient(
//           #f7d035 ${progressValue * 3.6}deg,
//           #f7f7f7 ${progressValue * 3.6}deg
//       )`;
//   }, intervalTime);
// }

// // function displayTranslatedDocuments() {
// //   const targetLanguages = document.querySelectorAll('input[name="dropdown-group"]:checked');
// //   const fileInput = document.getElementById('documentUpload');
// //   const translatedDocuments = document.getElementById('translatedDocuments');

// //   translatedDocuments.innerHTML = ''; // Clear previous content

// //   const uploadedFileName = fileInput.files[0].name;
// //   const fileExtension = uploadedFileName.split('.').pop();
// //   const fileNameWithoutExtension = uploadedFileName.replace(`.${fileExtension}`, '');

// //   targetLanguages.forEach(language => {
// //       const languageCode = getLanguageCode(language.value);
// //       const translatedFileName = `${fileNameWithoutExtension}_${languageCode}.${fileExtension}`;
      
// //       const fileLink = document.createElement('a');
// //       fileLink.href = `path/to/translated/files/${translatedFileName}`;
// //       fileLink.textContent = translatedFileName;
// //       fileLink.target = '_blank';
// //       fileLink.classList.add('d-block', 'mb-2', 'translated-file-link'); // Styling

// //       translatedDocuments.appendChild(fileLink);
// //   });

// //   // Determine singular or plural text based on the number of documents
// //   const isSingleDocument = targetLanguages.length === 1;
// //   const translatedText = isSingleDocument ? 'Translated Document' : 'Translated Documents';
// //   const readyMessageText = isSingleDocument ? 'Your translated document is ready.' : 'Your translated documents are ready.';

// //   // Add the translated text and ready message
// //   const title = document.createElement('div');
// //   title.className = 'translated-title';
// //   title.textContent = translatedText;

// //   const readyMessage = document.createElement('div');
// //   readyMessage.className = 'ready-msg';
// //   readyMessage.textContent = readyMessageText;

// //   translatedDocuments.insertBefore(title, translatedDocuments.firstChild);
// //   translatedDocuments.appendChild(readyMessage);

// //   // Show the translated documents section with padding
// //   translatedDocuments.style.display = 'block';
// //   translatedDocuments.style.padding = '20px';
// //   translatedDocuments.style.borderRadius = '8px';
// //   translatedDocuments.style.backgroundColor = '#f8f9fa';
// //   translatedDocuments.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
// // }

// // function getLanguageCode(language) {
// //   const languageCodes = {
// //       'German': 'ge',
// //       'French': 'fr',
// //       'Spanish': 'sp',
// //       'Dutch': 'dt',
// //       'Mandarin': 'mand',
// //       'Tamil': 'ta',
// //       // Add more languages and their codes here if needed
// //   };
// //   return languageCodes[language] || 'en';
// // }



// // //starred

// // //logout

// // function toggleDropdown() {
// //   const dropdown = document.getElementById("profileDropdown");
// //   dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
// // }

// // // // Optional: Close the dropdown if clicked outside
// // // window.onclick = function(event) {
// // //   const dropdown = document.getElementById("profileDropdown");
// // //   if (!event.target.matches('#profileLink') && dropdown.style.display === "block") {
// // //       dropdown.style.display = "none";
// // //   }
// // // };



// // function logout() {
// //   // Your logout logic here
// //   // alert("Logging out...");
// //   window.location.href = "login.html"; // Replace with your actual logout URL
// // }
var categoryselect = document.querySelector('.category')

async function loadCategories(){
          try {
            var dropdownOptions = []
                const response = await fetch('https://x21e74ohc3.execute-api.us-east-1.amazonaws.com/dev/categories');
          
                if (!response.ok) {
                  throw new Error(`API request failed with status ${response.status}`);
                }
          
                const { body } = await response.json();
                dropdownOptions = JSON.parse(body);
                // console.log("hey!", dropdownOptions);
                const option_var = document.getElementById('dropdownmenu');
                // const values = ["a", "b,", "c", "d"];
                // document.getElementById('dropdownmenu').options[0].text = dropdownOptions[0];
                dropdownOptions.forEach(opt=>{
                  dropdownmenu.add(new Option(opt, opt)); 
                })
              } catch (error) {
                console.error('API Error:', error);
              }

}
//DON'T REMOVE ANY COMMENTED LINES TILL WE FINISH OUR PROJECT!!!
handleDropDownMenu = (params) => {
  // console.log("vivek", params);
  //use fetch(URL, {method:"POST", body:{}})
  //create another function which gets table value and change accordingly
}


window.onload = loadCategories




// // Ensure dropdownOptions is declared only once
// if (!window.dropdownOptions) {
//     window.dropdownOptions = [];
  
//     async function fetchOptionsFromApi() {
//       try {
//         const response = await fetch('https://x21e74ohc3.execute-api.us-east-1.amazonaws.com/dev/categories', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Methods': 'GET',
//           },
//         });
  
//         if (!response.ok) {
//           throw new Error(`API request failed with status ${response.status}`);
//         }
  
//         const { body } = await response.json();
//         window.dropdownOptions = JSON.parse(body);
  
//         // Dispatch an event when options are ready
//         const optionsReadyEvent = new Event('optionsReady');
//         document.dispatchEvent(optionsReadyEvent);
//       } catch (error) {
//         console.error('API Error:', error);
//       }
//     }
  
//     document.addEventListener('DOMContentLoaded', () => {
//       // Fetch options when the DOM is loaded
//       fetchOptionsFromApi();
  
//       // Event listener for options ready
//       document.addEventListener('optionsReady', () => {
//         // Access dropdownOptions
//         const dropdownOptions = window.dropdownOptions;
  
//         // Get reference to the dropdown element
//         const dropdown = document.getElementById('dropdown');
  
//         // Check if dropdown is defined before populating
//         if (dropdown) {
//           // Populate dropdown with options
//           dropdownOptions.forEach(option => {
//             const optionElement = document.createElement('option');
//             optionElement.value = option.value;
//             optionElement.textContent = option.label;
//             dropdown.appendChild(optionElement);
//           });
//         } else {
//           console.error('Dropdown element not found.');
//         }
//       });
  
//       // Event listener for dropdown click
//       function handleDropdownClick() {
//         console.log('Dropdown options:', window.dropdownOptions);
//         // Do something with the options, e.g., update UI
//       }
  
//       // Assuming you have a dropdown element with id 'dropdown'
//       const dropdown = document.getElementById('dropdown');
//       if (dropdown) {
//         dropdown.addEventListener('click', handleDropdownClick);
//       } else {
//         console.error('Dropdown element not found.');
//       }
//     });
//   } else {
//     console.error('dropdownOptions is already declared.');
//   }
  
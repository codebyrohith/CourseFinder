var categoryselect = document.querySelector('.category')
const itemsPerPage = 10; // Number of items to display per page
let currentPage = 1;
var data = [];

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
  console.log("vivek", params);
  //use fetch(URL, {method:"POST", body:{}})
  getDataBasedOnCategory(params);
  //create another function which gets table value and change accordingly

}

async function getDataBasedOnCategory(category){
  if(category === 'IT & Software'){
    category = "IT%20%26%20Software";
  }else{
    category = category;
  }
  try {
        const response = await fetch('https://x21e74ohc3.execute-api.us-east-1.amazonaws.com/dev/data?category='+category);
  
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
  
        data = await response.json();
        console.log("data", data);
        // const option_var = document.getElementById('dropdownmenu');
        // // const values = ["a", "b,", "c", "d"];
        // // document.getElementById('dropdownmenu').options[0].text = dropdownOptions[0];
        // dropdownOptions.forEach(opt=>{
        //   dropdownmenu.add(new Option(opt, opt)); 
        // })
        const totalPages = Math.ceil(data.length / itemsPerPage);
        updateTable(data, currentPage, itemsPerPage);
        setupPagination(totalPages, category)
        // updatePagination();
      } catch (error) {
        console.error('API Error:', error);
      }
}

function updateTable(data,page,perPage) {
  const tableBody = document.querySelector('#data-table tbody');
  tableBody.innerHTML = '';

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const pageData = data.slice(startIndex, endIndex);
  pageData.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${item.id}</td><td>${item.title}</td><td>${item.instructor}</td><td>${item.num_subs}</td><td>${item.avg_rating}</td><td>${item.is_paid}</td><td>${item.content_len}</td>`;
      tableBody.appendChild(row);
  });
}

function setupPagination(totalPages,category) {
  const paginationContainer = document.createElement('div');
  paginationContainer.classList.add('pagination');

  for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.addEventListener('click', () => {
          currentPage = i;
          getDataBasedOnCategory(category);
      });
      paginationContainer.appendChild(pageButton);
  }

  const paginationWrapper = document.querySelector('#pagination-wrapper');
  paginationWrapper.innerHTML = '';
  paginationWrapper.appendChild(paginationContainer);
}
// function updatePagination() {
//   const totalPages = Math.ceil(data.length / pageSize);
//   const paginationContainer = document.getElementById('pagination');

//   paginationContainer.innerHTML = '';

//   for (let i = 1; i <= totalPages; i++) {
//     const link = document.createElement('a');
//     link.href = '#';
//     link.textContent = i;
//     link.addEventListener('click', () => {
//       currentPage = i;
//       updateTable(currentPage);
//       updatePagination();
//     });

//     if (i === currentPage) {
//       link.classList.add('active');
//     }

//     paginationContainer.appendChild(link);
//   }
//}


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
  

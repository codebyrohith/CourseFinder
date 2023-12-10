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
                const option_var = document.getElementById('dropdownmenu');
                dropdownOptions.forEach(opt=>{
                  dropdownmenu.add(new Option(opt, opt)); 
                })
              } catch (error) {
                console.error('API Error:', error);
              }

}
handleDropDownMenu = (params) => {
    getDataBasedOnCategory(params);
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
window.onload = loadCategories  

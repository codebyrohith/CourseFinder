// script.js

// Function to fetch data from the API and populate the dropdown
async function populateDynamicDropdown() {
    const dropdown = document.getElementById("dynamicDropdown");
  
    try {
      // Make an API call to get data (replace 'your-api-endpoint' with the actual API endpoint)
      const response = await fetch('https://6zs1a549rk.execute-api.us-east-1.amazonaws.com/dev');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Loop through the data and create dropdown options
      for (const option of data) {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.text = option;
        dropdown.add(optionElement);
      }
  
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
    }
  }
  
  // Function to handle the onchange event for the dynamic dropdown
  function handleDynamicDropdownChange() {
    const dropdown = document.getElementById("dynamicDropdown");
    const selectedOption = dropdown.value;
  
    // Update the display with the selected option
    document.getElementById("selectedOption").innerText = "Selected Option: " + selectedOption;
  }
  
  // Call the function to populate the dynamic dropdown during page load
  populateDynamicDropdown();
  
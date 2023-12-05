document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('dropdown');
  
    // Fetch data from AWS API Gateway with a readable stream
    fetch('https://x21e74ohc3.execute-api.us-east-1.amazonaws.com/dev/categories',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods':'GET'
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
  
        // Get a readable stream reader
        const reader = response.body.getReader();
  
        // Read stream asynchronously
        return reader.read();
      })
      .then(function readStream({ done, value }) {
        if (done) {
          console.log('Stream is done.');
          return;
        }
  
        // Parse the value (assuming it's JSON)
        const options = JSON.parse(value);
  
        // Populate dropdown with options
        options.forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.value = option.value;
          optionElement.textContent = option.label;
          dropdown.appendChild(optionElement);
        });
  
        // Continue reading the next chunk of the stream
        return reader.read().then(readStream);
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  });
  
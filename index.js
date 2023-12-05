document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('dropdown');
  
    // Fetch data from AWS API Gateway with a readable stream
    fetch('https://x21e74ohc3.execute-api.us-east-1.amazonaws.com/dev/categories',
    {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods':'GET'
        },
      }
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
  
        // Get a readable stream reader
        const reader = response.body.getReader();
  
        // Read stream asynchronously
        return readStream(reader);
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  
    function readStream(reader) {
      return reader.read().then(({ done, value }) => {
        if (done) {
          console.log('Stream is done.');
          return;
        }
  
        try {
          // Parse the value (assuming it's JSON)
          const jsonString = new TextDecoder().decode(value);

// Parse the string as JSON
          const jsonObject = JSON.parse(jsonString);
          const options = JSON.parse(jsonObject);
  
          // Populate dropdown with options
          options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            dropdown.appendChild(optionElement);
          });
  
          // Continue reading the next chunk of the stream
          return readStream(reader);
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          // Handle the error or abort reading the stream
        }
      });
    }
  });
  
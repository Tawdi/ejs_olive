document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());
  
    const password = formDataObj.password;
    const confirmPassword = document.getElementById('floatingPasswordConfirm').value;
  
    const errorMessage = document.getElementById('error-message');
  
    // Clear previous error message
    errorMessage.textContent = '';
    errorMessage.classList.add('d-none');
  
    // Client-side validation
    if (!formDataObj.nom || !formDataObj.email || !formDataObj.password || !confirmPassword) {
      errorMessage.textContent = 'All fields are required.';
      errorMessage.classList.remove('d-none');
      return;
    }
  
    if (!validateEmail(formDataObj.email)) {
      errorMessage.textContent = 'Invalid email format.';
      errorMessage.classList.remove('d-none');
      return;
    }
  
    if (password !== confirmPassword) {
      errorMessage.textContent = 'Passwords do not match.';
      errorMessage.classList.remove('d-none');
      return;
    }
  
    try {
      const response = await fetch('/inscrire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObj)
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Handle success (you can redirect or show a success message)
        alert('User registered successfully');
        // Optionally, redirect to another page
        window.location.href = '/sign_in';
      } else {
        // Handle server-side error
        errorMessage.textContent = result.error;
        errorMessage.classList.remove('d-none');
      }
    } catch (error) {
      // Handle network error
      errorMessage.textContent = 'An error occurred. Please try again later.';
      errorMessage.classList.remove('d-none');
    }
  });
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
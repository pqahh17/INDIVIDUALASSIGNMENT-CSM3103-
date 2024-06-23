let users = JSON.parse(localStorage.getItem('users')) || [];

function showLoginForm() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function showSignupForm() {
    document.getElementById('signupForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
}

function signUp(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    // Check if username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert('Username already exists. Please choose a different username.');
        return;
    }

    // Save new user to local storage
    const newUser = { name, email, username, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Sign-up successful! Please log in.');
    showLoginForm();
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Example of basic login validation (you should implement more secure validation)
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Store the current user in sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirect to babysitter.html
        window.location.href = 'babysitter.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
}    



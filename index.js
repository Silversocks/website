document.getElementById('UserForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('Name').value;
    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;
    const dob = document.getElementById('Dob').value;
    const terms = document.getElementById('Terms').checked;

    if (!terms) {
        alert("You must agree to the terms and conditions.");
        return;
    }

    const existingData = JSON.parse(localStorage.getItem('users')) || [];
    existingData.push({ name, email, password, dob, terms });

    localStorage.setItem('users', JSON.stringify(existingData));

    displayStoredData();
});

function displayStoredData() {
    const storedData = JSON.parse(localStorage.getItem('users')) || [];
    const tableBody = document.getElementById('TableBody');

    tableBody.innerHTML = '';

    if (storedData.length > 0) {
        storedData.forEach(user => {
            const row = `<tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td>${user.dob}</td>
                <td>${user.terms ? 'Yes' : 'No'}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } else {
        tableBody.innerHTML = `<tr><td colspan="5">No data stored yet.</td></tr>`;
    }
}

// Display stored data on page load
window.onload = displayStoredData;


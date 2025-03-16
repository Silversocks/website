document.getElementById('userform').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    // Age validation
    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert("Your age must be between 18 and 55 years.");
        return;
    }

    if (!terms) {
        alert("You must agree to the terms and conditions.");
        return;
    }

    const existingData = JSON.parse(localStorage.getItem('users')) || [];
    existingData.push({ name, email, password, dob, terms });

    localStorage.setItem('users', JSON.stringify(existingData));

    displayStoredData();
});

function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust if the birthday hasn't occurred this year yet
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1;
    }

    return age;
}

function displayStoredData() {
    const storedData = JSON.parse(localStorage.getItem('users')) || [];
    const tableBody = document.getElementById('tablebody');

    tableBody.innerHTML = '';

    if (storedData.length > 0) {
        storedData.slice().reverse().forEach(user => {
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

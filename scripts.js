// Mock inventory data
let inventoryData = [
    { bloodGroup: 'A+', quantity: 5, storageArea: 'Storage Room 1' },
    { bloodGroup: 'O-', quantity: 3, storageArea: 'Storage Room 2' },
    { bloodGroup: 'B+', quantity: 2, storageArea: 'Storage Room 3' },
];

// Display inventory data on page load
document.addEventListener("DOMContentLoaded", () => {
    displayInventory();
    displayUsers();
});

// Display blood inventory in the table
function displayInventory() {
    const inventoryTable = document.getElementById('inventoryTable');
    inventoryData.forEach(item => {
        let row = `<tr>
                    <td>${item.bloodGroup}</td>
                    <td>${item.quantity}</td>
                    <td>${item.storageArea}</td>
                  </tr>`;
        inventoryTable.innerHTML += row;
    });
}

// Register new user and save to localStorage
function registerUser() {
    const name = document.getElementById('name').value;
    const bloodGroup = document.getElementById('bloodGroup').value;
    const contact = document.getElementById('contact').value;

    if (name && bloodGroup && contact) {
        const newUser = { name, bloodGroup, contact };

        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        document.getElementById('registrationForm').reset();
        displayUsers();
    } else {
        alert('Please fill in all fields');
    }
}

// Display registered users from localStorage
function displayUsers() {
    const usersTable = document.getElementById('usersTable');
    usersTable.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Blood Group</th>
            <th>Contact Info</th>
        </tr>
    `;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.forEach(user => {
        let row = `<tr>
                    <td>${user.name}</td>
                    <td>${user.bloodGroup}</td>
                    <td>${user.contact}</td>
                   </tr>`;
        usersTable.innerHTML += row;
    });
}

// Post blood request and check availability
function postRequest() {
    const requestBloodGroup = document.getElementById('requestBloodGroup').value;
    const result = document.getElementById('requestResult');

    const available = inventoryData.find(item => item.bloodGroup === requestBloodGroup);

    if (available && available.quantity > 0) {
        result.innerText = `Blood group ${requestBloodGroup} is available in stock!`;
    } else {
        result.innerText = `Sorry, blood group ${requestBloodGroup} is not available.`;
    }
}

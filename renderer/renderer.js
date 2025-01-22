document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;

  await window.api.addUser({ firstName, lastName, email });

  // Clear the form after successfully adding the user
  document.getElementById('userForm').reset();

  // Reload the users
  loadUsers();
});

async function loadUsers() {
  const users = await window.api.fetchUsers();
  const userList = document.getElementById('userList');
  userList.innerHTML = users.map(user => `<tr><td>${user.firstName}</td> <td>${user.lastName}</td> <td>${user.email}</td> <td><i class="fa-regular fa-id-badge"></i></td></tr>`).join('');
}

loadUsers();

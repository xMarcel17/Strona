document.addEventListener("DOMContentLoaded", () => {
  loadProfileData();

  const form = document.getElementById('editForm');
  form.addEventListener('submit', (event) => {
      event.preventDefault();
      saveProfileData();
      closeModal();
      loadProfileData();
  });
});

function loadProfileData() {
  const profileData = JSON.parse(localStorage.getItem('profileData')) || {
      firstName: 'Jan',
      lastName: 'Kowalski',
      username: 'kochamChoinki7349',
      email: 'j.kowalski7349@gmail.com',
      phone: '52******',
      card: '1234************23',
      address: 'ul. Grottgera 24/6'
  };

  document.getElementById('firstName').textContent = profileData.firstName;
  document.getElementById('lastName').textContent = profileData.lastName;
  document.getElementById('username').textContent = profileData.username;
  document.getElementById('username').textContent = profileData.username;
  document.getElementById('email').textContent = profileData.email;
  document.getElementById('phone').textContent = profileData.phone;
  document.getElementById('card').textContent = profileData.card;
  document.getElementById('address').textContent = profileData.address;
  document.getElementById('fullName').textContent = `${profileData.firstName} ${profileData.lastName}`;

  // If there are other elements to update, do it here
}

function saveProfileData() {
  const profileData = {
      firstName: document.getElementById('editFirstName').value,
      lastName: document.getElementById('editLastName').value,
      username: document.getElementById('editUsername').value,
      email: document.getElementById('editEmail').value,
      phone: document.getElementById('editPhone').value,
      card: document.getElementById('editCard').value,
      address: document.getElementById('editAddress').value
  };

  localStorage.setItem('profileData', JSON.stringify(profileData));
}

function editProfile() {
  const profileData = JSON.parse(localStorage.getItem('profileData')) || {
      firstName: 'Jan',
      lastName: 'Kowalski',
      username: 'kochamChoinki7349',
      email: 'j.kowalski7349@gmail.com',
      phone: '52******',
      card: '1234************23',
      address: 'ul. Grottgera 24/6'
  };

  document.getElementById('editFirstName').value = profileData.firstName;
  document.getElementById('editLastName').value = profileData.lastName;
  document.getElementById('editUsername').value = profileData.username;
  document.getElementById('editEmail').value = profileData.email;
  document.getElementById('editPhone').value = profileData.phone;
  document.getElementById('editCard').value = profileData.card;
  document.getElementById('editAddress').value = profileData.address;

  document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('editModal').style.display = 'none';
}
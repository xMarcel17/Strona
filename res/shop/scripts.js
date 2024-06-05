// Funkcja do ładowania danych profilu z localStorage
function loadProfileData() {
  profileData = JSON.parse(localStorage.getItem('profileData')) || {
      firstName: 'Jan',
      lastName: 'Kowalski',
      username: 'kochamChoinki7349',
      email: 'j.kowalski7349@gmail.com',
      phone: '52******',
      card: '1234************23',
      address: 'ul. Grottgera 24/6'
  };

  // Aktualizacja danych w navbarze
  document.getElementById('nav_username').textContent = profileData.username;

  document.getElementById('editFirstName').value = profileData.firstName;
  document.getElementById('editLastName').value = profileData.lastName;
  document.getElementById('editUsername').value = profileData.username;
  document.getElementById('editEmail').value = profileData.email;
  document.getElementById('editPhone').value = profileData.phone;
  document.getElementById('editCard').value = profileData.card;
  document.getElementById('editAddress').value = profileData.address;

}

// Funkcja do zapisywania danych profilu do localStorage
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

// Event Listener, aby załadować dane profilu po załadowaniu strony
document.addEventListener("DOMContentLoaded", () => {
  loadProfileData();
});

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = checkLoginStatus();

  if (!isLoggedIn) {
    window.location.href = 'login.html'; // Przekieruj na stronę logowania, jeśli użytkownik nie jest zalogowany
  } else {
    loadProfileData();
  }

  const form = document.getElementById('editForm');
  form.addEventListener('submit', (event) => {
      event.preventDefault();
      saveProfileData();
      closeModal();
      loadProfileData();
  });

  document.getElementById('logout-button').addEventListener('click', () => {
    logoutUser();
  });
});

function checkLoginStatus() {
  // Sprawdź, czy istnieje token lub inny wskaźnik zalogowania użytkownika
  return localStorage.getItem('loggedIn') === 'true';
}

function login(username, password) {
  // Tutaj można dodać logikę sprawdzania loginu i hasła, np. wywołując zapytanie do serwera
  // Po poprawnym uwierzytelnieniu użytkownika ustaw flagę loggedIn na true w localStorage
  localStorage.setItem('loggedIn', 'true');
}

function logoutUser() {
  // Wyloguj użytkownika poprzez usunięcie flagi loggedIn z localStorage
  localStorage.removeItem('loggedIn');
  // Przekieruj użytkownika na stronę logowania
  window.location.href = 'login.html';
}
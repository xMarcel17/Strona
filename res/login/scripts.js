var username_temp;

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
  
  username_temp = profileData.username;
  // Aktualizacja danych w navbarze
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
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Zapobiega domyślnej akcji przesyłania formularza

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Sprawdź, czy nazwa użytkownika i hasło są poprawne
    if (username_temp === username && password === 'choinka123') {
      // Jeśli dane logowania są poprawne, zaloguj użytkownika
      login(username);
      // Przekieruj użytkownika na stronę swojego profilu
      window.location.href = 'account.html';
    } else {
      // Jeśli dane logowania są niepoprawne, wyświetl komunikat błędu
      alert('Niepoprawna nazwa użytkownika lub hasło. Spróbuj ponownie.');
    }
  });
});

function login(username) {
  // Tutaj można dodać dodatkowe operacje związane z logowaniem,
  // na przykład ustawienie flagi zalogowania w localStorage lub sesji
  localStorage.setItem('loggedIn', 'true');
  localStorage.setItem('username', username);
}

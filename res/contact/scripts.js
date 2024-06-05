function downloadVCard() {
  const vCardData = 
      `BEGIN:VCARD
VERSION:4.0
FN:Rafal Choinka
ORG:Choinkomat
EMAIL:kontakt@choinkomat.pl
TEL;TYPE=WORK,VOICE:+4811122233
ADR;TYPE=WORK:;;ul. Jodlowa 24/5;Poznan;;61-720;Polska
TITLE:Wlasciciel
NICK:Mr Choinka
ROLE:właściciel
URL;TYPE=WORK:http://choinkomat.pl
REGION:Wielkopolskie
END:VCARD`;

  const blob = new Blob([vCardData], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'choinkomat.vcf';
  a.click();
  URL.revokeObjectURL(url);
}

// Funkcja do ładowania danych profilu z localStorage
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

  // Aktualizacja danych w navbarze
  document.getElementById('nav_username').textContent = profileData.username;
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
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Zapobiega domyślnej akcji przesłania formularza

    const formData = new FormData(contactForm);
    const requestBody = new URLSearchParams(formData);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: requestBody,
      });

      if (response.ok) {
        // Jeśli odpowiedź serwera jest prawidłowa
        alert("Twoja wiadomość została pomyślnie wysłana!");
        contactForm.reset(); // Wyczyść formularz po wysłaniu
      } else {
        // Jeśli odpowiedź serwera nie jest prawidłowa
        alert("Wystąpił problem podczas wysyłania wiadomości. Spróbuj ponownie później.");
      }
    } catch (error) {
      // Jeśli wystąpił błąd podczas wysyłania żądania
      console.error("Wystąpił błąd:", error);
      alert("Wystąpił problem podczas wysyłania wiadomości. Spróbuj ponownie później.");
    }
  });
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
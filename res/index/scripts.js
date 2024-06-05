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

// Funkcje do przewijania banerów
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

let currentIndex = 1; // Początkowy indeks banera

function updateSlides() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  slides.forEach((slide, index) => {
      if (index === currentIndex) {
          slide.style.opacity = '1';
      } else {
          slide.style.opacity = '0.5';
      }
  });
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlides();
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlides();
});

updateSlides();

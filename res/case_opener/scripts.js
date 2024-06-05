// Funkcja do ładowania danych profilu z localStorage
function loadProfileData() {
    const profileData = JSON.parse(localStorage.getItem('profileData')) || {
        firstName: 'Jan',
        lastName: 'Kowalski',
        username: 'kochamChoinki7349',
        email: 'j.kowalski7349@gmail.com',
        phone: '52',
        card: '123423',
        address: 'ul. Grottgera 24/6'
    };
  
    // Aktualizacja danych w navbarze
    const navUsername = document.getElementById('nav_username');
    navUsername.textContent = profileData.username;
    navUsername.classList.add('nav-username'); // Dodajemy klasę CSS
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
    const openButton = document.getElementById('openButton');
    const instruction = document.getElementById('instruction');
    const itemsContainer = document.getElementById('items-container');
    const congratsContainer = document.getElementById('congrats');
    const itemNameSpan = document.getElementById('item-name');
    const chosing = document.getElementById('chosing');

    const prizes = [
        'res/case_opener/Gwiazdka.png',
        'res/case_opener/Kapelusz.png',
        'res/case_opener/Konewka.png',
        'res/case_opener/Nasionka.png',
        'res/case_opener/Traktor.png',
        'res/case_opener/Zloto.png',
        'res/case_opener/Sadzonka.png',
        'res/case_opener/Figurka.png',
        'res/case_opener/Choinka.png',
        'res/case_opener/Strach.png'
    ];

    openButton.addEventListener('click', () => {
        openButton.style.display = 'none';
        instruction.style.display = 'none';
        
        chosing.classList.remove('hidden');
        itemsContainer.classList.remove('hidden');
        displayItems();
    });

    function displayItems() {
        const shuffledPrizes = shuffleArray(prizes);
        const itemRows = document.querySelectorAll('.item-row');

        itemRows.forEach((row, rowIndex) => {
            for (let i = 0; i < 5; i++) {
                const itemIndex = rowIndex * 5 + i;
                if (itemIndex >= shuffledPrizes.length) break;

                const item = document.createElement('div');
                item.classList.add('item');
                item.innerHTML = `<img src="${shuffledPrizes[itemIndex]}" alt="prize">`;
                item.addEventListener('click', () => {
                    if (!item.classList.contains('disabled')) {
                        disableAllItems();
                        item.style.transition = 'opacity 1s';
                        item.style.opacity = 0;
                        setTimeout(() => {
                            const prizeImage = item.querySelector('img');
                            prizeImage.style.display = 'block';
                            item.style.opacity = 1;
                            const itemName = prizeImage.src.split('/').pop().split('.').shift();
                            itemNameSpan.textContent = itemName;
                            congratsContainer.classList.remove('hidden');
                        }, 1000);
                    }
                });

                row.appendChild(item);
            }
        });
    }

    function disableAllItems() {
        const allItems = document.querySelectorAll('.item');
        allItems.forEach(item => {
            item.classList.add('disabled');
        });
    }

    function shuffleArray(array) {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }
});

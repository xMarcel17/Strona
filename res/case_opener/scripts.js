document.addEventListener("DOMContentLoaded", () => {
    const openButton = document.getElementById('openButton');
    const instruction = document.getElementById('instruction');
    const itemsContainer = document.getElementById('items-container');
    const congratsContainer = document.getElementById('congrats');
    const itemNameSpan = document.getElementById('item-name');
    const chosing = document.getElementById('chosing');

    const prizes = [
        'res/case_opener/p1.png',
        'res/case_opener/p2.png',
        'res/case_opener/p3.png',
        'res/case_opener/p4.png',
        'res/case_opener/p5.png',
        'res/case_opener/p6.png',
        'res/case_opener/p7.png',
        'res/case_opener/p8.png',
        'res/case_opener/p9.png',
        'res/case_opener/p10.png'
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

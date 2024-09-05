const itemsContainer = document.getElementById('items');
const targets = document.querySelectorAll('.target');
const submitButton = document.getElementById('submit-button');

let draggedItem = null;

// Add event listeners for drag and drop functionality
function addDragEventListeners() {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = e.target;
            draggedItem.classList.add('dragging');
        });

        item.addEventListener('dragend', () => {
            draggedItem.classList.remove('dragging');
            draggedItem = null;
        });
    });

    targets.forEach(target => {
        target.addEventListener('dragover', (e) => {
            e.preventDefault();
            target.classList.add('over');
        });

        target.addEventListener('dragleave', () => {
            target.classList.remove('over');
        });

        target.addEventListener('drop', (e) => {
            e.preventDefault();
            target.classList.remove('over');

            if (draggedItem) {
                target.appendChild(draggedItem);
                draggedItem.classList.remove('dragging');
                draggedItem = null;
            }
        });
    });
}

function resetGame() {
    // Remove all items from targets
    targets.forEach(target => {
        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }
    });

    // Re-create and shuffle items
    const cardValues = ['1', '2', '3', '4'];
    const shuffledValues = cardValues.sort(() => 0.5 - Math.random());

    // Clear the items container
    itemsContainer.innerHTML = '';

    // Create new item elements
    shuffledValues.forEach(value => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.dataset.match = value;
        item.draggable = true;
        item.textContent = `Item ${value}`;
        itemsContainer.appendChild(item);
    });

    // Re-add drag event listeners to new items
    addDragEventListeners();

    // Re-enable the submit button for the next round
    submitButton.disabled = false;
    submitButton.style.display = 'block';
}

// Add event listener for the submit button
submitButton.addEventListener('click', () => {
    const allItemsMatched = Array.from(targets).every(target => 
        target.children.length > 0 && target.dataset.match === target.children[0].dataset.match
    );

    if (allItemsMatched) {
        // Clear the content of the page
        document.body.innerHTML = 'Redirecting... Please wait.';
        
        // Use history.replaceState to modify the browser history
        history.replaceState(null, null, window.location.href);
        
        // Redirect to Google after a short delay
        setTimeout(() => {
            window.location.href = 'https://www.google.com';
        }, 1000); // 1-second delay to show "Redirecting" message
    } else {
        // Show 404 error
        alert('Error 404: Page not found. Please complete the game to proceed.');
    }

    // Reset the game after handling submission
    resetGame();
});

// Initialize the game
function initGame() {
    resetGame();
}
initGame();

// Initialize variables
let id = 0;
let items = []; // Array to store deleted, completed, or updated items

// Add event listener to the 'Add' button
document.getElementById('add').addEventListener('click', () => {
    let taskInput = document.getElementById('new-task');
    let taskText = taskInput.value.trim();
    if (taskText !== '') {
        // Create a new row in the table
        let createdDate = new Date();
        let table = document.getElementById('list');
        let row = table.insertRow(1);
        row.setAttribute('id', `item-${id}`);
        
        // Insert the task and created date into the row
        row.insertCell(0).innerHTML = taskText;
        row.insertCell(1).innerHTML = `${createdDate.getMonth() + 1}-${createdDate.getDate()}-${createdDate.getFullYear()}`;
        
        // Create buttons for delete, complete, and update actions
        let actions = row.insertCell(2);
        actions.appendChild(createDeleteButton(id));
        actions.appendChild(createCompleteButton(id));
        actions.appendChild(createUpdateButton(id));
        
        // Clear the task input field
        taskInput.value = '';
        
        // Increment the id for the next task
        id++;
    }
});

// Function to create the delete button
function createDeleteButton(id) {
    let btn = document.createElement('button');
    btn.classList.add('btn', 'btn-primary', 'fas', 'fa-trash-alt');
    btn.id = id;
    btn.onclick = () => {
        console.log(`Deleting row with id: item-${id}`);
        let elementToDelete = document.getElementById(`item-${id}`);
        if (elementToDelete) {
            elementToDelete.parentNode.removeChild(elementToDelete);
            // Add the deleted item to the items array
            items.push({
                id: id,
                action: 'deleted',
                timestamp: new Date()
            });
        }
    };
    return btn;
}

// Function to create the complete button
function createCompleteButton(id) {
    let btn = document.createElement('button');
    btn.classList.add('btn', 'btn-success', 'fas', 'fa-check');
    btn.id = id;
    btn.onclick = () => {
        console.log(`Completed row with id: item-${id}`);
        let elementComplete = document.getElementById(`item-${id}`);
        if (elementComplete) {
            elementComplete.parentNode.removeChild(elementComplete);
            // Add the completed item to the items array
            items.push({
                id: id,
                action: 'completed',
                timestamp: new Date()
            });
        }
    };
    return btn;
}

// Function to create the update button
function createUpdateButton(id) {
    let btn = document.createElement('button');
    btn.classList.add('btn', 'btn-warning', 'fas', 'fa-pencil-alt');
    btn.id = id;
    btn.onclick = () => {
        console.log(`Updated row with id: item-${id}`);
        let elementToUpdate = document.getElementById(`item-${id}`);
        if (elementToUpdate) {
            let taskText = prompt('Enter updated task: ');
            if (taskText !== null && taskText.trim() !== '') {
                // Update the task text in the row
                elementToUpdate.cells[0].innerHTML = taskText.trim();
                // Add the updated item to the items array
                items.push({
                    id: id,
                    action: 'updated',
                    timestamp: new Date()
                });
            }
        }
    };
    return btn;
}

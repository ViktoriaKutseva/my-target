document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.querySelector('#task-list');
    const updateModal = document.querySelector('#update-modal');
    const updateTaskForm = document.querySelector('#update-task-form');
    const closeModalButton = document.querySelector('#close-modal');
    const taskId = document.querySelector('#update-task-id').value;

    if(taskList){
        taskList.addEventListener('click', function(event) {
            if (event.target.classList.contains('delete-btn')) {
                deleteTask(event)
            }
            if (event.target.classList.contains('update-btn')) {
                updateTaskModal(event)
            }
        });
    }

    async function deleteTask(event) {
        const taskId = event.target.getAttribute('data-task-id');

        await deleteTaskRequest(taskId);
        event.target.closest('li').remove();
    }

    async function deleteTaskRequest(taskId) {
        try {
            const response = await fetch(`/tasks/${taskId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Task deleted successfully!');
                return response; 
            } else {
                alert('Error deleting task.');
            }
        } catch (error) {
            alert('Network error.');
        }
    }
    
    updateTaskForm.addEventListener('submit', updateTaskRequest);

    async function updateTaskModal(event) {
        const taskId = event.target.getAttribute('data-task-id');
        const taskTitle = event.target.getAttribute('data-task-title');
        const taskDescription = event.target.getAttribute('data-task-description');
        const taskStatus = event.target.getAttribute('data-task-status');

        document.querySelector('#update-task-id').value = taskId;
        document.querySelector('#update-title').value = taskTitle;
        document.querySelector('#update-description').value = taskDescription;
        document.querySelector('#update-status').value = taskStatus === 'true' ? 'true' : 'false';

        updateModal.style.display = 'block';
    }

    function getTaskFormData(){
        return {
            taskId: document.querySelector('#update-task-id').value,
            updatedTitle: document.querySelector('#update-title').value,
            updatedDescription: document.querySelector('#update-description').value,
            updatedStatus: document.querySelector('#update-status').value === 'true'
        };
    }
        // Close modal when the 'Cancel' button is clicked
        closeModalButton.addEventListener('click', function() {
            updateModal.style.display = 'none';
        });

    async function updateTaskRequest(event) {
        event.preventDefault();
        const { taskId, updatedTitle, updatedDescription, updatedStatus } = getTaskFormData();
    
        try {
            const response = await fetch(`/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: updatedTitle,
                    description: updatedDescription,
                    is_done: updatedStatus,
                })
            });
    
            const data = await response.json();
            handleTaskUpdateResponse(data, taskId, updatedTitle, updatedDescription, updatedStatus);
        } catch (error) {
            alert('Network error while updating task.');
            console.error('Error:', error);
        }
    }

    function handleTaskUpdateResponse(data, taskId, updatedTitle, updatedDescription, updatedStatus) {
        if (data.detail === 'Task updated') {
            alert('Task updated successfully!');
            const taskItem = document.querySelector(`li[data-task-id="${taskId}"]`);
            taskItem.querySelector('h3').textContent = updatedTitle;
            taskItem.querySelector('p:nth-of-type(1)').textContent = updatedDescription;
            taskItem.querySelector('p:nth-of-type(2)').textContent = `Status: ${updatedStatus ? 'Done' : 'Not Done'}`;

            updateModal.style.display = 'none';
        } else {
            alert('Error updating task.');
        }
    }
});

//         if (event.target.classList.contains('update-btn')) {
//             // Show update modal with the task data
//             const taskId = event.target.getAttribute('data-task-id');
//             const taskTitle = event.target.getAttribute('data-task-title');
//             const taskDescription = event.target.getAttribute('data-task-description');
//             const taskStatus = event.target.getAttribute('data-task-status');

//             document.querySelector('#update-task-id').value = taskId;
//             document.querySelector('#update-title').value = taskTitle;
//             document.querySelector('#update-description').value = taskDescription;
//             document.querySelector('#update-status').value = taskStatus === 'true' ? 'true' : 'false';

//             // Show modal
//             updateModal.style.display = 'block';
// //         }
// //     });

//     // Close modal when the 'Cancel' button is clicked
//     closeModalButton.addEventListener('click', function() {
//         updateModal.style.display = 'none';
//     });

// //     // Handle task update form submission
//     updateTaskForm.addEventListener('submit', function(event) {
//         event.preventDefault();

//         const taskId = document.querySelector('#update-task-id').value;
//         const updatedTitle = document.querySelector('#update-title').value;
//         const updatedDescription = document.querySelector('#update-description').value;
//         const updatedStatus = document.querySelector('#update-status').value;

//         // Corrected URL with template literals
//         fetch(`/tasks/${taskId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 title: updatedTitle,
//                 description: updatedDescription,
//                 is_done: updatedStatus === 'true',
//             })
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.detail === 'Task updated') {
//                 alert('Task updated successfully!');
//                 // Update the DOM to reflect the changes
//                 const taskItem = document.querySelector(`li[data-task-id="${taskId}"]`);
//                 taskItem.querySelector('h3').textContent = updatedTitle;
//                 taskItem.querySelector('p:nth-of-type(1)').textContent = updatedDescription;
//                 taskItem.querySelector('p:nth-of-type(2)').textContent = `Status: ${updatedStatus === 'true' ? 'Done' : 'Not Done'}`;

//                 // Close the modal
//                 updateModal.style.display = 'none';
//             } else {
//                 alert('Error updating task.');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Network error while updating task.');
//         });
//     });
// });

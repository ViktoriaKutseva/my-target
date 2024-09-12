// Wait for the DOM to load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Getting the list of tasks and all tasks in it
    const taskList = document.querySelector('#task-list');
    const tasks = taskList.querySelectorAll('.task');

    // Adding event listeners to all tasks in the list
    tasks.forEach(task => {
        // Getting the delete and update buttons in each task
        const deleteBtn = task.querySelector('.delete-btn');
        const updateBtn = task.querySelector('.update-btn');
        
        // Adding event listeners to the delete and update buttons
        deleteBtn.addEventListener('click', deleteTask);
        updateBtn.addEventListener('click', updateTask);
    });

    async function updateTask(event) {
        // Getting update task dialog and it's main elements
        const updateTaskDialog = document.querySelector('#update-modal');
        const updateTaskForm = updateTaskDialog.querySelector('#update-task-form');
        const closeDialogButton = updateTaskDialog.querySelector('#close-modal');

        // Getting task data from the clicked element
        const taskId = event.target.getAttribute('data-task-id');
        const taskTitle = event.target.getAttribute('data-task-title');
        const taskDescription = event.target.getAttribute('data-task-description');
        const taskStatus = event.target.getAttribute('data-task-status');

        // Setting updateTaskForm values with data from the clicked element
        updateTaskForm.querySelector('#update-task-id').value = taskId;
        updateTaskForm.querySelector('#update-title').value = taskTitle;
        updateTaskForm.querySelector('#update-description').value = taskDescription;
        updateTaskForm.querySelector('#update-status').value = taskStatus === 'true' ? 'true' : 'false';

        // Show updateTaskDialog and make it modal
        updateTaskDialog.style.display = 'block';

        // Add event listener to updateTaskForm for submission
        updateTaskForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            // Getting updated task data from the form
            const taskData = {
                taskId: updateTaskForm.querySelector('#update-task-id').value,
                updatedTitle: updateTaskForm.querySelector('#update-title').value,
                updatedDescription: updateTaskForm.querySelector('#update-description').value,
                updatedStatus: updateTaskForm.querySelector('#update-status').value === 'true'
            };
            try {
                // Sending update request
                await updateTaskRequest(taskData);
                alert('Task updated successfully!');

                // Getting the task item from the DOM and updating it with the new data
                const taskItem = document.querySelector(`li[data-task-id="${taskId}"]`);
                taskItem.querySelector('.title').textContent = taskData.updatedTitle;
                taskItem.querySelector('.description').textContent = taskData.updatedDescription;
                taskItem.querySelector('.status').textContent = `Status: ${taskData.updatedStatus ? 'Done' : 'Not Done'}`;
                
                // Close the dialog
                updateTaskDialog.style.display = 'none';

            } catch (error) {
                alert('Error sending update request');
            }
        });

        // Close dialog when the 'Cancel' button is clicked
        closeDialogButton.addEventListener('click', function() {
            updateTaskDialog.style.display = 'none';
        });
    }

    async function updateTaskRequest(taskData) {
        return await sendRequest(
            fetch(`/tasks/${taskData.taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: taskData.updatedTitle,
                    description: taskData.updatedDescription,
                    is_done: taskData.updatedStatus,
                })
            })
        )
    }

    async function deleteTask(event) {
        const taskId = event.target.getAttribute('data-task-id');

        try {
            await deleteTaskRequest(taskId);
            // Next line is within try block to prevent deletion of task from the DOM if the request fails
            event.target.closest('li').remove();
        } catch (error) {
            alert(error);
        }
    }

    async function deleteTaskRequest(taskId) {
        await sendRequest(
            fetch(`/tasks/${taskId}`, {
                method: 'DELETE',
            })
        )
    }

    async function sendRequest(request) {
        try {
            const response = await request
            if (response.ok) {
                return response; 
            } else {
                console.error('HTTP error! status:', response.status);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error in sendRequest:', error);
            throw error;
        }
    }


    // async function updateTaskModal(event) {
    //     const taskId = event.target.getAttribute('data-task-id');
    //     const taskTitle = event.target.getAttribute('data-task-title');
    //     const taskDescription = event.target.getAttribute('data-task-description');
    //     const taskStatus = event.target.getAttribute('data-task-status');

    //     document.querySelector('#update-task-id').value = taskId;
    //     document.querySelector('#update-title').value = taskTitle;
    //     document.querySelector('#update-description').value = taskDescription;
    //     document.querySelector('#update-status').value = taskStatus === 'true' ? 'true' : 'false';

    //     updateTaskDialog.style.display = 'block';
    // }

    // function getTaskFormData(){
    //     return {
    //         taskId: document.querySelector('#update-task-id').value,
    //         updatedTitle: document.querySelector('#update-title').value,
    //         updatedDescription: document.querySelector('#update-description').value,
    //         updatedStatus: document.querySelector('#update-status').value === 'true'
    //     };
    // }

    // // Close modal when the 'Cancel' button is clicked
    // closeUpdateTaskDialogButton.addEventListener('click', function() {
    //     updateTaskDialog.style.display = 'none';
    // });

    // async function updateTaskRequest(event) {
    //     event.preventDefault();
    //     const { taskId, updatedTitle, updatedDescription, updatedStatus } = getTaskFormData();
    
    //     try {
    //         const response = await fetch(`/tasks/${taskId}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 title: updatedTitle,
    //                 description: updatedDescription,
    //                 is_done: updatedStatus,
    //             })
    //         });
    
    //         const data = await response.json();
    //         handleTaskUpdateResponse(data, taskId, updatedTitle, updatedDescription, updatedStatus);
    //     } catch (error) {
    //         alert('Network error while updating task.');
    //         console.error('Error:', error);
    //     }
    // }

    // function handleTaskUpdateResponse(data, taskId, updatedTitle, updatedDescription, updatedStatus) {
    //     if (data.detail === 'Task updated') {
    //         alert('Task updated successfully!');
    //         const taskItem = document.querySelector(`li[data-task-id="${taskId}"]`);
    //         taskItem.querySelector('h3').textContent = updatedTitle;
    //         taskItem.querySelector('p:nth-of-type(1)').textContent = updatedDescription;
    //         taskItem.querySelector('p:nth-of-type(2)').textContent = `Status: ${updatedStatus ? 'Done' : 'Not Done'}`;

    //         updateTaskDialog.style.display = 'none';
    //     } else {
    //         alert('Error updating task.');
    //     }
    // }
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

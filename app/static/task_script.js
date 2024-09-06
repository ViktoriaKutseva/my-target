document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.querySelector('#task-list');

    // Listen for click events on the delete buttons
    taskList.addEventListener('click', async function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const taskId = event.target.getAttribute('data-task-id');

            // Confirm before deletion
            if (confirm('Are you sure you want to delete this task?')) {
                try {
                    const response = await fetch(`/tasks/${taskId}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        alert('Task deleted successfully!');
                        // Remove the task from the DOM
                        event.target.closest('li').remove();
                    } else {
                        alert('Error deleting task.');
                    }
                } catch (error) {
                    alert('Network error while deleting task.');
                }
            }
        }
    });
});

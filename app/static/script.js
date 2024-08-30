document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission for creating a new task
    const form = document.querySelector('#task-form');
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent the form from submitting the traditional way

            const formData = new FormData(form);
            const taskData = {
                title: formData.get('title'),
                description: formData.get('description'),
                is_done: formData.get('is_done') === 'on'
            };

            try {
                const response = await fetch('/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(taskData),
                });

                if (response.ok) {
                    alert('Task created successfully!');
                    form.reset(); // Clear the form fields
                } else {
                    alert('Error creating task.');
                }
            } catch (error) {
                alert('Network error.');
            }
        });
    }
});

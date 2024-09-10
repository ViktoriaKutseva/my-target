document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.querySelector('#task-form');
    
    if (taskForm) {
        taskForm.addEventListener('submit', handleFormSubmit);
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        const taskData = getFormData(event.target);

        try {
            const response = await createTask(taskData);
            handleResponse(response);
        } catch (error) {
            alert('Network error.');
        }
    }

    function getFormData(form) {
        const formData = new FormData(form);
        return {
            title: formData.get('title'),
            description: formData.get('description'),
            is_done: formData.get('is_done') === 'on'
        };
    }

    async function createTask(taskData) {
        return fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });
    }

    function handleResponse(response) {
        if (response.ok) {
            alert('Task created successfully!');
            taskForm.reset(); 
        } else {
            alert('Error creating task.');
        }
    }
});

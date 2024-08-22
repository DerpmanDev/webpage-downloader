document.getElementById('clone-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('url').value;
    const statusDiv = document.getElementById('status');
    statusDiv.innerText = 'Cloning...';

    try {
        const response = await fetch('/clone', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        const result = await response.json();
        if (response.ok) {
            statusDiv.innerText = 'Cloning completed successfully!';
        } else {
            statusDiv.innerText = 'Error: ' + result.message;
        }
    } catch (error) {
        statusDiv.innerText = 'Error: ' + error.message;
    }
});
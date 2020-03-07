{
    const endpoint = '{{ENDPOINT}}';
    const eventSource = new EventSource(endpoint);
    eventSource.addEventListener('change', (event) => {
        console.log(event);
    });
}

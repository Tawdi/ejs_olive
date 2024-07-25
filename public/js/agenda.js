ment.addEventListener('DOMContentLoaded', function() {
    // Select all event elements
    const events = document.querySelectorAll('.event');

    // Add click event listener to each event element
    events.forEach(event => {
        event.addEventListener('click', function() {
            // Get the stade data attribute
            const stade = this.getAttribute('data-stade');

            // Make AJAX request to get content
            fetch(`/getContent?stade=${stade}`)
                .then(response => response.json())
                .then(data => {
                    // Show the text_agenda_zone element
                    const textAgendaZone = document.querySelector('.text_agenda_zone');
                    textAgendaZone.style.display = 'block';

                    // Update the content
                    const hhhDiv = textAgendaZone.querySelector('.hhh');
                    hhhDiv.innerHTML = `
                        <h1>${data.title}</h1>
                        <img src="${data.image_url}" alt="${data.title}" style="max-width: 100%; height: auto;">
                        <p>${data.description}</p>
                        <p>Start: ${data.debut}</p>
                        <p>End: ${data.fin}</p>
                    `;
                })
                .catch(error => console.error('Error fetching content:', error));
        });
    });
});

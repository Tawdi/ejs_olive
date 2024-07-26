document.addEventListener('DOMContentLoaded', function () {
    const eventElements = document.querySelectorAll('.event');
    const textAgendaZone = document.querySelector('.text_agenda_zone');
    const textZonee = document.querySelector('.text_zonee');

    // Define the text mapping for each stade
    const stadeTextMapping = {
        '1': 'Text for Stade 1',
        '2': 'Text for Stade 2',
        '3': 'Text for Stade 3',
        // Add more mappings as needed
    };

    eventElements.forEach(eventElement => {
        eventElement.addEventListener('mouseenter', function () {
            const eventDiv = this.querySelector('.event');
            if (eventDiv) {
                const stade = eventDiv.getAttribute('data-stade');
                const text = stadeTextMapping[stade] || 'Default text'; // Fallback text
                textZonee.textContent = text;
                textAgendaZone.style.display = 'block';
            }
        });

        eventElement.addEventListener('mouseleave', function () {
            textAgendaZone.style.display = 'none';
        });
    });
});

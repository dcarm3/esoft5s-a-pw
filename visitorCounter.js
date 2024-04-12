function getCurrentDate() {
    const currentDate = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });
    return formatter.format(currentDate);
}

function initVisitorCounter() {
    if (!localStorage.getItem('visitorCounter')) {
        const visitorCounter = {
            count: 0,
            lastVisit: getCurrentDate()
        };
        localStorage.setItem('visitorCounter', JSON.stringify(visitorCounter));
    }
}

function updateVisitorCounter() {
    const visitorCounter = JSON.parse(localStorage.getItem('visitorCounter'));
    visitorCounter.count++;
    visitorCounter.lastVisit = getCurrentDate();

    localStorage.setItem('visitorCounter', JSON.stringify(visitorCounter));

    const footerParagraph = document.createElement('p');
    footerParagraph.textContent = `Esta página foi visitada ${visitorCounter.count} vezes. A última visita foi: ${visitorCounter.lastVisit}`;

    const footer = document.querySelector('footer');
    footer.appendChild(footerParagraph);
}

document.addEventListener('DOMContentLoaded', function () {
    initVisitorCounter();
    updateVisitorCounter();
});

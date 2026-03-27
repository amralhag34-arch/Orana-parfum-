// Toggle dropdown visibility
document.querySelectorAll('.filter-header').forEach(header => {
    header.addEventListener('click', () => {
        const options = header.nextElementSibling;
        if (options.style.display === "block") {
            options.style.display = "none";
        } else {
            options.style.display = "block";
        }
    });
});

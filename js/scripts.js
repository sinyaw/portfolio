/*!
* Start Bootstrap - Clean Blog v6.0.4 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})

function updateDateTime() {
    // create a new `Date` object
    const now = new Date();

    // get the current date and time as a string
    const currentDateTime = now.toString();

    // update the `textContent` property of the `span` element with the `id` of `datetime`
    document.querySelector('#datetime').textContent = currentDateTime;
}
setInterval(updateDateTime, 1000);

function createPagination(totalPages) {
    const paginationContainer = document.querySelector('.pagination');
    const contentContainer = document.querySelector('.content');

    // Calculate number of buttons to show (adjust as needed)
    const maxButtons = 5;

    // Function to create pagination links
    function createPaginationLinks(currentPage) {
        paginationContainer.innerHTML = ''; // Clear previous links

        // Previous button
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage
                > 1) {
                createPaginationLinks(currentPage - 1);
                // Update content based on the new page
            }
        });
        paginationContainer.appendChild(prevButton);

        // Page number buttons
        const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        const endPage = Math.min(startPage + maxButtons - 1, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add(i
            === currentPage ? 'active' : '');
            pageButton.addEventListener('click', () => {
                createPaginationLinks(i);
                // Update content based on the new page
            });
            paginationContainer.appendChild(pageButton);
        }

        // Next button
        const nextButton = document.createElement('button');
        nextButton.textContent
            = 'Next';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages)
            {
                createPaginationLinks(currentPage + 1);
                // Update content based on the new page
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    // Initial page
    createPaginationLinks(1);
}

// Example usage
const totalPages = 50; // Replace with your actual total pages
createPagination(totalPages);
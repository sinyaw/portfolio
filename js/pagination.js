class Pagination {
    constructor(totalPages, currentPage = 1, rowsPerPage = 10) {
        this.totalPages = totalPages;
        this.currentPage = currentPage;
        this.rowsPerPage = rowsPerPage;
    }

    renderPagination(onPageChange) {
        const paginationContainer = document.createElement('div');
        paginationContainer.classList.add('pagination');

        const firstButton = this.createButton('First', 1, onPageChange);
        const prevButton = this.createButton('Previous', this.currentPage - 1, onPageChange);

        paginationContainer.appendChild(firstButton);
        paginationContainer.appendChild(prevButton);

        let startPage = Math.max(1, this.currentPage - 2);
        let endPage = Math.min(this.totalPages, startPage + 4);

        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            const button = this.createButton(i, i, onPageChange, i === this.currentPage);
            paginationContainer.appendChild(button);
        }

        const nextButton = this.createButton('Next', this.currentPage + 1, onPageChange);
        const lastButton = this.createButton('Last', this.totalPages, onPageChange);

        paginationContainer.appendChild(nextButton);
        paginationContainer.appendChild(lastButton);

        return paginationContainer;
    }

    createButton(label, page, onPageChange, isActive = false) {
        const button = document.createElement('button');
        button.textContent = label;
        if (isActive) {
            button.classList.add('active');
        }
        if (page < 1 || page > this.totalPages || page === this.currentPage) {
            button.disabled = true;
        }
        button.addEventListener('click', () => onPageChange(page));
        return button;
    }

    setTotalPages(totalPages) {
        this.totalPages = totalPages;
    }

    setCurrentPage(currentPage) {
        this.currentPage = currentPage;
    }
}
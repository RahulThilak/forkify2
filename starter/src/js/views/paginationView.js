import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // Remember the closest() method is little bit like a query selector, but instead for searching down in the tree for children, it basically searches up in the tree. So it looks for parents. And this is important because here in the button, we might actually click on this SPAN element or on this SVG or this USE instead of clicking on the button itself. So we cannot simply set the button to e.target but we actually need to search for the closest button element itself.
      const btn = e.target.closest('.btn--inline');
      // If we click outside of the button then it should return immediately otherwise goTopage will be printed undefined.

      // Guard clause
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      // Only next button
      return `
        <button data-goto="${
          currPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }
    // Last page
    if (currPage === numPages && numPages > 1) {
      return `
        <button  data-goto="${
          currPage - 1
        }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage - 1}</span>
        </button>
    `;
    }
    // Other page
    if (currPage < numPages) {
      // Both prev and next
      return `
            <button  data-goto="${
              currPage - 1
            }"class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage - 1}</span>
        </button>
        <button data-goto="${
          currPage + 1
        }" class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
        </button>
      `;
    }
    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();

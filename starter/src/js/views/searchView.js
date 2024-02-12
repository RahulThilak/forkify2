class searchView {
  _parentEl = document.querySelector('.search');
  // Get the query and listen to the click event
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  //
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }
  //
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      //Always remember when we submit a form we need to first prevent the default action. Because the otherwise the page is going to reload.
      e.preventDefault();
      handler(); // controlSearchResults function
    });
  }
}

// We will not export the class but an instance (object) of the class.
export default new searchView();

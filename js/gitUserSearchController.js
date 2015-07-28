githubUserSearch.controller('GitUserSearchController', ['$resource', function($resource) {
var self = this;
  self.doSearch = function() {
    var searchResource = $resource('https://api.github.com/search/users');
    self.searchResult = searchResource.get(
      { q: self.searchTerm }
    );
  };
}]);

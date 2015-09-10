githubUserSearch.controller('GitUserSearchController', ['UserInfo', function(UserInfo) {
  var self = this;

  self.doSearch = function() {
    UserInfo.query(self.searchTerm)
    .then(function(responses){
      self.searchResult = responses;
    })
  };
}]);

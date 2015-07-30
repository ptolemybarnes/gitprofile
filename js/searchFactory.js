githubUserSearch.factory('Search', ['$http', function($http){
  var queryUrl = 'https://api.github.com/search/users';
  return {
    query: function(searchTerm) {
      return $http({
        url: queryUrl,
        method: 'GET',
        params: {
          'q': searchTerm,
          'access_token': '000b78cf358b659afabc54a0253a13e91969d50c'
        }
      });
    }
  }
}]);

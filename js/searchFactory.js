githubUserSearch.factory('Search', ['$http', function($http){
  var queryUrl = 'https://api.github.com/search/users';
  return {
    query: function(searchTerm) {
      return $http({
        url: queryUrl,
        method: 'GET',
        params: {
          'q': searchTerm,
          'access_token': '11e546dd2886d4799f234523670bc19cee552d2e'
        }
      });
    },
    getUserInfo: function(user_url){
      return $http({
        url: user_url,
        method: 'GET',
        params: {
          'access_token': '11e546dd2886d4799f234523670bc19cee552d2e'
        }
      })
    }
    
  }
}]);

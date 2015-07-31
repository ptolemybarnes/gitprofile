githubUserSearch.factory('UserInfo', ['$http', 'Search', '$q', function($http, Search, $q){
  var getUserInfo = function(user_url){
    return $http({
      url: user_url,
      method: 'GET',
      params: {
        'access_token': '11e546dd2886d4799f234523670bc19cee552d2e'
      }
    })
  };

  var getDataFromResponses = function(responses) {
    return responses.map(function(response) { return response.data})
  }

  var getAllUsers = function(users){
    return users.map(function(user){
      return getUserInfo(user.url)
    })
  }

  return {
    query: function(searchTerm) {
      return Search.query(searchTerm).then(function(response){
        return $q.all(getAllUsers(response.data.items))
      }).then(function(responses){
        return getDataFromResponses(responses)
      })
    }
  };

}])

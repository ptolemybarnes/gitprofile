githubUserSearch.factory('UserInfo', ['$http', 'Search', '$q', function($http, Search, $q){
  var getUserInfo = function(user_url){
    return $http({
      url: user_url,
      method: 'GET',
      params: {
        'access_token': '000b78cf358b659afabc54a0253a13e91969d50c'
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

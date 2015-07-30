describe('factory: UserInfo', function(){
  var userInfo;
  var items = [
    {
      "login": "tansaku",
      "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
      "html_url": "https://github.com/tansaku",
      "numRepos": 56,
      "numFollowers": 59
    }]
    var searchResults = [
      {
      "url": "https://github.com/tansaku"
      }]

  beforeEach(module('GitUserSearch'));

  beforeEach(inject(function(UserInfo) {
    userInfo = UserInfo;
  }));

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend
    httpBackend
      .whenGET("https://api.github.com/search/users?access_token=000b78cf358b659afabc54a0253a13e91969d50c&q=hello")
      .respond(
        { items: searchResults }
      );
    httpBackend
      .whenGET("https://github.com/tansaku?access_token=000b78cf358b659afabc54a0253a13e91969d50c")
      .respond(
        { items: items }
      );
  }));

  it('returns a list of user information related to the search term', function() {
    userInfo.query('hello')
    .then(function(response){
      expect(response).toEqual([{items: items}])
    })
    httpBackend.flush();
  });
})

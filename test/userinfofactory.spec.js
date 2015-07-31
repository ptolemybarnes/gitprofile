describe('factory: UserInfo', function(){
  var userInfo, fakeSearch, q, scope;
  var items = [
    {
      "login": "tansaku",
      "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
      "url": "https://github.com/tansaku",
      "numRepos": 56,
      "numFollowers": 59
    }]
    var searchResults = [
      {
      "url": "https://github.com/tansaku"
      }]

  beforeEach(module('GitUserSearch'));
  beforeEach(function(){
    module(function ($provide) {
     fakeSearch = jasmine.createSpyObj('fakeSearch', ['query']); // here we create and inject a fakeService with a 'query' property
      $provide.factory('Search', function(){
        return fakeSearch;
      });
    });
  });


  beforeEach(inject(function(UserInfo, $q, $rootScope) {
    scope = $rootScope.$new();
    userInfo = UserInfo;
    q = $q;
    fakeSearch.query.and.returnValue(q.when({data: { items: items }})); // returns a "fake" promise
  }));

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend
    httpBackend
      .whenGET("https://github.com/tansaku?access_token=11e546dd2886d4799f234523670bc19cee552d2e")
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
    //scope.apply();
  });
})

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

  beforeEach(module('GitUserSearch'));
  beforeEach(function(){
    module(function ($provide) {
     fakeSearch = jasmine.createSpyObj('fakeSearch', ['query', 'getUserInfo']); // here we create and inject a fakeService with a 'query' property
      $provide.factory('Search', function(){
        return fakeSearch;
      });
    });
  });


  beforeEach(inject(function(UserInfo, $q, $rootScope) {
    scope = $rootScope;
    userInfo = UserInfo;
    q = $q;
    fakeSearch.query.and.returnValue(q.when({data: { items: items }})); // returns a "fake" promise
    fakeSearch.getUserInfo.and.returnValue(q.when({data: { items: items }})); // returns a "fake" promise
  }));

  it('returns a list of user information related to the search term', function() {
    userInfo.query('hello')
    .then(function(response){
      expect(response).toEqual([{items: items}])
    })
    scope.$apply();
  });
})

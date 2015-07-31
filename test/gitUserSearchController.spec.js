describe('GitUserSearchController', function() {
  beforeEach(module('GitUserSearch'));
  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('GitUserSearchController');
  }));

  it('intialises with an empty search result and term', function() {
    expect(ctrl.searchResult).toBeUndefined();
    expect(ctrl.searchTerm).toBeUndefined();
  });
});

describe('when searching for a user', function() {
  beforeEach(module('GitUserSearch'));
  var httpBackend;
  var ctrl;
  var fakeUserInfo;
  var scope;
  beforeEach(function(){
    module(function ($provide) {
     fakeUserInfo = jasmine.createSpyObj('fakeUserInfo', ['query']); // here we create and inject a fakeService with a 'query' property
      $provide.factory('UserInfo', function(){
        return fakeUserInfo;
      });
    });
  });

  beforeEach(inject(function ($q, $rootScope) {
    scope = $rootScope;
    fakeUserInfo.query.and.returnValue({then: function(call) {call(items)}}); // returns a "fake" promise
  }));

  beforeEach(inject(function($controller) {
    ctrl = $controller('GitUserSearchController');
  }));
  var items = [
    {
      "login": "tansaku",
      "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
      "url": "https://github.com/tansaku"
    }
  ];

  it('displays search results', function() {
    ctrl.searchTerm = 'hello';
    ctrl.doSearch();
//    scope.$apply();
    console.log(ctrl.searchResult)
    expect(ctrl.searchResult).toEqual(items);
  });
});

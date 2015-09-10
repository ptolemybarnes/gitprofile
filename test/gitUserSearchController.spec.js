describe('GitUserSearchController', function() {
  beforeEach(module('GitUserSearch')); // loads the angular module
  var httpBackend, ctrl, fakeUserInfo, rootScope;

  // this is v v bad
  //
//  beforeEach(function(){
//    module(function($provide) { // does something different to the above
//    fakeUserInfo = jasmine.createSpyObj('fakeUserInfo', ['query']); // here we create and inject a fakeService with a 'query' property
//      $provide.factory('UserInfo', function(){
//        return fakeUserInfo;
//      });
//    });
//  });
//

  // this is a bit nicer
  beforeEach(function() {
    fakeUserInfo = jasmine.createSpyObj('fakeUserInfo', ['query']); // here we create and inject a fakeService with a 'query' property
    module( { UserInfo: fakeUserInfo } );
  });
  
  beforeEach(inject(function($controller, $q, $rootScope) { // can't happen before the call to module. This isn't (?) doing stuff in the background. It's just giving you stuff.
    ctrl      = $controller('GitUserSearchController');
    rootScope = $rootScope;
    fakeUserInfo.query.and.returnValue($q.when(items)); // returns a "fake" promise
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
    rootScope.$digest(); // triggers the scope digest.
    expect(ctrl.searchResult).toEqual(items);
  });
});


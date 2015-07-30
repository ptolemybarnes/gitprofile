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

  beforeEach(inject(function ($httpBackend) {
    httpBackend = $httpBackend
    httpBackend
      .expectGET("https://api.github.com/search/users?access_token=bc30b02f285326683292881a58e2131572099fac&q=hello")
      .respond(
        { items: items }
      );
      httpBackend
        .whenGET("https://github.com/tansaku?access_token=bc30b02f285326683292881a58e2131572099fac")
        .respond(
          items[0]
        );
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });



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
    httpBackend.flush();
    expect(ctrl.searchResult).toEqual(items);
  });
});

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
      .expectGET("https://api.github.com/search/users?q=hello")
      .respond(
        { items: items }
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
      "html_url": "https://github.com/tansaku"
    },
    {
      "login": "stephenlloyd",
      "avatar_url": "https://avatars.githubusercontent.com/u/196474?v=3",
      "html_url": "https://github.com/stephenlloyd"
    }
  ];

  it('displays search results', function() {
    ctrl.searchTerm = 'hello';
    ctrl.doSearch();
    httpBackend.flush();
    expect(ctrl.searchResult.items).toEqual(items);
  });
});

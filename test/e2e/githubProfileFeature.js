describe('Github profile finder', function() {
  var searchBox = element(by.model('searchCtrl.searchTerm'))
  var searchButton = element(by.className('btn'))

  beforeEach(function(){
    browser.get('http://localhost:8080');
  })

  it('has a title', function() {


    expect(browser.getTitle()).toEqual('Github user search');
  });
  it ('finds one profile', function(){
    searchBox.sendKeys('spike');
    searchButton.click();
    var profiles = element.all(by.repeater('user in searchCtrl.searchResult.items'))
    var list = element.all(by.css('ul li'));
      expect(list.last().getText()).toEqual(profiles.last().getText());
  });



});

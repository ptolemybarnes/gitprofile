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

  it ('each returned item should have an image', function(){
    searchBox.sendKeys('spike');
    searchButton.click();
    var counts;
    element.all(by.repeater('user in searchCtrl.searchResult.items')).count().then(function(count) {
      counts = count
    var image = element.all(by.css('img'));
    expect(image.count()).toEqual(counts);
    });
  })
  it ('each returned item should have a link', function(){
    searchBox.sendKeys('spike');
    searchButton.click();
    var counts;
    element.all(by.repeater('user in searchCtrl.searchResult.items')).count().then(function(count) {
      counts = count
    var link = element.all(by.css('ul a'));
    expect(link.count()).toEqual(counts);
    });
  });
});

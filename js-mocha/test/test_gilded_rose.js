var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  it("works with empty shop", function() {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items.length).to.equal(0);
  });

  it("Quality normally goes down", function() {
    const gildedRose = new Shop([ new Item("foo", 3, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(29);
  })

  it("Quality goes down faster when sellin at 0", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 5) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(3);
  });

  it("Quality goes normal rate when sellin below 0", function() {
    const gildedRose = new Shop([ new Item("foo", -1, 5) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(3);
  });


  it("Quality goes down to 0", function() {
    const gildedRose = new Shop([ new Item("foo", -1, 1) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  })

  it("Quality doesn't go below 0", function() {
    const gildedRose = new Shop([ new Item("foo", -1, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  })

});

describe("Backstage passes to a TAFKAL80ETC concert", function() {

  it("quality does not change when above 50", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 12, 51) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(51);
  })

  it("quality does not change when at 50", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  })

  it("quality increases when below 50 and sellin above 11", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 12, 49) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  })

  it("quality increases when below 50 and sellin at 11", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 11, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(31);
  })

  it("quality increases more when below 50 and sellin between 6 and 11", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 6, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(32);
  })

  it("quality increases even more when below 50 and sellin below 5", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 1, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(33);
  })

  it("quality caps at 50 when sellin below 5", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  })

  it ("quality hits zero when sellin below 0", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", -1, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  })
})


describe("Aged Brie", function() {
  it("quality increases when sellin is below 0", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", -1, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(32);
  })

  it("quality increases when sellin is at 0", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 0, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(32);
  })


  it("quality does not increase when sellin is below 0 and quality at 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", -1, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  })

  it("quality does not increase when sellin is at 1 and quality at 40", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 1, 40) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(41);
  })

  it("quality does not increase when sellin is at 0 and quality at 40", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 0, 40) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(42);
  })

  it("quality does not increase when sellin is below 0 and quality at 40", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", -1, 40) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(42);
  })

  it("quality does not increase when sellin is at 1 and quality at 55", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 1, 55) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(55);
  })

  it("quality does not increase when sellin is at 0 and quality at 55", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 0, 55) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(55);
  })

  it("quality does not increase when sellin is below 0 and quality at 55", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", -1, 55) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(55);
  })
})

describe("Sulfuras, Hand of Ragnaros", function() {
  it("quality never decreases", function() {
    const gildedRose = new Shop([ 
      new Item("Sulfuras, Hand of Ragnaros", -1, 30),
      new Item("Sulfuras, Hand of Ragnaros", 5, 30),
      new Item("Sulfuras, Hand of Ragnaros", 10, 30),
      new Item("Sulfuras, Hand of Ragnaros", 100, 30),
     ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(30);
    expect(items[1].quality).to.equal(30);
    expect(items[2].quality).to.equal(30);
    expect(items[3].quality).to.equal(30);
  })

  it("sellin never decreases", function() {
    const gildedRose = new Shop([ 
      new Item("Sulfuras, Hand of Ragnaros", -1, 30),
      new Item("Sulfuras, Hand of Ragnaros", 5, 30),
      new Item("Sulfuras, Hand of Ragnaros", 10, 30),
      new Item("Sulfuras, Hand of Ragnaros", 100, 30),
     ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[1].sellIn).to.equal(5);
    expect(items[2].sellIn).to.equal(10);
    expect(items[3].sellIn).to.equal(100);
  })
})
class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  increaseQuality() {
    if (this.quality >= 50) return

    this.quality = this.quality + 1;
  }

  decreaseQuality() {
    if (this.quality <= 0) return

    this.quality = this.quality - 1;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (const item of this.items) {
      if (item.name == "Sulfuras, Hand of Ragnaros") continue;
      item.sellIn = item.sellIn - 1;

      if (item.name == "Aged Brie") {
        item.increaseQuality()
        if (item.sellIn < 0) {
          item.increaseQuality()
        }
        continue;
      }

      if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
        if (item.sellIn < 0) {
          item.quality = 0;
          continue;
        }
        
        item.increaseQuality()

        if (item.sellIn < 10) {
          item.increaseQuality()
        }
        if (item.sellIn < 5) {
          item.increaseQuality()
        }
        continue;
      }

      item.decreaseQuality()

      if (item.sellIn < 0) {
        item.decreaseQuality()
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop,
};

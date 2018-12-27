const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),
'data',
'products.json'
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, function(err, filecontent) {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(filecontent));
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFileSync(p, JSON.stringify(products), function(err) {
        console.log(err);
      });
    });
  };

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
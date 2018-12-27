const path = require('path');

const rootDir = require('./util/path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(rootDir, 'public')));


app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use(function(req,res) {
  res.status(404).render('404', {
    pageTitle: 'Page Not Found',
    path: null
  });
});

app.listen(3000);

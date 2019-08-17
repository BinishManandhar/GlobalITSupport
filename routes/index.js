var express = require('express');
var router = express.Router();
var cpu = require('../model/cpu');
var memory = require('../model/memory');
var hdd = require('../model/hdd');
var os = require('../model/os');
var graphics = require('../model/graphics');
var laptop = require('../model/laptops');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Aadarsh Manandhar' });
});

router.get('/laptop/:slug?', function (req, res, next) {
  laptop.getLaptops(req, res, function (result) {
    res.render('laptopList', { data: result, where: req.params.slug });
  });
});

router.get('/laptop/add/:slug?', function (req, res, next) {
  var slug = req.params.slug;
  var c;
  var m;
  var hd;
  var o;
  var g;
  cpu.getCPU(function (result, err) {
    if (result && !err)
      c = result;
    memory.getMemory(function (result, err) {
      if (result && !err)
        m = result;
      hdd.getHDD(function (result, err) {
        if (result && !err)
          hd = result;
        os.getOS(function (result, err) {
          if (result && !err)
            o = result;
          graphics.getGraphics(function (result, err) {
            if (result && !err)
              g = result;
            if (slug == "ASUS") {
              res.render('addLaptop', { where: 'ASUS', cpu: c, memory: m, hdd: hd, os: o, graphics: g });
            }
            else if (slug == "Dell") {
              res.render('addLaptop', { where: 'Dell', cpu: c, memory: m, hdd: hd, os: o, graphics: g });
            }
            else if (slug == "HP") {
              res.render('addLaptop', { where: 'HP', cpu: c, memory: m, hdd: hd, os: o, graphics: g });
            }
            else if (slug == "Acer") {
              res.render('addLaptop', { where: 'Acer', cpu: c, memory: m, hdd: hd, os: o, graphics: g });
            }
            else if (slug == "Toshiba") {
              res.render('addLaptop', { where: 'Toshiba', cpu: c, memory: m, hdd: hd, os: o, graphics: g });
            }
            else if (slug == "MSI") {
              res.render('addLaptop', { where: 'MSI', cpu: c, memory: m, hdd: hd, os: o, graphics: g });
            }
          });
        });
      });
    });
  });
});

router.get('/specifications', function (req, res, next) {
  res.render('specifications', { where: 'Specifications' });
});

router.post('/specifications/:slug?', function (req, res, next) {
  var spec = req.params.slug;
  if (spec == "CPU") {
    cpu.enterCPU(req, res, function (spec, err) {
      if (!err) {
        console.log("Inserted CPU");
        res.redirect('/index/specifications');
      }
      else {
        console.log(err);
      }
    });
  }
  else if (spec == "Memory")
    memory.enterMemory(req, res, function (spec, err) {
      if (!err) {
        console.log("Inserted Memory");
        res.redirect('/index/specifications');
      }
      else {
        console.log(err);
      }
    });
  else if (spec == "HDD")
    hdd.enterHDD(req, res, function (spec, err) {
      if (!err) {
        console.log("Inserted HDD");
        res.redirect('/index/specifications');
      }
      else {
        console.log(err);
      }
    });
  else if (spec == "OS")
    os.enterOS(req, res, function (spec, err) {
      if (!err) {
        console.log("Inserted OS");
        res.redirect('/index/specifications');
      }
      else {
        console.log(err);
      }
    });
  else if (spec == "Graphics")
    graphics.enterGraphics(req, res, function (spec, err) {
      if (!err) {
        console.log("Inserted Graphics");
        res.redirect('/index/specifications');
      }
      else {
        console.log(err);
      }
    });

});

router.post('/laptop/create/:slug?', function (req, res, next) {
  var brand = req.params.slug;
  req.body.LaptopName = brand;
  laptop.enterLaptop(req, res, function (result, err) {
    if (!err)
      res.redirect('/index/laptop/' + brand);
  });
});

router.get('/laptop/desc/:slug?', function (req, res, next) {
  laptop.findLaptop(req, res, function (result, err) {
    res.render('laptopDescription', { data: result })
  });
});

router.get('/laptop/delete/:brand?/:slug?', function (req, res, next) {
  laptop.deleteLaptop(req, res, function (result, err) {
    if (!err && result)
      res.redirect('/index/laptop/' + req.params.brand);
  });
});

module.exports = router;
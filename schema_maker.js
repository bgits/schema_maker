/**
 * Generate a simple sitemap that can be submited to google. A sitemap can only have 50,000 lines
 * so it must be split in multiple files if larger than 50k links. This generator only work if routes
 * are indexed in numeric and sequntial order. Change constructors to reflect site url structure.
 */
var fs = require('fs');
var stream = fs.createWriteStream("sitemap.txt");
var siteList = [];
var count = 0;
var mapNumber = 0;
var maxSize = 50000;

var createArray = function(){
  for(i=1; i < 18495;i++){ //number of companies.
    var constructor = "http://padranker.com/view/company/"+ i +"\n";
    siteList.push(constructor);
  }

  for(var i = 1; i < 371968; i++) { //number of buildings
    var constructor = "http://padranker.com/view/building/"+ i +"\n"
    siteList.push(constructor);
  }
};

stream.once('open', function(fd){
  createArray();

  for(i=0; i < siteList.length;i++){
    if (count < maxSize){
      count++;
      stream.write(siteList[i]);
    } else {
      count = 0;
      mapNumber++;
      var constructor = "sitemap"+mapNumber+".txt";
      stream = fs.createWriteStream(constructor);
    }
  }
  stream.end;
});

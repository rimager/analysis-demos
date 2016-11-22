var express = require("express");
var app     = express();
var path    = require("path");

//serve images, CSS files, and JavaScript files in a directory named public:
app.use(express.static('public'));

app.set('port', (process.env.PORT || 5000));


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
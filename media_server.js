const express = require('express');
const app = express();
const port = process.env.PORT || 8080;


// ----------------- Conexion a base de datos ---------------------------------------

const mongodb_uri = process.env.MONGODB_URI || 'mongodb://heroku_6z92px8v:tntp2l48id2sbk2rffn715iejf@ds241658.mlab.com:41658/heroku_6z92px8v'

const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4, // Use IPv4, skip trying IPv6
  useUnifiedTopology: true
};

mongoose.connect(mongodb_uri, options).catch(err => {
  console.error.bind(console, err);
}
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose connection error:'));
db.once('open', function() {
  console.log('We are connected to Mongo db with Mongoose');
  
  const videoSchema = new mongoose.Schema({
    url: String,
    name: String
  });

  const Videos = mongoose.model('Videos', videoSchema);

  const new_video = new Videos({ 
    url: 'chotuve.com/watch/ejemplo',
    name: 'Nombre de ejemplo de video en base de datos' 
  });

  console.log('Video name on db: ' + new_video.name);

  new_video.save(function (err, video) {
    if (err) return console.error(err);
    console.log("new video saved");
  });

});

// ----------------- Conexion a la pagina ----------------------------


app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(port, function() {
  console.log(`Example app listening at http://localhost:${port}`);
});

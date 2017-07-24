const express = require('express');
const app = express();

app.use(express.static('public/'));

app.listen(process.env.PORT || 8000, function() {
  console.log("Listening on port 8000");
});

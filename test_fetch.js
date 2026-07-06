const https = require('https');

https.get('https://images.unsplash.com/random/800x600?coding', (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Location Header:', res.headers.location);
});

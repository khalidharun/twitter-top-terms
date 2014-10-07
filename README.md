# twitter-top-terms

Tabulates the top terms form a Twitter Stream.  This app is build with AngularJS and Node.js.

## Installation

```
git clone https://github.com/khalidharun/twitter-top-terms.git
cd twitter-top-terms
npm install
bower install
```

## Configuration

In order for this Twitter stream to function, you will need a Twitter API keys.  Make a config.js in the main directory based on config-example.js and fill it in with your API keys.

``` javascript
var config = {
  consumer_key: 'XXXXXXX',
  consumer_secret: 'YYYYYYY',
  access_token_key: 'XXXXXXX',
  access_token_secret: 'YYYYYYYY'
};

module.exports = config;
```

## Run

### `npm start`

App will be accessable through your brower at http://localhost:9000

## Tests

### `npm run test-server`

Runs unit tests for the backend are run using jasmine-node.  It runs server/topTerms_spec.js, which tests to make sure the logic of calculating the top terms is correct.

### `npm run watch-server`

Runs server test upon changes in server-side code.

### `npm run test-client`

The client side code test are run using Karma.  These test make sure the AngularJS controllers logic is correct.

### `npm run watch-client`

Runs client side tests upon changes in the client-side code.


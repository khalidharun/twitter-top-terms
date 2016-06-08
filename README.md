# twitter-top-terms

Tabulates the top terms form a Twitter Stream.  This app is build with AngularJS and Node.js.  Tests are run using `jasmine-node` for backend and `karma` for front-end.

## Step 1: Requirements

You'll need to have `nodejs` and `npm` installed on your machine.  You should also have the following npm packages installed globally:
- `bower` 
- `karma` 
- `jasmine-node`

If you don't already, then just run:

`npm install -g bower karma jasmine-node`

## Step 2: Installation

Open up your terminal to your working directory where you want to install the app and run the following commands.

```
git clone https://github.com/khalidharun/twitter-top-terms.git
cd twitter-top-terms
npm run build
```

## Step 3: Configuration

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

## Step 4: Run

### `npm start`

App will be accessable through your brower at http://localhost:9000

## Step 5: Tests

### `npm run test-server`

Runs unit tests for the backend are run using jasmine-node.  It runs server/topTerms_spec.js, which tests to make sure the logic of calculating the top terms is correct.

### `npm run watch-server`

Runs server test upon changes in server-side code.

### `npm run test-client`

The client side code test are run using Karma.  These test make sure the AngularJS controllers logic is correct.

### `npm run watch-client`

Runs client side tests upon changes in the client-side code.


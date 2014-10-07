# twitter-top-terms

Tabulates the top terms form a Twitter Stream.  This app is build with AngularJS and nodejs.n


## Instructions

*Step 1.* Configuration: Copying config-example.js into config.js and replace with your Twitter API credentials

*Step 2.* Start Server: `npm start`

*Step 3.* Open app on browser: http://localhost:9000

## Tests

### `npm run test-server`

Runs unit tests for the backend are run using jasmine-node.  It runs server/topTerms_spec.js, which tests to make sure the logic of calculating the top terms is correct.

### `npm run watch-server`

Runs server test upon changes in server-side code.

### `npm run test-client`

The client side code test are run using Karma.  These test make sure the AngularJS controllers logic is correct.

### `npm run watch-client`

Runs client side tests upon changes in the client-side code.


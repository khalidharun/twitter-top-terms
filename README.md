twitter-top-terms
=================

Instructions
-----------
1. Install dependencies: `npm run-script build`
1. Configuration: Copying config-example.js into config.js and enter your Twitter API credentials
1. Run Tests: `npm test`
1. Start Server: `npm start`
1. Open app on browser: http://localhost:9000

Tests
------

`npm run test-server'
---------------------

backend tests are run using jasmine-node.  This is a simple test to make sure the logic of calculating the top terms is correct.


`npm run test-client'
---------------------
The client side code test are run using Karma.  These test make sure the AngularJS controllers logic is correct.



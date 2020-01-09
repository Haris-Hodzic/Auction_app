'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'auction-app-front',
    environment,
    rootURL: '/',
    locationType: 'auto',
    firebase: {
      apiKey: "AIzaSyCiA19GRqSvHj21uolTLCBJMV2wu0URW-A",
      authDomain: "auctionapp-43a0c.firebaseapp.com",
      databaseURL: "https://auctionapp-43a0c.firebaseio.com",
      projectId: "auctionapp-43a0c",
      storageBucket: "auctionapp-43a0c.appspot.com",
      messagingSenderId: "987955105263",
      appId: "1:987955105263:web:91dbcb13d4eb8a7adf3a1a",
      measurementId: "G-V93MR1704G"
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    websockets: {
        //REQUIRED - the endpoint url used to make the socket connection,
        //typically this is an endpoint on the app's main API host
        baseURL: 'http://localhost:8080/ws',
        //the name of the request header sent in all AJAX requests
        //that uniquely identify the originating browser/client
        clientUUIDHeader: 'x-client-uuid',
        //the global socket channel path for app-wide socket events
        //if there is no global channel, set this to false
        globalChannel: '/topic/global',
        //the name of the property in ember-data models that hold
        //the date the record was last modified. used by ModelSocketEventMixin
        //to determine if received model data should be pushed into the store
        //set to false to disable this behavior
        modelDateField: 'dateModified',
        //display verbose sock.js logs in the dev tools console
        debug: true,
        //user must have an authenticated session to connect
        requiresAuth: true,
        //the intervals at which successive reconnect attempts
        //are made when the socket is disconnected
        reconnectDelaySteps: [1000, 2000, 5000, 10000, 30000, 60000]
      },

      APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };
  ENV['ember-simple-auth'] = {
    authenticationRoute: 'login',
    routeAfterAuthentication: 'dashboard',
    authorizer: 'authorizer:token',
    crossOriginWhitelist: ['*']
  };
  ENV['ember-simple-auth-token'] = {
  tokenDataPropertyName: 'tokenData', // Key in session to store token data
  refreshAccessTokens: true, // Enables access token refreshing
  tokenExpirationInvalidateSession: true,
  authorizationHeaderName: 'Authorization', // Header name added to each API request
  authorizationPrefix: 'Bearer ', // Prefix added to each API request
  refreshAccessTokens: true,
  serverTokenEndpoint: 'http://localhost:8080/authentication/login', // Enables session invalidation on token expiration
  serverTokenRefreshEndpoint: 'http://localhost:8080/authentication/login', // Server endpoint to send refresh request
  refreshTokenPropertyName: 'refresh_token', // Key in server response that contains the refresh token
  tokenExpireName: 'exp', // Field containing token expiration
  refreshLeeway: 0 // Amount of time to send refresh request before token expiration
};
if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.SERVER_URL = 'http://localhost:8080'
    ENV.stripe = {
      publishableKey: 'pk_test_ZKJ462EIJXGrwgTSCfy2dzZF00A3kiYrAn',
      lazyLoad: true
    };
  }


  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};

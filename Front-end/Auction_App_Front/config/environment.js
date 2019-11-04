'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'auction-app-front',
    environment,
    rootURL: '/',
    locationType: 'auto',
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

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };
ENV['ember-simple-auth-token'] = {
  tokenDataPropertyName: 'tokenData', // Key in session to store token data
  identificationField: 'email',
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
  }
 /*
// config/environment.js
ENV['ember-simple-auth-token'] = {
   authorizationHeaderName: 'Authorization', // Header name added to each API request
  authorizationPrefix: 'Bearer ', // Prefix added to each API request
  serverTokenEndpoint: 'http://localhost:8080/authentication/login', // Server endpoint to send authenticate request
  tokenPropertyName: 'token', // Key in server response that contains the access token
  headers: {}, // Headers to add to the
  refreshAccessTokens: true,
  refreshLeeway: 300 // refresh 5 minutes (300 seconds) before expiration
};
ENV['simple-auth'] = {
    authorizer: 'simple-auth-authorizer:token'
  };*/


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
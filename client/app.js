angular.module('MyApp', ['ngResource', 'ngMessages', 'ui.router', 'mgcrea.ngStrap', 'satellizer'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl'
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          authenticated: function($location, $auth) {
            if (!$auth.isAuthenticated()) {
              return $location.path('/login');
            }
          }
        }
      });

    $urlRouterProvider.otherwise('/');

    $authProvider.loginOnSignup = true;
$authProvider.loginRedirect = '/';
$authProvider.logoutRedirect = '/';
$authProvider.signupRedirect = '/login';
$authProvider.loginUrl = '/auth/login';
$authProvider.signupUrl = '/auth/signup';
$authProvider.loginRoute = '/login';
$authProvider.signupRoute = '/signup';
$authProvider.tokenName = 'token';
$authProvider.tokenPrefix = 'satellizer'; // Local Storage name prefix
$authProvider.unlinkUrl = '/auth/unlink/';
$authProvider.authHeader = 'Authorization';

// Facebook
$authProvider.facebook({
  url: '/auth/facebook',
  authorizationEndpoint: 'https://www.facebook.com/dialog/oauth',
  redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host + '/',
  scope: 'email',
  scopeDelimiter: ',',
  requiredUrlParams: ['display', 'scope'],
  display: 'popup',
  type: '2.0',
  popupOptions: { width: 481, height: 269 }
});

// Google
$authProvider.google({
  url: '/auth/google',
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
  redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
  scope: ['profile', 'email'];
  scopePrefix: 'openid';
  scopeDelimiter: ' ',
  requiredUrlParams: ['scope'],
  optionalUrlParams: ['display'],
  display: 'popup',
  type: '2.0',
  popupOptions: { width: 452, height: 633 }
});

// LinkedIn
$authProvider.linkedin({
  url: '/auth/linkedin',
  authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
  redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
  requiredUrlParams: ['state'],
  scope: [],
  scopeDelimiter: ' ',
  state: 'STATE',
  type: '2.0',
  popupOptions: { width: 527, height: 582 }
});

// Twitter
$authProvider.twitter({
  url: '/auth/twitter',
  type: '1.0',
  popupOptions: { width: 495, height: 645 }
});

// GitHub
$authProvider.github({
  url: '/auth/github',
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
  scope: [],
  scopeDelimiter: ' ',
  type: '2.0',
  popupOptions: { width: 1020, height: 618 }
});

// Windows Live
$authProvider.live: {
  url: '/auth/live',
  authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
  redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
  scope: ['wl.basic'],
  scopeDelimiter: ' ',
  requiredUrlParams: ['display', 'scope'],
  display: 'popup',
  type: '2.0',
  popupOptions: { width: 500, height: 560 }
}

// OAuth 2.0
$authProvider.oauth2({
  url: null,
  name: null,
  scope: null,
  scopeDelimiter: null,
  clientId: null,
  redirectUri: null,
  popupOptions: null,
  authorizationEndpoint: null,
  requiredUrlParams: null,
  optionalUrlParams: null,
  defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
  responseType: 'code'
});

// OAuth 1.0
$authProvider.oauth1({
  url: null,
  name: null,
  popupOptions: null
});

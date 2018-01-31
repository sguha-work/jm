app.config(function facebookConfig (facebookConfigProvider) {
  facebookConfigProvider.setAppId(207348272805163);
  facebookConfigProvider.setLanguage('en-US');
  facebookConfigProvider.setDebug(true);

  // When autoInit is setted to false you need to initialize
  // the facebookConfig service manually inside a run block.
  facebookConfigProvider.autoInit(false);

  // Same: developers.facebook.com/docs/javascript/reference/FB.init/
  facebookConfigProvider.setOptions({
    status: true
  });
})
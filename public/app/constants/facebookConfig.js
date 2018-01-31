app.run(function appRunner(facebookConfig) {
  // Only need when auto initialization is disabled
  // using facebookConfigProvider.autoInit(false)
  facebookConfig.init().then(function(){
    console.log('Facebook SDK is loaded.');
  });
})
app.run(function (facebookService) {
  facebookService.ready.then(function () {
    var statusHandler = function (response) {
      if (response.status === 'connected') {
        facebookService.api('/me').then(function (response) {
          console.log(response);
        });
      }
    };

    facebookService.Event.subscribe('auth.statusChange', statusHandler);
  });
})
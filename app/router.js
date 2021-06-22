module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.post('/', controller.home.index);
  };
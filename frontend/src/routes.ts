const routes = {
  home: {
    getRoute() {
      return '/';
    },
  },
  login: {
    getRoute() {
      return '/login';
    },
  },
  logout: {
    getRoute() {
      return '/logout';
    },
  },
  info: {
    getRoute() {
      return '/info';
    },
  },
};

export default routes;

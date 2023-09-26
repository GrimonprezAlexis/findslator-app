export const environment = {
  production: false,
  auth0: {
    domain: 'dev-eb1e42mtryz52uyb.us.auth0.com',
    clientId: 'WRJFNO7DnMl5ioqacj6enmKnB2nMqyzm',
    authorizationParams: {
      audience: 'https://dev-eb1e42mtryz52uyb.us.auth0.com/api/v2/',
      redirect_uri: 'http://localhost:4200/callback',
    },
    errorPath: '/callback',
  },
  api: {
    serverUrl: 'http://localhost:6060',
  },
};

export const environment = {
  production: false,
  auth: {
    domain: 'dev-georgelatsev-v0.eu.auth0.com',
    clientId: 'N1jLbxKdEJ8m69wp3J4mUTx2j0SHsaO9'
  },
  apiUrls: {
    usersApi: 'http://localhost:5100',
    notificationsApi: 'http://localhost:5101'
  },
  authAudiences: {
    usersApi: 'localhost:5100',
    notificationsApi: 'localhost:5101'
  }
};
export default () => ({
  env: process.env.NODE_ENV ?? 'local',
  port: process.env.PORT || 3000,
  id24TokenPublicKey: process.env.ID24_TOKEN_PUBLIC_KEY,
});

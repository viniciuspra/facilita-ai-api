module.exports = {
  apps : [{
    name: "app",
    script: "build/server.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
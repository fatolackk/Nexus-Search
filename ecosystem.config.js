module.exports = {
  apps: [{
    name: 'nexus-search-engine',
    script: 'tsx',
    args: 'server.ts',
    cwd: './',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      DOMAIN: 'your-domain.com'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M'
  }]
}
// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true, // Add this line to avoid SQLite warnings
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: 'localhost', // Specify the host
      database: 'Assignment4',
      user:     'avav3',
      password: 'toulouse'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: 'localhost', // Specify the host
      database: 'Assignment4',
      user:     'avav3',
      password: 'toulouse'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

const app = require('./app');
const config = require('./config');
const { sequelize } = require('./models');
const logger = require('./utils/logger');

const startServer = async () => {
  try {
    // Test DB connection
    await sequelize.authenticate();
    logger.info('Database connection established successfully.');

    // Sync models (in development; use migrations in production)
    if (config.app.env === 'development') {
      await sequelize.sync({ alter: false });
      logger.info('Models synchronized.');
    }

    // Start server
    const PORT = config.app.port;
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📚 API Docs: http://localhost:${PORT}/api-docs`);
      logger.info(`💚 Health: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! Shutting down...', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...', err);
  process.exit(1);
});

startServer();

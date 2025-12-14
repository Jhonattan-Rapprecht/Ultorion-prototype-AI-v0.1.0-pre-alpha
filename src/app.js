import express from 'express';
import routes from './routes/index.js';
import { errorHandler } from './utils/errorHandler.js';

const app = express();
app.use(express.json());

// Load all routes
app.use('/api', routes);

// Error handler
app.use(errorHandler);

export default app;

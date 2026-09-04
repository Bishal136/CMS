import { Router } from 'express';
import { HomeController } from '../controllers/home.controller';
import { authenticate } from '../middleware/auth.middleware';

export const homeRoutes = Router();

// All home routes require authentication
homeRoutes.use(authenticate);

homeRoutes.get('/', HomeController.getHomeDashboard);
homeRoutes.get('/dashboard', HomeController.getHomeDashboard);
homeRoutes.get('/stats', HomeController.getHomeStats);

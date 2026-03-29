import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema';

const router = Router();

// Apply auth to all task routes
router.use(authMiddleware);

router.get('/', taskController.getTasks);
router.post('/', validate(createTaskSchema), taskController.createTask);
router.put('/:id', validate(updateTaskSchema), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
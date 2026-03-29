import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user?.id }
    });
    res.json(tasks);
    return; // Added return
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
    return; // Added return
  }
};

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, content, priority } = req.body;
  
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        content: content || null, 
        priority: priority || 'MEDIUM',
        userId: req.user.id
      }
    });
    res.status(201).json(task);
    return;
  } catch (error) {
    // If 'content' still errors here, change the key name to match your prisma schema
    res.status(400).json({ message: "Error creating task" });
    return;
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const updatedTask = await prisma.task.updateMany({
      where: { 
        id: Number(id), 
        userId: req.user.id 
      },
      data: req.body
    });

    if (updatedTask.count === 0) {
      res.status(404).json({ message: "Task not found or unauthorized" });
      return;
    }
    
    res.json({ message: "Task updated successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
    return;
  }
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const deleted = await prisma.task.deleteMany({
      where: { 
        id: Number(id), 
        userId: req.user.id 
      }
    });

    if (deleted.count === 0) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    
    res.status(204).send();
    return;
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
    return;
  }
};
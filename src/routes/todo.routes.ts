import { Router, type Request, type Response } from 'express';
import { AppDataSource } from '../data-source.js';
import { Todo } from '../entity/Todo.js';

const router = Router();
const todoRepository = AppDataSource.getRepository(Todo);

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - isActive
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated UUID of the todo
 *         title:
 *           type: string
 *           description: The title of the todo
 *         description:
 *           type: string
 *           description: The description of the todo
 *         isActive:
 *           type: boolean
 *           description: Whether the todo is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update timestamp
 *     CreateTodoRequest:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - isActive
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the todo
 *         description:
 *           type: string
 *           description: The description of the todo
 *         isActive:
 *           type: boolean
 *           description: Whether the todo is active
 *     UpdateTodoRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the todo
 *         description:
 *           type: string
 *           description: The description of the todo
 *         isActive:
 *           type: boolean
 *           description: Whether the todo is active
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of all todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Internal server error
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const todos = await todoRepository.find({
      order: { createdAt: 'DESC' },
    });
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: The todo found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    const todo = await todoRepository.findOne({ where: { id } });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTodoRequest'
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, isActive } = req.body;

    if (!title || !description || typeof isActive !== 'boolean') {
      return res.status(400).json({
        error: 'Title, description, and isActive are required',
      });
    }

    const todo = todoRepository.create({
      title,
      description,
      isActive,
    });

    const savedTodo = await todoRepository.save(todo);
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTodoRequest'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    const { title, description, isActive } = req.body;

    const todo = await todoRepository.findOne({ where: { id } });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    if (title !== undefined) {
      todo.title = title;
    }
    if (description !== undefined) {
      todo.description = description;
    }
    if (typeof isActive === 'boolean') {
      todo.isActive = isActive;
    }

    const updatedTodo = await todoRepository.save(todo);
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    const todo = await todoRepository.findOne({ where: { id } });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    await todoRepository.remove(todo);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

export default router;

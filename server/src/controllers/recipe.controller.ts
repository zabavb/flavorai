import { Request, Response } from 'express';
import * as service from '../services/recipe.service';

const defaultError = 'Something went wrong. Please try again later.';

export async function create(req: Request, res: Response) {
  try {
    const result = await service.createRecipe((req as any).user.userId, req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : defaultError });
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const result = await service.getAllRecipes(req.query.search as string);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : defaultError });
  }
}

export async function getMine(req: Request, res: Response) {
  try {
    const result = await service.getMyRecipes((req as any).user.userId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : defaultError });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const result = await service.updateRecipe(req.params.id, (req as any).user.userId, req.body);
    res.json(result);
  } catch (err) {
    res.status(403).json({ error: err instanceof Error ? err.message : defaultError });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const result = await service.deleteRecipe(req.params.id, (req as any).user.userId);
    res.json(result);
  } catch (err) {
    res.status(403).json({ error: err instanceof Error ? err.message : defaultError });
  }
}

export async function rate(req: Request, res: Response) {
  try {
    const rating = Number(req.body.rating);
    if (rating < 1 || rating > 5)
      return res.status(400).json({ error: 'Invalid rating' });

    const result = await service.rateRecipe(req.params.id, rating);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : defaultError });
  }
}

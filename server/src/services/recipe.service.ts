import prisma from '../prisma/client';

export async function createRecipe(userId: string, data: any) {
  return prisma.recipe.create({
    data: {
      ...data,
      authorId: userId
    }
  });
}

export async function getAllRecipes(search?: string) {
  return prisma.recipe.findMany({
    where: search ? { title: { contains: search, mode: 'insensitive' } } : {},
    orderBy: { createdAt: 'desc' }
  });
}

export async function getMyRecipes(userId: string) {
  return prisma.recipe.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: 'desc' }
  });
}

export async function updateRecipe(id: string, userId: string, data: any) {
  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe || recipe.authorId !== userId) throw new Error('Not authorized');
  return prisma.recipe.update({ where: { id }, data });
}

export async function deleteRecipe(id: string, userId: string) {
  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe || recipe.authorId !== userId) throw new Error('Not authorized');
  return prisma.recipe.delete({ where: { id } });
}

export async function rateRecipe(id: string, rating: number) {
  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe) throw new Error('Recipe not found');

  const updatedTotal = recipe.totalRating + rating;
  const updatedCount = recipe.ratingsCount + 1;
  const newAvg = updatedTotal / updatedCount;

  return prisma.recipe.update({
    where: { id },
    data: {
      totalRating: updatedTotal,
      ratingsCount: updatedCount,
      rating: newAvg
    }
  });
}

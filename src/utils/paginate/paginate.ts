export default ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): { limit: number; skip: number } => {
  if (limit === 0) limit = 50;
  return {
    limit: limit,
    skip: page * limit,
  };
};

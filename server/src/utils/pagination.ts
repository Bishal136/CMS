import { IPaginationOptions } from '../types/api.types';

export function getPaginationOptions(
  pageQuery?: unknown,
  limitQuery?: unknown,
  defaultLimit = 10,
  maxLimit = 100
): IPaginationOptions {
  let page = parseInt(String(pageQuery), 10);
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  let limit = parseInt(String(limitQuery), 10);
  if (isNaN(limit) || limit < 1) {
    limit = defaultLimit;
  } else if (limit > maxLimit) {
    limit = maxLimit;
  }

  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

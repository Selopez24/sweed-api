import { Repository } from 'typeorm';

export function getColumnsFromRepo<T>(
  repository: Repository<T>,
  columnsToIgnore: string[] = [],
): (keyof T)[] {
  return repository.metadata.columns
    .map((col) => col.propertyName)
    .filter((col) => !columnsToIgnore.includes(col)) as (keyof T)[];
}

export interface IService<T> {
  getAll(userID: string): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

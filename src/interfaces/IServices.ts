export interface IService<T> {
  getAll(userID: string): Promise<T[]>;
  getByID(id: string): Promise<T | null>;
  create(data: Partial<T>, userId: string): Promise<T>;
  delete(id: string): Promise<void>;
}

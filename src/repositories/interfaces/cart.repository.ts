export interface ICartRepository {
  addToCart(userId: string, itemId: number, quantity: number): Promise<void>;
}

import IProduct from "src/components/product/model/IProduct";
import IBasket from "../contracts/IBasket";
import redisConnection from "../../../../infrastructure/connection/redis";

export default class BasketRedisProvider implements IBasket {
  private key: string = "sample-key";
  public constructor(key: string) {
    this.key = key;
  }
  public add(product: IProduct): void {
    redisConnection
      .get(this.key)
      .then((result) => {
        if (result) {
          const items = JSON.parse(result as string);
          items.push(product);
          redisConnection.set(this.key, JSON.stringify(items));
        }
      })
      .catch((error) => {
        console.log(`error on get basket items: ${error}`);
      });
  }
  public remove(product: IProduct): void {
    redisConnection
      .get(this.key)
      .then((result) => {
        if (result) {
          const items = JSON.parse(result as string);
          items.splice(items.indexOf(product), 1);
          redisConnection.set(this.key, JSON.stringify(items));
        }
      })
      .catch((error) => {
        console.log(`error on get basket items: ${error}`);
      });
  }
  public async items(): Promise<IProduct[]> {
    const items = await this.getItems();
    return items;
  }
  public async count(): Promise<number> {
    const items = await this.getItems();
    if (items) {
      return items.length;
    }
    return 0;
  }
  public clear(): void {
    redisConnection.del(this.key);
  }
  public async total(): Promise<number> {
    const items = await this.getItems();
    return items.reduce((total, product: IProduct) => {
      return total + product.price;
    }, 0);
  }
  public async has(product: IProduct): Promise<boolean> {
    const items = await this.getItems();
    return items.includes(product);
  }
  private async getItems(): Promise<IProduct[]> {
    const items = await redisConnection
      .get(this.key)
      .then((result) => result)
      .catch(() => false);

    if (items) {
      const decodedItems = JSON.parse(items as string);
      return decodedItems;
    }
    return [];
  }
}

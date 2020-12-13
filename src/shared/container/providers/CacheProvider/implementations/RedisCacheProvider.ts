import Redis, { Redis as IRedis } from 'ioredis';

import cacheConfig from '@config/cache';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private client: IRedis;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  // eslint-disable-next-line
  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData: T = JSON.parse(data);

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {}
}

export default RedisCacheProvider;

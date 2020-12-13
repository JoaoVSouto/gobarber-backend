import Redis, { Redis as IRedis } from 'ioredis';

import cacheConfig from '@config/cache';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private client: IRedis;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  public async recover(key: string): Promise<string | null> {
    const data = await this.client.get(key);

    return data;
  }

  public async invalidate(key: string): Promise<void> {}
}

export default RedisCacheProvider;

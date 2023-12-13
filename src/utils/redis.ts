import * as redis from "redis";
import { env, Logger } from "@api/utils";

type RedisPrefixes = "session" | "visits";
type RedisKey = `${RedisPrefixes}:${string | number}` | RedisPrefixes;

class Redis {
  public static redis: ReturnType<typeof redis.createClient>;

  public static async initialize() {
    this.redis = redis.createClient({
      url: env.REDIS_URL,
    });

    this.redis.on("error", (error) => {
      Logger.error("INIT", "Failed to connect to redis " + String(error));
      throw new Error("Failed to connect to redis");
    });

    this.redis.on("connect", () => {
      Logger.info("INIT", "Connected to redis");
    });

    await this.redis.connect();
  }

  /**
   *
   * @param key Key of the value to set
   * @param value Value to set
   * @param options Options for the value to set
   *
   * @example
   * await Redis.set("session:user_xxx", new Date().toISOString());
   * await Redis.set("visits", "1");
   */
  public static async set(key: RedisKey, value: string, options?: redis.SetOptions) {
    await this.redis.set(key, value, options);
  }

  public static async incr(key: RedisKey) {
    await this.redis.incr(key);
  }

  public static async decr(key: RedisKey) {
    await this.redis.decr(key);
  }

  /**
   *
   * @param key Key of the value to get
   * @example
   * const value = await Redis.get("session:user_xxx");
   * const visits = await Redis.get("visits");
   */
  public static async get<T = string>(key: RedisKey) {
    return this.redis.get(key) as T | undefined;
  }

  /**
   *
   * @param key Key of the value to delete
   * @example
   * await Redis.del("session:user_xxx");
   * await Redis.del("visits");
   */
  public static async del(key: RedisKey) {
    await this.redis.del(key);
  }
}

export { Redis, type RedisPrefixes };

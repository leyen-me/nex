import { Redis } from 'ioredis'

/**
 * Redis client configuration
 * Redis 客户端配置
 */
const getRedisConfig = () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000)
    return delay
  },
  maxRetriesPerRequest: 3,
})

/**
 * Get Redis client instance (singleton pattern)
 * 获取 Redis 客户端实例（单例模式）
 */
export const redis = new Redis(getRedisConfig())

// Error handling
// 错误处理
redis.on('error', (error: Error) => {
  console.error('[Redis] Error:', error)
})

redis.on('connect', () => {
  console.log('[Redis] Connected successfully')
})

export default redis

import { EventEmitter } from 'events'

class InstancePool<K, T> extends EventEmitter {
  private pool = new Map<K, T>()

  public bind(key: K, instance: T): boolean {
    if (this.pool.has(key)) {
      return false
    }
    this.pool.set(key, instance)
    return true
  }

  public unbind(key: K): boolean | T {
    if (this.pool.has(key)) {
      const instance = this.pool.get(key)
      return instance
    }
    return false
  }
}

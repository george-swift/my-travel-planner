import { Place } from './utils'

export type EventType =
  | 'login'
  | 'addPlace'
  | 'editPlace'
  | 'closePlaceModal'
  | 'closeAuthModal'
  | 'logout'

export type Events = Partial<Record<EventType, ((place?: Place) => void)[]>>

class EventBus {
  private static instance: EventBus
  private events: Events = {}

  private constructor() {}

  static getInstance() {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus()
    }

    return EventBus.instance
  }

  public emit(event: EventType, data?: Place): void {
    if (!EventBus.getInstance().events[event]) return

    EventBus.getInstance().events[event]?.forEach(callback => callback(data))
  }

  public on(event: EventType, callback: (place?: Place) => void): void {
    if (!EventBus.getInstance().events[event]) {
      EventBus.getInstance().events = {
        ...EventBus.getInstance().events,
        [event]: []
      }
    }

    EventBus.getInstance().events[event]?.push(callback)
  }
}

export default EventBus.getInstance()

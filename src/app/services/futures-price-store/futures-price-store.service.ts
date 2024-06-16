import {Injectable} from '@angular/core';
import {Deque} from "../../utils/deque-util/deque.util";

/**
 * Сервис для хранения и актуализирования цен на фьючерсы.
 */
@Injectable({
  providedIn: 'root'
})

export class FuturesPriceStoreService {
  /**
   * Хранение цен с ключом по времени.
   */
  private pricesMap: Map<number, number> = new Map();

  /**
   * Интервалы времени в миллисекундах для расчета минимумов и максимумов.
   */
  private intervals: { [key: string]: number } = {
    '5m': 5 * 60 * 1000,
    '15m': 15 * 60 * 1000,
    '1h': 60 * 60 * 1000,
    '4h': 4 * 60 * 60 * 1000,
    '24h': 24 * 60 * 60 * 1000,
  };

  /**
   * Deque для хранения минимумов.
   */
  private minDeque: { [key: string]: Deque<number> } = {};

  /**
   * Deque для хранения максимумов.
   */
  private maxDeque: { [key: string]: Deque<number> } = {};

  constructor() {
    // Инициализация Deque для каждого интервала времени
    for (const interval in this.intervals) {
      this.minDeque[interval] = new Deque();
      this.maxDeque[interval] = new Deque();
    }
  }

  /**
   * Добавить новую цену с текущим временем.
   * @param price - Новая цена.
   */
  addPrice(price: number): void {
    const timestamp = Date.now();
    this.pricesMap.set(timestamp, price);
    for (const interval in this.intervals) {
      this.updateDeque(this.minDeque[interval], price, timestamp, 'min', this.intervals[interval]);
      this.updateDeque(this.maxDeque[interval], price, timestamp, 'max', this.intervals[interval]);
    }
    this.cleanupOldDataIfNeeded(timestamp);
  }

  /**
   * Получить минимум за заданный интервал времени.
   * @param interval - Интервал времени.
   * @returns Минимальная цена за указанный интервал или null, если данных нет.
   */
  getMin(interval: string): number | null {
    const deque = this.minDeque[interval];
    return deque.isEmpty() ? null : deque.getFront()!;
  }

  /**
   * Получить максимум за заданный интервал времени.
   * @param interval - Интервал времени.
   * @returns Максимальная цена за указанный интервал или null, если данных нет.
   */
  getMax(interval: string): number | null {
    const deque = this.maxDeque[interval];
    return deque.isEmpty() ? null : deque.getFront()!;
  }

  /**
   * Обновление Deque для минимумов и максимумов.
   * @param deque - Deque для обновления.
   * @param price - Новая цена.
   * @param timestamp - Временная метка новой цены.
   * @param type - Тип обновления ('min' или 'max').
   * @param interval - Интервал времени.
   */
  private updateDeque(deque: Deque<number>, price: number, timestamp: number, type: 'min' | 'max', interval: number): void {
    while (!deque.isEmpty() && (type === 'min' ? deque.getBack()! > price : deque.getBack()! < price)) {
      deque.popBack();
    }
    deque.pushBack(price, timestamp);
    if (timestamp - deque.getFrontTimestamp()! >= interval) {
      deque.popFront();
    }
  }

  /**
   * Очистка устаревших данных.
   * @param currentTimestamp - Текущая временная метка.
   */
  private cleanupOldDataIfNeeded(currentTimestamp: number): void {
    const cutoff = currentTimestamp - this.intervals['24h'];
    for (const [timestamp, price] of this.pricesMap) {
      if (timestamp < cutoff) {
        this.pricesMap.delete(timestamp);
        for (const interval in this.intervals) {
          const minDeque = this.minDeque[interval];
          const maxDeque = this.maxDeque[interval];
          if (!minDeque.isEmpty() && minDeque.getFrontTimestamp() === timestamp) {
            minDeque.popFront();
          }
          if (!maxDeque.isEmpty() && maxDeque.getFrontTimestamp() === timestamp) {
            maxDeque.popFront();
          }
        }
      } else {
        break; // Цены отсортированы по времени, можно выйти после первой нестарой записи
      }
    }
  }
}


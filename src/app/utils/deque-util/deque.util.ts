/**
 * Класс двусторонней очереди (deque) для хранения элементов с временными метками.
 * @template T Тип элементов, хранящихся в очереди.
 */
export class Deque<T> {
  /**
   * Массив данных, где каждый элемент содержит значение и временную метку.
   */
  private data: { value: T; timestamp: number }[] = [];

  /**
   * Добавляет элемент в конец очереди.
   * @param value - Значение элемента.
   * @param timestamp - Временная метка элемента.
   */
  pushBack(value: T, timestamp: number): void {
    this.data.push({ value, timestamp });
  }

  /**
   * Удаляет элемент с конца очереди и возвращает его значение.
   * @returns Значение удаленного элемента или undefined, если очередь пуста.
   */
  popBack(): T | undefined {
    const item = this.data.pop();
    return item ? item.value : undefined;
  }

  /**
   * Возвращает значение элемента с конца очереди без его удаления.
   * @returns Значение элемента или undefined, если очередь пуста.
   */
  getBack(): T | undefined {
    return this.data.length > 0 ? this.data[this.data.length - 1].value : undefined;
  }

  /**
   * Добавляет элемент в начало очереди.
   * @param value - Значение элемента.
   * @param timestamp - Временная метка элемента.
   */
  pushFront(value: T, timestamp: number): void {
    this.data.unshift({ value, timestamp });
  }

  /**
   * Удаляет элемент с начала очереди и возвращает его значение.
   * @returns Значение удаленного элемента или undefined, если очередь пуста.
   */
  popFront(): T | undefined {
    const item = this.data.shift();
    return item ? item.value : undefined;
  }

  /**
   * Возвращает значение элемента с начала очереди без его удаления.
   * @returns Значение элемента или undefined, если очередь пуста.
   */
  getFront(): T | undefined {
    return this.data.length > 0 ? this.data[0].value : undefined;
  }

  /**
   * Проверяет, пуста ли очередь.
   * @returns true, если очередь пуста, иначе false.
   */
  isEmpty(): boolean {
    return this.data.length === 0;
  }

  /**
   * Возвращает количество элементов в очереди.
   * @returns Количество элементов.
   */
  size(): number {
    return this.data.length;
  }

  /**
   * Очищает очередь.
   */
  clear(): void {
    this.data = [];
  }

  /**
   * Возвращает временную метку элемента с начала очереди без его удаления.
   * @returns Временная метка элемента или undefined, если очередь пуста.
   */
  getFrontTimestamp(): number | undefined {
    return this.data.length > 0 ? this.data[0].timestamp : undefined;
  }
}

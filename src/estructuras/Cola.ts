export class Cola<T> {
  #items: T[] = [];
  #frente: number = 0;

  encolar(x: T): void {
    this.#items.push(x);
  }

  desencolar(): T | undefined {
    if (this.vacia) return undefined;
    const item = this.#items[this.#frente];
    this.#frente++;
    // Opcional: limpiar array si el frente avanza mucho para evitar memory leak
    if (this.#frente > 100 && this.#frente > this.#items.length / 2) {
      this.#items = this.#items.slice(this.#frente);
      this.#frente = 0;
    }
    return item;
  }

  frente(): T | undefined {
    if (this.vacia) return undefined;
    return this.#items[this.#frente];
  }

  get vacia(): boolean {
    return this.#frente >= this.#items.length;
  }

  get tamanio(): number {
    return this.#items.length - this.#frente;
  }

  aArray(): T[] {
    return this.#items.slice(this.#frente);
  }
}
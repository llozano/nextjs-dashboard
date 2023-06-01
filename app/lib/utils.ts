export class Utils {
  static calcRateChange(current: number, prev: number | undefined): number {
    let change = 0;

    if (prev !== undefined) {
      const rate = 100 * (prev - current) / prev;
      change = Math.abs(rate);
    }

    return change;
  }
}

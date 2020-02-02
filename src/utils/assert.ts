export function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== 'string') {
    throw new TypeError('Expected a string!');
  }
}

export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new TypeError(`Expected 'val' to be defined, but received ${val}`);
  }
}

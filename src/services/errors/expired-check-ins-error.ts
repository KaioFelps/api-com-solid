export class ExpiredCheckInsError extends Error {
  constructor() {
    super("Check-in's lifetime has expired.");
  }
}

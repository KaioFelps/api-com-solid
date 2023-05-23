export class UserAlreadyExistsError extends Error {
  constructor() {
    super("E-mail already exists."); // metodo constructor da classe error
  }
}

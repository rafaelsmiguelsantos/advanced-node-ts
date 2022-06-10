export class Person {
  speak(name?: string): string {
    return `olá ${name?.toUpperCase() ?? 'Fulano'}!`
  }
}

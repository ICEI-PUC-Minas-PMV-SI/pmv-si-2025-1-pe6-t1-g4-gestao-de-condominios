class ControllerExample {
  syncronousFn() {}

  async asyncronousFn() {
    await this.teste();
  }

  async teste() {}
}

const instance = new ControllerExample();
export { instance as ControllerExample };

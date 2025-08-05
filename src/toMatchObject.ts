class TestObject {}

export const toMatchObject = () => {
  return new TestObject();
};

class TestObject2 {
  a: string;

  constructor(a: string) {
    this.a = a;
  }
}

export const toMatchObject2 = (str: string) => {
  return new TestObject2(str);
};

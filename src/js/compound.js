class Compound {
  static id = 0;
  constructor() {
    Compound.id += 1;
    this.id = Compound.id;
    this.mw = null;
    this.smiles = null;
  }
}

const obj = new Compound();

console.log(obj);

const obj1 = new Compound();

console.log(obj1);
const obj2 = new Compound();

console.log(obj2);
const obj3 = new Compound();

console.log(obj3);

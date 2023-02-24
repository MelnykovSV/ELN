import { Scheme } from './scheme.js';
import { Compound } from './compound.js';
import { Fraction } from './fraction.js';

const scheme = new Scheme();

scheme.addCompound(scheme);
scheme.addCompound(scheme);
scheme.addCompound(scheme);
scheme.addCompound(scheme);

const scheme2 = new Scheme();
scheme2.addCompound(scheme2);
scheme2.addCompound(scheme2);
scheme2.addCompound(scheme2);

console.log(scheme);
console.log(scheme2);

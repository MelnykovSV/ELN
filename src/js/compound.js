import { Fraction } from './fraction';

export class Compound {
  static compoundGlobalID = 0;
  // #mw;
  // #smiles;
  // #isTestSuccessful;
  // #isScalingSuccessful;
  // #fractions;

  constructor(
    {
      // compoundGlobalID = (Compound.compoundGlobalID += 1),
      mw = null,
      dbID = null,
      smiles = null,
      isTestSuccessful = false,
      isScalingSuccessful = false,
      fractions = [],
    } = {},
    globalCompoundID
  ) {
    this.compoundGlobalID = globalCompoundID;
    this.mw = mw;
    this.smiles = smiles;
    this.isTestSuccessful = isTestSuccessful;
    this.isScalingSuccessful = isScalingSuccessful;
    this.fractions = fractions;
    this.dbID = dbID;
  }

  // get isTestSuccessful() {
  //   return this.#isTestSuccessful;
  // }
  // get isScalingSuccessful() {
  //   return this.#isScalingSuccessful;
  // }

  // set isTestSuccessful(value) {
  //   if (typeof value === 'boolean') {
  //     this.#isTestSuccessful = value;
  //   } else {
  //     throw new Error('Value must be a boolean');
  //   }
  // }
  // set isScalingSuccessful(value) {
  //   if (typeof value === 'boolean') {
  //     this.#isScalingSuccessful = value;
  //   } else {
  //     throw new Error('Value must be a boolean');
  //   }
  // }

  addFraction() {
    this.fractions.push(new Fraction());
  }
}

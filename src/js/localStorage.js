import { Page } from './page';
import { Scheme } from './scheme';
import { Compound } from './compound';
import { Fraction } from './fraction';

export function getFromLocalStorage() {
  if (!localStorage.getItem('pageBody')) {
    return null;
  }
  const page = new Page();

  const data = JSON.parse(localStorage.getItem('pageBody'));
  for (schemeData of data.body) {
    const scheme = new Scheme();
    page.body.push(scheme);

    for (compoundData of schemeData.body) {
      const compound = new Compound(compoundData);
      scheme.body.push(compound);

      for (fractionData of compoundData.fractions) {
        const fraction = new Fraction();
        compound.fractions.push(fraction);
      }
    }
  }

  return page;
}

// export function

export function renderCompoundForm({
  compoundGlobalID,
  mw = '',
  smiles = '',
  isTestSuccessful,
  isScalingSuccessful,
  dbID = '',
  fractions,
} = {}) {
  const mainPage = document.querySelector('.main-page');
  const markup = `<form action="#" class="compound-form" data-id = '${compoundGlobalID}'>
    <div class="compound-form__body">
      <div class="compound-form__upper-part">
        <div class="compound-form-canvas-container">
          <canvas id="canvas${compoundGlobalID}"></canvas>
        </div>
        <div class="compound-form__compound-data">
          <label class="">
            ID
            <input type="text" name="dbID" value="${dbID}" />
          </label>
          <label class="">
            MW
            <input type="text" name="mw" value="${mw}" />
          </label>
          <label>
            <input type="checkbox" id="" name="isTestSuccessful" ${
              isTestSuccessful === true ? 'checked' : ''
            } />
            Test
          </label>
          <label>
            <input type="checkbox" id="" name="isScalingSuccessful" ${
              isScalingSuccessful === true ? 'checked' : ''
            } />
            Scaling
          </label>
        </div>
      </div>
      <div class="compound-form__lower-part">
        <label class="text-input-label">
          SMILES
          <input type="text" name="smiles" value="${smiles}" />
        </label>
        <div class="compound-from__button-block">
          <button type="submit">Add task</button>
          <button type="submit">Add compund</button>
          <label>
            Fractions
            <input type="checkbox" name="" id="" />
          </label>
        </div>
      </div>
    </div>
    <div class="compound-form__fractions">
      <div class="compound-form__fractions-main">
        <label>
          Fractions
          <select name="" id="">
            <option value="">Fraction 1</option>
            <option value="">Fraction 2</option>
          </select>
        </label>
        <button type="submit">Add fraction</button>
      </div>
      <div class="compound-form__single-fraction">
        <div class="compound-form__single-fraction-upper-part">
          <div class="compound-form__single-fraction-characteristics">
            <label class="">
              Mass
              <input type="text" />
            </label>
            <label class="">
              Purity
              <input type="text" />
            </label>
          </div>
          <div class="compound-form__single-fraction-spectra">
            <label>
              <input type="checkbox" name="" id="" />
              NMR
            </label>
            <label>
              <input type="checkbox" name="" id="" />
              LCMS
            </label>
          </div>
        </div>
        <div class="compound-form__single-fraction-lower-part">
          <label class="">
            Comments
            <textarea name="" id="" cols="30" rows="3"></textarea>
          </label>
        </div>
      </div>
    </div>
  </form>`;
  mainPage.insertAdjacentHTML('beforeend', markup);
}

// export function renderCompoundForm() {
//     const mainPage = document.querySelector('.main-page');
//     const markup = `<form action="#" class="compound-form" >
//       <div class="compound-form__body">
//         <div class="compound-form__upper-part">
//           <div class="compound-form-canvas-container">
//             <canvas></canvas>
//           </div>
//           <div class="compound-form__compound-data">
//             <label class="">
//               ID
//               <input type="text" />
//             </label>
//             <label class="">
//               MW
//               <input type="text" />
//             </label>
//             <label>
//               <input type="checkbox" name="" id="" />
//               Test
//             </label>
//             <label>
//               <input type="checkbox" name="" id="" />
//               Scaling
//             </label>
//           </div>
//         </div>
//         <div class="compound-form__lower-part">
//           <label class="text-input-label">
//             SMILES
//             <input type="text" />
//           </label>
//           <div class="compound-from__button-block">
//             <button type="submit">Add task</button>
//             <button type="submit">Add compund</button>
//             <label>
//               Fractions
//               <input type="checkbox" name="" id="" />
//             </label>
//           </div>
//         </div>
//       </div>
//       <div class="compound-form__fractions">
//         <div class="compound-form__fractions-main">
//           <label>
//             Fractions
//             <select name="" id="">
//               <option value="">Fraction 1</option>
//               <option value="">Fraction 2</option>
//             </select>
//           </label>
//           <button type="submit">Add fraction</button>
//         </div>
//         <div class="compound-form__single-fraction">
//           <div class="compound-form__single-fraction-upper-part">
//             <div class="compound-form__single-fraction-characteristics">
//               <label class="">
//                 Mass
//                 <input type="text" />
//               </label>
//               <label class="">
//                 Purity
//                 <input type="text" />
//               </label>
//             </div>
//             <div class="compound-form__single-fraction-spectra">
//               <label>
//                 <input type="checkbox" name="" id="" />
//                 NMR
//               </label>
//               <label>
//                 <input type="checkbox" name="" id="" />
//                 LCMS
//               </label>
//             </div>
//           </div>
//           <div class="compound-form__single-fraction-lower-part">
//             <label class="">
//               Comments
//               <textarea name="" id="" cols="30" rows="3"></textarea>
//             </label>
//           </div>
//         </div>
//       </div>
//     </form>`;
//     mainPage.insertAdjacentHTML('beforeend', markup);
//   }

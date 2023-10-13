import { describe, expect, expectTypeOf, it } from 'vitest';
import trimFormData from '../utils/trimFormValues';

const form = document.createElement('form');
form.innerHTML = `
  <input type="text" name="firstname" value="   Loris   ">
  <input type="text" name="lastname" value="   QUESADO   ">

`;

const result = {
  firstname: 'Loris',
  lastname: 'QUESADO',
};

// === trimFormData === //
describe('trimFormData function', () => {
  describe('Structure', () => {
    it('Should be a function', () => {
      expectTypeOf(trimFormData).toBeFunction();
    });

    it('Should return an object with trim string values', () => {
      expectTypeOf(trimFormData).toMatchTypeOf<Record<string, string>>;
    });
  });

  describe('Execution', () => {
    it('Should trim string values in a form', () => {
      expect(trimFormData(form)).toEqual(result);
    });
  });
});

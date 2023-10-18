import { describe, expectTypeOf, it } from 'vitest';
import trimFormData from '../utils/trimFormValues';

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

});

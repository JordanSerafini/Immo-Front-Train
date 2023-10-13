import { describe, expectTypeOf, it } from 'vitest';
import trimFormValues from '../utils/trimFormValues';

// === trimFormValues === //
describe('trimFormValues function', () => {
  describe('Structure', () => {
    it('Should be a function', () => {
      expectTypeOf(trimFormValues).toBeFunction();
    });
  });
});

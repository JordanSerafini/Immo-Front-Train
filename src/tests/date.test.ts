import dayjs from 'dayjs';
import { describe, expect, expectTypeOf, it } from 'vitest';
import getFormatedDayjsDate from '../utils/getFormatedDayjsDate';
import getFormatedFullDate from '../utils/getFormatedFullDate';

// === getFormatedDayjsDate === //
describe('getFormatedDayjsDate function', () => {
  describe('Structure', () => {
    it('Should be a function', () => {
      expectTypeOf(getFormatedDayjsDate).toBeFunction();
    });

    it('Should return a string', () => {
      expectTypeOf(getFormatedDayjsDate('2023-12-02')).toMatchTypeOf<string>;

      expectTypeOf(getFormatedDayjsDate('')).toMatchTypeOf<string>;
    });
  });

  describe('Execution', () => {
    it('Should return an ISO Date with a Europe/Paris Timezone', () => {
      expect(getFormatedDayjsDate('2023-10-12')).toEqual(
        '2023-10-12T00:00:00.000Z'
      );

      expect(getFormatedDayjsDate('2023-11-10')).toEqual(
        '2023-11-10T00:00:00.000Z'
      );
    });

    it('Should return an empty string', () => {
      expect(getFormatedDayjsDate('')).toEqual('');
    });
  });
});

// === getFormatedFullDate === //
describe('getFormatedFullDate function', () => {
  describe('Structure', () => {
    it('Should be a function', () => {
      expectTypeOf(getFormatedFullDate).toBeFunction();
    });
    
    it('Should return a string', () => {
      expectTypeOf(getFormatedFullDate()).toMatchTypeOf<string>;
    });
  });

  describe('Execution', () => {
    it('Should return the current date with a format of : YYYY-MM-DD', () => {
      // !!! THIS TEST WILL PASS ONLY WITH THE CURRENT DATE !!!
      expect(getFormatedFullDate()).toEqual(dayjs().format("YYYY-MM-DD"));
    });
  });
});

import { describe, expect, expectTypeOf, it } from 'vitest';
import formatPhone from '../utils/formatPhone';
import formatDate from '../utils/formatDate';
import capFirstLetter from '../utils/capFirstLetter';

// === formatPhone === //
describe('formatPhone function', () => {
  describe('Structure', () => {
    it('Should be a function', () => {
      expectTypeOf(formatPhone).toBeFunction();
    });

    it('Should return a string', () => {
      expectTypeOf(formatPhone('0605060506')).toMatchTypeOf<string>;

      expectTypeOf(formatPhone('')).toMatchTypeOf<string>;
    });
  });

  describe('Execution', () => {
    it('Should return a phone number divided by a dot for each pair', () => {
      expect(formatPhone('0605060506')).toEqual('06.05.06.05.06');
    });

    it('Should return a phone number divided by a dot for each pair with a length of 10 numbers', () => {
      expect(formatPhone('065060708090')).toEqual('06.50.60.70.80');
    });

    it('Should return an empty string', () => {
      expect(formatPhone('060506')).toEqual('');
    });

    it('Should return an empty string', () => {
      expect(formatPhone('')).toEqual('');
    });
  });
});

// === formatDate === //
describe('formatDate function', () => {
  describe('Structure', () => {
    it('Should be a function', () => {
      expectTypeOf(formatDate).toBeFunction();
    });

    it('Should return a string', () => {
      expectTypeOf(formatDate('2023-12-06')).toMatchTypeOf<string>;

      expectTypeOf(formatDate('')).toMatchTypeOf<string>;
    });
  });

  describe('Execution', () => {
    it('Should return a date with a format of (DD / MM / YYYY)', () => {
      expect(formatDate('2023-12-06')).toEqual('06/12/2023');
      expect(formatDate('12-24-2023')).toEqual('24/12/2023');
      expect(formatDate('01/02-2023')).toEqual('02/01/2023');
    });

    it('Should return an empty string', () => {
      expect(formatDate('')).toEqual('');
    });

    it('Should return Invalid Date', () => {
      expect(formatDate('24-12-2023')).toEqual('Invalid Date');
    });
  });
});

// === capFirstLetter === //
describe('capFirstLetter function', () => {
  describe('Structure', () => {
    it('Should be a function', () => {
      expectTypeOf(capFirstLetter).toBeFunction();
    });

    it('Should return a string', () => {
      expectTypeOf(capFirstLetter('hello')).toMatchTypeOf<string>;

      expectTypeOf(capFirstLetter('')).toMatchTypeOf<string>;
    });
  });

  describe('Execution', () => {
    it('Should return a string with the first letter capitalized and the rest lower cased', () => {
      expect(capFirstLetter('heLlO')).toEqual('Hello');
      expect(capFirstLetter('heLlO WoRld')).toEqual('Hello world');
    });

    it('Should return an empty string', () => {
      expect(capFirstLetter('')).toEqual('');
    });
  });
});

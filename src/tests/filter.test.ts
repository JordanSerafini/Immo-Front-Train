import { describe, expect, expectTypeOf, it } from 'vitest';
import filteredActionToDo from '../utils/filteredActionToDo';
import filteredUpcomingAction from '../utils/filteredUpcomingAction';
// === TYPESCRIPT === //
import { Information } from '../@types/information';

// === DATA === //
import informationsData from '../data/informationsData';
import sortedActionToDo from '../data/sortedActionToDo';
import sortedUpcomingAction from '../data/sortedUpcomingAction';

// === filteredActionToDo === //
describe('filteredActionToDo function', () => {
  describe('Structure', () => {
    it('Should be a function', () => {
      expectTypeOf(filteredActionToDo).toBeFunction();
    });

    it('Should return an array of Information objects', () => {
      expectTypeOf(filteredActionToDo(informationsData)).toMatchTypeOf<Information[]>;
    });
  });

  describe('Execution', () => {
    it('Should return an array of Information to do objects sorted by date (most recent)', () => {
      expect(filteredActionToDo(informationsData)).toEqual(sortedActionToDo);
    });
  });
});

// === filteredUpcomingAction === //
describe('filteredUpcomingAction function', () => {
  describe('Structure', () => {
    it('Should be a function', () => {
      expectTypeOf(filteredUpcomingAction).toBeFunction();
    });

    it('Should return an array of Information objects', () => {
      expectTypeOf(filteredUpcomingAction(informationsData)).toMatchTypeOf<Information[]>;
    });
  });

  describe('Execution', () => {
    it('Should return an array of upcoming Information objects sorted by date (most recent)', () => {
      expect(filteredUpcomingAction(informationsData)).toEqual(sortedUpcomingAction);
    });
  });
});

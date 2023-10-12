import { describe, expect, expectTypeOf, it } from 'vitest';
import { findInformation } from '../store/selectors/information';
import { findCollaborator } from '../store/selectors/collaborator';

// === findInformation === //
describe('findInformation function', () => {
  describe('Structure', () => {
    it('Should be a function', () => {
      expectTypeOf(findInformation).toBeFunction();
    });
  });
});

// === findCollaborator === //
describe('findCollaborator function', () => {
  describe('Structure', () => {
    it('Should be a function', () => {
      expectTypeOf(findCollaborator).toBeFunction();
    });
  });
});

import { describe, expect, expectTypeOf, it } from 'vitest';
import { findInformation } from '../store/selectors/information';
import { findCollaborator } from '../store/selectors/collaborator';
// === TYPESCRIPT === //
import { User } from '../@types/user';
import { Information } from '../@types/information';

// === DATA === //
import collaboratorsData from '../data/collaboratorsData';
import informationsData from '../data/informationsData';

const firstInformation = informationsData[0];

const fakeInformationsData = {
  information: {
    data: informationsData,
  },
};

const firstCollaborator = collaboratorsData[0];
const fakeCollaboratorData = {
  collaborator: {
    data: collaboratorsData,
  },
};

// === findInformation === //
describe('findInformation function', () => {
  describe('Structure', () => {
    it('Should be a function', () => {
      expectTypeOf(findInformation).toBeFunction();
    });

    it('Should return an Information object if found or undefined', () => {
      const found = findInformation('1')(fakeInformationsData);

      expectTypeOf(found).toMatchTypeOf<Information | undefined>();

      const notFound = findInformation('99')(fakeInformationsData);
      expectTypeOf(notFound).toMatchTypeOf<Information | undefined>();
    });
  });

  describe('Execution', () => {
    it('Should return the corresponding information with the given id', () => {
      const found = findInformation('1')(fakeInformationsData);
      expect(found).toEqual(firstInformation);
    });

    it('Should return undefined for an unknown id', () => {
      const notFound = findInformation('99')(fakeInformationsData);
      expect(notFound).toBeUndefined();
    });
  });
});

// === findCollaborator === //
describe('findCollaborator function', () => {
  describe('Structure', () => {
    it('Should be a function', () => {
      expectTypeOf(findCollaborator).toBeFunction();
    });

    it('Should return a Collaborator object if found or undefined', () => {
      const found = findCollaborator(2)(fakeCollaboratorData);

      expectTypeOf(found).toMatchTypeOf<User | undefined>();

      const notFound = findCollaborator(99)(fakeCollaboratorData);
      expectTypeOf(notFound).toMatchTypeOf<User | undefined>();
    });
  });

  describe('Execution', () => {
    it('Should return the corresponding collaborator with the given id', () => {
      const found = findCollaborator(2)(fakeCollaboratorData);
      expect(found).toEqual(firstCollaborator);
    });

    it('Should return undefined for an unknown id', () => {
      const notFound = findCollaborator(99)(fakeCollaboratorData);
      expect(notFound).toBeUndefined();
    });
  });
});

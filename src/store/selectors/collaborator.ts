import { RootState } from '..';

// eslint-disable-next-line import/prefer-default-export
export const findCollaborator = (id: number) => (state: RootState) =>
  state.collaborator.data.find(
    (testedCollaborator) => testedCollaborator.id === id
  );

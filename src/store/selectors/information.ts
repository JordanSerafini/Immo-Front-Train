import { RootState } from '..';

// eslint-disable-next-line import/prefer-default-export
export const findInformation = (id: string) => (state: RootState) =>
  state.information.informations.find(
    (testedInformation) => testedInformation.id === parseInt(id, 10)
  );

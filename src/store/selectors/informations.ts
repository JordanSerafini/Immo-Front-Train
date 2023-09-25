/* eslint-disable import/prefer-default-export */
import { RootState } from '..';

export const filterInformation =
  (searchedSlug: string | undefined) => (state: RootState) =>
    state.information.informations.filter(
      (testedInformation) => testedInformation === searchedSlug
    );

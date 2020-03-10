import {createAction, ActionType} from 'typesafe-actions';
import {CharacterPage} from './type';

export const SetWidth = createAction('SetWidth')<number>();
export const SetHeight = createAction('SetHeight')<number>();
export const SetCell = createAction('SetCell', (index: number, value: boolean) => ({index, value}))();
export const ClearMatrix = createAction('ClearMatrix')();
export const SetPage = createAction('SetPage')<CharacterPage>();
export const SetCharacter = createAction('SetCharacter')<string>();
export const LoadMatrixData = createAction('LoadMatrixData')<string>();
export const SetCellNumber = createAction('SetCellNumber')<boolean>();
export const SetPathDirection = createAction('SetPathDirection')<boolean>();

type PathGeneratorActionCreators =
| typeof SetWidth
| typeof SetHeight
| typeof SetCell
| typeof ClearMatrix
| typeof SetPage
| typeof SetCharacter
| typeof LoadMatrixData
| typeof SetCellNumber
| typeof SetPathDirection;

export type PathGeneratorAction = ActionType<PathGeneratorActionCreators>;

export type CharacterPage = 'かな' | 'が' | 'ぱ' | 'カナ' | 'ガ' | 'パ' | 'ABC';
export type ExportType = 'SVG' | 'JSON (Path)' | 'JSON (Matrix)' | 'JS (Path)' | 'JS (Matrix)';

export interface PathGeneratorState {
    arrowSize: number,
    arrowLength: number,
    maxCellSize: number,
    width: number,
    height: number,
    matrix: Array<boolean>,
    page: CharacterPage,
    character: string,
    cellNumber: boolean,
    pathDirection: boolean,
    exportType: ExportType,
}

export interface TypeChecker<Type> {
    (input: any): input is Type,
    type: string,
}
export interface TypeFilter<Type> {
    (input: any): Type,
    type: string,
}

export type Nominal<Type, Name extends string> = Type & {__name: Name}
export type MessageId = Nominal<string, 'MessageId'>;
export type FrameType = Nominal<number, 'FrameType'>;
export type Base64PNG = Nominal<string, 'Base64PNG'>;
export interface MessageFragment {
    text: string,
    color: string,
}
export interface Message {
    id: MessageId,
    fragments: Array<MessageFragment>,
    duration: number,
    frameColor: number,
};
export interface MessageAndIndex {
    index: number,
    message: Message,
}
export interface Printee {
    character: string,
    color: string,
    x: number,
    y: number,
}

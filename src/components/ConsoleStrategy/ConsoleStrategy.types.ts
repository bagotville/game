/* eslint-disable no-unused-vars */
export interface IConsoleStrategyProps<T extends StringOnlyValues> {
    messages: (IWriteMessage | IReadMessage<T>)[]
    onSucessHookHandler: (result: T) => void;
}

export interface IMessage {
    message: string,
    delay?: number
}

export interface IReadMessage<T extends StringOnlyValues> extends IMessage {
    mapToField: keyof T
}

export interface IWriteMessage extends IMessage { }

export interface IConsoleStrategyState<T> {
    inputData: T,
    lastMessageIndex: number,
    isWaitingForInpit: boolean,
    output: string[],
    writtenMessages: string[]
}

export function instanseOfReadMessage<T extends StringOnlyValues>(a: IMessage): a is IReadMessage<T> {
    return 'mapToField' in a;
}

export type StringOnlyValues = {
    [key: string]: string;
}

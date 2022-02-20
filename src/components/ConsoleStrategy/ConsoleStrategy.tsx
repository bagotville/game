import React, { FormEvent, KeyboardEvent } from "react";
import style from './ConsoleStrategy.style.scss';
import {
    IConsoleStrategyProps,
    IConsoleStrategyState,
    IMessage,
    instanseOfReadMessage,
    IReadMessage,
    StringOnlyValues
} from "./ConsoleStrategy.types";

export class ConsoleStrategy
    extends React.Component<IConsoleStrategyProps<StringOnlyValues>, IConsoleStrategyState<StringOnlyValues>>{
    private static handleDocumentKeyDown() {
        ConsoleStrategy.catchFocus();
    }

    private static catchFocus() {
        document.getElementById('console-input')?.focus();
    }

    private messages;

    private onSuccessHookHandler;

    private currentValue: keyof StringOnlyValues;

    constructor(props: IConsoleStrategyProps<StringOnlyValues>) {
        super(props);
        this.messages = props.messages;
        this.onSuccessHookHandler = props.onSucessHookHandler;
        this.state = { inputData: {}, lastMessageIndex: 0, isWaitingForInpit: false, output: [], writtenMessages: [] };
    }

    public componentDidMount() {
        this.writeMessages();
        document.onkeydown = () => { ConsoleStrategy.handleDocumentKeyDown() };
    }

    public componentDidUpdate() {
        this.writeMessages();
    }

    public componentWillUnmount() {
        document.onkeydown = null;
    }

    private onInput(key: KeyboardEvent) {
        if (key.key !== 'Enter') {
            return;
        }
        const inputElem = key.currentTarget as HTMLInputElement;
        this.pushMessage(inputElem.value, true);
        inputElem.value = '';

        this.setState(prevState => ({ ...prevState, isWaitingForInpit: false }));
        this.readNext();
    }

    private storeCurrentValue(input: FormEvent<HTMLInputElement>) {
        const { inputData } = this.state;
        inputData[this.currentValue] = input.currentTarget.value;
    }

    private writeMessages() {
        const { lastMessageIndex, writtenMessages } = this.state;
        const currentPos = writtenMessages.length > 0 ? writtenMessages.length : 0;
        for (let i = currentPos; i <= lastMessageIndex; i++) {
            const currentMessage = this.messages[i];
            this.writeMessage(currentMessage);
        }
    }

    private async writeMessage(message: IMessage) {
        if (instanseOfReadMessage(message)) {
            this.readMessage(message);
            return;
        }

        this.pushMessage(message.message);
        if (message.delay) {
            await setTimeout(() => {
                this.readNext();
            }, message.delay);
        } else {
            this.readNext();
        }
    }

    private readNext() {
        const { messages } = this.props;
        const { lastMessageIndex, inputData } = this.state;
        if (lastMessageIndex + 1 >= messages.length) {
            this.onSuccessHookHandler(inputData);
            return;
        }
        const shouldRead: boolean = instanseOfReadMessage(messages[lastMessageIndex + 1]);

        this.setState(prevState => ({
            ...prevState,
            lastMessageIndex: prevState.lastMessageIndex + 1,
            isWaitingForInpit: shouldRead
        }));
    }

    private readMessage(message: IReadMessage<StringOnlyValues>): void {
        this.pushMessage(message.message);
        this.currentValue = message.mapToField;
    }

    private pushMessage(message: string, toOutputOnly?: boolean) {
        if (toOutputOnly) {
            this.setState(prevState => ({
                ...prevState,
                output: [...prevState.output, message]
            }));
        } else {
            this.setState(prevState => ({
                ...prevState,
                output: [...prevState.output, message],
                writtenMessages: [...prevState.writtenMessages, message]
            }));
        }
    }

    render(): React.ReactNode {
        const { isWaitingForInpit } = this.state;
        const { output } = this.state;

        return (
            <div>
                {output.map(msg =>
                    <p key={msg}>{msg}</p>
                )}
                {isWaitingForInpit ?
                    <input
                        id='console-input'
                        onInput={(e) => { this.storeCurrentValue(e) }}
                        onKeyDown={(e) => { this.onInput(e) }}
                        className={style.consoleInput} /> : null}
            </div>
        );
    }
}

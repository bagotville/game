import React, { FormEvent, KeyboardEvent } from 'react';
import style from './ConsoleStrategy.style.scss';
import {
  IConsoleStrategyProps,
  IConsoleStrategyState,
  IMessage,
  instanseOfReadMessage,
  IReadMessage,
  StringOnlyValues,
} from './ConsoleStrategy.types';

export class ConsoleStrategy<
  T extends StringOnlyValues,
> extends React.Component<IConsoleStrategyProps<T>, IConsoleStrategyState<T>> {
  private inputRef = React.createRef<HTMLInputElement>();

  private messages;

  private onSuccessHookHandler;

  private currentValue: keyof T;

  constructor(props: IConsoleStrategyProps<T>) {
    super(props);
    this.messages = props.messages;
    this.onSuccessHookHandler = props.onSucessHookHandler;
    this.state = {
      inputData: {} as T,
      lastMessageIndex: 0,
      isWaitingForInpit: false,
      output: [],
      writtenMessages: [],
      inputType: 'text',
    };
  }

  public componentDidMount() {
    this.writeMessages();
    document.onkeydown = () => {
      this.handleDocumentKeyDown();
    };
  }

  public componentDidUpdate() {
    this.writeMessages();
  }

  public componentWillUnmount() {
    document.onkeydown = null;
  }

  private handleDocumentKeyDown() {
    this.catchFocus();
  }

  private onInput = (key: KeyboardEvent) => {
    if (key.key !== 'Enter') {
      return;
    }
    this.handleSubmit();
  };

  private handleSubmit = () => {
    const { inputType } = this.state;
    const inputElem = this.inputRef.current!;
    const isTypedSecret = inputType === 'password';
    if (isTypedSecret) {
      this.pushMessage(inputElem.value.replace(/./g, '*'), true);
    } else {
      this.pushMessage(inputElem.value, true);
    }
    inputElem.value = '';

    this.setState((prevState) => ({ ...prevState, isWaitingForInpit: false }));
    this.readNext();
  };

  private storeCurrentValue = (input: FormEvent<HTMLInputElement>) => {
    const { inputData } = this.state;
    inputData[this.currentValue] = input.currentTarget.value as T[keyof T];
  };

  private catchFocus() {
    this.inputRef.current?.focus();
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
      this.readLine(message);
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
    const shouldRead: boolean = instanseOfReadMessage(
      messages[lastMessageIndex + 1],
    );

    this.setState((prevState) => ({
      ...prevState,
      lastMessageIndex: prevState.lastMessageIndex + 1,
      isWaitingForInpit: shouldRead,
    }));
  }

  private readLine(message: IReadMessage<StringOnlyValues>): void {
    this.pushMessage(message.message, false, message.isSecret);

    this.currentValue = message.mapToField;
  }

  private pushMessage(
    message: string,
    toOutputOnly?: boolean,
    isSecret?: boolean,
  ) {
    if (toOutputOnly) {
      this.setState((prevState) => ({
        ...prevState,
        output: [...prevState.output, message],
        inputType: isSecret ? 'password' : 'text',
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        output: [...prevState.output, message],
        writtenMessages: [...prevState.writtenMessages, message],
        inputType: isSecret ? 'password' : 'text',
      }));
    }
  }

  render() {
    const { isWaitingForInpit } = this.state;
    const { output, inputType } = this.state;

    return (
      <div>
        {output.map((msg) => (
          <p key={msg}>{msg}</p>
        ))}
        {isWaitingForInpit ? (
          <input
            ref={this.inputRef}
            id="console-input"
            onInput={this.storeCurrentValue}
            onKeyDown={this.onInput}
            className={style['console-input']}
            type={inputType}
          />
        ) : null}
      </div>
    );
  }
}

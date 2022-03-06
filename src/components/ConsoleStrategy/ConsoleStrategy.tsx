import React, { FormEvent, KeyboardEvent, useEffect, useState } from 'react';
import style from './ConsoleStrategy.style.scss';
import {
  IConsoleStrategyProps,
  IMessage,
  StringOnlyValues,
} from './ConsoleStrategy.types';

export function ConsoleStrategy<T extends StringOnlyValues>(
  props: IConsoleStrategyProps<StringOnlyValues>,
) {
  const inputRef = React.createRef<HTMLInputElement>();
  const { messages } = props;
  const [prevMessagesLen, setPrevMessagesLen] = useState(0);
  const { onSuccessHookHandler } = props;
  const [inputValue, setInputValue] = useState({} as T);
  let tempInputValue = '';
  const [printedMessages, setPrintedMessages] = useState<IMessage<T>[]>([]);
  const [lastMessageIndex, setLastMessageIndex] = useState(0);

  const currentMessage = messages[lastMessageIndex];

  useEffect(() => {
    document.onkeydown = () => {
      catchFocus();
    };
  });

  const catchFocus = () => {
    inputRef.current?.focus();
  };

  const printMessages = () => {
    if (printedMessages.includes(currentMessage)) {
      return;
    }
    setPrintedMessages((prev) => [...prev, currentMessage]);
  };

  const tryMoveNext = () => {
    if (!currentMessage.inputType) {
      moveNext();
    }
  };

  const moveNext = () => {
    if (lastMessageIndex + 1 >= messages.length) {
      clearState();
      setTimeout(() => {
        onSuccessHookHandler(inputValue);
      }, 0);
    } else {
      setLastMessageIndex((prev) => prev + 1);
    }
  };

  const clearState = () => {
    setPrintedMessages([]);
    setInputValue({} as T);
    setLastMessageIndex(0);
    return null;
  };

  if (prevMessagesLen !== messages.length) {
    clearState();
    setPrevMessagesLen(messages.length);
    return null;
  }

  const saveValue = (key: KeyboardEvent) => {
    if (key.key !== 'Enter') {
      return;
    }
    storeCurrentValue();
    printCurrentValue();
    moveNext();
    clearInput();
  };

  const handleValueChanged = (input: FormEvent<HTMLInputElement>) => {
    tempInputValue = input.currentTarget.value;
  };

  const storeCurrentValue = () => {
    const temp = inputValue;
    if (currentMessage.mapToField) {
      temp[currentMessage.mapToField as keyof T] = tempInputValue as T[keyof T];
      setInputValue(temp);
    }
  };

  const printCurrentValue = () => {
    let valueToPrint = tempInputValue;
    if (currentMessage.inputType && currentMessage.inputType === 'password') {
      valueToPrint = valueToPrint.replace(/./g, '*');
    }
    const newMsg: IMessage<T> = {
      message: valueToPrint,
    };
    setPrintedMessages((prev) => [...prev, newMsg]);
  };

  const clearInput = () => {
    inputRef.current!.value = '';
  };

  printMessages();
  tryMoveNext();

  return (
    <div>
      {printedMessages.map((message) => (
        <p
          key={message.message}
          className={
            style[message.outputClassName ? message.outputClassName : '']
          }>
          {message.message}
        </p>
      ))}
      {currentMessage.inputType ? (
        <input
          ref={inputRef}
          id="console-input"
          onInput={handleValueChanged}
          onKeyDown={saveValue}
          className={style['console-input']}
          type={currentMessage.inputType}
        />
      ) : null}
    </div>
  );
}

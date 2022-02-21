/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable max-len */
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import { ConsoleStrategy } from './ConsoleStrategy';
import { IConsoleStrategyProps } from './ConsoleStrategy.types';

type empty = {};
type withResult = { result: string };

describe.only('Console strategy', () => {
  const DOM = new JSDOM(
    '<!DOCTYPE html><html><head></head><body><div id="root">test</div></body></html>',
    { url: 'http://localhost:3000' },
  );
  (global as any).document = DOM.window.document;
  (global as any).window = DOM.window;

  it('should write all of messages', () => {
    const props = buildDefaultProps();
    const testRenderer = TestRenderer.create(
      <ConsoleStrategy
        messages={props.messages}
        onSucessHookHandler={() => {}}
      />,
    );
    const consoleStrategy = testRenderer.getInstance() as any;
    expect(consoleStrategy.state.writtenMessages).to.has.length(2);
    expect(consoleStrategy.state.writtenMessages).to.contain.all.members(
      props.messages.map((i) => i.message),
    );
    expect(consoleStrategy.state.output).to.has.length(2);
    expect(consoleStrategy.state.output).to.contain.all.members(
      props.messages.map((i) => i.message),
    );
  });

  it('should print user input in console', () => {
    const props = buildPropsWithInput();
    const testInput = 'test_input';
    let result: withResult = { result: '' };
    const testRenderer = TestRenderer.create(
      <ConsoleStrategy
        messages={props.messages}
        onSucessHookHandler={(res) => {
          result = res;
        }}
      />,
    );
    const consoleStrategy = testRenderer.getInstance() as any;
    simulateUserInput(testInput, consoleStrategy);
    expect(consoleStrategy.state.writtenMessages).to.has.length(3);
    expect(consoleStrategy.state.writtenMessages).to.contain.all.members(
      props.messages.map((i) => i.message),
    );
    expect(consoleStrategy.state.output).to.has.length(4); // with user input
    expect(consoleStrategy.state.output).to.contain.all.members([
      ...props.messages.map((i) => i.message),
      testInput,
    ]);
    expect(result).to.be.deep.equal({ result: testInput });
  });

  it('should fire onSucessHookHandler', () => {
    const props = buildDefaultProps();
    let isSucessHookCalled = false;
    TestRenderer.create(
      <ConsoleStrategy
        messages={props.messages}
        onSucessHookHandler={() => {
          isSucessHookCalled = true;
        }}
      />,
    );
    expect(isSucessHookCalled).to.be.true;
  });

  it('should print user secret input as stars', () => {
    const props = buildPropsWithInput(true);
    const testInput = 'test_input';
    const testInputDotted = '**********';
    const testRenderer = TestRenderer.create(
      <ConsoleStrategy
        messages={props.messages}
        onSucessHookHandler={() => {}}
      />,
    );
    const consoleStrategy = testRenderer.getInstance() as any;
    simulateUserInput(testInput, consoleStrategy);
    expect(consoleStrategy.state.writtenMessages).to.has.length(3);
    expect(consoleStrategy.state.writtenMessages).to.contain.all.members(
      props.messages.map((i) => i.message),
    );
    expect(consoleStrategy.state.output).to.has.length(4); // with user input
    expect(consoleStrategy.state.output).to.contain.all.members([
      ...props.messages.map((i) => i.message),
      testInputDotted,
    ]);
  });

  it('should return secret result correctly', () => {
    const props = buildPropsWithInput(true);
    const testInput = 'test_input';
    let result: withResult = { result: '' };
    const testRenderer = TestRenderer.create(
      <ConsoleStrategy
        messages={props.messages}
        onSucessHookHandler={(res) => {
          result = res;
        }}
      />,
    );
    const consoleStrategy = testRenderer.getInstance() as any;
    simulateUserInput(testInput, consoleStrategy);
    expect(result).to.be.deep.equal({ result: testInput });
  });
});

function buildDefaultProps(): IConsoleStrategyProps<empty> {
  return {
    messages: [
      {
        message: 'test message1',
      },
      {
        message: 'test message2',
      },
    ],
    onSucessHookHandler: () => {},
  };
}

function buildPropsWithInput(
  isSecret?: boolean,
): IConsoleStrategyProps<withResult> {
  return {
    messages: [
      {
        message: 'test message1',
      },
      {
        message: 'test message2',
      },
      {
        message: 'test message3',
        mapToField: 'result',
        isSecret,
      },
    ],
    onSucessHookHandler: () => {},
  };
}

function simulateUserInput(text: string, consoleStrategy: any) {
  const fakeInput = { value: text };
  const fakeInputEvent: any = { currentTarget: fakeInput };
  consoleStrategy.storeCurrentValue(fakeInputEvent);
  const enterKey = { key: 'Enter', currentTarget: fakeInput };
  consoleStrategy.inputRef = { current: fakeInput };
  consoleStrategy.onInput(enterKey);
}

import {
  IMessage,
  StringOnlyValues,
} from '../components/ConsoleStrategy/ConsoleStrategy.types';

export function computeHashForMessage<T extends StringOnlyValues>(
  input: IMessage<T>,
) {
  let result: number = 0;
  result += computeHashForString(input.message);
  result += computeHashForString(input.inputType ? input.inputType : '1');
  result += computeHashForString(
    input.mapToField ? input.mapToField.toString() : '1',
  );
  result += computeHashForString(
    input.outputClassName ? input.outputClassName : '1',
  );
  result += input.delay ? input.delay : 0;
  return result;
}

export function computeHashForString(input: string) {
  let result: number = 0;
  for (const char of input) {
    result += char.charCodeAt(0);
  }
  return result * input.length;
}

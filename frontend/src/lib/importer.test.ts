import { expect, it } from "bun:test";
import { parseUnkownFloat } from "./importer";

it.each<[string, number]>([
  ["-1", -1],
  ["+1", 1],
  ["0", 0],
  ["1.01", 1.01],
  ["1,01", 1.01],
  ["1,000", 1000],
  ["1,000.0", 1000],
  ["1 000.0", 1000],
  ["01 000.0", 1000],
  ["01 000,0", 1000],
])("parseUnkownFloat", (input, expected) => {
  expect(parseUnkownFloat(input)).toBe(expected);
});

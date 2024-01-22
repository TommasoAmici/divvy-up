import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as XLSX from "xlsx";
import type { ExpenseImport } from "./client";

dayjs.extend(customParseFormat);

export class Importer {
  file: File;
  data: Record<string, unknown>[] = [];
  headers: string[] = [];
  dateFormat: string | undefined;
  dateColumn: string | undefined;
  amountColumn: string | undefined;
  descriptionColumn: string | undefined;

  constructor(file: File) {
    this.file = file;
  }

  setDateFormat(format: string | undefined) {
    if (format) {
      this.dateFormat = format.toUpperCase();
    }
  }

  setDateColumn(column: string | undefined) {
    if (column) {
      this.dateColumn = column;
    }
  }

  setAmountColumn(column: string | undefined) {
    if (column) {
      this.amountColumn = column;
    }
  }

  setDescriptionColumn(column: string | undefined) {
    if (column) {
      this.descriptionColumn = column;
    }
  }

  async parse() {
    try {
      const data = await this.file.arrayBuffer();
      const book = XLSX.read(data, { raw: true });
      const worksheet = book.Sheets[book.SheetNames[0]];
      this.data = XLSX.utils.sheet_to_json(worksheet);
    } catch (error) {
      throw new Error("Failed to read file's contents");
    }

    const row = this.data[0];
    if (typeof row !== "object" || row === null) {
      throw new Error("Failed to read file's contents");
    }
    this.headers = Object.keys(row);
  }

  preview({
    dateColumn,
    amountColumn,
    dateFormat,
  }: {
    dateColumn?: string;
    amountColumn?: string;
    dateFormat?: string;
  }) {
    const formatted: (Record<string, unknown> & { id: string | number })[] = [];

    for (const [index, row] of this.data.entries()) {
      const datum = structuredClone(row);

      const id = "id" in row ? row.id : index;
      datum.id = id?.toString();

      if (dateColumn !== undefined) {
        const value = row[dateColumn];
        if (typeof value === "string") {
          datum[dateColumn] = parseUnkownDate(value, dateFormat);
        }
      }

      if (amountColumn) {
        const value = row[amountColumn];
        if (typeof value === "string") {
          datum[amountColumn] = parseUnkownFloat(value);
        }
      }

      // @ts-expect-error id is added above
      formatted.push(datum);
    }
    return formatted;
  }

  expensesForImport({
    selectedRowIds,
    dateColumn,
    descriptionColumn,
    amountColumn,
    dateFormat,
  }: {
    selectedRowIds: string[];
    dateColumn?: string;
    descriptionColumn?: string;
    amountColumn?: string;
    dateFormat?: string;
  }) {
    if (amountColumn === undefined) {
      throw new Error(
        "Can't import expenses without specifying the amount column"
      );
    }
    if (descriptionColumn === undefined) {
      throw new Error(
        "Can't import expenses without specifying the description column"
      );
    }

    const formatted: ExpenseImport[] = [];
    const selectedIDs = new Set(selectedRowIds);

    for (const [index, row] of this.data.entries()) {
      const id = "id" in row ? row.id : index.toString();
      if (typeof id !== "string") {
        throw new Error("Invalid ID");
      }
      // only import selected rows
      if (!selectedIDs.has(id)) {
        continue;
      }

      let date: string;
      if (dateColumn !== undefined) {
        const value = row[dateColumn];
        if (typeof value === "string") {
          date = parseUnkownDate(value, dateFormat);
        } else {
          throw new Error("Invalid date");
        }
      } else {
        date = new Date().toISOString();
      }

      let amount: number;
      const value = row[amountColumn];
      if (typeof value === "string") {
        amount = parseUnkownFloat(value);
      } else {
        throw new Error("Invalid amount");
      }

      const description = row[descriptionColumn];
      if (typeof description !== "string") {
        throw new Error("Invalid description");
      }

      formatted.push({ date, amount, description });
    }
    console.log(formatted);
    return formatted;
  }
}

function parseUnkownDate(value: string, dateFormat?: string) {
  try {
    return dayjs(value, dateFormat).format("YYYY-MM-DD");
  } catch (error) {
    return `${value} (invalid)`;
  }
}

const legalFloatValues = new Set([
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ",",
  ".",
  "-",
  "+",
]);

function cleanUnknownFloat(rawValue: string) {
  let value = "";
  for (const ch of rawValue) {
    if (legalFloatValues.has(ch)) {
      value += ch;
    }
  }
  return value;
}

export function parseUnkownFloat(rawValue: string) {
  const value = cleanUnknownFloat(rawValue);
  const numCommas = value.match(/,/)?.length ?? 0;
  const hasComma = numCommas > 0;
  const hasPoint = value.includes(".");
  // commas are used as separators, but the decimals
  // are separated by dots
  if (hasComma && hasPoint) {
    return parseFloat(value.replaceAll(",", ""));
  }
  // commas are used for decimals or for separators
  if (hasComma && !hasPoint) {
    // commas are used for separators, as there are more than 1
    if (numCommas > 1) {
      return parseFloat(value.replaceAll(",", ""));
    } else {
      // determine if the one comma in the value is used for
      // decimals or not
      const numsAfterComma = value.length - value.lastIndexOf(",") - 1;
      if (numsAfterComma > 2) {
        return parseFloat(value.replaceAll(",", ""));
      } else {
        return parseFloat(value.replaceAll(",", "."));
      }
    }
  }
  return parseFloat(value);
}

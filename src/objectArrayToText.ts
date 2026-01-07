export interface ObjectToTextOptions {
  /**
   * Delimiter to use between fields
   * @default '\t'
   */
  delimiter?: string;
  /**
   * End of line character(s)
   * @default '\n'
   */
  eol?: string;
  /**
   * Whether to include a header row
   * @default true
   */
  header?: boolean;
  /**
   * If provided, maps object keys to different header names
   */
  headerMapping?: Record<string, string>;
}

/**
 * Converts an array of objects into a text representation (e.g., CSV or TSV).
 * @param data - Array of objects
 * @param options - Options for text conversion
 * @returns Text representation of the object array
 */
export function objectArrayToText(
  data: Array<Record<string, string | number | boolean>>,
  options: ObjectToTextOptions = {},
): string {
  const {
    delimiter = '\t',
    eol = '\n',
    header = true,
    headerMapping = {},
  } = options;

  const allKeys = new Set<string>();
  for (const item of data) {
    for (const key in item) {
      allKeys.add(key);
    }
  }
  const keys = Array.from(allKeys);

  let text = '';
  if (header) {
    const headerRow = keys
      .map((key) => headerMapping[key] || key)
      .join(delimiter);
    text += headerRow + eol;
  }

  for (const item of data) {
    const row = keys
      .map((key) => {
        const value = item[key];
        return value !== undefined ? String(value) : '';
      })
      .join(delimiter);
    text += row + eol;
  }

  return text;
}

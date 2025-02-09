/**
 * A set of utilities for interacting with strings. Serving 20 functions.
 * @author ZakaHaceCosas
 *
 * _Note: Avoid using it as `const { fn } = StringUtils`, it can cause issues._
 *
 * @example
 * ```ts
 * import { StringUtils, type UnknownString } from "@zakahacecosas/string-utils";
 *
 * const searchQuery: UnknownString = getSearchQuery() // example
 * if (!StringUtils.validate(searchQuery)) return []; // ensure it's not an empty or undefined string
 *
 * const cleanSearchQuery = StringUtils.normalize(searchQuery); // normalize accents, trailing space, etc...
 * return searchResults(cleanSearchQuery); // example
 * ```
 *
 * @example
 * ```ts
 * function createBook(title: string, author: string) {
 *  const bookTitle = StringUtils.toTitleCase(title);
 *  const bookAuthor = StringUtils.capitalizeWords(author);
 *
 *  return {
 *   bookTitle,
 *   bookAuthor,
 *   publishedAt: new Date(),
 *   ISBN: getIsbn()
 *  }
 * }
 *
 * const book = createBook("war and peace", "sir john doe");
 * console.log(book.bookTitle, book.bookAuthor) // "War and Peace, Sir John Doe"
 * ```
 *
 * @module
 */

/**
 * A variable that's _possibly_ a string. `""`, or `"    "`, aren't considered strings.
 *
 * @export
 */
export type UnknownString = undefined | null | string | "";

/**
 * A set of utilities for interacting with strings. Serving 20 functions.
 *
 * _Note: Avoid using it as `const { fn } = StringUtils`, it can cause issues._
 *
 * @author ZakaHaceCosas
 */
export const StringUtils: {
  /**
   * Capitalizes the first letter of the string.
   * @param str The string to modify.
   *
   * @example
   * ```ts
   * const str = StringUtils.toUpperCaseFirst("deno the Runtime");
   * console.log(str); // Deno the Runtime
   * ```
   *
   * @returns The string with the first letter capitalized.
   */
  toUpperCaseFirst(str: string): string;
  /**
   * Lowercases the first letter of the string.
   * @param str The string to modify.
   *
   * @example
   * ```ts
   * const str = StringUtils.toLowerCaseFirst("Deno the Runtime");
   * console.log(str); // deno the Runtime
   * ```
   *
   * @returns The string with the first letter in lowercase.
   */
  toLowerCaseFirst(str: string): string;
  /**
   * Capitalizes the first letter of each word in the string.
   * @param str The string to modify.
   *
   * @example
   * ```ts
   * const str = StringUtils.capitalizeWords("deno the javaScript runtime");
   * console.log(str); // Deno The JavaScript Runtime
   * ```
   *
   * @returns The string with each word capitalized.
   */
  capitalizeWords(str: string): string;
  /**
   * Capitalizes the first letter of each word except small words, like "the" or "and".
   * @param str The string to modify.
   *
   * @example
   * ```ts
   * const str = StringUtils.toTitleCase("deno the javaScript runtime");
   * console.log(str); // Deno the JavaScript Runtime
   * ```
   *
   * @returns The string with title-case formatting.
   */
  toTitleCase(str: string): string;
  /**
   * Reverses the characters of a string.
   * @param str The string to reverse.
   *
   * @example
   * ```ts
   * const str = StringUtils.reverseString("Deno");
   * console.log(str); // oneD
   * ```
   *
   * @returns The reversed string.
   */
  reverseString(str: string): string;
  /**
   * Removes all whitespace from the string.
   * @param str The string to modify.
   *
   * @example
   * ```ts
   * const str = StringUtils.removeWhitespace("One Two Three!");
   * console.log(str); // OneTwoThree!
   * ```
   *
   * @returns The string without any whitespace.
   */
  removeWhitespace(str: string): string;
  /**
   * Truncates a string to a specified length and appends "..." if needed.
   * @param str The string to truncate.
   * @param length The length to truncate to.
   *
   * @example
   * ```ts
   * const str = StringUtils.truncate("Hello, world!", 5);
   * console.log(str) // Hello...
   * ```
   *
   * @returns The truncated string.
   */
  truncate(str: string, length: number): string;
  /**
   * Takes an argument that's _possibly_ a string and validates it.
   * @param str The string to test.
   *
   * @example
   * ```ts
   * const argument: UnknownString = Deno.args[1]; // Deno.args[1] is maybe not defined, or maybe an empty string which you might don't want
   * if (!StringUtils.validate(argument)) {
   *    throw new Error("No argument given!");
   * }
   * console.log("Arg:", secondCliArgument); // here we know it's not null, not undefined, and not "" (or "     ")
   * ```
   *
   * @returns True if it's valid and false if otherwise.
   */
  validate(str: UnknownString): str is string;
  /**
   * Returns the last character of a string.
   *
   * @param {string} str The string to look inside of.
   *
   * @example
   * ```ts
   * const str = StringUtils.getLastChar("Hello!");
   * console.log(str) // outputs "!"
   * ```
   *
   * @returns {string} The last character of the string.
   */
  getLastChar(str: string): string;
  /**
   * Returns the given string with all CLI coloring control characters removed. In case you have a formatted string (CLI-colored) and want to compare it to a regular string, use this function - otherwise control characters will make JS think strings are different even if they aren't.
   *
   * @param {string} str The string to strip CLI colors from.
   *
   * @example
   * ```ts
   * console.log("\x1b[31mRED TEXT"); // outputs "\x1b[31mRED TEXT"
   * const str = StringUtils.stripCliColors("\x1b[31mRED TEXT");
   * console.log(str) // outputs "RED TEXT"
   * ```
   *
   * @returns {string} The clean string.
   */
  stripCliColors(str: string): string;
  /**
   * Normalizes a string so it's easier to work with it. Removes external and internal trailing spaces, lowercases the string, and normalizes accents too.
   *
   * @param {string} str The string to normalize.
   * @param {boolean} strict If true, it'll also remove underscores, hyphens, and other non-alphanumeric characters.
   * @param {boolean}stripCliColors If true, it'll also remove CLI-coloring control characters.
   *
   * @example
   * ```ts
   * const query = "   mY  sEaRcH      qUÉry_1  "
   *
   * const str = StringUtils.normalize(query)
   * const str2 = StringUtils.normalize(query, true)
   * console.log(str); // "my search query_1"
   * console.log(str2); // "my search query1"
   * ```
   *
   * @returns {string} The normalized string.
   */
  normalize(str: string, strict?: boolean, stripCliColors?: boolean): string;
  /**
   * Alphabetically sorts an array of strings. Returns a new, sorted array.
   *
   * @param {string[]} strArr The string array to be sorted.
   *
   * @example
   * ```ts
   * const sortedArr = StringUtils.sortAlphabetically(["zulu", "bravo", "delta", "alpha"]);
   * console.log(sortedArr); // ["alpha", "bravo", "delta", "zulu"]
   * ```
   *
   * @returns {string[]} The sorted array.
   */
  sortAlphabetically(strArr: string[]): string[];
  /**
   * Prepends, appends, or both, whitespace to a string.
   *
   * @param {string} str String to space.
   * @param {number} spaceBefore Space to be added before the actual string.
   * @param {number} spaceAfter Space to be added after the actual string.
   *
   * @example
   * ```ts
   * const str = StringUtils.spaceString("text", 2, 4);
   * console.log(str); // "  text    "
   * ```
   *
   * @returns {string} The spaced string.
   */
  spaceString(str: string, spaceBefore: number, spaceAfter: number): string;
  /**
   * Returns true if the given string is a palindrome. This means, it reads the same forwards and backwards.
   *
   * @param {string} str The string to check.
   *
   * @example
   * ```ts
   * const str = "Hannah"
   * console.log(StringUtils.isPalindrome(str)) // true
   * ```
   *
   * @returns {boolean} Whether it's a palindrome or not.
   */
  isPalindrome(str: string): boolean;
  /**
   * Takes a string array and returns it with all strings normalized and invalid strings removed. For better preservation of strings, use {@link softlyNormalizeArray}. For stricter normalization, use {@link strictlyNormalizeArray}.
   *
   * @param {UnknownString[]} strArr Array of strings.
   *
   * @example
   * ```ts
   * const strArr = ["    hIi ", "", "", " yés! ", ""]
   * console.log(StringUtils.normalizeArray(strArr)) // ["hii", "yes!"]
   * ```
   *
   * @returns {string[]} Array of normalized strings.
   */
  normalizeArray(strArr: UnknownString[]): string[];
  /**
   * Takes a string array and returns it with all strings trimmed and invalid strings removed. For balanced normalization of strings, use {@link normalizeArray}. For stricter normalization, use {@link strictlyNormalizeArray}.
   *
   * @param {UnknownString[]} strArr Array of strings.
   * @param {?boolean} [lowercase] If true, strings will be lowercased as well.
   *
   * @example
   * ```ts
   * const strArr = ["    hIi ", "", "", " yés! ", ""]
   * console.log(StringUtils.softlyNormalizeArray(strArr, false)) // ["hIi", "yés!"]
   * ```
   *
   * @returns {string[]} Array of softly normalized strings.
   */
  softlyNormalizeArray(strArr: UnknownString[], lowercase?: boolean): string[];
  /**
   * Takes a string array and returns it with all strings strictly normalized and invalid strings removed. For better preservation of strings, use {@link softlyNormalizeArray}. For balanced normalization, use {@link normalizeArray}.
   *
   * @param {UnknownString[]} strArr Array of strings.
   *
   * @example
   * ```ts
   * const strArr = ["    hIi ", "", "", " yés! ", " 123_some thing", ""]
   * console.log(StringUtils.strictlyNormalizeArray(strArr)) // ["hii", "yes!", "123something"]
   * ```
   *
   * @returns {string[]} Array of normalized strings.
   */
  strictlyNormalizeArray(strArr: UnknownString[]): string[];
  /**
   * Takes a `{"K": "V"}` value pair array and returns a formatted table string. Similar to `console.table()`, but allows to passed CLI-formatted strings.
   *
   * @param {Record<string, string | number | unknown[]>[]} strArr Array of KV pairs.
   *
   * @example
   * ```ts
   * const strArr = [{"Name": "Zaka", "Age": 55}]
   * console.log(StringUtils.table(strArr))
   * // ┌──────────────────────┬──────────────────────┐
   * // │ Name                 │ Age                  │
   * // ├──────────────────────┼──────────────────────┤
   * // │ Zaka                 │ 55                   │
   * // └──────────────────────┴──────────────────────┘
   *
   * ```
   *
   * @returns {string} Formatted table.
   */
  table(strArr: Record<string, string | number | unknown[]>[]): string;
  /**
   * Takes a string and splits it using commas (or a custom separator string), returning an array of separated strings.
   *
   * @example
   * ```ts
   * const str = "alpha,bravo,charlie";
   * console.log(StringUtils.kominator(str)); // ["alpha", "bravo", "charlie"]
   * ```
   *
   * @param {string} str String to be splitted.
   * @param {?string} [separator=","] Separator string. Defaults to a comma.
   * @returns {string[]} Array of split strings.
   */
  kominator(str: string, separator?: string): string[];
  /**
   * Takes a string and "reveals" it character by character. **Async.**
   *
   * @async
   * @example
   * ```ts
   * await StringUtils.reveal("Loading...", 35);
   * // this will print a letter every 35 milliseconds
   * ```
   *
   * @param {string} str String to be revealed.
   * @param {?number} [delay=50] Delay for each char to be shown, in milliseconds. Defaults to 50.
   * @returns {Promise<void>} A Promise. It `console.log()`s the string to the standard output.
   */
  reveal(str: string, delay?: number): Promise<void>;
} = {
  toUpperCaseFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  toLowerCaseFirst(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  },

  capitalizeWords(str: string): string {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  },

  toTitleCase(str: string): string {
    const smallWords = [
      "and",
      "or",
      "but",
      "the",
      "in",
      "on",
      "of",
      "for",
      "with",
    ];
    return str
      .split(" ")
      .map((word, index) =>
        smallWords.includes(word.toLowerCase()) && index !== 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  },

  reverseString(str: string): string {
    return str.split("").reverse().join("");
  },

  removeWhitespace(str: string): string {
    return str.replace(/\s+/g, "");
  },

  truncate(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.substring(0, length) + "...";
  },

  validate(str: UnknownString): str is string {
    if (
      str === undefined || str === null || typeof str !== "string" ||
      this.normalize(str) === ""
    ) {
      return false;
    }

    return true;
  },

  getLastChar(str: string): string {
    return str.charAt(str.length - 1);
  },

  stripCliColors(str: string): string {
    return str
      // deno-lint-ignore no-control-regex
      .replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
  },

  normalize(str: string, strict?: boolean, stripCliColors?: boolean): string {
    const normalizedStr = str
      .normalize("NFD") // normalize á, é, etc.
      .replace(/[\u0300-\u036f]/g, "") // remove accentuation
      .replace(/\s+/g, " ") // turn "my      search  query" into "my search query"
      .trim()
      .toLowerCase()
      .replace(strict ? /[\s\W_]/g : "", "");

    return stripCliColors ? this.stripCliColors(normalizedStr) : normalizedStr;
  },

  sortAlphabetically(strArr: string[]): string[] {
    return strArr.toSorted((a: string, b: string) =>
      this.normalize(a).localeCompare(this.normalize(b))
    );
  },

  spaceString(str: string, spaceBefore: number, spaceAfter: number): string {
    function space(n: number): string {
      return n === 0 ? "" : " ".repeat(n);
    }
    return `${space(spaceBefore)}${str}${space(spaceAfter)}`;
  },

  isPalindrome(str: string): boolean {
    const normalized = this.normalize(str, true);
    return normalized === this.reverseString(normalized);
  },

  normalizeArray(strArr: UnknownString[]): string[] {
    const validated = strArr.filter((str) => this.validate(str));
    return validated.map((str) => this.normalize(str));
  },

  softlyNormalizeArray(strArr: UnknownString[], lowercase?: boolean): string[] {
    return strArr.filter((str) => this.validate(str)).map((str) => {
      return (lowercase === true) ? str.trim().toLowerCase() : str.trim();
    });
  },

  strictlyNormalizeArray(strArr: UnknownString[]): string[] {
    const validated = strArr.filter((str) => this.validate(str));
    return validated.map((str) => this.normalize(str, true, true));
  },

  table(strArr: Record<string, string | number | unknown[]>[]): string {
    if (strArr.length === 0) return "No data to display.";

    /** Separator characters */
    const chars = {
      y: " │ ",
      x: "─",
      full: "┼",
      xDown: "┬",
      xUp: "┴",
      yLeft: "├",
      yRight: "┤",
      xlUp: "┌",
      xlDown: "└",
      xrUp: "┐",
      xrDown: "┘",
    };
    const headers: string[] = Object.keys(strArr[0]);
    // compute max width for each column (including headers)
    const columnWidths: number[] = headers.map((header) =>
      Math.max(
        header.length,
        ...strArr.map((row) => {
          const str = row[header]?.toString() ?? "";
          const strLength = this.normalize(str, false, true).length;
          return (strLength + 1);
        }),
      )
    );

    const fmtCell = (value: string, index: number): string => {
      const diff = value.trim().length - this.normalize(value, false, true).length;
      return value.trim().padEnd(columnWidths[index] + diff);
    };

    // create the separator rows
    const createSeparator = (left: string, middle: string, right: string): string => {
      return `${left}${
        columnWidths.map((w) => chars.x.repeat(w + 2)).join(middle)
      }${right}`;
    };

    const separators = {
      middle: createSeparator(chars.yLeft, chars.full, chars.yRight),
      top: createSeparator(chars.xlUp, chars.xDown, chars.xrUp),
      bottom: createSeparator(chars.xlDown, chars.xUp, chars.xrDown),
    };

    // format headers
    const headerRow: string = `${chars.y.trimStart()}${
      headers.map((h, i) => fmtCell(h, i)).join(chars.y)
    }${chars.y.trimEnd()}`;

    // format data rows
    try {
      const dataRows = strArr.map((row) =>
        headers.map((header, i) => {
          if (!row[header] || !this.validate(row[header]?.toString() ?? "")) {
            throw new Error(
              `Unable to represent data. Row ${
                Object.entries(row)
              } is not consistent with the rest of the table.`,
            );
          }
          const value = row[header].toString();
          return fmtCell(value, i);
        }).join(chars.y)
      );

      // construct the table
      return [
        separators.top,
        headerRow,
        separators.middle,
        ...dataRows.map((row) => `│ ${row} │`),
        separators.bottom,
      ].join("\n");
    } catch (e) {
      return String(e);
    }
  },

  kominator(str: string, separator: string = ","): string[] {
    return str.split(separator).map((s) => s.replace('"', "").trim());
  },

  async reveal(str: string, delay = 50): Promise<void> {
    for (const char of str) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      Deno.stdout.write(new TextEncoder().encode(char));
    }
    console.log(); // Move to the next line after completing
  },
};

/**
 * A set of utilities for interacting with strings.
 * @author ZakaHaceCosas
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
 *
 * @module
 */

/**
 * Variable that's _possibly_ a string.
 *
 * @export
 */
export type UnknownString = undefined | null | string | "";

/**
 * A set of utilities for interacting with strings.
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
   * const str = StringUtils.reverseString("JavaScript");
   * console.log(str); // tpircSavaJ
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
   * Normalizes a string so it's easier to work with it. Removes external and internal trailing spaces, lowercases the string, and normalizes accents too.
   *
   * @param {string} str The string to normalize.
   *
   * @example
   * ```ts
   * const str = StringUtils.normalize("   mY  sEaRcH      qUÉry    ")
   * console.log(str); // "my search query"
   *
   * @returns {string} The normalized string.
   */
  normalize(str: string): string;
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
      str.trim() === ""
    ) {
      return false;
    }

    return true;
  },

  getLastChar(str: string): string {
    return str.charAt(str.length - 1);
  },

  normalize(str: string): string {
    return str
      .normalize("NFD") // normalize á, é, etc.
      .replace(/[\u0300-\u036f]/g, "") // remove accentuation
      .replace(/\s+/g, " ") // turn "my      search  query" into "my search query"
      .trim()
      .toLowerCase();
  },
};

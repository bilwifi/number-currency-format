"use strict";

const CURRENCY_SYMBOL = {
  AFN: "؋",
  ALL: "Lek",
  AMD: "֏",
  ANG: "ƒ",
  AOA: "Kz",
  ARS: "$",
  AUD: "$",
  AWG: "ƒ",
  AZN: "₼",
  BAM: "KM",
  BBD: "$",
  BDT: "৳",
  BGN: "лв",
  BHD: "BD",
  BIF: "FBu",
  BMD: "$",
  BND: "$",
  BOB: "$b",
  BRL: "R$",
  BSD: "$",
  BTN: "Nu.",
  BWP: "P",
  BYN: "Br",
  BZD: "BZ$",
  CAD: "$",
  CDF: "FC",
  CHF: "CHF",
  CLP: "$",
  CNY: "¥",
  COP: "$",
  CRC: "₡",
  CUC: "CUC$",
  CUP: "₱",
  CVE: "$",
  CZK: "Kč",
  DJF: "Fdj",
  DKK: "kr",
  DOP: "RD$",
  DZD: "دج",
  EGP: "£",
  ERN: "Nfk",
  ETB: "Br",
  EUR: "€",
  FJD: "$",
  GBP: "£",
  GEL: "GEL",
  GHS: "¢",
  GIP: "£",
  GMD: "D",
  GNF: "FG",
  GTQ: "Q",
  GYD: "$",
  HKD: "$",
  HNL: "L",
  HRK: "kn",
  HTG: "G",
  HUF: "Ft",
  IDR: "Rp",
  ILS: "₪",
  INR: "₹",
  IQD: "ع.د",
  IRR: "﷼",
  ISK: "kr",
  JEP: "£",
  JMD: "J$",
  JOD: "د.",
  JPY: "¥",
  KES: "KSh",
  KGS: "лв",
  KHR: "៛",
  KMF: "KMF",
  KPW: "₩",
  KRW: "₩",
  KWD: "KD",
  KYD: "$",
  KZT: "лв",
  LAK: "₭",
  LBP: "£",
  LKR: "₨",
  LRD: "$",
  LSL: "L",
  LYD: "LD",
  MAD: "MAD",
  MDL: "L",
  MGA: "Ar",
  MKD: "ден",
  MMK: "K",
  MNT: "₮",
  MOP: "MOP$",
  MRU: "UM",
  MUR: "₨",
  MVR: "Rf",
  MWK: "MK",
  MXN: "$",
  MYR: "RM",
  MZN: "MT",
  NAD: "$",
  NGN: "₦",
  NIO: "C$",
  NOK: "kr",
  NPR: "₨",
  NZD: "$",
  OMR: "﷼",
  PAB: "B/.",
  PEN: "S/.",
  PGK: "K",
  PHP: "₱",
  PKR: "₨",
  PLN: "zł",
  PYG: "Gs",
  QAR: "﷼",
  RON: "lei",
  RSD: "Дин.",
  RUB: "₽",
  RWF: "FRw",
  SAR: "﷼",
  SBD: "$",
  SCR: "₨",
  SDG: "جس.",
  SEK: "kr",
  SGD: "$",
  SHP: "£",
  SLL: "lei",
  SOS: "S",
  SPL: "SPL",
  SRD: "$",
  STN: "Db",
  SVC: "$",
  SYP: "£",
  SZL: "E",
  THB: "฿",
  TJS: "ЅM",
  TMT: "T",
  TND: "DT",
  TOP: "T$",
  TRY: "₺",
  TTD: "TT$",
  TVD: "$",
  TWD: "NT$",
  TZS: "TSh",
  UAH: "₴",
  UGX: "USh",
  USD: "$",
  UYU: "$U",
  UZS: "лв",
  VEF: "Bs",
  VND: "₫",
  VUV: "VT",
  WST: "$",
  XAF: "FCFA",
  XDR: "XDR",
  XOF: "CFA",
  XPF: "₣",
  YER: "﷼",
  ZAR: "R",
  ZMW: "ZK",
  ZWD: "Z$",
};

const CURRENCY_POSITION = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

const SHOW_DECIMALS = {
  ALWAYS: "ALWAYS",
  NEVER: "NEVER",
  IF_NEEDED: "IF_NEEDED",
  AS_IS: "AS_IS",
};

const DEFAULT_OPTIONS = {
  currency: "",
  showDecimals: SHOW_DECIMALS.ALWAYS,
  thousandSeparator: ",",
  decimalSeparator: ".",
  currencyPosition: CURRENCY_POSITION.RIGHT,
  decimalsDigits: 2,
  spacing: true,
  arithmeticalRounding: false,
};
/**
 * Returns value or default value if the value is not defined
 * if value === false or value === '', the value will be returned.
 * @param {*} value
 * @param {*} defaultValue
 */
function parse(value, defaultValue) {
  return value !== undefined ? value : defaultValue;
}

function parseOptions(options) {
  if (!options) {
    return DEFAULT_OPTIONS;
  }
  return {
    currency: options.currency || DEFAULT_OPTIONS.currency,
    thousandSeparator: parse(
      options.thousandSeparator,
      DEFAULT_OPTIONS.thousandSeparator
    ),
    decimalSeparator: parse(
      options.decimalSeparator,
      DEFAULT_OPTIONS.decimalSeparator
    ),
    showDecimals: options.showDecimals || DEFAULT_OPTIONS.showDecimals,
    decimalsDigits: parse(
      options.decimalsDigits,
      DEFAULT_OPTIONS.decimalsDigits
    ),
    currencyPosition:
      options.currencyPosition || DEFAULT_OPTIONS.currencyPosition,
    spacing: parse(options.spacing, DEFAULT_OPTIONS.spacing),
    arithmeticalRounding: parse(
      options.arithmeticalRounding,
      DEFAULT_OPTIONS.arithmeticalRounding
    ),
  };
}
/**
 * Inserts {separator} at every thousand position of number text, like:
 * For separator = ",": 1234567 -> 1,234,567
 * @param {string} numberText - number as text
 * @param {string} separator - separator character
 */
function withThousandSeparator(numberText, separator) {
  return numberText
    .split("")
    .reduce(function (returnText, currentLetter, index) {
      const maybeSeparator =
        index < numberText.length - 1 &&
        (numberText.length - index - 1) % 3 === 0 &&
        currentLetter !== "-"
          ? separator
          : "";
      return returnText + currentLetter + maybeSeparator;
    }, "");
}

function roundToPlace(number, place) {
  return +(Math.round(number + "e+" + place) + "e-" + place);
}

function getCurrencySymbol(currency) {
  return CURRENCY_SYMBOL[currency] || currency;
}
/**
 *
 * @param {number} number - number to be formatted
 * @param {Object} [options] - Formatting options (optional)
 * @param {string} [options.currency=''] - Currency symbol to be printed next to the formatted number. By default: none
 * @param {string} [options.thousandSeparator=','] - Symbol separating thousands. By default: ','
 * @param {string} [options.decimalSeparator='.'] - Symbol separating decimals. By default: '.'
 * @param {string} [options.showDecimals='ALWAYS'] - ALWAYS, IF_NEEDED, AS_IS or NEVER. IF_NEEDED does not show the decimal if it is 0. AS_IS preserves the decimal depth of the source number. By default: 'ALWAYS'
 * @param {string} [options.decimalsDigits=2] - Number of decimal digits. By default: 2
 * @param {string} [options.currencyPosition='RIGHT'] - LEFT or RIGHT. By default: 'RIGHT'
 * @param {boolean} [options.spacing=true] - spacing between currency and price
 * @param {boolean} [options.arithmeticalRounding=false] - Enables regular rounding without tie-breaking. By default: false
 */
function format(number, options) {
  const opts = parseOptions(options);

  const fullPriceInNormalFormat =
    opts.showDecimals === SHOW_DECIMALS.AS_IS
      ? number.toString()
      : parseFloat(
          (opts.arithmeticalRounding
            ? roundToPlace(number, opts.decimalsDigits)
            : +number
          ).toString()
        ).toFixed(
          opts.showDecimals === SHOW_DECIMALS.NEVER ? 0 : opts.decimalsDigits
        );

  if (isNaN(fullPriceInNormalFormat)) return number;

  const priceAndDecimals = fullPriceInNormalFormat.split(".");
  const integerPricePart = priceAndDecimals[0];
  const decimalPricePart = priceAndDecimals[1] || "";

  const decimals =
    opts.showDecimals === SHOW_DECIMALS.ALWAYS ||
    (opts.showDecimals === SHOW_DECIMALS.IF_NEEDED && +decimalPricePart > 0) ||
    (opts.showDecimals === SHOW_DECIMALS.AS_IS && decimalPricePart.length > 0)
      ? opts.decimalSeparator + decimalPricePart
      : "";

  const price =
    withThousandSeparator(integerPricePart, opts.thousandSeparator) + decimals;

  if (opts.currency) {
    const priceCurrencySpacing = opts.spacing ? " " : "";
    return opts.currencyPosition === CURRENCY_POSITION.LEFT
      ? getCurrencySymbol(opts.currency) + priceCurrencySpacing + price
      : price + priceCurrencySpacing + getCurrencySymbol(opts.currency);
  } else {
    return price;
  }
}

function isProbablyDecimalSeparator(text) {
  // I assume the only feasible decimal separators could be . and ,
  return /^[\.,]$/.test(text);
}

function unformat(text, options) {
  const opts = parseOptions(options);
  const customDecimalSeparator = options && options.decimalSeparator;

  const withoutWhiteSpace = text.replace(/\s/g, "");

  // split it into (letters, notLetter, letters...) groups
  const lettersNotLettersGroups = withoutWhiteSpace.match(/[0-9]+|[^0-9]+/gi);
  const groups = lettersNotLettersGroups.map(function (group, i) {
    return {
      value: group,
      isNumber: /[0-9]+/.test(group),
      index: i,
    };
  });

  const numbers = groups.filter(function (group) {
    return group.isNumber;
  });
  const separators = groups.filter(function (group) {
    return !group.isNumber;
  });

  const firstNumberGroup = numbers[0];
  const lastNumberGroup = numbers[numbers.length - 1];

  const firstNonZeroNumberGroup =
    firstNumberGroup.value > 0
      ? firstNumberGroup
      : numbers.length > 1
      ? numbers[1].value > 0
        ? numbers[1]
        : undefined
      : undefined;

  if (!firstNonZeroNumberGroup) {
    return 0;
  }

  // Decimals presence test 1: .123 -> first separator lays before the first number group
  const separatorBeforeFirstNumber =
    firstNonZeroNumberGroup.index > 0
      ? groups[firstNonZeroNumberGroup.index - 1]
      : undefined;
  const firstSeparatorIsDecimal =
    separatorBeforeFirstNumber &&
    separators.length === 1 &&
    isProbablyDecimalSeparator(separatorBeforeFirstNumber.value);

  // Decimals presence test 2: 123.456,789 -> last separator is different to the rest of separators
  const separatorBeforeLastNumberIndex = lastNumberGroup.index - 1;
  const separatorBeforeLastNumber =
    separatorBeforeLastNumberIndex >= 0 &&
    groups[separatorBeforeLastNumberIndex];
  const separatorsPastFirstNumberButLastNumberSeparator = separators
    .filter(function (group) {
      return (
        group.index > firstNumberGroup.index &&
        group.index < separatorBeforeLastNumberIndex
      );
    })
    .map(function (separator) {
      return separator.value;
    });

  const lastSeparatorBetweenTheNumberIsDifferentThanOthers =
    separatorsPastFirstNumberButLastNumberSeparator.length > 0 &&
    separatorsPastFirstNumberButLastNumberSeparator.indexOf(
      separatorBeforeLastNumber.value
    ) < 0;

  // Decimals presence test 3: user specified explicitly a decimal separator and it is a last separator between the numbers
  const lastSeparatorIsAsSpecifiedByUser =
    separatorBeforeLastNumber &&
    separatorBeforeLastNumber.value === customDecimalSeparator;

  // Decimals presence test 4: last group matches the decimals length (default: 2)
  // And there's a character before the last group that looks like a decimal separator
  const lastGroupMatchesDecimalsLength =
    lastNumberGroup.value.length === opts.decimalsDigits &&
    separatorBeforeLastNumber &&
    isProbablyDecimalSeparator(separatorBeforeLastNumber.value);

  // Combine all decimal presence tests
  const lastGroupIsProbablyDecimal = customDecimalSeparator
    ? lastSeparatorIsAsSpecifiedByUser
    : lastGroupMatchesDecimalsLength ||
      lastSeparatorIsAsSpecifiedByUser ||
      firstSeparatorIsDecimal ||
      lastSeparatorBetweenTheNumberIsDifferentThanOthers;

  const probablyDecimalsDigits = lastGroupIsProbablyDecimal
    ? lastNumberGroup.value.length
    : 0;

  const lastSeparatorText =
    separatorBeforeFirstNumber && separatorBeforeFirstNumber.value;
  const isNegative =
    lastSeparatorText &&
    lastSeparatorText[lastSeparatorText.length - 1] === "-";

  const joinedNumber = numbers
    .map(function (number) {
      return number.value;
    })
    .join("");

  return (
    parseFloat(joinedNumber / Math.pow(10, probablyDecimalsDigits)) *
    (isNegative ? -1 : 1)
  );
}

module.exports = {
  format,
  unformat,
};

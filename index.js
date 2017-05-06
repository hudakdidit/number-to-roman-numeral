const test = require('tape');
const one = "I";
const five = "V";
const ten = "X";
const fifty = "L";
const hundred = "C";
const fivehundred = "D";
const thousand = "M";

const getNumeral = (number, min, mid, max) => {
    const n = parseInt(number);

    let i = 0;
    let value = "";
    let count = n;

    if (!number) {
        return value;
    }

    if (n === 5) {
        count = null;
        value += mid;
    }

    if (n > 5 && n < 9) {
        value += mid;
        count = n - 5;
    }

    if (n > 8) {
        count = 1;
    }

    if (!count) {
        return value;
    }

    while(i < count) {
        value += min;
        i++;
    }

    if (n > 8) {
        value += max;
    }

    return value;
}

test('getNumeral', (t) => {
    t.plan(7);

    let result = getNumeral(undefined, ten, fifty, hundred);
    let expected = "";
    t.equal(result, expected, `Expected ${expected} and got ${result}`);

    result = getNumeral(1, ten, fifty, hundred);
    expected = "X";
    t.equal(result, expected, `Expected ${expected} and got ${result}`);

    result = getNumeral(2, ten, fifty, hundred);
    expected = "XX";
    t.equal(result, expected, `Expected ${expected} and got ${result}`);

    result = getNumeral(5, ten, fifty, hundred);
    expected = "L";
    t.equal(result, expected, `Expected ${expected} and got ${result}`);

    result = getNumeral(7, ten, fifty, hundred);
    expected = "LXX";
    t.equal(result, expected, `Expected ${expected} and got ${result}`);

    result = getNumeral(8, ten, fifty, hundred);
    expected = "LXXX";
    t.equal(result, expected, `Expected ${expected} and got ${result}`);

    result = getNumeral(9, ten, fifty, hundred);
    expected = "XC";
    t.equal(result, expected, `Expected ${expected} and got ${result}`);
});

const toRomanNumeral = number => {
    const digits = number.toString().split("");
    const cardinal = getNumeral(digits[digits.length - 1], one, five, ten);
    const tenths = getNumeral(digits[digits.length - 2], ten, fifty, hundred);
    const hundreds = getNumeral(digits[digits.length - 3], hundred, fivehundred, thousand);
    const thousands = getNumeral(digits[digits.length - 4], thousand);
    return `${thousands}${hundreds}${tenths}${cardinal}`;
}


test('toRomanNumeral', (t) => {
    t.plan(8);
    let result = toRomanNumeral(3);
    let expected = "III";
    t.equal(result, expected, `Expected ${expected} and got ${result}`);

    result = toRomanNumeral(10);
    expected = "X";
    t.equal(result, expected, `Expected ${expected} and got ${result}`);

    result = toRomanNumeral(11);
    expected = "XI";
    t.equal(result, expected, `Expected ${expected} and got ${result}`);

    result = toRomanNumeral(28);
    expected = "XXVIII";
    t.equal(result, expected, `Expected ${expected} and got ${result}`);

    result = toRomanNumeral(57);
    expected = "LVII";
    t.equal(result, expected, `Expected ${expected} and got ${result}`);

    result = toRomanNumeral(100);
    expected = "C";
    t.equal(result, expected, `Expected ${expected} and got ${result}`);

    result = toRomanNumeral(501);
    expected = "DI";
    t.equal(result, expected, `Expected ${expected} and got ${result}`);

    result = toRomanNumeral(1000);
    expected = "M";
    t.equal(result, expected, `Expected ${expected} and got ${result}`);
});
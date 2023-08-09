// Helper function
function makeObj(arr) {
  let obj = {};

  arr.forEach((char) => {
    if (!obj[char]) {
      obj[char] = 1;
    } else {
      obj[char] += 1;
    }
  });
  return obj;
}

// Helper function
function objWithIndex(arr) {
  let obj = {};

  arr.forEach((char, index) => {
    obj[char] = index;
  });
  return obj;
}

function anagrams(str1, str2) {
  if (str1.length != str2.length) {
    return false;
  }

  str1 = str1.split("");
  str2 = str2.split("");

  let a = makeObj(str1);
  let b = makeObj(str2);

  for (let x in a) {
    if (a[x] !== b[x]) {
      return false;
    }
  }
  return true;
}

function commonElements(arr1, arr2) {
  let results = [];
  let a = makeObj(arr1);
  let b = makeObj(arr2);

  for (let x in a) {
    if (b[x]) {
      results.push(Number(x));
    }
  }
  return results;
}

function duplicate(arr) {
  let a = makeObj(arr);

  for (let x in a) {
    if (a[x] > 1) {
      return Number(x);
    }
  }
}

function twoSum(nums, target) {
  const set = new Set(nums);

  for (let num of set) {
    let addend = target - num;

    if (set.has(addend) && addend !== num) {
      return true;
    }
  }
  return false;
}

function wordPattern(pattern, strings) {
  pattern = pattern.split("");
  if (pattern.length !== strings.length) {
    return false;
  }
  const patObj = {};
  const strObj = {};

  for (let i = 0; i < pattern.length; i++) {
    let pat = pattern[i];
    let str = strings[i];

    if (patObj[pat]) {
      if (patObj[pat] !== strObj[str]) {
        return false;
      }
    } else {
      if (strObj[str]) {
        return false;
      }
      patObj[pat] = i;
      strObj[str] = i;
    }
  }
  return true;
}

module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];

function kth(string, k) {
  let chars = string.split("");
  let obj = makeObj(chars);

  let keys = Object.keys(obj);

  keys.sort((a, b) => {
    return obj[a] - obj[b];
  });
  let end = keys.length;
  return keys[end - k];
}
/*
console.log(kth("aaabbc", 1)); //  => 'a'
console.log(kth("aaabbc", 2)); //  => 'b'
console.log(kth("aaabbc", 3)); //  => 'c'
*/

function newAlphabet(string, alphabet) {
  let chars = alphabet.split("");
  let obj = objWithIndex(chars);

  let first = obj[string[0]];
  for (let i = 0; i < string.length; i++) {
    let current = obj[string[i]];
    if (current < first) {
      return false;
    } else {
      first = current;
    }
  }
  return true;
}
/*
console.log(newAlphabet('dino', 'abcdefghijklmnopqrstuvwxyz'));           // => true
console.log(newAlphabet('leetcode', 'abcdefghijklmnopqrstuvwxyz'));       // => false
console.log(newAlphabet('leetcod', 'labefghijkmnpqrstucvowxdyz'));        // => true
*/

function longestPalindrome(string) {
  let count = 0;
  const set = new Set();

  for (let char of string) {
    if (!set.has(char)) {
      set.add(char);
    } else {
      count += 2;
      set.delete(char);
    }
  }
  if (set.size > 0) {
    count += 1;
  }
  return count;
}
/*
console.log(longestPalindrome("abccccdd"));  //  => 7 "dccaccd"
console.log(longestPalindrome("abccccdddd")); // => 9 "ddccaccdd"
console.log(longestPalindrome("abbccccdddd")); // => 11 "ddccbabccdd"
*/

function longestSubstr(string) {
  let count = 0;
  let longest = 0;
  let obj = {};

  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    if (obj[char]) {
      if (obj[char] > count) count = obj[char];
    }

    obj[string[i]] = i + 1;
    let length = i - count + 1;
    if (length > longest) {
      longest = length;
    }
  }
  return longest;
}
/*
console.log(longestSubstr("abcabcbb"));    // => 3, "abc"
console.log(longestSubstr("bbbbb"));       // => 1, "b"
console.log(longestSubstr("abcabcdefbb")); // => 6, "abcdef"
*/

function maxSubarr(array) {
  let numbers = makeObj(array);
  let longest = 0;

  for (let num in numbers) {
    let up = Number(num) + 1;
    let upCount = 0;
    let down = Number(num) - 1;
    let downCount = 0;

    if (numbers[up]) {
      upCount = numbers[up] + numbers[num];
    } else {
      upCount = numbers[num];
    }

    if (numbers[down]) {
      downCount = numbers[down] + numbers[num];
    } else {
      downCount = numbers[num];
    }

    let max = Math.max(upCount, downCount);
    if (max > longest) {
      longest = max;
    }
  }
  return longest;
}
/*
console.log(maxSubarr([1,3,2,2,5,2,3,7]));  // => 5 because the longest subarray is [3,2,2,2,3]
console.log(maxSubarr([1,1,1,1,3]));        // => 4 because the longest subarray is [1,1,1,1]
*/

function coinChange(coins, amount) {
  if (amount === 0) {
    return 0;
  }

  let results = [];
  coins = coins.sort((a, b) => b - a);

  for (let i = 0; i < coins.length; i++) {
    while (amount >= coins[i]) {
      results.push(coins[i]);
      amount -= coins[i];
    }
  }

  if (results.length === 0) {
    return -1;
  }

  return results.length;
}
/*
const coins = [1, 5, 10, 25];
const coins2 = [5];

console.log(coinChange(coins, 11));      // => 2, 10 + 1 = 11
console.log(coinChange(coins2, 3));      // => -1
console.log(coinChange(coins2, 0));      // => 0
*/

function climbingSteps(n) {
  let steps = new Array(n + 2);
  steps[0] = 1;
  steps[1] = 1;
  steps[2] = 2;

  for (let i = 3; i <= n; i++) {
    steps[i] = steps[i - 1] + steps[i - 2] + steps[i - 3];
  }
  return steps[n];
}
/*
console.log(climbingSteps(0));  // 1
console.log(climbingSteps(1)); // 1
console.log(climbingSteps(2));  // 2
console.log(climbingSteps(3));  // 4

// This is different
// There should be 7 ways to climb 4 steps:
//   1. 1 step + 1 step + 1 step + 1 step
//   2. 1 step + 1 step + 2 steps
//   3. 1 step + 2 steps + 1 step
//   4. 2 steps + 1 step + 1 step
//   5. 1 step + 3 steps
//   6. 3 steps + 1 steps
// Different part
//   7. 2 steps + 2 steps

console.log(climbingSteps(4));  // should be 7, not 6
*/

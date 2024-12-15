# interactive-cli-leetcode-solutions

C++ (.cpp) based LeetCode problem solutions with an interactive CLI.

## Installation

Install the package globally

```
npm i -g interactive-cli-leetcode-solutions
```

## Running the CLI

The package provides a bin command to run the interactive-cli

Run the following command to star the CLI session

```
interactive-cli-leetcode-solutions
```
or
```
npx interactive-cli-leetcode-solutions
```

After running, this prompt should appear in your CLI

```
  #######################################################################################################
  #                                                                                                     #
  #     Welcome! This is an interactive CLI where you can browse Leetcode solutions.                    #
  #                                                                                                     #
  #     Feel free to contribute at https://github.com/IschanLois/interactive-cli-leetcode-solutions     #
  #                                                                                                     #
  #######################################################################################################

? What do you want to do? (Use arrow keys)
❯ continue 
  exit 
```

You can select whatever problem category is available

```
? Select a category 
  exit 
  Linked List 
❯ Math 
  Recursion 
  Array 
  Two Pointers 
  Greedy 
(Move up and down to reveal more choices)
```

You can select problems available for that category

```
? Select a category Math
? Select a problem (Use arrow keys)
❯ Add Two Numbers 
  Integer to Roman 
  Palindrome Number 
  Reverse Integer 
  Roman to Integer 
  back 
```

And the solution for that `leetcode problem` should appear in your terminal. It uses `less` for unix-like systems, and `more` for windows.

---
**NOTE**

More problems will be added for subsequent release of the package

---

-----

# EzStress - GUI Version of EzStress Tester

-----

### A Bit About How It Works

**EzStress** is the graphical user interface (GUI) version of the popular **EzStress Tester**. It simplifies the process of stress testing your code by eliminating the need for manual setup. With EzStress, all you have to do is type in your code, and the backend server handles the rest, making stress testing easier and more efficient.

-----

### EzStress Tester (C++)

> **Now supporting GCC 14+\!** The `generative.h` header is fully functional with the latest C++ compilers. Thank you for your feedback and patience\!

-----

### Project Overview

**Stress Tester** is a toolkit that helps you find bugs in your C++ solutions by automatically generating random test cases. It runs both your brute-force and optimal solutions, instantly identifying any discrepancies. This is perfect for competitive programmers who need to verify the correctness of their optimized solutions.

-----

### How to Use

1.  **Download the Repository:** Grab the ZIP from this repository and extract it to your machine.
2.  **Write Your Code:**
      * **`generateCases.cpp`**: Implement your test case generator using the supplied functions.
      * **`brute.cpp`**: Add your *correct/brute-force* reference solution.
      * **`optimal.cpp`**: Place your *optimized solution* here.
3.  **Run the Script:** Double-click the appropriate script file for your compiler:
      * `ScriptCpp17.bat` – If you **don't** have the latest GCC.
      * `ScriptCpp20.bat` – If you **do**.

> If a mismatch is found, the script stops and prints the test case for you to debug.

-----

### `generative.h` Header Functions

Stop writing custom generators for common tasks\! Simply use the following functions in your `generateCases.cpp`:

| Function | Description | Example Usage |
| :-- | :-- | :-- |
| `generate_number(l, r)` | Generates a random number in `[l, r]`. Returns value. | `int num = generate_number(1, 10); cout << num << endl;` |
| `generate_array(l, r, n)` | Prints an array of size `n` with values in `[l, r]`. | `generate_array(1, 10, 5);` |
| `generate_permutation(l, r)` | Prints a random permutation of `[l, r]`. | `generate_permutation(1, 5);` |
| `generate_string(l, r, n)` | Prints a string of length `n` with chars from `['a'+l, 'a'+r]`. | `generate_string(0, 2, 5);` |
| `generate_alpha_numeric_string(nl, nr, cl, cr, size)` | Prints an alphanumeric string of `size` with numbers in `[nl, nr)` and chars in `[cl, cr)`. | - |
| `generate_tree(n)` | Prints a random tree with `n` nodes. | `generate_tree(5);` |

-----

### Demo

-----

### Image Gallery

-----

### The Team

  * [Nish](https://github.com/nishcurse)


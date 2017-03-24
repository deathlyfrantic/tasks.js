// Copyright © 2017 Zandr Martin

// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

"use strict";

const process = require("process");
const tests = require("./tests");

if (require.main === module) {
    const failures = [];

    tests.all.forEach(function (test) {
        try {
            test();
            process.stdout.write(".");
        } catch (error) {
            failures.push({ "function": test, "error": error });
            process.stdout.write("F");
        }
    });

    process.stdout.write("\n");

    if (failures.length === 0) {
        process.stdout.write("All tests pass.\n");
        process.exit(0);
    }

    failures.forEach(function (failure) {
        process.stdout.write(`Test ${failure.function.name} failed with error ${failure.error.message}\n`);
    });

    process.exit(1);
}
#!/bin/bash

TIME_LIMIT="2s"
NUM_TEST_CASES=100

echo "Copying user code..."


cp -r /app/tests/. /app/

echo "Compiling code..."

compile_gen_output=$(g++ -std=c++20 -O2 -DONLINE_JUDGE GenerateCases.cpp -o generator 2>&1)
if [ $? -ne 0 ]; then
    echo "Error: Failed to compile GenerateCases.cpp"
    echo "-----------------------------------"
    echo "Compiler Output:"
    echo "$compile_gen_output"
    echo "-----------------------------------"
    exit 1
fi

compile_brute_output=$(g++ -std=c++20 -O2 -DONLINE_JUDGE brute.cpp -o brute 2>&1)
if [ $? -ne 0 ]; then
    echo "Error: Failed to compile brute.cpp"
    echo "-----------------------------------"
    echo "Compiler Output:"
    echo "$compile_brute_output"
    echo "-----------------------------------"
    exit 1
fi

compile_optimal_output=$(g++ -std=c++20 -O2 -DONLINE_JUDGE optimal.cpp -o optimal 2>&1)
if [ $? -ne 0 ]; then
    echo "Error: Failed to compile optimal.cpp"
    echo "-----------------------------------"
    echo "Compiler Output:"
    echo "$compile_optimal_output"
    echo "-----------------------------------"
    exit 1
fi

echo "Compilation successful. Starting stress tests..."
echo "Running up to ${NUM_TEST_CASES} test cases with a time limit of ${TIME_LIMIT} per run."

for ((i=1; i<=${NUM_TEST_CASES}; i++)); do
    echo "Test case #$i"

    timeout ${TIME_LIMIT} ./generator > test_case.txt
    
    if [ $? -eq 124 ]; then
        echo "Generator timed out. This is a problem with your generator code."
        exit 1
    fi

    timeout ${TIME_LIMIT} ./brute < test_case.txt > brute_output.txt
    timeout ${TIME_LIMIT} ./optimal < test_case.txt > optimal_output.txt
    
    if [ $? -eq 124 ]; then
        echo "-----------------------------------"
        echo "[FAIL] Time Limit Exceeded (TLE) on solution 'optimal' for test case:"
        cat test_case.txt
        echo "-----------------------------------"
        exit 1
    fi

    diff -w brute_output.txt optimal_output.txt > /dev/null

    if [ $? -ne 0 ]; then
        echo "-----------------------------------"
        echo "[FAIL] Wrong Answer (WA) on test case:"
        cat test_case.txt
        echo "-----------------------------------"
        echo "Brute-force Output:"
        cat brute_output.txt
        echo "-----------------------------------"
        echo "Optimal Output:"
        cat optimal_output.txt
        echo "-----------------------------------"
        exit 1
    fi
done

echo "-----------------------------------"
echo "[SUCCESS] All Testcases Passed ! Try again or you are just correct! "
echo "-----------------------------------"

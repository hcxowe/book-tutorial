function factorial(n) {
    if (n < 2) {
        return 1
    }

    return n * factorial(n - 1)
}

function fibonacci(n) {
    if (n < 1) return 0
    if (n <= 2) return 1

    return fibonacci(n - 1) + fibonacci(n - 2)
}

function fibonacciMemoization() {
    let memo = [0, 1]

    let fibonacci = (n) => {
        if (memo[n] != null) {
            return memo[n]
        }

        return memo[n] = fibonacci(n - 1) + fibonacci(n - 2)
    }

    return fibonacci
}
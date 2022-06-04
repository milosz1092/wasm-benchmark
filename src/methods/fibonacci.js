export const fibonacci_recu = (n) => {
    if (n < 2) {
        return n
    }
    return fibonacci_recu(n - 1) + fibonacci_recu(n - 2);
}

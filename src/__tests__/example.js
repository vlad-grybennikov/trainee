const sum = (a, b) => {
    return a + b;
}

test('Should add a and b', () => {
    expect(sum(3, 1)).toBe(4);
    expect(sum(-3, 1)).toBe(-2);
    expect(sum(1e1000000, 1)).toBe(Infinity)
});


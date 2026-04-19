function llogarit(operacioni, a, b) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    switch (operacioni) {
        case 'sum':
            return num1 + num2;
        case 'multiply':
            return num1 * num2;
        default:
            return "Operacion i panjohur (përdor sum ose multiply)";
    }
}

module.exports = { llogarit };
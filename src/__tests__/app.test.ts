function soma(x: number, y: number): number {
    return x + y;
}

function somaDoisMaisTres(func : (x: number, y:number) => number):number {
    return func(2,3);
}

describe('soma', () => {
    it('deve somar dois números', () => {
        expect(soma(1, 2)).toBe(3);
    });

    it('deve somar dois números', () => {
        expect(somaDoisMaisTres(soma)).toBe(5);
    });
});

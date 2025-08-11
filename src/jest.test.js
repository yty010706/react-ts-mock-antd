describe('test common matcher', () => {
  it('test toBe', () => {
    expect(1 + 2).toBe(3);
    expect(2 + 2).not.toBe(5);
  });

  it('test true or false', () => {
    expect(2 > 1).toBeTruthy();
    expect([1] instanceof String).toBeFalsy();
  });

  it('test number', () => {
    expect(2).toBeGreaterThan(1);
    expect(2).toBeLessThan(3);
  });

  it('test object', () => {
    expect({ name: 'zhangsan' }).toEqual({ name: 'zhangsan' });
  });
});

function dec(id) {
    console.log('evaluated', id);
    return (target, property, descriptor) => console.log('executed', id);
}

class Example {
    @dec(1)
    @dec(2)
    method() { }
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1
function throwErrorFunc(message: string): never {
    throw {message: message};
}

throwErrorFunc("There's an error");
exports.newError = (msg, code, errors) => {
    const error = new Error(msg)
    error.statusCode = code
    if (errors) {
        error.data = errors.array()
    }
    throw error
}
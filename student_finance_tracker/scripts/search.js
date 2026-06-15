export function compileRegex(pattern, flags = "i") {
    try {
        return pattern ? new RegExp(pattern, flags) : null;
    } catch {
        return null;
    }
}

export function highlight(text, regex) {
    if (!regex) return text;

    return text.replace(
        regex,
        match => `<mark>${match}</mark>`
    );
}
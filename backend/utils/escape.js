export function escapeText(paraTxt) {
    return paraTxt.split("'").join("\\'");
}
export * from "./jsx";

export const jsxSymbol = Symbol("jsx-symbol");

export let jsx = (t: JSX.ElementType, p: JSX.Props): JSX.Element => ({ s: jsxSymbol, t, p });

export { jsx as jsxs, jsx as jsxDEV };

export let Fragment = (p?: { children?: JSX.Children }): JSX.Children => p?.children;

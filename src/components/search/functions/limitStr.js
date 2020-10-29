export default function limitStr(str, n, symb) {
    if (!n || str.length-4 < n) return str;
    symb = symb || '...';
    return str.substr(0, n - symb.length) + symb;
}
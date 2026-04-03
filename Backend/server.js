// Polyfill DOMMatrix for pdf-parse (pdfjs-dist) on Node < 20.16
if (typeof globalThis.DOMMatrix === "undefined") {
    globalThis.DOMMatrix = class DOMMatrix {
        constructor(init) {
            const values = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
            if (Array.isArray(init)) {
                if (init.length === 6) {
                    values[0] = init[0]; values[1] = init[1];
                    values[4] = init[2]; values[5] = init[3];
                    values[12] = init[4]; values[13] = init[5];
                } else if (init.length === 16) {
                    for (let i = 0; i < 16; i++) values[i] = init[i];
                }
            }
            const props = ["a","b","c","d","e","f"];
            const mapping = [0,1,4,5,12,13];
            for (let i = 0; i < 6; i++) this[props[i]] = values[mapping[i]];
            for (let i = 0; i < 16; i++) this["m" + (Math.floor(i / 4) + 1) + (i % 4 + 1)] = values[i];
            this.is2D = true; this.isIdentity = false;
        }
        static fromMatrix(other) { return new DOMMatrix(other ? [other.a||1,other.b||0,other.c||0,other.d||1,other.e||0,other.f||0] : undefined); }
        static fromFloat32Array(arr) { return new DOMMatrix(Array.from(arr)); }
        static fromFloat64Array(arr) { return new DOMMatrix(Array.from(arr)); }
        inverse() { return new DOMMatrix(); }
        multiply() { return new DOMMatrix(); }
        translate() { return new DOMMatrix(); }
        scale() { return new DOMMatrix(); }
        transformPoint(p) { return { x: p?.x || 0, y: p?.y || 0, z: p?.z || 0, w: p?.w || 1 }; }
    };
}

require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

connectToDB()


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
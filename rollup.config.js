import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";

const production = process.env.PRODUCTION !== undefined;

export default {
    input: "src/main.ts",
    output: {
        sourcemap: true,
        format: "iife",
        name: "app",
        file: "public/build/bundle.js",
    },
    plugins: [
        svelte({
            include: "src/**/*.svelte",
            preprocess: sveltePreprocess({
                sourceMap: !production,
            }),
            compilerOptions: {
                dev: !production,
            },
        }),
        // Extract component CSS into a separate file for performance
        css({ output: "bundle.css" }),
        resolve({
            browser: true,
            dedupe: ["svelte"],
        }),
        commonjs(),
        typescript({
            sourceMap: !production,
            inlineSources: !production,
        }),
        // Minify in production
        production && terser(),
    ],
    watch: {
        clearScreen: false,
    },
};

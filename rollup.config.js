import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-only";
import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

const production = process.env.PRODUCTION !== undefined;

export default {
    input: "src/main.ts",
    output: {
        sourcemap: true,
        format: "iife",
        name: "app",
        file: `dist/${production ? "release" : "debug"}/build/bundle.js`,
    },
    plugins: [
        copy({
            targets: [
                {
                    src: "src/index.html",
                    dest: `dist/${production ? "release" : "debug"}`,
                },
            ],
        }),
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

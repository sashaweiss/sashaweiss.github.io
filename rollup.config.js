import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-only";
import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

const production = process.env.PRODUCTION !== undefined;

function runSvelteCheck() {
    return {
        writeBundle() {
            require("child_process").spawn("svelte-check", {
                stdio: ["ignore", "inherit", "inherit"],
                shell: true,
            });
        },
    };
}

export default {
    input: "src/main.ts",
    output: {
        sourcemap: !production,
        format: "iife",
        name: "app",
        file: `dist/${production ? "release" : "debug"}/build/bundle.js`,
    },
    plugins: [
        runSvelteCheck(),
        svelte({
            include: "src/**/*.svelte",
            preprocess: sveltePreprocess({
                sourceMap: !production,
            }),
            compilerOptions: {
                dev: !production,
            },
        }),
        copy({
            targets: [
                {
                    src: "src/index.html",
                    dest: `dist/${production ? "release" : "debug"}`,
                },
                {
                    src: "src/global.css",
                    dest: `dist/${production ? "release" : "debug"}`,
                },
            ],
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

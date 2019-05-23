import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import { version, main, browser } from './package.json';

const plugins = [
    typescript(),
    commonjs({ extensions: ['.js', '.ts'] }),
    resolve({ preferBuiltins: false }),
    filesize(),
];

export default [
    {
        external: ['bipbop-webservice', 'xpath'],
        input: './src/index.ts',
        plugins,
        output: [
            {
                file: main,
                format: 'cjs',
                sourcemap: true,
            },
        ],
    },
    {
        external: ['bipbop-webservice'],
        input: './src/index.ts',
        plugins,
        output: [
            {
                banner: `/* bipbop-push version ${version} */`,
                footer: '/* www.bipbop.com.br */',
                name: 'BipbopPushManager',
                file: browser,
                format: 'umd',
                globals: {
                    'bipbop-webservice': 'bipbop.WebService',
                },
                sourcemap: true,
            },
        ],
    },
];

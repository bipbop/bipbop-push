import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import { version, main, browser } from './package.json';

export default [
    {
        external: ['bipbop-webservice'],
        input: './src/index.ts',
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
            },
            {
                file: main,
                format: 'cjs',
            },
        ],
        plugins: [
            typescript(),
            commonjs({ extensions: ['.js', '.ts'] }),
            resolve({ preferBuiltins: false }),
            filesize(),
        ],
    },
];

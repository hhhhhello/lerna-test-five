import path from 'node:path'

import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import strip from '@rollup/plugin-strip'
import terser from '@rollup/plugin-terser'
import { readFileSync } from 'fs'
import copy from 'rollup-plugin-copy'
import externals from 'rollup-plugin-node-externals'
import postcss from 'rollup-plugin-postcss'
import { fileURLToPath } from 'url'

const relativePath = process.env.relativePath
console.log(relativePath, 'relativePath')
const buildConfigFile = fileURLToPath(import.meta.url)
console.log(buildConfigFile, 'buildConfigFile')
const buildDirname = path.dirname(buildConfigFile)
console.log(buildDirname, 'buildDirname')
const targetPath = path.resolve(buildDirname, relativePath)
console.log(targetPath, 'targetPath')
const package_ = JSON.parse(readFileSync(`${targetPath}/package.json`))


const defaultExtensions = [
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.json',
  '.css',
  '.less',
]


export default {
  input: `${targetPath}/src/index.ts`,
  output: [
    {
      dir: `${targetPath}/${path.dirname(package_.main)}`,
      format: 'cjs',
      name: package_.name,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    {
      dir: `${targetPath}/${path.dirname(package_.module)}`,
      format: 'esm',
      name: package_.name,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
  ],
  plugins: [
    nodeResolve({ extensions: defaultExtensions }),
    alias({
      entries: [{ find: '@', replacement: `${targetPath}/src` }],
      customResolver: nodeResolve({
        extensions: defaultExtensions,
      }),
    }),
    commonjs(),
    image(),
    postcss({
      modules: {
        generateScopedName: 'cm-[path][local]',
      },
      autoModules: false,
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      extensions: defaultExtensions,
    }),
    copy({
      targets: [
        {
          src: `${targetPath}/src/styles`,
          dest: `${targetPath}/src/lib`,
        },
        {
          src: `${targetPath}/src/styles`,
          dest: `${targetPath}/src/es`,
        },
      ],
    }),
    externals(),
    strip(),
    terser(),
  ],
}

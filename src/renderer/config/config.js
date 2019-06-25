import { UmiRule } from 'chain-css-loader';
import poststylus from 'poststylus';

export default {
  history: 'hash',
  outputPath: `../../dist/renderer`,
  publicPath: './',
  sass: {},
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'umi-electron-typescript',
        dll: true,
        hardSource: false,
        routes: {
          exclude: [/components/],
        },
      },
    ],
    ['./plugin.ts', {}],
  ],
  urlLoaderExcludes: [
    /\.styl$/,
  ],
  chainWebpack(config) {
    const rule = new UmiRule(config, {
      modules: true, // start up CSS modules
      usePoststylus: true,
      stylus: {
        options: {
          use: [
            poststylus([
              require('postcss-flexbugs-fixes'),
              require('autoprefixer')({
                flexbox: 'no-2009'
              }),
              'rucksack-css'
            ])
          ]
        }
      }
    });
    rule.useStylus();
  }
};

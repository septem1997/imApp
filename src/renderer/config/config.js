import { UmiRule } from 'chain-css-loader';

export default {
  history: 'hash',
  outputPath: `../../dist/renderer`,
  publicPath: './',
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: true,
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
      modules: true // start up CSS modules
    });
    rule.useStylus();
  }
};

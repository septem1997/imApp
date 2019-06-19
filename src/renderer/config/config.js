const cwd = process.cwd();

export default {
  history: 'hash',
  outputPath: `../../dist/renderer`,
  publicPath: './',
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: false,
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
  ]
};

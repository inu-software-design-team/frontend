import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // 정적 사이트로 내보내기 설정
  trailingSlash: true, // URL 끝에 슬래시 추가 (선택 사항)

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // https://react-svgr.com/docs/next
  webpack: config => {
    // @ts-expect-error config.module.rule(any) 타입 에러 무시
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...(fileLoaderRule.resourceQuery?.net ?? []), /url/],
        },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              ext: 'tsx',
              svgo: false,
            },
          },
        ],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;

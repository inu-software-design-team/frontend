import { pascalCase } from 'es-toolkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, './assets/icons');
const ICON_INDEX_FILE = path.join(__dirname, './assets/icons/index.ts');

const DATA_INDEX_FILE = path.join(__dirname, './data/index.ts');
const DATA_ICON_FILE = path.join(__dirname, './data/icon.ts');
const ICON_TYPE_FILE = path.join(__dirname, './types/ui/icon.ts');

/**
 * ==============================
 * 1. 아이콘 컴포넌트 생성
 * ==============================
 */

// 디렉토리 존재 여부 확인
if (!fs.existsSync(ICONS_DIR)) {
  console.error('❌ 아이콘 디렉토리를 찾을 수 없습니다.\n');
  process.exit(1);
}

// 아이콘 파일 찾기
const iconFiles = fs
  .readdirSync(ICONS_DIR)
  .filter(file => file.endsWith('.svg'))
  .map(file => file.replace('.svg', ''));

if (iconFiles.length === 0) {
  console.warn('⚠️ 아이콘 파일을 찾을 수 없습니다.\n');
  process.exit(1);
}

// 내보내기 생성 (to. ICON_INDEX_FILE)
const importStatements = iconFiles
  .map(name => `import ${pascalCase(name)} from './${name}.svg';`)
  .join('\n');
const exportStatements = `export {
  ${iconFiles.map(name => pascalCase(name)).join(',\n  ')},
};`;

const outputFileContent = `// 자동 생성된 파일입니다. 수정하지 마세요.
${importStatements}

${exportStatements}
`;

// 아이콘 컴포넌트 파일 쓰기
fs.writeFileSync(ICON_INDEX_FILE, outputFileContent);
console.log(`✅ 아이콘 컴포넌트가 ${iconFiles.length}개 생성되었습니다.\n`);

/**
 * ==============================
 * 2. 아이콘 객체 맵 생성
 * ==============================
 */

const importStatementsForMap = `import {
  ${iconFiles.map(name => pascalCase(name)).join(',\n  ')},
} from 'assets/icons';`;
const iconMapObject = `export const ICONS = {
  ${iconFiles.map(name => `${/[-\s]/.test(name) ? `'${name}'` : name}: ${pascalCase(name)}`).join(',\n  ')}
} as const;
`;

const dataIconContent = `// 자동 생성된 파일입니다. 수정하지 마세요.
${importStatementsForMap}
  
${iconMapObject}
`;

const exportStatementsForDataIndex = [
  ...new Set([
    "export * from './icon';",
    ...fs
      .readFileSync(DATA_INDEX_FILE)
      .toString()
      .split('\n')
      .filter(line => line),
  ]),
];
const dataIndexContent = `${exportStatementsForDataIndex.join('\n')}\n`;

fs.writeFileSync(DATA_ICON_FILE, dataIconContent);
fs.writeFileSync(DATA_INDEX_FILE, dataIndexContent);

/**
 * ==============================
 * 3. IconName 타입 생성
 * ==============================
 */

const iconTypeOriginalContent = fs.readFileSync(ICON_TYPE_FILE).toString();

const importStatementsForType = `import { ICONS } from 'data';`;
const exportStatementsForType = [
  'export type IconName = keyof typeof ICONS;',
  "export type WithIconName<K extends string = 'name'> = Record<K, IconName>;",
].reduce<string[]>((acc, cur) => {
  if (iconTypeOriginalContent.includes(cur)) return acc;
  return [...acc, cur];
}, []);

if (exportStatementsForType.length > 0) {
  const iconTypeContent = `${importStatementsForType}

${iconTypeOriginalContent}
// 자동 생성된 파일입니다. 수정하지 마세요.
${exportStatementsForType.join('\n')}
`;

  fs.writeFileSync(ICON_TYPE_FILE, iconTypeContent);
  console.log(`✅ 아이콘 타입이 생성되었습니다.\n`);
}

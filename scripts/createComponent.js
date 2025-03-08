const fs = require('fs');
const path = require('path');
const prompts = require('prompts');

const LAYERS_WITH_EXPORTS = [
  'shared',
  'entities',
  'features',
  'widgets',
  'pages',
];

(async () => {
  const response = await prompts([
    {
      type: 'select',
      name: 'layer',
      message: 'Выберите слой по FSD:',
      choices: [
        { title: 'App', value: 'app' },
        { title: 'Pages', value: 'pages' },
        { title: 'Widgets', value: 'widgets' },
        { title: 'Features', value: 'features' },
        { title: 'Entities', value: 'entities' },
        { title: 'Shared', value: 'shared' },
      ],
    },
    {
      type: 'text',
      name: 'slice',
      message: 'Введите название слайса:',
    },
    {
      type: 'text',
      name: 'componentName',
      message: 'Введите название компонента, который вы хотите добавить:',
      validate: (value) => (value ? true : 'Название компонента обязательно'),
    },
  ]);

  const { layer, slice, componentName } = response;

  if (!layer || !componentName) {
    console.error('Названия слоя и компонента обязательны.');
    process.exit(1);
  }

  if (!slice && !['shared', 'app'].includes(layer)) {
    console.error(
      'Название слайса обязательно для всех слоёв, кроме Shared и App.',
    );
    process.exit(1);
  }

  const sliceDir = path.join(process.cwd(), 'src', layer, slice);
  if (!fs.existsSync(sliceDir)) {
    fs.mkdirSync(sliceDir, { recursive: true });
    console.log(`Директория ${sliceDir} успешно создана.`);

    const segmentDirs = [
      path.join(sliceDir, 'ui'),
      path.join(sliceDir, 'api'),
      path.join(sliceDir, 'model'),
      path.join(sliceDir, 'lib'),
      path.join(sliceDir, 'config'),
    ];

    segmentDirs.forEach((segmentDirName) => {
      fs.mkdirSync(segmentDirName, { recursive: true });
    });
    console.log(`Директории сегментов успешно созданы в ${sliceDir}.`);
  } else {
    console.log(`Директория ${sliceDir} уже существует.`);
  }

  const componentDir = path.join(sliceDir, 'ui', componentName);
  if (fs.existsSync(componentDir)) {
    console.error(`Директория ${componentDir} уже существует.`);
    process.exit(1);
  }

  fs.mkdirSync(componentDir, { recursive: true });

  const indexContent = `export { default as ${componentName} } from './${componentName}';
`;

  const componentContent = `import { ${componentName}Props } from './${componentName}.types';
import styles from './${componentName}.style.module.scss';

export default function ${componentName}(props: ${componentName}Props) {
  console.log('Debug component ${componentName}', props);

  // TODO: Переименуйте .${componentName} в snake_case
  return <div className={styles.${componentName}}>${componentName}</div>;
}
`;

  const serviceContent = `// Функции, используемые в компоненте.
`;

  const typesContent = `export interface ${componentName}Props {
  // Здесь могла бы быть ваша реклама.
}
`;

  const styleContent = `// TODO: Переименуйте .${componentName} в snake_case
.${componentName} {
  // Здесь могла бы быть ваша реклама.
}
`;

  const sliceFiles = [
    { name: 'index.ts', content: indexContent },
    { name: `${componentName}.tsx`, content: componentContent },
    { name: `${componentName}.service.ts`, content: serviceContent },
    { name: `${componentName}.types.ts`, content: typesContent },
    { name: `${componentName}.style.modules.scss`, content: styleContent },
  ];

  sliceFiles.forEach((file) => {
    const filePath = path.join(componentDir, file.name);
    fs.writeFileSync(filePath, file.content);

    console.log(`Сгенерирован файл компонента ${filePath}`);
  });

  if (slice) {
    const sliceIndexFilePath = path.join(sliceDir, 'index.ts');
    const sliceExportStatement = `export { ${componentName} } from './ui/${componentName}';
`;

    if (!fs.existsSync(sliceIndexFilePath)) {
      fs.writeFileSync(sliceIndexFilePath, sliceExportStatement);
    } else {
      fs.appendFileSync(sliceIndexFilePath, sliceExportStatement);
    }
    console.log(`Добавлен ре-экспорт в файл ${sliceIndexFilePath}`);
  }

  if (LAYERS_WITH_EXPORTS.includes(layer)) {
    const layerIndexFilePath = path.join(
      process.cwd(),
      'src',
      layer,
      'index.ts',
    );
    const exportStatement = `export * from './${slice ? slice + '/' : ''}ui/${componentName}';
`;

    if (!fs.existsSync(layerIndexFilePath)) {
      fs.writeFileSync(layerIndexFilePath, exportStatement);
    } else {
      fs.appendFileSync(layerIndexFilePath, exportStatement);
    }
    console.log(`Добавлен ре-экспорт в файл ${layerIndexFilePath}`);
  }

  console.log(`Компонент ${componentName} успешно сгенерирован!`);
})();

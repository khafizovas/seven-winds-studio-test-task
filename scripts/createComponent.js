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
      message:
        'Введите название слайса (или Enter, чтобы пропустить этот шаг):',
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

  let componentDir = path.join(process.cwd(), 'src', layer);

  if (slice) {
    componentDir = path.join(componentDir, slice);
  }
  componentDir = path.join(componentDir, componentName);

  if (fs.existsSync(componentDir)) {
    console.error(`Директория ${componentDir} уже существует.`);
    process.exit(1);
  }

  fs.mkdirSync(componentDir, { recursive: true });

  const indexContent = `export { default as ${componentName} } from './${componentName}';
`;

  const componentContent = `import { ${componentName}Props } from './${componentName}.types';
import './${componentName}.style.scss';

export default function ${componentName}(props: ${componentName}Props) {
  console.log('Debug component ${componentName}', props);

  return <div>${componentName}</div>;
}
`;

  const serviceContent = `// ${componentName}.service.ts
`;

  const typesContent = `export interface ${componentName}Props {
  // Здесь могла бы быть ваша реклама
}
`;

  const styleContent = `// ${componentName}.style.scss
`;

  const files = [
    { name: 'index.ts', content: indexContent },
    { name: `${componentName}.tsx`, content: componentContent },
    { name: `${componentName}.service.ts`, content: serviceContent },
    { name: `${componentName}.types.ts`, content: typesContent },
    { name: `${componentName}.style.scss`, content: styleContent },
  ];

  files.forEach((file) => {
    const filePath = path.join(componentDir, file.name);
    fs.writeFileSync(filePath, file.content);
    console.log(`Сгенерирован файл ${filePath}`);
  });

  if (LAYERS_WITH_EXPORTS.includes(layer)) {
    const layerIndexFilePath = path.join(
      process.cwd(),
      'src',
      layer,
      'index.ts',
    );
    const exportStatement = `export * from './${slice ? slice + '/' : ''}${componentName}';
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

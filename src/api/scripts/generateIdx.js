import fs from 'fs';
import path from 'path';

const backendPath = path.dirname(path.join(process.argv[1], '..'));

class GenerateIndex {
  generatedFiles = [];
  buildProd = false;
  constructor(buildProd) {
    this.buildProd = buildProd;
  }
  list(path, { onlyFiles = false, onlyDir = false } = {}) {
    const result = fs.readdirSync(path, { withFileTypes: true } );
    if (onlyFiles) return result.filter(item => item.isFile());
    if (onlyDir) return result.filter(item => item.isDirectory());
    return result;
  }

  buildItem(item, { isDir = false } = {}) {
    const props = {};
    props.name = item.name;
    props.path = item.path;

    if (isDir) {
      props.files = [];
      props.dir = [];
    }
    return props;
  }

  initStructure(structure, parent, curPath) {
    if(structure) {
      structure.name = structure.name || parent;
      structure.path = curPath;
      structure.files = structure.files || [];
      structure.dir = structure.dir || [];
    }
    return structure || {
      name: parent,
      files: [],
      dir: [],
    }
  }

  loadStructure(pathToRead, structure, parent = '') {
    const curPath = path.join(pathToRead, parent);
    const items = this.list(curPath);
    const baseMap = this.initStructure(structure, parent, curPath);
    items.forEach(item => {
      if(item.isFile()) {
        baseMap.files.push(this.buildItem(item));
      } else if (item.isDirectory()) {
        const dirProps = this.buildItem(item, { isDir: true });
        baseMap.dir.push(dirProps);
        this.loadStructure(curPath, dirProps, item.name);
      }
    });
  }

  build(structure) {
    const outputPath = path.join(structure.path, 'index.ts');
    if(structure.files.length) {
      const separator = ''.padEnd(12, '-');
      const preffix = `//* ${separator} WARNING: Auto generated file, do not change ${separator}\n\n`;
      const suffix = `\n//* ${''.padEnd(69, '-')}\n`;
      const fileContent = structure.files.reduce((content, file) => {
        if(file.name !== 'index.ts' && !file.name.includes('.spec.')) {
          content += `export * from './${file.name.replace('.ts', '.js')}';\n`;
        }
        return content;
      }, '');
      const subfolderIndex = structure.dir.reduce((content, subfolder) => {
        if((!this.buildProd || !subfolder.name.includes('@types'))) {
          content += `export * from './${subfolder.name}/index.js';\n`;
        }
        return content;
      }, '');

      this.generatedFiles.push(outputPath);
      fs.writeFileSync(outputPath, preffix + fileContent.concat(subfolderIndex) + suffix);
    }
    structure.dir.forEach(this.build.bind(this));
  }

  removeStart(filePath) {
    if(filePath.startsWith(path.sep)) {

    }
  }

  getFolderNameWithPrefix(name, preffix = '@') {
    if(name.startsWith(preffix)) return name;
    return `${preffix}${name}`
  }

  start() {
    const structure = {};
    this.loadStructure(path.join(backendPath), structure, 'src');
    structure.dir.forEach(this.build.bind(this));
    const basePath = path.join(backendPath, 'src');
    const tsPaths = this.generatedFiles.reduce((tsPaths, filePath) => {
      const pathToHandle = path.relative(basePath, filePath);
      const relativeDir = path.dirname(pathToHandle);
      const folderName = path.basename(relativeDir);
      let key = '';
      if(relativeDir === folderName) {
        key = folderName;
      } else {
        const subLevelNumber = relativeDir.split(path.sep).length;
        const parentFolder = path.basename(path.dirname(relativeDir));
        const subFolderKey = `${parentFolder}-${folderName.replace('@', '')}`
        key = subLevelNumber <= 2 ? folderName : subFolderKey;
      }
      key = this.getFolderNameWithPrefix(key);
      tsPaths[key] = [path.relative(basePath, filePath)];
      return tsPaths;
    }, {});
    const tsconfig = fs.readFileSync(path.join(backendPath, 'tsconfig.json'), 'utf8');
    const tsconfigJson = JSON.parse(tsconfig);
    tsconfigJson.compilerOptions.paths = tsPaths;
    fs.writeFileSync(path.join(backendPath, 'tsconfig.json'), JSON.stringify(tsconfigJson, null, 2));
  }
}
const buildProd = !!process.argv.find((arg) => arg === '--prod');
new GenerateIndex(buildProd).start();
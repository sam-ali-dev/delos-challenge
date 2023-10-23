import { Readable } from 'stream';

export enum StringFormats {
  base64 = 'base64',
  hex = 'hex',
  utf8 = 'utf8',
}

const replaceLastSubstring = (str: string, substr: string, replacement: string) => {
  const index = str.lastIndexOf(substr);
  if (index === -1) {
    return str;
  }
  return str.substring(0, index) + replacement + str.substring(index + substr.length);
};

export const getUniqueAssetName = (assets: string[], fileName: string) => {
  let counter = 0;
  let fName = fileName;
  const ext = `.${fName.split('.').pop()}`;
  while (assets.includes(fName) && counter < assets.length) {
    if (fName.includes(`_${counter}${ext}`)) {
      fName = fName.replace(`_${counter}${ext}`, `_${++counter}${ext}`);
    } else {
      counter += 1;
      fName =
        ext && fName.includes(ext)
          ? replaceLastSubstring(fName, ext, `_${counter}${ext}`)
          : `${fName}_${counter}`;
    }
  }
  return replaceLastSubstring(fName, ext, '');
};

export async function parseStreamAsJSON(stream: Readable) {
  const chunks: Array<Buffer> = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  const jsonStr = chunks.join('');
  return JSON.parse(jsonStr);
}

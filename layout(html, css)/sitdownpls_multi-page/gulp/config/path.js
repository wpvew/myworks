// import { src } from 'gulp';
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './src';

export const path = {
  build: {
    images: `${buildFolder}/img/`,
    svg: `${buildFolder}/img/`,
    js: `${buildFolder}/js/`,
    jsModules: `${buildFolder}/js/modules/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    files: `${buildFolder}/libs/`,
    fonts: `${buildFolder}/fonts/`,
    phpFiles: `${buildFolder}/phpmailer/`,
    phpMail: `${buildFolder}/`
  },
  src: {
    images: `${srcFolder}/img/*.*`,
    svg: `${srcFolder}/img/*.svg`,
    js: `${srcFolder}/js/*.js`,
    jsModules: `${srcFolder}/js/modules/**/*.js`,
    scss: `${srcFolder}/scss/style.scss`,
    html: `${srcFolder}/*.html`,
    files: `${srcFolder}/libs/**/*.*`,
    svgicon: `${srcFolder}/img/svg/*.svg`,
    phpFiles: `${srcFolder}/phpmailer/**/*.php`,
    phpMail: `${srcFolder}/*.php`
  },
  watch: {
    images: `${srcFolder}/img/*.*`,
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    files: `${srcFolder}/libs/**/*.*`
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ``
}

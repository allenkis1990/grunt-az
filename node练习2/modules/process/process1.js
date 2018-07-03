console.log(process.cwd());
console.log(__dirname);
console.log('-----------------改变目录后-------------------');
process.chdir('../../images');
console.log(process.cwd());
console.log(__dirname);



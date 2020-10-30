mm = require("../build/index.js");
fs = require('fs');

let inTemplate = fs.readFileSync("./example.tex");

let m = new mm.MailMerge(inTemplate);
m.add({"$$NAME$$": "Person A", "$$OTHER$$": "Person B"}, 'a.tex')

m.add({"$$NAME$$": "Person B", "$$OTHER$$": "Person A"}, 'b.tex')

m.processAll();
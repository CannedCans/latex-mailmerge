# latex-mailmerge
Perform mail merges on LaTeX (or any kind really) templates through Node.js

This example from examples/example.js explains how to use the package. It isn't specific to LaTeX, its just what I was using it for.

```
mm = require("latex-mailmerge");
fs = require('fs');

let inTemplate = fs.readFileSync("./example.tex");

let m = new mm.MailMerge(inTemplate);
m.add({"$$NAME$$": "Person A", "$$OTHER$$": "Person B"}, 'a.tex')

m.add({"$$NAME$$": "Person B", "$$OTHER$$": "Person A"}, 'b.tex')

m.processAll();
```

It will read the template in from example.tex, using the keywords $$NAME$$ and $$OTHER$$ which get replaced by Person A, Person B.

The outputs are put in a.tex and b.tex. Those parameters are technically optional but if not included, you will have to get the output from m.processAll() yourself (it returns a string[])



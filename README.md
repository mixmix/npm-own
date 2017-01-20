Usage

```sh
npm install npm-own -g
cd YOUR_NPM_PROJECT
npm-own
```

This module reads `package.json` **maintainers** and adds them as module owners on npm.
**NOTE** the **name listed must be the npm username**

```json
{
  "author: "mixmix <whimful@gmail.com>",
  "maintainers": [
    "ahdinosaur <mikey@enspiral.com>",
    { 
      "name": "pietgeursen"
    }
  ]
}
```


## Usage

```sh
npm install npm-own -g
cd YOUR_NPM_PROJECT
npm-own
```

This module reads your `package.json` **`maintainers`** and adds them as owners on npm.

```json
{
  "author": "mixmix <whimful@gmail.com>",
  "maintainers": [
    "ahdinosaur <mikey@enspiral.com>",
    {
      "name": "pietgeursen"
    }
  ]
}
```

**NOTE** the name listed **must be the npm username**

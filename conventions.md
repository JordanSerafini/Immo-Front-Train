# CONVENTIONS

## Git

Here is the convention when you need to name a commit :
- **When you're adding a new feature**
```bash
:feat: <content>
```
_Example:_
```bash
:feat: Cancel Modal when you're clicking on the "Delete" button
```

- **When you fix a bug**
```bash
:fix: <content>
```
_Example:_
```bash
:fix: "/" no longer redirect to NotFound Component
```

_That's it for examples..._

- **When you change something into the package.json file or the overall configuration**
```bash
:build: <content>
```

- **When you add comments or a markdown file**
```bash
:docs: <content>
```

- **When you improve performances of the app (like optimizing react re-rendering)**
```bash
:perf: <content>
```

- **When you refactor**
```bash
:refactor: <content>
```

- **When you add a unit test**
```bash
:u-test: <content>
```

## Architecture

While creating a component, we avoid to name the file as : "index.ts"
Example for a NavBar component : Navbar/NavBar.tsx

## CASE TYPES

- **Component File names:** Pascal Case
- **TypeScript Interface:** Pascal Case
- **Assets:** lowercase
- **variables:** lowercase
- **CSS:** snake-case

## SCSS

If you need to write SCSS, we prefer the BEM convention.
[BEM Convention (fr)](https://alticreation.com/bem-pour-le-css/)
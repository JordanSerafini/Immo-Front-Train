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

## EMOTES

|   Commit type              | Emoji                                         |
|:---------------------------|:----------------------------------------------|
| Initial commit             | :tada: `:tada:`                               |
| Version tag                | :bookmark: `:bookmark:`                       |
| New feature                | :sparkles: `:sparkles:`                       |
| Bugfix                     | :bug: `:bug:`                                 |
| Metadata                   | :card_index: `:card_index:`                   |
| Documentation              | :books: `:books:`                             |
| Documenting source code    | :bulb: `:bulb:`                               |
| Performance                | :racehorse: `:racehorse:`                     |
| Cosmetic                   | :lipstick: `:lipstick:`                       |
| Tests                      | :rotating_light: `:rotating_light:`           |
| Adding a test              | :white_check_mark: `:white_check_mark:`       |
| Make a test pass           | :heavy_check_mark: `:heavy_check_mark:`       |
| General update             | :zap: `:zap:`                                 |
| Improve format/structure   | :art: `:art:`                                 |
| Refactor code              | :hammer: `:hammer:`                           |
| Removing code/files        | :fire: `:fire:`                               |
| Continuous Integration     | :green_heart: `:green_heart:`                 |
| Security                   | :lock: `:lock:`                               |
| Upgrading dependencies     | :arrow_up: `:arrow_up:`                       |
| Downgrading dependencies   | :arrow_down: `:arrow_down:`                   |
| Lint                       | :shirt: `:shirt:`                             |
| Translation                | :alien: `:alien:`                             |
| Text                       | :pencil: `:pencil:`                           |
| Critical hotfix            | :ambulance: `:ambulance:`                     |
| Deploying stuff            | :rocket: `:rocket:`                           |
| Fixing on MacOS            | :apple: `:apple:`                             |
| Fixing on Linux            | :penguin: `:penguin:`                         |
| Fixing on Windows          | :checkered_flag: `:checkered_flag:`           |
| Work in progress           | :construction:  `:construction:`              |
| Adding CI build system     | :construction_worker: `:construction_worker:` |
| Analytics or tracking code | :chart_with_upwards_trend: `:chart_with_upwards_trend:` |
| Removing a dependency      | :heavy_minus_sign: `:heavy_minus_sign:`       |
| Adding a dependency        | :heavy_plus_sign: `:heavy_plus_sign:`         |
| Docker                     | :whale: `:whale:`                             |
| Configuration files        | :wrench: `:wrench:`                           |
| Package.json in JS         | :package: `:package:`                         |
| Merging branches           | :twisted_rightwards_arrows: `:twisted_rightwards_arrows:` |
| Bad code / need improv.    | :hankey: `:hankey:`                           |
| Reverting changes          | :rewind: `:rewind:`                           |
| Breaking changes           | :boom: `:boom:`                               |
| Code review changes        | :ok_hand: `:ok_hand:`                         |
| Accessibility              | :wheelchair: `:wheelchair:`                   |
| Move/rename repository     | :truck: `:truck:`                             |

## Create a branch

**Branch Creation**
```bash
git checkout -b <branchname>
```

**Push new branch to a remote Git Repo**
```bash
git push origin -u <branchname>
```

**!IF YOU WANT TO PUSH TO MAIN!**

Go to the github repo : [Repository](https://alticreation.com/bem-pour-le-css/)

Go to your branch and click "Compare & pull request".

Follow the instructions.

**Pull if your branch has a few commits behind**

Position yourself on your branch :
```bash
git checkout <yourbranch>
```

```bash
git pull origin <branchYouWantToPull> --rebase
```
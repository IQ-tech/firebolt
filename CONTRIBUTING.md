
### What is a contribution?

Every change made to the repository can be considered a contribution.
Commit is the main way to contribute, whether it's creating a new feature, fixing a bug, creating a test or writing documentation, but it's not the only one.

Github counts the following actions as a contribution:

- Commits
- Pull Requests
- Issues
- Discussions

### How to contribute to Firebolt

To contribute to Firebolt, before making any changes, first discuss your idea with the ADM's, either through an issue, email or any other method.

There are several ways to contribute to the project:

- Reporting bugs
- Indicating improvements
- Suggesting features
- Discussing the issues
- Making pull requests

#### Reporting bugs

If you found a bug you can report it using the issues tool on github. However, before submitting your bug, it is important to do the following checks:

1. Update your local repository to the latest main branch. Perhaps your bug has already been fixed in the latest version;
2. Check if the bug has already been reported by someone else by searching the issues.

If the bug really wasn't resolved or accepted then it's time to create a new issue. In the issue title, try to summarize the problem as best as possible, avoiding generic titles such as "**Validation problems**", and opt for a more detailed one such as "**Data type field validation problems**".

If possible, include images or videos in the bug description to facilitate the reproduction process.

#### Indicating improvements

Another great way to contribute is by pointing out improvements to the project's code and how it's structured. If you have any idea how we can improve some troubleshooting approach, code refactoring, feature improvement, or anything else related, please follow these steps:

1. Make sure your idea is not already covered in our roadmap;
2. Also check if the idea is not already present in our github issues;
3. Defend your idea and explain convincingly why it should be accepted. Here are some questions to consider:
    1. Are you really proposing a single idea or a set of ideas?
    2. What problem does your idea solve?
    3. Why is your suggestion better than what's already in the code?
    4. Is it really worth taking the time to implement your idea within our priorities?
    

Having gone through the sieve of all these questions, it is enough to [create a new issue](https://github.com/IQ-tech/firebolt/issues/new).

### Suggesting features

Given what we are building together with the community, new features have relative priority. It's only worth submitting your feature suggestion if:

1. The resource in question solves a problem that is not solved by anything that already exists in the project;
2. The resource solves a real problem validated by people who are in direct contact with the use of the project.

To create your feature request, just [create a new issue](https://github.com/IQ-tech/firebolt/issues/new).

### Discussing the issues

Before we go into the code itself it is very important that we discuss with the community how each issue will be addressed. Each and every question must be put up for discussion so that anyone who wants to solve that problem has as much information as possible to carry out a solution.

Ideally all issues should have a clear action plan before any code is written. We know that this is often not possible, and it is necessary to explore and better analyze what has been indicated. In these cases, publish all your findings in the discussions indicating paths and receiving feedback from the community regarding what is being proposed.

### Other ways to contribute

If you don't work with code but want to help the project, there are many other ways to contribute:

- Help with project documentation;
- Organize events and give talks about the project;
- Did you see a discussion that interests you and where you can add even without technical knowledge? Don't be shy and also participate in the github issues.

Have you thought of any other way to contribute? Share with us!

### How to create pull requests

Once you have a relatively clear plan of action you should be ready to contribute code. For this, fork the project and work on a branch other than main implementing your solutions.

Before opening your PR (pull request) make sure that:

- The code actually solves a real problem (preferably based on an issue raised);
- Your PR resolves only one issue. If you want to do more than one thing, split it up into multiple PRs;
- Your code is functional (or something close to it). Provide testing if possible;
- Your commit messages are clear and describe the work well.

#### 1- Fork Firebolt

Go to [https://github.com/IQ-tech/firebolt](https://github.com/IQ-tech/firebolt) and **fork** the Firebolt.

This will create a copy of Firebolt in your gIthub account.

#### 2- Clone Firebolt

Now clone the Firebolt that was forked to your machine.

Open a terminal where you want to clone Firebolt and run the following git command:

```
git clone "URL that you just copied"
```

where "URL you just copied" (without the quotes) is the URL to the repository (your Firebolt fork).

For example:

```
git clone https://github.com/<your-user>/firebolt.git
```

where `your-user` put your github username. Here you are copying Firebolt content from github to your computer.

#### 3- create a branch

Change to the repository directory on your computer (if you're not already there):

```
cd firebolt
```

Now create a branch using the command git checkout (the default used for branch name and commits is [https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/)):

Example of a new functionality:

`git checkout -b feat/new-feature`

Example of a bug fix:

`git checkout -b fix/bug-title-home`

#### 4- How to make commits

Make the necessary changes.

Add these changes to the branch you just created using the `git add` command:

Now commit these changes using `git commit` (Follow [https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/) and [https://gitmoji.dev/](https://gitmoji.dev/) to make your commit):

`git commit -m "conventionalcommit(scope): :GITMOJI: message”`

| | |
| --- | ------- |
| conventionalcommit | \- follow: https://www.conventionalcommits.org/en/v1.0.0/ |
| (scope)           | \- changed project location, today there are the following scopes: all client client-core validators lab entities blueberry-theme json-schema |
| :GITMOJI:          | \- use: https://gitmoji.dev/  O :GITMOJI: é opcional |
| message           | \- message describing the change (must be in English). |

**Example:**

```
git commit -m "feat(client) :speech_balloon: updating main title"
```

#### 5- Push changes to github

Submit your changes using the command `git push`:

**Example:**

```bash
git push  origin <feat/new-feature>
```

replacing `feat/new-feature` with the name of the branch you created earlier.

#### 6- Submit your changes for review

If you go to your repository on github, you will see a `Compare & pull request` button. Click that button. Or click on `Pull requests` then on `New pull request`

Select your branch and open a `Pull request` for the `main` branch of `IQ-tech/firebolt`

**Fill in the pull request template**

```markdown
<!--- Provide a general summary of your changes in the title above -->

#### Description

<!--- Describe your changes in detail -->

---

#### Motivation and Context

<!--- Why is this change required? What problem does it solve? -->

---

#### Screenshots and links

---
```

|  |  | 
| ---------- | ----------- |
| <! --- Provide a general summary of your changes in the title above -> | In the title, fill in a general summary of your changes.| 
| <! --- Describe your changes in detail -> | replace with a description of what has changed in the project.|
| <! --- Why is this change required? What problem does it solve? -> | replace with a description of the need for the change and what problem it solves. |
| Screenshots and links | Fill in if necessary images, gifs or videos. |

Example:**:** 

```markdown

docs: updating README for example

---

#### Description

entering an example text in the README

---

#### Motivation and Context

an example improvement

---

**Screenshots and links**
<.img src="example />

---
```

Finally click on `Create pull request` .

#### 7- Approved pull request

Once the pull request is approved, the feature branch can be merged into the `main` branch, at which point a new firebolt prerelease containing the added change will be released.

The feature will also be added to the next official release of the library (when a repository admin merges the `main` branch into the `latest` branch.
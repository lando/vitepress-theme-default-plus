---
title: Adding a guide signup
description: Learn how to easily add a guide newsletter signup.
guide: true
mailchimp:
  action: https://dev.us12.list-manage.com/subscribe/post?u=59874b4d6910fa65e724a4648&amp;id=613837077f
  title: Want similar content?
  byline: Signup and we will send you a weekly blog digest of similar content to keep you satiated.
  button: Sign me up!
---

# Adding a guide signup

While you can leverage the global [MailChimp](./../components/mailchimp) component to add a newsletter signup to any page we've added a way to invoke it through `frontmatter` for convenience.

**Note that this _only_ works for Guide content.**

Here is how we do it for this page:

```md
---
title: Adding a guide signup
description: Learn how to easily add a guide newsletter signup.
guide: true
mailchimp:
  # action is required
  action: https://dev.us12.list-manage.com/subscribe/post?u=59874b4d6910fa65e724a4648&amp;id=613837077f
  # everything else is optional
  title: Want similar content?
  byline: Signup and we will send you a weekly blog digest of similar content to keep you satiated.
  button: Sign me up!
---
```

---
description: Learn about the VitePress Default Theme + global MailChimp components.
---

# MailChimp

### Usage

You'll need to get the form action URL for the MailChimp audience you want the user to subscribe to. If you are not sure what that is all about then [check this out](https://mailchimp.com/help/determine-webpage-signup-location/).

Otherwise you can embed the below directly into a `.vue` or `.md` file.

```html
<MailChimp
  action="MAILCHIMP_FORM_ACTION_URL"
  title="Subscribe to the newsletter!"
  byline=""
  button="Subscribe"
/>
```

### Example

```html
<MailChimp
  action="https://dev.us12.list-manage.com/subscribe/post?u=59874b4d6910fa65e724a4648&amp;id=613837077f"
  title="Lando Newsletter"
  byline="Join our revolution to free developers from the mind forged manacled of lesser dev tools"
  button="I'm your huckleberry!"
/>
```

<MailChimp
  action="https://dev.us12.list-manage.com/subscribe/post?u=59874b4d6910fa65e724a4648&amp;id=613837077f"
  title="Lando Newsletter"
  byline="Join our revolution to free developers from the mind forged manacled of lesser dev tools"
  button="I'm your huckleberry!"
/>

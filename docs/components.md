---
description: Learn about the VuePress 2 components you can use with VuePress2 Default Theme Plus.
---
# Components

This theme adds a few more helpful and globally available components in addition to the ones [already provided by the default theme](https://v2.vuepress.vuejs.org/reference/default-theme/components.html). We have also added a "Guide" component but it is best used [this like](./making-a-guide.md).

Anyway, here are the additional globally available components that we've added.

## YouTube

#### Usage:

All you should need is the `id` of the YouTube video and you'll get a responsive full width embed.

```md
<YouTube id="YOUTUBE_VIDEOID"/>
```

#### Example:

```md
<YouTube id="tKjZuykKY1I"/>
```

<YouTube id="tKjZuykKY1I"/>

## MailChimp

#### Usage:

You'll need to get the form action URL for the MailChimp audience you want the user to subscribe to. If you are not sure what that is all about then [check this out](https://mailchimp.com/help/determine-webpage-signup-location/).

```md
<MailChimp
  action="MAILCHIMP_FORM_ACTION_URL"
  title="Subscribe to the newsletter!"
  byline=""
  button="Subscribe"
/>
```

#### Example:

```md
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

## Sponsors

#### Usage:

You'll need to set sponsors over [here](./config.html#sponsors) for this to work.

```md
<Sponsors />
```

#### Example:

```md
<Sponsors />
```

<Sponsors />

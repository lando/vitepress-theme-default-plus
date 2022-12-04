---
description: Learn about the custome containers for VuePress2 Default Theme Plus.
---

# Custom Containers

Note that the below are _in addition_ to the [custom containers](https://v2.vuepress.vuejs.org/reference/default-theme/markdown.html#custom-containers) from the default theme.

## Halfsies

This is useful if you want to break content into two columns for a bit.

#### Usage

```md
::: half
CONTENT HERE
:::
::: half
CONTENT HERE
:::
```

#### Example

#### Input

```md
::: half
![At the Opera](https://media1.giphy.com/media/bjtM9GdxbqL5e/giphy.gif)
:::
::: half
![At the Opera](https://media1.giphy.com/media/bjtM9GdxbqL5e/giphy.gif)
:::
```

#### Output

::: half
![Is it possible to learn this power?](https://media1.giphy.com/media/bjtM9GdxbqL5e/giphy.gif)
:::

::: half
![Is it possible to learn this power?](https://media1.giphy.com/media/bjtM9GdxbqL5e/giphy.gif)
:::

## Thirdsies

This is useful if you want to break content into three columns for a bit.

#### Usage

```md
::: third
CONTENT HERE
:::
::: third
CONTENT HERE
:::
::: third
CONTENT HERE
:::
```

#### Example

#### Input

```md
::: third
![What a show!](https://c.tenor.com/88jV4RXj3x4AAAAC/not-from-a-jedi-palpatine.gif)
:::
::: third
![What a show!](https://c.tenor.com/88jV4RXj3x4AAAAC/not-from-a-jedi-palpatine.gif)
:::
::: third
![What a show!](https://c.tenor.com/88jV4RXj3x4AAAAC/not-from-a-jedi-palpatine.gif)
:::
```

#### Output

::: third
![What a show!](https://c.tenor.com/88jV4RXj3x4AAAAC/not-from-a-jedi-palpatine.gif)
:::
::: third
![What a show!](https://c.tenor.com/88jV4RXj3x4AAAAC/not-from-a-jedi-palpatine.gif)
:::
::: third
![What a show!](https://c.tenor.com/88jV4RXj3x4AAAAC/not-from-a-jedi-palpatine.gif)
:::

## Center

This is useful if you want to just center some stuff for awhile.

#### Usage

```md
::: center
CONTENT HERE
:::
```

#### Example

#### Input

```md
::: center
![Bendu in the middle](https://preview.redd.it/rztids1gllb51.jpg?auto=webp&s=72b1a7d64e6fbfb8e01028e598f854e62de07770)
<p><small><strong>IN THE MIDDLE</strong></small></p>
:::
```

#### Output

::: center
![Bendu in the middle](https://preview.redd.it/rztids1gllb51.jpg?auto=webp&s=72b1a7d64e6fbfb8e01028e598f854e62de07770)
<p><small><strong>IN THE MIDDLE</strong></small></p>
:::

## Left

This is useful if you want to insert a block to float left amid a sea of text.

#### Usage

```md
::: left
CONTENT HERE
:::
```

#### Example

#### Input

```md
I'm baby occaecat paleo beard twee enamel pin. Irure occupy hot chicken yr heirloom ennui. Eiusmod cliche tempor, four dollar toast tousled sustainable keytar in ut waistcoat dolore. Shoreditch migas excepteur man bun.

::: left
![Hip Kitten](https://i.pinimg.com/originals/70/36/7d/70367d787e4806129c62e759b8ad2aee.jpg)
:::

I'm baby polaroid kale chips tattooed viral iceland lomo authentic next level, coloring book fanny pack four dollar toast. Venmo pop-up four dollar toast snackwave bespoke squid, echo park cardigan austin. Chia hot chicken skateboard tousled, kitsch af vegan food truck snackwave cred craft beer farm-to-table hoodie. Raclette tilde bitters keffiyeh woke, sustainable poutine asymmetrical af slow-carb. Twee tilde fingerstache pug direct trade cold-pressed, forage readymade cray you probably haven't heard of them raw denim.

Cornhole microdosing gochujang lo-fi. Air plant selfies kickstarter seitan, austin listicle pinterest narwhal ramps pop-up kale chips yr next level chambray butcher. Pabst man bun ennui +1. Man bun adaptogen echo park thundercats, la croix gluten-free portland woke mixtape iPhone salvia. Farm-to-table health goth godard, vegan raw denim gastropub pinterest post-ironic vaporware blue bottle readymade PBR&B authentic.
```

#### Output

I'm baby occaecat paleo beard twee enamel pin. Irure occupy hot chicken yr heirloom ennui. Eiusmod cliche tempor, four dollar toast tousled sustainable keytar in ut waistcoat dolore. Shoreditch migas excepteur man bun.

::: left
![Hip Kitten](https://i.pinimg.com/originals/70/36/7d/70367d787e4806129c62e759b8ad2aee.jpg)
:::

I'm baby polaroid kale chips tattooed viral iceland lomo authentic next level, coloring book fanny pack four dollar toast. Venmo pop-up four dollar toast snackwave bespoke squid, echo park cardigan austin. Chia hot chicken skateboard tousled, kitsch af vegan food truck snackwave cred craft beer farm-to-table hoodie. Raclette tilde bitters keffiyeh woke, sustainable poutine asymmetrical af slow-carb. Twee tilde fingerstache pug direct trade cold-pressed, forage readymade cray you probably haven't heard of them raw denim.

Cornhole microdosing gochujang lo-fi. Air plant selfies kickstarter seitan, austin listicle pinterest narwhal ramps pop-up kale chips yr next level chambray butcher. Pabst man bun ennui +1. Man bun adaptogen echo park thundercats, la croix gluten-free portland woke mixtape iPhone salvia. Farm-to-table health goth godard, vegan raw denim gastropub pinterest post-ironic vaporware blue bottle readymade PBR&B authentic.

## Right

This is useful if you want to insert a block to float right amid a sea of text.

#### Usage

```md
::: right
CONTENT HERE
:::
```

#### Example

#### Input

```md
I'm baby occaecat paleo beard twee enamel pin. Irure occupy hot chicken yr heirloom ennui. Eiusmod cliche tempor, four dollar toast tousled sustainable keytar in ut waistcoat dolore. Shoreditch migas excepteur man bun.

::: right
![Hip Kitten](https://i.pinimg.com/originals/70/36/7d/70367d787e4806129c62e759b8ad2aee.jpg)
:::

I'm baby polaroid kale chips tattooed viral iceland lomo authentic next level, coloring book fanny pack four dollar toast. Venmo pop-up four dollar toast snackwave bespoke squid, echo park cardigan austin. Chia hot chicken skateboard tousled, kitsch af vegan food truck snackwave cred craft beer farm-to-table hoodie. Raclette tilde bitters keffiyeh woke, sustainable poutine asymmetrical af slow-carb. Twee tilde fingerstache pug direct trade cold-pressed, forage readymade cray you probably haven't heard of them raw denim.

Cornhole microdosing gochujang lo-fi. Air plant selfies kickstarter seitan, austin listicle pinterest narwhal ramps pop-up kale chips yr next level chambray butcher. Pabst man bun ennui +1. Man bun adaptogen echo park thundercats, la croix gluten-free portland woke mixtape iPhone salvia. Farm-to-table health goth godard, vegan raw denim gastropub pinterest post-ironic vaporware blue bottle readymade PBR&B authentic.
```

#### Output

I'm baby occaecat paleo beard twee enamel pin. Irure occupy hot chicken yr heirloom ennui. Eiusmod cliche tempor, four dollar toast tousled sustainable keytar in ut waistcoat dolore. Shoreditch migas excepteur man bun.

::: right
![Hip Kitten](https://i.pinimg.com/originals/70/36/7d/70367d787e4806129c62e759b8ad2aee.jpg)
:::

I'm baby polaroid kale chips tattooed viral iceland lomo authentic next level, coloring book fanny pack four dollar toast. Venmo pop-up four dollar toast snackwave bespoke squid, echo park cardigan austin. Chia hot chicken skateboard tousled, kitsch af vegan food truck snackwave cred craft beer farm-to-table hoodie. Raclette tilde bitters keffiyeh woke, sustainable poutine asymmetrical af slow-carb. Twee tilde fingerstache pug direct trade cold-pressed, forage readymade cray you probably haven't heard of them raw denim.

Cornhole microdosing gochujang lo-fi. Air plant selfies kickstarter seitan, austin listicle pinterest narwhal ramps pop-up kale chips yr next level chambray butcher. Pabst man bun ennui +1. Man bun adaptogen echo park thundercats, la croix gluten-free portland woke mixtape iPhone salvia. Farm-to-table health goth godard, vegan raw denim gastropub pinterest post-ironic vaporware blue bottle readymade PBR&B authentic.

## Cardish

This is useful if you just want a very subtle card-ish type vibe.

#### Usage

```md
::: card TITLE HERE
CONTENT HERE
:::
```

#### Example

#### Input

```md
::: card WAIT... ANOTHER WHAT?
![Another happy landing](https://c.tenor.com/e9yVO9Q1ckEAAAAC/kenobi-star-wars.gif)
:::
```

#### Output

::: card WAIT... ANOTHER WHAT?
![Another happy landing](https://c.tenor.com/e9yVO9Q1ckEAAAAC/kenobi-star-wars.gif)
:::

## Highlight

#### Usage

```md
::: highlight
CONTENT HERE
:::
```

#### Example

#### Input

```md
::: highlight
What if I told you that the Republic was now under the control of a Dark Lord of the Sith?
:::
```

#### Output

::: highlight
What if I told you that the Republic was now under the control of a Dark Lord of the Sith?
:::

## Thumbnail/Caption

#### Usage

```md
:::: thumbnail
SOME IMAGE
::: caption
SOME CAPTION
:::
::::
```

#### Example

#### Input

```md
:::: thumbnail
![kalabox1-dash](https://thinktandem.io/images/articles/kalabox1.png "Kalabox V1 Dashboard")
::: caption
Kalabox Version 1 Dashboard
:::
::::
```

#### Output

:::: thumbnail
![kalabox1-dash](https://thinktandem.io/images/articles/kalabox1.png "Kalabox V1 Dashboard")
::: caption
Kalabox Version 1 Dashboard
:::
::::


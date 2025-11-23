# After Edna Andrade [Night Sea](https://www.visitpham.org/objects/72126) (1977)

I saw this painting at the [Harvard Art Museums](https://harvardartmuseums.org/)' [*Edna Andrade: Imagination Is Never Static*](https://harvardartmuseums.org/exhibitions/6455/edna-andrade-imagination-is-never-static) show. Given the highly geometric nature of [*Night Sea*](https://www.visitpham.org/objects/72126), I decided to explore it through [p5.js](https://p5js.org/) like my other [art projects](../../).

The wall text for this painting says:

> VARIATIONS ON A THEME
> 
> [...]
>
> <!-- wall text
> "When I begin a series of paintings, my ideas are usually vague. To get started, I set up a simple geometric field, a matrix in which to play with visual possibilities."
> > Experimentation was the driving force of Andrade's practice. She developed many of her compositions by beginning with a pattern of elemental geometric shapes-circles, squares, triangles-on graph paper. Summoning her skill and technical precision with line, she would then draw that pattern repeatedly by hand, using only rulers, a compass, and a wooden device to brace her arm, altering just one aspect of the design as she moved through sections of the drawing or from one composition to the next. Her own drawn geometric pattern thus became the grid onto which she could test out possibilities by introducing color, varying the weight of each line, or layering forms. In this way, Andrade developed her own visual vocabulary by creating a series of geometric designs that became the building blocks for multiple compositions in other media.
> -->> Many of Andrade's works featured variations on the repeated pattern of a sine wave and radiating lines seen in the works on this wall. In *Night Sea*, she set this against a deep blue field; the elegant, visually pulsating array suggests waves cresting and falling across an infinite expanse. <!-- wall text Andrade rendered the painting as she did her drawings, with precise hand-drawn lines. The exact weight and form of her marks allow the pattern to create an illusion of spatial depth, movement, and luminosity, as if depicting moonlight cast across the rippling surface of the water.
-->

However, as you can see from my [p5.js rendering](../), *they are not sine waves*.

This document describes my design journey when rendering  Edna Andrade's [*Night Sea*](https://www.visitpham.org/objects/72126).

## Design analysis

The analysis for this project is made from digital images &mdash; including from the [Philadelphia Art Museum](https://www.visitpham.org/objects/72126), [Elizabeth Minkel](https://elizabethminkel.com/post/656807008243187712/oncanvas-night-sea-edna-andrade-1977-acrylic-on), this [2003 catalog](https://icaphila.org/books/edna-andrade-optical-paintings-1963-1986-2), and my own camera.

- **Size**: the canvas is apparently square with *'sine waves'* spaced regularly across and down the canvas that have regularly spaced points on the waves connected to corresponding points in adjacent waves.
- **Colors**: Three colors, including grayish background (`#50505040`), blueish line (`#A8DDDD80`), and pinkish (`#EEBBC880`) line colors.
- **Pattern**: The *'sine waves'* patterns are repeated, 2 waves across and 5 waves down.

## Initial design choices

Following the approach of previous [p5.js](https://p5js.org/) [art projects](../../):

- I added a [p5.js sketch](https://editor.p5js.org/dcpetty/full/ny1Khhvxm) that includes a modified `index.html` file and `<div>`s and `<span>`s with `id="sketch-*"` properties to position [p5.js](https://p5js.org/) components.
- The [repository](https://github.com/dcpetty/p5js/tree/main/night-sea) includes an `index.html` file with modified `<title>`, `<a>` &amp; `<iframe>` links.
- The [sketch](https://editor.p5js.org/dcpetty/full/ny1Khhvxm) has `style()`, `setup()`, and `draw()` functions as with other [art projects](../../). 
- The [sketch](https://editor.p5js.org/dcpetty/full/ny1Khhvxm) has other functions for calculating the wave points, minima and maxima, and arc length along the wave as a function of `periods` (initially $2$) and `waves` (initially $5$).
- Following the example of other [art projects](../../) like [*Centered Green*](../../centered-green/), this [sketch](https://editor.p5js.org/dcpetty/full/ny1Khhvxm) has design-parameter sliders for `periods`, `waves`, and `points`.
- There is also a checkbox that selects the function type (*sine* or *ellipse*).

## Design approach

There were several false starts in this design. Some were based on bad assumptions about the wave function, some came from misinterpretation of how points on adjacent waves are connected, and some came from assuming a [sine function](https://en.wikipedia.org/wiki/Sine_and_cosine) for the wave.

### The first approach

- Scan the $x$ component from left to right and calculate $y = f(x)$ for each small interval (including calculating the total arc length) and save the (number of) `periods` periods of the (number of) `waves` waves in a 1D array.
- The connected points appear to be evenly spaced along the non-linear wave, therefore the connected-point `y` values cannot be calculated by *evenly spaced* $x$ values, so calculate the total arc length divided by (the number of ) `points` to find the evenly spaced $(x, y)$ points.
- Collect the minima and maxima for each wave, since the connected points connect to minima and maxima on adjacent waves.
- After rendering the [sine function](https://en.wikipedia.org/wiki/Sine_and_cosine), it visually appears that the periodic wave function may be made of piecewise [ellipse](https://en.wikipedia.org/wiki/Ellipse)s. That required implementing both `pointSine` and `pointEllipse` functions.
- Finally, each connected point must be connected by [line](https://p5js.org/reference/p5/line/)s to minima and maxima on adjacent waves.

### The next approach

In implementing the first approach &mdash; including factoring the project into functions &mdash; a few things became clear.

- The connected points only connect to the minima of the above wave when $\le k$ and only connect to the maxima of the below wave when $\ge k$. The other connected points connect to corresponding points on the below wave (when $\le k$) or the above wave (when $\ge k$).
- Evenly spacing the connected points along the waves is best achieved with [polar coordinates](https://en.wikipedia.org/wiki/Polar_coordinate_system).

This required sketching the geometric parameters of [*Night Sea*](https://www.visitpham.org/objects/72126).

<iframe src="./night-sea.pdf#navpanes=0" width="50%" height="800px" style="display: block; margin: auto;" loading="lazy" referrerpolicy="no-referrer"></iframe>
<!-- <hr>
<embed
  src="./night-sea.pdf#navpanes=0"
  type="application/pdf"
  width="80%"
  height="800px"
  style="display: block; margin: auto;" 
/> -->

## This document

As part of my [p5.js](https://p5js.org/) [art projects](../../), many of the design rationales and design choices are documented in the [p5.js](https://p5js.org/) code. While it is important to document code *in the code*, many design choices &mdash; in particular, answers to 'why?' questions &mdash; are not typically captured in code comments. 

As a consequence, I have added `doc/` directories to the other [art projects](../../) that include `README.md` files like this one. 

*This* [`doc/`](.) directory also includes an `index.html` file that embeds the README files like [this](./README.md) one, incorporates [Markd](https://marked.js.org/) and [MathJax](https://www.mathjax.org/) rendering, and was created with the help of generative artificial intelligence (in the [Dia browser](https://www.diabrowser.com/)). 

<hr>

[&#128279; permalink](https://dcpetty.github.io/p5js/night-sea/doc/) and [&#128297; repository](https://github.com/dcpetty/p5js/tree/main/night-sea/doc/) for this page.
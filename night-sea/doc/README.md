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

The analysis for this project is made from digital images &mdash; including from the [Philadelphia Art Museum](https://www.visitpham.org/objects/72126), [Elizabeth Minkel](https://elizabethminkel.com/post/656807008243187712/oncanvas-night-sea-edna-andrade-1977-acrylic-on), this [catalog](https://icaphila.org/books/edna-andrade-optical-paintings-1963-1986-2), and my own camera.

- **Size**: the canvas is apparently square with *'sine waves'* spaced regularly across and down the canvas that have regularly spaced points on the waves connected to corresponding points in adjacent waves.
- **Colors**: Three colors, including grayish background (`#50505040`), blueish line (`#A8DDDD80`), and pinkish (`#EEBBC880`) line colors.
- **Pattern**: The *'sine waves'* patterns are repeated, 2 waves across and 5 waves down.

## Initial design choices

Following the approach of previous [p5.js](https://p5js.org/) [art projects](../../):

- I added a [p5.js sketch](https://editor.p5js.org/dcpetty/full/ny1Khhvxm) that includes a modified `index.html` file and `<div>`s and `<span>`s with `id="sketch-*"` properties to position [p5.js](https://p5js.org/) components.
- The [repository](https://github.com/dcpetty/p5js/tree/main/night-sea) includes an `index.html` file with modified `<title>`, `<a>` &amp; `<iframe>` links.
- The [p5.js sketch](https://editor.p5js.org/dcpetty/full/ny1Khhvxm) has `style()`, `setup()`, and `draw()` functions as with other [art projects](../../). 
- The [p5.js sketch](https://editor.p5js.org/dcpetty/full/ny1Khhvxm) has other functions for calculating the wave points, minima and maxima, and arc length along the wave as a function of `periods` (initially `2`) and `waves` (initially `5`).
- Because the design parameters of other [art projects](../../) like [*Centered Green*](../../centered-green/) can be changed, this [sketch](https://editor.p5js.org/dcpetty/full/ny1Khhvxm) has sliders for `periods`, `waves`, and `points`.
- There is also a checkbox that selects the function type (*sine* or *ellipse*).

## False starts

There 

<iframe src="./night-sea.pdf#navpanes=0" width="50%" width="800px" style="display: block; margin: auto;" loading="lazy" referrerpolicy="no-referrer"></iframe>
<!-- <hr>
<embed
  src="./night-sea.pdf#navpanes=0"
  type="application/pdf"
  width="80%"
  height="800px"
  style="display: block; margin: auto;" 
/> -->
<hr>

[&#128279; permalink](https://dcpetty.github.io/p5js/night-sea/doc/) and [&#128297; repository](https://github.com/dcpetty/p5js/tree/main/night-sea/doc/) for this page.
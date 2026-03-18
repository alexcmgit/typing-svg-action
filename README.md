# Typing SVG Action

GitHub Action that generates typing animation SVGs from issue YAML codeblocks.

## Usage

Create an issue with a YAML codeblock:

~~~markdown
```yaml
lines:
  - Hello World
  - Welcome to my profile
color: "36BCF7"
size: 24
width: 500
center: true
```
~~~

The action will generate an SVG and comment it back on the issue.

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `lines` | string/array | required | Text lines to animate |
| `font` | string | `monospace` | Font family |
| `weight` | string | `400` | Font weight |
| `color` | string | `#36BCF7` | Text color (hex) |
| `background` | string | `#00000000` | Background color (hex) |
| `size` | number | `20` | Font size in px |
| `center` | boolean | `false` | Center text horizontally |
| `vCenter` | boolean | `false` | Center text vertically |
| `width` | number | `400` | SVG width in px |
| `height` | number | `50` | SVG height in px |
| `multiline` | boolean | `false` | Show lines stacked vs retyped |
| `duration` | number | `5000` | Typing duration in ms |
| `pause` | number | `0` | Pause between lines in ms |
| `repeat` | boolean | `true` | Loop animation |
| `separator` | string | `;` | Line separator (if lines is string) |
| `random` | boolean | `false` | Randomize line order |
| `letterSpacing` | string | `normal` | CSS letter-spacing |

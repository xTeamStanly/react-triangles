# react-triangles
Simple triangle pattern example.

[DEMO](https://xteamstanly.github.io/react-triangles/).

## Preview
![preview](preview.png)
## Triangles properties
| Prop                |    Type    | Definition                                               | Default value |
|---------------------|:----------:|----------------------------------------------------------|:-------------:|
| topcolor            |   string   | Top gradient color.                                      |    #221A33    |
| botcolor            |   string   | Bottom gradient color.                                   |    #8A3D99    |
| hue                 |   number   | Color hue variations                                     |      0.2      |
| sat                 |   number   | Color saturation variations                              |       0       |
| val                 |   number   | Color value variations                                   |      0.15     |
| countx              |   number   | Number of horizontal triangles                           |       10      |
| county              |   number   | Number of vertical triangles                             |       10      |
| equilateral         |   boolean  | Should the triangles be equilateral? (*Ignores countx!*) |       10      |

## Todo
- make a non-intrusive control panel for customisation ([resource](https://github.com/dataarts/dat.gui))
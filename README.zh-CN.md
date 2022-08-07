<div align="center">
	<br>
	<br>
	<img width="240" alt="Ink" src="./media/logo.svg">
	<br>
	<br>
	<br>
</div>


<p align='center'>
简体中文 | <a href='./README.md'>English</a>
</p>

> 使用Vue组件构建你的命令行界面应用 

Temir提供了与Vue在浏览器基于组件的UI构建体验相同，但是它面向的是命令行应用。

它使用 [Yoga](https://github.com/facebook/yoga) 在终端构建Flexbox布局，所以许多和CSS一样的属性在Temir中一样可用。
如果你已经熟悉Vue.js，那么其实你已经熟悉Temir了。

由于 Temir 是一个Vue渲染器，这意味着Vue的大多数特性都得到了支持。

本文档只介绍关于Temir的使用方法，关于Vue可查看[官方文档](https://vuejs.org/)。

---

## 安装

```sh
npm install @temir/core
```

## 使用

```vue
<script lang="ts" setup>
import { ref } from '@vue/runtime-core'
import { TBox, TText } from '@temir/core'
const counter = ref(0)
setInterval(() => {
  counter.value++
}, 100)
</script>

<template>
  <TBox>
    <TText color="green">
      {{ counter }} tests passed
    </TText>
  </TBox>
</template>

```

<img src="./media/temir-demo.gif" />


## HMR支持

<img src="./media/temir-hmr.gif" />


## 内容

- [快速开始](#getting-started)
- [组件](#components)
  - [`<Text>`](#text)
  - [`<Box>`](#box)
  - [`<Newline>`](#newline)
  - [`<Spacer>`](#spacer)
  - [`<Link>`](https://github.com/webfansplz/temir/tree/main/packages/temir-link)
  - [`<Tab>`](https://github.com/webfansplz/temir/tree/main/packages/temir-tab)
  - [`<Spinner>`](https://github.com/webfansplz/temir/tree/main/packages/temir-spinner)
  - 💻 持续补充中，欢迎贡献。
- [例子](https://github.com/webfansplz/temir/tree/main/examples)
  - [hi-temir](https://github.com/webfansplz/temir/tree/main/examples/hi-temir)  
    ![](./media/hi-temir.png)
  - [borders](https://github.com/webfansplz/temir/tree/main/examples/borders)   
    ![](./media/temir-borders.png)
  - [table](https://github.com/webfansplz/temir/tree/main/examples/table)   
    ![](./media/temir-table.png)
  - [temir-link](https://github.com/webfansplz/temir/tree/main/examples/temir-link)   
    ![](./packages/temir-link/media/temir-link.png)
  - [temir-spinner](https://github.com/webfansplz/temir/tree/main/examples/temir-spinner)   
    ![](./packages/temir-spinner/media/temir-spinner.gif)
  - [temir-tab](https://github.com/webfansplz/temir/tree/main/examples/temir-tab)   
    ![](./packages/temir-tab/media/temir-tab.gif)
  - [vitest](https://github.com/webfansplz/temir/tree/main/examples/vitest)  
    ![](./media/temir-vitest.gif)

## 快速开始

使用 `@temir/cli` 快速搭建一个基于Temir的CLI。

```sh

mkdir my-temir-cli

cd my-temir-cli

touch main.ts

npm install @temir/cl

# Dev (开发)

temir main.ts

# Build (打包)

temir build main.ts
```

你也可以通过下载这个 [例子](https://github.com/webfansplz/temir/tree/main/examples/hi-temir) 来快速开始，你也可以打开 [repl.it sandbox](https://replit.com/@webfansplz/hi-temir?v=1)来在线体验和尝试它。

Temir 使用 Yoga - 一款Flexbox布局引擎使用你在构建浏览器应用时使用过的类似CSS的属性，为你的CLI构建出色的用户界面。 重要的是要记住，每个元素都是一个Flexbox容器。可以认为浏览器中的每个<div>都有display: flex。有关如何在Temir中使用Flexbox布局的文档，请参阅下面的<Box>内置组件。注意，所有文本都必须包装在<text>组件中。

## 组件

### `<Text>`

这个组件可以显示文本，并将其样式更改为粗体、下划线、斜体或删除线。

![temir-text-props](./media/temir-text-props.png)

```vue
<TText color="green">
  I am green
</TText>

<TText color="black" background-color="white">
  I am black on white
</TText>

<TText color="white">
  I am white
</TText>

<TText :bold="true">
  I am bold
</TText>

<TText :italic="true">
  I am italic
</TText>

<TText :underline="true">
  I am underline
</TText>

<TText :strikethrough="true">
  I am strikethrough
</TText>

<TText :inverse="true">
  I am inversed
</TText>

```

**注意:** `<Text>` 只允许文本节点和嵌套的 `<Text>` 组件作为他的子元素。例如， `<Box>` 组件不能在 `<Text>` 组件中使用。

#### color

Type: `string`

改变文本颜色。

Temir在内部使用[chalk](https://github.com/chalk/chalk)，所以它的所有功能都是支持的。

```vue
<TBox flex-direction="column">
  <TText color="green">
    Green
  </TText>
  <TText color="blue">
    Blue
  </TText>
  <TText color="red">
    Red
  </TText>
</TBox>
```

<img src="./media/temir-text-props-color.png" />

#### backgroundColor

Type: `string`

与上面的“颜色”相同，但用于背景。

```vue
<TBox flex-direction="column">
  <TText background-color="green">
    Green
  </TText>
  <TText background-color="blue">
    Blue
  </TText>
  <TText background-color="red">
    Red
  </TText>
</TBox>

```

<img src="./media/temir-text-bg-color.png" />

#### dimColor

Type: `boolean`\
Default: `false`

调暗颜色(减少亮度)。

```vue
<Text color="red" dimColor>
	Dimmed Red
</Text>
```

<img src="./media/temir-text-props-dimmed-color.png" />

#### bold

Type: `boolean`\
Default: `false`

将文本加粗。

#### italic

Type: `boolean`\
Default: `false`

使文本斜体。

#### underline

Type: `boolean`\
Default: `false`

给文字添加下划线。

#### strikethrough

Type: `boolean`\
Default: `false`

给文字添加删除线。

#### inverse

Type: `boolean`\
Default: `false`

调换字体和背景的颜色。

```vue
<TText color="yellow" :inverse="true">
  Inversed Yellow
</TText>
```

<img src="./media/text-inverse.png"/>

#### wrap

Type: `string`\
Allowed values: `wrap` `truncate` `truncate-start` `truncate-middle` `truncate-end`\
Default: `wrap`


此属性告诉Temir，如果文本宽度大于容器，则对其进行换行或截断。
默认情况下，Temir将会对文本进行换行并将其分成多行。
如果传入`truncate-*`， Temir将替换截断文本，这将导致只输出一行文本，其余部分被截断。

```vue
<template>
  <TBox :width="7">
    <TText>Hello World</TText>
  </TBox>
  //=> 'Hello\nWorld'

  // `truncate` is an alias to `truncate-end`
  <TBox :width="7">
    <TText wrap="truncate">
      Hello World
    </TText>
  </TBox>
  //=> 'Hello…'

  <TBox :width="7">
    <TText wrap="truncate-middle">
      Hello World
    </TText>
  </TBox>
  //=> 'He…ld'

  <TBox :width="7">
    <TText wrap="truncate-start">
      Hello World
    </TText>
  </TBox>
  //=> '…World'
</template>
```

### `<Box>`

`<Box>`是构建布局必不可少的Temir组件。
这就像在浏览器中`<div style='display: flex'>`。

```vue
<script>
import { TBox, TText } from '@temir/core'
</script>

<template>
  <TBox :margin="2">
    <TText>This is a box with margin</TText>
  </TBox>
</template>
```

#### 尺寸

##### width

Type: `number` `string`

元素在空间中的宽度。
你还可以将其设置为百分比，它将根据父元素的宽度计算宽度。

```vue
<template>
  <TBox :width="4">
    <TText>X</TText>
  </TBox>

  //=> 'X   '
</template>
```

```vue
<template>
  <TBox :width="10">
    <TBox width="50%">
      <TText>X</TText>
    </TBox>

    <TText>
      Y
    </TText>
  </TBox>

  //=> 'X    Y'
</template>
```

##### height

Type: `number` `string`

元素的行高。
你还可以将其设置为百分比，它将根据父元素的高度计算高度。

```vue
<template>
  <TBox :height="4">
    <TText>X</TText>
  </TBox>
  //=> 'X\n\n\n'
</template>
```

```vue
<template>
  <TBox :height="6" flex-direction="column">
    <TBox height="50%">
      <TText>X</TText>
    </TBox>

    <TText>
      Y
    </TText>
  </TBox>
  //=> 'X\n\n\nY\n\n'
</template>
```

##### minWidth

Type: `number`

设置元素的最小宽度。
目前还不支持百分比，请参阅 https://github.com/facebook/yoga/issues/872。

##### minHeight

Type: `number`

设置元素的最小高度。
目前还不支持百分比，请参阅 https://github.com/facebook/yoga/issues/872.

#### Padding

##### paddingTop

Type: `number`\
Default: `0`

顶部内边距

##### paddingBottom

Type: `number`\
Default: `0`

底部内边距

##### paddingLeft

Type: `number`\
Default: `0`

左侧内边距

##### paddingRight

Type: `number`\
Default: `0`

右侧内边距

##### paddingX

Type: `number`\
Default: `0`

水平内边距。相当于设置`paddingLeft`和`paddingRight`。

##### paddingY

Type: `number`\
Default: `0`

垂直内边距。相当于设置`paddingTop` and `paddingBottom`。

##### padding

Type: `number`\
Default: `0`

所有的内边距。相当于设置 `paddingTop`，`paddingBottom`，`paddingLeft` and `paddingRight`。

```vue
<template>
  <TBox :padding-top="2">
    <TText>Top</TText>
  </TBox>

  <TBox :padding-bottom="2">
    <TText>Bottom</TText>
  </TBox>

  <TBox :padding-left="2">
    <TText>Left</TText>
  </TBox>

  <TBox :padding-right="2">
    <TText>Right</TText>
  </TBox>

  <TBox :padding-x="2">
    <TText>Left and right</TText>
  </TBox>

  <TBox :padding-y="2">
    <TText>Top and bottom</TText>
  </TBox>

  <TBox :padding="2">
    <TText>Top，bottom，left and right</TText>
  </TBox>
</template>

```

#### Margin

##### marginTop

Type: `number`\
Default: `0`

顶部外边距

##### marginBottom

Type: `number`\
Default: `0`

底部外边距

##### marginLeft

Type: `number`\
Default: `0`

左侧外边距

##### marginRight

Type: `number`\
Default: `0`

右侧外边距

##### marginX

Type: `number`\
Default: `0`

水平外边距。相当于设置 `marginLeft` and `marginRight`。

##### marginY

Type: `number`\
Default: `0`

垂直外边距。相当于设置 `marginTop` and `marginBottom`。

##### margin

Type: `number`\
Default: `0`

所有的外边距。相当于设置 `marginTop`, `marginBottom`, `marginLeft` and `marginRight`。

```vue
<template>
  <TBox :margin-top="2">
    <TText>Top</TText>
  </TBox>

  <TBox :margin-bottom="2">
    <TText>Bottom</TText>
  </TBox>

  <TBox :margin-left="2">
    <TText>Left</TText>
  </TBox>

  <TBox :margin-right="2">
    <TText>Right</TText>
  </TBox>

  <TBox :margin-x="2">
    <TText>Left and right</TText>
  </TBox>

  <TBox :margin-y="2">
    <TText>Top and bottom</TText>
  </TBox>

  <TBox :margin="2">
    <TText>Top, bottom, left and right</TText>
  </TBox>
</template>
```

#### Flex

##### flexGrow

Type: `number`\
Default: `0`

请查阅 [flex-grow](https://css-tricks.com/almanac/properties/f/flex-grow/).

```vue
<template>
  <TBox>
    <TText>Label:</TText>
    <TBox :flex-grow="1">
      <TText>Fills all remaining space</TText>
    </TBox>
  </TBox>
</template>
```

##### flexShrink

Type: `number`\
Default: `1`

请查阅 [flex-shrink](https://css-tricks.com/almanac/properties/f/flex-shrink/).

```vue
<template>
  <TBox :width="20">
    <TBox :flex-shrink="2" :width="10">
      <TText>Will be 1/4</TText>
    </TBox>

    <TBox :width="10">
      <TText>Will be 3/4</TText>
    </TBox>
  </TBox>
</template>
```

##### flexBasis

Type: `number` `string`

请查阅 [flex-basis](https://css-tricks.com/almanac/properties/f/flex-basis/).

```vue
<template>
  <TBox :width="6">
    <TBox :flex-basis="3">
      <TText>X</TText>
    </TBox>

    <TText>
      Y
    </TText>
  </TBox>
  //=> 'X  Y'
</template>
```

```vue
<template>
  <TBox :width="6">
    <TBox flex-basis="50%">
      <TText>X</TText>
    </TBox>

    <TText>
      Y
    </TText>
  </TBox>
  //=> 'X  Y'
</template>
```

##### flexDirection

Type: `string`\
Allowed values: `row` `row-reverse` `column` `column-reverse`

请查阅 [flex-direction](https://css-tricks.com/almanac/properties/f/flex-direction/).

```vue
<template>
  <TBox>
    <TBox :margin-right="1">
      <TText>X</TText>
    </TBox>

    <TText>
      Y
    </TText>
  </TBox>
  // X Y

  <TBox flex-direction="row-reverse">
    <TText>X</TText>
    <TBox :margin-right="1">
      <TText>Y</TText>
    </TBox>
  </TBox>
  // Y X

  <TBox flex-direction="column">
    <TText>X</TText>
    <TText>Y</TText>
  </TBox>
  // X
  // Y

  <TBox flex-direction="column-reverse">
    <TText>X</TText>
    <TText>Y</TText>
  </TBox>
  // Y
  // X
</template>
```

##### alignItems

Type: `string`\
Allowed values: `flex-start` `center` `flex-end`

请查阅 [align-items](https://css-tricks.com/almanac/properties/a/align-items/).

```vue
<template>
  <TBox align-items="flex-start">
    <TBox :margin-right="1">
      <TText>X</TText>
    </TBox>

    <TText>
      A
      <TNewline />
      B
      <TNewline />
      C
    </TText>
  </TBox>
  // X A
  //   B
  //   C

  <TBox align-items="center">
    <TBox margin-right="1">
      <TText>X</TText>
    </TBox>

    <TText>
      A
      <TNewline />
      B
      <TNewline />
      C
    </TText>
  </TBox>
  //   A
  // X B
  //   C

  <TBox align-items="flex-end">
    <TBox margin-right="1">
      <TText>X</TText>
    </TBox>

    <TText>
      A
      <TNewline />
      B
      <TNewline />
      C
    </TText>
  </TBox>
  //   A
  //   B
  // X C
</template>
```

##### alignSelf

Type: `string`\
Default: `auto`\
Allowed values: `auto` `flex-start` `center` `flex-end`

请查阅 [align-self](https://css-tricks.com/almanac/properties/a/align-self/).

```vue
<template>
  <TBox :height="3">
    <TBox align-self="flex-start">
      <TText>X</TText>
    </TBox>
  </TBox>
  // X
  //
  //

  <TBox :height="3">
    <TBox align-self="center">
      <TText>X</TText>
    </TBox>
  </TBox>
  //
  // X
  //

  <TBox :height="3">
    <TBox align-self="flex-end">
      <TText>X</TText>
    </TBox>
  </TBox>
  //
  //
  // X
</template>
```

##### justifyContent

Type: `string`\
Allowed values: `flex-start` `center` `flex-end` `space-between` `space-around`

请查阅 [justify-content](https://css-tricks.com/almanac/properties/j/justify-content/).

```vue
<template>
  <TBox justify-content="flex-start">
    <TText>X</TText>
  </TBox>
  // [X      ]

  <TBox justify-content="center">
    <TText>X</TText>
  </TBox>
  // [   X   ]

  <TBox justify-content="flex-end">
    <TText>X</TText>
  </TBox>
  // [      X]

  <TBox justify-content="space-between">
    <TText>X</TText>
    <TText>Y</TText>
  </TBox>
  // [X      Y]

  <TBox justify-content="space-around">
    <TText>X</TText>
    <TText>Y</TText>
  </TBox>
  // [  X   Y  ]
</template>
```

#### Visibility

##### display

Type: `string`\
Allowed values: `flex` `none`\
Default: `flex`

设置此属性为`none`以隐藏该元素。

#### Borders

##### borderStyle

Type: `string`\
Allowed values: `single` `double` `round` `bold` `singleDouble` `doubleSingle` `classic`

添加具有指定样式的边框，默认情况下不添加。
Temir从[`cli-boxes`](https://github.com/sindresorhus/cli-boxes)模块中使用边框样式。

```vue
<template>
  <TBox flex-direction="column">
    <TBox>
      <TBox border-style="single" :margin-right="2">
        <TText>single</TText>
      </TBox>

      <TBox border-style="double" :margin-right="2">
        <TText>double</TText>
      </TBox>

      <TBox border-style="round" :margin-right="2">
        <TText>round</TText>
      </TBox>

      <TBox border-style="bold">
        <TText>bold</TText>
      </TBox>
    </TBox>

    <TBox :margin-top="1">
      <TBox border-style="singleDouble" :margin-right="2">
        <TText>singleDouble</TText>
      </TBox>

      <TBox border-style="doubleSingle" :margin-right="2">
        <TText>doubleSingle</TText>
      </TBox>

      <TBox border-style="classic">
        <TText>classic</TText>
      </TBox>
    </TBox>
  </TBox>
</template>
```


##### borderColor

Type: `string`

改变边框颜色。

接受与`<Text>`组件中的[`color`](#color)相同的值。

```vue
```vue
<template>
  <TBox border-style="round" border-color="green">
    <TText>Green Rounded Box</TText>
  </TBox>
</template>
```

### `<Newline>`

添加一个或多个换行符(`\n`)。
必须在`<Text>`组件中使用。

#### count

Type: `number`\
Default: `1`

要插入的换行数。

```vue
<script>
import { TBox, TNewline, TText } from '@temir/core'
</script>

<template>
  <TBox>
    <TText>
      <TText color="green">
        Hello
      </TText>
      <TNewline />
      <TText color="red">
        World
      </TText>
    </TText>
  </TBox>
</template>

```

Output:

```
Hello
World
```

### `<Spacer>`

沿其包含布局的主轴展开的灵活空间。
作为填充元素之间所有可用空间的快捷方式，它非常有用。

例如，在具有默认伸缩方向(`row`)的`<Box>`中使用`<Spacer>`将把"Left"定位到左边，并将"Right"推到右边。

```vue
<script lang="ts" setup>
import { TBox, TSpacer, TText } from '@temir/core'
</script>

<template>
  <TBox>
    <TText>Left</TText>
    <TSpacer />
    <TText>Right</TText>
  </TBox>
</template>

```

在垂直伸缩方向(`column`)，它会将"Top"定位到容器的顶部，并将"Bottom"推到它的底部。
注意，容器需要足够高才能看到效果。

```vue
<script lang="ts" setup>
import { TBox, TSpacer, TText } from '@temir/core'
</script>

<template>
  <TBox flex-direction="column" :height="10">
    <TText>Top</TText>
    <TSpacer />
    <TText>Bottom</TText>
  </TBox>
</template>

```

## 致谢

这个项目的灵感来源于[ink](https://github.com/vadimdemedes/ink)

[vite-node](https://github.com/antfu/vite-node)为实现HMR提供了强力的支持

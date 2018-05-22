## 盒尺寸四大家族

### content

> 根据'外在盒子'是内联还是块级, 把元素分为内联元素和块级元素

> 根据是否具有可替换内容, 把元素分为替换元素和非替换元素

#### 典型的替换元素: img, iframe, object, video, audio, textarea, input, select; 

- 内容的外观不受页面上的 CSS 影响;  
- 有自己的尺寸;
> 大多替换元素默认的尺寸(不包括边框)是300*150像素, 少数元素如 img 默认0像素;  
- 在很多 CSS 属性上有自己的一套表现规则;
> 替换元素的基线定义为元素的下边缘
- 所有替换元素都是内联水平元素
- 替换元素的 display 是 inline-block, inline, block 中的任意一个,其尺寸计算规则都是一样

#### 替换元素的尺寸计算规则

- 固有尺寸
> 替换内容原本的尺寸
- HTML 尺寸
> HTML尺寸通过 html 原生属性改变,如: img 的 width,height, input 的 size, textarea 的 cols 和 rows 等
- CSS 尺寸
> 可以通过 css 的 width 和 height 或者 max-width/max-height 和 min-width/min-height 设置尺寸

- 计算规则:
    1. 没有 css 尺寸和 html 尺寸, 由固有尺寸作为最终宽高
    2. 没有 css 尺寸,使用 html 尺寸作为最终宽高
    3. 有 css 尺寸, 最终尺寸由 css 属性决定
    4. 如果固有尺寸有固有的宽高比例, 同时仅设置了宽度或高度,则保持固有比例展示
    5. 默认 300 * 150 展示
    6. 内联替换元素和块级替换元素使用统一规则
    7. 缺省 src 的`<img>`IE 浏览器下是28\*30, chrome 是 0\*0,firefox 是0\*22
    8. 缺省 src 的`<img>`在 firefox 下 display 为 inline
    9. 无法改变替换元素内容的固有尺寸

### content内容生成技术

#### IE8仅支持单冒号的伪元素

#### 清楚浮动
```css
.clear:after {
    content: '';
    display: block; /* 或者 table */
    clear: both;
}
```

#### `\A` 换行: 将光标垂直移动到下一行

#### `\D` 回车: 将光标移动到当前行的开头

#### content 不支持 CSS3 渐变背景图

#### content 开启闭合符号生成

```css
.question {
    quotes: '问题: "' '?"'
}
.question::before {
    content: open-quote;
}
.question::after {
    content: close-quote;
}
```

#### content 计数器

- counter-reset
> counter-reset: time 1;

- counter-increment
> counter-increment: time 2;

- counter() / counters()
> counter(time, lower-roman)

> counters(time, '-')
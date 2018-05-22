## padding

#### 内联元素的 padding 在垂直方向会影响布局,影响视觉效果.只是因为内联元素没有可是宽度与可视高度( clientWidth 与 clientWidth 为0),垂直方向的行为表现完全受 line-height 与 vertical-align 的影响,视觉上并没有改变上下行的间距

### CSS中不影响其他元素布局而是出现层叠效果的现象
- padding 上下内边距
- relative 元素定位
- box-shadow 盒阴影
- outline 

#### padding 属性不支持负值
#### padding 百分比值无论是水平还是垂直方向都是相对于宽度计算的
#### ol/ul 列表内置 padding-left, 单位是 px 不是 em
#### 很多表单元素都内置 padding
#### button 兼容性差, 高兼容性的替代方案如下:
```html
<button id="submit"></button>
<label for="submit"></label>
```
```css
button {
    position: absolute;
    clip: rect(0 0 0 0);
}
label {
    display: inline-block;
    line-height: 20px;
    padding: 10px;
}
```
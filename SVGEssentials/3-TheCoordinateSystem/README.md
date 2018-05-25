# 坐标系统

通过`SVG`标签的`width``height`设置画布区域的视口大小

坐标默认以左上角为原点

没有单位的数值都视为像素

```html
<svg width="100" height="100"></svg>
```

通过属性`viewBox`来设置用户坐标系统的 最小x坐标，最小y坐标，宽度，高度

```html
<svg width="100" height="100" viewBox="0 0 20 20"></svg>
```

通过属性`preserveAspectRatio`来设置轴与位置

指定轴 x/Y
指定位置 Min/Mid/Max
指定显示方式 none/meet/slice

```html
<!--x轴居中， y轴居中， 按比例缩放-->
<svg width="100" height="100" viewBox="0 0 20 20" preserveAspectRatio="xMidYMid meet"></svg>
```
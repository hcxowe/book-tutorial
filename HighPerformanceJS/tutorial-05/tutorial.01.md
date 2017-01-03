## 快速响应的用户界面

- js和用户界面更新在同一个线程中，一次只能处理一件事情，当js代码正在运行时不能处理用户输入。
- 任何js任务的运行时间不应当超过100ms，过多的运行时间会导致用户觉得明显的延时，影响用户体验
- js运行期间，针对此时的用户输入不同浏览器会有不同的响应方式，为了避免这些差异，严格控制代码运行时间
- 定时器可以用来安排代码延时执行，也可以把过长时间运行的任务拆分成一个个小任务来顺序执行
- 新版浏览器支持多线程这些在html5的学习中在仔细研究

## Ajax
 
### 数据格式
- 纯文本和HTML只适用于特定场所，他们可以节省客户端的cpu周期
- XML被广泛应用并支持良好，但是他十分笨重，数据需要在服务器组装，客户端然后解析
- JSON是轻量级的，解析速度快，被视为原生代码而不是字符串进行处理的，主流的数据格式
- 字符分隔的自定义格式的数据，解析很快，服务器需构建自定义格式数据，并在客户端解析

### 数据请求
- XMLHttpRequest
- 动态脚本注入 
- 图像信标

### Ajax 优化
- 减少请求数，通过合并js和css文件
- 缩短页面加载时间，主要内容加载完成后，通过动态脚本注入或者XHR请求次要文件
- 代码错误不要输出给用户，在服务器处理错误
- 使用成熟的Ajax类库， 如jquery，dojo，prototype等
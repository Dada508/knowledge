// react框架知识汇总

// index.js  通用

// react是react框架的核心代码部分，它提供了一套UI渲染方案。
import React from 'react';
// ReactDom是react在前端(浏览器)开发中的配套工具，它对react框架和前端环境进行连接。
// (react框架还可以结合react-native进行手机APP开发)
import ReactDOM from 'react-dom';
// 导入全局样式文件。
import './index.css';
// 导入App组件(相当于Vue的根组件)。在React框架中，一个组件由一个js文件和一个css文件组成。css文件中是组件的样式，js文件中是组件的模板和逻辑代码。
import App from './App';
import * as serviceWorker from './serviceWorker';
// 使用react-redux中的Provider组价将store注入到根组件中。
import { Provider } from "react-redux";
import store from "./state/store.js";
// 在React开发中，使用的不是标准js语法，而是jsx语法。jsx是一种js和html混写的语法，可以在html中插入js代码，也可以在js中插入html模板。
// webpack在进行打包时，会把jsx转为js
// ReactDOM.render方法，渲染方法，作用是将第一个参数作为内容，渲染到第二个参数的元素中。
// 把App组件渲染到id为root的div中。(相当于挂载根组件)
ReactDOM.render(
    (
        <Provider store={store}>
            <App />
        </Provider>
    ),
    document.getElementById('root'),
);
serviceWorker.unregister();

// App.js 通用 根组件  导入组件 react路由

import React from 'react';
// 在组件js文件中需要导入组件的css样式文件，在React框架中，没有样式隔离功能，所以组件的样式文件中的class必须以组件名作为前缀，否则会出现组件样式冲突。
import './App.css';
// 下载 react-router-dom,react路由模块
// react路由也提供了两种路由模式：history模式和hash模式，分别对应的是BrowserRouter和HashRouter。
import {
    Route,
    HashRouter,
    Link,
    Switch,
    Redirect
} from "react-router-dom"
// 在一个组件中使用另一个组件，只需要导入组件文件即可。
import Hello from "./components/Hello.jsx";
import List from "./components/List.jsx";
// React框架中，组件可以是一个函数，也可以是一个类。一般情况下，简单的组件写为函数，而复杂的组件一般都写为类。
// 如果是函数组件，则函数需要返回组件的模板。所以函数组件的功能很少，基本只能提供组件的模板。
function App() {
    return (
        <div className="App">
            {/* 在模板中，通过标签使用组件，标签名就是组件名。*/}
            <Hello></Hello>
            <List></List>
            {/* HashRouter 是路由视图，相当于vue的router-view */}
            <HashRouter>
                <ul>
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/game">游戏</Link></li>
                    <li><Link to="/setting/123">设置</Link></li>
                    <li><Link to="/user">用户</Link></li>
                </ul>
                {/* Switch组件中填写切换的页面组件，同一时间只能匹配到一个组件 */}
                <Switch>
                    {/* 在HashRouter中使用 Route 组件添加路由规则 */}
                    {/* react路由默然使用的不是全匹配，而是开头匹配，只要页面url是以path开头的，都能匹配到组件。 */}
                    {/* 在Route标签中添加exact属性可以进行路径全匹配  */}
                    <Route exact path="/" component={Home} />
                    <Route exact path="/game" component={GamePage} />
                    {/* react路由也可以通过路径传参，通过路由匹配到的页面组件中的props.match.params可以得到路径参数 */}
                    <Route exact path="/setting/:id" component={Setting} />
                    {/* react路由没有类似vue路由的导航守卫功能。 */}
                    {/* Route除了设置path和组件对应，还可以直接设置渲染函数render。渲染函数中返回需要显示的html或组件 */}
                    {/* 可以在render函数中做判断，来实现导航守卫功能 */}
                    <Route exact path="/user" render={props => {
                        let isLogin = true;
                        return isLogin ? (<h1>用户中心</h1>) : (<Redirect to="/" />)
                    }}></Route>
                    {arr.map(obj => {
                        return <Route exact path={obj.path} component={obj.component}></Route>
                    })}
                    {/* 如果Route没有设置path则匹配所有path，可以用于设置404页面 */}
                    <Route component={NotFound} />
                    {/* 另一种...不常用 */}
                    {arr.map(obj => {
                        return <Route exact path={obj.path} component={obj.component}></Route>
                    })}
                </Switch>
            </HashRouter>
        </div>
    );
}
export default App;

// Hello.jsx 组件创建、属性、事件、输入框双向绑定、生命周期钩子函数、组件传值

// React对象中的Component属性，是React组件类的父类。可以通过{}直接导入。
import React, { Component } from "react";
import "./Hello.css";
import NumCtrl from "./NumCtrl.jsx";
// 组件的模板可以单独赋值给一个变量，这样可以将组件的模板和代码分开写，利于代码的阅读。
// const template = ()
// 通过类创建组件时，组件类必须继承于Component类。
class Hello extends Component {
    // 组件的构造函数，类似于vue组件的created
    constructor(props) {
        super(props);
        // 在组件构造函数中，this就是组件对象。
        // 通过组件对象的state属性，为组件添加状态(数据)。
        this.state = {
            num: 100,
            txt: "你好",
            n1: 10,
            n2: 20
        }
    }
    // 组件类中必须有render函数，用于返回组件的模板。
    render() {
        // 组件的模板只能有一个根标签。
        return (
            <div>
                {/* 在jsx中，class用于声明一个类，所以jsx中的html标签设置class时不能使用class属性，而要使用className属性。 */}
                <h1 className="Hello-red">Hello World</h1>
                <p>这是Hello组件</p>
                {/* jsx中在html中插入js，需要使用 {} 包裹起来 */}
                {/* 在react的模板中，使用{}进行数据绑定，而且不能只填数据的名字，必须使用this.state.xxx进行绑定 */}
                <p>{this.state.txt}</p>
                <hr />
                <p>{this.state.num}</p>
                {/* 在React中进行事件绑定和原生代码类似，不同之处是事件名要使用小驼峰命名 */}
                {/* 事件绑定的方法一般都绑定到组件的方法上，使用{}包裹，而且要加this.xxxx */}
                {/* 方法名后不能添加() */}
                {/* 可以通过绑定一个箭头函数，然后箭头函数中调用组件方法的形式进行自定义传参 */}
                <button onClick={this.addBtnClick}>num++</button>
                <hr />
                {/* React中没有双向绑定指令，要实现类似vue中的v-model效果，必须手动绑定value值监听onChange事件 */}
                {/* React中标签内容和属性都通过{}进行绑定 */}
                {/* React中的事件不能直接绑定一段代码， 如果需要绑定一段代码，则必须把代码写在箭头函数中*/}
                <input
                    type="text"
                    value={this.state.n1}
                    onChange={e => {
                        this.setState({ n1: e.target.value * 1 })
                    }}
                /> +
                <input type="text" value={this.state.n2} onChange={e => {
                    this.setState({ n2: e.target.value * 1 })
                }} /> =
                <span>{this.sum()}</span>
                <p>n1:{this.state.n1} , n2:{this.state.n2}</p>
                {/* React组件也通过属性进行传值 */}
                <NumCtrl
                    number={this.state.num}
                    numChange={n => {
                        this.setState({ num: n })
                    }}
                ></NumCtrl>
            </div>
        );
    }
    // 默认情况下，组件方法中的this不是组件对象，而是空，如果需要在组件方法通过this找到组件对象，则必须使用箭头函数写组件方法。
    addBtnClick = () => {
        // this.state.num++;
        // React组件修改数据，不能直接修改，否则不会进行数据绑定。
        // 需要使用setState方法进行数据修改，这样数据修改之后会重新渲染一次组件。
        this.setState({
            num: this.state.num + 1
        });
    }
    // React中没有类似vue中的computed，数据计算必须通过方法进行。
    sum = () => {
        return this.state.n1 + this.state.n2;
    }
    // 生命周期钩子函数，
    // 组件渲染完毕之后执行，相当于vue的mounted
    componentDidMount() {
        // 声明周期钩子函数中的this是组件对象
        console.log(this);
    }
    // 当组件将要卸载时调用，相当于vue的destroyed
    componentWillUnmount() {
    }
}
export default Hello;

// List.jsx 条件渲染、列表渲染、单选框双向绑定

import React, { Component } from "react";
import "./List.css";
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            books: [
                { name: '数据结构', price: '29' },
                { name: '算法艺术', price: '19' },
                { name: 'C++程序设计', price: '59' }
            ],
            listClassArr: ["List-red", "List-bold"]
        }
    }
    render() {
        return (
            <div>
                {/* 如果是多选框input，绑定的值是checked，而不是value */}
                <input
                    type="checkbox"
                    checked={this.state.show}
                    onChange={e => {
                        this.setState({ show: e.target.checked })
                    }}
                />
                {/* 在React模板中，布尔值不能直接绑定在页面上。 */}
                {/* React中，条件渲染通过三目运算符或者&&进行。 */}
                {/* {this.state.show?<h1>这是一段条件渲染的文本，只有当show为true时显示</h1>:<h2>show为false</h2>} */}
                {this.state.show && <h1>这是一段条件渲染的文本，只有当show为true时显示</h1>}
                {/* 列表渲染 */}
                <table className={this.state.listClassArr.join(" ")}>
                    <tbody>
                        <tr>
                            <td>序号</td>
                            <td>书名</td>
                            <td>价格</td>
                        </tr>
                        {/* React模板中，使用数组的map方法进行列表渲染 */}
                        {this.state.books.map((el, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{el.name}</td>
                                    <td>{el.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default List;

// NumCtrl.jsx 组件传值

import React, { Component } from "react";
import "./NumCtrl.css";
class NumCtrl extends Component {
    // 组件构造函数的参数是一个对象，其中包含了组件标签中的属性，(也就是组件传值)
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <div className="NumCtrl-root">
                <button onClick={this.minusClick}>-</button>
                {/* 模板中通过this.props.xxx使用组件的传值数据 */}
                <span>{this.props.number}</span>
                <button onClick={this.addClick}>+</button>
            </div>
        );
    }
    addClick = () => {
        // React中数据的传递也是单项的，只能自上而下传递，子组件中不能修改父组件的数据(this.props)
        // 当子组件需要修改父组件数据时，必须从父组件接收一个方法，然后调用这个方法进行修改。
        this.props.numChange(this.props.number + 1);
    }
    minusClick = () => {
        this.props.numChange(this.props.number - 1);
    }
}
export default NumCtrl;

// Home.jsx ref属性

import React, { Component } from "react";
import "./Home.css";
import Com from "../components/Com.jsx"
import MyBtn from "../components/MyBtn.jsx"
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            max: 10
        }
        // 在react中使用ref需要在组件构造函数中事先创建。
        this.usernameInput = React.createRef();
        // react中的ref对象不能直接绑定列表渲染中的多个元素，需要手动创建ref数组进行绑定。
        this.list = [];
        for (let i = 0; i < this.state.max; i++) {
            this.list.push(React.createRef());
        }
        this.com1 = React.createRef();
        this.btn = React.createRef();
    }
    render() {
        return (
            <div>
                {/* 将需要在组件代码中访问的元素标签上写上ref属性，值设置为创建的ref对象 */}
                <input placeholder="请输入用户名" type="text" ref={this.usernameInput} />
                <ul>
                    {[...Array(10)].map((el, i) => {
                        return <li key={i} ref={this.list[i]}>index:{i}</li>
                    })}
                </ul>
                {/* 当ref属性写在组件标签上时，在代码中的ref对象.current会得到这个组件对象。这个组件必须是通过class声明的组件，不能是function组件，因为function组件没有实例(没有组件对象) */}
                <Com ref={this.com1}></Com>
                <MyBtn ref={this.btn} onClick={() => {
                    console.log("点击了")
                }}>
                    按钮标题
                </MyBtn>
            </div>
        );
    }
    componentDidMount() {
        // ref对象的current属性就是绑定的元素对象
        this.usernameInput.current.focus();
        console.log(this);
        console.log(this.com1);
        console.log(this.btn);
    }
}
export default Home;

// MyBtn.jsx  Fragment(片段)标签  React.forwardRef(可以传递ref的组件)方法

import React, { Component, Fragment } from "react";
import "./MyBtn.css";
class MyBtn extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            // Fragment标签可以作为组件的根标签，在页面渲染时Fragment标签不会渲染。
            <Fragment>
                <input type="text" />
                <div className="MyBth-root" onClick={e => {
                    this.props.onClick && this.props.onClick(e);
                }}>
                    {/* React组件的组件标签内容也通过props传递，在props.children中。类似vue的插槽 */}
                    {/* 如果组件标签内容是多个标签，那么children属性是一个数组，数组中是所有的标签 */}
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
    componentDidMount() {
        console.log(this);
    }
}
// React.forwardRef方法，创建一个可以传递ref的组件，参数是组件函数，组件函数和普通的函数组件相比，多了一个ref参数，用于设置需要向上传递的标签。
let MyBtn = React.forwardRef((props, ref) => {
    return (
        <Fragment>
            <input type="text" ref={ref} />
            <div className="MyBth-root" onClick={e => {
                props.onClick && props.onClick(e);
            }}>
                {props.children}
            </div>
        </Fragment>
    )
});
export default MyBtn;

// Home.jsx  高阶组件

import React, { Component } from "react";
import "./Home.css";
// 用户行为分析：统计用户使用APP的习惯，使用各个页面和功能的频次和时间等，从而分析出用户的喜好，提升APP的用户体验。
// 组件化开发，最大的优势是html模板的重用，页面中某段相同或类似的html可以写成一个组件，从而实现html的复用。
// 组件的样式，可以通过全局css实现复用。
// 组件逻辑的复用，在vue中通过mixins混入实现，而在react中，通过高阶组件实现(HOC:high order component)。
// 高阶组件的本质不是组件，而是一个函数，这个函数通过参数接收一个组件a，然后内部再创建一个组件b，组件b的模板中包裹组件a，然后在组件b中进行功能扩充，最终返回b组件。这样就实现了对组件a的扩展。把组件需要复用的逻辑写在组件b中，这样这个高阶组件函数就能对任意组件进行扩充。
import withUserBehavior from "../HOC/withUserBehavior.jsx";
import withSecondHOC from "../HOC/withSecondHOC.jsx";
class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>首页</h1>
            </div>
        );
    }
    // react路由没有类似vue的keep-alive功能。
    componentDidMount() {
        // this.startTime = Date.now();
        console.log("用户进入了首页");
        console.log("Home组件自己的mounted");
        console.log(this);
    }
    componentWillUnmount() {
        // let time = Math.floor((Date.now() - this.startTime)/1000)
        // console.log(`用户离开了首页，一共停留了${time}秒`);
    }
}
// 如果要用高阶组件扩充某个组件，只需要在这个组件导出之前，进行高阶组件函数调用，然后把得到的新组件赋值给原组件变量名即可
Home = withUserBehavior(Home, "首页");
Home = withSecondHOC(Home);
export default Home;

// withUserBehavior高阶组件

import React, { Component } from "react";
// 高阶组件名字命名一般以with开头，后面跟扩充的名字，且传入的组件参数命名为wrappedComponent
// 如果复用的逻辑中，有不同的代码或数据，则可以通过为高阶组件函数传参的形式实现不同的功能。
function withUserBehavior(WrappedComponent, page) {
    // 高阶组件函数中可以直接返回一个匿名类。
    return class extends Component {
        render() {
            return (
                // 高阶组件的模板中包裹传入的参数组件时，必须通过展开运算符把组件接收到的所有传值(props)都能继续向下传递，否则原始组件会接收不到传值
                <WrappedComponent {...this.props} />
            )
        }
        // 在高阶组件中进行逻辑扩展
        componentDidMount() {
            this.startTime = Date.now();
            console.log("用户行为统计高阶组件mount");
            console.log(`用户进入了${page}`);
            console.log(this);
        }
        componentWillUnmount() {
            let time = Math.floor((Date.now() - this.startTime) / 1000);
            console.log(`用户离开了${page}，一共停留了${time}秒`)
        }
    }
}
export default withUserBehavior;

// withSecondHOC高阶组件

import React, { Component } from "react";
function withSecondHOC(WrappedComponent) {
    return class extends Component {
        render() {
            return <WrappedComponent {...this.props} />
        }
        componentDidMount() {
            console.log("second高阶组件");
        }
    }
}
export default withSecondHOC;

// Friend.jsx 使用store 状态管理

import React, { Component } from "react";
import "./Friend.css";
// 在react组件中使用store中的数据，要先从react-redux中导入connect函数。
import { connect } from "react-redux";
import { numIncrease, numDecrease, setText, userSetName, setList, queryData } from "../state/actions.js"
class Friend extends Component {
    render() {
        return (
            <div>
                <p>
                    <button onClick={this.props.decrease}>-</button>
                    <span>{this.props.num}</span>
                    <button onClick={this.props.increase}>+</button>
                </p>
                <div>
                    <input
                        type="text"
                        value={this.props.text}
                        onChange={e => {
                            this.props.setText(e.target.value)
                        }}
                    />
                </div>
                <p>{this.props.text}</p>
                <p>id:{this.props.user.id}</p>
                <input
                    type="text"
                    value={this.props.user.name}
                    onChange={e => {
                        this.props.userSetName(e.target.value)
                    }} />
                <p>name:{this.props.user.name}</p>
                <p>age:{this.props.user.age}</p>

                <p>{this.props.list.join(",")}</p>
                <button onClick={this.props.setList}>向数组中添加一个0-10的随机数</button>
                <p>{JSON.stringify(this.props.data)}</p>
            </div>
        );
    }
    componentDidMount() {
        console.log(this);
    }
}
// 实现mapStateToProps函数，参数是store中的state对象，返回的对象中声明需要从store中map的数据，
function mapStateToProps(state) {
    return {
        num: state.num,
        text: state.text,
        user: state.user,
        list: state.list,
        data: state.data
    }
}
// 实现mapActionToProps函数，第一个参数是dispath函数，第二个参数是本组件自己的props。函数需要返回一个对象，对象中声明修改数据的方法，在方法中通过dispatch提交actions对象，而actions对象通过导入的action函数创建。
function mapActionToProps(dispatch, ownProps) {
    return {
        increase() {
            dispatch(numIncrease());
        },
        decrease() {
            dispatch(numDecrease());
        },
        setText(v) {
            dispatch(setText(v));
        },
        userSetName(v) {
            dispatch(userSetName(v));
        },
        setList() {
            dispatch(setList());
        },
        queryData() {
            // 如果是异步action，map的函数需要将dispatch调用的结果返回。
            return dispatch(queryData());
        }
    }
}
// connect函数，第一个参数是mapState函数(负责声明从仓库中map哪些数据)，第二个参数是mapAction函数(负责声明使用哪些修改方法)。返回值是一个高阶组件，这个高阶组件负责从仓库中提取本组件需要的数据，并通过props传递给本组件。
Friend = connect(mapStateToProps, mapActionToProps)(Friend);
export default Friend;

// store.js

import { createStore } from "redux"
import reducer from "./reduce.js";
// createStore用于创建仓库对象，参数是reducer。
const store = createStore(reducer);
export default store;

// actions.js

import axios from "axios";
// action的本质是一个对象，每次修改仓库中的数据都需要提交一个action对象。
// 在actions.js文件中，需要写所有的actions的生成函数，每次需要提交action时，都用actions生成函数创建一个action并提交。
function numIncrease() {
    return {
        type: "NUM_INCREASE"
    }
}
function numDecrease() {
    return {
        type: "NUM_DECREASE"
    }
}
function setText(v) {
    return {
        type: "SET_TEXT",
        value: v,
    }
}
function userSetName(v) {
    return {
        type: "USER_SET_NAME",
        value: v
    }
}
function setList(v) {
    return {
        type: "SET_LIST",
        value: v
    }
}
function setData(v) {
    return {
        type: "SET_DATA",
        value: v
    }
}
// 对于状态的同步修改，action函数中直接返回action对象，而异步状态修改，则需要在action函数中至此那个异步任务(发请求)，在异步任务完成之后，再次提交同步修改action进行数据修改。
function queryData() {
    // 异步修改的action需要返回一个函数
    // 函数接收一个dispath参数，用于提交同步修改action
    return function (dispatch) {
        return axios.get("/data.json")
            .then(res => {
                // 当异步任务完成之后，通过dispath把数据存储到store中
                dispatch(setData(res.data));
                return Promise.resolve(res);
            })
    }
}
// 最终导出所有的action函数
export {
    numIncrease,
    numDecrease,
    setText,
    userSetName,
    setList,
    queryData
}

// reduce.js

import { combineReducers } from "redux";
// 在redux状态管理中，通过reducer为store添加状态(数据)，每一个数据都是一个函数，函数名字就是数据名字，reducer函数接收两个参数，第一个参数是这个数据的当前值，第二个参数是修改数据时提交的action对象。函数需要返回数据修改之后的值。
// reducer函数，当redux启动时会立刻调用一次，首次调用state和action参数都为空，所以函数中的switch代码必然执行default语句。所以可以使用ES6的参数默认值为这个reducer的初始值。
// 首次调用之后，store中每次提交action都会再次调用reducer函数，其中state参数是上次reducer的返回值，action参数是本次提交的action对象。
function num(state = 100, action) {
    switch (action.type) {
        case "NUM_INCREASE":
            return state + 1;

        case "NUM_DECREASE":
            return state - 1;

        default:
            return state;
    }
}
function text(state = "hello", action) {
    switch (action.type) {
        case "SET_TEXT":
            return action.value;

        default:
            return state;
    }
}
function user(state = {
    id: "123",
    name: "张三",
    age: 12
}, action) {
    switch (action.type) {
        case "USER_SET_NAME":
            // 对于store中的引用类型数据，不能直接进行修改，而是拷贝一份副本进行修改，然后返回副本，这样store中的数据就是可追溯可还原的。
            // 不能这样写
            // state.name = action.value;
            // 第一种方法
            // return Object.assign({},state,{name:action.value});
            // 第二种方法
            return {
                ...state,
                name: action.value
            }
        default:
            return state;
    }
}
function list(state = [1, 2, 3], action) {
    let num = Math.floor(Math.random() * 11);
    switch (action.type) {
        case "SET_LIST":
            // 第一种方法
            // let temp = state.slice();
            // temp.push(num);
            // return temp;
            // 第二种方法
            return [...state, num]
        default:
            return state;
    }
}
function data(state = null, action) {
    switch (action.type) {
        case "SET_DATA":
            return action.value;

        default:
            return state;
    }
}
// 最终把所有的数据reducer通过combineReducers方法合并为一个reducer
const reducer = combineReducers({
    num,
    text,
    user,
    list,
    data
});
// 导出
export default reducer;

// react组件库

// 首先下载antd模块 ，然后在package.json 中更改
packageJson = {
    "scripts": {
        "start": "react-app-rewired start",
        "build": "react-app-rewired build",
        "test": "react-app-rewired test",
        "eject": "react-scripts eject"
    }
}
// config-overrides.js配置对象
const { override, fixBabelImports } = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
);
// 然后就可以在模板中直接导入组件
import { Button } from 'antd';
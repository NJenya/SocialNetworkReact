# React

## Компонента

**Компонента** - это функция, которая возвращает JSX разметку. Т.е HTML внутри JS.
Компоненту никогда не вызывают, Компонента - это ТЕГ.



## SPA

**SPA** - <u>Single page application</u> (**Всё происходит в одном HTML файле, который приходит пользователю**)



![1562585643793](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1562585643793.png)

## Пропсы

**Пропсы** - произвольные данные(объекты), которые задаются в виде атрибута ТЕГА(компоненты) и хранятся в объекте под видом Ключ : Значение (например

```javascript
<Welcome name="Dima" />
```

имеет вид находясь в объекте, который в свою очередь является параметром функции:

```javascript
props {
  name : "Dima"
}
```

## Модуль **react-router-dom** 

позволяет использовать **route** (изначально всё нужно обвернуть в один блок под названием **BrowserRouter**. Он позволяет отрисовывать компоненты, отслеживания их url (
    ```react
    <Route path='/profile' component={Profile} />
    ```
​    ). 
Чтобы задать изменение url нужно использовать тег **NavLink** (

~~~javascript
```react
<NavLink to="/profile">
    Profile
</NavLink>
```
~~~

​    )

**BLL (Business Logic Layer) - REDUX**
**UI (User Interface) - REACT**

## Метод для массива MAP

Пример использования:
**Объявляем массив с объектами, содержащими ключ и значение**

```javascript
let messagesData = [
    {id: 1, message: 'Hello'},
    {id: 2, message: 'Privet'},
    {id: 3, message: 'Aloha'},
];
```

Создаём новый массив и делаем его равным массиву **messagesData** с методом **map**. Параметром будет являться каждый объект массива **messagesData**. Назовём его просто - **d**.

```javascript
let dialogsElement = dialogsData
    .map(d => <DialogItem name={d.name} id={d.id} />);
```



# onClick, ref, VirtualDOM



### OnClick

Атрибут **OnClick** к тегу звучит как "Действие по клику"

```jsx
<button *onClick*={addPost}>Отправить</button>
```

Значением этого атрибута может служить анонимная функция, либо же **CallBack** функция.

### CallBack

**CallBack** функция - это функция обратного вызова. Т.е функция, которая вызывается другой функцией.

Например. Создали функцию:

```js
`let addPost = () => { ` `

`alert(text);`

`}`
```

Мы можем вызвать её стандартным способом addPost(). Либо же передать её внутрь другой функции

```jsx
<button *onClick*={addPost}>Отправить</button>
```

***БЕЗ СКОБОК!!!***

### ref

```jsx
<textarea *ref*={newPostElement}></textarea>
```

**ref** - это ссылка. Это тоже самое, что присвоить элементу id или класс.

Команда ниже аналогична команде 

```javascript
let newPostElement = document.getElementById('id')
```

```javascript
let newPostElement = React.createRef();
```

Но с помощью инструментов **React**. Это нужно потому, что нельзя обращаться напрямую к **DOM**. 

Взаимодействовать с ссылками можно таким образом:

```javascript
let text = newPostElement.current.value;
```

### VirtualDOM

**React** работает с **VirtualDOM**. Он подгружает компоненты <u>постепенно</u> в **DOM**, а поэтому *мы не можем знать существует ли данный элемент, к которому мы обращаемся, в DOM.*





## ReRender

![1562938967001](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1562938967001.png)

**Файл render.js:**

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {addPost} from './redux/state';
import {BrowserRouter} from 'react-router-dom';

export let reRenderEntireTree = (state) => {
  ReactDOM.render(
    <BrowserRouter>
      <App state={state} addPost={addPost} />
    </BrowserRouter>, document.getElementById('root'));
}
```

**Файл state.js:**

```javascript
import {reRenderEntireTree} from "../render";

let state = {...}

export let addPost = (postMessage) => {
  let newPost = {
    id: 3,
    message: postMessage,
  };
  state.profile.postsData.push(newPost);
  reRenderEntireTree(state);
}

export default state;
```

**Файл index.js:**

```javascript
import './index.css';
import * as serviceWorker from './serviceWorker';
import {reRenderEntireTree} from "./render";
import state from './redux/state';



reRenderEntireTree(state);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```

## FLUX Концепция/Архитектура

![1562940934753](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1562940934753.png)

**Концепция звучит так:** *Изменения в UI мире должны происходить только тогда, когда произойдут изменения в BLL мире*

P.S, 

**Action** - *действия/изменения,* 

**state inside props** - *новые данные stat'a передаваемые в UI с помощью пропсов*



**Инкапсулировать детали** - скрыть детали/скрыть логику

## Store

Псевдо ООП

```javascript
import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import friendsReducer from "./friends-reducer";
let store = {
  _state: {
    profile: {
      postsData: [
        { id: 1, message: 'Hi, how are you' },
        { id: 2, message: 'Its my first post' }
      ],
      newPostText : ''
    },
    messages: {
      dialogsData: [
        { id: 1, name: 'Dima' },
        { id: 2, name: 'Julia' },
        { id: 3, name: 'Victor' },
        { id: 4, name: 'Sasha' }
      ],
      messagesData: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'Privet' },
        { id: 3, message: 'Aloha' }
      ],
      newMessageText : ''
    },
    friends: {
      friendsData: [
        { id: 1, name: 'Dima' },
        { id: 2, name: 'Julia' },
        { id: 3, name: 'Victor' }
      ]
    }
  },
  _callSubscriber() {
    console.log("state changed")
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) { //action === actionCreator (EX. addPostActionCreator)

    this._state.profile = profileReducer(this._state.profile, action);
    this._state.messages = messagesReducer(this._state.messages, action);
    this._state.friends = friendsReducer(this._state.friends, action);

    this._callSubscriber(this._state);
  }
}

export default store;

window.store = store;
```

## Перерисовка

Файл index.js

```javascript
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
let reRenderEntireTree = (state) => {
  ReactDOM.render(
    <BrowserRouter>
      <App state={state} dispatch={store.dispatch.bind(store)} store={store}/>
    </BrowserRouter>, document.getElementById('root'));
}

reRenderEntireTree(store.getState());
store.subscribe(() => {
  let state = store.getState();
  reRenderEntireTree(state);
});
```

**reRenderEntireTree** - Функция, которая рисует ui с помощью ReactDOM.render.

В этом же файле мы её вызываем, чтобы при первом запуске страницы увидеть ui

```javascript
reRenderEntireTree(store.getState());
```

**НО**, UI должен перерисовываться каждый раз, когда он изменяется. Для этого мы обращаемся к функции **subscribe** через **store**. И передаём ей в качестве параметра **reRenderEntireTree** со state в параметре.

```javascript
store.subscribe(() => {
  let state = store.getState();
  reRenderEntireTree(state);
});
```

Функция **subscribe** имеет параметр observer, который по выполнению функции должен стать равным другой пустой функции **callSubscriber** которая в свою очередь уже не становится пустой.

```javascript
subscribe(observer) {
    this._callSubscriber = observer;
  },
```

Было:

```javascript
_callSubscriber() {
    console.log("state changed")
  }
```

Стало:

```javascript
_callSubscriber() {
    let state = store.getState();
  	reRenderEntireTree(state);
  }
```

Как только (например по нажатию кнопки) в dispatch приходит action происходит вызов callSubscriber (отсюда и название функции)

```javascript
dispatch(action) { //action === actionCreator (EX. addPostActionCreator)

    this._state.profile = profileReducer(this._state.profile, action);
    this._state.messages = messagesReducer(this._state.messages, action);
    this._state.friends = friendsReducer(this._state.friends, action);

    this._callSubscriber(this._state);
  }
```

Происходит перерисовка UI.

# Bind()

Метод **bind()** создаёт новую функцию, которая при вызове устанавливает в качестве контекста выполнения `this` предоставленное значение.

Для чего он нужен? Например, если у нас есть функция 

```javascript
_addPost() {

​    let newPost = {

​      id: 3,

​      message: this._state.profile.newPostText,

​    };

​    this._state.profile.postsData.push(newPost);

​    this._state.profile.newPostText ='';

​    this._callSubscriber(this._state);

  },
```

И мы передаём её в пропсы как callback

```javascript
addPost={store.addPost}
```

То при использовании(вызове) мы будем обращаться к ней от имени(внутри объекта) **props**

```javascript
props.addPost()
```

В этом случае все **this** будут обращаться именно к **props**. *Ближайшему родительскому объекту*, а не к **_state**,  как это было задумано. Что вызывает ошибку.

#### В этой то ситуации мы и используем bind(Объект на который мы хотим сослаться)

```javascript
addPost={store.addPost.bind(store)
```



## Dispatch, Action, ActionCreator, Reducer

**dispatch** - это метод(функция), который передаёт action(действие) в reducer.

```javascript
dispatch(sendMessageActionCreator());
```

**Action**  - это объект, который содержит минимум **type**

**ActionCreator** - это функция, которая создаёт **Action**.

```javascript
export let addPostActionCreator = () => ({type: ADD_POST});
export let updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT, 
  newText: text});
```

Также **ActionCreator** может создавать(возвращать) другие данные.

**Reducer**  - в свою очередь же, это функция, которая принимает **state** и **action**

```javascript
const profileReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_POST:
      let newPost = {
        id: 3,
        message: state.newPostText
      };
      state.postsData.push(newPost);
      state.newPostText ='';
      break;
    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.newText; 
      break;
    default:
      return state;
  }
  return state;
}
```

Reducer преобразовывает state и возвращает его обратно. Либо возвращает прежний state, если условия не удовлетворились. Reducer проверяет action.type (созданный функцией actionCreator) на соответствие и выполняет логику.

В reducer **ДОЛЖЕН** передаваться инициализационный state. Иначе функция вернёт undefinned.

```javascript
let initialState = {
  postsData: [
    { id: 1, message: 'Hi, how are you' },
    { id: 2, message: 'Its my first post' }
  ],
  newPostText : ''
};
```

Логика такова:

![1564063093206](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1564063093206.png)

## Redux

```javascript
let store = createStore(reducers);
```

**createStore** - это функция, которая принимает в качестве параметра **reducer** и создаёт **store**

Либо комплект редьюсоров

```javascript
let reducers = combineReducers({
    profile : profileReducer,
    messages : messagesReducer,
    friends : friendsReducer
});
```

Функция **combineReducers** принимает в качестве параметра объект **state** : **reducer**. *State* в данном случае будет служить родительским объектом **initialState**. Другими словами **initialState** - это **state**, который мы указывает в виде ключа в **combineReducers**. Каждый *reducer* будет работать с отдельными *state*. **profileReducer** будет изменять **profile**, **messagesReducer** - **messages** и т.д. 

Как это было в самописном store:

```javascript
this._state.profile = profileReducer(this._state.profile, action);
this._state.messages = messagesReducer(this._state.messages, action);
this._state.friends = friendsReducer(this._state.friends, action);
```

Как это в Redux:

```javascript
let reducers = combineReducers({
    profile : profileReducer,
    messages : messagesReducer,
    friends : friendsReducer
});
```

## Container Component

Мы используем Контейнерную компоненту, чтобы презентационная компонента не имела связи со Store. Все данные из store будут приходить сначала в оболочку - контейнерную компоненту. Далее эта компонента отрисовывает презентационную компоненту и передаёт ей все данные через props.

**Container Component**

```javascript
import React from 'react';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/messages-reducer';
import Dialogs from './Dialogs';


const DialogsContainer = (props) => {

  let state = props.store.getState();

  let sendMessage = () => {
    props.store.dispatch(sendMessageActionCreator());
  }

  let onMessageChange = (text) => {
    props.store.dispatch(updateNewMessageTextActionCreator(text));
  }
  
  return (
    <Dialogs 
      sendMessage={sendMessage}
      onMessageChange={onMessageChange}
      dialogsData={state.messages.dialogsData}
      messagesData={state.messages.messagesData}
      newMessageText={state.messages.newMessageText}
    />
  );
}

export default DialogsContainer;
```

Component (Presentation)

```javascript
import React from 'react';
import s from './Dialogs.module.scss';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
  let dialogsElement = props.dialogsData
    .map(d => <DialogItem name={d.name} id={d.id} />);

  let messagesElement = props.messagesData
    .map(m => <Message message={m.message} id={m.id} />);

  let newMessageElement = React.createRef();

  let onSendMessage = () => {
    props.sendMessage();
  }

  let onMessageChange = () => {
    let text = newMessageElement.current.value;
    props.onMessageChange(text);  
  }
  
  return (
    <div className={s.dialogs}>
      <div className={s.dialogs_items}>
        {dialogsElement}
      </div>
      <div className={s.messages}>
        {messagesElement}
        <div className={s.inputArea}>
          <textarea
            onChange={onMessageChange} 
            ref={newMessageElement} 
            value={props.newMessageText}
            placeholder="Введите сообщение"
          />
          <button onClick={onSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Dialogs;
```
## REACT-REDAX

React-redax это библиотека, позволяющая react работать с redax инкапсулируя все детали.

*Давайте вспомним как мы жили раньше, до этой библиотеки.*

**Context API**

Как это было раньше. Мы использовали функцию reRenderEntireTree. Вызывали её в index.js во время старта и также передавали её как callback subscribe'у если требовалось отрисовать дерево заново, если изменялся state. 

**Index.js**

```javascript
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from './StoreContext';
let reRenderEntireTree = (state) => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App state={store.getState()}  />
      </Provider>
    </BrowserRouter>, document.getElementById('root'));
}

reRenderEntireTree(store.getState());
store.subscribe(() => {
  let state = store.getState();
  reRenderEntireTree(state);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```

Также мы использовали файл StoreContext для работы с ContextAPI. Мы создавали собственную компоненту Provider внутрь которой передавали store через value с помощью ContextAPI.

И использовали компоненту Provider внутри index.js

Это позволяло давать доступ контейнерным компонентам к store без необходимости прокидывать его через props.

**StoreContext.js**

```javascript
import React from 'react';

const StoreContext = React.createContext(null);

export const Provider = (props) => {
  return (
    <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default StoreContext;
```

**ContainerComponent**

При создании контейнерной компоненты нам приходилось возвращать разметку внутри StoreContext.Consumer'a. Там же нам приходилось получать state через getState() и dispatch'и. Чтобы всё это передать в презентационную компоненту через пропсы.

**DialogsContainer.js**

```javascript
import React from 'react';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/messages-reducer';
import Dialogs from './Dialogs';
import StoreContext from '../../StoreContext';


const DialogsContainer = (props) => {
  return (
    <StoreContext.Consumer > 
    {
      (store) => {
        let state = store.getState();

        let sendMessage = () => {
          store.dispatch(sendMessageActionCreator());
        }

        let onMessageChange = (text) => {
          store.dispatch(updateNewMessageTextActionCreator(text));
        }
        return (
          <Dialogs
            sendMessage={sendMessage}
            onMessageChange={onMessageChange}
            dialogsData={state.messages.dialogsData}
            messagesData={state.messages.messagesData}
            newMessageText={state.messages.newMessageText}
          />
        )
      }
    }
    </StoreContext.Consumer>
  );
}

export default DialogsContainer;
```

**Давайте же взглянем, как проста стала жизнь!**

**ContextAPI**

1) Удаляем файл StoreContext.js. Он нам больше не нужен.

2)  Удаляем функцию reRenderEntireTree в index.js! Она нам также больше не нужна.

3) Компоненту Provider оставляем, но импортируем её уже не через StoreContext, а через react-redax.

```javascript
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```

**ContainerComponent**

Создание контейнерным компонент ещё не было настолько простым!

1) const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

Одна строчка и компонента создана. 

Функция connect, импортированная из react-redax, что она делает?

Во-первых, как мы помним, мы удалили функцию reRenderEntireTree для перерисовки и отрисовки дерева. Connect делает всё это сам. **И делает намного лучше!** Он не перерисовывает всё дерево при изменении в одной компоненте, он перерисовывает **только эту компоненту**. 

Во-вторых, она обеспечивает самый простой способ передачи state и dispatch в презентационную компоненту.

**Connect вызывается дважды**. В первый раз она вызывается принимая в качестве параметров две функции **mapStateToProps** и **mapDispatchToProps**. Их названия говорят за них сами. 

**mapStateToProps** принимает **state** и возвращает объект ключ-значение в ЗНАЧЕНИИ атрибут-данные.

Проще показать на примере:

Это

```html
<Users users={state.users.usersData} />
```

Равно этому

```javascript
let mapStateToProps = (state) => {
    return {
        usersData: state.users.usersData
    }
}
```

Тоже самое с dispath

**mapDispatchToProps** принимает dispatch на вход

Это 

```html
let follow = (userId) => {
	store.dispatch(followAC(userId));
}

 <Dialogs follow={follow} />
```

Равно этому 

```javascript
let mapDispatchToProps = (dispatch) => {
	return {
		follow: (userId) => {
			dispatch(followAC(userId));
	},
}
```

Как работает двойной вызов?

```javascript
Connect(result=a+b)(result=props.result)
```

Первый раз функция считает логику в первых скобках, далее результат этих скобок он передаёт во вторые. Второй раз функция выполниться только после выполнения первого раза, и возьмёт на вход результат первого выполнения.

Тоже самое происходит здесь:

```javascript
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
```

Выполняются функции mapStateToProps и mapDispatchToProps. Они возвращают объекты с  данными и функциями. Далее эти функции переходят на вход Users в виде props. Компоненте, которая как мы уже знаем также является функцией.

**UsersContainer.jsx**

```javascript
import { connect } from 'react-redux';
import Users from './Users';
import { followAC, unFollowAC, setUsersAC } from '../../redux/users-reducer';

let mapStateToProps = (state) => {
    return {
        usersData: state.users.usersData
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unFollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
```

# 

# deep copy vs shallow copy

Пойми одно, это БАЗА. База, которую ты должен знать.

Создадим объект а

```javascript
let a = {
      name: 'TextA',
      protocol: 'https',
      maxStudents: 10,
      isOnline: true,
      students: ['ivan', 'dima', 'julia', 'andrey'],
      classrom: {
        teacher: {
          name: 'oleg',
          age: 18
        }
      }
    }
```

создание объекта с помощью синтаксиса 

```
={}
```

называется созданием объекта с помощью литерала объекта.

Давайте разберёмся в том, как устроен объект.

```javascript
name: 'TextA',
protocol: 'https',
maxStudents: 10,
isOnline: true,
```

Данные, хранящие текст(символы), числа, булевые значения, null, undefinned называются примитивами.

```javascript
students: ['ivan', 'dima', 'julia', 'andrey'],
```

Ключ, значением которого является массив  - на самом деле это ссылка на массив. Массив же, кстати, также является объектом.

Это же касается вложенных объектов типа 

```javascript
classrom: {
        teacher: {
          name: 'oleg',
          age: 18
        }
      }
```

Ключ classrom является ссылкой на teacher. teacher же является ссылкой на объект, в котором хранятся примитивы name и age.

Почему я называю их ссылками? Всё очень просто. Все объекты, как бы хранящиеся внутри другого объекта на самом деле лежат независимо друг от друга. Они принадлежат разным секторам памяти. Именно поэтому, мы можем использовать их ссылаясь на них.

Всё очень наглядно можно показать на примере.

*Мы захотели создать переменную b и приравнять её к объекту a.* 

```javascript
let b = a;
```

Казалось бы, всё готово. И в консоль выводит всё верно.

![1564214889509](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1564214889509.png)

Два одинаковых массива.

Но **НЕТ**. Давайте попробуем изменить name в объекте b и вывести в консоль оба объекта. a и b.

```javascript
b.name = 'TextB'
```

![1564215021643](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1564215021643.png)

Как можете видеть, name изменилось и в объекте a.

Всё дело в том, что если мы "копируем" объект таким образом let b = a; То b становится равными ссылке, на которую ссылается a. А именно на объект 

```javascript
{
      name: 'TextA',
      protocol: 'https',
      maxStudents: 10,
      isOnline: true,
      students: ['ivan', 'dima', 'julia', 'andrey'],
      classrom: {
        teacher: {
          name: 'oleg',
          age: 18
        }
      }
    }
```

Есть способ копирования объекта

```javascript
let b = {...a}
```

Он называется поверхностным. И вот почему...

Попробуем опять изменить name в объекте b и выведем консоль

```javascript
b.name = 'TextB'
```

![1564215283657](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1564215283657.png)

Ура! Теперь это на первый взгляд два разных объекта. Но давайте добавим Sema в массив students объекта b. И выведем это

```javascript
b.students.push('Sema')
```

![1564215428311](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1564215428311.png)

Опять всё идёт не по плану. Изменились оба массива.

Как говорилось ранее students  - это ссылка на массив. Поверхностное копирование копирует и создаёт новый объект только со значениями первого уровня (первой вложенности). Students же уже вторая.

Её также можно скопировать, но для этого нужно также прописать

```javascript
b.students = [...a.students]
```

Это можно делать до бесконечной вложенности.

**ВАЖНО**

**Два объекта НИКОГДА не будут равны, даже если значения внутри них полностью совпадают.**

**При сравнении примитивов a.name === b.name будут сравниваться именно их значения**

**При сравнении двух ссылок, (без копирования, просто let b = a). Ссылки будут равны, ибо они ссылаются на один и тот же объект.**

**При сравнении примитивов внутри ссылок a.classrom.teacher.name === bclassrom.teacher.name будут сравниваться значения примитивов.**

## Axios, jQuery Ajax

**jQuery**

Что такое промис? Помню себя, понять не мог ничего. Смотрел уроки... Обещание, это обещание говорили они. Я не понимал НИХЕРА. Что за обещание. Мы о чём. Но вот настал момент когда и я понял что это такое.

Давайте по бумажке, promise  - это обещание, которое даёт dal - ui, что возьмёт с сервера данные, взяв их оттуда, он передаёт их в виде того обещания, что он дал ранее. 

![1564427302517](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1564427302517.png)

```javascript
const resultBlock = document.querySelector('#result');

const clickMeButton = document.querySelector('#click-me');

const pageNumberEl = document.querySelector('#page-number');

clickMeButton.addEventListener('click', () => {
  const promise = getImagesOld();
  promise
    .then((promise) => console.log(promise))
})

function getImagesOld() {
  const promise = $.ajax(`https://api.unsplash.com/photos/random/?client_id=818fcd1d1047300379afae3e5c33cb9cd88b68d7d81253632ba4e09a331246a5&count=30`)
  return promise;
}

const successGet = (data) => {
  data.forEach(el => {
    const img = document.createElement('img');
    img.src = el.urls.thumb;
    document.querySelector('#result').appendChild(img)
  });
}
```

Синтаксис Ajax jQuery таков:

```javascript
$.ajax(url, {settings})
```

settings  имеют вид ключ-значение. Самое основное success. Как это звучит:

*Как только придёт УСПЕШНЫЙ ответ с сервера выполниться это...*

success'у можно передать callback функцию

```javascript
const promise = $.ajax(`https://api.unsplash.com/photos/random/?client_id=818fcd1d1047300379afae3e5c33cb9cd88b68d7d81253632ba4e09a331246a5&count=30`, {
	success: successFunction
})
```

Ах да, промисы, мы же про них говорим. Дело в том что строчка:

```javascript
$.ajax(`https://api.unsplash.com/photos/random/?client_id=818fcd1d1047300379afae3e5c33cb9cd88b68d7d81253632ba4e09a331246a5&count=30`)
```

Возвращает тот самый промис, это он и есть

```javascript
function getImagesOld() {
  const promise = $.ajax(`https://api.unsplash.com/photos/random/?client_id=818fcd1d1047300379afae3e5c33cb9cd88b68d7d81253632ba4e09a331246a5&count=30`)
  return promise;
}
```

## GET, POST, PUT, DELETE

**Query String Parameters** используются только для **GET** и **DELETE**

Query String Parameters - это параметры, которые передаются таким образом:

```http
https://website/api/tasks?taskId=123&title=text
```

То есть сначала идёт endpoint, затем ставится вопросительный знак(?) и передаются параметры:

хттпс://website/?параметр=значение

Если этих параметров несколько, то после каждого значения нужно ставить амперсант (&)

параметр=значение&параметр2=значение2

При использовании POST и PUT запросов нужно использовать тело запроса **request payload**

**axios**

```javascript
function postTasksAxios() {
  const promise = axios.post(APIkeyTasksPost, {
    widgetId : 85429,
    title : 'ZAKAZAKA'
  })
  return promise.then(response => response.data)
}
```

**fetch** 

```javascript
async function postTasksFetch () {
  const response = await fetch(APIkeyTasksPost + '&title=WorkOut', {method: 'POST'});
  const data = await response.json();
  return data;
}
```

## Class

[class extends React.Component](https://github.com/Dvachee/SocialNetworkReact/commit/8c264525183ab242eed19b8c017d62010e2addb9)

**Что такое класс? Что такое конструктор? Что это за слово такое new?**

Для начала давайте вспомним ООП. А именно контекст вызова **this**. Это слово говорит о том, с чьего имени будет вызываться свойство или метод в объекте. 

создадим функцию

```javascript
function Man2(name, age) {
  this.name = name;
  this.age = age;
}
```

На что указывает this внутри функции? Ни на что... Пока её не вызвать

```javascript
Man2('Dimon', 8)
```

Если просто вызвать данную функцию, то контекстом вызова вызова будет являться глобальный объект window

Это легко можно проверить в консоли браузера после вызова данной функции

![1565187371752](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1565187371752.png)

Т.е теперь наши name и age - это новые ключи объекта window, а их значения - это параметры функции Man2

Пришло время воспользоваться словом new

создадим переменную и приравняем её вызову функции Man2 напечатав изначально слово new

```javascript
let m3 = new Man2('Dima', 31);
```

![1565187623311](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1565187623311.png)

И мы видим что в консоль вывелся **ОБЪЕКТ** с **КЛАССОМ** Man2

В sources это выглядит так

![1565187882877](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1565187882877.png)

Если бы мы создали этот объект через литерал объекта, то мы бы увидели такую картину

![1565187791164](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1565187791164.png)

А в sources было бы написано object

![1565187836760](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1565187836760.png)

Используя слово new можно создавать неограниченное количество **ЭКЗЕМПЛЯРОВ** класса **Man2**

Прошу заметить что в данном случае контекстом вызова является переменная к которой мы приравниваем функцию с помощью **new**

#### Классы в *JavaScript* были введены в ECMAScript 2015

Давайте проделаем аналогичные действия с помощью классов

```javascript
class Man2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
```

Первое что мы видим что мы видим это то, что в роли нашей функции Man2 играет встроенный метод constructor. Теперь мы знаем как это называется, конструктор. Мы собирали конструктор. 

Man2 же ушло немного выше и говорит само за себя, теперь это class.

Ниже конструктора нужно писать все свои методы для работы с данными, которые мы ввели в конструктор

Вот пример кода

```javascript
class Man {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.people = [
      {name: 'Dima', age: 18},
      {name: 'Julia', age: 19}
    ];
    this.Manelement = this.people.map(m => {
      const man = document.createElement('li');
      man.innerHTML = m.name;
      document.querySelector('#resultTask').appendChild(man)
    })
  }

  render() {
    return this.Manelement
  }
}
```

Мы создали метод render который возвращает Manelement

Чтобы начать им пользоваться, нужно проделать все те же шаги

```javascript
let m1 = new Man('Dima', 31)
```

Теперь от имени m1 можно вызвать метод render

```javascript
m1.render();
```

Вот и всё.

Для чего нам нужны классы в React'е? А для того, чтобы сохранять чистоту функциональных компонент. Чистая функциональная компонента должна только принимать данные и возвращать ИХ ЖЕ. Она не должна делать запросы на сервер, не должна делать ничего кроме как возвращать **JSX разметку**

В этом нам и помогает классовая компонента

## withRouter

Давайте попробуем разобраться с функцией withRouter, понять как она работает и для чего.

Сначала в коде:

UserItem.jsx

```javascript
import React from 'react';
import s from './../Users.module.scss';
import userPhoto from '../../../assets/images/768px-Circle-icons-profile.svg.png';
import { NavLink } from 'react-router-dom';

const UserItem = (props) => {

  let follow = () => {
    props.follow(props.id);
  }

  let unfollow = () => {
    props.unfollow(props.id);
  }
  return (
    <NavLink to={'/profile/' + props.id}>
    <div className={s.userItem}>
        <div className={s.userAva}>
          <img src={props.photos.small !== null ? props.photos.small : userPhoto} alt="ava" />
          {props.followed ?
            <button onClick={unfollow}>Unfollow</button>
            :
            <button onClick={follow}>Follow</button>}
        </div>

        <div className={s.userInfo}>
          <h3> {props.fullName} </h3>
          <p className={s.status}> {props.status} </p>
        </div>
    </div>
    </NavLink>
  );
}

export default UserItem;
```

Мы обернули каждого пользователя на странице Users в тег NavLink, указав путь 

```javascript
to={'/profile/' + props.id}
```

Мы кликаем на этого пользователя. Далее в файле App.js Route отслеживает изменение url адреса по пути /profile и отрисовывает компоненту ProfileContainer

```javascript
import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import {Route} from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';

const App = (props) => {
  return (
      <div className='app-wrapper'>
        <Header />
        <Nav />

        <div className='app-wrapper-content'>

          <Route path='/profile' render={ () => <ProfileContainer />} />
          <Route path='/dialogs' render={ () => <DialogsContainer />} />
          <Route path='/users' render={ () => <UsersContainer /> } />

        </div>
      </div>
  );
}

export default App;

```

Идём внутрь ProfileContainer

```javascript
import React from 'react';
import Profile from './Profile';
import Axios from 'axios';
import {connect} from 'react-redux';
import {setUserProfile} from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';


class ProfileContainer extends React.Component {
  componentDidMount() {
    Axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
      .then(response => {
        this.props.setUserProfile(response.data);
      })
  }

  render() {
    return (
      <Profile {...this.props}
      profileData={this.props.profileData}
      />
    );  
  }
}

const mapStateToProps = (state) => {
  return {
    profileData: state.profile.profileData
  }
};

const mapDispatchToProps = {
  setUserProfile
}

let withRouterProfileContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(withRouterProfileContainer);
```

Давайте вспомним для чего нужна функция connect. Она принимает в качестве параметров данные из state и action creator, чтобы задиспатчить их в reducer. Осуществляет она это с помощью функций, которые возвращают объект, либо же в случае с dispatch можно использовать готовый объект созданный с помощью литерала объекта. Ибо connect может сам dispatch-ить данные.

В компоненту данные и actioncreators приходят в виде props

connect на выходе выбрасывает новую компоненту

**Ну так вот**. 

Функция withRouter очень похожа на connect. Отличие в том, что connect имеет связь со store, а withRouter имеет связь с url данными.

withRouter принимает в качестве только компоненту, и выбрасывает новую.

Но передаёт в неё свои данные. **ТАКЖЕ С ПОМОЩЬЮ props**

**Ну так вот X2**

Попав в данный файл мы видим что здесь задана классовая компонента, **НО** она не экспортируется. Т.е по сути вызывать будут не её. 

Для начала создадим над ней контейнерную компоненту для работы с Router. Назовём её withRouterProfileContainer

```javascript
let withRouterProfileContainer = withRouter(ProfileContainer);
```

А далее, используя функцию connect, обернём withRouterProfileContainer в ещё одну компоненту

```javascript
export default connect(mapStateToProps, mapDispatchToProps)(withRouterProfileContainer);
```

И вот её то уже и экспортируем по default.

И именно она вызовется в App.js. Давайте взглянем на наши пропсы теперь

![1565517952176](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1565517952176.png)

Теперь помимо profileData и setUserProfile к нам приходит множество новых данных. Но самое главное находится в match.

- isExact говорит о точном совпадении адреса указанном в Route и адреса, который прописан в данный момент. False потому, что в App.js указан путь /profile, а у нас сейчас /profile/8

- path - путь, указанный в app.js
- url - текущий адрес(Может показаться что они совпадают, но нет, просто наш параметр 8 не определяется)

- params - объект с параметрами. Сейчас их нет. Чтобы это исправить нужно сделать это:

  ```javascript
  <Route path='/profile/:userId?' render={ () => <ProfileContainer />} />
  
  ```

Добавить :userId после слэша. А также ? что будет значить что данный параметр опциональный

Давайте снова глянем на props

![1565518489591](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1565518489591.png)

Теперь isExact  - true и в params есть ключ userId со значением 8

Всё что нам остаётся сделать это достать эту 8ку из пропсов и вставить в API key при get запросе

и поставить условие, если параметр не задан и мы переходим просто по /profile

```javascript
componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    };
    Axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
      .then(response => {
        this.props.setUserProfile(response.data);
      })
  }
```

**Вот и всё!)**

![1565524485562](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1565524485562.png)

## Архитектурный паттерн нашего приложения в одной картинке

Начало:  2 уровня. UI - User Interface. BLL - business logic layer.

![1565949602035](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1565949602035.png)

![1565949713701](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1565949713701.png)

Эволюция - 3 уровня.UI - User Interface. BLL - business logic layer. DAL - data access layer

![1565949848685](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1565949848685.png)

Эволюция vol 2.0. Разгрузка UI уровня

![1565950092440](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1565950092440.png)

![1565951914995](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1565951914995.png)



## Redux-Thunk

users-reducer.js

```
export const getUsers = (pageSize, currentPage) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));

    usersAPI.getUsers(pageSize, currentPage)
      .then(response => {
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount));
      })
  }
}
```

getUsers здесь является thunkCreator'ом. Он возвращает **thunk**

**Thunk** - *это функция, которая нужна, чтобы организовать side effect. Например делает запрос на сервер (или же в нашем случаем обращается к dal уровню) и после получения ответа диспатчит action в store.*

Это решает проблемы конвейера. Всё начинает идти последовательно.

![1565950092440](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1565950092440.png)

И BLL уровень становится по истине самым главным. Он становится как бы "менеджером" или "посредником" между всеми уровнями.

Мы также передаём thunkCreator контейнерной компоненте, как мы делали это ранее с actionCreator

```javascript
const mapDispatchToProps = {
  follow,
  unFollow,
  setTotalUsersCount,
  setCurrentPage,
  getUsers
};
```

и вызываем 

```javascript
componentDidMount() {
    this.props.getUsers(this.props.pageSize, this.props.currentPage);
  }
```

Картинка ниже очень хорошо описывает весь процесс

![1566127947019](https://github.com/Dvachee/SocialNetworkReact/raw/master/README-IMG/1566127947019.png)

Но есть одно но, наш store умеет принимать только action. Т.е только объект. Как нам быть?

Ну для начала нам конечно же нужно установить redax-thunk плагин

```
npm i redux-thunk --save
```

а также вторым параметром функции createStore передать applyMiddleware функцию с параметром thunkMiddleware(на самом деле он экспортируется по дефолту и вы можете назвать его как угодно)

```javascript
import { createStore, combineReducers, applyMiddleware } from "redux";
import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import friendsReducer from "./friends-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    profile : profileReducer,
    messages : messagesReducer,
    friends : friendsReducer,
    users : usersReducer,
    auth : authReducer
});


let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
window.store = store;
```

Теперь при попадании thunk в store - store будет знать, что такое thunk. Это функция, а не привычный ему action(объект) и просто вызовет её, передав ей в качестве параметра метод dispatch.

## Redirect

Redirect - это стандартная компонента React-router-dom. Она используется (как ни странно) для редиректа.

```javascript
import {Redirect} from "react-router-dom";
```

Редирект - это перенаправление на другую страницу. Например, при условии если вы не авторизированы.

В authReucers, в initialstate у нас есть флаг isAuth

```javascript
let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: false
};
```

Изначально он false. У нас всегда отрисовывается компонента header. Сразу после монтирования у нас идёт запрос на сервер, чтобы получить данные об авторизации. Если мы авторизованы и файлы cookie присутствуют, isAuth изменяется на true. Иначе - остаётся false.

Эти данные мы передаём в ту компоненту, которую мы хотим показать только для того пользователя, который авторизирован. 

```javascript
  if (!props.isAuth) return <Redirect to={'/login'} />;
```

Делаем проверку и возвращаем Redirect с нужным нам путём.

Конечно же этот путь изначально должен быть прописан в app.js

```javascript
<Route path='/login' render={ () => <Login /> } />
```

И должно быть указано то, что мы собираемся отрендерить.
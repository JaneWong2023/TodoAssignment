
const BACKEND_ROOT_URL = 'http://localhost:3001'
import { Todos } from "./class/Todos.js"

const todos = new Todos(BACKEND_ROOT_URL)

const list = document.querySelector('ul')//选择页面上的第一个 <ul> 元素，并将其存储在 list 变量中
const input = document.querySelector('input')//选择页面上的第一个 <input> 元素，并将其存储在 input 变量中

input.disabled = false

/*input.addEventListener('keypress',(event) => {   //输入框按下键盘上的任意键时，会触发这个监听器//event 参数表示触发的事件对象
    if(event.key === 'Enter'){   //箭头函数，用于定义事件监听器的处理函数
        event.preventDefault()//调用了事件对象的 preventDefault() 方法，阻止了默认的按键行为，也就是阻止了回车键的默认提交表单行为。在这段代码中，阻止默认的表单提交行为是因为应用的功能设计。在这个待办事项列表的应用中，并没有需要将用户输入的任务数据发送到服务器的需求。相反，用户的输入应该直接被 JavaScript 处理，并在页面中动态地添加到待办事项列表中。
        //如果不阻止默认的表单提交行为，当用户在输入框中输入任务并按下回车键时，浏览器会默认执行表单提交操作，导致页面刷新或跳转，而不会将用户输入的任务添加到列表中。这与应用的预期功能不符。
        const task = input.value.trim()//获取输入框的值（文本内容），去除首尾的空格
        if  (task !== ''){//检查是否为空，不空就执行以下代码
            const li = document.createElement('li')//创建了一个新的 <li> 元素，并将其存储在 li 变量中。<li> 标签用于表示列表中的每一项。在这个应用中，每一个待办事项都应该是列表中的一项，所以我们使用 <li> 标签来表示每一个待办事项。
            li.setAttribute('class','list-group-item')//设置元素属性，设置 <li> 元素的 class 属性为 'list-group-item'，这个 class 通常用于样式化列表项，可能是 Bootstrap 或其他框架中定义的。
            li.innerHTML = task//将用户输入的任务内容设置为新创建的 <li> 元素的 HTML 内容。
            list.append(li)//将 <li> 元素添加到待办事项列表 (<ul> 元素) 中。
            input.value = ''//将输入框的值清空，以便用户可以输入下一个任务
        }
    }
}
)
/*在这段代码中，我们首先获取了页面上的 <ul> 和 <input> 元素，并将它们分别存储在 list 和 input 变量中。
然后，我们给 input 元素添加了一个 keypress 事件监听器。
当用户在输入框中按下键盘上的任意键时，会触发这个监听器。
在事件监听器的处理函数中，我们首先调用了事件对象的 preventDefault() 方法，阻止了默认的按键行为，也就是阻止了回车键的默认提交表单行为。
然后，我们获取了用户在输入框中输入的任务数据，并将其存储在 task 变量中。
接着，我们检查了用户输入的任务数据是否为空。如果不为空，我们创建了一个新的 <li> 元素，并将用户输入的任务数据添加到这个 <li> 元素中。最后，我们将这个 <li> 元素添加到列表中，并清空了输入框中的内容。*/

const renderTask = (task) => {
    const li = document.createElement('li')
    li.setAttribute('class','list-group-item')
    li.setAttribute('data_key',task.getId().toString())
    //li.innerHTML = task.getText()
    renderSpan(li,task.getText())
    renderLink(li,task.getId())
    list.append(li)
}

const renderSpan = (li,text) => {
    const span = li.appendChild(document.createElement('span'))
    span.innerHTML = text
    //li.append(span)
}

const renderLink = (li,id) => {
    const a =li.appendChild(document.createElement('a'))
    a.innerHTML ='<i class="bi bi-trash"></i>'
    a.setAttribute('style','float:right')
    a.addEventListener('click',(event) => {
        todos.removeTask(id).then((removed_id) => {
        const li_to_remove = document.querySelector(`li[data_key='${removed_id}']`)
        if (li_to_remove){
            list.removeChild(li_to_remove)
        }
    }).catch((error) => {
        alert(error)
    })
    })
}

/*const getTasks = async () =>{
    try{
        const response = await fetch(BACKEND_ROOT_URL)
        const json = await response.json()
        json.forEach(task =>{
            renderTask(task.description)
        })
        input.disabled = false
    } catch(error){
        alert("Error retrieving tasks"+ error.message)
    }
}
*/
const getTasks = () => {
    todos.getTasks().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task)
        })
    }).catch((error) => {
        alert(error)
    })
}


const saveTask = async (task) => {
    try{
        const json = JSON.stringify({description: task})
        const response = await fetch(BACKEND_ROOT_URL + '/new',{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: json
        })
        return response.json()
    } catch(error){
        alert("Error saving task: " + error.message)
    }
}

input.addEventListener('keypress',(event) => {
    if(event.key === 'Enter'){
        event.preventDefault()
        const task = input.value.trim()
        if (task !== ''){
            //saveTask(task).then((json)=>{
            todos.addTask(task).then((task) => {
                renderTask(task)
                input.value = ''
                input.focus()
            })
           
        }
    }
})

getTasks()
/*

//index.js

const BACKEND_ROOT_URL = 'http://localhost:3001/'
import { Todos } from "./class/Todos.js"

const todos = new Todos(BACKEND_ROOT_URL)

const list = document.querySelector('ul')
const input = document.querySelector('input')

input.disabled = false

const renderTask = (task) => {
    const li = document.createElement('li')
    li.setAttribute('class','list-group-item')
    li.innerHTML = task.getText()
    list.append(li)
}

const getTasks = async () => {
    todos.getTasks().then((tasks)=> {
        tasks.forEach(task => {
            renderTask(task)
        })
    }).catch((error)=> {
        alert(error)
    })
}

const saveTask = async (task) => {
    try {
        const json = JSON.stringify({description: task})
        const response = await fetch(BACKEND_ROOT_URL + '/new',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        })
        return response.json() 
    } catch (error) {
        alert("Error saving task " + error.message)
    }
}

input.addEventListener('keypress',(event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        const task = input.value.trim()
        if (task !== '') {
            todos.addTask(task).then((task) => {
                renderTask(task)
                input.value = ''
                input.focus()
            })
        }
    }
})

getTasks()
*/

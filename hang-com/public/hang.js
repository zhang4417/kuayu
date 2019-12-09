// const request = new XMLHttpRequest()
// request.open('GET', 'http://qq.com:8888/friends.json')
// request.onreadystatechange = () => {
//     if (request.readyState === 4) {
//         if (request.status >= 200 && request.status < 300) {
//             const response = JSON.parse(request.response)
//             response.name = "郭富城"
//             console.log(response)
//         }
//     }
// }
// request.send()
//上面是使用CORS方法请求数据

function jsonp(url) {
    return new Promise((resolve, reject) => {
        const random = `callMeGodZ` + Math.random()
        //console.log(random)
        window[random] = (data) => { resolve(data) }//创建一个window.xxx()的回调函数
        const script = document.createElement('script')
        script.src = `${url}?callBack=${random}`
        script.onload = () => {
            script.remove()//拿到数据后删除script标签
        }
        script.onerror = () => {
            reject()
        }
        document.body.appendChild(script)
    })
}
jsonp(`http://qq.com:8888/friends.js`).then(data => console.log(data))
//使用JSONP方法跨域调用数据


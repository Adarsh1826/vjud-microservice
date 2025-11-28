import {WebSocketServer} from 'ws'
const wss = new WebSocketServer({port:8080})
let userCount = new Set()
wss.on('connection',(tws,req)=>{
    // extract the ip
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    userCount.add(ip)
    // loggin total active user at instance
    //console.log(userCount.size);
   
    tws.send(JSON.stringify({
        count:userCount.size
    }))

    // when client disonnects then doing this 
    tws.on('close',()=>{
        userCount.delete(ip)
        console.log("Active users:", userCount.size);
    })
    
                
})


console.log("WebSocket server listening on port 8080");
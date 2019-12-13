# iFramy
Embed Iframe to your site and communicate with your iframe super easily.

## How to use: 
Once you import the script, `iFramy` will be avaiable in global scope.  

### Render iFrame: 
```
iFramy.mount({
      containerId: < container_id >,
      url: <iframe_url>,
      debug: < true | false >,
      height: 500,
      eventHandlers: Object,
      onLoad: onLoadHandler      
})
```

### Communication:
1. You can pass set of events and handlers in `eventHandlers` as key-value pair.  
Example `eventHandlers`:  
```
{ 
  customEventFromIframe: customEventHandler,
  someOtherEventFromIframe: someOtherEventHandler 
}
```

2. Send message to iframe:  
```
iFramy.sendToIframe({ eventType, data, targetOrigin })
```  

### Troubleshoot known issue:  
**Height:**   
Setting height of iframe in host site is always tricky because of unknown content height. 
There is a default handler in `iFramy` to set height. You can check height in your iframe by adding a `resize` listener 
and send it back to parent by:
```
window.addEventListener("resize", ()=> {
  // get height
  window.parent.postMessage({
    eventType: 'setHeight',
    data: { height }
  }, '*');
});
```

let iFrame;
const mount = (params) => {
  const {
    containerId,
    url,
    onLoad,
    onError,
    eventHandlers = {},
    debug = false,
    height = 500
  } = params;

  const iFrameId = `${containerId}--iframe`;
  const iFrameContainer = document.getElementById(containerId);

  if(!iFrameContainer) {
    throw new Error(`No container found - ${iFrameContainer}`)
  }

  iFrameContainer.innerHTML = `<iframe
      id="${iFrameId}"
      width="100%"
      height="${height}"
      src="${url}"
      style="border: 0px;">
  </iframe>`

  iFrame = document.getElementById(iFrameId);
  iFrame.onload = () => {
    debug && console.log('Iframe load finished');
    onLoad && onLoad();
  }

  setupListeners(eventHandlers);
}

const sendToIframe = ({ eventType, data, targetOrigin = '*' }) =>{
  if(!iFrame) {
    throw new Error(`Your frame is not loaded yet. Call mount first!`)
  }
  debug && console.log('Sending message to iframe');
  iFrame.contentWindow.postMessage({
      eventType,
      data
  }, targetOrigin)
}

const setupListeners = (eventHandlers) => {
  window.addEventListener('message', ({data: { eventType, data }}) => {
    debug && console.log('New incoming message');
    if(eventType == 'setHeight' && !eventHandlers[eventType]) {
      setHeight(data.height);
    }
    const handler = eventHandlers[eventType];
    handler && handler(data);
  })
}

const setHeight = (height) =>{
  iFrame.style.height = height
}

export default {
  mount,
  sendToIframe,
  setHeight
};

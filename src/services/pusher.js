import Pusher from 'pusher-js'

// Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;

var pusher = new Pusher('aef48f729c1b993929f3', {
  cluster: 'us3'
});

var channel = pusher.subscribe('my-channel');

export default channel
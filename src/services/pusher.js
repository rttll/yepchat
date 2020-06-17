import Pusher from 'pusher-js'
import Store from '../state/index'

// Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;

var key = '830411361cc2b120c4ed'
var pusher = new Pusher(key, {
  cluster: 'us3',
  authEndpoint: Store.state.pusherAuthEndpoint
});

export default pusher
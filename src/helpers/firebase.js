import {server, database} from '../configs/firebase';

const addMoment = (storyRef) => {
  return database.ref('/moments' + storyRef).push({
    photo_url: 'http://lorempixel.com/400/200/',
    timestamp: server.ServerValue.TIMESTAMP,
    place: {
      name: "Ha Noi"
    }
  });
}

const addUser = () => {
  return database.ref('/users').push({
    name: 'Kien Do',
    avatar_url: 'https://s3-ap-southeast-1.amazonaws.com/tripbook-hedspi/headshot_1.jpg'
  });
}

const addStory = (userRef) => {
  return userRef.once('value', function(snap){
    let user = snap.val();
    database.ref('/stories').push({
      'user': {
        key: userRef.key,
        name: user.name,
        avatar_url: user.avatar_url
      },
      title: "My awesome Hackathon",
      featured_moment: {
        photo_url: 'http://lorempixel.com/400/200/',
        timestamp: server.ServerValue.TIMESTAMP
      }
    })
  })
}

export {addMoment, addUser, addStory}

import {server, database} from '../configs/firebase';

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
        photo_url: 'https://s3-ap-southeast-1.amazonaws.com/tripbook-hedspi/uploads/0075f5ee-7c14-43c4-8ab7-25f2ca1639f7/unnamed-4-1494777640321.jpg',
        timestamp: server.ServerValue.TIMESTAMP
      }
    })
  })
}

const addMoment = (storyRef) => {
  return database.ref('/moments/'+storyRef.key).push({
    photo_url: 'https://s3-ap-southeast-1.amazonaws.com/tripbook-hedspi/uploads/0075f5ee-7c14-43c4-8ab7-25f2ca1639f7/unnamed-4-1494777640321.jpg',
    timestamp: server.ServerValue.TIMESTAMP,
    place: {
      name: "Hanoi"
    }
  })
}

export {addMoment, addUser, addStory}

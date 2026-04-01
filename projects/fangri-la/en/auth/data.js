const nextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
const artists = [
  {
    id: '100001',
     chat: {
      channelId: '100001',
    },
    token: 'token_string',
    tokenExpirationDate: nextMonth, // ISO format (string)
    name: 'Sienna',
    surname: 'Solas',
    dob: '1990-06-28',
    img: '/assets/static/images/artists/sienna_solas/profile.png',
    phone: '',
    username: 'sienna@siennasolas.com',
    email: 'sienna@siennasolas.com',
    role: 'artist',

  },
  {
    id: '100002',
     chat: {
      channelId: '100002',
    },
    token: 'token_string',
    tokenExpirationDate: nextMonth, // ISO format (string)
    name: 'Caden',
    surname: 'Kane',

    img: '/assets/static/images/artists/caden_kane/profile.png',
    phone: '',
    username: 'caden@cadenkane.com',
    email: 'caden@cadenkane.com',
    role: 'artist',
  },
  {
    id: '100003',
     chat: {
      channelId: '100003',
    },
    token: 'token_string',
    tokenExpirationDate: nextMonth, // ISO format (string)
    name: 'Nyko',
    surname: 'Blaze',
    dob: '1990-06-28',
    img: '/assets/static/images/artists/nyko_blaze/profile.png',
    phone: '',
    username: 'nyko@nykoblaze.com',
    email: 'nyko@nykoblaze.com',
    role: 'artist',
  },
  {
    id: '100004',
     chat: {
      channelId: '100004',
    },
    token: 'token_string',
    tokenExpirationDate: nextMonth, // ISO format (string)
    name: 'SevenBlock',
    surname: '',
    dob: '1990-06-28',
    img: '/assets/static/images/artists/sevenblock/profile.png',
    phone: '',
    username: 'sevenBlock@sevenBlock.com',
    email: 'sevenBlock@sevenBlock.com',
    role: 'artist',
  },

  {
    id: '100005',
     chat: {
      channelId: '100005',
    },
    token: 'token_string',
    tokenExpirationDate: nextMonth, // ISO format (string)
    name: 'Nyla',
    surname: 'Veil',
    dob: '1990-06-28',
    img: '/assets/static/images/artists/nyla_veil/profile.png',
    phone: '',
    username: 'nyla@nylaveil.com',
    email: 'nyla@nylaveil.com',
    role: 'artist',
  },
];
const clients = [

];
let users = [...artists, ...clients];

module.exports = { artists, clients, users };

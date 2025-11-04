const songs = [
  {
    id: '1',
    title: 'Am tham ben em',
    artist: 'Son Tung M-TP',
    duration: 240,
    filePath: 'Am-tham-ben-em.mp3',
  },
  {
    id: '2',
    title: 'Khi phai quen di',
    artist: 'Miu Le',
    duration: 200,
    filePath: 'Khi-phai-quen-di.mp3',
  },
  {
    id: '3',
    title: 'Sample Song',
    artist: 'Unknown',
    duration: 180,
    filePath: 'Sample.mp3',
  },
  {
    id: '4',
    title: 'Yas',
    artist: 'K/DA',
    duration: 190,
    filePath: 'Yas.mp3',
  },
];

const playlists = [
  {
    id: 'playlist1',
    name: 'Top Hits',
    description: 'Popular songs',
    songs: ['1', '2'],
  },
  {
    id: 'playlist2',
    name: 'My Favorites',
    description: 'My personal favorite songs',
    songs: ['3', '4'],
  },
];

module.exports = { songs, playlists };

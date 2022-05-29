tracks loaded from library.xml get the keys normalised to remove spaces, hyphens and are camel-cased.

example track data:
{
trackId: '9655',
name: 'Track 3',
artist: 'Octave One',
album: '430 West pres. Detroit Calling',
grouping: '430 West / Direct Beat',
genre: 'Techno',
kind: 'MPEG audio file',
size: '2168368',
totalTime: '89913',
trackNumber: '3',
trackCount: '28',
year: '2001',
dateModified: '2014-06-17T18:28:00Z',
dateAdded: '2015-01-05T19:16:26Z',
bitRate: '192',
comments: 'digaphobia public sound',
playCount: '6',
playDate: '3708663817',
playDateUtc: '2021-07-09T07:23:37Z',
compilation: '',
persistentId: 'EB98F512989905DB',
trackType: 'Remote',
libraryPersistentId: 'E58DF439C9F54D2B'
}

track keys:
0:'trackId'
1:'name'
2:'artist'
3:'albumArtist'
4:'composer'
5:'album'
6:'grouping'
7:'genre'
8:'kind'
9:'size'
10:'totalTime'
11:'discNumber'
12:'discCount'
13:'trackNumber'
14:'trackCount'
15:'year'
16:'dateModified'
17:'dateAdded'
18:'bitRate'
19:'comments'
20:'playCount'
21:'playDate'
22:'playDateUtc'
23:'albumLoved'
24:'artworkCount'
25:'sortAlbumArtist'
26:'sortArtist'
27:'sortName'
28:'persistentId'
29:'trackType'
30:'matched'
31:'libraryPersistentId'

example playlist data :
{
tracks: [
'44937', '8319', '32743', '44941', '7133', '29453', '21009',
'32033', '31823', '44939', '17745', '11523', '28745', '28739',
'29747', '16563', '19793', '35439', '31847', '32451', '5907',
'27881', '23315', '21007', '23081', '28583', '28787', '6141',
'6395', '6429', '18895', '18893', '29417', '28427', '28421',
'29629', '29621', '28799', '28207', '28435', '16513', '22735',
'6019', '29805', '29821', '16937', '16929', '16911', '16931',
'16907', '10569', '28753', '28743', '28741', '28747', '28691',
'33543', '16207', '16277', '26107', '43481', '29749', '35197',
'10635', '10637', '10639', '28413', '33817', '27149', '34419',
'34595', '28735', '5915', '20431', '29923', '28299', '26831',
'26819', '6039', '23083', '30759', '23565', '6155', '6157',
'6159', '6169', '28717', '28425', '28423', '22603', '33483',
'8921', '43495', '43493', '43491', '43489', '43487', '43483',
'33525', '17743',
... 16 more items
],
name: 'Recently Played',
description: '',
playlistId: '92921',
playlistPersistentId: 'E7A3392211E7F34A',
allItems: '',
smartInfo: '',
smartCriteria: '',
playlistItems: ''
}

playlist keys:
0:'tracks'
1:'name'
2:'description'
3:'master'
4:'playlistId'
5:'playlistPersistentId'
6:'visible'
7:'allItems'
8:'playlistItems'

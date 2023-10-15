const mockBarData = [
  {
    month: '06',
    'hot dog': 271,
    'CTA sur variateur': 249,
    'Informatique et onduleurs': 356,
  },
  {
    month: '07',
    'hot dog': 200,
    'CTA sur variateur': 327,
    'Informatique et onduleurs': 292,
  },
  {
    month: '08',
    'hot doggy': 34,
    'CTA sur variateur': 120,
    'Informatique et onduleurs': 31,
  },
];

export default mockBarData;

i have this data : 
const mockBarData = [
  {
    date: '2019-06-01',
    'hot dog': 130,
    'CTA sur variateur': 36,
    'Informatique et onduleurs': 74,
  },
  {
    date: '2019-06-02',
    'hot dog': 109,
    'CTA sur variateur': 182,
    'Informatique et onduleurs': 101,
  },
  {
    date: '2019-06-03',
    'hot dog': 22,
    'CTA sur variateur': 31,
    'Informatique et onduleurs': 181,
  },
  {
    date: '2019-07-04',
    'hot dog': 51,
    'CTA sur variateur': 85,
    'Informatique et onduleurs': 144,
  },
  {
    date: '2019-07-05',
    'hot dog': 130,
    'CTA sur variateur': 137,
    'Informatique et onduleurs': 116,
  },
  {
    date: '2019-07-06',
    'hot dog': 19,
    'CTA sur variateur': 105,
    'Informatique et onduleurs': 32,
  },
  {
    date: '2019-08-07',
    'hot doggy': 34,
    'CTA sur variateur': 120,
    'Informatique et onduleurs': 31,
  },
];

// and i want to tranform it to agregate data for each label by month in a specific year, like this : 

// const mockBarData = [
//   {
//     month: '06',
//     'hot dog': 271,
//     'CTA sur variateur': 249,
//     'Informatique et onduleurs': 356,
//   },
//   {
//     month: '07',
//     'hot dog': 200,
//     'CTA sur variateur': 327,
//     'Informatique et onduleurs': 292,
//   },
//   {
//     month: '08',
//     'hot doggy': 34,
//     'CTA sur variateur': 120,
//     'Informatique et onduleurs': 31,
//   },
// ];

// how can i do that in react ?

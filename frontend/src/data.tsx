import { ChatProps, UserProps } from './types';

export const users: UserProps[] = [
  {
    name: 'Steve E.',
    username: '@steveEberger',
    avatar: '/static/images/avatar/2.jpg',
    online: true,
  },
  {
    name: 'Katherine Moss',
    username: '@kathy',
    avatar: '/static/images/avatar/3.jpg',
    online: false,
  },
  {
    name: 'Phoenix Baker',
    username: '@phoenix',
    avatar: '/static/images/avatar/1.jpg',
    online: true,
  },
  {
    name: 'Eleanor Pena',
    username: '@eleanor',
    avatar: '/static/images/avatar/4.jpg',
    online: false,
  },
  {
    name: 'Kenny Peterson',
    username: '@kenny',
    avatar: '/static/images/avatar/5.jpg',
    online: true,
  },
  {
    name: 'Al Sanders',
    username: '@al',
    avatar: '/static/images/avatar/6.jpg',
    online: true,
  },
  {
    name: 'Melissa Van Der Berg',
    username: '@melissa',
    avatar: '/static/images/avatar/7.jpg',
    online: false,
  },
];

export const chats: ChatProps[] = [
  {
    id: '1',
    sender: users[0],
    messages: [
      {
        id: '1',
        content: 'Hi Olivia, I am currently working on the project.',
        timestamp: 'Wednesday 9:00am',
        sender: users[0],
      },
      {
        id: '2',
        content: 'That sounds great, Mabel! Keep up the good work.',
        timestamp: 'Wednesday 9:10am',
        sender: 'You',
      },
      {
        id: '3',
        timestamp: 'Wednesday 11:30am',
        sender: users[0],
        content: 'I will send the draft by end of the day.',
      },
      {
        id: '4',
        timestamp: 'Wednesday 2:00pm',
        sender: 'You',
        content: 'Sure, I will be waiting for it.',
      },
      {
        id: '5',
        timestamp: 'Wednesday 4:30pm',
        sender: users[0],
        content: 'Just a heads up, I am about to send the draft.',
      },
      {
        id: '6',
        content:
          "Thanks Olivia! Almost there. I'll work on making those changes you suggested and will shoot it over.",
        timestamp: 'Thursday 10:16am',
        sender: users[0],
      },
      {
        id: '7',
        content:
          "Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.",
        timestamp: 'Thursday 11:40am',
        sender: users[0],
      },
      {
        id: '3',
        timestamp: 'Thursday 11:40am',
        sender: users[0],
        content: 'Tech requirements.pdf',
        attachment: {
          fileName: 'Tech requirements.pdf',
          type: 'pdf',
          size: '1.2 MB',
        },
      },
      {
        id: '8',
        timestamp: 'Thursday 11:41am',
        sender: 'You',
        content: "Awesome! Thanks. I'll look at this today.",
      },
      {
        id: '9',
        timestamp: 'Thursday 11:44am',
        sender: users[0],
        content: "No rush though — we still have to wait for Lana's designs.",
      },
      {
        id: '10',
        timestamp: 'Today 2:20pm',
        sender: users[0],
        content: 'Hey Olivia, can you please review the latest design when you can?',
      },
      {
        id: '11',
        timestamp: 'Just now',
        sender: 'You',
        content: "Sure thing, I'll have a look today. They're looking great!",
      },
    ],
  },
];

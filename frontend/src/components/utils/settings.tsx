import _ from 'lodash';

export default {
    availableSpeakersList: [
        {
            title: 'Indian English - Aditi (FEMALE)',
            path: 'aditi',
        },
        {
            title: 'US English - Matthew (MALE)',
            path: 'matthew',
        }
    ],
    reactions: {
        lol: { key: 'lol', name: 'LOL', imgName: 'react-lol', className: 'lol' },
        enjoy: { key: 'enjoy', name: 'Enjoy', imgName: 'react-enjoy', className: 'enjoy' },
        confused: { key: 'confused', name: 'Confused', imgName: 'react-confused', className: 'confused' },
        virus: { key: 'virus', name: 'Virus', imgName: 'react-virus', className: 'virus' },
        sad: { key: 'sad', name: 'Sad', imgName: 'react-sad', className: 'sad' },
        cry: { key: 'cry', name: 'Cry', imgName: 'react-cry', className: 'cry' },
        angry: { key: 'angry', name: 'Angry', imgName: 'react-angry', className: 'angry' },
        sleepy: { key: 'sleepy', name: 'Sleepy', imgName: 'react-sleepy', className: 'sleepy' },
    },
    botts: (val:any)=>`https://avatars.dicebear.com/api/bottts/${val}.svg`,
    rulesImage: (val:any)=>require(`../../images/rules/rule-${val}.svg`).default,
    audio: (selectedSpeaker:any,num:any)=>require(`../../audio/${selectedSpeaker}/${num}.mp3`).default,
    shartext: (val:any)=>`Use this invite: ${val}`,
    awards: {
        corner: { key: 'corner', name: 'Corners', count: '2', pts: '30',status:'1' },
        earlyfive: { key: 'early-five', name: 'Early Five', count: '1', pts: '40',status:'1' },
        earlyseven: { key: 'early-seven', name: 'Early Seven', count: '1', pts: '30',status:'1' },
        firstline: { key: 'first-line', name: 'First Line', count: '1', pts: '20',status:'1' },
        house: { key: 'house', name: 'Full house', count: '2', pts: '70',status:'1' },
        lastline: { key: 'last-line', name: 'Last Line', count: '1', pts: '20',status:'1' },
        middleline: { key: 'middle-line', name: 'Middle Line', count: '1', pts: '20',status:'1' },
        middlenumber: { key: 'middle-number', name: 'Middle Number', count: '1', pts: '30',status:'1' },
        star: { key: 'star', name: 'Star', count: '2', pts: '30',status:'1' },
    },
    groupArrBy: (arr: any[], key: string | number, flatten = true) => {
        var result = arr.reduce(function (groups: { [x: string]: any[]; }, item: { [x: string]: any; }) {
            const val = item[key];
            groups[val] = groups[val] || [];
            groups[val].push(item);
            return groups;
        }, {});

        let returnArr = Object.keys(result).map(function (key) {
            return result[key];
        });

        return flatten ? _.flatten(returnArr) : returnArr;
    },
}
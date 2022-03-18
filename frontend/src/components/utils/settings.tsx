export default {

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
    shartext: (val:any)=>`Use this invite: ${val}`,
    awards: {
        corner: { key: 'corner', name: 'Corners', count: '2', pts: '30' },
        earlyfive: { key: 'earlyfive', name: 'Early Five', count: '1', pts: '40' },
        earlyseven: { key: 'earlyseven', name: 'Early Seven', count: '1', pts: '30' },
        firstline: { key: 'firstline', name: 'First Line', count: '1', pts: '20' },
        house: { key: 'house', name: 'Full house', count: '2', pts: '70' },
        lastline: { key: 'lastline', name: 'Last Line', count: '1', pts: '20' },
        middleline: { key: 'middleline', name: 'Middle Line', count: '1', pts: '20' },
        middlenumber: { key: 'middlenumber', name: 'Middle Number', count: '1', pts: '30' },
        star: { key: 'star', name: 'Star', count: '2', pts: '30' },
    }
}
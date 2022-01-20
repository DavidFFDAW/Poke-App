const environment = 'dev';

const local = 'http://localhost:3000/';
const vercelApp = 'https://poke-app-btolba0kk-davidffdaw.vercel.app/';

const getURL = _ => environment === 'dev' ? local : vercelApp;

export const config = {
    language: 'en',
    repo: 'https://github.com/DavidFFDAW/Poke-App',
    appUrl: getURL(),
    author: { 
        name: 'David Fernández Flores',
        web: 'https://github.com/DavidFFDAW',
    },
    year: new Date().getFullYear(),
    phase: 2,
    version: '0.2.0',
};
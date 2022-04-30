import config from './config.json'

export const getUrl = (env)=>{
    if(!env || env === 'D'){
        return config['url'];
    }
    return config['url'];
}
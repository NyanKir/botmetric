let json;


const params = {
    keyword: '',
    regions: [],
    sources: [],
    lang: ['ru', 'ua']
}

const browserLanguage = (navigator.language || navigator.userLanguage).substring(0, 2)
const currentLanguage = params.lang.includes(browserLanguage) ? browserLanguage : 'ua'

//Отображение постов
const InitialValues = {
    showposts: 5, //?
    allcount: 5, //Все посты
    tg_grcount: 5, //Th groups
    tg_chcount: 5, //Tg chats
    mediacount: 5, //Media
    twittercount: 5, //Twitter
    facebookcount: 5, //Facebook
    step: 10,  //Шаг отображения постов
};


async function fetching(keyword) {
    const country = (params.regions.length === 2?'all':params.regions[0])
    const resources = params.sources.reduce((acc, el) => {
        return acc + `&resource=${el}`
    }, '')

    const sections = document.querySelectorAll('[data-blink]')
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.add('blink')
    }
    let res =  await fetch(`https://mediascan.cc/dashboard/keyword?q=${keyword?keyword:params.keyword}&lang=${currentLanguage}&country=${country}` + resources)

    json = await res.json()

    params.keyword = json.keyword
    params.regions = [...Object.keys(json.settings.regions)]
    params.sources = [...Object.keys(json.settings.sources)]
    params.dict_regions = [...json.settings.dict_regions]
    params.dict_sources = [...json.settings.dict_sources]

    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove('blink')
    }
    return json
}

fetching('Разумков').then((data)=>render(data,true))


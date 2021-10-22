function render(json, rerender = false) {
    let {main, keyword, list, mention} = json;
    console.log(json)
    const lang = {...langInit[main.lang]};
    let all = []

    Object.keys(list).forEach((key) => {
        all = [...all, ...list[key]]
    })

    list = {all, ...list}

    for (let i = 0; i < linkshash.length; i++) {
        linkshash[i].textContent = 'media_scan_bot'
    }

    if (!main.authorized && showPopup) {
        setTimeout(() => {
            MobilePopup.classList.add('active')
        }, 1000)
        MobilePopup.addEventListener(('click'), function () {
            showPopup = false
            MobilePopup.remove()
        })
    }


    HeaderTitle.textContent = main.name;
    HeaderLink.innerHTML = `<a href="${main.link_site}" class="header_links" target="_blank">${main.link_site}</a>`;
    HeaderTg.innerHTML = `<a href="${main.link_tg}" class="header_links" target="_blank">${main.link_tg}</a>`;
    const Keyword2 = document.getElementById("keyword2");
    Keyword2.textContent = `“${keyword}”`;
    Keyword2.parentElement.innerHTML = lang.notice + "</br>" + Keyword2.outerHTML;
    Keyword.textContent = keyword;
    Keyword24.textContent = lang.keyword24;
    keywordText.innerHTML = lang.keyword_text + "</br>" + Keyword.outerHTML;
    KeywordCount.innerHTML = lang.keyword_count;
    Keyword7.textContent = lang.keyword7d;
    MResources.textContent = lang.mresources;
    MHour.textContent = lang.mhour;
    M7Days.textContent = lang.mlastweek;
    MDay.textContent = lang.mday;
    MWeek.textContent = lang.mweek;
    topMention.textContent = lang.topMention;
    AsideTLG.innerHTML = `
                    <p class="aside_tlg-title section_title">${lang.get_notices + ': ' + keyword}</p>
                    <a href="${main.link_hash_tg}" class="aside_tlg-btn" target="_blank">
                    Start
                    </a>
                    <div class="aside_tlg-foot">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="18" height="18" rx="9" fill="white" stroke="#787880"
                                  stroke-opacity="0.2"/>
                            <path d="M9.953 17.8387C14.2567 17.8387 17.7456 14.3292 17.7456 10C17.7456 5.67083 14.2567 2.16132 9.953 2.16132C5.64927 2.16132 2.1604 5.67083 2.1604 10C2.1604 14.3292 5.64927 17.8387 9.953 17.8387Z"
                                  fill="url(#paint0_linear_118:4)"/>
                            <path d="M4.89301 10.3339C5.80832 9.83071 6.83005 9.41075 7.78471 8.98866C9.42709 8.29731 11.076 7.61794 12.7415 6.98545C13.0656 6.87769 13.6478 6.77232 13.7049 7.25156C13.6737 7.92995 13.5451 8.60438 13.4568 9.2788C13.233 10.7619 12.9742 12.2399 12.7218 13.7182C12.6349 14.2106 12.0168 14.4655 11.6213 14.1504C10.6709 13.5097 9.7132 12.8752 8.77492 12.2197C8.46756 11.908 8.75258 11.4604 9.02707 11.2379C9.80986 10.468 10.64 9.81386 11.3819 9.00419C11.582 8.52192 10.9907 8.92836 10.7957 9.05291C9.72405 9.78991 8.67863 10.5719 7.54878 11.2196C6.97165 11.5367 6.299 11.2657 5.72214 11.0888C5.20491 10.8751 4.44698 10.6598 4.89295 10.3339L4.89301 10.3339Z"
                                  fill="white"/>
                            <defs>
                                <linearGradient id="paint0_linear_118:4" x1="7.76885" y1="-5.09619" x2="-2.97325"
                                                y2="12.1696" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#34B0DF"/>
                                    <stop offset="1" stop-color="#1E88D3"/>
                                </linearGradient>
                            </defs>
                        </svg>
                        <span>media_scan_bot</span>
                    </div>
    `
    Mention7Chart.innerHTML = ''
    Mention.innerHTML = ''
    MentionResource.innerHTML = ''

    if (mention.day_1) {
        animateDays(Day, 0, mention.day_1, 2000);
    } else {
        Day.innerHTML = '<span>&#129335;</span>';
    }

    if (mention.day_7) {
        animateDays(SevenDays, 0, mention.day_7, 2000);

    } else {
        SevenDays.innerHTML = '<span>&#129335;</span>';
    }

    renderTableDate(Mention24, 'top1', lang)
    renderTableDate(Mention7, 'top7', lang)
    renderTableDate(MentionSwitcher, currentTable, lang, true)


    if (rerender) {
        MobileFilterBlogBtns.innerHTML = `
        <div class="mobile-aside_btn" id="mobileaside">
            <span>ф и л ь т р</span>
        </div>
        `

        Switcher.innerHTML = `
                 <span class="swithcer-title ${currentTable === 'top1' ? 'current' : ''}" data-value="top1">24 часа</span>
                    <label class="switch">
                        <input type="checkbox" ${currentTable === 'top7' ? 'checked' : ''} id="switc">
                        <span class="slider round"></span>
                    </label>
                <span  class="swithcer-title ${currentTable === 'top7' ? 'current' : ''}"  data-value="top7">7 дней</span>
        `
        const spans = document.querySelectorAll('.swithcer-title')
        for (let i = 0; i < spans.length; i++) {
            spans[i].addEventListener('click', function (e) {
                currentTable = e.target.dataset.value
                const swtic = document.getElementById('switc')
                if (currentTable === 'top1') {
                    swtic.checked = false
                    swtic.parentElement.parentElement.lastChild.previousSibling.classList.remove('current')
                    swtic.parentElement.parentElement.firstChild.nextSibling.classList.add('current')
                } else {
                    swtic.checked = true
                    swtic.parentElement.parentElement.lastChild.previousSibling.classList.add('current')
                    swtic.parentElement.parentElement.firstChild.nextSibling.classList.remove('current')
                }

                renderTableDate(MentionSwitcher, currentTable, lang, true)
            })
        }
        document.getElementById('switc').addEventListener('change', (e) => {
            if (e.target.checked) {
                currentTable = 'top7'
                e.target.parentElement.parentElement.lastChild.previousSibling.classList.add('current')
                e.target.parentElement.parentElement.firstChild.nextSibling.classList.remove('current')
            } else {
                currentTable = 'top1'
                e.target.parentElement.parentElement.lastChild.previousSibling.classList.remove('current')
                e.target.parentElement.parentElement.firstChild.nextSibling.classList.add('current')
            }
            renderTableDate(MentionSwitcher, currentTable, lang, true)
        })
        Checkboxes.innerHTML = ''

        renderCheckboxes(Checkboxes, json.settings.regions, 'Страны', lang, 'regions')
        renderCheckboxes(Checkboxes, json.settings.sources, 'Ресурсы', lang, 'sources')
        renderMobileCheckboxes(MobileFilterBlogBtns, json.settings.sources, 'Ресурсы', lang, 'sources')
        renderMobileCheckboxes(MobileFilterBlogBtns, json.settings.regions, 'Страны', lang, 'regions')
        const checkboxses = document.querySelectorAll('.switchevent')
        for (let i = 0; i < checkboxses.length; i++) {
            checkboxses[i].addEventListener('change', function (e) {
                CheckboxHandler(e, this)
            })
        }

        const MobileAside = document.getElementById("mobileaside");

        MobileAside.addEventListener('click', function (e) {
            e.stopPropagation()
            this.parentElement.classList.toggle('active')
        })
    }


    //Анимация чисел
    function animateDays(obj, start, end, duration) {
        //Числа
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    //Анимация прогресса кругов
    function animateProgressCircles(circle, value) {
        let progress;
        if (value <= 10) {
            progress = ((100 * value) / 10).toFixed(0);
        }
        if (value > 10 && value <= 100) {
            progress = ((100 * value) / 100).toFixed(0);
        }
        if (value > 100 && value <= 1000) {
            progress = ((100 * value) / 1000).toFixed(0);
        }
        if (value > 1000 && value <= 10000) {
            progress = ((100 * value) / 10000).toFixed(0);
        }
        if (value > 10000 && value <= 100000) {
            progress = ((100 * value) / 100000).toFixed(0);
        }
        if (value > 100000 && value <= 1000000) {
            progress = ((100 * value) / 1000000).toFixed(0);
        }
        if ((+progress) === 0) {
            circle.style.strokeDasharray = `280 280`
            circle.style.strokeDashoffset = `0 `
        } else {
            circle.style.strokeDasharray = `${275 * (progress / 100)} 280`
            circle.style.strokeDashoffset = `0`
        }
        circle.parentElement.removeAttribute('display')
    }

    const {tg_ch, tg_gr, media, twitter, facebook} = mention;

    //Количество упоминаний по ресурчам
    const arrMentionSource = [{value: media, name: 'media'}, {value: twitter, name: 'twitter'}, {
        value: facebook,
        name: 'facebook'
    }, {value: tg_ch, name: 'tg_ch'}, {value: tg_gr, name: 'tg_gr'}]
        .sort((a, b) => b.value - a.value);
    if (!arrMentionSource.every(el => el.value === 0)) {

        let max = Math.max(...arrMentionSource.map((el) => el.value));
        arrMentionSource.forEach((mention) => {
            if (!mention.value) {
                return;
            }
            let progress = ((100 * mention.value) / max.toFixed(0));

            if (progress < max && progress < 30) {
                progress += 10
            }
            MentionResource.innerHTML += `
            <div class="mention-resource_wrapper">
                <span class="mention-resource_title">${lang[mention.name]}</span>
                <div class="mention-resource_progress">
                    <div class="mention-resource_progress-line" style="width: ${progress}%">
                    </div>
                </div>
                <span class="mention-resource_count">${mention.value}</span>
            </div>
        `;
        });
    } else {
        MentionResource.innerHTML = '';
    }


    //Посты
    function paginate(type) {
        const obj = document.getElementById(type + "posts");
        obj.lastElementChild.remove();//Delete Btn
        renderPosts(obj, list[type], InitialValues[type + 'count'], InitialValues[type + 'count'] + InitialValues.step, type);
        InitialValues[type + 'count'] += InitialValues.step;
        renderBtn(obj, type, true);

        const reader = document.getElementsByClassName("panels_read");
        // Читать еще...
        for (let i = 0; i < reader.length; i++) {
            reader[i].addEventListener("click", function () {
                const textObj = this.parentElement.firstElementChild;
                this.classList.toggle("active");
                if (this.classList.contains("active")) {
                    textObj.innerHTML = `${textObj.innerHTML.slice(0, 6)}<span>${textObj.dataset.value}</span>`;
                } else {
                    textObj.innerHTML = `${textObj.innerHTML.slice(0, 6)} <span>${truncate(textObj.dataset.value, 180)}</span>`;
                }

            });
        }
    }

    function renderBtn(htmlObj, type, height) {

        if (list[type].length > 2 && InitialValues[type + 'count'] < list[type].length) {
            const btn = document.createElement('button');
            btn.classList.add("notices_button");
            btn.textContent = lang.show_more;
            htmlObj.appendChild(btn);

        }
        if (height) {
            htmlObj.classList.add('full');
        }
        const btns = document.querySelectorAll('.notices_button')
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function () {
                paginate(this.parentElement.id.replace('posts', ''))
            })
        }

    }

    function renderBlogBtns(node, list) {
        const keys = Object.keys(list).filter((el) => list[el].length !== 0)
        const url = new URL(document.URL)
        const ks = Object.keys(list)
        const currentPost = ks.includes(url.searchParams.get('posts')) ? url.searchParams.get('posts') : 'all'

        const sum = (keys.reduce((acc, el) => acc + list[el].length, 0)) - list.all.length
        let html = `
            <p class="aside_title section_title">Источники упоминаний</p>
        `
        keys.forEach((key) => {
            html += `
                <button class="aside_blog-btn ${currentPost === key ? 'active' : ''}" value="${key}">
                    ${lang[key]}(${key === 'all' ? sum : list[key].length})
                </button>
            `
        })
        node.innerHTML = html
        const btns = document.querySelectorAll('.aside_blog-btn')
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function (e) {
                this.classList.add('active')
                const url = new URL(document.URL)
                url.searchParams.set('posts', e.target.value)
                // window.scrollTo({ top: Notices.offsetTop-90, behavior: 'smooth'});
                window.history.replaceState({}, null, url.toString());
                const intersectionObserver = new IntersectionObserver((entries) => {
                    let [entry] = entries;
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            window.removeEventListener('scroll', (list) => ScrollHandler(Object.keys(list)))
                            window.addEventListener('scroll', (list) => ScrollHandler(Object.keys(list)));
                            renderNews()
                        }, 300)
                    }
                });
                intersectionObserver.observe(Mention);
                window.scrollTo({
                    top: Mention.offsetTop,
                    behavior: 'smooth'
                })
                renderBlogBtns()
                // setTimeout(()=>{
                // renderNews()
                // },700)
            })
        }
    }

    function renderPosts(htmlObj, arr, start, end, type) {
        arr.slice(start, end).forEach((obj) => {
            const stamp = new Date(obj.timestamp * 1000).toLocaleString('de-CH',).split(',');
            const post = document.createElement('div');
            post.classList.add('panels_panel');

            const postTitle = document.createElement('span');
            postTitle.classList.add('panels_topic');
            postTitle.innerHTML += `${type === 'tg_gr' ? lang.text : lang.topic}: <span>${truncate(obj.title, 180)}</span>`;
            postTitle.setAttribute('data-value', obj.title);

            const postText = document.createElement('span');
            if (obj.context) {
                postText.classList.add('panels_topic');
                postText.classList.add('panels_topic-text');
                postText.innerHTML += `Из текста: <span>${obj.context.replaceAll('[…]', '"')}</span>`;
            }

            const postLink = document.createElement('a');
            postLink.classList.add('panels_link');
            postLink.textContent = obj.link;
            postLink.setAttribute('href', obj.link);
            postLink.setAttribute('target', '_blank');

            const postDate = document.createElement('span');
            postDate.classList.add('panels_date');
            postDate.textContent = `${stamp[1].slice(0, 6)} ${stamp[0]}`;

            post.appendChild(postTitle);
            if (type === 'tg_gr' || type === 'tg_ch') {
                const postTitle = document.createElement('span');
                const postLinkWrapper = document.createElement('span');
                const postChannel = document.createElement('span');
                const postLink = document.createElement('a');

                postLinkWrapper.classList.add('panels_post');
                postTitle.classList.add('panels_read');
                postChannel.classList.add('panels_channel');
                postTitle.textContent = `${lang.read}`;
                postChannel.textContent = `${type === 'tg_gr' ? lang.chat : lang.channel}: ${obj.name ? obj.name : 'Пусто'}`;
                postLinkWrapper.innerHTML = `<span>${lang.post}:&nbsp;<a href="${obj.link}" class="panels_link" target="_blank">${obj.link}</a></span>`;
                postLinkWrapper.appendChild(postLink);

                if (obj.title.length > 180) {
                    post.appendChild(postTitle);
                }

                post.appendChild(postChannel);
                post.appendChild(postLinkWrapper);
            } else {
                post.appendChild(postLink);
            }
            if (obj.context) {
                post.appendChild(postText);
            }
            post.appendChild(postDate);
            htmlObj.appendChild(post);
        });

    }

    function renderNews() {
        Notices.innerHTML = '';
        const url = new URL(document.URL)
        const ks = Object.keys(list)
        const currentPost = ks.includes(url.searchParams.get('posts')) ? url.searchParams.get('posts') : 'all'
        Object.keys(list).forEach((key) => {
            if (!list[key].length) {
                return;
            }
            //
            Notices.innerHTML += `
                <button class="accordion ${key === currentPost ? 'active' : ''}" data-${key}posts><span>${lang[key]} (${list[key].length})</span></button>
                <div class="panels ${key === currentPost ? 'full' : ''}" id="${key}posts">
                </div>
            `;

            renderBlogBtns(AsideBlogBtns, list)
            renderPosts(document.getElementById(key + "posts"), list[key], 0, (InitialValues[key + 'count'] - 5) + InitialValues.showposts, key);
            renderBtn(document.getElementById(key + "posts"), key);
        });
        // События для кнопки аккардиона
        const acc = document.getElementsByClassName("accordion");
        const reader = document.getElementsByClassName("panels_read");
        // Читать еще...
        for (let i = 0; i < reader.length; i++) {
            reader[i].addEventListener("click", function () {
                const textObj = this.parentElement.firstElementChild;
                this.classList.toggle("active");
                if (this.classList.contains("active")) {
                    textObj.innerHTML = `${textObj.innerHTML.slice(0, 6)}<span>${textObj.dataset.value}</span>`;
                } else {
                    textObj.innerHTML = `${textObj.innerHTML.slice(0, 6)} <span>${truncate(textObj.dataset.value, 180)}</span>`;
                }

            });
        }
        // появление и аккардиона
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle("active");
                const panel = this.nextElementSibling;
                panel.classList.toggle('full')

            });
        }
    }

    function renderMobileAsideBtns(node, list) {

        const keys = Object.keys(list).filter((el) => list[el].length !== 0)
        const url = new URL(document.URL)
        const currentPost = url.searchParams.get('posts') ? url.searchParams.get('posts') : 'all'
        const sum = keys.reduce((acc, el) => acc + list[el].length, 0)
        let html = ''

        keys.forEach((key) => {
            html += `
                <span class="mobile-aside_btn-event ${currentPost === key ? 'active' : ''}" value="${key}">
                    ${lang[key]}
                </span>

            `
        })
        node.innerHTML = html
        const btns = document.querySelectorAll('.mobile-aside_btn-event')

        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function (e) {
                this.classList.add('active')

                const url = new URL(document.URL)
                const intersectionObserver = new IntersectionObserver((entries) => {
                    let [entry] = entries;
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            window.removeEventListener('scroll', (list) => ScrollHandler(Object.keys(list)))
                            window.addEventListener('scroll', (list) => ScrollHandler(Object.keys(list)));
                            renderNews()
                        }, 300)
                    }
                });
                intersectionObserver.observe(Notices.parentElement.querySelector('.section_title'));

                window.scrollTo({
                    top: Notices.parentElement.querySelector('.section_title').offsetTop,
                    behavior: 'smooth'
                })

                url.searchParams.set('posts', e.target.getAttribute('value'))
                window.history.replaceState({}, null, url.toString());
                renderMobileAsideBtns(node, list)
            })
        }
    }


    renderNews();

    animateProgressCircles(Circle2, mention.day_7);
    animateProgressCircles(Circle, mention.day_1);
    renderMention(Mention7Chart, mention.days, 'mention')
    renderMention(Mention, mention.hours)
    renderMobileAsideBtns(MobileAsideBlogBtns, list)

    window.removeEventListener('scroll', (list) => ScrollHandler(Object.keys(list)))
    window.addEventListener('scroll', (list) => ScrollHandler(Object.keys(list)));

    function ScrollHandler(ks) {
        last_known_scroll_position = window.scrollY;
        const url = new URL(document.URL)
        const currentPost = ks.includes(url.searchParams.get('posts')) ? url.searchParams.get('posts') : 'all'
        if (!ticking) {
            window.requestAnimationFrame(function () {
                getVerticalScrollPercentage(document.body, currentPost)
                ticking = false;
            });

            ticking = true;
        }
    }

    function getVerticalScrollPercentage(elm, currentPost) {
        const p = elm.parentNode
        const precent = Math.round((elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight) * 100)
        if (precent > 80) {
            console.log(precent, currentPost)
            paginate(currentPost)
        }
    }
}

function renderMobileCheckboxes(node, settings, title, lang, what) {

    let html = `<div class="group">
                    <p class="group_title">${title}</p>
                `
    const keys = json.settings['dict_' + what]

    let check = false
    if (what === "regions" && !Object.keys(settings).length) {
        check = true
        params['regions'] = params['dict_regions']
    }
    let checkbox = ``
    keys.forEach((key) => {
        checkbox += `
                    <div class="group_switch">
                        <label class=" switch">
                            <input class="switchevent" type="checkbox" value="${key}" ${check ? 'checked' : (settings[key]) ? `checked` : ''} name="${what}">
                            <span class="slider round"></span>
                        </label>
                        <p>${lang[key]}</p>
                    </div>
        `
    })
    html += `${checkbox}
    </div/`
    node.insertAdjacentHTML("afterbegin", html);
    // node.innerHTML += html


}

function renderCheckboxes(node, settings, title, lang, what) {
    let html = `<div class="group">
                    <p class="group_title">${title}</p>
                `
    const keys = json.settings['dict_' + what]
    let check = false
    if (what === "regions" && !Object.keys(settings).length) {
        check = true
        params['regions'] = params['dict_regions']
    }
    let checkbox = ``
    keys.forEach((key) => {
        checkbox += `
                    <div class="group_switch">
                        <label class=" switch">
                            <input class="switchevent" type="checkbox" value="${key}" ${check ? 'checked' : (settings[key]) ? `checked` : ''} name="${what}">
                            <span class="slider round"></span>
                        </label>
                        <p>${lang[key]}</p>
                    </div>
        `
    })
    html += `${checkbox}
    </div/`
    node.innerHTML += html

}

function CheckboxHandler(e, self) {
    const type = e.target.name
    const dictType = 'dict_' + type

    clearTimeout(timeout)
    if (e.target.checked) {
        params[type] = [...params[type], e.target.value]

    } else {
        params[type] = params[type].filter((el) => el !== e.target.value)
        if (!params[type].length) {
            params[type] = [...params[dictType]].filter((el) => el !== e.target.value)
            logicCheckboxes(self, 'allOn', e.target.value)
            timeout = setTimeout(() => {
                fetching().then(data => render(data))
            }, time)
            return
        }
    }
    logicCheckboxes(self, type, type)

    timeout = setTimeout(() => {
        fetching().then(data => render(data))
    }, time)

}

function logicCheckboxes(node, type, value) {
    //вкл кнопки ВСЕ
    if (type === 'allOn') {
        const all = node.parentElement.parentElement.parentElement.querySelectorAll('input')
        for (let j = 0; j < all.length; j++) {
            if (all[j].value !== value) {
                all[j].checked = true
            } else {
                all[j].checked = false
            }
        }
        return;
    }

    //выкл кнопки ВСЕ
    if (type === 'allOff') {
        const all = node.parentElement.parentElement.parentElement.querySelectorAll('input')
        for (let j = 0; j < all.length; j++) {
            if (all[j].value !== value) {
                all[j].checked = false
            }
        }
        return
    }

    const all = node.parentElement.parentElement.parentElement.querySelectorAll('input')
    for (let j = 0; j < all.length; j++) {
        if (all[j].value === type) {
            all[j].checked = false
        }
    }

}

function renderTableDate(table, query, lang) {
    table.innerHTML = ''
    if (query === 'top1') {
        table.innerHTML += `
                       <tr class="mention-24_header">
                            <th class="mention-24_th tableTitle">${lang.t_title}</th>
                            <th class="mention-24_th tableType">${lang.t_type}</th>
                            <th class="mention-24_th table24h">${lang.t_day}</th>
                        </tr>
                        <tr class="mention24_space h5">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
`
    }
    if (query === 'top7') {
        table.innerHTML += `
                        <tr class="mention-24_header">
                            <th class="mention-24_th tableTitle">${lang.t_title}</th>
                            <th class="mention-24_th tableType">${lang.t_type}</th>
                            <th class="mention-24_th table7">${lang.t_7d}</th>
                        </tr>
                        <tr class="mention24_space h5">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
`
    }

    if (!json[query]) {
        table.parentElement.remove();
        return
    }
    //Таблица
    table.innerHTML += '<tbody>'
    if (json[query].length) {
        json[query].forEach((row) => {
            const newRow = table.insertRow(-1);
            const spacing = table.insertRow(-1);
            newRow.classList.add("mention-24_tr");
            spacing.classList.add("mention24_space");
            Object.keys(row).forEach((key, i) => {
                const cellName = newRow.insertCell(-1);
                const cellEmpty = spacing.insertCell(-1);
                cellName.classList.add("mention-24_td");

                if (key === 'type') {
                    if ('tg_ch' === row[key] || row[key] === 'tg_gr') {
                        cellName.textContent = lang[row[key] + '2dig'].toUpperCase();
                    } else {
                        cellName.textContent = lang[row[key]].toUpperCase();
                    }
                } else {
                    if (i === 0) {
                        const re = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                        const res = re.test(row[key]);
                        if (res) {
                            const re = new RegExp(/(http(s)?:\/\/.)?(www\.)/g);
                            const res = re.test(row[key]);
                            if (res) {
                                cellName.innerHTML = `<a href="${row[key]}" class="header_links" target="_blank">${truncate(row[key].trim(), 15)}</a>`;
                                return;
                            }
                            cellName.innerHTML = `<a href="https://${row[key]}" class="header_links" target="_blank">${truncate(row[key].trim(), 15)}</a>`;
                            return;
                        }
                    }
                    cellName.textContent = truncate(row[key], 15);
                }
                newRow.appendChild(cellName);
                spacing.appendChild(cellEmpty);
            });

            table.appendChild(newRow);
            table.appendChild(spacing);

        });
        table.innerHTML += '</tbody>'
    } else {
        table.parentElement.remove();
    }
}

function renderMention(node, mention, title) {
    if (keyword.length > 20 && keyword.length < 25) {
        Keyword.style.fontSize = '14px';
    }
    if (keyword.length > 25) {
        Keyword.style.fontSize = '13px';
    }
    if (mention.every((el) => el === 0)) {
        node.parentElement.style.display = 'none';
    } else {
        node.parentElement.style.display = 'block';
        let max = Math.max(...mention);

        const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
        mention.forEach((hour, index, arr) => {
            let progress = +(((100 * hour) / max).toFixed(0))
            if (progress < 40 && progress !== 0) {
                progress += 10
            }

            node.innerHTML += `
                    <div class="mention_wrapper">
                    ${
                title ? `<span class="mention_hour">${days[index]}</span>` :
                    `<span class="mention_hour">${index}:00</span>`
            }
                        <div class="mention_progress">
                            <div class="mention_count" style="height:${progress}% "><span>${hour ? hour : ''}</span></div>
                        </div>
                    </div>
`;

        });
    }
}

function scanDataBtnHandler(e, btn, input) {
    btn.disabled = true
    document.title = 'Loading...'
    fetching(input.value).then((data) => render(data)).then(() => {
        document.title = 'Dashboard Media Scan'
        btn.disabled = false
    })
    e.preventDefault()
}

//Кнопки пойска
SearchButton.addEventListener('click', (e) => scanDataBtnHandler(e, SearchButton, SearchInput))
SearchButtonMobile.addEventListener('click', (e) => scanDataBtnHandler(e, SearchButtonMobile, SearchInputMobile))
SearchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.target.disabled = true
        SearchButton.disabled = true

        document.title = 'Loading...'
        fetching(event.target.value).then((data) => render(data)).then(() => {
            document.title = 'Document'
            event.target.disabled = false
            SearchButton.disabled = false
        })
    }

})

//Увелечение чисел
const charts = document.getElementsByClassName('mention_progress');
for (let i = 0; i < charts.length; i++) {
    charts[i].addEventListener('mousedown', function () {
        this.classList.add('active');
    });
    charts[i].addEventListener('mouseup', function () {
        this.classList.remove('active');
    });
    charts[i].addEventListener('mouseout', function () {
        this.classList.remove('active');
    });

    charts[i].addEventListener('pointerdown', function () {
        this.classList.add('active');
    });
    charts[i].addEventListener('pointerup', function () {
        this.classList.remove('active');
    });
    charts[i].addEventListener('pointerout', function () {
        this.classList.remove('active');
    });

}

let last_known_scroll_position = 0;
let ticking = false;




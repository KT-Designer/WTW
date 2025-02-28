// APIKEY
var apiKey = '0549031a42dea247dc96898cbeffd1d3';



// 搜尋功能(除了search.html以外的頁面)
$(document).ready(function () {
    const baseUrl = "https://api.themoviedb.org/3/search/multi";

    $("#searchForm").submit(function (event) {
        event.preventDefault();
        const query = $("#searchInput").val();
        if (query) {
            $.ajax({
                url: baseUrl,
                data: { api_key: apiKey, query: query, language: "zh-TW" },
                success: function (data) {
                    console.log("API 回傳資料:", data);
                    if (data.results && data.results.length > 0) {
                        localStorage.setItem("searchResults", JSON.stringify(data.results));
                        window.location.href = "search.html";
                    } else {
                        alert("搜不到結果...ಥ_ಥ"); //修改alert的內容。
                    }
                },
                error: function (error) {
                    console.error("發生錯誤：", error);
                    alert("搜尋時發生錯誤，請稍後再試。");
                }
            });
        }
    });
});






// 首頁_index.html
// 熱門電影(上映中)
$(document).ready(function () {
    var url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + apiKey + '&language=zh-TW&page=1';

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            updateCards(data.results.slice(0, 15)); // 只取前 15 個結果
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });

    function updateCards(results) {
        // 隨機排序結果
        results.sort(function () { return 0.5 - Math.random() });

        $('.swiper_movie').each(function (index, slide) { // 遍歷 swiper-slide 元素
            if (results[index]) {
                var title = results[index].title;
                var posterPath = results[index].poster_path;
                var posterUrl = posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : '../images/placeholder.png';
                var voteAverage = results[index].vote_average;
                var formattedVoteAverage = voteAverage ? voteAverage.toFixed(1) : 'N/A';
                var movieId = results[index].id;

                // 更新卡片內容
                $(slide).find('.card_img').attr('src', posterUrl);
                $(slide).find('.name').text(title);
                $(slide).find('.score').text(formattedVoteAverage);
                // 修改連結，加入 type=movie 參數
                $(slide).find('a').attr('href', 'html/info.html?id=' + movieId + '&type=movie');
            }
        });
    }
});




// 熱門韓劇(8個月內)
$(document).ready(function () {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth(); // 0-11

    // 計算半年前的日期
    var sixMonthsAgoYear = currentYear;
    var sixMonthsAgoMonth = currentMonth - 8;
    if (sixMonthsAgoMonth < 0) {
        sixMonthsAgoYear--;
        sixMonthsAgoMonth += 12;
    }

    // 格式化日期為YYYY-MM-DD
    var startDate = sixMonthsAgoYear + '-' + String(sixMonthsAgoMonth + 1).padStart(2, '0') + '-01';

    var url = 'https://api.themoviedb.org/3/discover/tv?api_key=' + apiKey + '&language=zh-TW&sort_by=popularity.desc&with_original_language=ko&first_air_date.gte=' + startDate + '&include_null_first_air_dates=false';

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            updateCards(data.results.slice(0, 15)); // 只取前 15 個結果
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });

    function updateCards(results) {
        // 隨機排序結果
        results.sort(function () { return 0.5 - Math.random() });

        $('.swiper_korean').each(function (index, slide) { // 遍歷 swiper-slide 元素
            if (results[index]) {
                var title = results[index].name;
                var posterPath = results[index].poster_path;
                var posterUrl = posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : '../images/placeholder.png';
                var voteAverage = results[index].vote_average;
                var formattedVoteAverage = voteAverage ? voteAverage.toFixed(1) : 'N/A';
                var showId = results[index].id;

                // 更新卡片內容
                $(slide).find('.card_img').attr('src', posterUrl);
                $(slide).find('.name').text(title);
                $(slide).find('.score').text(formattedVoteAverage);
                // 修改連結，加入 type=tv 參數
                $(slide).find('a').attr('href', 'html/info.html?id=' + showId + '&type=tv');
            }
        });
    }
});











// 熱門陸劇/台劇(今年)
$(document).ready(function () {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var startDate = currentYear + "-01-01";

    var url = 'https://api.themoviedb.org/3/discover/tv?api_key=' + apiKey + '&language=zh-TW&sort_by=popularity.desc&with_original_language=zh&first_air_date.gte=' + startDate + '&include_null_first_air_dates=false&with_genres=18';

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            updateCards(data.results.slice(0, 15)); // 只取前 15 個結果
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });

    function updateCards(results) {
        // 隨機排序結果
        results.sort(function () { return 0.5 - Math.random() });

        $('.swiper_china').each(function (index, slide) { // 遍歷 swiper-slide 元素
            if (results[index]) {
                var title = results[index].name;
                var posterPath = results[index].poster_path;
                var posterUrl = posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : '../images/placeholder.png';
                var voteAverage = results[index].vote_average;
                var formattedVoteAverage = voteAverage ? voteAverage.toFixed(1) : 'N/A';
                var showId = results[index].id;

                // 更新卡片內容
                $(slide).find('.card_img').attr('src', posterUrl);
                $(slide).find('.name').text(title);
                $(slide).find('.score').text(formattedVoteAverage);
                // 修改連結，加入 type=tv 參數
                $(slide).find('a').attr('href', 'html/info.html?id=' + showId + '&type=tv');
            }
        });
    }
});


// 熱門美劇(半年內)
$(document).ready(function () {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth(); // 0-11

    // 計算半年前的日期
    var sixMonthsAgoYear = currentYear;
    var sixMonthsAgoMonth = currentMonth - 6;
    if (sixMonthsAgoMonth < 0) {
        sixMonthsAgoYear--;
        sixMonthsAgoMonth += 12;
    }

    // 格式化日期為YYYY-MM-DD
    var startDate = sixMonthsAgoYear + '-' + String(sixMonthsAgoMonth + 1).padStart(2, '0') + '-01';

    var url = 'https://api.themoviedb.org/3/discover/tv?api_key=' + apiKey + '&language=zh-TW&sort_by=popularity.desc&with_original_language=en&first_air_date.gte=' + startDate + '&include_null_first_air_dates=false&with_genres=18';

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            updateCards(data.results.slice(0, 15)); // 只取前 15 個結果
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });

    function updateCards(results) {
        // 隨機排序結果
        results.sort(function () { return 0.5 - Math.random() });

        $('.swiper_usa').each(function (index, slide) { // 遍歷 swiper-slide 元素
            if (results[index]) {
                var title = results[index].name;
                var posterPath = results[index].poster_path;
                var posterUrl = posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : '../images/placeholder.png';
                var voteAverage = results[index].vote_average;
                var formattedVoteAverage = voteAverage ? voteAverage.toFixed(1) : 'N/A';
                var showId = results[index].id;

                // 更新卡片內容
                $(slide).find('.card_img').attr('src', posterUrl);
                $(slide).find('.name').text(title);
                $(slide).find('.score').text(formattedVoteAverage);
                // 修改連結，加入 type=tv 參數
                $(slide).find('a').attr('href', 'html/info.html?id=' + showId + '&type=tv');
            }
        });
    }
});





// 熱門動畫(半年內)
$(document).ready(function () {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth(); // 0-11

    // 計算半年前的日期
    var sixMonthsAgoYear = currentYear;
    var sixMonthsAgoMonth = currentMonth - 6;
    if (sixMonthsAgoMonth < 0) {
        sixMonthsAgoYear--;
        sixMonthsAgoMonth += 12;
    }

    // 格式化日期為YYYY-MM-DD
    var startDate = sixMonthsAgoYear + '-' + String(sixMonthsAgoMonth + 1).padStart(2, '0') + '-01';

    var url = 'https://api.themoviedb.org/3/discover/tv?api_key=' + apiKey + '&language=zh-TW&sort_by=popularity.desc&with_genres=16&first_air_date.gte=' + startDate + '&include_null_first_air_dates=false';

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            updateCards(data.results.slice(0, 15)); // 只取前 15 個結果
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });

    function updateCards(results) {
        // 隨機排序結果
        results.sort(function () { return 0.5 - Math.random() });

        $('.swiper_anime').each(function (index, slide) { // 遍歷 swiper-slide 元素
            if (results[index]) {
                var title = results[index].name;
                var posterPath = results[index].poster_path;
                var posterUrl = posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : 'images/placeholder_actor.png';
                var voteAverage = results[index].vote_average;
                var formattedVoteAverage = voteAverage ? voteAverage.toFixed(1) : 'N/A';
                var showId = results[index].id;

                // 更新卡片內容
                $(slide).find('.card_img').attr('src', posterUrl);
                $(slide).find('.name').text(title);
                $(slide).find('.score').text(formattedVoteAverage);
                // 修改連結，加入 type=tv 參數
                $(slide).find('a').attr('href', 'html/info.html?id=' + showId + '&type=tv');
            }
        });
    }
});



// 詳情頁_info.html
// PC版
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const showId = urlParams.get('id');
    const mediaType = urlParams.get('type');

    if (showId && mediaType) {
        let url;
        if (mediaType === 'tv') {
            url = `https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}&language=zh-TW`;
        } else if (mediaType === 'movie') {
            url = `https://api.themoviedb.org/3/movie/${showId}?api_key=${apiKey}&language=zh-TW`;
        } else {
            $('.information').html('<p>未知的媒體類型</p>');
            return;
        }

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                updateInfo(data, mediaType, data.genres);
            },
            error: function (error) {
                console.error('Error:', error);
                $('.information').html('<p>無法取得影片資訊</p>');
            }
        });
    } else {
        $('.information').html('<p>未提供影片 ID 或媒體類型</p>');
    }

    function updateInfo(data, mediaType, genresData) {
        const posterUrl = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '../images/placeholder.jpg';
        let releaseDate, country, duration, director;

        // 國家/地區代碼對應表
        const countryCodes = {
            US: '美國',
            CN: '中國',
            KR: '韓國',
            JP: '日本',
            GB: '英國',
            FR: '法國',
            DE: '德國',
            CA: '加拿大',
            AU: '澳大利亞',
            TH: '泰國',
            ES: '西班牙',
            TW: '台灣',
            TR: '土耳其',
            HK: '香港',
            IN: '印度',
            IT: '意大利',
            RU: '俄羅斯',
            BR: '巴西',
            MX: '墨西哥',
            SE: '瑞典',
            NL: '荷蘭',
            BE: '比利時',
            CH: '瑞士',
            NO: '挪威',
            DK: '丹麥',
            FI: '芬蘭',
            PT: '葡萄牙',
            AR: '阿根廷',
            ZA: '南非',
            NZ: '紐西蘭',
            IE: '愛爾蘭',
            PL: '波蘭',
            ID: '印尼',
            MY: '馬來西亞',
            PH: '菲律賓',
            SG: '新加坡',
            VN: '越南',
            AE: '阿拉伯聯合大公國',
            IL: '以色列',
            SA: '沙烏地阿拉伯',
            EG: '埃及',
            NG: '奈及利亞'
            // 添加更多國家/地區代碼和名稱
        };

        let countryNames = [];

        if (mediaType === 'tv') {
            releaseDate = data.first_air_date || 'N/A';
            if (data.origin_country) {
                countryNames = data.origin_country.map(code => countryCodes[code] || code);
            } else {
                countryNames = ['N/A'];
            }
            duration = data.episode_run_time ? `${data.episode_run_time[0]} 分鐘` : '未知';
            director = data.created_by && data.created_by.length > 0 ? data.created_by[0].name : '未知';
        } else if (mediaType === 'movie') {
            releaseDate = data.release_date || 'N/A';
            if (data.production_countries) {
                countryNames = data.production_countries.map(c => countryCodes[c.iso_3166_1] || c.iso_3166_1);
            } else {
                countryNames = ['N/A'];
            }
            duration = data.runtime ? `${data.runtime} 分鐘` : '未知';
            director = data.credits && data.credits.crew ? data.credits.crew.find(c => c.job === 'Director')?.name || '未知' : '未知';
        }

        // 類型名稱對應表
        const genreCodes = {
            '动作': '動作',
            '喜剧': '喜劇',
            '科幻': '科幻',
            '恐怖': '恐怖',
            '爱情': '愛情',
            '动画': '動畫',
            '剧情': '劇情',
            '悬疑': '懸疑',
            '惊悚': '驚悚',
            '动作冒险': '動作冒險',
            '冒险': '冒險',
            'Sci-Fi & Fantasy': '科幻奇幻',
            '儿童': '兒童',
            '纪录': '記錄',
            '历史': '歷史',
            '音乐': '音樂',
            '战争': '戰爭',
            '电视电影': '電視電影',
            '新闻': '新聞',
            '肥皂剧': '肥皂剧',
            // 添加更多類型名稱對應
        };

        let genres = genresData.map(genre => genreCodes[genre.name] || genre.name); // 轉換類型名稱

        genres = genres.map(name => `<a href="">${name}</a>`).join('');

        $('.card').attr('src', posterUrl);
        $('.style').html(genres);
        $('.name h2').text(data.name || data.title);
        document.title = data.name || data.title;
        $('.name h1').text(data.vote_average.toFixed(1));
        $('.year .data').eq(0).text(releaseDate);
        $('.year h3').eq(1).text(countryNames.join(', '));
        $('.year h3').eq(2).text(duration);
        $('.dir .name').text(director);
        $('.story p').text(data.overview);

        const creditsUrl = mediaType === 'tv' ? `https://api.themoviedb.org/3/tv/${showId}/credits?api_key=${apiKey}&language=zh-TW` : `https://api.themoviedb.org/3/movie/${showId}/credits?api_key=${apiKey}&language=zh-TW`;

        $.ajax({
            url: creditsUrl,
            type: 'GET',
            dataType: 'json',
            success: function (creditsData) {
                const actors = creditsData.cast.slice(0, 10).map(actor => {
                    const profilePic = actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : '../images/placeholder.png'; // 使用 placeholder.png

                    return `
                        <div class="actor">
                            <a href=""><img src="${profilePic}" alt="${actor.name}"></a>
                            <p>${actor.name}</p>
                        </div>
                    `;
                }).join('');
                $('.actors').html(actors);
            },
            error: function (error) {
                console.error('Error:', error);
                $('.actors').html('<p>無演員資訊</p>');
            }
        });

        const providersUrl = mediaType === 'tv'
            ? `https://api.themoviedb.org/3/tv/${showId}/watch/providers?api_key=${apiKey}`
            : `https://api.themoviedb.org/3/movie/${showId}/watch/providers?api_key=${apiKey}`;

        $.ajax({
            url: providersUrl,
            type: 'GET',
            dataType: 'json',
            success: function (providersData) {
                console.log('Providers Data:', providersData);
                displayProviders(providersData.results.TW, data.homepage); // 假設您要顯示台灣的串流平台
            },
            error: function (error) {
                console.error('Error fetching providers data:', error);
                $('.streaming_pcbox').append('<p>無相關串流平台</p>');
            }
        });

    }

    function displayProviders(providers, homepage) {
        if (providers && providers.flatrate) {
            const providersHtml = providers.flatrate.map(provider => `
                <div class="streaming_icon">
                    <a target="_blank" href="${homepage || provider.link}">
                        <img src="https://image.tmdb.org/t/p/w500${provider.logo_path}" alt="${provider.provider_name}">
                    </a>
                </div>
            `).join('');
            $('.streaming_pcbox').append(providersHtml);
        } else {
            $('.streaming_pcbox').append('<p>無相關串流平台</p>');
        }
    }
});






// MB版
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const showId = urlParams.get('id');
    const mediaType = urlParams.get('type');


    if (showId && mediaType) {
        const url = mediaType === 'tv'
            ? `https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}&language=zh-TW`
            : `https://api.themoviedb.org/3/movie/${showId}?api_key=${apiKey}&language=zh-TW`;

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                updateInfo(data, mediaType);
            },
            error: function (error) {
                console.error('Error fetching movie/TV info:', error);
                $('.info_MB').html('<p>無法取得影片資訊</p>');
            }
        });
    } else {
        $('.info_MB').html('<p>未提供影片 ID 或媒體類型</p>');
    }

    function updateInfo(data, mediaType) {
        console.log('showId:', showId, 'mediaType:', mediaType, 'data:', data);

        const backdropUrl = data.backdrop_path
            ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
            : '../images/info_MB0.png'; // 使用預設圖片

        $('.cover_MB img').attr('src', backdropUrl);


        // 類型名稱對應表
        const genreCodes = {
            '动作': '動作',
            '喜剧': '喜劇',
            '科幻': '科幻',
            '恐怖': '恐怖',
            '爱情': '愛情',
            '动画': '動畫',
            '剧情': '劇情',
            '悬疑': '懸疑',
            '惊悚': '驚悚',
            '动作冒险': '動作冒險',
            '冒险': '冒險',
            'Sci-Fi & Fantasy': '科幻奇幻',
            '儿童': '兒童',
            '纪录': '記錄',
            '历史': '歷史',
            '音乐': '音樂',
            '战争': '戰爭',
            '电视电影': '電視電影',
            '新闻': '新聞',
            '肥皂剧': '肥皂剧',
            // 添加更多類型名稱對應
        };

        let genres = data.genres.map(genre => genreCodes[genre.name] || genre.name); // 轉換類型名稱
        genres = genres.map(name => `<a href="">${name}</a>`).join('');

        let releaseDate, country, duration, director;

        // 國家/地區代碼對應表
        const countryCodes = {
            US: '美國',
            CN: '中國',
            KR: '韓國',
            JP: '日本',
            GB: '英國',
            FR: '法國',
            DE: '德國',
            CA: '加拿大',
            AU: '澳大利亞',
            TH: '泰國',
            ES: '西班牙',
            TW: '台灣',
            TR: '土耳其',
            HK: '香港',
            IN: '印度',
            IT: '意大利',
            RU: '俄羅斯',
            BR: '巴西',
            MX: '墨西哥',
            SE: '瑞典',
            NL: '荷蘭',
            BE: '比利時',
            CH: '瑞士',
            NO: '挪威',
            DK: '丹麥',
            FI: '芬蘭',
            PT: '葡萄牙',
            AR: '阿根廷',
            ZA: '南非',
            NZ: '紐西蘭',
            IE: '愛爾蘭',
            PL: '波蘭',
            ID: '印尼',
            MY: '馬來西亞',
            PH: '菲律賓',
            SG: '新加坡',
            VN: '越南',
            AE: '阿拉伯聯合大公國',
            IL: '以色列',
            SA: '沙烏地阿拉伯',
            EG: '埃及',
            NG: '奈及利亞'
        };

        let countryNames = [];

        if (mediaType === 'tv') {
            releaseDate = data.first_air_date || 'N/A';
            if (data.origin_country) {
                countryNames = data.origin_country.map(code => countryCodes[code] || code);
            } else {
                countryNames = ['N/A'];
            }
            duration = data.episode_run_time ? `${data.episode_run_time[0]} 分鐘` : '未知';
            director = data.created_by && data.created_by.length > 0 ? data.created_by[0].name : '未知';
        } else {
            releaseDate = data.release_date || 'N/A';
            if (data.production_countries) {
                countryNames = data.production_countries.map(c => countryCodes[c.iso_3166_1] || c.iso_3166_1);
            } else {
                countryNames = ['N/A'];
            }
            duration = data.runtime ? `${data.runtime} 分鐘` : '未知';
            director = data.credits && data.credits.crew ? data.credits.crew.find(c => c.job === 'Director')?.name || '未知' : '未知';
        }

        $('.style_MB').html(genres);
        $('.title_MB').text(data.name || data.title);
        document.title = data.name || data.title;
        $('.rating_MB').text(data.vote_average.toFixed(1));
        $('.data_MB').eq(0).text(releaseDate);
        $('.year_MB h3').eq(1).text(countryNames.join(', '));
        $('.year_MB h3').eq(2).text(duration);
        $('.dir_MB .name').text(director);
        $('.story_MB p').text(data.overview);

        const creditsUrl = mediaType === 'tv'
            ? `https://api.themoviedb.org/3/tv/${showId}/credits?api_key=${apiKey}&language=zh-TW`
            : `https://api.themoviedb.org/3/movie/${showId}/credits?api_key=${apiKey}&language=zh-TW`;

        var swiperactors = null;

        $.ajax({
            url: creditsUrl,
            type: 'GET',
            dataType: 'json',
            success: function (creditsData) {
                console.log('creditsData:', creditsData);

                if (creditsData.cast && creditsData.cast.length > 0) {
                    const actors = creditsData.cast.slice(0, 10).map(actor => {
                        const profilePath = actor.profile_path
                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                            : '../images/placeholder.png';
                        return `
                            <div class="swiper-slide"> <div class="actor_MB">
                                <a href=""><img src="${profilePath}" alt="${actor.name}"></a>
                                <p class="name">${actor.name}</p>
                            </div>
                        </div>
                        `;
                    }).join('');
                    console.log('actors:', actors);
                    $('#actors .swiper-wrapper').html(actors).show();

                    if (swiperactors === null) {
                        swiperactors = new Swiper("#actors", {
                            slidesPerView: 4.5,
                            spaceBetween: 10,
                        });
                    }

                } else {
                    $('#actors .swiper-wrapper').html('<p>無演員資訊</p>');
                }
            },
            error: function (error) {
                console.error('Error fetching credits data:', error);
                $('#actors .swiper-wrapper').html('<p>無演員資訊</p>');
            }
        });

        const providersUrl = mediaType === 'tv'
            ? `https://api.themoviedb.org/3/tv/${showId}/watch/providers?api_key=${apiKey}`
            : `https://api.themoviedb.org/3/movie/${showId}/watch/providers?api_key=${apiKey}`;

        $.ajax({
            url: providersUrl,
            type: 'GET',
            dataType: 'json',
            success: function (providersData) {
                console.log('Providers Data:', providersData);
                if (providersData.results && providersData.results.TW) {
                    displayProviders(providersData.results.TW, data.homepage); // 假設您要顯示台灣的串流平台
                } else {
                    $('.streaming_mbbox').append('<p>無相關串流平台</p>');
                }
            },
            error: function (error) {
                console.error('Error fetching providers data:', error);
                $('.streaming_mbbox').append('<p>無法取得串流平台資訊</p>');
            }
        });

    }

    function displayProviders(providers, homepage) {
        if (providers && providers.flatrate) {
            const providersHtml = providers.flatrate.map(provider => `
            <div class="streaming_icon_MB">
                    <a target="_blank" href="${homepage || provider.link}">
                        <img src="https://image.tmdb.org/t/p/w500${provider.logo_path}" alt="${provider.provider_name}">
                    </a>
                </div>
        



                
            `).join('');
            $('.streaming_mbbox').append(providersHtml);
        } else {
            $('.streaming_mbbox').append('<p>無相關串流平台</p>');
        }
    }
});


// 相關影片
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const showId = urlParams.get('id');
    const mediaType = urlParams.get('type');

    if (showId && mediaType) {
        const url = mediaType === 'tv'
            ? `https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}&language=zh-TW`
            : `https://api.themoviedb.org/3/movie/${showId}?api_key=${apiKey}&language=zh-TW`;

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                updateInfo(data, mediaType);
            },
            error: function (error) {
                console.error('Error fetching movie/TV info:', error);
                $('.info_MB').html('<p>無法取得影片資訊</p>');
            }
        });
    } else {
        $('.info_MB').html('<p>未提供影片 ID 或媒體類型</p>');
    }

    function updateInfo(data, mediaType) {
        console.log('showId:', showId, 'mediaType:', mediaType, 'data:', data);

        const backdropUrl = data.backdrop_path
            ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
            : '../images/placeholder-backdrop.jpg';

        $('.cover_MB img').attr('src', backdropUrl);

        // ... (其他基本資訊更新程式碼)

        // 獲取類似影片/電視節目
        getSimilarMedia(showId, mediaType);
    }

    function getSimilarMedia(showId, mediaType) {
        const timestamp = Date.now(); // 新增時間戳記
        const similarUrl = mediaType === 'tv'
            ? `https://api.themoviedb.org/3/tv/${showId}/similar?api_key=${apiKey}&language=zh-TW&timestamp=${timestamp}`
            : `https://api.themoviedb.org/3/movie/${showId}/similar?api_key=${apiKey}&language=zh-TW&timestamp=${timestamp}`;

        $.ajax({
            url: similarUrl,
            type: 'GET',
            dataType: 'json',
            success: function (similarData) {
                console.log('Similar Media Data:', similarData);
                displaySimilarMedia(similarData.results);
            },
            error: function (error) {
                console.error('Error fetching similar media data:', error);
                $('#otherfilm .swiper-wrapper').html('<p>無法取得相關影片資訊</p>');
            }
        });
    }

    function displaySimilarMedia(similarResults) {
        let similarHtml = '';
        if (similarResults && similarResults.length > 0) {
            similarResults.forEach(media => {
                // 檢查影片名稱是否包含中文或英文字符
                if (containsChineseOrEnglish(media.title || media.name)) {
                    const posterUrl = media.poster_path
                        ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
                        : '../images/placeholder.png';
                    similarHtml += `
                        <div class="swiper-slide">
                            <div class="card">
                                <div class="picbox">
                                    <a href="?id=${media.id}&type=${mediaType}">
                                        <img class="card_img" src="${posterUrl}" alt="${media.title || media.name}">
                                    </a>
                                    <p class="score">${media.vote_average.toFixed(1)}</p>
                                </div>
                                <p class="name">${media.title || media.name}</p>
                            </div>
                        </div>
                    `;
                }
            });
            $('#otherfilm .swiper-wrapper').html(similarHtml);
            $('#otherfilm h1').text(mediaType === 'tv' ? '相關影片' : '相關影片'); // 動態標題
        } else {
            $('#otherfilm .swiper-wrapper').html('<p style="color: #C10171; font-family: \'Noto Sans TC\';">無相關影片</p>');
        }
    }

    // 檢查字串是否包含中文或英文字符
    function containsChineseOrEnglish(str) {
        if (!str) return false;
        return /[\u4e00-\u9fa5a-zA-Z]/.test(str);
    }
});







// 電影頁_movie.html
$(document).ready(function () {
    var allResults = [];
    var totalPages = 1;
    var currentPage = 1;
    var resultsPerPage = 20; // 每頁顯示的結果數量

    function containsChineseOrEnglish(str) {
        if (!str) return false;
        return /[\u4e00-\u9fa5a-zA-Z]/.test(str);
    }

    function fetchPage(page) {
        console.log('fetchPage: 正在載入第', page, '頁，總頁數：', totalPages);
        var url = 'https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey + '&language=zh-TW&page=' + page;

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log('fetchPage: 第', page, '頁載入成功：', data);
                if (!data || !data.results || !Array.isArray(data.results)) {
                    console.error('API 回傳資料格式錯誤或缺少結果。', data);
                    $('.loading').text('載入失敗');
                    $('.loading').prop('disabled', false);
                    return; // 終止函式執行
                }
                if (page === 1) {
                    allResults = data.results;
                    console.log('fetchPage: 第一頁，清空 allResults 並更新。');
                } else {
                    allResults = allResults.concat(data.results);
                    console.log('fetchPage: 第', page, '頁，將新資料加入 allResults。');
                }
                totalPages = data.total_pages;
                console.log('fetchPage: 更新總頁數為：', totalPages);
                displayFilteredResults(allResults);
                if (currentPage >= totalPages) {
                    $('.loading').hide();
                    console.log('fetchPage: 已達到最大頁數，隱藏載入更多按鈕。');
                }
            },
            error: function (error) {
                console.error('fetchPage: 發生錯誤：', error);
                $('.loading').text('載入失敗，重試');
                $('.loading').prop('disabled', false);
            },
            complete: function () {
                $('.loading').prop('disabled', false);
            }
        });
    }

    function fetchInitialPages() {
        var initialPagesToLoad = 2;
        console.log('fetchInitialPages: 初始載入前', initialPagesToLoad, '頁。');
        for (let i = 1; i <= initialPagesToLoad; i++) {
            fetchPage(i);
        }
    }

    fetchInitialPages();

    function displayResults(results) {
        console.log('displayResults: 顯示結果：', results);
        var resultsContainer = $('#movie');
        resultsContainer.empty();

        if (results.length === 0) {
            resultsContainer.append('<p class="notfound">搜不到結果...ಥ_ಥ</p>');
            return;
        }

        $.each(results, function (index, movie) {
            var title = movie.title;
            var posterPath = movie.poster_path;
            var posterUrl = posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : '../images/placeholder.png';
            var voteAverage = movie.vote_average;
            var formattedVoteAverage = voteAverage ? voteAverage.toFixed(1) : 'N/A';
            var movieId = movie.id;

            var resultHtml = `
                <li class="card">
                    <div class="container">
                        <a href="info.html?id=${movieId}&type=movie">
                            <img src="${posterUrl}" alt="${title} 海報">
                        </a>
                        <p class="score">${formattedVoteAverage}</p>
                    </div>
                    <p class="name">${title}</p>
                </li>
            `;
            resultsContainer.append(resultHtml);
        });
    }

    $('.loading').click(function () {
        console.log('載入更多按鈕被點擊，當前頁數：', currentPage);
        if (currentPage < totalPages) {
            $(this).text('載入更多');
            $(this).prop('disabled', true);
            currentPage++;
            fetchPage(currentPage);
        } else {
            console.log('已達到最大頁數，無法載入更多。');
        }
    });

    const classItems = document.querySelectorAll('.class-item');
    const yearItems = document.querySelectorAll('.year-item');
    const searchButton = document.querySelector('.search');

    let selectedClass = '全部';
    let selectedYear = '全部';
    let selectedScore = [0, 10];

    classItems.forEach(item => {
        item.addEventListener('click', () => {
            classItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            selectedClass = item.textContent;
            displayFilteredResults(allResults);
        });
    });

    yearItems.forEach(item => {
        item.addEventListener('click', () => {
            yearItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            selectedYear = item.textContent;
            displayFilteredResults(allResults);
        });
    });

    $("#range_movie").slider({
        range: "min",
        min: 0,
        max: 10,
        value: 3,
        slide: function (e, ui) {
            $(".ui-slider-handle").html(ui.value);
            selectedScore = [ui.value, 10];
            displayFilteredResults(allResults);
        },
    });

    $(".ui-slider-handle").html("3");

    searchButton.addEventListener('click', () => {
        displayFilteredResults(allResults);
    });

    function displayFilteredResults(results) {
        console.log('displayFilteredResults: 篩選前的結果：', results);
        let filteredResults = results.filter(movie => {
            // 類型篩選
            if (selectedClass !== '全部') {
                const genreMap = {
                    '動作': 28,
                    '冒險': 12,
                    '劇情': 18,
                    '動畫': 16,
                    '歷史': 36,
                    '喜劇': 35,
                    '奇幻': 14,
                    '家庭': 10751,
                    '恐怖': 27,
                    '懸疑': 9648,
                    '驚悚': 53,
                    '戰爭': 10752,
                    '愛情': 10749,
                    '犯罪': 80,
                    '電視電影': 10770,
                    '科幻': 878,
                    '記錄': 99,
                    '西部': 37,
                    '音樂': 10402,
                };
                if (!movie.genre_ids.includes(genreMap[selectedClass])) {
                    return false;
                }
            }

            // 年份篩選
            if (selectedYear !== '全部' && movie.release_date && movie.release_date.substring(0, 4) !== selectedYear) {
                return false;
            }

            // 評分篩選
            if (!(movie.vote_average >= selectedScore[0] && movie.vote_average <= selectedScore[1])) {
                return false;
            }

            // 片名篩選 (新增)
            if (!containsChineseOrEnglish(movie.title)) {
                return false;
            }

            return true;
        });

        console.log('displayFilteredResults: 篩選後的結果：', filteredResults);
        displayResults(filteredResults);
    }
});













// 影劇頁_drmam.html
$(document).ready(function () {
    var allTVShows = [];
    var totalPages = 1;
    var currentPage = 1;
    var resultsPerPage = 20;

    function containsChineseOrEnglish(str) {
        if (!str) return false;
        return /[\u4e00-\u9fa5a-zA-Z]/.test(str);
    }

    function fetchTVShowsPage(page) {
        console.log('fetchTVShowsPage: 正在載入第', page, '頁，總頁數：', totalPages);
        var url = 'https://api.themoviedb.org/3/tv/popular?api_key=' + apiKey + '&language=zh-TW&page=' + page;

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log('fetchTVShowsPage: 第', page, '頁載入成功：', data);
                if (!data || !data.results || !Array.isArray(data.results)) {
                    console.error('API 回傳資料格式錯誤或缺少結果。', data);
                    $('.loading').text('載入失敗');
                    $('.loading').prop('disabled', false);
                    return;
                }
                if (page === 1) {
                    allTVShows = data.results;
                    console.log('fetchTVShowsPage: 第一頁，清空 allTVShows 並更新。');
                } else {
                    allTVShows = allTVShows.concat(data.results);
                    console.log('fetchTVShowsPage: 第', page, '頁，將新資料加入 allTVShows。');
                }
                totalPages = data.total_pages;
                console.log('fetchTVShowsPage: 更新總頁數為：', totalPages);
                displayFilteredTVShows(allTVShows);
                if (currentPage >= totalPages) {
                    $('.loading').hide();
                    console.log('fetchTVShowsPage: 已達到最大頁數，隱藏載入更多按鈕。');
                }
            },
            error: function (error) {
                console.error('fetchTVShowsPage: 發生錯誤：', error);
                $('.loading').text('載入失敗，重試');
                $('.loading').prop('disabled', false);
            },
            complete: function () {
                $('.loading').prop('disabled', false);
            }
        });
    }

    function fetchInitialTVShowsPages() {
        var initialPagesToLoad = 2;
        console.log('fetchInitialTVShowsPages: 初始載入前', initialPagesToLoad, '頁。');
        for (let i = 1; i <= initialPagesToLoad; i++) {
            fetchTVShowsPage(i);
        }
    }

    fetchInitialTVShowsPages();

    function displayTVShows(tvShows) {
        console.log('displayTVShows: 顯示結果：', tvShows);
        var resultsContainer = $('#drama');
        resultsContainer.empty();

        if (tvShows.length === 0) {
            resultsContainer.append('<p class="notfound">搜不到結果...ಥ_ಥ</p>');
            return;
        }

        $.each(tvShows, function (index, tvShow) {
            var name = tvShow.name;
            var posterPath = tvShow.poster_path;
            var posterUrl = posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : '../images/placeholder.png';
            var voteAverage = tvShow.vote_average;
            var formattedVoteAverage = voteAverage ? voteAverage.toFixed(1) : 'N/A';
            var tvShowId = tvShow.id;

            var resultHtml = `
                <li class="card">
                    <div class="container">
                        <a href="info.html?id=${tvShowId}&type=tv">
                            <img src="${posterUrl}" alt="${name} 海報">
                        </a>
                        <p class="score">${formattedVoteAverage}</p>
                    </div>
                    <p class="name">${name}</p>
                </li>
            `;
            resultsContainer.append(resultHtml);
        });
    }

    $('.loading').click(function () {
        console.log('載入更多按鈕被點擊，當前頁數：', currentPage);
        if (currentPage < totalPages) {
            $(this).text('載入更多');
            $(this).prop('disabled', true);
            currentPage++;
            fetchTVShowsPage(currentPage);
        } else {
            console.log('已達到最大頁數，無法載入更多。');
        }
    });

    const classItems = document.querySelectorAll('.class-item');
    const yearItems = document.querySelectorAll('.year-item');
    const searchButton = document.querySelector('.search');

    let selectedClass = '全部';
    let selectedYear = '全部';
    let selectedScore = [0, 10];

    classItems.forEach(item => {
        item.addEventListener('click', () => {
            classItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            selectedClass = item.textContent;
            displayFilteredTVShows(allTVShows);
        });
    });

    yearItems.forEach(item => {
        item.addEventListener('click', () => {
            yearItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            selectedYear = item.textContent;
            displayFilteredTVShows(allTVShows);
        });
    });

    $("#range_drama").slider({
        range: "min",
        min: 0,
        max: 10,
        value: 3,
        slide: function (e, ui) {
            $(".ui-slider-handle").html(ui.value);
            selectedScore = [ui.value, 10];
            displayFilteredTVShows(allTVShows);
        },
    });

    $(".ui-slider-handle").html("3");

    searchButton.addEventListener('click', () => {
        displayFilteredTVShows(allTVShows);
    });

    function displayFilteredTVShows(tvShows) {
        console.log('displayFilteredTVShows: 篩選前的結果：', tvShows);
        let filteredTVShows = tvShows.filter(tvShow => {
            if (selectedClass !== '全部') {
                const genreMap = {
                    '科幻奇幻': [10765, 10759],
                    '戰爭': 10768,
                    '兒童': 10762,
                    '劇情': 18,
                    '動作': 10759,
                    '動畫': 16,
                    '喜劇': 35,
                    '家庭': 10751,
                    '懸疑': 9648,
                    '新聞': 10763,
                    '犯罪': 80,
                    '真人秀': 10764,
                    '記錄': 99,
                    '肥皂劇': 10766,
                    '脫口秀': 10767,
                    '西部': 37
                };
                const selectedGenres = genreMap[selectedClass];
                if (Array.isArray(selectedGenres)) {
                    if (!selectedGenres.some(genreId => tvShow.genre_ids.includes(genreId))) {
                        return false;
                    }
                } else if (!tvShow.genre_ids.includes(selectedGenres)) {
                    return false;
                }
            }

            if (selectedYear !== '全部' && tvShow.first_air_date && tvShow.first_air_date.substring(0, 4) !== selectedYear) {
                return false;
            }

            if (!(tvShow.vote_average >= selectedScore[0] && tvShow.vote_average <= selectedScore[1])) {
                return false;
            }

            // 電視劇名稱篩選
            if (!containsChineseOrEnglish(tvShow.name)) {
                return false;
            }

            // 排除 "Geren 16"
            if (tvShow.name === "Geren 16") {
                return false;
            }

            return true;
        });

        console.log('displayFilteredTVShows: 篩選後的結果：', filteredTVShows);
        displayTVShows(filteredTVShows);
    }
});




// 主題館
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme');
    const resultsContainer = $('#style_love');

    let apiUrl;
    let mediaType;

    switch (theme) {
        case 'love':
            apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10749&language=zh-TW`;
            mediaType = 'movie';
            break;
        case 'korean':
            apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_networks=213&with_original_language=ko&language=zh-TW`; // 修改 apiUrl
            mediaType = 'tv';
            break;
        case 'comedy':
            apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35&without_genres=16&language=zh-TW`;
            mediaType = 'movie';
            break;
        case 'horror':
            apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27,53&language=zh-TW`;
            mediaType = 'movie';
            break;
        case 'suspense':
            apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=9648,53&language=zh-TW`;
            mediaType = 'movie';
            break;
        case 'action':
            apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&without_genres=16&language=zh-TW`;
            mediaType = 'movie';
            break;
        case 'anime':
            apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16&language=zh-TW`;
            mediaType = 'movie';
            break;
        case 'zombies':
            apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_keywords=9701&language=zh-TW`;
            mediaType = 'movie';
            break;
        case 'netflix':
            apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_watch_providers=8&watch_region=TW&without_genres=16&language=zh-TW`;
            mediaType = 'tv';
            break;
        case 'trending_movies':
            apiUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=zh-TW`;
            mediaType = 'movie';
            break;
        case 'trending_tv':
            apiUrl = `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=zh-TW`;
            mediaType = 'tv';
            break;
        default:
            resultsContainer.html('<p>未知的主題</p>');
            return;
    }
    console.log("API URL:", apiUrl);

    let allMediaItems = [];
    let totalPages = 1;

    function fetchPage(page) {
        $.ajax({
            url: apiUrl + `&page=${page}`,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(`API 回應 (第 ${page} 頁):`, data);
                allMediaItems = allMediaItems.concat(data.results);
                totalPages = data.total_pages;

                if (page < totalPages && allMediaItems.length < 100) {
                    fetchPage(page + 1);
                } else {
                    displayMediaItems(allMediaItems, mediaType);
                }
            },
            error: function (error) {
                console.error('Error:', error);
                resultsContainer.html('<p>無法取得影片資訊</p>');
            }
        });
    }

    function displayMediaItems(mediaItems, mediaType) {
        $.each(mediaItems, function (index, mediaItem) {
            if (index >= 100) {
                return false;
            }
            if (containsChineseOrEnglish(mediaItem.title || mediaItem.name)) {
                var name = mediaItem.title || mediaItem.name || '未知片名';
                var posterPath = mediaItem.poster_path;
                var posterUrl = posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : '../images/placeholder.png';
                var voteAverage = mediaItem.vote_average;
                var formattedVoteAverage = voteAverage ? voteAverage.toFixed(1) : 'N/A';
                var mediaId = mediaItem.id;

                var resultHtml = `
                    <li class="card">
                        <div class="container">
                            <a href="info.html?id=${mediaId}&type=${mediaType}">
                                <img src="${posterUrl}" alt="${name} 海報">
                            </a>
                            <p class="score">${formattedVoteAverage}</p>
                        </div>
                        <p class="name">${name}</p>
                    </li>
                `;
                resultsContainer.append(resultHtml);
            }
        });
    }

    fetchPage(1);

    function containsChineseOrEnglish(str) {
        if (!str) return false;
        return /[\u4e00-\u9fa5a-zA-Z]/.test(str);
    }
});




















// Loading
const loadingAnimation = lottie.loadAnimation({
    container: document.getElementById('loading'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../images/loading.json' // 請替換為您的 JSON 檔案路徑
});

// 網頁載入完成後，隱藏載入動畫
window.addEventListener('load', function () {
    // 添加延遲
    setTimeout(function () {
        document.getElementById('loading').style.display = 'none';
    }, 2000); // 延遲 500 毫秒
});




















// 首頁_index.html
$(document).ready(function () {
    // Hero
    var swiperhero = new Swiper("#hero", {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });

    // 熱門電影
    var swipermovie = new Swiper("#hotmovie", {
        slidesPerView: 6,
        spaceBetween: 30,
        navigation: {
            nextEl: ".mynext_movie",
            prevEl: ".myprev_movie",
        },
        // 第一張與最後一張無縫連接
        loop: true,
        // 斷點
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 2.3,
                spaceBetween: 8
            },
            // when window width is >= 480px
            768: {
                slidesPerView: 4.7,
                spaceBetween: 8
            },
            // when window width is >= 640px
            1024: {
                slidesPerView: 6.3,
                spaceBetween: 12
            }
        }

    });


    // 熱門韓劇
    var swiperkoren = new Swiper("#hotkorean", {
        slidesPerView: 6,
        spaceBetween: 30,
        navigation: {
            nextEl: ".mynext_korean",
            prevEl: ".myprev_korean",
        },
        // 第一張與最後一張無縫連接
        loop: true,
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 2.3,
                spaceBetween: 8
            },
            // when window width is >= 480px
            768: {
                slidesPerView: 4.7,
                spaceBetween: 8
            },
            // when window width is >= 640px
            1024: {
                slidesPerView: 6.3,
                spaceBetween: 12
            }
        }
    });


    // 熱門台劇/陸劇
    var swiperchina = new Swiper("#hotchina", {
        slidesPerView: 6,
        spaceBetween: 30,
        navigation: {
            nextEl: ".mynext_china",
            prevEl: ".myprev_china",
        },
        // 第一張與最後一張無縫連接
        loop: true,
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 2.3,
                spaceBetween: 8
            },
            // when window width is >= 480px
            768: {
                slidesPerView: 4.7,
                spaceBetween: 8
            },
            // when window width is >= 640px
            1024: {
                slidesPerView: 6.3,
                spaceBetween: 12
            }
        }
    });


    // 熱門美劇
    var swiperusa = new Swiper("#hotUSA", {
        slidesPerView: 6,
        spaceBetween: 30,
        navigation: {
            nextEl: ".mynext_USA",
            prevEl: ".myprev_USA",
        },
        // 第一張與最後一張無縫連接
        loop: true,
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 2.3,
                spaceBetween: 8
            },
            // when window width is >= 480px
            768: {
                slidesPerView: 4.7,
                spaceBetween: 8
            },
            // when window width is >= 640px
            1024: {
                slidesPerView: 6.3,
                spaceBetween: 12
            }
        }
    });

    // 熱門動漫
    var swiperanime = new Swiper("#hotanime", {
        slidesPerView: 6,
        spaceBetween: 30,
        navigation: {
            nextEl: ".mynext_anime",
            prevEl: ".myprev_anime",
        },
        // 第一張與最後一張無縫連接
        loop: true,
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 2.3,
                spaceBetween: 8
            },
            // when window width is >= 480px
            768: {
                slidesPerView: 4.7,
                spaceBetween: 8
            },
            // when window width is >= 640px
            1024: {
                slidesPerView: 6.3,
                spaceBetween: 12
            }
        }
    });
});


// 電影頁_movie.html
// 篩選_類型
$(".class-item").on("click", function (event) {
    event.preventDefault(); // 防止點擊連結後跳轉到其他頁面
    $(".class-item").removeClass("active"); // 移除所有文字的 active 類別
    $(this).addClass("active"); // 將被點擊的文字新增 active 類別
});
// 篩選_年分

$(".year-item").on("click", function (event) {
    event.preventDefault(); // 防止點擊連結後跳轉到其他頁面
    $(".year-item").removeClass("active"); // 移除所有文字的 active 類別
    $(this).addClass("active"); // 將被點擊的文字新增 active 類別
});



// 篩選_評分
$("#range").slider({
    range: "min",
    min: 0,
    max: 10,
    value: 5,
    slide: function (e, ui) {
        return $(".ui-slider-handle").html(ui.value);
    }
});

$(".ui-slider-handle").html("5");





// 顯示條件
$(".sort-item").on("click", function (event) {
    event.preventDefault(); // 防止點擊連結後跳轉到其他頁面
    $(".sort-item").removeClass("active"); // 移除所有文字的 active 類別
    $(this).addClass("active"); // 將被點擊的文字新增 active 類別
});




// 詳情頁_info.html
// 相關影片
$(document).ready(function () {
    // 熱門動漫
    var swiperotherfilm = new Swiper("#otherfilm", {
        slidesPerView: 6,
        spaceBetween: 30,
        navigation: {
            nextEl: ".mynext_otherfilm",
            prevEl: ".myprev_otherfilm",
        },
        // 第一張與最後一張無縫連接
        loop: true,
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 2.3,
                spaceBetween: 8
            },
            // when window width is >= 480px
            768: {
                slidesPerView: 4.7,
                spaceBetween: 8
            },
            // when window width is >= 640px
            1024: {
                slidesPerView: 6.3,
                spaceBetween: 12
            }
        }
    });
});

// 詳情頁_info.html
// 手機版
$(document).ready(function () {
    // 初始化 Slider
    $('.slider').each(function () {
        var $slider = $(this);
        var $nav = $slider.find('.slider-nav .icon');
        var $slides = $slider.find('.slider-content .slide');

        // 當點選 ICON 時切換 Slide
        $nav.click(function () {
            var slideIndex = $(this).data('slide');
            $slides.hide();
            $slides.filter('[data-slide="' + slideIndex + '"]').show();

            // 移除所有 icon 的 active class
            $nav.removeClass('active');

            // 為當前點擊的 icon 加上 active class
            $(this).addClass('active');
        });

        // 預設顯示第一張 Slide
        $nav.first().click();
    });
});


// 演員
// $(document).ready(function () {
//     var swiperactors = new Swiper("#actors", {
//         slidesPerView: 4.5,
//         spaceBetween: 30,

//     });
// });




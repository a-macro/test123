document.addEventListener("DOMContentLoaded", ready);

function ready() {
    let map = document.querySelector(".header__map");
    let mapBlock = document.querySelector(".map__block");
    if(map) {
        map.onclick = (e) => {
            if(e.target.classList.contains("map__close")) {
                return;
            }
            let s = document.createElement("script");
            let mapDiv = document.querySelector(".ymaps");
            if(!mapBlock.classList.contains("add")) {
                mapBlock.classList.add("add");
                mapDiv.appendChild(s);
                mapDiv.style.transform = "scale(0)";
                s.src= "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A3158d44ffff69d65f222d8c5d6c39b9e1a661320d8fcf37b38654c922224c5b9&amp;lang=ru_RU&amp;scroll=true";    
                mapBlock.style.display = "flex";
                setTimeout(() => {
                    mapBlock.style.opacity = 1;
                    mapDiv.style.transform = "scale(1)";
                }, 500);
            }
        };    
    }
    const mapClose = document.querySelector(".map__close");
    if(mapClose) {
        mapClose.onclick = () => {
            let mapDiv = document.querySelector(".ymaps");
            if(mapBlock.classList.contains("add")) {
                mapBlock.classList.remove("add");
                mapBlock.style.opacity = 0;
                mapDiv.style.transform = "scale(2)";
                setTimeout(() => {
                    mapBlock.style.display = "none";
                    mapBlock.querySelector("ymaps").remove();
                }, 400);
            }
        };
    }

    const burger = document.querySelector(".burger");
    const mobMenu = document.querySelector(".menu");
    const intro = document.querySelector(".intro");
    if(burger) {
        burger.onclick = () => {
            mobMenu.style.display = "block";
            setTimeout(() => {
                mobMenu.style.transform = "translateX(0)";
                intro.classList.add("opened");
            }, 10);
        };
    }
    
    const closeBurger = document.querySelector(".menu-close");
    if(closeBurger) {
        closeBurger.onclick = () => {
            if(intro.classList.contains("opened")) {
                mobMenu.style.transform = "translateX(100%)";
                intro.classList.remove("opened");
                setTimeout(() => {
                    mobMenu.style.display = "none";
                }, 400);
            }
        };
    }
    let carousel = document.querySelector(".sertificates");
    let list = carousel.querySelector('.sertificates__wrap');
    let listElems = carousel.querySelectorAll('.sertificate');
    let width = +listElems[0].offsetWidth; // ширина картинки
    let visible = 3; // видимое количество изображений
    let maxPos = (listElems.length - visible)*width;
    let count = 1; 
    let position = 0; // положение ленты прокрутки
    let i = 0;
    carousel.querySelector('.arrow-prev').onclick = function() {
        if(i != 0) {
            i--;
        }
        carousel.style.setProperty("--num", i);
        position += width * count;
        position = Math.min(position, 0);
        list.style.transform = `translateX(${position}px)`;
    };

    carousel.querySelector('.arrow-next').onclick = function() {
        if(position <= -maxPos) {
            return;
        }
        i++;
        carousel.style.setProperty("--num", i);
        position -= width * count;
        position = Math.max(position, -width * (listElems.length - count));
        list.style.transform = `translateX(${position}px)`;
    };
    window.onresize = () => {
        width = +listElems[0].offsetWidth; 
        maxPos = (listElems.length - visible)*width;
        position = -width * i;
        list.style.transform = `translateX(${position}px)`;
    };
    listElems.forEach(item => {
        item.onclick = () => {
            let el = document.createElement("div");
            el.classList = "opened__img";
            el.innerHTML = "<div class='opened__img-wrap'>" 
                            + item.innerHTML  
                            + "<span class='zoom__img'></span>" 
                            + "<span class='fullscr__img'></span>" 
                            + "<span class='close__img'></span>"
                            + "</div>";
            intro.appendChild(el);
            let img = el.querySelector(".sertificate__img");
            setTimeout(() => {
                img.style.transform = "scale(1)";
            }, 200);
            const zoom = document.querySelector(".zoom__img");
            zoom.onclick = () => {
                let parent = zoom.closest(".opened__img-wrap");
                let img = parent.querySelector(".sertificate__img");
                if(!img.classList.contains("zoomed")) {
                    img.classList.add("zoomed");
                    img.style.transform = "scale(1.5)";
                } else {
                    img.classList.remove("zoomed");
                    img.style.transform = "scale(1)";
                }    
            }; 
            const fullSc = document.querySelector(".fullscr__img");
            fullSc.onclick = () => {
                let parent = zoom.closest(".opened__img-wrap");
                let img = parent.querySelector(".sertificate__img");
                if(!img.classList.contains("fullsc")) {
                    img.classList.add("fullsc");
                    document.documentElement.requestFullscreen();
                } else {
                    img.classList.remove("fullsc");
                    document.exitFullscreen();
                }    
            };    
            const close = document.querySelector(".close__img");
            close.onclick = () => {
                let parent = zoom.closest(".opened__img");
                let img = parent.querySelector(".sertificate__img");
                img.style.transform = "scale(2)";
                setTimeout(() => {
                    parent.remove();
                }, 400);
            };          
        };
    });
}
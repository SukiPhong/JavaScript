'use strict';
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const playList = $('.playlist')
const heading = $('header h2')
const thumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const play = $('.player')
const nextPlay = $('.btn-next')
const prevPlay = $('.btn-prev')
const randomPlay = $('.btn-random')
const progress = $('#progress')
const repeat = $('.btn-repeat')

const app =
{
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    currentIndex: 0,
    songs: [
        {
            name: 'Chac Chua',
            singer: 'khong biet',
            path: './assets/music/song1.mp3',
            img: './assets/img/song1.png',
        },
        {
            name: 'anh thoi nhan nhuong',
            singer: 'khong biet',
            path: './assets/music/song2.mp3',
            img: './assets/img/song2.png',
        },
        {
            name: '10 nam nhan giang',
            singer: 'khong biet',
            path: './assets/music/song3.mp3',
            img: './assets/img/song3.png',
        },
        {
            name: 'Chac Chua 1',
            singer: 'khong biet',
            path: './assets/music/song1.mp3',
            img: './assets/img/song1.png',
        },
        {
            name: 'anh thoi nhan nhuong 1',
            singer: 'khong biet',
            path: './assets/music/song2.mp3',
            img: './assets/img/song2.png',
        },
        {
            name: '10 nam nhan giang 1',
            singer: 'khong biet',
            path: './assets/music/song3.mp3',
            img: './assets/img/song3.png',
        }
    ],
    renderSongs: function () {

        const html = this.songs.map((el, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${el.img}">
                </div>
                <div class="body">
                    <h3 class="title">${el.name}</h3>
                        <p class="author">${el.singer}</p>
                        </div>
                    <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                            </div>`

        })
        playList.innerHTML = html.join('')

    },
    handlerEvent: function () {

        const cdWith = cd.offsetWidth
        const cb_thumbAnimate = thumb.animate(
            [
                { transform: 'rotate(360deg)' }
            ], {
            duration: 10000,//10s
            easing: 'ease-in-out',
            iterations: Infinity
        }
        )
        cb_thumbAnimate.pause()
        //handler phóng to
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newWidth = cdWith - scrollTop

            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0

        }
        // nút btn
        playBtn.onclick = () => {
            if (this.isPlaying) {
                audio.pause()
            }
            else {
                audio.play()
            }
        }
        //pause
        audio.onpause = () => {
            this.isPlaying = false
            play.classList.remove('playing')
            cb_thumbAnimate.pause()
        }
        //playing
        audio.onplay = () => {
            this.isPlaying = true
            cb_thumbAnimate.play()
            play.classList.add('playing')
        }
        // update tim  songs
        audio.ontimeupdate = () => {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }

        }
        //seekTime
        progress.onchange = (e) => {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
            if (progress.max > 100)
                this.nextSong()
        };
        //next song

        nextPlay.onclick = () => {
            if (this.isRandom) {
                this.randomPlay();
            } else {
                this.nextSong()
            }
            audio.play()
        },

            //prev song
            prevPlay.onclick = () => {
                if (this.isRandom) {
                    this.randomPlay();
                } else {

                    this.prevSong()
                }

                audio.play()
            }
        //random song
        randomPlay.onclick = () => {
            this.isRandom = !this.isRandom
            // if(this.isRepeat) {
            //     repeat.classList.remove('active')
            // }
            randomPlay.classList.toggle('active', this.isRandom)

            this.randomPlay();


        }
        repeat.onclick = () => {
            
            this.repeatPlay()
        }
        audio.onended = () => {
            if (!this.isRepeat) {
                this.nextSong()
                audio.play()

            }
            //load current song
            this.loadCurrentSong()
            audio.play()
        }

        playList.onclick = (e) => {
            const songNode = 
            e.target.closest(".song:not(.active)")
            const songOption = e.target.closest(".option")
            if (songNode || songOption) {
                if (songNode) {
                  this.currentIndex=songNode.dataset.index
                  this.loadCurrentSong();
                  audio.play()
                }
                if (songOption) {

                }
            }
        }
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();

    },
    randomPlay: function () {
        let newIndex;
        do {

            newIndex = Math.floor(Math.random() * this.songs.length)
        }
        while (newIndex === this.currentIndex);

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    repeatPlay: function () {

        this.isRepeat = !this.isRepeat
        if(this.isRandom ){
            random.classList.remove('active')
        }
        repeat.classList.toggle('active', this.isRepeat)
        audio.loop = this.isRepeat
    },

    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name
        thumb.style.backgroundImage = `url('${this.currentSong.img}')`
        audio.src = this.currentSong.path
        this.activeSong();
    },
    activeSong: function () {
        const songs = $$('.song')
        songs.forEach(el => el.classList.remove('active'))
        songs[this.currentIndex].classList.add('active')
        const activeSong = $('.song.active')
        if (activeSong) {
            activeSong.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
        }
    },
    moveActiveSong: function () {
        const activeSong = $('.song.active')
        if (activeSong)
            playList.prepend(activeSong)
    },

    start: function () {
        this.defineProperties()
        this.renderSongs()
        this.loadCurrentSong()
        this.handlerEvent()
    }
}
app.start()



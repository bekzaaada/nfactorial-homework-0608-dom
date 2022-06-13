let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');

 
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let updateTimer;

const music_list = [
    {
        img : 'assets/hill.jpg',
        name : 'Oceans',
        artist : 'HillSong United',
        music : 'assets/oceans.mp3'
    },
    {
        img : 'assets/lu.jpg',
        name : 'Nuvole Bianche',
        artist : 'Ludovico Einaudi',
        music : 'assets/Ludovico Einaudi — Einaudi, Tondo_ Nuvole Bianche (www.lightaudio.ru).mp3'
    },
    {
        img : 'assets/son.jpg',
        name : 'Men seni suiemyn',
        artist : 'Son Pascal',
        music : 'assets/son-pascal-men-sen-sjemn_(muzzona.kz).mp3'
    },
    {
        img : 'assets/piano.jpg',
        name : 'Lacrimosa',
        artist : 'Mozart',
        music : 'assets/Dafydd Bullock — Mozart Requiem (Lacrimosa) (www.lightaudio.ru).mp3'
    },
    {
        img : 'assets/me.jpg',
        name : 'Cry Baby',
        artist : 'Melanie Martinez',
        music : 'assets/American Avenue, Kalie Wolfe — Cry Baby (www.lightaudio.ru).mp3'
    },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1){
        track_index = track_index+1;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index = track_index-1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationMinutes;
    }
}

let videoBtn = document.querySelectorAll('.vid-btn');
videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

function setDarkTheme(){
    localStorage.setItem("theme", "dark");
    const modeValue = document.getElementsByClassName("wrapper")[0];
    modeValue.style.backgroundColor = "rgba(10, 4, 4, 0.3)";
}
function setLightTheme(){
    localStorage.setItem("theme", "light");
    const modeValue = document.getElementsByClassName("wrapper")[0];
    modeValue.style.backgroundColor = "rgba(201, 184, 184, 0.3)";

}

function setCookie(cname, cvalue, exdays){
    let date = new Date("June 10, 2022");
    let expires = "";
    exdays = 6
    let expireDate = new Date();
    expireDate.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
    expires = "expires="+ expireDate.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
// function getCookie(){
//     alert(document.cookie);
// }

// function setCookie(cname, cvalue, exdays) {
//     const d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     let expires = "expires="+d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//   }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
         setCookie("username", user, 30);
       }
    }
  }
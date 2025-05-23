const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
    currentIndex: 0,
    maxIndex: 382
};

let imageLoaded = 0;
const images = [];

function preloadImages(){
    for(let i = 1; i <= frames.maxIndex; i++){
        const imageUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpg`;
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            imageLoaded++;

            if(imageLoaded === frames.maxIndex){
                loadImage(frames.currentIndex);
            }
       }
       images.push(img);

    }
 }   

 function loadImage(index){
    if(index >= 0 && index <= maxIndex){
        const img = images[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX , scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth)/2;
        const offsetY = (canvas.height - newHeight)/2;

        context.clearRect(0 , 0 , canvas.width , canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high"
        context.drawImage(img , offsetX , offsetY , newWidth , newHeight);
        frames.currentIndex = index;
    }
 }


 function startAnimation(){
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent",
            start: "top top",
            scrub: 2,
            // markers: true
        }
    })
       tl.to("frames",{
           currentIndex: frames.maxIndex,
           onUpdate: function(){
              loadImage(Math.floor(frames.currentIndex))
           }
       })
 }
 preloadImages();


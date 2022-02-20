window.addEventListener("DOMContentLoaded", () => {
   // services
   const getData = async (url) => {
      const res = await  fetch(url);
      if(!res.ok) {
         throw new Error("error");
      }
      return await res.json();
    };

    const postData = async (url, data) => {
      const res = await fetch(url, {
         method: "POST",
         body: data
      })
      return await res.text()
   }


   //  serviceLoad
   const getMoreStyles = (wrapperSel) => { 
      const wrapper = document.querySelector(wrapperSel);
      getData("./json/db.json")
      .then(res => {
         console.log(res)
         create(res.styles);
      } )     
      function create(response) {
         response.forEach(({img, desc, name}) => {
            let box = document.createElement("div");
            box.classList.add("box");
            box.innerHTML =   `
            <img src=${img} alt="">
            <div class = "comment_name">${name}</div>
            <p class="comments_block">
               ${desc}
            </p>
            `
            wrapper.appendChild(box)
         })  
      }  
   }
getMoreStyles(".comments")



   //  slider
   const slider = (descSel, innerSel, slidesSel, prevSel, nextSel, currentSel, allSel, ) => {
      const desc = document.querySelector(descSel),
            inner = document.querySelector(innerSel),
            slides = document.querySelectorAll(slidesSel),
            prev = document.querySelector(prevSel),
            next = document.querySelector(nextSel),
            current = document.querySelector(currentSel),
            all = document.querySelector(allSel);
            
      
      const width = window.getComputedStyle(desc).width
      let offset = 0,
          slideIndex = 1,
         time = setInterval(() => {
            next.click()}, 2000)

         const indexCount = () => {
            if(slides.length < 10) {
               all.textContent = `0${slides.length}`;
               current.textContent = `0${slideIndex}`
            } else {
               all.textContent = `${slides.length}`;
               current.textContent = `${slideIndex}`
            }
         }
         indexCount();
         slides.forEach(slide => {
            slide.style.width = width;
            slide.style.height = `504px`
         })
         inner.style.width = 100 * slides.length + "%";
         inner.style.display = "flex";
         inner.style.transition =  `0.5s`
         const indicators = document.createElement("ol");
         indicators.classList.add("indicators")
         desc.append(indicators)
         indicators.classList.add("carusel")
         oros = []
         for(let i = 0; i < slides.length; i++ ) {
            const dots = document.createElement("li");
           dots.classList.add("dots")
            dots.setAttribute('data-slide-to', i + 1);
               if(i == 0) {
                  dots.style.backgroundColor = "red"
               }
               indicators.append(dots);
               oros.push(dots)
         }
       const orosCount = () => {
         oros.forEach(or => {
            or.style.backgroundColor = "black"
         })
         oros[slideIndex - 1].style.backgroundColor = "red"
       }
       next.addEventListener("click", ()=> {
         if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0
         } else {
            offset += +width.slice(0, width.length - 2)
         }
         
          inner.style.transform = `translateX(-${offset}px)`
         
          if(slideIndex == slides.length) {
             slideIndex = 1
          } else {
             slideIndex++
          }
          indexCount();
          orosCount();
       })
       prev.addEventListener("click", ()=> {
         if(offset <= 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1)
         } else {
            offset -= +width.slice(0, width.length - 2)
         }
         
          inner.style.transform = `translateX(-${offset}px)`
          if(slideIndex == 1) {
            slideIndex = slides.length
         } else {
            slideIndex--
         }
         indexCount();
         orosCount();
       })
      oros.forEach((or, i) => {
         or.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");
            slideIndex = slideTo;
            offset = width.slice(0, width.length - 2) * (slideTo - 1)
            inner.style.transform = `translateX(-${offset}px)`
            indexCount()
            orosCount();
      })
   })
   
      desc.addEventListener("mouseover", () => {
         clearInterval(time)
      })
      desc.addEventListener("mouseout", () => {
         time = setInterval(() => next.click(), 2000)
      })
   } 
   slider(".desc", ".slider_inner", ".slide", ".prev", ".next", ".current", ".all")

 

   // videoPlayer

class VideoPlayer {
   constructor(triggers, overlay, close) {
       this.btns = document.querySelectorAll(triggers);
       this.overlay = document.querySelector(overlay);
       this.close = this.overlay.querySelector(close);
       
   }
   modal() {
      if(document.querySelector("iframe#frame")) {

      }
   }
   set() {
      setTimeout(() => {
       if(document.querySelector("iframe#frame")) {
          this.overlay.style.display = "flex"
       } else {
          
          this.createPlayer("nlc4nq2cTxU")
       }
       },2000)
    }
   bindTriggers() {
       this.btns.forEach(btn => {
           btn.addEventListener('click', () => {
               if(document.querySelector("iframe#frame")) {
                  this.overlay.style.display = "flex"
               } else {
                  
                  this.createPlayer("nlc4nq2cTxU")
               }
               
           });
       });
   }
   bindCloseBtn() {
       this.close.addEventListener('click', () => {
           this.overlay.style.display = 'none';
           this.player.stopVideo();
       });
   }
   createPlayer(url) {
       this.player = new YT.Player('frame', {
           height: '400px',
           width: '600px',
           videoId: `${url}`
       });
       console.log(this.player);
       this.overlay.style.display = 'flex';
   }
   init() {
       const tag = document.createElement('script');

       tag.src = "https://www.youtube.com/iframe_api";
       const firstScriptTag = document.getElementsByTagName('script')[0];
       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
       this.set();
       this.bindTriggers();
       this.bindCloseBtn();
   }
}
const player = new VideoPlayer(".timeline button", ".advertaisment", ".iframe_close");
player.init();








   // timer

   const timer = (deadline, daysSel, hoursSel, minSel, secSel) => {
      let date = new Date(deadline);
          days = document.querySelector(daysSel),
          hours = document.querySelector(hoursSel),
          minutes = document.querySelector(minSel),
          seconds = document.querySelector(secSel);
      
      const addZero = (num) => {
         if(num < 10) {
            return "0" + num
         } else {
            return num
         }
      } 
      const count = () => {
         let now = new Date;
         let gab = date - now;
         let d = Math.floor(gab/ 1000 / 60 / 60/ 24),
             h = Math.floor(gab/ 1000 / 60 / 60) % 24,
             m = Math.floor(gab/ 1000 / 60 ) % 60
             s = Math.floor(gab/ 1000 ) % 60;
         if(gab <= 0) {
            clearInterval(interval)
            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00"
         } else {
            days.textContent = addZero(d);
            hours.textContent = addZero(h);
            minutes.textContent = addZero(m);
            seconds.textContent = addZero(s)
         }
        
      }
      const interval = setInterval(count, 1000)

   }
   timer("2022-02-01", "#days", "#hours", "#minutes", "#seconds")
  

   // calc
   const calc = () => {
      let div = document.createElement("div");
      div.style.width = `50px`;
      div.style.height = `50px`;
      div.style.overflowY = "scroll";
      div.style.visibility = "hidden";
      document.body.appendChild(div);
      let scrollWidth = div.offsetWidth - div.clientWidth;
      div.remove();
      return scrollWidth
   }

   // modalWindow
   let clicked = false;
   const modal = (btnSel, modalSel, closeSel) => {
      
      const btn = document.querySelector(btnSel),
      modal = document.querySelector(modalSel),
      close = document.querySelector(closeSel),
      scroll = calc()
      btn.addEventListener("click", () => {   
         modal.classList.add("animated", "fadeIn")
         document.body.style.overflow = "hidden";
         document.body.style.marginRight = `${scroll}px`;
         if(modal.classList.contains("caruselO")) {
            modal.style.display = "flex"
         } else{
            clicked = true;
            modal.style.display = "block"
         }
      })
      close.addEventListener("click", () => {
         modal.classList.remove("fadeIn")
         document.body.style.overflow = "";
         modal.style.display = "none";
         document.body.style.marginRight = `0px`;
      })
   }
   modal(".sofaFor button", ".modal_overlay", ".iframe_close");
   modal(".fiji button", ".caruselO", ".carusel_close");

   // catalogSlider
   const carusel = (selectorSel) => {
      const selector = document.querySelectorAll(selectorSel);
            selector.forEach((sel, i) => {
               sel.addEventListener("click", () => {
                  selector.forEach((sel) => {
                     sel.style.flex = "1"
                     
                  })
                  selector[i].style.flex = "10"
               })
            })
   }
   carusel(".carusel_wrapper div")


   // forms
   const forms = () => {
      const forms = document.querySelectorAll("form"),
            inputs = document.querySelectorAll("input");
      const clearInputs = () => {
         inputs.forEach(input => {
            input.value = null
         })
      }

      forms.forEach(form => {
         form.addEventListener("submit", (e) => {
            e.preventDefault();
            let statusMessage = document.createElement("div");
            statusMessage.classList.add("status");
            form.appendChild(statusMessage);
            statusMessage.textContent = messages.loading;

            const formData = new FormData(form);
            postData("./mailer/smart.php", formData)
            .then(res => statusMessage.textContent = messages.succes)
            .catch(error => console.log(error))
            .finally(
               clearInputs()
            )
            
         })
      })
   }

      forms()



   //   scroll
   
   window.addEventListener("scroll", () => {
      if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         if(!clicked) {
            document.querySelector(".sofaFor button").click();
         }
      }
   })
   



  
















  



  

    

      




      
})

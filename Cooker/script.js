


window.addEventListener('DOMContentLoaded', () => {
  const postData = async (url, data) => {
    const res = await  fetch(url, {
       method: "POST",
       body: data
    });
    return await res.text();
  };
  const getData = async (url) => {
    const res = await  fetch(url);
    if(!res.ok) {
       throw new Error("error");
    }
    return await res.json();
  };
  
  
  
  const forms = ()=> {
     const forms = document.querySelectorAll("form");
     const inputs = document.querySelectorAll("textarea");
     const inputNoTel = document.querySelectorAll("input");
     const inputes = document.querySelectorAll('[name="phone"]');
     const overlay = document.querySelector(".overlay"),
     upload = document.querySelectorAll('[name = "upload"]');
     const clearInputs = () => {
      inputNoTel.forEach(input => {
           input.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = "file";
        });
     };
   //   const checkInputs = () => {
   //    inputes.forEach(input => {
   //      input.addEventListener("input", () => {
   //        input.value = input.value.replace(/\D/, '');
   //     });
   //    });
   //   };
     inputNoTel.forEach(input => {
      input.addEventListener('keypress', function(e) {
          if (e.key.match(/[^a-z A-Z 0-9 + ()]/ig)) {
              e.preventDefault();
          }
      });
  });
   //   checkInputs();
     let messages = {
        loading: "Loading",
        error: "error",
        succes: "succes",
        okPhoto: "assets/img/forms/png-transparent-line-triangle-point-area-ok-s-miscellaneous-angle-text.png",
        ok: 'We will contact you',
        spinner: "assets/img/forms/Без названия (2).png",
        errorImg:"assets/img/png-transparent-button-error-s-image-file-formats-trademark-heart-thumbnail.png", 
     };

     upload.forEach(item => {
      item.addEventListener("input", () => {
         let dots;
         const arr = item.files[0].name.split(".");
         arr[0].length > 6 ? dots = "..." : dots = ".";
         let name = arr[0].substring(0, 6) + dots + arr[1];
         item.previousElementSibling.textContent = name;
      });
     });


     forms.forEach(form => {
        form.addEventListener("submit", (e) => {
           e.preventDefault();
           let statusMessage = document.createElement("div");  
           statusMessage.classList.add("status", "animated", "fadeIn");
           form.classList.add('animated', 'fadeOut');
           form.style.display = "none";
           form.parentNode.appendChild(statusMessage);
           let statusImg = document.createElement("img");
           statusImg.classList.add("status__img");
           statusImg.setAttribute("src", messages.spinner);
           statusMessage.appendChild(statusImg);
           let statusText = document.createElement("div");
           statusText.textContent = messages.loading;
           statusMessage.appendChild(statusText);
           
          
           
           const formData = new FormData(form);
           postData('assets/mailer/smart.php', formData)
           .then(res => {
              statusImg.setAttribute("src", messages.okPhoto);
              statusText.textContent = messages.succes;
           })
           .catch(() => {
            statusImg.setAttribute("src", messages.errorImg);
            
            statusText.textContent = messages.error;
           })
           .finally(() =>{
              clearInputs();
              setTimeout(() => {
                 
                 form.style.display = "block";
                 form.classList.remove('fadeOut');
                 form.classList.add('fadeInUp');
              }, 4000);
              
              
             
              
             
           });
        });
     });
  
  };
  
  
  
  
  const getMoreStyles = (triggetSelector, wrapperSelector) => {
     const trigger = document.querySelector(triggetSelector),
     wrapper = document.querySelector(wrapperSelector);
     trigger.addEventListener('click', function() {
        getData('assets/db.json')
            .then(res => createColumns(res.styles))
            .catch(error => console.log(error));
  
        this.remove();
    });
  
     function createColumns(response) {
        response.forEach(({src, title, star, current, total})=> {
           let column = document.createElement("div");
           column.classList.add("animated", "fadeIn", "food__body__column");
           column.innerHTML = `
           <div class="food__img">
           <img src="${src}" alt="">
        </div>
        <div class="food__body__footer">
           <div class="food__body__footer_left">${title}</div>
           <div class="food__body__footer_right">
              <div class="food__starts">
                 <img src="${star}" alt="">
                 <img src="${star}" alt="">
                 <img src="${star}" alt="">
                 <img src="${star}" alt="">
                 <img src="${star}" alt="">
              </div>
              <div class="food__ok"><span class="current">${current}</span>/ <span class="total">${total}</span></div>
           </div>
        </div>
           `;
           wrapper.appendChild(column);
        });
     }
  };
  const modals = (triggerSelector, modalSelector, closeSelector) => {
    const triggers = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector),
    close = document.querySelector(closeSelector);
    triggers.forEach(trigger => {
       trigger.addEventListener("click", () => {
          modal.classList.remove("fadeOut");
          modal.classList.add("animated", "fadeIn");
          modal.style.display = "block";
          document.body.style.overflow = "hidden";
       });
    });

    close.addEventListener("click", () => {
          modal.classList.remove("fadeIn");
          modal.classList.add("fadeOut");
          modal.style.display = "none";
          document.body.style.overflow = "";
    });   
 
  };
  
  
  
  getMoreStyles(".food__header__right div", ".food__body");
  forms();
  modals(".navbar__right__right button", ".overlay", ".modal__close");
  modals(".header__body__left__last button", ".overlay", ".modal__close");
  

  
  function scroll(triggerSelector, modalSelector) {
    const triggers = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);
    window.addEventListener("scroll", () => {
      if((window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
          modal.classList.remove("fadeOut");
          modal.classList.add("animated", "fadeIn");
          modal.style.display = "block";
          
          window.removeEventListener("scroll");
      }
    });
  }
//   scroll(".navbar__right__right button", ".overlay");
  


  function caurusel(slidesSel, nextSel, prevSel) {
   const slides = document.querySelectorAll(slidesSel);
   let slideIndex = 1;
   let paused = false;

   function showSlide(n) {
      if(n > slides.length) {
         slideIndex = 1;
      }
      if(n < 1) {
         slideIndex = slides.length;
      }

      slides.forEach(slide => {
         slide.style.display = "none";
      });
      slides[slideIndex - 1].style.display = "block";
   }
   showSlide(slideIndex);

    function plusSlide(n) {
       showSlide(slideIndex += n);
    }
    function activeAnimation() {
         paused = setInterval(() => {
         plusSlide(1);
         slides[slideIndex - 1].classList.remove("slideInRight");
         slides[slideIndex - 1].classList.add("animated", "slideInLeft");
     }, 3000) ;
  }
  activeAnimation();

   slides[0].parentNode.addEventListener("mouseenter", () => {
      clearInterval(paused);
   });   
   slides[0].parentNode.addEventListener("mouseleave", () => {
      activeAnimation();
   });   
    try {
      const next = document.querySelector(nextSel),
      prev = document.querySelector(prevSel);

      next.addEventListener('click' ,() => {
         plusSlide(1);
         slides[slideIndex - 1].classList.remove("slideInRight");
         slides[slideIndex - 1].classList.add("animated", "slideInLeft");

      });
      prev.addEventListener('click' ,() => {
         plusSlide(-1);
         slides[slideIndex - 1].classList.remove("slideInLeft");
         slides[slideIndex - 1].classList.add("animated", "slideInRight");

      });
    }catch(e){}

  }
  caurusel('.caurusel', ".caurusel__next", ".caurusel__Prev");
   
  function accordeon(headSel, acSel) {
   const header = document.querySelectorAll(headSel),
   accordeon = document.querySelectorAll(acSel);
   accordeon.forEach((ac, i) => {
      ac.style.display = "none";
      ac.classList.add("animated");
      
   });
   accordeon[0].style.display = "block";
   header[0].classList.add("acHead");


   header.forEach((head, i) => {
      head.addEventListener("click", () => {
        
         if(accordeon[i].style.display == "block") {
            head.classList.remove("acHead");
            accordeon[i].classList.remove("fadeInDown");
            accordeon[i].classList.add("fadeInUp");
            accordeon[i].style.display = "none";
         } else {
            head.classList.add("acHead");
            accordeon[i].classList.remove("fadeInUp");
            accordeon[i].classList.add("fadeInDown");
            accordeon[i].style.display = "block";
         }
      });
   });   
}

accordeon(".accordion-heading span", ".accordion-block");




const filter = () => {
   const menu = document.querySelector('.portfolio-menu'),
   items = menu.querySelectorAll('li'),
   btnAll = menu.querySelector('.all'),
   btnPlov = menu.querySelector('.plov'),
   btnBozbash = menu.querySelector('.bozbash'),
   btnDolma = menu.querySelector('.dolma'),
   btnKabab = menu.querySelector('.kabab'),
   btnGrandmother = menu.querySelector('.grandmother'),
   btnGranddad = menu.querySelector('.granddad'),
   wrapper = document.querySelector('.portfolio-wrapper'),
   markAll = wrapper.querySelectorAll('.all'),
   markDolma = wrapper.querySelectorAll('.dolma'),
   markPlov = wrapper.querySelectorAll('.plov'),
   markBozbash = wrapper.querySelectorAll('.bozbash'),
   markKabab = wrapper.querySelectorAll('.kabab'),
   no = document.querySelector('.portfolio-no');
  
   function marking(current) {
     
        
      
      
         no.style.display = "none";
         markAll.forEach((item) => {
            item.classList.add('animated', 'fadeIn');
            item.style.display = "none";
            
         });
         no.style.display = "none";
         no.classList.remove('animated', 'fadeIn');
         if(current) {
            current.forEach(item => {
               item.style.display = "block";
            });
         } else {
            no.style.display = "block";
            no.classList.add('animated', 'fadeIn');
         }
            
       
  
   }
   function cllass() {
      items.forEach((item, i) => {
         item.addEventListener("click", () => {
            items.forEach(item => {
               item.classList.remove('active', 'animated', 'fadeIn');
            });
            items[i].classList.add('active', 'animated', 'fadeIn');
         });
      });
   }
   cllass();


   btnAll.addEventListener("click", () => {
      marking(markAll);
   });
   btnDolma.addEventListener("click", () => {
      marking(markDolma);
   });
   
   btnPlov.addEventListener("click", () => {
      marking(markPlov);
   });
   btnBozbash.addEventListener("click", () => {
      marking(markBozbash);
   });
   
   btnKabab.addEventListener("click", () => {
      marking(markKabab);
   });
   
   btnGrandmother.addEventListener("click", () => {
      marking();
   });
   
   btnGranddad.addEventListener("click", () => {
      marking();
   });

  




};
filter();






const pictureSize = (imgSelector) => {
   const blocks = document.querySelectorAll(imgSelector);
   
   function showImg(block) {
      let img = block.querySelector("img");
      img.src = img.src.slice(0, -4) + "-1.png";
      block.classList.add("animated", "fadeIn");
   }
   function hideImg(block) {
      let img = block.querySelector("img");
      img.src = img.src.slice(0, -6) + ".png";
      block.classList.remove("animated", "fadeIn");
   }


   blocks.forEach(block => {
      block.addEventListener("mouseover", () => {
         showImg(block);
      });
      block.addEventListener("mouseout", () => {
         hideImg(block);
      });
   });
};
pictureSize(".rrrr");



// const mask = (selector) => {

//    let setCursorPosition = (pos, elem) => {
//        elem.focus();
       
//        if (elem.setSelectionRange) {
//            elem.setSelectionRange(pos, pos);
//        } else if (elem.createTextRange) {
//            let range = elem.createTextRange();

//            range.collapse(true);
//            range.moveEnd('character', pos);
//            range.moveStart('character', pos);
//            range.select();
//        }
//    };

//    function createMask(event) {
//        let matrix = '+7 (___) ___ __ __',
//            i = 0,
//            def = matrix.replace(/\D/g, ''),
//            val = this.value.replace(/\D/g, '');

//        if (def.length >= val.length) {
//            val = def;
//        }

//        this.value = matrix.replace(/./g, function(a) {
//            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
//        });

//        if (event.type === 'blur') {
//            if (this.value.length == 2) {
//                this.value = '';
//            }
//        } else {
//            setCursorPosition(this.value.length, this);
//        }
//    }

//    let inputs = document.querySelectorAll(selector);

//    inputs.forEach(input => {
//        input.addEventListener('input', createMask);
//        input.addEventListener('focus', createMask);
//        input.addEventListener('blur', createMask);
//    });
// };
// mask('[name="phone"]');





const tel = document.querySelector('[name="phone"]');

function cursorPosition(tel, pos) {
   if(tel.setSelectionRange) {
      tel.focus();
      tel.setSelectionRange(pos, pos);
   }
}
tel.addEventListener("input", () => {
   
   if(tel.value == "+" ) {
      tel.value = tel.value.replace("+", '+' + `994()`);
      cursorPosition(tel, 5);
   } else if(tel.value == "9") {
      tel.value = tel.value.replace("9", '+' + `994()`);
      cursorPosition(tel, 5);
   } else if(tel.value == "+)") {
      tel.value = tel.value.replace("+)", '+' + `994()`);
      cursorPosition(tel, 5); 
   } else if(tel.value == "050" ) {
      tel.value = tel.value.replace("050", '+' + `994(50)`);
   } else if(tel.value == "055" ) {
      tel.value = tel.value.replace("055", '+' + `994(55)`);
   } else if(tel.value == "070" ) {
      tel.value = tel.value.replace("070", '+' + `994(70)`);
   } else if(tel.value == "077" ) {
      tel.value = tel.value.replace("077", '+' +`994(77)`);
   } else if(tel.value == `+994`) {
      tel.value = tel.value.replace(`+994`, `+994`);
   } else if(tel.value.length < 1) {
      tel.value = tel.value.replace(tel.value, `+994`);
   }
   
   });
   
   const scrolling = (upSelectror) => {
      let upElem = document.querySelector(upSelectror);
      upElem.style.display = "none";
      window.addEventListener("scroll", () => {
         if(document.documentElement.scrollTop > 1650) {
            upElem.style.display = "block";
         } else {
            upElem.style.display = "none";
         }
      });
      const element = document.documentElement,
      body = document.body;
      const calcScroll = () => {
         upElem.addEventListener("click", function(e) {
            
            let scrollTop = Math.round(element.scrollTop || body.scrollTop);
            if(this.hash !== "") {
               e.preventDefault();
               let hashElement = document.querySelector(this.hash),
               hashElementTop = 0;
               while(hashElement.offsetParent) {
                  hashElementTop += hashElementTop.offsetTop;
                  hashElement = hashElement.offsetParent;
               }
               hashElementTop = Math.round(hashElementTop);
               smoothScroll(scrollTop, hashElementTop, this.hash);
            }
         });
      };
      const smoothScroll = (from, to, hash) => {
         let timeInterval = 1,
         previousScrollTop,
         speed;
         if(to > from) {
            speed = 30;
         } else {
            speed = -30;
         }
         let move = setInterval(function() {
            let scrollTop = Math.round(element.scrollTop || body.scrollTop);
            if(
               previousScrollTop === scrollTop ||
               (to > from && scrollTop >= to) ||
               (to < from && scrollTop <=to) 
            ) {
               clearInterval(move);
               history.replaceState(history.state < document.title, location.href.replace(/#.*$/g, "") + hash);
            } else {
               body.scrolTop += speed;
               element.scrollTop += speed;
               previousScrollTop = scrollTop;
            }
         }, timeInterval);
      };
      calcScroll();
   };
   scrolling(".anchor");


    function about() {
      let btn = document.querySelector(".about__us__arrow__box");
      let close = document.querySelector(".arrow__close");
      
      let box = document.querySelector(".about__us__right");
      btn.addEventListener("click", () => {
       
         btn.style.display = "none";
         box.style.height = "auto";
      });
      close.addEventListener("click", () => {
       
         btn.style.display = "flex";
         box.style.height =  `670px` ;
      });
    }
    about();

    
   

    
    
    document.querySelector(".header__footer__right button").addEventListener("click", () => {
     
      
         const namer = document.querySelector("#foodName"),
         people = document.querySelector(".peopleCount"),
         location = document.querySelector(".location");
         let res = document.querySelector(".result__block p");
         console.log(namer.value, people.value, location.value);
         let result = Math.round((+namer.value * +people.value) + (+location.value));
         if(namer.value == "" || people.value == "" || location.value == "") {
            res.textContent = "Please fill in all fields";
         } else {
            res.textContent = result  + "AZN";
         }
         
         
         
     
 
    });
    
});





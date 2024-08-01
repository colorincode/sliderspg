
// import jquery ,will need this for build to compile correctly 
import * as jquery from 'jquery';
(window as any).$ = (window as any).jQuery = jquery;
console.log('imports loaded');

// import './animationsmodule.ts';
// import {parse} from '../assets/fontawesome-pro-6.4.2/js/all.js' ;
//dom loaded 
navigationToggle();
checkforAnimation();
mouseOutanimation ();

function isClassActive(className: string): boolean {
    // const elements = document.querySelectorAll(`.${className}`);
    let i = 0;
    const elements = Array.prototype.slice.call(document.querySelectorAll(`.${className}`), 0)
    elements.forEach(function(el: any) {
        el.addEventListener('click', function() {
            el.classList.toggle('is-active');
            if (elements[i].classList.contains(className)) {
                        return true;
                      }
                    }, 3000);
            } 
        );
    return false;
        }
//     for (let i = 0; i < elements.length; i++) {
//       if (elements[i].classList.contains(className)) {
//         return true;
//       }
//     }
//     return false;
//   }


// function mouseOutanimation ()  {
// let menuItempricing = document.querySelector('animatedType');

function mouseOutanimation () {
    // let menuItempricing = document.querySelector ('.animatedType');
    $('.animatedType').on('mouseleave', function() {
        $('.animatedType').addClass('pricinglist--isanimating');
    });
    $('.animatedType').on('mouseenter', function() {
        $('.animatedType').removeClass('pricinglist--isanimating');
    }), 3000;


}


function navigationToggle(): void {
    $(function() {
        $('.navigation .toggle-wrapper .show').on('click', function() {
            $('.navigation').addClass('open');
            // gsap.from('.show', {
            //     opacity: 0, 
            //     duration: 1.5,
            //     xPercent: -100, 
            //     ease: "Power3.easeOut",
    
            // });
        });

        $('.navigation .toggle-wrapper .hide').on('click', function() {
            $('.navigation').removeClass('open');
           

        });
        $('.navigation .has-menu a').on('click', function(e) {
            e.stopPropagation();
        });
        $('.navigation .has-menu').on('click', function() {
            $(this).toggleClass('open');
        });
        $('.sldm-submenu > a').on("click", function (e) {
            e.preventDefault();
            $(this).toggleClass('sldm-open');
            $(this).parent().find('>ul').slideToggle(450);
            $(this).find('.sldm-widget-toggle').toggleClass('fa-angle-up fa-angle-down');
            // const rotateValue = $(this).data('fa-transform');
        });
    
        $('.sldm-widget-toggle').on("click", function (e) {
            e.preventDefault();
            $($(this).data('target')).slideToggle(300);
        });
    });

}

function checkforAnimation() {
    if (isClassActive('is-animating')) {
        $('.navigation').addClass('open');
        // if (".navigation").hasClass("hide") {

        // }
      

     
    } else {
        $('.navigation').removeClass('open');
    }

}
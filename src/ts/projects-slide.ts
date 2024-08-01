// import * as gsap from "gsap";
// import './gsap-renderer';
console.log("gsap loaded");
import Lenis from 'lenis';

//gsap modules
import gsap, { SteppedEase, toArray } from 'gsap'
// import TextPlugin from 'gsap/TextPlugin';
import { Flip } from 'gsap/Flip';
import Draggable from 'gsap/Draggable';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import EasePack from 'gsap/EasePack';
import { Power4 } from 'gsap/gsap-core';
import Observer from 'gsap/Observer';
// import { sqrt, MathCollection , create, all, string} from 'mathjs';
import Timeline from 'gsap/all';
import  Tween  from 'gsap/src/all';
// import Lenis from 'lenis';

// gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(EasePack);
// gsap.registerPlugin(TimelineMax);
// gsap.registerPlugin(TimelineLite);
// gsap.registerPlugin(TweenLite);
gsap.registerPlugin(Tween);
gsap.registerPlugin(SteppedEase);
gsap.registerPlugin(Timeline);
gsap.registerPlugin(Power4);
gsap.registerPlugin(Flip);
gsap.registerPlugin(Draggable);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);
gsap.registerPlugin(ScrollToPlugin);

// lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
  });
  
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  
  requestAnimationFrame(raf);
  
  // horiontall scroll
//   gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
//   console.clear();
  
  let select = (e) => document.querySelector(e);
  let selectAll = (e) => document.querySelectorAll(e);
  
  const tracks = selectAll(".sticky-element");
  
//   console.log(tracks);
  
  tracks.forEach((track, i) => {
    let trackWrapper = track.querySelectorAll(".track");
    let trackFlex = track.querySelectorAll(".track-flex");
    let allImgs = track.querySelectorAll(".image");
    let progress = track.querySelectorAll(".progress--bar-total");
  
    let sliders = gsap.utils.toArray(".panel-wide");
    let thumbs = gsap.utils.toArray(".thumbs");
    let visible = gsap.utils.toArray(".visible");
    
    let trackWrapperWidth = () => {
      let width = 0;
      trackWrapper.forEach((el) => (width += el.offsetWidth));
      return width;
    };
  
    let trackFlexWidth = () => {
      let width = 0;
      trackFlex.forEach((el) => (width += el.offsetWidth));
      return width;
    };
  
    ScrollTrigger.defaults({
  
    });
  
    gsap.defaults({
      ease: "none"
    });
  
    let scrollTween = gsap.to(trackWrapper, {
      x: () => -trackWrapperWidth() + window.innerWidth,
      scrollTrigger: {
        trigger: track,
        pin: true,
        anticipatePin: 1,
        //pinType: "transform",
        scrub: 1,
        start: "center center",
        end: () => "+=" + (track.scrollWidth - window.innerWidth),
        onRefresh: (self) => self.getTween().resetTo("totalProgress", 0),
        // fixes a very minor issue where the progress was starting at 0.001.
        invalidateOnRefresh: true
      }
    });
  
    allImgs.forEach((img, i) => {
      // the intended parallax animation
      gsap.fromTo(img, {
        x: "-20vw"
      }, {
        x: "20vw",
        scrollTrigger: {
          trigger: img.parentNode, //.panel-wide
          containerAnimation: scrollTween,
          start: "left right",
          end: "right left",
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: self => {
            if (gsap.start < 0) {
              self.animation.progress(gsap.utils.mapRange(self.start, self.end, 0, 1, 0));
            }
          }
        }
      });
    });
  
    let progressBar = gsap.timeline({
        scrollTrigger: {
          trigger: trackWrapper,
          containerAnimation: scrollTween,
          start: "left left",
          end: () => "+=" + (trackWrapperWidth() - window.innerWidth),
          scrub: true
        }
      }).to(progress, {
        width: "100%",
        ease: "none"
      });
  
    sliders.forEach((slider, i) => {
       
      let anim = gsap.timeline({
          scrollTrigger: {
            trigger: slider,
            containerAnimation: scrollTween,
            start: "left right",
            end: "right right",
            scrub: true,
            //onEnter: () => playLottie(i),
          }
        }).to(visible, {
          width: "100%",
          backgroundColor: "#1e90ff",
          ease: "none"
        });
    });
  
    sliders.forEach((slider, i) => {
    //   thumbs[i].onclick = () => {
    //     console.log(slider.getBoundingClientRect(i).left);
    //     gsap.to(window, {
    //       //scrollTo: "+=" + slider.getBoundingClientRect(i).left,
    //       scrollTo: {
    //         y: "+=" + slider.getBoundingClientRect(i).left,
    //       },
    //       duration: 0.5,
    //       overwrite: "auto"
    //     });
    //   };
    if (thumbs[i]) {
        thumbs[i].onclick = () => {
            console.log(slider.getBoundingClientRect(i).left);
            gsap.to(window, {
                scrollTo: {
                    y: "+=" + slider.getBoundingClientRect(i).left,
                },
                duration: 0.5,
                overwrite: "auto"
            });
        };
    }
    });
  
  });
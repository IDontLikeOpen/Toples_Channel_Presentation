const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');
//  FOR GSAP
const thumb1=  document.querySelector('.thumb-1');
const thumb2=  document.querySelector('.thumb-2');
const thumb3=  document.querySelector('.thumb-3');

const tl = new TimelineMax();

tl.fromTo(
  thumb1,
  2,
  { right: '350px'}, { right: '0'}
)

function selectItem(e){
    removeBorderandShow();
    this.classList.add('tab-border');
    //content item from the dom
    let tabContentItem = document.querySelector(`#${this.id}-content`);
    tabContentItem.classList.add('show');
}

function removeBorderandShow(){
    tabItems.forEach(item => item.classList.remove('tab-border'));
    tabContentItems.forEach(item => item.classList.remove('show'));
}

tabItems.forEach(item => item.addEventListener('click', selectItem));

// My GSAP addition

//////////////settings/////////
var movementSpeed = 80;
var totalObjects = 1000;
var objectSize = 50;
var sizeRandomness = 4000;
var colors = [0x56d0fd];
/////////////////////////////////
var dirs = [];
var parts = [];
document.querySelectorAll('#dir').forEach(dir => {
  var container = document.createElement('div')
  dir.appendChild( container )}) ;
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,1, 10000)
camera.position.z = 1000; 

var scene = new THREE.Scene(); 

function ExplodeAnimation(x,y)
{
  var geometry = new THREE.Geometry();
  
  for (i = 0; i < totalObjects; i ++) 
  { 
    var vertex = new THREE.Vector3();
    vertex.x = x;
    vertex.y = y;
    vertex.z = 0;
  
    geometry.vertices.push( vertex );
    dirs.push({x:(Math.random() * movementSpeed)-(movementSpeed/2),y:(Math.random() * movementSpeed)-(movementSpeed/2),z:(Math.random() * movementSpeed)-(movementSpeed/2)});
  }
  var material = new THREE.ParticleBasicMaterial( { size: objectSize,  color: colors[Math.round(Math.random() * colors.length)] });
  var particles = new THREE.ParticleSystem( geometry, material );
  
  this.object = particles;
  this.status = true;
  
  this.xDir = (Math.random() * movementSpeed)-(movementSpeed/2);
  this.yDir = (Math.random() * movementSpeed)-(movementSpeed/2);
  this.zDir = (Math.random() * movementSpeed)-(movementSpeed/2);
  
  scene.add( this.object  ); 
  
  this.update = function(){
    if (this.status == true){
      var pCount = totalObjects;
      while(pCount--) {
        var particle =  this.object.geometry.vertices[pCount]
        particle.y += dirs[pCount].y;
        particle.x += dirs[pCount].x;
        particle.z += dirs[pCount].z;
      }
      this.object.geometry.verticesNeedUpdate = true;
    }
  }
  
}

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelectorAll('#dir').forEach(dir => dir.appendChild( renderer.domElement ))

renderer.render( scene, camera );
parts.push(new ExplodeAnimation(0, 0));
render();

			function render() {
        requestAnimationFrame( render );
        var pCount = parts.length;
          while(pCount--) {
            parts[pCount].update();
          }

				renderer.render( scene, camera );

			}

window.addEventListener( 'mousedown', onclick, false );
window.addEventListener( 'resize', onWindowResize, false );

function onclick(){
  event.preventDefault();
  parts.push(new ExplodeAnimation((Math.random() * sizeRandomness)-(sizeRandomness/2), (Math.random() * sizeRandomness)-(sizeRandomness/2)));
}

function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}


//end of it

var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 9000);    
}

gsap.registerPlugin(ScrollTrigger)
gsap.fromTo(".grid-cards", {y: 500},{
scrollTrigger: ".grid-cards",
y: 0, duration: 0.15
});

// set and cache variables
var w, container, carousel, item, radius, itemLength, rY, ticker, fps; 
var mouseX = 0;
var mouseY = 0;
var mouseZ = 0;
var addX = 0;

var fps_counter = {
  
  tick: function () 
  {
    this.times = this.times.concat(+new Date());
    var seconds, times = this.times;
    
    if (times.length > this.span + 1) 
    {
      times.shift();
      seconds = (times[times.length - 1] - times[0]) / 1000;
      return Math.round(this.span / seconds);
    } 
    else return null;
  },

  times: [],
  span: 40
};
var counter = Object.create(fps_counter);



$(document).ready( init )

function init()
{
  w = $(window);
  container = $( '#contentContainer' );
  carousel = $( '#carouselContainer' );
  item = $( '.carouselItem' );
  itemLength = $( '.carouselItem' ).length;
  fps = $('#fps');
  rY = 360 / itemLength;
  radius = Math.round( (650) / Math.tan( Math.PI / itemLength ) );
  
  TweenMax.set(container, {perspective:600})
  TweenMax.set(carousel, {z:-(radius)})
  
  for ( var i = 0; i < itemLength; i++ )
  {
    var $item = item.eq(i);
    var $block = $item.find('.carouselItemInner');
    
    TweenMax.set($item, {rotationY:rY * i, z:radius, transformOrigin:"50% 50% " + -radius + "px"});
    
    animateIn( $item, $block )						
  }
  
  window.addEventListener( "mousemove", onMouseMove, false );
  ticker = setInterval( looper, 1000/60 );			
}

function animateIn( $item, $block )
{
  var $nrX = 360 * getRandomInt(2);
  var $nrY = 360 * getRandomInt(2);
    
  var $nx = -(2000) + getRandomInt( 4000 )
  var $ny = -(2000) + getRandomInt( 4000 )
  var $nz = -4000 +  getRandomInt( 4000 )
    
  var $s = 1.5 + (getRandomInt( 10 ) * .1)
  var $d = 1 - (getRandomInt( 8 ) * .1)
  
  TweenMax.set( $item, { autoAlpha:1, delay:$d } )	
  TweenMax.set( $block, { z:$nz, rotationY:$nrY, rotationX:$nrX, x:$nx, y:$ny, autoAlpha:0} )
  TweenMax.to( $block, $s, { delay:$d, rotationY:0, rotationX:0, z:0,  ease:Expo.easeInOut} )
  TweenMax.to( $block, $s-.5, { delay:$d, x:0, y:0, autoAlpha:1, ease:Expo.easeInOut} )
}

function onMouseMove(event)
{
  mouseX = -(-(window.innerWidth * .5) + event.pageX) * .0025;
  mouseY = -(-(window.innerHeight * .5) + event.pageY ) * .01;
  mouseZ = -(radius) - (Math.abs(-(window.innerHeight * .5) + event.pageY ) - 200);
}

function looper()
{
  addX += mouseX
  TweenMax.to( carousel, 1, { rotationY:addX, rotationX:mouseY, ease:Quint.easeOut } )
  TweenMax.set( carousel, {z:mouseZ } )
  fps.text( 'Framerate: ' + counter.tick() + '/60 FPS' )	
}

function getRandomInt( $n )
{
  return Math.floor((Math.random()*$n)+1);	
}
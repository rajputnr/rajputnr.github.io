$(document).ready(function(){
     $("#lantern").click(function(){
         $(".clouds").toggleClass("hide");
         $("#stars").toggleClass("show");
         

     });
    
});

var gravity = 0.15;
var particles = [];

function setup() {
  createCanvas($(window).width(), $(window).height());
  background(51,random(50,21));
  for (var i = 0; i < width/150;i++) {
    particles.push(new Particle(random(width), height, random(0.0215*height, 0.025*height),255,255,random(26,150)));
  }
}

function draw() {
  background(51,random(50,21));
  for (var i = 0; i < particles.length; i++) {
    particles[i].show();
  }
}




function Particle(x, y, u,r,b,g) {
  this.x = x;
  this.y = y;
  this.u = -u;
  this.r=r;
  this.b=b;
  this.g=g;
  this.exploded = false;
  this.visible = true;
  this.fragments = [];
  this.newGravity=gravity*0.5;
  //initial velocity of particle
  this.radius = random(7,14);

  this.bounds = function() {
    if (this.y > height) {
      this.reset();
    }
  }

  this.reset = function() {

    this.x = random(width);
    this.y = height;
    this.u = random(-5, -10);
    this.visible = true;
    this.exploded = false;
    this.fragments = [];
  }

  this.gravityWork = function() {
    this.y += this.u + (gravity * gravity / 2);
    this.u += gravity;
    
   
    
  };
  this.show = function() {
    
    noStroke();
    
    if (this.visible === true) {
      
      fill(this.r,this.b,this.g);
      ellipse(this.x+randomGaussian(random(7,8)), this.y, this.radius*0.6,this.radius+randomGaussian(random(30,9)));
    }
    
    else
      {
        for (var i = 0; i < this.fragments.length; i++) {
          this.fragments[i].show();
        }
      }

    this.gravityWork();
    this.bounds();
    this.setVisibility();
  };

  this.setVisibility = function() {
    if (this.u >= 0) {
      this.visible = false;
      
    }
      if (
        this.exploded === false && this.visible === false) {
        
  background(91,random(50,21));
        
        
        for (var i = 0; i < int(this.radius*3.5); i++) {
          //var explosionRadius=random(30,40);
          var explosionRadius=randomGaussian(40);
          
          var xOfFragment=random(this.x - explosionRadius, this.x + explosionRadius);
          
          var speedXofFragment=0;
          
          if(xOfFragment<this.x)
            {
              speedXofFragment=random(-5,0);
            }
          else
            {
              speedXofFragment=random(0,5);
            }
          
          this.fragments.push(new FragmentParticle(xOfFragment, random(this.y - explosionRadius/2, this.y +explosionRadius), random(this.u - 1, this.u + 1),this.r,this.b,this.g,speedXofFragment));
          
          
          
          
          this.fragments[this.fragments.length-1].show();
        }
        this.exploded = true;
        
  background(51,random(50,21));
      }
    

  };
}

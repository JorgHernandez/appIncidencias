document.write('<script type="text/javascript" charset="utf-8" src="scripts/globalFunctions.js"></script>');
//document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown(e) {
    e.preventDefault();
}
$(document).ready(function(){

    // window.location.href = 'listadoNotasLive.html';
 //window.localStorage.clear();   
    $("#preloader").delay(2900).fadeOut("fast");
  //  $('#botonv').attr("disabled", true);
    var user = window.localStorage.getItem("User");
    if(user != null)
    {
        if(user.length > 0)
        {
                
        }   
    }
    $("#salir").click(function (){
      
      navigator.app.exitApp();
    });

    $("#logaout").click(function(){

    window.location.href = 'index.html';
    window.localStorage.clear();
    });


    $("#botonnv").on("click" , function (){
//------verifico entradaexistente------
    var entradaexistente = window.localStorage.getItem("fecha");
    var verificaf = moment().format('L');
    //var verfecha = moment().format('L');
    //guardo la hora de entrada en local storage
    var guardahora = moment().format('LTS');
    var ggHora = window.localStorage.getItem("Ghora");
//------verifico entradaexistente------
//------obtenfgo los datos guardados en local storage User y  Pass------
    var user = window.localStorage.getItem("User");
    var pass = window.localStorage.getItem("Pass");
//------obtenfgo los datos guardados en local storage User y  Pass------
//------declaro esta variable y comparo si existe usuarios con retardo------
    var diferente = "1";
//------declaro esta variable y comparo si existe usuarios con retardo------
    
    var sendInfo ={}

    sendInfo['email']= user;
    sendInfo['incidencia']='Entrada';
    sendInfo['password']= pass;
    var jsonInfo = JSON.stringify(sendInfo);
    var domain = "http://incidenciastresite.azurewebsites.net";
                               
    $.ajax({
        headers: {
            'Content-Type':'application/json'
        },
        type: "POST",
        url: domain +'/NotificacionSlacks.aspx',
        data: jsonInfo,
        success: function(data){
        },
        error: function(data){
            $("#x").html("No pudo conectarse");
            setTimeout(function(){ $("#x").delay(900).fadeIn("slow"); }, 500);
            setTimeout(function(){ $("#x").delay(900).fadeOut("slow"); }, 3000);
        },
        dataType: 'json'
                                
                                
    });
    /*obtengo las horas de los usuarios guardados en el localstorage*/
    var horariod = window.localStorage.getItem("horario");
    var comidad = window.localStorage.getItem("comida");
    var intRetardo = window.localStorage.getItem("intRetardo");
    //-------------------------------------------------------------------------

    /*convierto a enteros los datos de comida y hora de trabajo*/
//--------------------------------------------------------------------------
    var numero1; var numero2; numero1 = parseInt(horariod); numero2 = parseInt(comidad);
//--------------------------------------------------------------------------
/*una vez convertidos enteros, hago la operacion para sacar la hora, sumo todo y divido entre 60*/
    var res = (numero1 + numero2)/60;
//_-------------------------------------------------------------------------
    
    //declaro los retardos para los que lleguen tarde
//--------------------------------------------------------------------------
var retardomenor =moment().format('7:30')+' P.M.';
var  retardomayor=moment().format('8:00')+' P.M.';
var momento = moment().format('hh:mm:ss');   
var hora1 = (momento).split(":"),
    hora2 = (guardahora).split(":"),
    hora3 = ("7:00:00 P.M."),
    hora4 = ("08:00:00").split(":"),

//------------------------------------------------------------------------------
//declaro lo que seria las para la hora
    t1 = new Date(),
    t2 = new Date();
//------------------------------------------------------------------------------
//---solo obtengo las horas-----------------------------------------------
t1.setHours(hora1[0], hora1[1], hora1[2]);
t2.setHours(hora2[0], hora2[1], hora2[2]);
//------------------------------------------------------------------------------

//Aquí hago la resta para tomar las horas o minutos faltantes
t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds());
var hours=t1.getHours();
var minutes=t1.getMinutes();
hours=hours%12;
hours=hours ? hours : 12;
minutes=minutes <10? '0'+minutes : minutes;
var strTime=hours+' Horas '+minutes+' minutos';
var strTime2=minutes +' Minutos';
var momento2= moment().add(9, 'hours').format('LT');
var tiempo = new Date();
var hora = tiempo.getHours()+"."+tiempo.getMinutes(); 
/*obtengo los datos del json*/
var c = moment().format('LT'); 
/*obtengo los datos del json*/
         $(document).ajaxComplete(function (){
             localStorage.setItem("fecha",verificaf);
            if(entradaexistente == verificaf){
                $("#mex").attr("style","color:black");
            $("#mex").html(" <h2>Tienes ya registrado una entrada</h2><h2>Fue a las: </h2><h1>"+ggHora+"</h1>");
            setTimeout(function(){ $("#existente").delay(500).fadeIn("slow"); }, 500);
            setTimeout(function(){ $("#existente").delay(1900).fadeOut("slow"); }, 11000);
            }
            else{

        if (c <= 9+":"+29){           
        localStorage.setItem("Ghora",guardahora);
        $("#x").attr("style","color:black");
        $("#x").html(" <h2>En Hora Buena</h2></br>Tresite te avisa que tú salida será a las <b><h1>"+ moment().add(res, 'hours').format('LT'))+"</h1>";
        setTimeout(function(){ $("#horasalida").delay(900).fadeIn("slow"); }, 500);
        setTimeout(function(){ $("#horasalida").delay(1900).fadeOut("slow"); }, 10000);
        }
        else if(c >= 9+":"+30)
        {
            if(diferente == intRetardo){
                    localStorage.setItem("Ghora",guardahora);
                    
                    if(c <= 9+":"+59 ){
                        alert("soy una alerta y no respeto");
                        $("#messg").attr("style","color:#ef4304");
                        $("#messg").html(" <font color='red'><h4>Tienes retardo de: </h4><h2>"+strTime2+"</h2><h3>tu salida sera a las</h3>"+retardomenor+"</h3>");
                        setTimeout(function(){ $("#errorSitio").delay(900).fadeIn("slow"); }, 500);
                        setTimeout(function(){ $("#errorSitio").delay(1900).fadeOut("slow"); }, 19000);        
                    }
                    else if(c >= 10+":"+00){
                        alert(strTime);
                        localStorage.setItem("Ghora",guardahora);
                         $("#messg").attr("style","color:#ef4304");
                         $("#messg").html("<font color='red'><h4>Tienes retardo de: </h4><h2>"+strTime2+"</h2><h3>tu salida sera a las</h3>"+retardomayor+"</h3>");
                         setTimeout(function(){ $("#errorSitio").delay(400).fadeIn("slow"); }, 500);
                         setTimeout(function(){ $("#errorSitio").delay(1900).fadeOut("slow"); }, 19000);
                    }
                $("#messg").attr("style","color:#ef4304");
                $("#messg").html(" <h4><font color='red'>Tienes un retardo de: </h4><h2>"+strTime2+"</h2><br>tu salida sera a las<h3>"+retardomenor+"</h3>");
                setTimeout(function(){ $("#errorSitio").delay(400).fadeIn("slow"); }, 500);
                setTimeout(function(){ $("#errorSitio").delay(1900).fadeOut("slow"); }, 10000);
            }
            
            else {
                localStorage.setItem("Ghora",guardahora);
                $("#messg").attr("style","color:black");
                $("#messg").html(" <h3>En Hora Buena</h3></br>Tresite te avisa que tú salida será a las <b><h1>"+ moment().add(res, 'hours').format('LT'))+"<h1></b>";
                setTimeout(function(){ $("#errorSitio").delay(900).fadeIn("slow"); }, 500);
                setTimeout(function(){ $("#errorSitio").delay(1900).fadeOut("slow"); }, 10000);
            }

        }
    }
  });
});
    
var retardomenor =moment().format('7:30')+' P.M.';
var  retardomayor=moment().format('8:00')+' P.M.';
var momento = moment().format('hh:mm:ss');   
var hora1 = (momento).split(":"),
    hora2 = ("09:30:00").split(":"),
    hora3 = ("7:00:00 P.M."),
    hora4 = ("08:00:00").split(":"),
    t1 = new Date(),
    t2 = new Date();
 
t1.setHours(hora1[0], hora1[1], hora1[2]);
t2.setHours(hora2[0], hora2[1], hora2[2]);
 
//Aquí hago la resta
t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds());
var hours=t1.getHours();
var minutes=t1.getMinutes();
hours=hours%12;
hours=hours ? hours : 12;
minutes=minutes <10? '0'+minutes : minutes;
var strTime=hours+' Horas '+minutes+' minutos';
var strTime2=minutes +' Minutos';
var momento2= moment().add(9, 'hours').format('LT');
var tiempo = new Date();
var hora = tiempo.getHours()+"."+tiempo.getMinutes(); 
    $("#botonv").on("click" , function(){
        localStorage.removeItem("fecha");
       // guardahora.clear();
        var user = window.localStorage.getItem("User");
    var pass = window.localStorage.getItem("Pass");
    var sendInfo ={}
    sendInfo['email']= user;
    sendInfo['incidencia']='Salida';
    sendInfo['password']= pass;
    var jsonInfo = JSON.stringify(sendInfo);
    var domain = "http://incidenciastresite.azurewebsites.net";
    $.ajax({
        headers: {
            'Content-Type':'application/json'
        },
        type: "POST",
        url: domain +'/NotificacionSlacks.aspx',
        data: jsonInfo,
        success: function(data){
        },
        error: function(data){
            $("#loadinglogin").fadeOut();
            setTimeout(function(){ $("#errorConexion").delay(900).fadeIn("slow"); }, 500);
            setTimeout(function(){ $("#errorConexion").delay(900).fadeOut("slow"); }, 3000);
        },
        dataType: 'json'
    });
     $(document).ajaxComplete(function (){
            $("#messagesalida").attr("style","color:black");
            $("#messagesalida").html(" <h4>Tresite te desea Un buen día</h4><br><h3>Tus horas dentro de Tresite son: </h3>"+strTime);
             setTimeout(function(){ $("#salida").delay(900).fadeIn("slow"); }, 500);
                setTimeout(function(){ $("#salida").delay(1900).fadeOut("slow"); }, 11000);
       // $('#botonv').attr("disabled", true);
    });
    });

});




/*deslizar botones */

window.Swipe = function(element, options) {

  // return immediately if element doesn't exist
  if (!element) return null;

  var _this = this;

  // retreive options
  this.options = options || {};
  this.index = this.options.startSlide || 0;
  this.speed = this.options.speed || 300;
  this.callback = this.options.callback || function() {};
  this.delay = this.options.auto || 0;

  // reference dom elements
  this.container = element;
  this.element = this.container.children[0]; // the slide pane

  // static css
  this.container.style.overflow = 'hidden';
  this.element.style.listStyle = 'none';

  // trigger slider initialization
  this.setup();

  // begin auto slideshow
  this.begin();

  // add event listeners
  if (this.element.addEventListener) {
    this.element.addEventListener('touchstart', this, false);
    this.element.addEventListener('touchmove', this, false);
    this.element.addEventListener('touchend', this, false);
    this.element.addEventListener('webkitTransitionEnd', this, false);
    this.element.addEventListener('msTransitionEnd', this, false);
    this.element.addEventListener('oTransitionEnd', this, false);
    this.element.addEventListener('transitionend', this, false);
    window.addEventListener('resize', this, false);
  }

};

Swipe.prototype = {

  setup: function() {

    // get and measure amt of slides
    this.slides = this.element.children;
    this.length = this.slides.length;

    // return immediately if their are less than two slides
    if (this.length < 2) return null;

    // determine width of each slide
    this.width = this.container.getBoundingClientRect().width;

    // return immediately if measurement fails
    if (!this.width) return null;

    // hide slider element but keep positioning during setup
    this.container.style.visibility = 'hidden';

    // dynamic css
    this.element.style.width = (this.slides.length * this.width) + 'px';
    var index = this.slides.length;
    while (index--) {
      var el = this.slides[index];
      el.style.width = this.width + 'px';
      el.style.display = 'table-cell';
      el.style.verticalAlign = 'top';
    }

    // set start position and force translate to remove initial flickering
    this.slide(this.index, 0); 

    // show slider element
    this.container.style.visibility = 'visible';

  },

  slide: function(index, duration) {

    var style = this.element.style;

    // fallback to default speed
    if (duration == undefined) {
        duration = this.speed;
    }

    // set duration speed (0 represents 1-to-1 scrolling)
    style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + 'ms';

    // translate to given index position
    style.MozTransform = style.webkitTransform = 'translate3d(' + -(index * this.width) + 'px,0,0)';
    style.msTransform = style.OTransform = 'translateX(' + -(index * this.width) + 'px)';

    // set new index to allow for expression arguments
    this.index = index;

  },

  getPos: function() {
    
    // return current index position
    return this.index;

  },

  prev: function(delay) {

    // cancel next scheduled automatic transition, if any
    this.delay = delay || 0;
    clearTimeout(this.interval);

    // if not at first slide
    if (this.index) this.slide(this.index-1, this.speed);

  },

  next: function(delay) {

    // cancel next scheduled automatic transition, if any
    this.delay = delay || 0;
    clearTimeout(this.interval);

    if (this.index < this.length - 1) this.slide(this.index+1, this.speed); // if not last slide
    else this.slide(0, this.speed); //if last slide return to start

  },

  begin: function() {

    var _this = this;

    this.interval = (this.delay)
      ? setTimeout(function() { 
        _this.next(_this.delay);
      }, this.delay)
      : 0;
  
  },
  
  stop: function() {
    this.delay = 0;
    clearTimeout(this.interval);
  },
  
  resume: function() {
    this.delay = this.options.auto || 0;
    this.begin();
  },

  handleEvent: function(e) {
    switch (e.type) {
      case 'touchstart': this.onTouchStart(e); break;
      case 'touchmove': this.onTouchMove(e); break;
      case 'touchend': this.onTouchEnd(e); break;
      case 'webkitTransitionEnd':
      case 'msTransitionEnd':
      case 'oTransitionEnd':
      case 'transitionend': this.transitionEnd(e); break;
      case 'resize': this.setup(); break;
    }
  },

  transitionEnd: function(e) {
    
    if (this.delay) this.begin();

    this.callback(e, this.index, this.slides[this.index]);

  },

  onTouchStart: function(e) {
    
    this.start = {

      // get touch coordinates for delta calculations in onTouchMove
      pageX: e.touches[0].pageX,
      pageY: e.touches[0].pageY,

      // set initial timestamp of touch sequence
      time: Number( new Date() )

    };

    // used for testing first onTouchMove event
    this.isScrolling = undefined;
    
    // reset deltaX
    this.deltaX = 0;

    // set transition time to 0 for 1-to-1 touch movement
    this.element.style.MozTransitionDuration = this.element.style.webkitTransitionDuration = 0;

  },

  onTouchMove: function(e) {

    // ensure swiping with one touch and not pinching
    if(e.touches.length > 1 || e.scale && e.scale !== 1) return;

    this.deltaX = e.touches[0].pageX - this.start.pageX;

    // determine if scrolling test has run - one time test
    if ( typeof this.isScrolling == 'undefined') {
      this.isScrolling = !!( this.isScrolling || Math.abs(this.deltaX) < Math.abs(e.touches[0].pageY - this.start.pageY) );
    }

    // if user is not trying to scroll vertically
    if (!this.isScrolling) {

      // prevent native scrolling 
      e.preventDefault();

      // cancel slideshow
      clearTimeout(this.interval);

      // increase resistance if first or last slide
      this.deltaX = 
        this.deltaX / 
          ( (!this.index && this.deltaX > 0               // if first slide and sliding left
            || this.index == this.length - 1              // or if last slide and sliding right
            && this.deltaX < 0                            // and if sliding at all
          ) ?                      
          ( Math.abs(this.deltaX) / this.width + 1 )      // determine resistance level
          : 1 );                                          // no resistance if false
      
      // translate immediately 1-to-1
      this.element.style.MozTransform = this.element.style.webkitTransform = 'translate3d(' + (this.deltaX - this.index * this.width) + 'px,0,0)';

    }

  },

  onTouchEnd: function(e) {

    // determine if slide attempt triggers next/prev slide
    var isValidSlide = 
          Number(new Date()) - this.start.time < 250      // if slide duration is less than 250ms
          && Math.abs(this.deltaX) > 20                   // and if slide amt is greater than 20px
          || Math.abs(this.deltaX) > this.width/2,        // or if slide amt is greater than half the width

    // determine if slide attempt is past start and end
        isPastBounds = 
          !this.index && this.deltaX > 0                          // if first slide and slide amt is greater than 0
          || this.index == this.length - 1 && this.deltaX < 0;    // or if last slide and slide amt is less than 0

    // if not scrolling vertically
    if (!this.isScrolling) {

      // call slide function with slide end value based on isValidSlide and isPastBounds tests
      this.slide( this.index + ( isValidSlide && !isPastBounds ? (this.deltaX < 0 ? 1 : -1) : 0 ), this.speed );

    }

  }

};
/*
 * Swipe 1.0
 *
 * Brad Birdsall, Prime
 * Copyright 2011, Licensed GPL & MIT
 *
*/

window.Swipe = function(element, options) {

  // return immediately if element doesn't exist
  if (!element) return null;

  var _this = this;

  // retreive options
  this.options = options || {};
  this.index = this.options.startSlide || 0;
  this.speed = this.options.speed || 300;
  this.callback = this.options.callback || function() {};
  this.delay = this.options.auto || 0;

  // reference dom elements
  this.container = element;
  this.element = this.container.children[0]; // the slide pane

  // static css
  this.container.style.overflow = 'hidden';
  this.element.style.listStyle = 'none';

  // trigger slider initialization
  this.setup();

  // begin auto slideshow
  this.begin();

  // add event listeners
  if (this.element.addEventListener) {
    this.element.addEventListener('touchstart', this, false);
    this.element.addEventListener('touchmove', this, false);
    this.element.addEventListener('touchend', this, false);
    this.element.addEventListener('webkitTransitionEnd', this, false);
    this.element.addEventListener('msTransitionEnd', this, false);
    this.element.addEventListener('oTransitionEnd', this, false);
    this.element.addEventListener('transitionend', this, false);
    window.addEventListener('resize', this, false);
  }

};

Swipe.prototype = {

  setup: function() {

    // get and measure amt of slides
    this.slides = this.element.children;
    this.length = this.slides.length;

    // return immediately if their are less than two slides
    if (this.length < 2) return null;

    // determine width of each slide
    this.width = this.container.getBoundingClientRect().width;

    // return immediately if measurement fails
    if (!this.width) return null;

    // hide slider element but keep positioning during setup
    this.container.style.visibility = 'hidden';

    // dynamic css
    this.element.style.width = (this.slides.length * this.width) + 'px';
    var index = this.slides.length;
    while (index--) {
      var el = this.slides[index];
      el.style.width = this.width + 'px';
      el.style.display = 'table-cell';
      el.style.verticalAlign = 'top';
    }

    // set start position and force translate to remove initial flickering
    this.slide(this.index, 0); 

    // show slider element
    this.container.style.visibility = 'visible';

  },

  slide: function(index, duration) {

    var style = this.element.style;

    // fallback to default speed
    if (duration == undefined) {
        duration = this.speed;
    }

    // set duration speed (0 represents 1-to-1 scrolling)
    style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + 'ms';

    // translate to given index position
    style.MozTransform = style.webkitTransform = 'translate3d(' + -(index * this.width) + 'px,0,0)';
    style.msTransform = style.OTransform = 'translateX(' + -(index * this.width) + 'px)';

    // set new index to allow for expression arguments
    this.index = index;

  },

  getPos: function() {
    
    // return current index position
    return this.index;

  },

  prev: function(delay) {

    // cancel next scheduled automatic transition, if any
    this.delay = delay || 0;
    clearTimeout(this.interval);

    // if not at first slide
    if (this.index) this.slide(this.index-1, this.speed);

  },

  next: function(delay) {

    // cancel next scheduled automatic transition, if any
    this.delay = delay || 0;
    clearTimeout(this.interval);

    if (this.index < this.length - 1) this.slide(this.index+1, this.speed); // if not last slide
    else this.slide(0, this.speed); //if last slide return to start

  },

  begin: function() {

    var _this = this;

    this.interval = (this.delay)
      ? setTimeout(function() { 
        _this.next(_this.delay);
      }, this.delay)
      : 0;
  
  },
  
  stop: function() {
    this.delay = 0;
    clearTimeout(this.interval);
  },
  
  resume: function() {
    this.delay = this.options.auto || 0;
    this.begin();
  },

  handleEvent: function(e) {
    switch (e.type) {
      case 'touchstart': this.onTouchStart(e); break;
      case 'touchmove': this.onTouchMove(e); break;
      case 'touchend': this.onTouchEnd(e); break;
      case 'webkitTransitionEnd':
      case 'msTransitionEnd':
      case 'oTransitionEnd':
      case 'transitionend': this.transitionEnd(e); break;
      case 'resize': this.setup(); break;
    }
  },

  transitionEnd: function(e) {
    
    if (this.delay) this.begin();

    this.callback(e, this.index, this.slides[this.index]);

  },

  onTouchStart: function(e) {
    
    this.start = {

      // get touch coordinates for delta calculations in onTouchMove
      pageX: e.touches[0].pageX,
      pageY: e.touches[0].pageY,

      // set initial timestamp of touch sequence
      time: Number( new Date() )

    };

    // used for testing first onTouchMove event
    this.isScrolling = undefined;
    
    // reset deltaX
    this.deltaX = 0;

    // set transition time to 0 for 1-to-1 touch movement
    this.element.style.MozTransitionDuration = this.element.style.webkitTransitionDuration = 0;

  },

  onTouchMove: function(e) {

    // ensure swiping with one touch and not pinching
    if(e.touches.length > 1 || e.scale && e.scale !== 1) return;

    this.deltaX = e.touches[0].pageX - this.start.pageX;

    // determine if scrolling test has run - one time test
    if ( typeof this.isScrolling == 'undefined') {
      this.isScrolling = !!( this.isScrolling || Math.abs(this.deltaX) < Math.abs(e.touches[0].pageY - this.start.pageY) );
    }

    // if user is not trying to scroll vertically
    if (!this.isScrolling) {

      // prevent native scrolling 
      e.preventDefault();

      // cancel slideshow
      clearTimeout(this.interval);

      // increase resistance if first or last slide
      this.deltaX = 
        this.deltaX / 
          ( (!this.index && this.deltaX > 0               // if first slide and sliding left
            || this.index == this.length - 1              // or if last slide and sliding right
            && this.deltaX < 0                            // and if sliding at all
          ) ?                      
          ( Math.abs(this.deltaX) / this.width + 1 )      // determine resistance level
          : 1 );                                          // no resistance if false
      
      // translate immediately 1-to-1
      this.element.style.MozTransform = this.element.style.webkitTransform = 'translate3d(' + (this.deltaX - this.index * this.width) + 'px,0,0)';

    }

  },

  onTouchEnd: function(e) {

    // determine if slide attempt triggers next/prev slide
    var isValidSlide = 
          Number(new Date()) - this.start.time < 250      // if slide duration is less than 250ms
          && Math.abs(this.deltaX) > 20                   // and if slide amt is greater than 20px
          || Math.abs(this.deltaX) > this.width/2,        // or if slide amt is greater than half the width

    // determine if slide attempt is past start and end
        isPastBounds = 
          !this.index && this.deltaX > 0                          // if first slide and slide amt is greater than 0
          || this.index == this.length - 1 && this.deltaX < 0;    // or if last slide and slide amt is less than 0

    // if not scrolling vertically
    if (!this.isScrolling) {

      // call slide function with slide end value based on isValidSlide and isPastBounds tests
      this.slide( this.index + ( isValidSlide && !isPastBounds ? (this.deltaX < 0 ? 1 : -1) : 0 ), this.speed );

    }

  }

};
/*deslizar botones entrada y salida */
# Import file "saveAnimation"
$ = Framer.Importer.load("imported/saveAnimation@1x")

Framer.Loop.delta = 1 / 160

$.spinner.x = Align.center()
$.spinner.y = Align.center()

$.saved.opacity = 0
$.birthCertificate.opacity = 0
$.tick.opacity = 0
$.tick.scale = 0
$.circle_success.opacity = 0

$.circle_partial_green.states.spin =
	rotation: 1080
	animationOptions:
		time: 1.5
		curve: Bezier.ease
		
$.circle_partial_green.states.fadeOut =
	opacity: 0
	animationOptions:
		curve: "spring(100,10,10)"
		delay: 1		

$.circle_success.states.fadeIn =
	opacity: 1
	animationOptions:
		curve: "spring(100,10,10)"
		delay: 1
		
$.circle_success.states.fadeOut =
	opacity: 0
	animationOptions:
		curve: "spring(100,20,10)"
	
$.tick.states.fadeIn =
	opacity: 1
	scale: 1
	animationOptions:
		delay:  1.1
		curve: "spring(500,30,10)"
		
$.tick.states.fadeOut =
	opacity: 0
	scale: 0
	animationOptions:
		delay:  0.1
		curve: "spring(300,20,10)"
	
$.saving.states.fadeOut =
	opacity: 0
	animationOptions:
		curve: "spring(250,20,0)"
		delay: 0.7
	
$.bg_grey.states.fadeOut =
	opacity: 0
	animationOptions:
		delay: 1.8
		curve: "spring(100,25,2)"
	
$.bg_grey.on Events.Click, ->
	$.circle_partial_green.animate("spin")
	$.circle_success.animate("fadeIn")
	$.tick.animate("fadeIn")
	$.saving.animate("fadeOut")	
	$.bg_grey.animate("fadeOut")
	
$.tick.on Events.AnimationEnd, ->
	$.tick.animate("fadeOut")
	$.circle_success.animate("fadeOut")
	$.circle_partial_green.animate("fadeOut")








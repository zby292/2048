function showAnimation(a,b,randNum){

	var numbercell=$('#number-cell-'+a+'-'+b);
	numbercell.css('background-color',getNumbergc(randNum));
	numbercell.css('color',getNumbercolor(randNum));
	numbercell.text(randNum);

	numbercell.animate({
		width:cellwidth,
		height:cellwidth,
		top:topp(a,b),
		left:leftt(a,b)
	},500)
}


function  shwomoveanimation(fx,fy,tx,ty){
	var numbercell=$('number-cell-'+fx+'-'+fy);
	numbercell.animate({
		top:topp(tx,ty),
		left:leftt(tx,ty)
	},200);
}
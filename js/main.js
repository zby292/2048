var nums=new Array();
var score=0;
var hascf=new Array();

var startx=0;
var starty=0;
var endx=0;
var endy=0;

$(document).ready(function(){
  startgame();

})

function startgame(){
	if(dwidth>500){
		ctwidth=500;
		cellwidth=100;
		cellspace=20

	}else{
		settingmb();
	}
	
	init();
	numberOne();
	numberOne();
}


function settingmb(){
	$('.heaDer ').css('width',ctwidth);
	$('.content').css('width',ctwidth-cellspace*2);
	$('.content').css('height',ctwidth-cellspace*2);
	$('.content').css('padding',cellspace);
	$('.content').css('border-radius',ctwidth*0.02);

	$('.dyg').css('width',cellwidth);
	$('.dyg').css('height',cellwidth);
	$('.dyg').css('border-radius',cellwidth*0.06);

}

function init(){
	for(var a=0;a<4;a++){
		for(var b=0;b<4;b++){
			var dyg=$('#dyg-'+a+'-'+b);
			dyg.css('top',topp(a,b));
			dyg.css('left',leftt(a,b));
		}
	}

	for(var a=0;a<4;a++){
		nums[a]=new Array();
		hascf[a]=new Array();
		for(var b=0;b<4;b++){
			nums[a][b]=0;
			hascf[a][b]=false;
		}
	}


updateview();
score=0;
updatacore(score);

}

function updateview(){
	$('.number-cella').remove();
	for(var a=0;a<4;a++){
		for(var b=0;b<4;b++){
			$('.content').append('<div class="number-cella" id="number-cell-'+a+'-'+b+'"></div>');
			var numcell=$('#number-cell-'+a+'-'+b);

			if(nums[a][b]==0){
				numcell.css('width','0px');
				numcell.css('height','0px');
				numcell.css('top',topp(a,b)+cellwidth*0.5);
				numcell.css('left',leftt(a,b)+cellwidth*0.5);
			}else{
				numcell.css('width',cellwidth);
				numcell.css('height',cellwidth);
				numcell.css('top',topp(a,b));
				numcell.css('left',leftt(a,b));
				numcell.css('background-color',getNumbergc(nums[a][b]));
				numcell.css('color',getNumbercolor(nums[a][b]))
				numcell.text(nums[a][b]);
			}
			hascf[a][b]=false;

			$('.number-cella').css('border-radius',cellwidth*0.06);
			$('.number-cella').css('font-size',cellwidth*0.5);
			$('.number-cella').css('line-height',cellwidth+'px');

		}
		
	}
}

function numberOne(){
	if(noSpace(nums)){
		return;
	}

	var count=0;
	var temp=new Array();
	for(var a=0;a<4;a++){
		for(var b=0;b<4;b++){
			if(nums[a][b]==0){
				temp[count]=a*4+b;
				count++;
			}
		}
	}
	var pos=Math.floor(Math.random()*count);
	var randx=Math.floor(temp[pos]/4);
	var randy=Math.floor(temp[pos]%4);

	var randNum=Math.random()<0.5?2:4;

	nums[randx][randy]=randNum;
	showAnimation(randx,randy,randNum);
}
//键盘挤压 
$(document).keydown(function(event){
	// event.preventDefault();
	switch(event.keyCode){
		case 37:
			event.preventDefault();
			if(canmoveleft(nums)){
				moveleft();
				setTimeout(numberOne,200);
				setTimeout(alerta,200);

			}
			break;
		case 38:
			event.preventDefault();
			if(canmoveup(nums)){
				moveup();
				setTimeout(numberOne,200);
				setTimeout(alerta,200);
			}
			break;
		case 39:
			event.preventDefault();
			if(canmoveright(nums)){
				moveright();
				setTimeout(numberOne,200);
				setTimeout(alerta,200);
			}
			break;

		case 40:
			event.preventDefault();
			if(canmovedown(nums)){
				movedown();
				setTimeout(numberOne,200);
				setTimeout(alerta,200);
			}
			break;	
			default:
			break;
	}
});

//手机触摸
document.addEventListener('touchstart',function(event){
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;

	//判断滑动方向
	var deltax=endx-startx;
	var deltay=endy-starty;

	//判断当滑动距离小于一定的阈值时不做任何操作
	if(Math.abs(deltax)<dwidth*0.08 && Math.abs(deltay)<dwidth*0.08){
		return;
	}

	if(Math.abs(deltax)>=Math.abs(deltay)){ //水平方向移动
		if(deltax>0){ //向右移动
			if(canmoveright(nums)){
				moveright();
				setTimeout(numberOne,200);
				setTimeout(alerta,200);
			}
		}else{ //向左移动
			if(canmoveleft(nums)){
				moveleft();
				setTimeout(numberOne,200);
				setTimeout(alerta,200);
			}
		}
	}else{ //垂直方向移动
		if(deltay>0){ //向下移动
			if(canmovedown(nums)){
				movedown();
				setTimeout(numberOne,200);
				setTimeout(alerta,200);
			}
		}else{ //向上移动
			if(canmoveup(nums)){
				moveup();
				setTimeout(numberOne,200);
				setTimeout(alerta,200);
			}
		}
	}

});




function moveleft(){
	for(var a=0;a<4;a++){
		for(var b=0;b<4;b++){
			if(nums[a][b]!=0){
				for(var c=0;c<b;c++){
					if(nums[a][c]==0 && blockhor(a,b,c,nums)){
						shwomoveanimation(a,b,a,c);
						nums[a][c]=nums[a][b];
						nums[a][b]=0;
						break;
					}else if(
						nums[a][c]==nums[a][b]&& blockhor(a,c,b,nums)&&! hascf[a][c])
							{
							shwomoveanimation(a,b,a,c);
							nums[a][c]+=nums[a][b];
							nums[a][b]=0;

							score+=nums[a][c];
							updatacore(score);
							hascf[a][c]=true;
							break;
						}
					}
				}
			}
		}	
		setTimeout(updateview,200);
	}

function moveright(){
	for(var a=0;a<4;a++){
		for(var b=2;b>=0;b--){
			if(nums[a][b]!=0){
				for(var c=3;c>b;c--){
					if(nums[a][c]==0 &&blockhor(a,b,c,nums)&& !hascf[a][b]){
						shwomoveanimation(a,c,a,b);
						nums[a][c]=nums[a][b];
						nums[a][b]=0;
						break;
					}else if(nums[a][c]==nums[a][b]&&blockhor(a,b,c,nums)&&  !hascf[a][c]){
						shwomoveanimation(a,b,a,c);
						nums[a][c]+=nums[a][c];
						nums[a][b]=0;
						score+=nums[a][c];
						updatacore(score);

						hascf[a][c]=true;
						break;

					}
				}
			}
		}
	}
	setTimeout(updateview,200);
}

function moveup(){
	for(var a=0;a<4;a++){
		for(var b=1;b<4;b++){
			if(nums[b][a]!=0){
				for(var c=0;c<b;c++){
					if(nums[c][a]==0&& blockvic(a,c,b,nums)){
						shwomoveanimation(b,a,c,a);
						nums[c][a]=nums[b][a];
						nums[b][a]=0;
						break;
					}else if(nums[c][a]==nums[b][a]&& blockvic(a,c,b,nums)&& !hascf[c][a]){
						shwomoveanimation(b,a,c,a);
						nums[c][a]+=nums[b][a];
						nums[b][a]=0;
						score+=nums[c][a];
						updatacore(score);

						hascf[c][a]=true;
						break;
					}
				}
			}
		}
	}
	setTimeout(updateview,200);
}


function movedown(){
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(nums[i][j]!=0){
				for(var k=3;k>i;k--){
					if(nums[k][j]==0 && blockvic(j,i,k,nums)){ //第j列的第i-k行之间是否有障碍物
						shwomoveanimation(i,j,k,j);
						nums[k][j]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[k][j]==nums[i][j]  && blockvic(j,i,k,nums) && !hascf[k][j]){
						shwomoveanimation(i,j,k,j);
						nums[k][j]+=nums[i][j];
						nums[i][j]=0;
						score+=nums[k][j];
						updatacore(score);

						hascf[k][j]=true;
						break;
					}
				}	
			}
		}
	}
	setTimeout(updateview,200);
}
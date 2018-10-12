var dwidth=document.documentElement.clientWidth;
var ctwidth=dwidth*0.92;
var cellwidth=dwidth*0.18;
var cellspace=dwidth*0.04;
// console.log(dwidth,ctwidth,cellwidth,cellspace);

function topp(a,b){
return cellspace+(cellwidth+cellspace)*a;
}


function leftt(a,b){
return cellspace+(cellwidth+cellspace)*b;
}

function getNumbergc(num){
switch(num){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
}

function getNumbercolor(num){
	if(num<=4){
		return '#776e65';
	}else{
		return '#fff';
	}
}

function noSpace(){
	for(var a=0;a<4;a++){
		for(var b=0;b<4;b++){
			if(nums[a][b]==0){
				return false;
			}
		}
	}
	return true;
}

function canmoveleft(nums){
	for(var a=0;a<4;a++){
		for(var b=0;b<4;b++){
			if(nums[a][b]!=0){
				if(nums[a][b-1]==0 || nums[a][b-1]==nums[a][b]){
					return true;
				}
			}
		}
	}
	return false;
}

function canmoveright(nums){
	for(var a=0;a<4;a++){
		for(var b=0;b<3;b++){
			if(nums[a][b]!=0){
				if(nums[a][b+1]==0 || nums[a][b+1]==nums[a][b]){
					return true;
				}
			}
		}
	}
	return false;
}

function canmoveup(nums){
	for(var a=1;a<4;a++){
		for(var b=0;b<4;b++){
			if(nums[a][b]!=0){
				if(nums[a-1][b]==0 || nums[a-1][b]==nums[a][b]){
					return true;
				}
			}
		}
	}
	return false;
}

function canmovedown(nums){
	for(var a=0;a<3;a++){
		for(var b=0;b<4;b++){
			if(nums[a][b]!=0){
				if(nums[a+1][b]==0 || nums[a+1][b]==nums[a][b]){
					return true;
				}
			}
		}
	}
	return false;
}

function blockhor(row,col1,col2,nums){
	for(var a=col1+1;a<col2;a++){
		if(nums[row][a]!=0){
			return false;
		}
	}
	return true;
}


function blockvic(col,row1,row2,nums){
	for(var a=row1+1;a<row2;a++){
		if(nums[a][col]!=0){
			return false;
		}
	}
	return true;
}

function updatacore(score){
	$("#score").text(score);
}

function nomove(nums){
	if(canmoveleft(nums) || canmoveright(nums) ||canmoveup(nums)||canmovedown(nums)){
		return false;
	}return true;
}

function alerta(){
	if(noSpace(nums) && nomove(nums)){
		alert('游戏结束');
	}
}
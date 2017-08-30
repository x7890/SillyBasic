
//SillyBasic By x7890

//请先设置输出函数_printstr
//BASIC要求第一个字符不能为下划线，之后才可以，所以转换中使用的标识符全用下划线开头

sbCr='\r';
sbLf='\n';
sbCrLf='\n';

//模拟函数实现
//数学函数
function ABS(x){return Math.abs(x);}
function ATN(x){return Math.atan(x);}//注意不是atan！
function COS(x){return Math.cos(x);}
function EXP(x){return Math.exp(x);}
function FIX(x){return parseInt(x);}//取整数部分！
function INT(x){return Math.floor(x);}//下取整！
function LOG(x){return Math.log(x);}
function SIN(x){return Math.sin(x);}
function SQR(x){return Math.sqrt(x);}//求得的是算术平方根！
function TAN(x){return Math.tan(x);}
function ROUND(x,t){
	if(t==undefined)return Math.round(x);
	return Math.round(x*Math.pow(10,t))/Math.pow(10,t);
}
function SGN(x){
	if(x>0)return 1;
	if(x<0)return -1;
	return 0;
}
//以下为补充的数学函数，非BASIC标准
function ASIN(x){return Math.asin(x);}
function ACOS(x){return Math.acos(x);}
function ATAN2(y,x){return Math.atan2(y,x);}
function CEIL(x){return Math.ceil(x);}
function FLOOR(x){return Math.floor(x);}
function MAX(x,y){return x>y?x:y;/*return Math.max(x,y);*/}
function MIN(x,y){return x<y?x:y;/*return Math.min(x,y);*/}
function POW(x,y){return Math.pow(x,y);}
//随机函数
function RAND(){return Math.random();}//返回值在[0,1)间，左闭右开（可能是用取模实现的）
function RANDOMIZE(){}//Math库没有，大概不需要吧
//财务函数没有实现
//日期和时间函数没有实现
//字符和字符串、进制处理函数，只实现了部分
function ARRAY(){return arguments;}

function ASC(s){return s.charCodeAt();}
function CBOOL(s){return Boolean(s);}
function CSNG(s){return parseFloat(s);}
function CDBL(s){return parseFloat(s);}
function CHR(d){return String.fromCharCode(d);}
function CINT(s){return parseInt(s);}
function CLNG(s){return parseInt(s);}
function CSTR(s){return s.toString();}
function HEX(s){return s.toString(16);}
function OCT(s){return s.toString(8);}
function BIN(s){return s.toString(2);}//非标准
function UCASE(s){return s.toUpperCase();}
function LCASE(s){return s.toLowerCase();}
function STR(s){//STR返回的第1位必须不是数字
	var ss=s.toString();
	if(ss.charAt(0)!='-')ss=' '+ss;
	return ss;
}
//字符串格式化函数

//文件处理函数没有实现
//程序语法类函数，switch没有实现
function IIF(b,x,y){return b?x:y;}
function EXECUTE(str){return eval(BASIC2JS(str));}
//对话框类函数，由于限制，只能修改网页标题！
function INPUTBOX(sPrompt,sTitle,sDefault){
	if(arguments.length<3)sDefault="";
	if(arguments.length<2)sTitle="";
	if(arguments.length<1)sPrompt="";
	var oldTitle=document.title;
	if(sTitle!="")document.title=sTitle;
	var ret=prompt(sPrompt,sDefault);
	if(sTitle!="")document.title=oldTitle;
	return ret;
}

sbOKOnly=0;
sbOKCancel=1;
sbOK=1;
sbCancel=2;

function MSGBOX(sPrompt,bButtons,sTitle){
	if(arguments.length<3)sTitle="";
	if(arguments.length<2)bButtons=sbOKOnly;
	if(arguments.length<1)sPrompt="";
	var oldTitle=document.title;
	if(sTitle!="")document.title=sTitle;
	var ret=sbOK;
	switch(bButtons){
		case sbOKOnly:{
			alert(sPrompt);
			ret=sbOK;
			break;
		}
		case sbOKCancel:{
			ret=confirm(sPrompt)==true?sbOK:sbCancel;
			break;
		}
		default:{
			ret=sbOK;
			break;
		}
	}
	if(sTitle!="")document.title=oldTitle;
	return ret;
}
//文件处理函数没有实现
//图像处理函数没有实现
//颜色处理函数没有实现
//类型判断函数没有实现
//系统控制函数没有实现
//异常处理函数没有实现
//变量数组函数没有实现




function _ReplaceConstAndFunctions(s){
	s=s.replace(/\bsbCr\b/ig,"sbCr");
	s=s.replace(/\bsbLf\b/ig,"sbLf");
	s=s.replace(/\bsbCrLf\b/ig,"sbCrLf");
	//数学函数
	s=s.replace(/\bABS\(/ig,"ABS(");
	s=s.replace(/\bATN\(/ig,"ATN(");
	s=s.replace(/\bCOS\(/ig,"COS(");
	s=s.replace(/\bEXP\(/ig,"EXP(");
	s=s.replace(/\bFIX\(/ig,"FIX(");
	s=s.replace(/\bINT\(/ig,"INT(");
	s=s.replace(/\bLOG\(/ig,"LOG(");
	s=s.replace(/\bSIN\(/ig,"SIN(");
	s=s.replace(/\bSQR\(/ig,"SQR(");
	s=s.replace(/\bTAN\(/ig,"TAN(");
	s=s.replace(/\bROUND\(/ig,"ROUND(");
	s=s.replace(/\bSGN\(/ig,"SGN(");
	//补充的数学函数
	s=s.replace(/\bASIN\(/ig,"ASIN(");
	s=s.replace(/\bACOS\(/ig,"ACOS(");
	s=s.replace(/\bATAN2\(/ig,"ATAN2(");
	s=s.replace(/\bCEIL\(/ig,"CEIL(");
	s=s.replace(/\bFLOOR\(/ig,"FLOOR(");
	s=s.replace(/\bMAX\(/ig,"MAX(");
	s=s.replace(/\bMIN\(/ig,"MIN(");
	s=s.replace(/\bPOW\(/ig,"POW(");
	//随机函数
	s=s.replace(/\bRAND\b(\(\))?/ig,"RAND()");
	s=s.replace(/\bRANDOMIZE\b(\(\))?/ig,"RANDOMIZE()");
	//字符和字符串、进制处理函数
	s=s.replace(/\bARRAY\(/ig,"ARRAY(");
	
	s=s.replace(/\bASC\(/ig,"ASC(");
	s=s.replace(/\bCBOOL\(/ig,"CBOOL(");
	s=s.replace(/\bCSNG\(/ig,"CSNG(");
	s=s.replace(/\bCDBL\(/ig,"CDBL(");
	s=s.replace(/\bCHR\(/ig,"CHR(");
	s=s.replace(/\bCINT\(/ig,"CINT(");
	s=s.replace(/\bCLNG\(/ig,"CLNG(");
	s=s.replace(/\bCSTR\(/ig,"CSTR(");
	s=s.replace(/\bSTR\(/ig,"STR(");
	s=s.replace(/\bHEX\(/ig,"HEX(");
	s=s.replace(/\bOCT\(/ig,"OCT(");
	s=s.replace(/\bBIN\(/ig,"BIN(");
	s=s.replace(/\bUCASE\(/ig,"UCASE(");
	s=s.replace(/\bLCASE\(/ig,"LCASE(");
	
	//程序语法类函数
	s=s.replace(/\bIIF\(/ig,"IIF(");
	s=s.replace(/\bEXECUTE\(/ig,"EXECUTE(");
	s=s.replace(/[\n\r^]([ \s]*)EXECUTE\s+([^\r\n]+)[\n|\r]/ig,"\n$1EXECUTE($2)\n");
	//对话框类函数没有实现
	s=s.replace(/\bINPUTBOX\(/ig,"INPUTBOX(");
	s=s.replace(/[\n\r^]([ \s]*)INPUTBOX\s+([^\r\n]+)[\n|\r]/ig,"\n$1INPUTBOX($2)\n");
	s=s.replace(/\bsbOKOnly\b/ig,"sbOKOnly");
	s=s.replace(/\bsbOKCancel\b/ig,"sbOKCancel");
	s=s.replace(/\bsbOK\b/ig,"sbOK");
	s=s.replace(/\bsbCancel\b/ig,"sbCancel");
	s=s.replace(/\bMSGBOX\(/ig,"MSGBOX(");
	s=s.replace(/[\n\r^]([ \s]*)MSGBOX\s+([^\r\n]+)[\n|\r]/ig,"\n$1MSGBOX($2)\n");

	
	
	return s;
}


function _ReplaceKeywords(s){

	s=s.replace(/(\n\s*END\s*\n)/ig,"\n{_printstr('END\\n');return;}\n");
	
	//=  ->  ==
	s=s.replace(/(IF\s+[^\.\n]*[^\.\n><])=(\s*\S+\s+THEN)/ig,"$1==$2");
	s=s.replace(/(\s*LOOP\s+UNTIL\s[^\.\n]*[^\.\n><])=([^\r\n]+)\n/ig,"$1==$2");
	s=s.replace(/(\s*WHILE\s[^\.\n]*[^\.\n><])=([^\r\n]+)\n/ig,"$1==$2");

	s=s.replace(/\bNOT\b/ig,"!");
	s=s.replace(/\bAND\b/ig,"&&");
	s=s.replace(/\bOR\b/ig,"||");
	s=s.replace(/<>/ig,"!=");

	s=s.replace(/(\s+)THEN(\b)/ig,"){$2");
	s=s.replace(/(\b)ELSE(\b)/ig,"$1}else{$2");
	s=s.replace(/(\b)ELSEIF(\s+)/ig,"$1}else if(");
	s=s.replace(/(\b)ENDIF|(END\s+IF)(\b)/ig,"$1}$3");
	s=s.replace(/(\b)IF(\s+)/ig,"$1if(");

	s=s.replace(/[\n\r^]([ \s]*)LOOP\s+UNTIL\s+([^\r\n]+)\n/ig,"\n$1}while(!($2));\n");
	s=s.replace(/[\n\r^]([ \s]*)DO\s+WHILE\s+([^\r\n]+)[\n\r]/ig,"\n$1DO\n$1if(!($2))break;\n");
	s=s.replace(/(\b)DO(\b)/ig,"$1do{$2") ;
	s=s.replace(/[\n\r^]([ \s]*)WHILE\s+([^\r\n]+)[\n|\r]/ig,"\n$1while($2){\n");
	s=s.replace(/(\b)WEND(\b)/ig,"$1}$2");

	return s;

}



function _splitx(s,p,b){
	var a=new Array();
	if(!s)return a;
	var t1=0,t2=0,i=0;
	var li=0;
	if(!b){
		while(s&&(i=s.indexOf('""',i))!=-1){
			s=s.substr(0,i)+'"+CHR(34)+"'+s.substr(i+2,s.length-(i+2));
			i+=11;
		}
	}
	for(i=0;i<s.length;++i){
		if(i>=s.length)break;
		if(s[i]=='"')t1=1-t1;
		if(s[i]=='(')++t2;
		if(s[i]==')')--t2;
		if(t1==0&&t2==0&&s[i]==p){
			a.push(s.substr(li,i-li));
			li=i+1;
		}
	}
	if(li<s.length)a.push(s.substr(li,s.length-li));
	return a;
}
 
 
function _ReplaceInputstr(str){
	var a=_splitx(str,",");
	var s="";
	var t="请输入";
	if(a[0][0]=='"'){
		t=a[0];
		a.shift();
	}
	for(var i=0;i<a.length;++i)
		s+=a[i]+"=prompt("+t+",'');\n";
	return s;
}


function _ReplacePrintstr(str){
	var s=str.trim();
	if(",;".indexOf(s.substr(s.length-1,1))==-1)
		s=s+'+"\\n"';
	if(",".indexOf(s.substr(s.length-1,1))!=-1)
		s=s.substr(0,s.length-1)+';"\\t"';
	var a=_splitx(s,",");
	s=a[0];
	for(var i=1;i<a.length;++i)
		s+='+"\\t"+'+a[i];
	a=_splitx(s,";",1);
	s=a[0];
	for(var i=1;i<a.length;++i)
		s+="+"+a[i];
	return "_printstr("+s+");\n";
}
 
 


function BASIC2JS(code){

try{
	var funcname="_func"+parseInt(Math.random()*10000000);
	var ocode="function "+funcname+"(){\n";
	if(code.substr(code.length-1,1!='\n'))code+='\n';
	var acode=code.split('\n');
	for(i=0;i<acode.length;++i){
		s=acode[i].trim();		//.replace(/""/ig,'"+CHR(34)+"');
		if(s.length>=5&&s.substr(0,5).toLowerCase()=="print"){
			ocode=ocode+_ReplacePrintstr(s.substr(6))+'\n';
		}else if(s.length>=5&&s.substr(0,5).toLowerCase()=="input"){
			ocode=ocode+_ReplaceInputstr(s.substr(6))+'\n';
		}else{
			ocode=ocode+s+'\n';
		}
	}

	ocode+="\n}\n";
	ocode+=funcname+"();\n";

	//_print("第一步转换：\n"+ocode+"\n");
	ocode=_ReplaceConstAndFunctions(ocode);
	ocode=_ReplaceKeywords(ocode);
	return ocode;
}catch(e){_printstr(e);}

}









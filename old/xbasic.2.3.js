


//请先设置输出函数_print
//BASIC要求第一个字符不能为下划线，之后才可以，所以转换中使用的标识符全用下划线开头

function CHR(d){return String.fromCharCode(d);}
function ASC(s){return s.charCodeAt();}
function UCASE(s){return s.toUpperCase();}
function LCASE(s){return s.toLowerCase();}
function RAND(){return Math.random();}


function _ReplaceFunctions(s){
	s=s.replace(/\bCHR\(/ig,"CHR(");
	s=s.replace(/\bASC\(/ig,"ASC(");
	s=s.replace(/\bUCASE\(/ig,"UCASE(");
	s=s.replace(/\bLCASE\(/ig,"LCASE(");
	s=s.replace(/\bRAND\b(\(\))?/ig,"RAND()");
	return s;
}


function _ReplaceKeywords(s){

	s=s.replace(/(\n\s*END\s*\n)/ig,"\n{_print('END\\n');return;}\n");
	
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
	return "_print("+s+");\n";
}
 
 


function BASIC2JS(code){

try{
	
	var ocode="function _main(){\n";
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

	ocode+='\n}\n';
	ocode+='_main();\n';

	//_print("第一步转换：\n"+ocode+"\n");
	ocode=_ReplaceFunctions(ocode);
	ocode=_ReplaceKeywords(ocode);
	return ocode;
}catch(e){_print(e);}

}









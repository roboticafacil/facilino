const VF = Vex.Flow;

var d=["w","h","q","8","16"];
var n=["cb","c","c#","db","d","d#","eb","e","f","f#","gb","g","g#","ab","a","a#","bb","b"];
var s=["3","4","5"];

var d_alt=["redonda","blanca","negra","corchea","semicorchea"];
var n_alt=["dob","do","dos","reb","re","res","mib","mi","fa","fas","solb","sol","sols","lab","la","las","sib","si"];
var s_alt=["_vb","","_va"];

var notes=[];

d.forEach(function(dur,i){
	n.forEach(function(not,j){
		s.forEach(function(oct,k){
    var div = document.createElement("div");
    document.body.appendChild(div);
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

		// Size our svg:
		renderer.resize(40, 130);
		var context = renderer.getContext();
		var stave = new VF.Stave(-15,-10,100);
    var not_name=not+"/"+oct;
    //console.log(not_name)
    if (not.length==1)
    {
    	notes=  [new VF.StaveNote({clef: "treble", keys: [not_name], duration: dur ,
    auto_stem: true})];
    }
    else if (not.includes("#"))
    {
    	notes=  [new VF.StaveNote({clef: "treble", keys: [not_name], duration: dur ,
    auto_stem: true}).addAccidental(0, new VF.Accidental("#"))];
    }
    else
    {
    	notes=  [new VF.StaveNote({clef: "treble", keys: [not_name], duration: dur ,
    auto_stem: true}).addAccidental(0, new VF.Accidental("b"))];
    }
    stave.setContext(context).draw();
    VF.Formatter.FormatAndDraw(context, stave, notes);
		//var svg = document.getElementById("boo");
		var name = n_alt[j]+'_'+d_alt[i]+s_alt[k]+'.svg';
    console.log(name);
    var serializer = new XMLSerializer();
		var source = serializer.serializeToString(div);

		//add name spaces.
		if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
    	source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
		}
		if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
    	source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
		}

//add xml declaration
		source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

//convert svg source to URI data scheme.
		var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

 		var downloadLink = document.createElement("a");
 		downloadLink.href = url;
 		downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    })  
  })
});
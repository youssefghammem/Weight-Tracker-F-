(function(Global)
{
 "use strict";
 var Weight_Tracker,Client,Weight,SC$1,_WeightTracker_Templates,Math,WebSharper,List,UI,Templating,Runtime,Server,ProviderBuilder,Handler,TemplateInstance,Var$1,ListModel,Enumerator,Doc,Seq,Charting,Chart,Pervasives,Renderers,ChartJs,Client$1,Templates;
 Weight_Tracker=Global.Weight_Tracker=Global.Weight_Tracker||{};
 Client=Weight_Tracker.Client=Weight_Tracker.Client||{};
 Weight=Client.Weight=Client.Weight||{};
 SC$1=Global["StartupCode$Weight-Tracker$Client"]=Global["StartupCode$Weight-Tracker$Client"]||{};
 _WeightTracker_Templates=Global["Weight-Tracker_Templates"]=Global["Weight-Tracker_Templates"]||{};
 Math=Global.Math;
 WebSharper=Global.WebSharper;
 List=WebSharper&&WebSharper.List;
 UI=WebSharper&&WebSharper.UI;
 Templating=UI&&UI.Templating;
 Runtime=Templating&&Templating.Runtime;
 Server=Runtime&&Runtime.Server;
 ProviderBuilder=Server&&Server.ProviderBuilder;
 Handler=Server&&Server.Handler;
 TemplateInstance=Server&&Server.TemplateInstance;
 Var$1=UI&&UI.Var$1;
 ListModel=UI&&UI.ListModel;
 Enumerator=WebSharper&&WebSharper.Enumerator;
 Doc=UI&&UI.Doc;
 Seq=WebSharper&&WebSharper.Seq;
 Charting=WebSharper&&WebSharper.Charting;
 Chart=Charting&&Charting.Chart;
 Pervasives=Charting&&Charting.Pervasives;
 Renderers=Charting&&Charting.Renderers;
 ChartJs=Renderers&&Renderers.ChartJs;
 Client$1=UI&&UI.Client;
 Templates=Client$1&&Client$1.Templates;
 Weight.Create=function(title,author,published)
 {
  return Weight.New(title,author,published);
 };
 Weight.New=function(WeightValue,WeightDate,gains)
 {
  return{
   WeightValue:WeightValue,
   WeightDate:WeightDate,
   gains:gains
  };
 };
 Client.Main$96$20=function(strContainsOnlyNumber,rvReversed,newWeight,chart)
 {
  return function(e)
  {
   var l;
   if(e.Vars.Hole("entredwweight").$1.Get()===""||e.Vars.Hole("entreddate").$1.Get()===""||!strContainsOnlyNumber(e.Vars.Hole("entredwweight").$1.Get()))
    rvReversed.Set("Please enter a valid input value");
   else
    {
     rvReversed.Set("");
     newWeight.Append(Weight.Create(e.Vars.Hole("entredwweight").$1.Get(),e.Vars.Hole("entreddate").$1.Get(),Math.round((Global.Number(e.Vars.Hole("entredwweight").$1.Get())-Client.lastitem())*1000)/1000));
     e.Vars.Hole("entredwweight").$1.Get();
     newWeight.Iter(function(t)
     {
      Client.datah().Append([t.WeightDate,Global.Number(t.WeightValue)]);
     });
     Client.set_dataty((l=List.ofArray([["chou",5]]),List.append(Client.dataty(),l)));
     rvReversed.Set("the value was added !");
     chart.__UpdateData(5,function(e$1)
     {
      return e$1+10;
     });
    }
  };
 };
 Client.Main=function()
 {
  var $1,data,chart,rvReversed,b,R,_this,G,_this$1,t,_this$2,p,i,newWeight,e,x,l;
  function input(entry)
  {
   var b$1,_this$3,_this$4,_this$5,p$1,i$1;
   return(b$1=(_this$3=(_this$4=(_this$5=new ProviderBuilder.New$1(),(_this$5.h.push({
    $:1,
    $0:"weight",
    $1:entry.WeightValue
   }),_this$5)),(_this$4.h.push({
    $:1,
    $0:"date",
    $1:entry.WeightDate
   }),_this$4)),(_this$3.h.push({
    $:1,
    $0:"gains",
    $1:Global.String(entry.gains)
   }),_this$3)),(p$1=Handler.CompleteHoles(b$1.k,b$1.h,[]),(i$1=new TemplateInstance.New(p$1[1],_WeightTracker_Templates.input(p$1[0])),b$1.i=i$1,i$1))).get_Doc();
  }
  function strContainsOnlyNumber(s)
  {
   var o,$2;
   return(o=0,[($2=Global.Number(s),Global.isNaN($2)?false:(o=$2,true)),o])[0];
  }
  Var$1.Create$1("");
  newWeight=ListModel.FromSeq([]);
  newWeight.Clear();
  Client.weightHistory().Iter(function(t$1)
  {
   newWeight.Append(Weight.Create(t$1.WeightValue,t$1.WeightDate,t$1.gains));
  });
  e=Enumerator.Get(newWeight);
  try
  {
   while(e.MoveNext())
    {
     x=e.Current();
     Client.set_dataty((l=List.ofArray([[x.WeightDate,Global.Number(x.WeightValue)]]),List.append(Client.dataty(),l)));
    }
  }
  finally
  {
   if(typeof e=="object"&&"Dispose"in e)
    e.Dispose();
  }
  data=Doc.BindView(function(lm)
  {
   return Doc.Concat(Seq.map(input,Seq.sortBy(function(t$1)
   {
    return t$1.WeightDate;
   },lm)));
  },newWeight.v);
  chart=Chart.Line$1(Client.dataty()).__WithFillColor(new Pervasives.Color({
   $:0,
   $0:120,
   $1:120,
   $2:120,
   $3:0.2
  }));
  rvReversed=Var$1.Create$1("");
  Var$1.Create$1("");
  Var$1.Create$1("");
  return(b=(R=rvReversed.get_View(),_this=(G=ChartJs.Render$8(chart,null,null,{
   $:1,
   $0:10
  }),_this$1=(t=(_this$2=new ProviderBuilder.New$1(),_this$2.h.push({
   $:0,
   $0:"window",
   $1:data
  }),_this$2),t.h.push(Handler.EventQ2(t.k,"onsend",function()
  {
   return t.i;
  },function(e$1)
  {
   var l$1;
   if(e$1.Vars.Hole("entredwweight").$1.Get()===""||e$1.Vars.Hole("entreddate").$1.Get()===""||!strContainsOnlyNumber(e$1.Vars.Hole("entredwweight").$1.Get()))
    rvReversed.Set("Please enter a valid input value");
   else
    {
     rvReversed.Set("");
     newWeight.Append(Weight.Create(e$1.Vars.Hole("entredwweight").$1.Get(),e$1.Vars.Hole("entreddate").$1.Get(),Math.round((Global.Number(e$1.Vars.Hole("entredwweight").$1.Get())-Client.lastitem())*1000)/1000));
     e$1.Vars.Hole("entredwweight").$1.Get();
     newWeight.Iter(function(t$1)
     {
      Client.datah().Append([t$1.WeightDate,Global.Number(t$1.WeightValue)]);
     });
     Client.set_dataty((l$1=List.ofArray([["chou",5]]),List.append(Client.dataty(),l$1)));
     rvReversed.Set("the value was added !");
     chart.__UpdateData(5,function(e$2)
     {
      return e$2+10;
     });
    }
  })),t),_this$1.h.push({
   $:0,
   $0:"graph",
   $1:G
  }),_this$1),_this.h.push({
   $:2,
   $0:"reversed",
   $1:R
  }),_this),p=Handler.CompleteHoles(b.k,b.h,[["entredwweight",0,null],["entreddate",0,null]]),i=new TemplateInstance.New(p[1],_WeightTracker_Templates.mainform(p[0])),b.i=i,i).get_Doc();
 };
 Client.dataty=function()
 {
  SC$1.$cctor();
  return SC$1.dataty;
 };
 Client.set_dataty=function($1)
 {
  SC$1.$cctor();
  SC$1.dataty=$1;
 };
 Client.datah=function()
 {
  SC$1.$cctor();
  return SC$1.datah;
 };
 Client.lastitem=function()
 {
  SC$1.$cctor();
  return SC$1.lastitem;
 };
 Client.weightHistory=function()
 {
  SC$1.$cctor();
  return SC$1.weightHistory;
 };
 SC$1.$cctor=function()
 {
  SC$1.$cctor=Global.ignore;
  SC$1.weightHistory=ListModel.FromSeq([Weight.Create("70","2022-04-01",0),Weight.Create("70.2","2022-04-02",0.2),Weight.Create("70","2022-04-03",-0.2),Weight.Create("70.1","2022-04-04",0.1)]);
  SC$1.lastitem=70.1;
  SC$1.datah=ListModel.FromSeq([]);
  Client.weightHistory().Iter(function(t)
  {
   Client.datah().Append([Global.String(t.WeightDate),Global.Number(t.WeightValue)]);
  });
  SC$1.dataty=List.T.Empty;
 };
 _WeightTracker_Templates.input=function(h)
 {
  Templates.LoadLocalTemplates("main");
  return h?Templates.NamedTemplate("main",{
   $:1,
   $0:"input"
  },h):void 0;
 };
 _WeightTracker_Templates.mainform=function(h)
 {
  Templates.LoadLocalTemplates("main");
  return h?Templates.NamedTemplate("main",{
   $:1,
   $0:"mainform"
  },h):void 0;
 };
}(self));

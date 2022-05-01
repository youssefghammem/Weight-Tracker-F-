namespace Weight_Tracker

open WebSharper
open WebSharper.UI
open WebSharper.UI.Templating
open WebSharper.UI.Notation
open WebSharper.Charting
open WebSharper.UI.Client

[<JavaScript>]
module Templates =

    type MainTemplate = Templating.Template<"Main.html", ClientLoad.FromDocument, ServerLoad.WhenChanged>

[<JavaScript>]
module Client =
    type Weight =
        {
            WeightValue: string;
            WeightDate: string;
            gains: float;
        }
        static member Create title author published =
            {
                WeightValue = title
                WeightDate = author
                gains = published
            }
    let weightHistory =
            
            ListModel.FromSeq [
                Weight.Create "70" "2022-04-01" 0
                Weight.Create "70.2" "2022-04-02" 0.2
                Weight.Create "70" "2022-04-03" -0.2
                Weight.Create "70.1" "2022-04-04" 0.1
              ]
    let  lastitem = 70.1
  
    let  datah = ListModel.FromSeq[]
    weightHistory.Iter(fun t ->
              (string  t.WeightDate, float t.WeightValue) |> datah.Add )
    
    
    let mutable dataty = []
  
    
   
    
    
    


    let Main () =
        let rvReversed = Var.Create ""
        let newWeight = ListModel.FromSeq []
        newWeight.Clear()
        weightHistory.Iter(fun t ->
            Weight.Create (t.WeightValue) (t.WeightDate) ( t.gains) |> newWeight.Add )
       
        for x in newWeight do
             dataty  <- [(x.WeightDate,float x.WeightValue)] |> List.append dataty
        
        let input entry =
            Templates.MainTemplate.input()
                .weight(entry.WeightValue)
                .Date(entry.WeightDate)
                .gains(string entry.gains)

                .Doc()
        let strContainsOnlyNumber (s:string) = System.Double.TryParse s |> fst
        
        let data =
            newWeight.View.Doc(fun lm -> 
                lm 

                |> Seq.sortBy (fun t -> 
                    t.WeightDate
                ) 

                |> Seq.map input
                |> Doc.Concat
            )
        
       
        let  chart = Chart.Line(dataty).WithFillColor(Color.Rgba(120, 120, 120, 0.2))
        
        
            
        let rvReversed = Var.Create ""
        let dataa =Var.Create ""
        let entredWeight = Var.Create ""
        Templates.MainTemplate.MainForm()
           
            .window(data)

            .OnSend(fun e ->
                 (
                    
                    
                    if(e.Vars.Entredwweight.Value = "" || e.Vars.Entreddate.Value = "" ||not (strContainsOnlyNumber e.Vars.Entredwweight.Value)  )then rvReversed := "Please enter a valid input value"
                    else 
                        rvReversed := ""
                        Weight.Create (e.Vars.Entredwweight.Value) ( e.Vars.Entreddate.Value) (System.Math.Round (((float e.Vars.Entredwweight.Value)-lastitem)* 1000.)/1000.)
                        |> newWeight.Add 
                        let lastitem = float e.Vars.Entredwweight.Value
                        newWeight.Iter(fun t ->(t.WeightDate,float t.WeightValue) |> datah.Add )
                    
                   
                       
                        dataty  <- [("chou",5.0)] |> List.append dataty
                        
                        rvReversed := "the value was added !"
                        chart.UpdateData(5, fun e -> e + 10.)
                        
                       
                    
                    
                    
                    
                      
                     
                )
            )
            .Graph(Renderers.ChartJs.Render(chart, Window = 10))
            .Reversed(rvReversed.View)
            .Doc()

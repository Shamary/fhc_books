'use strict';

$(document).ready(function(e){
   
    var labels=["Loans", "Deposits","Debit Cards","Membership","iTransact","FIP"];
    var days={1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday"};
    var count=0;
    
    var week=1;

    var table=$("#books_table").DataTable({
        ordering:false,
        dom:"Bfrtip",
        autoWidth:false,
        buttons:[{extend:"excelHtml5", text:"Save as Excel", className:"exportButton"}, {extend:"pdf", text:"Save as PDF",className:"exportButton"}],
        ajax:{
            url:"/books_data",
            type:"POST",
            data: function()
            {
                //week=$("#sel_week").val();
                //return JSON.stringify({week:week});
                let week0={week:$("#sel_week").val()};
                return week0;
            },
            dataSrc:'',
        },
        columns:[
            {
                data:null,
                render: function(o){
                    if(count<labels.length)
                    {
                        return "<span>"+labels[count++]+"</span>";
                    }
                    return "";
                }
            },
            {data:'mon'},
            {data:'tue'},
            {data:'wed'},
            {data:'thur'},
            {data:'fri'},
            /*{
                data:null,
                render:function(o)
                {
                    return "<span>&#x270E;</span>";
                }
            }*/
        ]
    });
    
    $("th").click(function(){//edit column

        let pos=$(this).closest("th").index();
        //console.log("pos= "+pos);
        let date= $(this).find("span").text();
        //console.log("date = "+date);
        $("#date").val(moment(date).format("YYYY-MM-DD"));
        $("#day").text(days[pos]);

        $("#day0").val(pos);
        $("#week").val($("#sel_week").val());

        let data=table.column(pos).data();

        $("#loans").val(data[0]);
        $("#deposits").val(data[1]);
        $("#cards").val(data[2]);
        $("#membership").val(data[3]);
        $("#iTransact").val(data[4]);
        $("#fip").val(data[5]);
    });

    /*function edit(event)
    {
        let pos=$(event).closest("th").index();
        console.log("pos= "+pos);

        table.column(pos).data();
    }*/
    
    selWeek(table);
    
    function selWeek(table)//select week
    {
        $("#sel_week").change(function(){
            count=0;
            table.ajax.url("/books_update").load();
            $.post('/update_headings',{week:$("#sel_week").val()},function(result){

                //console.log("result= "+result.mdate);
                $("#mdate").text(result.mdate);
                $("#tdate").text(result.tdate);
                $("#wdate").text(result.wdate);
                $("#thdate").text(result.thdate);
                $("#fdate").text(result.fdate);
            });
        });
    }
});


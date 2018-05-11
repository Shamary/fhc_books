var express = require('express');
var db=require("../config/db");
var date= require("date-and-time");

var getDay = function(result,day)
{
    let i=0;

    for(i=0;i<result.length;i++)
    {
        if(result[i].day==day)
        {
            break;
        }
    }

    return i;
}

var getType = function(result,type)
{
    let i=0;

    for(i=0;i<result.length;i++)
    {
        if(result[i].ftype==type)
        {
            break;
        }
    }

    return i;
}

var runAction=function(result,action,type)
{
    if(action)
    {
        if(result)
        {
            return action(result.bdate,"M/D/YYYY");
        }

        return "";
    }
    else
    {
        if(result)
        {
            return result;
        }

        let data = {loans:null,deposits:null,debit_cards:null,membership:null,iTransact:null,FIP:null};

        if(type==2)
        {
            data= {weekly_actual: null, weekly_target:null,weekly_difference:null};
        }
        else if(type==3)
        {
            data= {ytd_actual: null, ytd_target:null,ytd_difference:null};
        }

        return data; 
    }
    
}

var handleResult= function(result)
{
    let monday=runAction(result[getDay(result,1)]);//result[getDay(result,1)];
    let tuesday=runAction(result[getDay(result,2)]);
    let wednesday=runAction(result[getDay(result,3)]);
    let thursday=runAction(result[getDay(result,4)]);
    let friday=runAction(result[getDay(result,5)]);

    let weekly_a_loans= runAction(result[getType(result,"loans")],2);
    let weekly_a_deposits= runAction(result[getType(result,"deposits")],2);
    let weekly_a_cards= runAction(result[getType(result,"debit_cards")],2);
    let weekly_a_members= runAction(result[getType(result,"membership")],2);
    let weekly_a_itransact= runAction(result[getType(result,"iTransact")],2);
    let weekly_a_fip= runAction(result[getType(result,"FIP")],2);

    let weekly_t_loans= runAction(result[getType(result,"loans")],2);
    let weekly_t_deposits= runAction(result[getType(result,"deposits")],2);
    let weekly_t_cards= runAction(result[getType(result,"debit_cards")],2);
    let weekly_t_members= runAction(result[getType(result,"membership")],2);
    let weekly_t_itransact= runAction(result[getType(result,"iTransact")],2);
    let weekly_t_fip= runAction(result[getType(result,"FIP")],2);

    let weekly_d_loans= runAction(result[getType(result,"loans")],2);
    let weekly_d_deposits= runAction(result[getType(result,"deposits")],2);
    let weekly_d_cards= runAction(result[getType(result,"debit_cards")],2);
    let weekly_d_members= runAction(result[getType(result,"membership")],2);
    let weekly_d_itransact= runAction(result[getType(result,"iTransact")],2);
    let weekly_d_fip= runAction(result[getType(result,"FIP")],2);

    let ytd_a_loans= runAction(result[getType(result,"loans")],3);
    let ytd_a_deposits= runAction(result[getType(result,"deposits")],3);
    let ytd_a_cards= runAction(result[getType(result,"debit_cards")],3);
    let ytd_a_members= runAction(result[getType(result,"membership")],3);
    let ytd_a_itransact= runAction(result[getType(result,"iTransact")],3);
    let ytd_a_fip= runAction(result[getType(result,"FIP")],3);

    let merge=
    [{mon:monday.loans,tue:tuesday.loans,wed:wednesday.loans,thur:thursday.loans,fri:friday.loans},
    {mon:monday.deposits,tue:tuesday.deposits,wed:wednesday.deposits,thur:thursday.deposits,fri:friday.deposits},
    {mon:monday.debit_cards,tue:tuesday.debit_cards,wed:wednesday.debit_cards,thur:thursday.debit_cards,fri:friday.debit_cards},
    {mon:monday.membership,tue:tuesday.membership,wed:wednesday.membership,thur:thursday.membership,fri:friday.membership},
    {mon:monday.iTransact,tue:tuesday.iTransact,wed:wednesday.iTransact,thur:thursday.iTransact,fri:friday.iTransact},
    {mon:monday.FIP,tue:tuesday.FIP,wed:wednesday.FIP,thur:thursday.FIP,fri:friday.FIP}
    ];

    let final=JSON.stringify(merge);

    return final;
}

exports.homePage=function(req,res)
{
    let weeks=[];
    let i=0;

    let week=req.body.week;

    for(i=1;i<53;i++)
    {
        weeks[i-1]=i;
    }
    
    sql="SELECT * from books WHERE week=1";
    db.query(sql,function(err,result){
        if(err)
        {
            throw err;
        }

        let mdate= runAction(result[getDay(result,1)],date.format);//date.format(result[getDay(result,1)].bdate,"M/D/YYYY");
        let tdate=runAction(result[getDay(result,2)],date.format);
        let wdate=runAction(result[getDay(result,3)],date.format);
        let thdate=runAction(result[getDay(result,4)],date.format);
        let fdate=runAction(result[getDay(result,5)],date.format);

        res.render('home', { title: 'Books', weeks:weeks, mdate:mdate, tdate:tdate, wdate:wdate, thdate:thdate, fdate:fdate });
    });
    
}

exports.getTableData = function(req,res)
{
    //console.log("called query");

    let week=req.body.week;
    //console.log("week= "+week);
    var sql=`SELECT loans,deposits,debit_cards,membership,iTransact,FIP,day FROM books b JOIN books_weekly bw ON b.week = bw.week 
             JOIN books_ytd by ON b.week=by.week WHERE b.week=1`;
    
    db.query(sql,function(err,result)
    {
        if(err)
        {
            throw err;
        }
        
        let final=[{mon:null,tue:null,wed:null,thur:null,fri:null},{mon:null,tue:null,wed:null,thur:null,fri:null},
            {mon:null,tue:null,wed:null,thur:null,fri:null},{mon:null,tue:null,wed:null,thur:null,fri:null},
            {mon:null,tue:null,wed:null,thur:null,fri:null},{mon:null,tue:null,wed:null,thur:null,fri:null}];
        
        if(result.length>0)
        {
            final=handleResult(result);
        }
        //let table=JSON.stringify(result);
        console.log("sending: "+final);
        res.status(200).send(final);
    });
}

exports.updateTable=function(req,res)
{
    let week=req.body.week;
    //console.log("week= "+week);

    var sql="SELECT loans,deposits,debit_cards,membership,iTransact,FIP,day FROM books WHERE week="+week+"";
    
    db.query(sql,function(err,result)
    {
        if(err)
        {
            throw err;
        }
        
        let final=[{mon:null,tue:null,wed:null,thur:null,fri:null},{mon:null,tue:null,wed:null,thur:null,fri:null},
                   {mon:null,tue:null,wed:null,thur:null,fri:null},{mon:null,tue:null,wed:null,thur:null,fri:null},
                   {mon:null,tue:null,wed:null,thur:null,fri:null},{mon:null,tue:null,wed:null,thur:null,fri:null}];
        
        if(result.length>0)
        {
            final=handleResult(result);
        }
        console.log("total: "+final);

        res.status(200).send(final);
    });
}

exports.updateDateHeading=function(req,res)
{
    let week=req.body.week;
    //console.log("week heading= "+week);
    
    let mdate= "";
    let tdate="";
    let wdate="";
    let thdate="";
    let fdate="";

    sql="SELECT * from books WHERE week="+week;
    db.query(sql,function(err,result){
        if(err)
        {
            throw err;
        }

        let local_res={mdate:"",tdate:"",wdate:"",thdate:"",fdate:""};

        //if(result.length>0)
        //{
        mdate= runAction(result[getDay(result,1)],date.format);
        tdate=runAction(result[getDay(result,2)],date.format);
        wdate=runAction(result[getDay(result,3)],date.format);
        thdate=runAction(result[getDay(result,4)],date.format);
        fdate=runAction(result[getDay(result,5)],date.format);

        local_res={mdate:mdate,tdate:tdate,wdate:wdate,thdate:thdate,fdate:fdate};

            //res.status(200).send(local_res);
        //}

        //res.status(200).send(local_res);
        res.json(local_res);
    });
}

exports.updateDB=function(req,res)
{
    let bdate=req.body.date;
    let loans=req.body.loans;
    let deposits=req.body.deposits;
    let cards=req.body.debit_cards;
    let membership=req.body.membership;
    let iTransact=req.body.itransact;
    let FIP=req.body.fip;

    let day=req.body.day;
    let week=req.body.week;

    let sql="SELECT * FROM books WHERE day = "+day+" AND week = "+week;
    db.query(sql,function(err,result){
        if(err)
        {
            throw err;
        }

        if(result.length>0)
        {
            sql= "UPDATE books SET loans = "+loans+","+"deposits="+deposits+",debit_cards="+cards+",membership="+membership+
            ",iTransact="+iTransact+",FIP="+FIP+", bdate = '"+bdate+"' WHERE week = "+week+" AND day = "+day+"";

            db.query(sql,function(err){
                if(err)
                {
                    throw err;
                }

                res.redirect("/");
            });
        }
        else
        {
            sql= "INSERT INTO books(week,bdate,day,loans,deposits,debit_cards,membership,iTransact,FIP) VALUES ?";
            let values=[[week,bdate,day,loans,deposits,cards,membership,iTransact,FIP]];

            db.query(sql,[values],function(err){
                if(err)
                {
                    throw err;
                }

                res.redirect("/");
            });
        }
    })
    

    
}
